import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

const firstLetterToUpperCase = (str: string) => {
  let title = str.replace(/-/g, " ");
  title = title.charAt(0).toUpperCase() + title.slice(1);
  return title;
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title: string | null = searchParams.get("title");

  if (!title) {
    return new Response("Missing title", { status: 400 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          padding: "5rem",
          backgroundImage: "linear-gradient(to top, #000000, #1b2836)",
          fontSize: 50,
          fontWeight: 700,
          textAlign: "center",
          display: "flex",
          flexWrap: "nowrap",
          justifyContent: "space-between",
          alignItems: "center",
          alignContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgb(121, 40, 202), rgb(255, 0, 128))",
            backgroundClip: "text",
            color: "transparent",
            fontSize: 40,
          }}
        >
          Blog
        </div>

        <div
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216))",
            backgroundClip: "text",
            color: "transparent",
            fontSize: 50,
          }}
        >
          {firstLetterToUpperCase(title)}
        </div>
        <div
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgb(121, 40, 202), rgb(255, 0, 128))",
            backgroundClip: "text",
            color: "transparent",
            fontSize: 30,
          }}
        >
          🚀 Nico Tomasin 🚀
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
