import { describe, expect, it, vi } from "vitest";
import * as core from "@actions/core";
import { exportSecrets } from "./lib";

describe("exportSecrets()", () => {
  describe("success", () => {
    const coreMock = {
      getInput: vi.fn().mockImplementation((s: string) => {
        switch (s) {
          case "secrets":
            return '{"KEY_A":"VALUE_A","KEY_B":"VALUE_B","KEY_C":"VALUE_C","TF_VAR_KEY_D":"VALUE_D"}';
          case "downcase-tf-var":
            return "";
          default:
            return "";
        }
      }),
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

    it('calls getInput() with "downcase-tf-var"', () => {
      expect(coreMock.getInput).toHaveBeenCalledWith("downcase-tf-var");
    });

    it("calls exportVariable() 4 times", () => {
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
      expect(coreMock.exportVariable).toHaveBeenNthCalledWith(
        4,
        "TF_VAR_KEY_D",
        "VALUE_D",
      );
    });
  });

  describe("success_downcase-tf-var", () => {
    const coreMock = {
      getInput: vi.fn().mockImplementation((s: string) => {
        switch (s) {
          case "secrets":
            return '{"KEY_A":"VALUE_A","KEY_B":"VALUE_B","KEY_C":"VALUE_C","TF_VAR_KEY_D":"VALUE_D"}';
          case "downcase-tf-var":
            return "true";
          default:
            return "";
        }
      }),
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

    it('calls getInput() with "downcase-tf-var"', () => {
      expect(coreMock.getInput).toHaveBeenCalledWith("downcase-tf-var");
    });

    it("calls exportVariable() 4 times", () => {
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
      expect(coreMock.exportVariable).toHaveBeenNthCalledWith(
        4,
        "TF_VAR_key_d",
        "VALUE_D",
      );
    });
  });

  describe("secrets is empty", () => {
    const coreMock = {
      getInput: vi.fn().mockImplementation((s: string) => {
        switch (s) {
          case "secrets":
            return "{";
          case "downcase-tf-var":
            return "";
          default:
            return "";
        }
      }),
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

    it('calls getInput() with "downcase-tf-var"', () => {
      expect(coreMock.getInput).toHaveBeenCalledWith("downcase-tf-var");
    });

    it("does not calls exportVariable()", () => {
      expect(coreMock.exportVariable).not.toHaveBeenCalled();
    });
  });

  describe("secret is invalid JSON", () => {
    const coreMock = {
      getInput: vi.fn().mockImplementation((s: string) => {
        switch (s) {
          case "secrets":
            return "{";
          case "downcase-tf-var":
            return "";
          default:
            return "";
        }
      }),
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

    it('calls getInput() with "downcase-tf-var"', () => {
      expect(coreMock.getInput).toHaveBeenCalledWith("downcase-tf-var");
    });

    it("does not calls exportVariable()", () => {
      expect(coreMock.exportVariable).not.toHaveBeenCalled();
    });
  });
});
