import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = site.tagline;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "linear-gradient(135deg,#1e40af,#2563eb)", color: "#fff" }}>
        <div style={{ fontSize: 40, opacity: 0.85 }}>{site.name}</div>
        <div style={{ fontSize: 68, fontWeight: 800, marginTop: 20, lineHeight: 1.1 }}>{site.tagline}</div>
        <div style={{ fontSize: 30, marginTop: 36, opacity: 0.9 }}>GBP OS · Adtrafix Match · SEO · Ads</div>
      </div>
    ),
    size,
  );
}
