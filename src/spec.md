# Specification

## Summary
**Goal:** Build the Dripify clothing design app with a simple end-to-end workflow: choose a garment, add/edit text-based design layers, preview the result on a 3D mockup, and save/load designs per signed-in user.

**Planned changes:**
- Create the Dripify app shell with a clear flow for garment selection, editor, 3D preview, and saved designs.
- Implement 3D garment mockup preview (T-shirt and hoodie) with orbit/zoom controls and live-updating applied text design.
- Build a text design editor: add/edit text, drag to position, rotate, scale, set color and alignment, and manage multiple layers (select, reorder, delete).
- Add a font library UI with categories (Modern, Vintage, Urban), plus search/filter and graceful fallback when fonts aren’t available.
- Add backend persistence (single Motoko actor) for CRUD design records scoped to the authenticated Internet Identity principal.
- Wire frontend to backend using React Query to save, list, load, rename, and delete designs with responsive UI updates.
- Apply a cohesive streetwear/urban visual theme (not blue/purple-dominant) across the app.
- Add and reference generated static brand assets from `frontend/public/assets/generated` (logo + at least one additional visual).

**User-visible outcome:** Users can pick a T-shirt or hoodie, create multi-layer text designs with font and styling controls, see the design on an interactive 3D mockup, and save/load/manage their designs tied to their sign-in.
