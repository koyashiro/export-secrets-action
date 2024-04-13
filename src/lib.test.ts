import { describe, expect, it, vi } from "vitest";
import * as core from "@actions/core";
import { exportSecrets } from "./lib";

describe("exportSecrets()", () => {
  describe("success", () => {
    const coreMock = {
      getInput: vi
        .fn()
        .mockReturnValue(
          '{"KEY_A":"VALUE_A","KEY_B":"VALUE_B","KEY_C":"VALUE_C"}',
        ),
      exportVariable: vi.fn(),
    };

    it("does not throws an error", () => {
      expect(() => {
        exportSecrets(coreMock as unknown as typeof core);
      }).not.toThrow();
    });

    it('calls getInput() with "secrets"', () => {
      expect(coreMock.getInput).toHaveBeenCalledWith("secrets");
    });

    it("calls exportVariable() 3 times", () => {
      expect(coreMock.exportVariable).toHaveBeenNthCalledWith(
        1,
        "KEY_A",
        "VALUE_A",
      );
      expect(coreMock.exportVariable).toHaveBeenNthCalledWith(
        2,
        "KEY_B",
        "VALUE_B",
      );
      expect(coreMock.exportVariable).toHaveBeenNthCalledWith(
        3,
        "KEY_C",
        "VALUE_C",
      );
    });
  });

  describe("secrets is empty", () => {
    const coreMock = {
      getInput: vi.fn().mockReturnValue(""),
      exportVariable: vi.fn(),
    };

    it("throws an error", () => {
      expect(() => {
        exportSecrets(coreMock as unknown as typeof core);
      }).toThrow();
    });

    it('calls getInput() with "secrets"', () => {
      expect(coreMock.getInput).toHaveBeenCalledWith("secrets");
    });

    it("does not calls exportVariable()", () => {
      expect(coreMock.exportVariable).not.toHaveBeenCalled();
    });
  });

  describe("secret is invalid JSON", () => {
    const coreMock = {
      getInput: vi.fn().mockReturnValue("{"),
      exportVariable: vi.fn(),
    };

    it("throws an error", () => {
      expect(() => {
        exportSecrets(coreMock as unknown as typeof core);
      }).toThrow();
    });

    it('calls getInput() with "secrets"', () => {
      expect(coreMock.getInput).toHaveBeenCalledWith("secrets");
    });

    it("does not calls exportVariable()", () => {
      expect(coreMock.exportVariable).not.toHaveBeenCalled();
    });
  });
});
