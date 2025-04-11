import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Meta 100k";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "#1e1e1e",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: 700,
        }}
      >
        <div>Meta 100k</div>
        <div
          style={{
            fontSize: 48,
            marginTop: 24,
            color: "#3b82f6",
          }}
        >
          Acompanhe seu progresso
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
} 