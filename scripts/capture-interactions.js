import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const QA_DIR = path.join(ROOT_DIR, 'qa-screenshots', 'interactions');

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

await new Promise((resolve) => server.listen(4175, '127.0.0.1', resolve));

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chrome = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9224',
  '--no-sandbox',
  '--disable-gpu',
  '--hide-scrollbars',
  'about:blank',
]);

let webSocketUrl = null;
for (let i = 0; i < 30; i++) {
  try {
    const res = await fetch('http://127.0.0.1:9224/json/new', { method: 'PUT' });
    const data = await res.json();
    if (data && data.webSocketDebuggerUrl) {
      webSocketUrl = data.webSocketDebuggerUrl;
      break;
    }
  } catch (e) {
    await new Promise((r) => setTimeout(r, 200));
  }
}

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
await sendCDP('Runtime.enable');

await sendCDP('Emulation.setDeviceMetricsOverride', {
  width: 1440,
  height: 960,
  deviceScaleFactor: 1,
  mobile: false,
});

await sendCDP('Page.navigate', { url: 'http://127.0.0.1:4175/' });
await new Promise((r) => setTimeout(r, 2000));

// 1. Capture Mega Menu open
await sendCDP('Runtime.evaluate', {
  expression: `
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Products & Categories'));
    btn?.click();
  `,
});
await new Promise((r) => setTimeout(r, 600));
let shot = await sendCDP('Page.captureScreenshot', { format: 'png' });
fs.writeFileSync(path.join(QA_DIR, '01-mega-menu-open.png'), Buffer.from(shot.data, 'base64'));
console.log('Captured 01-mega-menu-open.png');

// 2. Open Product Details Modal
await sendCDP('Runtime.evaluate', {
  expression: `
    const viewBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('View Details'));
    viewBtn?.click();
  `,
});
await new Promise((r) => setTimeout(r, 600));
shot = await sendCDP('Page.captureScreenshot', { format: 'png' });
fs.writeFileSync(path.join(QA_DIR, '02-product-modal-open.png'), Buffer.from(shot.data, 'base64'));
console.log('Captured 02-product-modal-open.png');

// 3. Open WhatsApp Enquiry Modal
await sendCDP('Runtime.evaluate', {
  expression: `
    const closeBtn = document.querySelector('button[aria-label="Close dialog"]');
    closeBtn?.click();
  `,
});
await new Promise((r) => setTimeout(r, 400));

await sendCDP('Runtime.evaluate', {
  expression: `
    const waBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Enquire on WhatsApp'));
    waBtn?.click();
  `,
});
await new Promise((r) => setTimeout(r, 600));
shot = await sendCDP('Page.captureScreenshot', { format: 'png' });
fs.writeFileSync(path.join(QA_DIR, '03-whatsapp-modal-open.png'), Buffer.from(shot.data, 'base64'));
console.log('Captured 03-whatsapp-modal-open.png');

ws.close();
chrome.kill();
server.close();
console.log('Interactions QA completed!');
process.exit(0);
