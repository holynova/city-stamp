# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Durable prototype feedback

- Generated badge artwork is the only visual hexagon boundary; do not add a second CSS hex border or inset shell around it.
- Keep the face of each badge artwork-only; city codes, serials, and status copy belong outside the generated image.
- The enlarged badge detail view is a separate full-screen interaction; keep check-in/cancel as an explicit action so viewing never changes progress accidentally.
- Tilt the complete generated badge toward the pointer as one rigid surface; only the specular sheen may translate inversely for refraction.
- The check-in wall uses exact pointy-top hex tiling with touching side edges and no card overlap or scale expansion.
- The check-in wall is a dense floor-like mosaic: use one shared five-column coordinate system with alternating 5/4 row capacities, never independently center short rows, and let the wall viewport fit the actual mosaic instead of leaving a large blank tray.
- The full-screen badge detail stage should show only the centered generated badge on a uniform neutral surface; do not add decorative gradient transitions, halos, or colored backdrop effects around it.
- Clicking a checked-in badge toggles it back to undiscovered and removes its timestamp and wall entry.
