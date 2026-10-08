import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Imagem 1200x630 para partilhas (LinkedIn, WhatsApp, X): o card
// "summary_large_image" com a foto quadrada ficava cortado.
export const alt = "Wallace Luis — Desenvolvedor Full Stack Pleno";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
    const photo = await readFile(join(process.cwd(), "public/foto-perfil.jpg"));
    const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;
    const tags = ["TypeScript", "React", "React Native", "Node.js", "AWS", "IA Generativa"];

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 64,
                    padding: "0 88px",
                    color: "white",
                    backgroundColor: "#020617",
                    backgroundImage:
                        "radial-gradient(circle at 25% 30%, rgba(37,99,235,0.35), transparent 55%), radial-gradient(circle at 85% 85%, rgba(147,51,234,0.3), transparent 50%)",
                }}
            >
                <img
                    src={photoSrc}
                    width={300}
                    height={300}
                    alt=""
                    style={{ borderRadius: 9999, border: "6px solid rgba(255,255,255,0.15)", objectFit: "cover" }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -2 }}>Wallace Luis</div>
                    <div style={{ fontSize: 40, color: "#60a5fa", marginTop: 8 }}>Desenvolvedor Full Stack Pleno</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 36, maxWidth: 640 }}>
                        {tags.map((tag) => (
                            <div
                                key={tag}
                                style={{
                                    fontSize: 24,
                                    padding: "8px 18px",
                                    borderRadius: 9999,
                                    border: "1px solid rgba(255,255,255,0.2)",
                                    background: "rgba(255,255,255,0.06)",
                                    color: "#d4d4d4",
                                }}
                            >
                                {tag}
                            </div>
                        ))}
                    </div>
                    <div style={{ fontSize: 26, color: "#737373", marginTop: 40 }}>wallaceluis.com.br</div>
                </div>
            </div>
        ),
        size
    );
}
