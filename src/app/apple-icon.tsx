import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS home-screen icon: full-bleed navy square (iOS rounds the corners itself).
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0b0b45" }}>
        <svg width="180" height="180" viewBox="0 0 64 64">
          <path fill="#fff" fillRule="evenodd" d="M32 12 47 52h-7l-3.2-9h-9.6L24 52h-7L32 12Zm0 12.5L28.6 35h6.8L32 24.5Z" />
          <circle cx="48" cy="16" r="4.5" fill="#b6f542" />
        </svg>
      </div>
    ),
    size,
  );
}
