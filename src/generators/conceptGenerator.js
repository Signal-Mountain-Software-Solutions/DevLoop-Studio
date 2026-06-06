import { ENGINE_STARTERS } from "@/data/engineStarters";
import { linesOrTbd } from "@/lib/helpers";
 

export function renderConceptMarkdown(data) {
  const starter = ENGINE_STARTERS[data.meta.genre];

  return [
    `# ${data.meta.projectName || "Untitled Game Project"}`,
    "",
    `## Game Concept Snapshot`,
    `- **Genre:** ${starter.label}`,
    "",

    `## Elevator Pitch`,
    linesOrTbd(data.meta.elevatorPitch),
    "",
    `## Concept Summary`,
    linesOrTbd(data.meta.conceptSummary),
    "",
    `## Player Fantasy`,
    linesOrTbd(data.meta.playerFantasy),
    "",
    `## Design Pillars`,
    linesOrTbd(data.concept.pillars),
    "",
    `## Differentiators`,
    linesOrTbd(data.concept.differentiators),
    "",
    `## Suggested Starter Engine Focus`,
    `- Core loops: ${starter.coreLoops.join(", ")}`,
    `- Reusable modules: ${starter.engineFit.join(", ")}`,
    `- AI build guidance: ${starter.promptHint}`,
    "",
    `## AI Expansion Prompt`,
    `Use this concept document to expand the game into a detailed game design package. Identify assumptions, propose missing systems, expand lore, define an asset pack, and create a technical starter-engine blueprint for a ${starter.label} game. Keep outputs modular, implementation-oriented, and reusable for future genre variants.`,
  ].join("\n");
}

