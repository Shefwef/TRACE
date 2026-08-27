# TRACE Partner Logo Integration

The supplied partner artwork was staged in the provided sequence and is rendered in the homepage’s existing right-to-left partner rail. The rail duplicates the sequence internally to form a continuous loop, pauses on hover or keyboard focus, and remains static when reduced motion is enabled.

For local or Vercel builds using `VITE_USE_LOCAL_MEDIA=true`, retain the ordered `partner-01.png` through `partner-14.png` files in `client/public/media/partners/`. Only fully transparent outer margins should be trimmed; visible logo artwork must remain unchanged.
