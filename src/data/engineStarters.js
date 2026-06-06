export const ENGINE_STARTERS = {
   rpg: { label: "RPG",
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
    engineFit: ["Economy/resource simulation","Time/calendar system","AI agents/workers","Buildings/production chains","UI-heavy dashboards",],
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