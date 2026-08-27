# TRACE media folder

This is the correct **Vite public folder** for raw files in the exported repository. A file placed here becomes available in the browser at `/media/<filename>`.

For example, `client/public/media/team/fuad-khalid.webp` is referenced as `/media/team/fuad-khalid.webp` from React code. Keep filenames lowercase, descriptive, and stable. Use WebP or AVIF for photographs whenever possible; reserve PNG for logos, transparent marks, and UI assets.

Place small and medium web assets here, including employee portraits, project covers, insight thumbnails, innovation screenshots, the TRACE wordmark, and compact video posters. Keep repository images well optimized. Do not commit raw camera files, editable design masters, or long/high-resolution videos.

For a hero film or large project videos, use a delivery service such as Vercel Blob, Cloudinary, Mux, Vimeo, or YouTube. Store the public playback URL in the TRACE content model rather than bundling the source video into Git. A video should have a poster image, muted/autoplay only when essential, captions when it contains speech, and a reduced-motion image fallback.

## Recommended folders

```text
client/public/media/
├── brand/
│   ├── trace-mark.png
│   ├── trace-wordmark-dark.svg
│   └── trace-wordmark-light.svg
├── hero/
│   ├── policy-workshop.webp
│   ├── trade-port.webp
│   ├── digital-trade.webp
│   └── trace-hero-poster.webp
├── team/
│   ├── fuad-khalid.webp
│   └── ...
├── projects/
│   └── national-tariff-modernization.webp
├── insights/
│   └── sustainable-economic-stability.webp
├── innovations/
│   └── tariff-intelligence.webp
├── partners/
│   ├── bsti.svg
│   ├── bafisa.svg
│   ├── nbr.svg
│   └── ahcab.svg
└── textures/
    └── trace-grain.png
```

For the homepage partner rail, provide only approved transparent partner logos in `partners/`. Prefer SVG; use a transparent WebP or PNG only when a source SVG is unavailable. Each logo should be supplied with a confirmed organization name and a usable light-background variant. Do not use low-resolution screenshots of logos.
