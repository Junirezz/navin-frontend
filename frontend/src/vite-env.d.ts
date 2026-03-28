/// <reference types="vite/client" />

interface ImportMetaEnv {
    /** Comma-separated Soroban contract StrKeys permitted for client-side calls (proxy safety). */
    readonly VITE_SOROBAN_CONTRACT_ALLOWLIST?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
