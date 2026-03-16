/**
 * extract-frames.mjs
 *
 * Extrae frames del video usando FFmpeg y los guarda como WebP en public/frames/.
 *
 * Uso:
 *   node scripts/extract-frames.mjs
 *
 * Requiere FFmpeg instalado: winget install Gyan.FFmpeg
 *
 * Parámetros configurables:
 */

import { execSync, spawnSync } from "child_process";
import { mkdirSync, existsSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const INPUT  = join(ROOT, "public", "videos", "flowersvideo.mp4");
const OUTPUT = join(ROOT, "public", "frames");
const FPS    = 15;        // frames por segundo (15 es ideal para scroll)
const WIDTH  = 1920;      // ancho máximo (alto se calcula automático)
const QUALITY = 85;       // calidad WebP (0-100)

// ── Verificar FFmpeg ──────────────────────────────────────────────────────
async function findFFmpeg() {
  // 1. Intentar sistema
  for (const cmd of ["ffmpeg", "ffmpeg.exe"]) {
    try {
      execSync(`${cmd} -version`, { stdio: "ignore" });
      return cmd;
    } catch {}
  }
  // 2. Usar ffmpeg-static del proyecto
  try {
    const { default: ffmpegPath } = await import("ffmpeg-static");
    if (ffmpegPath && existsSync(ffmpegPath)) return ffmpegPath;
  } catch {}
  return null;
}

// ── Obtener info del video ────────────────────────────────────────────────
function getVideoInfo(ffprobe, input) {
  const result = spawnSync(ffprobe, [
    "-v", "quiet",
    "-print_format", "json",
    "-show_streams",
    input,
  ], { encoding: "utf8" });

  if (result.error || result.status !== 0) return null;
  try {
    const data = JSON.parse(result.stdout);
    const v = data.streams.find(s => s.codec_type === "video");
    if (!v) return null;
    const [num, den] = v.r_frame_rate.split("/").map(Number);
    return {
      duration: parseFloat(v.duration),
      fps: num / den,
      width: v.width,
      height: v.height,
    };
  } catch {
    return null;
  }
}

// ── Main ─────────────────────────────────────────────────────────────────
const ffmpegCmd = await findFFmpeg();
if (!ffmpegCmd) {
  console.error("❌ FFmpeg no encontrado. Instálalo con: winget install Gyan.FFmpeg");
  console.error("   Luego abre una terminal nueva y ejecuta este script de nuevo.");
  process.exit(1);
}

const ffprobeCmd = ffmpegCmd.replace("ffmpeg", "ffprobe");

console.log(`✓ FFmpeg encontrado: ${ffmpegCmd}`);

const info = getVideoInfo(ffprobeCmd.replace(/"/g, ""), INPUT);
if (info) {
  console.log(`✓ Video: ${info.width}x${info.height} @ ${info.fps.toFixed(2)}fps — ${info.duration.toFixed(1)}s`);
  const estimatedFrames = Math.ceil(info.duration * FPS);
  console.log(`  → Extrayendo ~${estimatedFrames} frames a ${FPS}fps, ${WIDTH}px ancho, WebP ${QUALITY}%`);
  const estimatedMB = (estimatedFrames * 60) / 1024; // ~60KB por frame WebP
  console.log(`  → Tamaño estimado: ~${estimatedMB.toFixed(0)}MB`);
}

// Crear directorio de salida
mkdirSync(OUTPUT, { recursive: true });

// Limpiar frames anteriores
const existing = readdirSync(OUTPUT).filter(f => f.endsWith(".webp"));
if (existing.length > 0) {
  console.log(`  → Eliminando ${existing.length} frames anteriores...`);
  for (const f of existing) {
    import("fs").then(({ unlinkSync }) => unlinkSync(join(OUTPUT, f)));
  }
}

console.log("\n⏳ Extrayendo frames...\n");

// Comando FFmpeg
// -vf "fps=15,scale=1920:-2:flags=lanczos"  → resize con mejor algoritmo
// -quality 85                                 → WebP quality
// -compression_level 4                        → balance velocidad/tamaño
const args = [
  "-i", INPUT,
  "-vf", `fps=${FPS},scale=${WIDTH}:-2:flags=lanczos`,
  "-c:v", "libwebp",
  "-quality", String(QUALITY),
  "-compression_level", "4",
  "-an",
  join(OUTPUT, "frame_%04d.webp"),
];

const result = spawnSync(ffmpegCmd.replace(/"/g, ""), args, {
  stdio: "inherit",
  encoding: "utf8",
});

if (result.status !== 0) {
  console.error("\n❌ Error al extraer frames");
  process.exit(1);
}

// Contar frames generados
const generated = readdirSync(OUTPUT).filter(f => f.endsWith(".webp"));
console.log(`\n✅ ${generated.length} frames extraídos en public/frames/`);
console.log(`\n📝 Actualiza page.tsx con:`);
console.log(`   frameCount={${generated.length}}`);
