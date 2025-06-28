# 🌍 Orber — Satellite-Powered Land & Water Intelligence

**Orber** transforms satellite imagery into instant, actionable insights about land use, water quality, and soil conditions. Built on top of ESA’s Copernicus program and Sentinel Hub, it brings powerful geospatial analytics to users without requiring GIS expertise.

---
![Captura de pantalla 2025-06-28 a la(s) 2 15 49 a m](https://github.com/user-attachments/assets/520317b3-cd4c-4f1b-b88c-8b49fc2bc7d3)



Orber delivers real-time satellite analysis for land and water management — no GIS skills needed, no waiting. It's fast, accurate, and designed for decision-makers on the ground.

---

## 🌱 Why This Project Matters

Orber bridges the gap between Earth observation science and everyday decisions. Whether you're a planner, farmer, policymaker, or environmental analyst, Orber helps you:

- Access **real-time, science-based insights** on soil and water
- Avoid delays and high costs of traditional GIS workflows
- Monitor territories with **open and transparent satellite data**
- Make **data-driven, sustainable decisions** about land use

---

## ✨ Features

- 🛰️ **Multispectral & SAR data** from Sentinel-1 and Sentinel-2
- 💧 Water quality estimation: turbidity, trophic index, NDWI
- 🌾 Land use and catastral analysis
- 🧪 Soil moisture & surface condition monitoring
- 📦 Export as GeoJSON, KML, or static reports
- ⚡ Results in seconds — no desktop GIS or plugins
- 
![orb4](https://github.com/user-attachments/assets/dc3208c0-907e-4b7f-937d-5402eb0da8a2)

---

## 🔧 Built With

- **Frontend**: React + Next.js (TypeScript), Vite  
- **Backend**: Node.js, Python, Docker  
- **Satellite APIs**: ESA Copernicus, Sentinel Hub WMS  
- **Geospatial Processing**: rasterio, GDAL, Deck.gl  
- **Database**: Supabase (PostgreSQL + PostGIS), Firestore  
- **Workflow Automation**: n8n  
- **Cloud Services**: Google Cloud Run, Netlify, GitHub Actions  
- **Visualization**: Leaflet, MapLibre, WebGL overlays  

---

## 📈 Use Cases

- Municipal planning and zoning
- Water utility monitoring
- Agriculture and land restoration
- Risk detection (flood zones, burned areas)
- Climate resilience and ESG reporting

---

## 🛠️ How It Works

1. **Select a region** on the map interface  
2. **Orber fetches fresh satellite data** (Sentinel-1/2 WMS)  
3. **Custom algorithms** process imagery to detect land/water parameters  
4. **Instant results** are visualized and exportable in multiple formats

   ![orb1](https://github.com/user-attachments/assets/442d78db-2d00-423b-be5a-9e4abbf6a243)


---

## 📚 Learnings & Challenges

Working with high-volume satellite data required smart tile caching and minimal UI complexity. The biggest challenge was making scientific indices — like NDWI or turbidity models — understandable and useful to non-experts, while keeping performance snappy and scalable.

---

## 💡 Inspiration

Orber was created from a desire to make environmental intelligence more accessible. Too often, Earth observation data is either locked behind expert tools or out of reach for local governments and communities. This project proves that space technology can be simple, fast, and meaningful — right from your browser.

---

## 📦 Future Plans

- Add vegetation health & fire risk layers  
- Enable historical trend analysis  
- API access for enterprise and public agencies  
- Report builder + webhook integration (via n8n)  

---

## 🧭 Try It / Contribute

Coming soon as a public beta. For feedback, testing, or collaboration inquiries, feel free to reach out or open an issue.

---

© 2025 Orber – Earth, translated.
