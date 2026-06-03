# DevLoop-Studio
this tool will prompt it's users to help create game design documents and build out structured Ai-executable outputs to vibe code prototypes more quickly and accurately or to iterate or a standard engine.


initial code to transfer

import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import {
  Download,
  Save,
  Sparkles,
  Gamepad2,
  FileText,
  Layers3,
  Wand2,
  RefreshCcw,
  Copy,
  CheckCircle2,
  BookOpen,
  Cpu,
} from "lucide-react";

const STORAGE_KEY = "game-design-document-builder-v1";

const ENGINE_STARTERS = {
  rpg: {
    label: "RPG",
    coreLoops: ["Explore world", "Complete quests", "Grow character build", "Acquire gear and abilities"],
    engineFit: ["Character stats system", "Dialogue system", "Quest/state tracking", "Inventory/equipment", "Save/load"],
    promptHint:
      "Focus on player progression, narrative scaffolding, party/single-character systems, and extensible quest logic.",
    suggestedSystems: ["Combat", "Inventory", "Skill trees", "NPC dialogue", "Quest journal", "Loot tables"],
    suggestedContent: ["Hub town", "Open zones or dungeons", "Boss encounters", "Quest chains", "Factions"],
  },
  management: {
    label: "Management",
    coreLoops: ["Allocate resources", "Optimize systems", "Respond to events", "Expand operations"],
    engineFit: ["Economy/resource simulation", "Time/calendar system", "AI agents/workers", "Buildings/production chains", "UI-heavy dashboards"],
    promptHint:
      "Focus on simulation rules, economy balancing, worker/job logic, feedback loops, and scalable UI systems.",
    suggestedSystems: ["Resource simulation", "Worker AI", "Timers", "Production chains", "Event system", "Analytics HUD"],
    suggestedContent: ["Facilities", "Upgrade paths", "Randomized events", "Objectives", "Scenario modifiers"],
  },
  strategy: {
    label: "Strategy",
    coreLoops: ["Plan tactics", "Control units/factions", "Capture objectives", "Escalate strategic advantage"],
    engineFit: ["Grid/map system", "Turn or real-time orchestration", "Unit/pathfinding", "AI opponent behaviors", "Fog of war/objectives"],
    promptHint:
      "Focus on map logic, AI behavior trees, faction systems, combat resolution, and content modularity.",
    suggestedSystems: ["Map/grid", "Pathfinding", "Faction AI", "Combat resolution", "Objectives", "Tech tree"],
    suggestedContent: ["Campaign scenarios", "Maps/biomes", "Units/heroes", "Factions", "Victory conditions"],
  },
  puzzle: {
    label: "Puzzle",
    coreLoops: ["Understand rules", "Experiment with interactions", "Solve escalating challenges", "Unlock new mechanics"],
    engineFit: ["Rule/state engine", "Level definitions", "Undo/reset", "Hint/progression system", "Minimal but precise feedback systems"],
    promptHint:
      "Focus on core mechanic clarity, level schema, interaction rules, progression cadence, and accessibility.",
    suggestedSystems: ["Rule engine", "Hint system", "Undo/reset", "Level selector", "Scoring", "Accessibility modes"],
    suggestedContent: ["Mechanic tiers", "Tutorial steps", "Curated levels", "Challenge variants", "Daily puzzles"],
  },
  roguelite: {
    label: "Rogue-lite",
    coreLoops: ["Run-based progression", "Fight/explore", "Earn meta upgrades", "Replay with variation"],
    engineFit: ["Procedural generation", "Combat systems", "Loot/perk tables", "Meta progression", "Encounter/event framework"],
    promptHint:
      "Focus on replayability, procedural content generation, combat feel, reward loops, and persistent unlock systems.",
    suggestedSystems: ["Procgen", "Encounter tables", "Meta unlocks", "Loadouts", "Reward rooms", "Run history"],
    suggestedContent: ["Biomes", "Encounter pools", "Bosses", "Perks/relics", "Meta progression tree"],
  },
};

const DEFAULT_DATA = {
  meta: {
    projectName: "",
    version: "0.1",
    genre: "rpg",
    elevatorPitch: "",
    conceptSummary: "",
    playerFantasy: "",
    audience: "",
    platform: "PC",
    cameraPerspective: "",
    visualStyle: "",
    engineStarter: "Auto-select based on genre",
  },
  concept: {
    pillars: "",
    inspirations: "",
    differentiators: "",
    sessionLength: "",
    monetization: "Premium / TBD",
    scopeTarget: "Indie vertical slice",
    winCondition: "",
    failState: "",
    emotionalGoal: "",
  },
  world: {
    setting: "",
    premise: "",
    factions: "",
    loreSummary: "",
    tone: "",
    narrativeStructure: "",
    protagonist: "",
    antagonist: "",
  },
  systems: {
    coreLoop: "",
    progression: "",
    systemsList: "",
    controls: "",
    combatOrInteraction: "",
    economy: "",
    difficulty: "",
    saveModel: "",
    replayability: "",
  },
  content: {
    gameModes: "Single-player",
    levelsOrWorldStructure: "",
    questStructure: "",
    enemiesOrChallenges: "",
    itemsAbilities: "",
    uiUxNotes: "",
    accessibility: "",
    tutorialOnboarding: "",
  },
  assets: {
    artNeeds: "",
    animationNeeds: "",
    audioNeeds: "",
    vfxNeeds: "",
    narrativeAssets: "",
    technicalAssets: "",
    assetPackApproach: "",
  },
  technical: {
    targetEngine: "Unity / Godot / Unreal / Custom - TBD",
    engineArchitecture: "",
    coreModules: "",
    aiPartnerTasks: "",
    requiredTools: "",
    performanceTargets: "",
    saveDataRequirements: "",
    multiplayer: "No",
    liveOps: "No",
  },
  outputStudio: {
    tone: "Executive-ready, creative but implementation-oriented",
    detailLevel: "High",
    preferredFormat: "Markdown",
    includeConceptDoc: true,
    includeFullGdd: true,
    includeLorePack: true,
    includeAssetPack: true,
    includeTechnicalSpec: true,
    includeAiBuildPrompt: true,
    aiPartner: "Copilot / general coding assistant",
    codingStyle: "Modular, iterative, starter-engine friendly",
    additionalInstructions:
      "Generate practical implementation details, identify assumptions, and propose reusable systems where possible.",
  },
};

function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

function setNestedValue(obj, path, value) {
  const keys = path.split(".");
  const clone = JSON.parse(JSON.stringify(obj));
  let current = clone;
  for (let i = 0; i < keys.length - 1; i++) {
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
  return clone;
}

function field(label, path, placeholder, textarea = false) {
  return { label, path, placeholder, textarea };
}

const SECTIONS = [
  {
    key: "meta",
    title: "Concept Intake",
    description: "Front-load enough information to generate a strong concept document.",
    icon: Gamepad2,
    fields: [
      field("Project Name", "meta.projectName", "e.g., Ashen Crown"),
      field("Elevator Pitch", "meta.elevatorPitch", "One-sentence hook for the game", true),
      field("Concept Summary", "meta.conceptSummary", "What is the game? What makes it compelling?", true),
      field("Player Fantasy", "meta.playerFantasy", "Who is the player becoming or doing?", true),
      field("Target Audience", "meta.audience", "Who is this for? Genre fans? Casual players?", true),
      field("Platform", "meta.platform", "PC, console, mobile, web"),
      field("Camera / Perspective", "meta.cameraPerspective", "Top-down, isometric, side view, first-person, etc."),
      field("Visual Style", "meta.visualStyle", "Pixel art, stylized 3D, low poly, hand-drawn, etc."),
    ],
  },
  {
    key: "concept",
    title: "Design North Star",
    description: "Define the pillars and deliberate choices that anchor the game.",
    icon: Sparkles,
    fields: [
      field("Design Pillars", "concept.pillars", "3-5 non-negotiable design pillars", true),
      field("Inspirations / Comparables", "concept.inspirations", "Games, genres, media, references", true),
      field("Differentiators", "concept.differentiators", "Why this game stands out", true),
      field("Ideal Session Length", "concept.sessionLength", "How long should a typical play session be?"),
      field("Monetization Model", "concept.monetization", "Premium, free-to-play, demo, etc."),
      field("Scope Target", "concept.scopeTarget", "Prototype, vertical slice, indie launch, etc."),
      field("Win Condition", "concept.winCondition", "How does the player succeed?", true),
      field("Fail State", "concept.failState", "How does the player fail or loop?", true),
      field("Emotional Goal", "concept.emotionalGoal", "What should the player feel?", true),
    ],
  },
  {
    key: "world",
    title: "World, Lore & Narrative",
    description: "Capture the setting, fiction, and narrative scaffolding.",
    icon: BookOpen,
    fields: [
      field("Setting", "world.setting", "World/era/location", true),
      field("Premise", "world.premise", "Narrative premise and initial setup", true),
      field("Factions", "world.factions", "Key groups, alliances, rivals", true),
      field("Lore Summary", "world.loreSummary", "Mythology, history, backstory", true),
      field("Tone", "world.tone", "Whimsical, dark, hopeful, satirical, etc."),
      field("Narrative Structure", "world.narrativeStructure", "Linear, branching, emergent, run-based environmental storytelling"),
      field("Protagonist", "world.protagonist", "Main character / role", true),
      field("Antagonist / Opposition", "world.antagonist", "Primary opposing force", true),
    ],
  },
  {
    key: "systems",
    title: "Core Systems & Progression",
    description: "Outline the mechanical foundation and progression model.",
    icon: Layers3,
    fields: [
      field("Core Loop", "systems.coreLoop", "Describe the repeatable core loop", true),
      field("Progression", "systems.progression", "Character/base/meta progression", true),
      field("Systems List", "systems.systemsList", "Combat, crafting, dialogue, farming, deckbuilding, etc.", true),
      field("Controls / Input", "systems.controls", "Keyboard/mouse, controller, touch, etc.", true),
      field("Combat / Interaction Model", "systems.combatOrInteraction", "Turn-based, real-time, swap/match, placement, dialog choices, etc.", true),
      field("Economy / Resource Model", "systems.economy", "Currencies, resources, sinks, earnings", true),
      field("Difficulty Model", "systems.difficulty", "Scaling, settings, challenge structure", true),
      field("Save Model", "systems.saveModel", "Checkpoint, save-anywhere, per-run, chapter-based"),
      field("Replayability Hooks", "systems.replayability", "Randomization, unlocks, alternate builds, scenarios", true),
    ],
  },
  {
    key: "content",
    title: "Content & Experience Design",
    description: "Define the playable content, structure, and user experience.",
    icon: FileText,
    fields: [
      field("Game Modes", "content.gameModes", "Single-player, co-op, PvP, sandbox, campaign"),
      field("Level / World Structure", "content.levelsOrWorldStructure", "Acts, biomes, stages, map nodes, overworld, etc.", true),
      field("Quest / Objective Structure", "content.questStructure", "Primary/side quests, objectives, contracts, goals", true),
      field("Enemies / Challenges", "content.enemiesOrChallenges", "Enemy types, puzzle constraints, dilemmas, disasters", true),
      field("Items / Abilities / Tools", "content.itemsAbilities", "Weapons, cards, spells, powers, management tools", true),
      field("UI/UX Notes", "content.uiUxNotes", "HUD, menus, information density, interaction patterns", true),
      field("Accessibility", "content.accessibility", "Input remapping, colorblind support, readability, assist modes", true),
      field("Tutorial / Onboarding", "content.tutorialOnboarding", "How the game teaches players", true),
    ],
  },
  {
    key: "assets",
    title: "Asset Pack Planning",
    description: "Specify what is needed to generate, source, or commission assets.",
    icon: Wand2,
    fields: [
      field("Art Needs", "assets.artNeeds", "Characters, environments, icons, UI, props, tilesets", true),
      field("Animation Needs", "assets.animationNeeds", "Locomotion, combat, reactions, UI transitions", true),
      field("Audio Needs", "assets.audioNeeds", "Music, SFX, ambience, VO", true),
      field("VFX Needs", "assets.vfxNeeds", "Spell effects, impacts, environmental effects", true),
      field("Narrative Assets", "assets.narrativeAssets", "Dialogue, codex, item descriptions, lore text", true),
      field("Technical Assets", "assets.technicalAssets", "Prefabs, sprite atlases, data tables, config files", true),
      field("Asset Pack Approach", "assets.assetPackApproach", "Original, kitbash, marketplace packs, AI-generated placeholders", true),
    ],
  },
  {
    key: "technical",
    title: "Engine Starter & Technical Specs",
    description: "Define what an AI partner would need to create a starter engine and implementation plan.",
    icon: Cpu,
    fields: [
      field("Target Engine", "technical.targetEngine", "Unity, Godot, Unreal, custom web stack"),
      field("Engine Architecture", "technical.engineArchitecture", "Scene structure, data-driven systems, ECS/OOP approach", true),
      field("Core Modules", "technical.coreModules", "Input, camera, state machine, save/load, AI, combat, UI, procgen, etc.", true),
      field("AI Partner Tasks", "technical.aiPartnerTasks", "What should Copilot/AI generate, propose, or scaffold?", true),
      field("Required Tools / Pipeline", "technical.requiredTools", "Engine, version control, asset tools, script pipelines", true),
      field("Performance Targets", "technical.performanceTargets", "Frame rate, load time, memory, device targets", true),
      field("Save Data Requirements", "technical.saveDataRequirements", "What must be serialized?", true),
      field("Multiplayer Need", "technical.multiplayer", "No / Optional / Yes"),
      field("Live Ops / Post-Launch", "technical.liveOps", "No / Seasonal / Ongoing content"),
    ],
  },
];

const OUTPUT_TOGGLES = [
  { key: "includeConceptDoc", label: "Concept Document" },
  { key: "includeFullGdd", label: "Full GDD" },
  { key: "includeLorePack", label: "Lore Pack" },
  { key: "includeAssetPack", label: "Asset Pack" },
  { key: "includeTechnicalSpec", label: "Technical Spec" },
  { key: "includeAiBuildPrompt", label: "AI Build Prompt" },
];

function linesOrTbd(value) {
  return value && String(value).trim() ? String(value).trim() : "TBD";
}

function renderConceptMarkdown(data) {
  const starter = ENGINE_STARTERS[data.meta.genre];
  const lines = [];
  lines.push(`# ${data.meta.projectName || "Untitled Game Project"}`);
  lines.push("");
  lines.push(`## Game Concept Snapshot`);
  lines.push(`- **Genre:** ${starter.label}`);
  lines.push(`- **Platform:** ${linesOrTbd(data.meta.platform)}`);
  lines.push(`- **Perspective:** ${linesOrTbd(data.meta.cameraPerspective)}`);
  lines.push(`- **Visual Style:** ${linesOrTbd(data.meta.visualStyle)}`);
  lines.push(`- **Scope Target:** ${linesOrTbd(data.concept.scopeTarget)}`);
  lines.push(`- **Monetization:** ${linesOrTbd(data.concept.monetization)}`);
  lines.push("");
  lines.push(`## Elevator Pitch`);
  lines.push(linesOrTbd(data.meta.elevatorPitch));
  lines.push("");
  lines.push(`## Concept Summary`);
  lines.push(linesOrTbd(data.meta.conceptSummary));
  lines.push("");
  lines.push(`## Player Fantasy`);
  lines.push(linesOrTbd(data.meta.playerFantasy));
  lines.push("");
  lines.push(`## Design Pillars`);
  lines.push(linesOrTbd(data.concept.pillars));
  lines.push("");
  lines.push(`## Differentiators`);
  lines.push(linesOrTbd(data.concept.differentiators));
  lines.push("");
  lines.push(`## Suggested Starter Engine Focus`);
  lines.push(`- Core loops: ${starter.coreLoops.join(", ")}`);
  lines.push(`- Reusable modules: ${starter.engineFit.join(", ")}`);
  lines.push(`- AI build guidance: ${starter.promptHint}`);
  lines.push("");
  lines.push(`## AI Expansion Prompt`);
  lines.push(
    `Use this concept document to expand the game into a detailed game design package. Identify assumptions, propose missing systems, expand lore, define an asset pack, and create a technical starter-engine blueprint for a ${starter.label} game. Keep outputs modular, implementation-oriented, and reusable for future genre variants.`
  );
  return lines.join("\
");
}

function renderFullMarkdown(data) {
  const starter = ENGINE_STARTERS[data.meta.genre];
  const lines = [];
  lines.push(`# ${data.meta.projectName || "Untitled Game Project"} — Full Game Design Document`);
  lines.push("");
  lines.push(`## Project Metadata`);
  lines.push(`- **Version:** ${linesOrTbd(data.meta.version)}`);
  lines.push(`- **Genre:** ${starter.label}`);
  lines.push(`- **Platform:** ${linesOrTbd(data.meta.platform)}`);
  lines.push(`- **Perspective:** ${linesOrTbd(data.meta.cameraPerspective)}`);
  lines.push(`- **Visual Style:** ${linesOrTbd(data.meta.visualStyle)}`);
  lines.push(`- **Target Audience:** ${linesOrTbd(data.meta.audience)}`);
  lines.push(`- **Scope Target:** ${linesOrTbd(data.concept.scopeTarget)}`);
  lines.push(`- **Session Length:** ${linesOrTbd(data.concept.sessionLength)}`);
  lines.push(`- **Monetization:** ${linesOrTbd(data.concept.monetization)}`);
  lines.push("");
  lines.push(`## Concept & Vision`);
  lines.push(`### Elevator Pitch`);
  lines.push(linesOrTbd(data.meta.elevatorPitch));
  lines.push("");
  lines.push(`### Concept Summary`);
  lines.push(linesOrTbd(data.meta.conceptSummary));
  lines.push("");
  lines.push(`### Player Fantasy`);
  lines.push(linesOrTbd(data.meta.playerFantasy));
  lines.push("");
  lines.push(`### Design Pillars`);
  lines.push(linesOrTbd(data.concept.pillars));
  lines.push("");
  lines.push(`### Inspirations / Comparables`);
  lines.push(linesOrTbd(data.concept.inspirations));
  lines.push("");
  lines.push(`### Differentiators`);
  lines.push(linesOrTbd(data.concept.differentiators));
  lines.push("");
  lines.push(`### Emotional Goal`);
  lines.push(linesOrTbd(data.concept.emotionalGoal));
  lines.push("");
  lines.push(`### Win / Fail Structure`);
  lines.push(`- **Win:** ${linesOrTbd(data.concept.winCondition)}`);
  lines.push(`- **Fail / Loop:** ${linesOrTbd(data.concept.failState)}`);
  lines.push("");
  lines.push(`## World & Narrative`);
  lines.push(`- **Setting:** ${linesOrTbd(data.world.setting)}`);
  lines.push(`- **Premise:** ${linesOrTbd(data.world.premise)}`);
  lines.push(`- **Tone:** ${linesOrTbd(data.world.tone)}`);
  lines.push(`- **Narrative Structure:** ${linesOrTbd(data.world.narrativeStructure)}`);
  lines.push(`- **Protagonist:** ${linesOrTbd(data.world.protagonist)}`);
  lines.push(`- **Antagonist / Opposition:** ${linesOrTbd(data.world.antagonist)}`);
  lines.push(`- **Factions:** ${linesOrTbd(data.world.factions)}`);
  lines.push(`- **Lore Summary:** ${linesOrTbd(data.world.loreSummary)}`);
  lines.push("");
  lines.push(`## Core Systems`);
  lines.push(`- **Core Loop:** ${linesOrTbd(data.systems.coreLoop)}`);
  lines.push(`- **Progression:** ${linesOrTbd(data.systems.progression)}`);
  lines.push(`- **Systems List:** ${linesOrTbd(data.systems.systemsList)}`);
  lines.push(`- **Controls / Input:** ${linesOrTbd(data.systems.controls)}`);
  lines.push(`- **Combat / Interaction:** ${linesOrTbd(data.systems.combatOrInteraction)}`);
  lines.push(`- **Economy / Resource Model:** ${linesOrTbd(data.systems.economy)}`);
  lines.push(`- **Difficulty:** ${linesOrTbd(data.systems.difficulty)}`);
  lines.push(`- **Save Model:** ${linesOrTbd(data.systems.saveModel)}`);
  lines.push(`- **Replayability Hooks:** ${linesOrTbd(data.systems.replayability)}`);
  lines.push("");
  lines.push(`## Content Structure`);
  lines.push(`- **Game Modes:** ${linesOrTbd(data.content.gameModes)}`);
  lines.push(`- **Level / World Structure:** ${linesOrTbd(data.content.levelsOrWorldStructure)}`);
  lines.push(`- **Quest / Objective Structure:** ${linesOrTbd(data.content.questStructure)}`);
  lines.push(`- **Enemies / Challenges:** ${linesOrTbd(data.content.enemiesOrChallenges)}`);
  lines.push(`- **Items / Abilities / Tools:** ${linesOrTbd(data.content.itemsAbilities)}`);
  lines.push(`- **UI/UX Notes:** ${linesOrTbd(data.content.uiUxNotes)}`);
  lines.push(`- **Accessibility:** ${linesOrTbd(data.content.accessibility)}`);
  lines.push(`- **Onboarding:** ${linesOrTbd(data.content.tutorialOnboarding)}`);
  lines.push("");
  lines.push(`## Asset Pack Requirements`);
  lines.push(`- **Art:** ${linesOrTbd(data.assets.artNeeds)}`);
  lines.push(`- **Animation:** ${linesOrTbd(data.assets.animationNeeds)}`);
  lines.push(`- **Audio:** ${linesOrTbd(data.assets.audioNeeds)}`);
  lines.push(`- **VFX:** ${linesOrTbd(data.assets.vfxNeeds)}`);
  lines.push(`- **Narrative Assets:** ${linesOrTbd(data.assets.narrativeAssets)}`);
  lines.push(`- **Technical Assets:** ${linesOrTbd(data.assets.technicalAssets)}`);
  lines.push(`- **Asset Strategy:** ${linesOrTbd(data.assets.assetPackApproach)}`);
  lines.push("");
  lines.push(`## Starter Engine Blueprint`);
  lines.push(`- **Starter Engine Pattern:** ${starter.label}`);
  lines.push(`- **Suggested Core Loops:** ${starter.coreLoops.join(", ")}`);
  lines.push(`- **Reusable Modules:** ${starter.engineFit.join(", ")}`);
  lines.push(`- **Target Engine:** ${linesOrTbd(data.technical.targetEngine)}`);
  lines.push(`- **Architecture:** ${linesOrTbd(data.technical.engineArchitecture)}`);
  lines.push(`- **Core Modules:** ${linesOrTbd(data.technical.coreModules)}`);
  lines.push(`- **AI Partner Tasks:** ${linesOrTbd(data.technical.aiPartnerTasks)}`);
  lines.push(`- **Required Tools / Pipeline:** ${linesOrTbd(data.technical.requiredTools)}`);
  lines.push(`- **Performance Targets:** ${linesOrTbd(data.technical.performanceTargets)}`);
  lines.push(`- **Save Data Requirements:** ${linesOrTbd(data.technical.saveDataRequirements)}`);
  lines.push(`- **Multiplayer:** ${linesOrTbd(data.technical.multiplayer)}`);
  lines.push(`- **Live Ops:** ${linesOrTbd(data.technical.liveOps)}`);
  lines.push("");
  lines.push(`## Output Configuration`);
  lines.push(`- **Tone:** ${linesOrTbd(data.outputStudio.tone)}`);
  lines.push(`- **Detail Level:** ${linesOrTbd(data.outputStudio.detailLevel)}`);
  lines.push(`- **Preferred Format:** ${linesOrTbd(data.outputStudio.preferredFormat)}`);
  lines.push(`- **AI Partner:** ${linesOrTbd(data.outputStudio.aiPartner)}`);
  lines.push(`- **Coding Style:** ${linesOrTbd(data.outputStudio.codingStyle)}`);
  lines.push(`- **Additional Instructions:** ${linesOrTbd(data.outputStudio.additionalInstructions)}`);
  lines.push("");
  lines.push(`## AI Partner Build Prompt`);
  lines.push(
    `Act as a game design and implementation partner. Use this GDD to: (1) identify missing details, (2) expand lore and content needs, (3) define a reusable asset pack structure, (4) produce a technical implementation roadmap, and (5) scaffold a starter engine for a ${starter.label} using ${linesOrTbd(data.technical.targetEngine)}. Favor modular architecture, reusable systems, data-driven content, placeholder assets where needed, and iterative delivery suitable for AI-assisted development.`
  );
  return lines.join("\
");
}

function renderLorePack(data) {
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
    linesOrTbd(data.world.loreSummary),
    "",
    `## Expansion Prompt`,
    `Expand this lore pack into region descriptions, timeline/history, key NPCs, enemy archetypes, item flavor text, and a codex structure aligned to the overall game design.`
  ].join("\
");
}

function renderAssetPack(data) {
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
    linesOrTbd(data.assets.assetPackApproach),
    "",
    `## Expansion Prompt`,
    `Convert this brief into a production-ready asset list with priorities, naming conventions, placeholder guidance, source recommendations, and handoff specs for art/audio implementation.`
  ].join("\
");
}

function renderTechnicalSpec(data) {
  const starter = ENGINE_STARTERS[data.meta.genre];
  return [
    `# ${data.meta.projectName || "Untitled Game Project"} — Technical Starter Spec`,
    "",
    `## Genre Fit`,
    `- **Genre:** ${starter.label}`,
    `- **Core Loops:** ${starter.coreLoops.join(", ")}`,
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
    `Create a starter-engine implementation plan with folders/modules, pseudocode, data models, scene/state flow, reusable systems, and an iteration roadmap for vertical-slice delivery.`
  ].join("\
");
}

function renderAiPrompt(data) {
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
  ].join("\
");
}

function downloadText(filename, content) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function SectionForm({ section, data, onChange }) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {section.fields.map((f) => {
        const value = getNestedValue(data, f.path) || "";
        return (
          <div key={f.path} className={f.textarea ? "lg:col-span-2" : ""}>
            <Label className="mb-2 block text-sm font-medium">{f.label}</Label>
            {f.textarea ? (
              <Textarea
                value={value}
                onChange={(e) => onChange(f.path, e.target.value)}
                placeholder={f.placeholder}
                className="min-h-[120px] rounded-2xl"
              />
            ) : (
              <Input
                value={value}
                onChange={(e) => onChange(f.path, e.target.value)}
                placeholder={f.placeholder}
                className="rounded-2xl"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function GenreStarterCard({ genre, onApply }) {
  const starter = ENGINE_STARTERS[genre];
  return (
    <Card className="rounded-2xl border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-violet-600" />
          {starter.label} Starter Pattern
        </CardTitle>
        <CardDescription>{starter.promptHint}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="mb-2 block text-xs uppercase tracking-wide text-slate-500">Core Loops</Label>
          <div className="flex flex-wrap gap-2">
            {starter.coreLoops.map((item) => (
              <Badge key={item} variant="secondary" className="rounded-full px-3 py-1">
                {item}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <Label className="mb-2 block text-xs uppercase tracking-wide text-slate-500">Reusable Modules</Label>
          <div className="flex flex-wrap gap-2">
            {starter.engineFit.map((item) => (
              <Badge key={item} className="rounded-full bg-slate-100 px-3 py-1 text-slate-800 hover:bg-slate-100">
                {item}
              </Badge>
            ))}
          </div>
        </div>
        <Button onClick={onApply} className="rounded-2xl">
          <Wand2 className="mr-2 h-4 w-4" />
          Apply Genre Suggestions to Blank Fields
        </Button>
      </CardContent>
    </Card>
  );
}

export default function GameDesignDocumentBuilder() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [outputTab, setOutputTab] = useState("concept");
  const [copied, setCopied] = useState("");
  const [savedAt, setSavedAt] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setData({ ...DEFAULT_DATA, ...parsed, meta: { ...DEFAULT_DATA.meta, ...parsed.meta } });
      }
    } catch (e) {
      console.error("Failed to load saved state", e);
    }
  }, []);

  useEffect(() => {
    setData((prev) => {
      const starter = ENGINE_STARTERS[prev.meta.genre];
      if (prev.meta.engineStarter === starter.label) return prev;
      return setNestedValue(prev, "meta.engineStarter", starter.label);
    });
  }, [data.meta.genre]);

  const setField = (path, value) => {
    setData((prev) => setNestedValue(prev, path, value));
  };

  const saveLocal = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setSavedAt(new Date().toLocaleString());
    } catch (e) {
      console.error("Failed to save state", e);
    }
  };

  const resetAll = () => {
    setData(DEFAULT_DATA);
    localStorage.removeItem(STORAGE_KEY);
    setSavedAt("");
  };

  const applyGenreSuggestions = () => {
    const starter = ENGINE_STARTERS[data.meta.genre];
    let next = JSON.parse(JSON.stringify(data));

    if (!next.systems.coreLoop.trim()) next.systems.coreLoop = starter.coreLoops.join(" → ");
    if (!next.systems.systemsList.trim()) next.systems.systemsList = starter.suggestedSystems.join(", ");
    if (!next.technical.coreModules.trim()) next.technical.coreModules = starter.engineFit.join(", ");
    if (!next.content.levelsOrWorldStructure.trim()) next.content.levelsOrWorldStructure = starter.suggestedContent.join(", ");
    if (!next.technical.aiPartnerTasks.trim()) {
      next.technical.aiPartnerTasks = `Scaffold the ${starter.label} starter engine, define data models, propose placeholder assets, generate implementation sequence, and identify risks / missing design decisions.`;
    }
    if (!next.outputStudio.additionalInstructions.trim()) {
      next.outputStudio.additionalInstructions = starter.promptHint;
    }

    setData(next);
  };

  const flattenedFields = useMemo(
    () => SECTIONS.flatMap((section) => section.fields.map((f) => f.path)),
    []
  );

  const completion = useMemo(() => {
    const filled = flattenedFields.filter((path) => {
      const value = getNestedValue(data, path);
      return value !== undefined && value !== null && String(value).trim() !== "";
    }).length;
    return Math.round((filled / flattenedFields.length) * 100);
  }, [data, flattenedFields]);

  const sectionCompletion = useMemo(() => {
    return SECTIONS.map((section) => {
      const total = section.fields.length;
      const filled = section.fields.filter((f) => {
        const value = getNestedValue(data, f.path);
        return value !== undefined && value !== null && String(value).trim() !== "";
      }).length;
      return { ...section, completed: filled, total, percent: Math.round((filled / total) * 100) };
    });
  }, [data]);

  const conceptMarkdown = useMemo(() => renderConceptMarkdown(data), [data]);
  const fullMarkdown = useMemo(() => renderFullMarkdown(data), [data]);
  const lorePack = useMemo(() => renderLorePack(data), [data]);
  const assetPack = useMemo(() => renderAssetPack(data), [data]);
  const technicalSpec = useMemo(() => renderTechnicalSpec(data), [data]);
  const aiPrompt = useMemo(() => renderAiPrompt(data), [data]);
  const exportJson = useMemo(() => JSON.stringify(data, null, 2), [data]);

  const outputs = {
    concept: conceptMarkdown,
    gdd: fullMarkdown,
    lore: lorePack,
    assets: assetPack,
    technical: technicalSpec,
    prompt: aiPrompt,
    json: exportJson,
  };

  const outputFileNames = {
    concept: `${(data.meta.projectName || "untitled-game").toLowerCase().replace(/\\s+/g, "-")}-concept.md`,
    gdd: `${(data.meta.projectName || "untitled-game").toLowerCase().replace(/\\s+/g, "-")}-gdd.md`,
    lore: `${(data.meta.projectName || "untitled-game").toLowerCase().replace(/\\s+/g, "-")}-lore-pack.md`,
    assets: `${(data.meta.projectName || "untitled-game").toLowerCase().replace(/\\s+/g, "-")}-asset-pack.md`,
    technical: `${(data.meta.projectName || "untitled-game").toLowerCase().replace(/\\s+/g, "-")}-technical-spec.md`,
    prompt: `${(data.meta.projectName || "untitled-game").toLowerCase().replace(/\\s+/g, "-")}-ai-build-prompt.md`,
    json: `${(data.meta.projectName || "untitled-game").toLowerCase().replace(/\\s+/g, "-")}-data.json`,
  };

  const copyOutput = async (key) => {
    try {
      await navigator.clipboard.writeText(outputs[key]);
      setCopied(key);
      setTimeout(() => setCopied(""), 1600);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  const starter = ENGINE_STARTERS[data.meta.genre];
  const quickStats = [
    { label: "Overall completion", value: `${completion}%` },
    { label: "Genre starter", value: starter.label },
    { label: "Primary engine", value: data.technical.targetEngine || "TBD" },
    { label: "Outputs enabled", value: OUTPUT_TOGGLES.filter((t) => data.outputStudio[t.key]).length },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Card className="overflow-hidden rounded-[28px] border-0 bg-slate-950 text-white shadow-2xl">
            <CardContent className="grid gap-6 p-6 md:grid-cols-[1.5fr_1fr] md:p-8">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="rounded-full bg-violet-500/20 px-3 py-1 text-violet-200 hover:bg-violet-500/20">
                    AI-ready game design workflow
                  </Badge>
                  <Badge className="rounded-full bg-white/10 px-3 py-1 text-white hover:bg-white/10">
                    Concept → GDD → starter engine
                  </Badge>
                </div>
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Game Design Document Builder</h1>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300 md:text-base">
                    Capture a new game concept, progressively build out systems and content, configure reusable AI output instructions,
                    and export implementation-ready documents for an AI development partner.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {quickStats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl bg-white/5 p-4 backdrop-blur">
                      <div className="text-xs uppercase tracking-wide text-slate-400">{stat.label}</div>
                      <div className="mt-1 text-sm font-semibold text-white">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4 rounded-[24px] bg-white/5 p-5 backdrop-blur">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-white">Progress</div>
                    <div className="text-xs text-slate-300">Fill enough to produce a strong AI-ready concept package.</div>
                  </div>
                  <div className="text-2xl font-semibold">{completion}%</div>
                </div>
                <Progress value={completion} className="h-3 bg-white/10" />
                <div className="grid gap-2">
                  {sectionCompletion.slice(0, 4).map((section) => (
                    <div key={section.key} className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2 text-sm">
                      <span className="text-slate-200">{section.title}</span>
                      <span className="text-slate-300">{section.completed}/{section.total}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <Button onClick={saveLocal} className="rounded-2xl bg-white text-slate-950 hover:bg-slate-100">
                    <Save className="mr-2 h-4 w-4" /> Save
                  </Button>
                  <Button variant="secondary" onClick={applyGenreSuggestions} className="rounded-2xl border-0 bg-violet-500 text-white hover:bg-violet-600">
                    <Sparkles className="mr-2 h-4 w-4" /> Apply Genre Suggestions
                  </Button>
                  <Button variant="ghost" onClick={resetAll} className="rounded-2xl border border-white/10 text-white hover:bg-white/10">
                    <RefreshCcw className="mr-2 h-4 w-4" /> Reset
                  </Button>
                </div>
                {savedAt ? <div className="text-xs text-slate-400">Last saved: {savedAt}</div> : null}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <ScrollArea className="w-full whitespace-nowrap rounded-2xl border bg-white p-1 shadow-sm">
            <TabsList className="inline-flex h-auto w-max rounded-xl bg-transparent p-1">
              <TabsTrigger value="dashboard" className="rounded-xl px-4 py-2">Dashboard</TabsTrigger>
              {SECTIONS.map((section) => (
                <TabsTrigger key={section.key} value={section.key} className="rounded-xl px-4 py-2">
                  {section.title}
                </TabsTrigger>
              ))}
              <TabsTrigger value="outputStudio" className="rounded-xl px-4 py-2">Output Studio</TabsTrigger>
            </TabsList>
          </ScrollArea>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid gap-6 xl:grid-cols-[1.1fr_1fr]">
              <Card className="rounded-[28px] border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Starter Engine Selection</CardTitle>
                  <CardDescription>Select the genre starter pattern that best fits your concept and engine planning.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label className="mb-2 block">Project Name</Label>
                      <Input
                        className="rounded-2xl"
                        value={data.meta.projectName}
                        onChange={(e) => setField("meta.projectName", e.target.value)}
                        placeholder="e.g., Ashen Crown"
                      />
                    </div>
                    <div>
                      <Label className="mb-2 block">Genre / Starter Type</Label>
                      <Select value={data.meta.genre} onValueChange={(value) => setField("meta.genre", value)}>
                        <SelectTrigger className="rounded-2xl">
                          <SelectValue placeholder="Select genre" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rpg">RPG</SelectItem>
                          <SelectItem value="management">Management</SelectItem>
                          <SelectItem value="strategy">Strategy</SelectItem>
                          <SelectItem value="puzzle">Puzzle</SelectItem>
                          <SelectItem value="roguelite">Rogue-lite</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="mb-2 block">Platform</Label>
                      <Input
                        className="rounded-2xl"
                        value={data.meta.platform}
                        onChange={(e) => setField("meta.platform", e.target.value)}
                        placeholder="PC, Console, Mobile, Web"
                      />
                    </div>
                    <div>
                      <Label className="mb-2 block">Target Engine</Label>
                      <Input
                        className="rounded-2xl"
                        value={data.technical.targetEngine}
                        onChange={(e) => setField("technical.targetEngine", e.target.value)}
                        placeholder="Unity, Godot, Unreal, Custom"
                      />
                    </div>
                  </div>

                  <GenreStarterCard genre={data.meta.genre} onApply={applyGenreSuggestions} />
                </CardContent>
              </Card>

              <Card className="rounded-[28px] border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Build Flow</CardTitle>
                  <CardDescription>Use the tool in phases to move from idea to AI-ready implementation package.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      title: "1. Capture concept",
                      body: "Define the hook, player fantasy, audience, and design north star so the first output is already useful.",
                    },
                    {
                      title: "2. Expand details",
                      body: "Add worldbuilding, systems, content, assets, and technical specs with progressive depth.",
                    },
                    {
                      title: "3. Configure AI outputs",
                      body: "Set tone, detail level, preferred format, and which deliverables should be generated.",
                    },
                    {
                      title: "4. Export and iterate",
                      body: "Copy or download concept docs, GDDs, lore packs, asset briefs, technical specs, and AI build prompts.",
                    },
                  ].map((item, index) => (
                    <div key={item.title} className="rounded-2xl border border-slate-200 p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">{item.title}</div>
                          <div className="mt-1 text-sm leading-6 text-slate-600">{item.body}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 xl:grid-cols-3">
              {sectionCompletion.map((section) => {
                const Icon = section.icon;
                return (
                  <Card key={section.key} className="rounded-[28px] border-slate-200 shadow-sm">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <Icon className="h-5 w-5 text-slate-700" />
                            {section.title}
                          </CardTitle>
                          <CardDescription className="mt-1">{section.description}</CardDescription>
                        </div>
                        <Badge variant="secondary" className="rounded-full px-3 py-1">
                          {section.percent}%
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Progress value={section.percent} className="h-2" />
                      <div className="text-sm text-slate-600">
                        {section.completed} of {section.total} fields completed
                      </div>
                      <Button variant="outline" className="w-full rounded-2xl" onClick={() => setActiveTab(section.key)}>
                        Open Section
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {SECTIONS.map((section) => {
            const Icon = section.icon;
            const percent = sectionCompletion.find((s) => s.key === section.key)?.percent || 0;
            return (
              <TabsContent key={section.key} value={section.key} className="space-y-6">
                <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
                  <Card className="rounded-[28px] border-slate-200 shadow-sm">
                    <CardHeader>
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <CardTitle className="flex items-center gap-2 text-xl">
                            <Icon className="h-5 w-5 text-slate-700" />
                            {section.title}
                          </CardTitle>
                          <CardDescription className="mt-1">{section.description}</CardDescription>
                        </div>
                        <Badge className="rounded-full bg-slate-100 px-3 py-1 text-slate-800 hover:bg-slate-100">
                          {percent}% complete
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <SectionForm section={section} data={data} onChange={setField} />
                    </CardContent>
                  </Card>

                  <div className="space-y-6">
                    <GenreStarterCard genre={data.meta.genre} onApply={applyGenreSuggestions} />
                    <Card className="rounded-[28px] border-slate-200 shadow-sm">
                      <CardHeader>
                        <CardTitle>Tips for this section</CardTitle>
