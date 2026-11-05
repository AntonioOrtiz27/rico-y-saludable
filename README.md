# Rico y Saludable – catálogo web

Vite + JavaScript, datos en Supabase, deploy en Netlify.

## Estructura
- `src/pages` catálogo (`catalog.js`) y panel admin (`admin.js`, ruta `#/admin`)
- `src/components` tarjeta de producto y carrito
- `src/services` Supabase, productos y autenticación
- `src/state` carrito · `src/config` datos del negocio · `src/data` catálogo inicial
- `supabase/schema.sql` tabla y permisos

## Puesta en marcha
1. Creá un proyecto en Supabase y ejecutá `supabase/schema.sql` en el SQL Editor.
2. En Authentication → Users creá TU usuario (email y contraseña). Desactivá "Allow new users to sign up" (Authentication → Providers → Email) para que nadie más pueda registrarse.
3. Copiá `.env.example` a `.env` con la URL y la anon key (Project Settings → API).
4. `npm install` y `npm run dev`.
5. Entrá a `/#/admin`, iniciá sesión y tocá "Cargar catálogo inicial a la base". Desde ahí editás precios, nombres, categorías, imágenes y visibilidad.

## Netlify
Subí el repo a GitHub, importalo en Netlify y cargá las variables `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`. El build (`npm run build`, carpeta `dist`) ya está en `netlify.toml`.
