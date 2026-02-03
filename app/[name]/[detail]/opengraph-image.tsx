import { ImageResponse } from "next/og"
import { CONTENT_LOADERS, ContentKey} from "@/constants/registry"
import { COMING_SOON } from "@/constants/util";

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default async function Image({ params }: { params: Promise<{ name: string, detail: string }> }) {
  const { detail } = await params

  if (COMING_SOON.includes(detail)) {
      return new ImageResponse((
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "80px",
            background: "white",
            fontFamily: "sans-serif",
          }}
        >
          <h1 style={{ fontSize: 64, fontWeight: "bold"}}>
            Coming Soon
          </h1>
        </div>
      ), size);
    }

  const content = await CONTENT_LOADERS[detail as ContentKey]()
  const paragraphs = content.general.split("\n")
  
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "white",
          fontFamily: "sans-serif",
        }}
      >
        <h1 style={{ fontSize: 64, fontWeight: "bold" }}>
          {content.title}
        </h1>

        {paragraphs.map((paragraph, index) => (
            <p key={index}>
              {paragraph}
            </p>
        ))}
      </div>
    ),
    size
  )
}
