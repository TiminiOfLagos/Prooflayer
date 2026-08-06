import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon: the mark on the product's own background, with padding. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#08090A",
        }}
      >
        <svg width="112" height="112" viewBox="0 0 32 32">
          <path d="M16 6.5 26 11l-10 4.5L6 11l10-4.5Z" fill="#CCFF2F" />
          <path
            d="M6 16.4 16 20.9l10-4.5"
            fill="none"
            stroke="#A2AAB3"
            strokeWidth="2.1"
            strokeLinejoin="round"
          />
          <path
            d="M6 21.6 16 26.1l10-4.5"
            fill="none"
            stroke="#6D757F"
            strokeWidth="2.1"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    size,
  );
}
