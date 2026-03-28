import { describe, it, expect } from "vitest";
import {
    parseContractAllowlist,
    validateSorobanContractId,
    assertContractOnAllowlist,
    checkSorobanContractForProxySafety,
} from "./contractSafety";

/** Deterministic valid Soroban contract StrKeys (32-byte payloads encoded with StrKey). */
const CONTRACT_A =
    "CAAQCAIBAEAQCAIBAEAQCAIBAEAQCAIBAEAQCAIBAEAQCAIBAEAQC526";
const CONTRACT_B =
    "CABAEAQCAIBAEAQCAIBAEAQCAIBAEAQCAIBAEAQCAIBAEAQCAIBAFNSZ";

describe("parseContractAllowlist", () => {
    it("returns empty array for undefined/blank", () => {
        expect(parseContractAllowlist(undefined)).toEqual([]);
        expect(parseContractAllowlist("")).toEqual([]);
        expect(parseContractAllowlist("  ")).toEqual([]);
    });

    it("splits on comma and trims entries", () => {
        expect(
            parseContractAllowlist(` ${CONTRACT_A} , ${CONTRACT_B} `),
        ).toEqual([CONTRACT_A, CONTRACT_B]);
    });
});

describe("validateSorobanContractId", () => {
    it("rejects empty and non-contract StrKeys", () => {
        expect(validateSorobanContractId("")).toEqual({
            ok: false,
            reason: "empty_contract_id",
        });
        expect(validateSorobanContractId(null)).toEqual({
            ok: false,
            reason: "empty_contract_id",
        });
        expect(
            validateSorobanContractId(
                "GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF",
            ),
        ).toEqual({
            ok: false,
            reason: "invalid_contract_strkey",
        });
    });

    it("accepts a valid contract StrKey", () => {
        expect(validateSorobanContractId(CONTRACT_A)).toEqual({ ok: true });
    });
});

describe("assertContractOnAllowlist", () => {
    it("when allowlist is empty, only validates StrKey", () => {
        expect(assertContractOnAllowlist(CONTRACT_A, [])).toEqual({
            ok: true,
        });
    });

    it("when allowlist is set, rejects unknown ids", () => {
        expect(
            assertContractOnAllowlist(CONTRACT_A, [CONTRACT_B]),
        ).toEqual({
            ok: false,
            reason: "contract_not_on_allowlist",
        });
    });

    it("when allowlist is set, accepts listed ids", () => {
        expect(
            assertContractOnAllowlist(CONTRACT_A, [CONTRACT_A, CONTRACT_B]),
        ).toEqual({ ok: true });
    });
});

describe("checkSorobanContractForProxySafety", () => {
    it("uses explicit allowlist when provided", () => {
        expect(
            checkSorobanContractForProxySafety(CONTRACT_A, [CONTRACT_A]),
        ).toEqual({ ok: true });
        expect(
            checkSorobanContractForProxySafety(CONTRACT_A, [CONTRACT_B]),
        ).toEqual({
            ok: false,
            reason: "contract_not_on_allowlist",
        });
    });
});
