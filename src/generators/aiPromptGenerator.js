import { ENGINE_STARTERS } from "@/data/engineStarters";
import { linesOrTbd } from "@/lib/helpers";
import { renderFullMarkdown } from "@/generators/fullGddGenerator";

export function renderAiPrompt(data) {
  const starter = ENGINE_STARTERS[data.meta.genre];

  return [
    `You are an AI game development partner helping turn a structured concept into a playable starter game and complete design package.`,
    "",
    `## Context`,
    `- Project: ${data.meta.projectName || "Untitled Game Project"}`,
    `- Genre: ${starter.label}`,
    `- Platform: ${linesOrTbd(data.meta.platform)}`,
    `- Engine: ${linesOrTbd(data.technical.targetEngine)}`,
    `- Scope: ${linesOrTbd(data.concept.scopeTarget)}`,
    `- Tone: ${linesOrTbd(data.outputStudio.tone)}`,
    `- Detail Level: ${linesOrTbd(data.outputStudio.detailLevel)}`,
    `- Coding Style: ${linesOrTbd(data.outputStudio.codingStyle)}`,
    "",
    `## Requested Outputs`,
    `1. Expand missing or underspecified areas with explicit assumptions.`,
    `2. Produce a complete game design document and identify reusable systems.`,
    `3. Expand setting/lore into factions, regions, NPCs, enemies, and story hooks.`,
    `4. Produce an asset pack plan with placeholders and production priorities.`,
    `5. Define technical specs and propose a starter engine architecture.`,
    `6. Recommend an iterative build order for a prototype, vertical slice, and full build.`,
    "",
    `## Genre-Specific Starter Guidance`,
    `- Core loops: ${starter.coreLoops.join(", ")}`,
    `- Recommended modules: ${starter.engineFit.join(", ")}`,
    `- Hint: ${starter.promptHint}`,
    "",
    `## Game Inputs`,
    renderFullMarkdown(data),
    "",
    `## Additional Instructions`,
    linesOrTbd(data.outputStudio.additionalInstructions),
  ].join("\n");
}

