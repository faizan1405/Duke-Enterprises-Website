# Scale Flow — Website Project Rules

Use the global `scale-flow-web-design` skill for new website design, 3D, motion, visual QA, and architectural decisions.

## Project constraints
- React + Vite + TypeScript + Tailwind CSS.
- Reuse installed GSAP, @react-three/fiber + Drei, Motion, Fontsource and Radix only as needed. Avoid adding heavyweight code to a page with no 3D.
- For real 3D, load an actual GLB/GLTF asset or clearly state if unavailable. Desktop and mobile must both remain usable.
- Source selective React Bits, Magic UI, Motion Primitives and 21st.dev components from their official registries/CLI; do not clone/copy their entire repos inside project.
- Design and verify real hover states, scrolling, reverse-scroll, visual hierarchy and responsive layouts. Run `npm run build` before delivery.
- Track licensing/attribution for all external code and 3D/photo assets.
- Do not infer a user-provided business's brand palette or reuse the same design for every client.
