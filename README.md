# Sitio web — ELECTRINDUSTRIAL "ROMERO"

Sitio estático (HTML + CSS + JavaScript). No necesita backend, base de datos ni Node.js. Funciona directamente en GitHub Pages.

## Estructura

```
/
├── index.html          ← contenido de la página (textos, servicios, contacto)
├── css/styles.css      ← colores, tipografías y diseño
├── js/script.js        ← menú móvil, formulario → WhatsApp, galería ampliada
├── assets/             ← logo e imágenes
│   ├── logo.png              ← logo real de la empresa (fondo transparente)
│   ├── favicon.png           ← icono de la pestaña del navegador
│   ├── hero.jpg              ← foto real de portada (colector con manómetro)
│   ├── automatizacion.jpg    ← fondo de la sección Automatización
│   └── trabajo-01.jpg … trabajo-08.jpg  ← galería "Nuestro trabajo"
└── README.md
```

## Imágenes: qué es real y qué es provisional

- **Real:** `logo.png`, `favicon.png` (tomado del logo) y `hero.jpg` (foto del colector con manómetro y válvulas que lleva la etiqueta de la empresa).
- **Provisional:** `automatizacion.jpg` y `trabajo-01.jpg` a `trabajo-08.jpg` son ilustraciones marcadas como "Imagen ilustrativa · reemplazar por foto real". No son trabajos de la empresa.
- La nota "Las imágenes mostradas son ilustrativas…" bajo la galería debe **borrarse** cuando uses solo fotos reales (está en `index.html`, clase `note`).
- La foto de portada es de 895×663 px; si tienes una versión de mayor resolución, reemplázala con el mismo nombre.

### Cómo reemplazarlas sin tocar el código
Guarda tu archivo con **el mismo nombre** y en la misma carpeta `assets/`, y sustituye el existente:

| Archivo | Qué es | Medida recomendada |
|---|---|---|
| `logo.png` | Logo (fondo transparente) | ~600 px de ancho |
| `hero.jpg` | Portada | 1600×1200 px (4:3) |
| `automatizacion.jpg` | Fondo de la sección Automatización | 1920×1080 px |
| `trabajo-01.jpg` … `trabajo-08.jpg` | Galería | 1200×900 px (4:3) |

Consejo: comprime las fotos (por ejemplo en squoosh.app) para que cada una pese menos de ~300 KB.

Si quieres cambiar el texto descriptivo de cada foto, edita en `index.html` los atributos `alt` y `data-caption` de la galería.

## Dónde cambiar cada dato

Todo está en `index.html` salvo el número de WhatsApp del formulario (`js/script.js`). Usa la búsqueda del editor (Ctrl+F).

| Qué cambiar | Dónde | Qué buscar |
|---|---|---|
| **Teléfono** | `index.html` | `0993053192` y `tel:+593993053192` |
| **WhatsApp (enlaces)** | `index.html` | `wa.me/593993053192` (aparece en varios lugares) |
| **WhatsApp (formulario)** | `js/script.js` | `WHATSAPP_NUMBER` (primeras líneas) |
| **Mensaje inicial de WhatsApp** | `js/script.js` y `index.html` | `DEFAULT_MESSAGE` y el texto tras `?text=` |
| **Correo** | `index.html` | `electrindustrial10@yahoo.es` |
| **Dirección** | `index.html` | `El Pisque` |
| **Logo** | `assets/` | reemplaza `logo.png` y `favicon.png` |
| **Imágenes** | `assets/` | ver tabla anterior |
| **Servicios** | `index.html` | sección `NUESTROS SERVICIOS`: cada `<article class="card">` es un servicio. Copia y pega una para agregar otro. Si agregas uno, añádelo también a la lista `<select id="f-servicio">` del formulario |
| **Textos** | `index.html` | edita directamente el texto dentro de las etiquetas |
| **Colores** | `css/styles.css` | variables `--red`, `--ink`, `--paper` al inicio |
| **Tipografías** | `index.html` y `css/styles.css` | enlace de Google Fonts y `--font-serif` / `--font-sans` |
| **Año del copyright** | `index.html` | `© 2026` |

> Nota: los enlaces de WhatsApp usan `wa.me/593993053192`. En celular abre la app y en computador abre WhatsApp Web / escritorio.

### Agregar Google Maps
1. En Google Maps busca la ubicación real → **Compartir** → **Insertar un mapa** → copia el código `<iframe>`.
2. En `index.html`, busca el comentario `UBICACIÓN` y pega el `<iframe>` debajo del bloque de ubicación.

### Dominio y SEO
En `index.html` (arriba) las etiquetas `canonical` y `og:url` apuntan a  
`https://electrindustrialromero.github.io/electrindustrial-romero/`.  
Si el repositorio o el usuario de GitHub tienen otro nombre, actualiza esas direcciones.

## Subir a GitHub (paso a paso)

### Opción A — Desde la web (sin instalar nada)
1. Entra a <https://github.com> e inicia sesión.
2. Abre el repositorio existente (`electrindustrial-romero`) o crea uno nuevo con el botón **New** → nombre `electrindustrial-romero` → **Public** → **Create repository**.
3. Descomprime la carpeta del proyecto en tu computador.
4. En el repositorio pulsa **Add file → Upload files**.
5. Arrastra **el contenido** de la carpeta (`index.html`, `css`, `js`, `assets`, `README.md`), no la carpeta contenedora. `index.html` debe quedar en la raíz del repositorio.
6. Escribe un mensaje (por ejemplo "Nueva versión del sitio") y pulsa **Commit changes**.

> Si ya existe una versión anterior, los archivos con el mismo nombre se reemplazan. Elimina los que ya no uses (por ejemplo la carpeta `images/` antigua) desde GitHub: abre el archivo → icono de papelera.

### Opción B — Con Git en la terminal
```bash
cd electrindustrial-romero
git init
git add .
git commit -m "Nueva versión del sitio web"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/electrindustrial-romero.git
git push -u origin main
```
(Si el repositorio ya existía y tiene contenido, usa `git pull origin main --allow-unrelated-histories` antes del `push`, o clona primero el repositorio y copia los archivos nuevos encima.)

## Activar GitHub Pages
1. En el repositorio entra a **Settings** (Configuración).
2. En el menú izquierdo, pulsa **Pages**.
3. En **Build and deployment → Source** elige **Deploy from a branch**.
4. En **Branch** elige `main` y la carpeta `/ (root)`. Pulsa **Save**.
5. Espera 1 a 3 minutos y actualiza la página: arriba aparecerá la dirección del sitio, normalmente  
   `https://TU-USUARIO.github.io/electrindustrial-romero/`
6. Si no ves los cambios, refresca con **Ctrl + F5** (o abre en ventana privada).

## Probar en tu computador
Haz doble clic en `index.html`. Se abrirá en el navegador (necesita internet solo para cargar las tipografías de Google Fonts).

## Créditos de imágenes
No se utilizan fotografías de terceros. El logo y la foto de portada son de la empresa. `automatizacion.jpg` y `trabajo-01.jpg` a `trabajo-08.jpg` son gráficos generados como marcador de posición y deben sustituirse por fotografías reales.
