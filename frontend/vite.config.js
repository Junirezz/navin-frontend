/// <reference types="vitest" />
/// <reference types="node" />
import process from "node:process";
import { configDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { visualizer } from "rollup-plugin-visualizer";
// import tailwindcss from '@tailwindcss/vite'
const __dirname = fileURLToPath(new URL(".", import.meta.url));
// https://vite.dev/config/
const analyze = process.env.ANALYZE === "true";
export default defineConfig({
    plugins: [
        react(), // tailwindcss() removed temporarily for CI
        ...(analyze
            ? [
                visualizer({
                    filename: "dist/stats.html",
                    gzipSize: true,
                    brotliSize: true,
                    open: false,
                    template: "treemap",
                }),
            ]
            : []),
    ],
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src"),
            "@components": resolve(__dirname, "./src/components"),
            "@pages": resolve(__dirname, "./src/pages"),
            "@services": resolve(__dirname, "./src/services"),
            "@context": resolve(__dirname, "./src/context"),
            "@hooks": resolve(__dirname, "./src/hooks"),
            "@utils": resolve(__dirname, "./src/utils"),
            "@types": resolve(__dirname, "./src/types"),
        },
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: ["./src/test/setup.ts"],
        exclude: [...configDefaults.exclude, "src/LandingPage/sections/CoreFeatures/CoreFeatures.test.tsx"],
    },
});
