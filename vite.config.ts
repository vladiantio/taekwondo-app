import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import { createAppleSplashScreens, minimal2023Preset } from '@vite-pwa/assets-generator/config';
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
    VitePWA({
      registerType: "prompt",
      includeAssets: ["favicon.svg"],
      manifest: {
        name: "Taekwondo App",
        short_name: "Taekwondo",
        description: "Aplicación de la escuela para aprender taekwondo",
        theme_color: "#0f172a",
        background_color: "#0f172a",
        display: "standalone",
        start_url: "/",
      },
      pwaAssets: {
        image: 'public/maskable_icon.png',
        preset: {
          ...minimal2023Preset,
          appleSplashScreens: createAppleSplashScreens({
            padding: 0.3,
            resizeOptions: { background: '#fff', fit: 'contain' },
            linkMediaOptions: {
              log: true,
              addMediaScreen: true,
              basePath: '/',
              xhtml: false,
            },
            png: {
              compressionLevel: 9,
              quality: 60,
            },
            name: (landscape, size) => {
              return `apple-splash-${landscape ? 'landscape' : 'portrait'}-${size.width}x${size.height}.png`;
            }
          }, [
                'iPhone 16', 'iPhone 16 Plus', 'iPhone 16 Pro', 'iPhone 16 Pro Max',
                'iPhone 15', 'iPhone 15 Plus', 'iPhone 15 Pro', 'iPhone 15 Pro Max',
                'iPhone 14', 'iPhone 14 Plus', 'iPhone 14 Pro', 'iPhone 14 Pro Max',
                'iPad 11"', 'iPad Air 11"', 'iPad Pro 11"'
             ]),
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
