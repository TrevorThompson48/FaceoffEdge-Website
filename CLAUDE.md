# Faceoff website — project notes

## Dropped images must always be baked in
Whenever the user drops or uploads an image into an `<image-slot>`, immediately bake it into
the HTML as a permanent file — never leave it as a temporary slot.

Procedure:
1. In the user's view, render each filled slot's visible crop to a canvas at 3x
   (use the frame and img `getBoundingClientRect()` deltas), export as JPEG ~0.9.
2. Write the data URL to a temp `.<id>.state.json` via `window.omelette.writeFile`.
3. In `run_script`, decode base64 → Blob → save to `assets/<name>.jpg`.
4. Replace the `<image-slot>` with a plain `<img>` at the same box size
   (`object-fit: cover`, matching border-radius), remove the now-unused
   `image-slot.js` script tag if no slots remain on the page.
5. Delete the temp `.state.json` files.
6. Apply the same change to BOTH the root page and its clean-URL copy
   (e.g. `sensor.html` and `sensor/index.html`).

## Site structure
Every page exists twice: at the root as `<name>.html` (links use `.html` so the preview
works) and as `<name>/index.html` for clean URLs on the live domain (assets referenced
with `../assets/`). Any content edit must be applied to both copies.
