# GLB Asset Download Instructions

## Required Assets

Download these GLB models from Sketchfab (free CC0 license) and place in `/public/models/`:

---

### 1. Office Building

**Search:** `modern office building CC0` on [sketchfab.com](https://sketchfab.com)

**Recommended models:**
- "Modern Office Building" by various artists
- "Corporate Building" 
- Any multi-story commercial building with windows

**Save as:** `public/models/building.glb`

---

### 2. Cars (2-3 models)

**Search:** `sedan car CC0 GLB` on [sketchfab.com](https://sketchfab.com)

**Recommended:**
- "Low Poly Car" (with smooth shading)
- "Sedan Car" by various artists

**Save as:** 
- `public/models/car_1.glb`
- `public/models/car_2.glb`

---

### 3. Trees (1-2 models)

**Search:** `realistic tree CC0` on [sketchfab.com](https://sketchfab.com)

**Recommended:**
- "Realistic Tree" by Rayhan345jkl
- "Deciduous Tree" by MegaFoliage
- baxterbaxter's CC0 tree collection

**Save as:** `public/models/tree.glb`

---

## Download Steps

1. Go to [sketchfab.com](https://sketchfab.com)
2. Create free account if needed
3. Search for model name
4. Filter by: **Downloadable** + **CC0/Public Domain**
5. Click **Download** → Select **glTF** or **GLB** format
6. Place in `/public/models/` folder

---

## After Downloading

Run the dev server and the scene will automatically load your GLB models instead of primitives.

```bash
npm run dev
```
