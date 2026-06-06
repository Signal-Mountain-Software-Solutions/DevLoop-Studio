import { ENGINE_STARTERS } from "@/data/engineStarters";
import { linesOrTbd } from "@/lib/helpers";

export function renderTechnicalSpec(data) {
  const starter = ENGINE_STARTERS[data.meta.genre];

  return [
    `# ${data.meta.projectName || "Untitled Game Project"} — Technical Starter Spec`,
    "",
    `## Genre Fit`,
    `- **Genre:** ${starter.label}`,



    `- **Engine Fit:** ${starter.engineFit.join(", ")}`,
    `- **Build Hint:** ${starter.promptHint}`,
    "",
    `## Target Engine`,
    linesOrTbd(data.technical.targetEngine),
    "",
    `## Architecture`,
    linesOrTbd(data.technical.engineArchitecture),
    "",
    `## Core Modules`,
    linesOrTbd(data.technical.coreModules),
    "",
    `## AI Partner Tasks`,
    linesOrTbd(data.technical.aiPartnerTasks),
    "",
    `## Required Tools / Pipeline`,
    linesOrTbd(data.technical.requiredTools),
    "",
    `## Performance Targets`,
    linesOrTbd(data.technical.performanceTargets),
    "",
    `## Save Data Requirements`,
    linesOrTbd(data.technical.saveDataRequirements),
    "",
    `## Multiplayer`,
    linesOrTbd(data.technical.multiplayer),
    "",
    `## Live Ops`,
    linesOrTbd(data.technical.liveOps),
    "",
    `## Expansion Prompt`,
    `Create a starter-engine implementation plan with folders/modules, pseudocode, data models, scene/state flow, reusable systems, and an iteration roadmap for vertical-slice delivery.`,
  ].join("\n");
}
``
