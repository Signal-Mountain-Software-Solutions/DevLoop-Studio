import { linesOrTbd } from "@/lib/helpers";


export function renderLorePack(data) {
  return [
    `# ${data.meta.projectName || "Untitled Game Project"} — Lore Pack`,
    "",
    `## Setting`,
    linesOrTbd(data.world.setting),
    "",
    `## Premise`,
    linesOrTbd(data.world.premise),
    "",
    `## Tone`,
    linesOrTbd(data.world.tone),
    "",
    `## Factions`,
    linesOrTbd(data.world.factions),
    "",
    `## Protagonist`,
    linesOrTbd(data.world.protagonist),
    "",
    `## Antagonist / Opposition`,
    linesOrTbd(data.world.antagonist),
    "",
    `## Lore Summary`,
    "",
    `## Expansion Prompt`,
    `Expand this lore pack into region descriptions, timeline/history, key NPCs, enemy archetypes, item flavor text, and a codex structure aligned to the overall game design.`,
  ].join("\n");
}