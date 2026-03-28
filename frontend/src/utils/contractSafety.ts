import { StrKey } from "@stellar/stellar-base";

export type ContractSafetyFailureReason =
    | "empty_contract_id"
    | "invalid_contract_strkey"
    | "contract_not_on_allowlist";

export type ContractSafetyResult =
    | { ok: true }
    | { ok: false; reason: ContractSafetyFailureReason };

/**
 * Parses a comma-separated list of Soroban contract StrKeys from config.
 * Whitespace around entries is trimmed; empty segments are dropped.
 */
export function parseContractAllowlist(raw: string | undefined): string[] {
    if (!raw?.trim()) {
        return [];
    }
    return raw
        .split(",")
        .map((entry) => entry.trim())
        .filter((entry) => entry.length > 0);
}

/**
 * Allowlist from `VITE_SOROBAN_CONTRACT_ALLOWLIST` (build-time env).
 * When empty, callers may still validate StrKey shape only.
 */
export function getContractAllowlistFromEnv(): string[] {
    const raw = import.meta.env.VITE_SOROBAN_CONTRACT_ALLOWLIST as
        | string
        | undefined;
    return parseContractAllowlist(raw);
}

/**
 * Validates that `contractId` is a well-formed Soroban contract StrKey (`C…`).
 */
export function validateSorobanContractId(
    contractId: string | undefined | null,
): ContractSafetyResult {
    if (contractId == null || !String(contractId).trim()) {
        return { ok: false, reason: "empty_contract_id" };
    }
    const trimmed = String(contractId).trim();
    if (!StrKey.isValidContract(trimmed)) {
        return { ok: false, reason: "invalid_contract_strkey" };
    }
    return { ok: true };
}

/**
 * Proxy / upgradeable setups use a stable proxy address while implementation may change.
 * The UI should only treat contract IDs as trusted when they match deployment config.
 *
 * When `allowlist` is non-empty, `contractId` must be present in the list (exact StrKey match).
 * When `allowlist` is empty, only StrKey validity is enforced (no allowlist restriction).
 */
export function assertContractOnAllowlist(
    contractId: string | undefined | null,
    allowlist: string[],
): ContractSafetyResult {
    const shape = validateSorobanContractId(contractId);
    if (!shape.ok) {
        return shape;
    }
    if (allowlist.length === 0) {
        return { ok: true };
    }
    const trimmed = String(contractId).trim();
    const allowed = new Set(allowlist.map((a) => a.trim()));
    if (!allowed.has(trimmed)) {
        return { ok: false, reason: "contract_not_on_allowlist" };
    }
    return { ok: true };
}

/**
 * Validates StrKey shape and optional allowlist using env (`VITE_SOROBAN_CONTRACT_ALLOWLIST`)
 * unless `allowlist` is passed explicitly (e.g. tests).
 */
export function checkSorobanContractForProxySafety(
    contractId: string | undefined | null,
    allowlist?: string[],
): ContractSafetyResult {
    const list = allowlist ?? getContractAllowlistFromEnv();
    return assertContractOnAllowlist(contractId, list);
}
