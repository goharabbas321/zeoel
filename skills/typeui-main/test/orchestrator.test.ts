import { describe, expect, it } from "vitest";
import { getRoleKeyForAgent, resolveAgentIdAlias } from "../../../src/orchestrator/index";

describe("orchestrator resolveAgentIdAlias", () => {
  it("resolves Zara aliases correctly", () => {
    expect(resolveAgentIdAlias("zara-seo")).toBe("zara-content");
    expect(resolveAgentIdAlias("Zara")).toBe("zara-content");
  });

  it("resolves Farhan aliases correctly", () => {
    expect(resolveAgentIdAlias("farhan-growth")).toBe("farhan-marketing");
    expect(resolveAgentIdAlias("farhan")).toBe("farhan-marketing");
  });

  it("resolves other mismatched agent aliases", () => {
    expect(resolveAgentIdAlias("taha-slides")).toBe("taha-presentation");
    expect(resolveAgentIdAlias("sami-spatial")).toBe("sami-computational");
    expect(resolveAgentIdAlias("yahya-phd")).toBe("yahya-researcher");
    expect(resolveAgentIdAlias("maryam-business")).toBe("maryam-ops");
    expect(resolveAgentIdAlias("zainab-product-manager")).toBe("zainab-pm");
    expect(resolveAgentIdAlias("gohar")).toBe("gohar-ceo");
  });

  it("returns canonical ID unchanged", () => {
    expect(resolveAgentIdAlias("karar-frontend")).toBe("karar-frontend");
  });
});

describe("orchestrator getRoleKeyForAgent", () => {
  it("resolves security roles correctly", () => {
    expect(getRoleKeyForAgent("hamid-security", "Audit the authentication code")).toBe("primary_security_reviewer");
    expect(getRoleKeyForAgent("hamid-security", "Laravel security fallback audit")).toBe("security_fallback");
  });

  it("resolves debugger roles correctly", () => {
    expect(getRoleKeyForAgent("sajjad-debugger", "Fix login bug")).toBe("fast_bug_fixing");
  });

  it("resolves designer roles correctly", () => {
    expect(getRoleKeyForAgent("mustafa-visual", "Create hero section")).toBe("primary_design_brain");
    expect(getRoleKeyForAgent("mahdi-designer", "Polish the UX layout")).toBe("design_polish_ux_review");
  });

  it("resolves frontend roles correctly", () => {
    expect(getRoleKeyForAgent("karar-frontend", "Build button component")).toBe("frontend_builder");
    expect(getRoleKeyForAgent("karar-frontend", "Verify and review final frontend")).toBe("frontend_final_review");
  });

  it("resolves backend roles correctly", () => {
    expect(getRoleKeyForAgent("tariq-backend", "Write DB migration")).toBe("primary_backend_builder");
    expect(getRoleKeyForAgent("tariq-backend", "Refactor multiple files in Laravel")).toBe("backend_multi_file_builder");
  });
});
