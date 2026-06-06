import { linesOrTbd } from "@/lib/helpers";
    
export function renderAssetPack(data) {
  return [
    `# ${data.meta.projectName || "Untitled Game Project"} — Asset Pack Brief`,
    "",
    `## Visual Direction`,
    `- **Visual Style:** ${linesOrTbd(data.meta.visualStyle)}`,
    `- **Perspective:** ${linesOrTbd(data.meta.cameraPerspective)}`,
    `- **Platform:** ${linesOrTbd(data.meta.platform)}`,
    "",
    `## Art Needs`,
    linesOrTbd(data.assets.artNeeds),
    "",
    `## Animation Needs`,
    linesOrTbd(data.assets.animationNeeds),
    "",
    `## Audio Needs`,
    linesOrTbd(data.assets.audioNeeds),
    "",
    `## VFX Needs`,
    linesOrTbd(data.assets.vfxNeeds),
    "",
    `## Narrative Assets`,
    linesOrTbd(data.assets.narrativeAssets),
    "",
    `## Technical Assets`,
    linesOrTbd(data.assets.technicalAssets),
    "",
    `## Asset Pack Strategy`,
    `## Expansion Prompt`,
    `Convert this brief into a production-ready asset list with priorities, naming conventions, placeholder guidance, source recommendations, and handoff specs for art/audio implementation.`,
  ].join("\n");
}