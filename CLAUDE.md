# flowers — flowers.whereideasgo.com

Landing page editorial para arreglos florales. Accesible en `whereideasgo.com/flowers` — la landing principal hace proxy via rewrite.

## Stack

- Next.js 15 + React 19 + Tailwind CSS v4
- Framer Motion para scroll reveals
- `next/font/google`: Cormorant Garamond (display) + Josefin Sans (body)

## Imagen del ramo

Coloca la imagen principal en:

```
public/images/bouquet.jpg
```

La imagen debe ser cuadrada, fondo blanco, formato JPG o WEBP. Se renderiza a 540×540px en el hero.

## Animaciones

| Keyframe          | Uso                                      |
|-------------------|------------------------------------------|
| `float-gentle`    | Ramo flotando (wrapper exterior)         |
| `breathe-scale`   | Ramo respirando (wrapper interior)       |
| `glow-pulse`      | Halo de luz detrás del ramo              |
| `shimmer-ring`    | Anillos concéntricos pulsantes           |
| `bokeh-float`     | Partículas de bokeh (BokehParticles.tsx) |
| `petal-fall`      | Pétalos cayendo (FloatingPetals.tsx)     |
| `letter-in`       | Título "FLOWERS" aparece difuminado      |
| `fade-up`         | Tagline sube al aparecer                 |

## Comandos

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Despliegue en Vercel

1. Importar repo en Vercel como proyecto independiente (sin dominio custom)
2. Framework: Next.js (detectado automáticamente)
3. Anotar la URL de Vercel generada (ej. `flowers-whereideasgo.vercel.app`)
4. En `whereideasgo-landing` → Vercel Settings → Environment Variables:
   - Agregar `FLOWERS_URL=https://flowers-whereideasgo.vercel.app`
5. Re-deployar `whereideasgo-landing` para activar el rewrite
6. La página queda en `whereideasgo.com/flowers`
