import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const QA_DIR = path.join(ROOT_DIR, 'qa-screenshots');

if (!fs.existsSync(QA_DIR)) {
  fs.mkdirSync(QA_DIR, { recursive: true });
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

// 1. Static file server
const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';
  let filePath = path.join(DIST_DIR, reqPath);

  if (!fs.existsSync(filePath)) {
    filePath = path.join(DIST_DIR, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

await new Promise((resolve) => server.listen(4173, '127.0.0.1', resolve));
console.log('Static server listening on http://127.0.0.1:4173');

// 2. Launch Chrome
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chrome = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9222',
  '--no-sandbox',
  '--disable-gpu',
  '--hide-scrollbars',
  '--disable-background-networking',
  'about:blank',
]);

// Wait for Chrome remote debugging to respond
let webSocketUrl = null;
for (let i = 0; i < 30; i++) {
  try {
    const res = await fetch('http://127.0.0.1:9222/json/new', { method: 'PUT' });
    const data = await res.json();
    if (data && data.webSocketDebuggerUrl) {
      webSocketUrl = data.webSocketDebuggerUrl;
      break;
    }
  } catch (e) {
    await new Promise((r) => setTimeout(r, 200));
  }
}

if (!webSocketUrl) {
  console.error('Failed to obtain Chrome CDP WebSocket URL');
  chrome.kill();
  server.close();
  process.exit(1);
}

console.log('Connected to Chrome CDP:', webSocketUrl);
const ws = new WebSocket(webSocketUrl);

let nextId = 1;
const pending = new Map();

ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    if (msg.error) reject(msg.error);
    else resolve(msg.result);
  }
};

await new Promise((resolve) => (ws.onopen = resolve));

function sendCDP(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = nextId++;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
}

await sendCDP('Page.enable');
await sendCDP('DOM.enable');

async function capture(name, width, height, isMobile, fullPage = false) {
  console.log(`Configuring viewport for ${name}: ${width}x${height} (mobile=${isMobile}, fullPage=${fullPage})`);
  await sendCDP('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: isMobile,
  });

  await sendCDP('Page.navigate', { url: 'http://127.0.0.1:4173/' });
  await new Promise((r) => setTimeout(r, 2200)); // allow fonts, images and layout to settle

  const shot = await sendCDP('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: fullPage,
  });

  const outPath = path.join(QA_DIR, `${name}.png`);
  fs.writeFileSync(outPath, Buffer.from(shot.data, 'base64'));
  console.log(`Saved screenshot: ${outPath} (${(fs.statSync(outPath).size / 1024).toFixed(1)} KB)`);
}

// 1. Desktop Viewport (1440x960)
await capture('desktop-1440-hero', 1440, 960, false, false);
await capture('desktop-1440-full', 1440, 960, false, true);

// 2. Mobile Viewport (390x844)
await capture('mobile-390-hero', 390, 844, true, false);
await capture('mobile-390-full', 390, 844, true, true);

ws.close();
chrome.kill();
server.close();
console.log('Automated Visual QA screenshots completed successfully!');
process.exit(0);
