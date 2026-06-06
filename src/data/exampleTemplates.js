export const EXAMPLE_TEMPLATES = {
    rpg_ashen_crown: {  
  label: "Ashen Crown",
    genre: "rpg",
    summary:
      "A dark fantasy action RPG about reclaiming a fractured kingdom by forging alliances, recovering relics, and shaping the fate of rival factions.",
    description:
      "Strong example for lore-heavy RPGs with exploration, quests, progression, factions, and reusable character systems.",
    data: {
      meta: {
        projectName: "Ashen Crown",
        version: "0.1",
        genre: "rpg",
        elevatorPitch:
          "A dark fantasy RPG where a disgraced heir explores a shattered kingdom, rebuilds alliances, and reclaims a cursed crown before rival factions awaken an ancient ruinborne god.",
        conceptSummary:
          "Ashen Crown is a story-forward RPG blending exploration, faction politics, tactical combat, and relic-driven progression. Players travel across ruined territories, recruit allies, restore strongholds, and uncover the kingdom’s buried legacy.",
        playerFantasy:
          "Become a fallen royal strategist-warrior rebuilding power from nothing and shaping the future through alliances, combat mastery, and hard moral choices.",
        audience:
          "Players who enjoy narrative RPGs, faction systems, progression-heavy exploration, and dark fantasy settings.",
        platform: "PC",
        cameraPerspective: "Isometric",
        visualStyle: "Stylized dark fantasy 3D",
        engineStarter: "RPG",
      },
      concept: {
        pillars:
          "Player-driven progression\nMeaningful faction choices\nNarrative worldbuilding\nExploration with reward density\nReusable quest and dialogue systems",
        inspirations:
          "Dragon Age, Pillars of Eternity, Hades progression clarity, Darkest Dungeon tone, Diablo-style loot readability",
        differentiators:
          "Faction outcomes reshape quests, towns, and world routes. Relics alter class identity and open new dialogue/combat paths.",
        sessionLength: "30–90 minutes",
        monetization: "Premium",
        scopeTarget: "Indie vertical slice",
        winCondition:
          "Unify or dominate the major factions and reclaim the Ashen Crown to determine the kingdom’s future.",
        failState:
          "Player defeat in combat, failed strategic faction positioning, or permanent loss of critical regions leading to alternate endings.",
        emotionalGoal:
          "Tension, ambition, melancholy, and the satisfaction of restoring meaning to a broken world.",
      },
      world: {
        setting:
          "A fractured kingdom built on volcanic ruins, haunted forests, and collapsed citadels still powered by ancient ember technology.",
        premise:
          "Years after a civil war and supernatural catastrophe, the heir of the old line returns from exile to recover the crown and stop the spread of ruinborn corruption.",
        factions:
          "The Ember Court, The Hollow Banner, The Ash Monks, The Iron Collectives, independent frontier settlements.",
        loreSummary:
          "The kingdom once drew power from ember-forges beneath the earth, but their misuse awakened ruinborn entities. The civil war broke the realm into rival powers now surviving in the ruins of its former glory.",
        tone: "Dark, mythic, grounded, tragic but hopeful",
        narrativeStructure: "Branching narrative with faction-driven questlines",
        protagonist:
          "A disgraced royal heir returning from exile with partial claim, incomplete memory, and a bloodline link to the ember-forges.",
        antagonist:
          "A coalition of opportunistic rivals, corrupted leaders, and an ancient ruinborn god seeking rebirth through the crown.",
      },
      systems: {
        coreLoop:
          "Explore region → accept quests → fight / negotiate / investigate → gain relics and resources → upgrade build and faction influence → unlock new regions and story states",
        progression:
          "Character stats, relic-based specialization, faction reputation, companion relationships, gear upgrades, and stronghold restoration",
        systemsList:
          "Combat, inventory, quest journal, dialogue choices, faction reputation, companion system, relic upgrades, loot tables, codex",
        controls: "Keyboard/mouse and controller support",
        combatOrInteraction:
          "Real-time combat with tactical pause and ability cooldowns",
        economy:
          "Gold, crafting materials, relic fragments, faction favors, settlement resources",
        difficulty:
          "Story, Standard, Veteran, and adaptive enemy composition in late regions",
        saveModel: "Save-anywhere outside combat plus autosave checkpoints",
        replayability:
          "Faction branches, alternate relic builds, multiple endings, companion choices, region order flexibility",
      },
      content: {
        gameModes: "Single-player",
        levelsOrWorldStructure:
          "Hub stronghold connected to multiple semi-open regions, ruins, faction zones, dungeons, and stronghold upgrade layers",
        questStructure:
          "Main questline, faction quest arcs, companion quests, bounty contracts, discovery-based side quests",
        enemiesOrChallenges:
          "Bandit factions, corrupted knights, ruinborn creatures, elite relic guardians, faction warbands, environmental hazards",
        itemsAbilities:
          "Melee weapons, relic powers, armor sets, tactical consumables, craftable upgrades, faction sigils",
        uiUxNotes:
          "Clear quest tracking, codex-driven lore discovery, inventory readability, faction map overlays, stronghold upgrade dashboard",
        accessibility:
          "Remappable controls, subtitle scaling, colorblind-safe faction indicators, difficulty assists, combat slowdown option",
        tutorialOnboarding:
          "Narrative prologue teaching movement, dialogue, combat basics, quest structure, and relic progression through a ruined border town",
      },
      assets: {
        artNeeds:
          "Playable character, faction NPCs, monster sets, ruins, forests, volcanic landmarks, stronghold hub, UI icons, item portraits, world map assets",
        animationNeeds:
          "Movement, melee chains, spell casting, hit reactions, idle loops, interaction animations, UI transitions",
        audioNeeds:
          "Ambient exploration tracks, faction themes, combat loops, environmental SFX, UI feedback, creature sounds",
        vfxNeeds:
          "Spell trails, ember effects, corruption haze, loot popups, relic activation, environmental ash particles",
        narrativeAssets:
          "Dialogue trees, codex entries, faction descriptions, quest text, item lore, loading screen story blurbs",
        technicalAssets:
          "Prefabs for NPCs/enemies, encounter data tables, dialogue JSON, inventory schemas, quest state configs, UI component prefabs",
        assetPackApproach:
          "Stylized modular placeholders first, then curated custom hero assets and faction identity pass",
      },
      technical: {
        targetEngine: "Godot or Unity",
        engineArchitecture:
          "Data-driven RPG architecture with scene-based regions, stateful quest system, modular dialogue framework, reusable inventory and progression modules",
        coreModules:
          "Input, camera, state machine, combat, stats, inventory, quest/state tracking, dialogue, save/load, faction reputation, codex",
        aiPartnerTasks:
          "Generate starter project structure, reusable RPG systems, data schemas, vertical-slice implementation plan, placeholder asset specs, and quest/dialogue scaffolding",
        requiredTools:
          "Game engine, GitHub, art placeholder workflow, narrative spreadsheet/data pipeline, JSON-based content definitions",
        performanceTargets:
          "60 FPS target on mid-range PC, low hitching between zones, fast save/load, modest memory footprint for vertical slice",
        saveDataRequirements:
          "Quest state, inventory, character progression, faction reputation, unlocked regions, companion states, stronghold upgrades",
        multiplayer: "No",
        liveOps: "No",
      },
      outputStudio: {
        tone: "Creative, implementation-oriented, and indie-production friendly",
        detailLevel: "High",
        preferredFormat: "Markdown",
        includeConceptDoc: true,
        includeFullGdd: true,
        includeLorePack: true,
        includeAssetPack: true,
        includeTechnicalSpec: true,
        includeAiBuildPrompt: true,
        aiPartner: "Copilot / Claude / ChatGPT",
        codingStyle: "Modular, data-driven, reusable starter-engine friendly",
        additionalInstructions:
          "Expand lore and system details while keeping everything practical for a vertical-slice first development plan.",
      },
    },
  },

  roguelite_starfall_vault: {
    id: "roguelite_starfall_vault",
    label: "Starfall Vault",
    genre: "roguelite",
    summary:
      "A sci-fi roguelite where players descend into a shifting vault, collect unstable tech, and build run-defining synergies across repeated expeditions.",
    description:
      "Great example for replayable runs, procedural content, perk systems, and a reusable starter engine blueprint.",
    data: {
      meta: {
        projectName: "Starfall Vault",
        version: "0.1",
        genre: "roguelite",
        elevatorPitch:
          "A fast-paced sci-fi roguelite where scavengers descend into a shifting alien vault, chain unstable artifacts into broken builds, and bring surviving tech back to a doomed orbital colony.",
        conceptSummary:
          "Starfall Vault focuses on short, replayable runs with procedural encounters, branching rewards, and a persistent colony meta-layer that unlocks new weapons, classes, and event types.",
        playerFantasy:
          "Become a daring scavenger assembling wild artifact combinations and gradually mastering an unknowable alien machine.",
        audience:
          "Players who enjoy Hades, Dead Cells, Returnal-style loops, fast build experimentation, and meta progression.",
        platform: "PC",
        cameraPerspective: "Top-down",
        visualStyle: "Stylized neon sci-fi",
        engineStarter: "Rogue-lite",
      },
      concept: {
        pillars:
          "Replayable runs\nBuild-defining reward choices\nTight combat feel\nPersistent meta progression\nProcedural content variation",
        inspirations:
          "Hades, Risk of Rain 2 build logic, Returnal atmosphere, Dead Cells progression pace",
        differentiators:
          "Artifact synergies alter room behavior and enemy patterns, while colony upgrades unlock new procedural encounter types rather than only stat boosts.",
        sessionLength: "20–45 minutes",
        monetization: "Premium",
        scopeTarget: "Prototype to vertical slice",
        winCondition:
          "Survive a full vault expedition, defeat a vault guardian, and extract with key artifacts for the colony.",
        failState:
          "Death ends the current run, but selected resources and unlocks persist for the meta layer.",
        emotionalGoal:
          "Momentum, tension, surprise, and the thrill of discovering absurdly strong build synergies.",
      },
      world: {
        setting:
          "A collapsing orbital colony above a planet-sized alien vault that rewrites itself after every incursion.",
        premise:
          "The colony is running out of life support. Scavengers must enter the vault, retrieve alien tech, and decide whether to exploit or destroy the machine beneath them.",
        factions:
          "Colony Syndicates, the Archivists, scavenger crews, fanatics loyal to the vault intelligence",
        loreSummary:
          "The vault was built by a vanished civilization to archive impossible technologies, but its defenses evolved into an autonomous system that mutates intruders and experimentation outcomes.",
        tone: "Mysterious, propulsive, high-energy, dangerous",
        narrativeStructure: "Run-based narrative with hub progression and event unlocks",
        protagonist:
          "A scavenger operative indebted to the colony but increasingly drawn to the vault’s truth.",
        antagonist:
          "Vault guardians, rival scavenger crews, and the central intelligence shaping each run.",
      },
      systems: {
        coreLoop:
          "Start run → clear rooms / events → choose loot, upgrades, and paths → survive biome boss → extract or push deeper → return to hub for upgrades and new options",
        progression:
          "Meta upgrades, unlockable artifacts, character loadouts, hub systems, run achievements, encounter unlock tables",
        systemsList:
          "Combat, procedural room generation, perk/artifact system, event system, loadouts, run summary, meta progression, unlock trees",
        controls: "Keyboard/mouse and controller",
        combatOrInteraction:
          "Real-time dodge-and-attack combat with modular weapons and artifact-driven modifiers",
        economy:
          "Run currency, extractable rare materials, unlock tokens, colony resources",
        difficulty:
          "Scaling vault depth, optional challenge modifiers, elite encounter pools, post-win escalation",
        saveModel: "Per-run autosave between vault sectors",
        replayability:
          "Procedural maps, artifact synergies, unlockable weapon classes, event randomness, escalating modifiers",
      },
      content: {
        gameModes: "Single-player",
        levelsOrWorldStructure:
          "Hub colony + branching run map with multiple sectors, encounter types, mini-bosses, and final guardians",
        questStructure:
          "Run objectives, optional challenge rooms, colony unlock goals, faction requests, discovery milestones",
        enemiesOrChallenges:
          "Vault drones, phase-shift beasts, rival scavengers, trap rooms, corruption storms, guardian bosses",
        itemsAbilities:
          "Weapons, artifacts, passive modifiers, dash variants, shield tech, colony tools",
        uiUxNotes:
          "Fast build readability, strong reward screens, map clarity, run recap, codex unlock feedback",
        accessibility:
          "Aim assist options, color-safe rarity/readability, remapping, screen shake toggle, run speed assists",
        tutorialOnboarding:
          "Short intro mission teaching combat, loot choices, extraction flow, and hub meta upgrades",
      },
      assets: {
        artNeeds:
          "Player rigs, sci-fi enemies, vault room modules, biome tilesets, weapon icons, HUD elements, map nodes, hub props",
        animationNeeds:
          "Run cycles, hit reactions, ranged fire, melee swings, dash, boss telegraphs, UI transitions",
        audioNeeds:
          "Combat loops, ambient vault soundscapes, hub music, alarm motifs, weapon and artifact SFX",
        vfxNeeds:
          "Energy trails, explosions, artifact activation, shield effects, portal transitions, corruption distortions",
        narrativeAssets:
          "Run events, codex entries, artifact descriptions, faction requests, hub dialogue",
        technicalAssets:
          "Procedural room definitions, reward tables, enemy wave configs, artifact data, unlock tree configs, save schemas",
        assetPackApproach:
          "Highly modular placeholder pack early with color-coded biome identity and shared enemy rig strategy",
      },
      technical: {
        targetEngine: "Godot or Unity",
        engineArchitecture:
          "Run-based architecture with procedural sector generator, combat controller, artifact/perk system, hub meta layer, and event-driven unlock tables",
        coreModules:
          "Input, player controller, combat, procedural rooms, enemy AI, reward system, perk/artifact manager, hub progression, save/load, run summary",
        aiPartnerTasks:
          "Propose data models, scaffold run structure, build procedural content framework, define modular combat systems, and generate placeholder design content",
        requiredTools:
          "Game engine, GitHub, balancing spreadsheets, modular art workflow, JSON data definitions",
        performanceTargets:
          "60 FPS on mid-range PC with multiple active enemies and VFX-heavy rooms",
        saveDataRequirements:
          "Unlocked content, meta progression, settings, loadouts, codex progress, current run checkpoints",
        multiplayer: "No",
        liveOps: "Optional future challenge seeds",
      },
      outputStudio: {
        tone: "Fast-moving, system-focused, and implementation-ready",
        detailLevel: "High",
        preferredFormat: "Markdown",
        includeConceptDoc: true,
        includeFullGdd: true,
        includeLorePack: true,
        includeAssetPack: true,
        includeTechnicalSpec: true,
        includeAiBuildPrompt: true,
        aiPartner: "Copilot / Claude / ChatGPT",
        codingStyle: "Modular, replayable, content-data driven",
        additionalInstructions:
          "Favor reusable procgen systems, readable build synergies, and a prototype-first delivery sequence.",
      },
    },
  },

  puzzle_clockwork_signal: {
    id: "puzzle_clockwork_signal",
    label: "Clockwork Signal",
    genre: "puzzle",
    summary:
      "A logic-driven puzzle game about rerouting energy through living machines to awaken an abandoned city in the clouds.",
    description:
      "Useful example for rule systems, level structure, mechanic escalation, and accessibility-forward puzzle design.",
    data: {
      meta: {
        projectName: "Clockwork Signal",
        version: "0.1",
        genre: "puzzle",
        elevatorPitch:
          "A serene but increasingly intricate puzzle game where players reroute energy through enchanted machines to restore a silent sky-city and uncover its hidden purpose.",
        conceptSummary:
          "Clockwork Signal is built around elegant logic puzzles, evolving interaction rules, and a calm, visually expressive world. New mechanics unlock through repaired city districts and combine in layered puzzle spaces.",
        playerFantasy:
          "Feel like a brilliant restorer-engineer decoding an ancient system and bringing a forgotten city back to life piece by piece.",
        audience:
          "Players who enjoy clean, thoughtful puzzle progression, atmospheric spaces, and satisfying mechanic combinations.",
        platform: "PC",
        cameraPerspective: "Fixed isometric / board view",
        visualStyle: "Clean stylized clockwork fantasy",
        engineStarter: "Puzzle",
      },
      concept: {
        pillars:
          "Clarity of rules\nElegant escalation\nLow friction controls\nReadable feedback\nAtmospheric discovery",
        inspirations:
          "The Witness, Monument Valley clarity, Zachtronics readability, dorfromantik calm presentation",
        differentiators:
          "Puzzle boards exist as diegetic city machinery, so progression feels like restoring a place rather than just clearing abstract levels.",
        sessionLength: "10–30 minutes",
        monetization: "Premium",
        scopeTarget: "Indie launch / staged content expansion",
        winCondition:
          "Restore all major districts and solve the final signal lattice to awaken the city core.",
        failState:
          "No fail state beyond incorrect board states; players can reset, undo, and retry without penalty.",
        emotionalGoal:
          "Calm focus, clever discovery, and gradual wonder as the city awakens.",
      },
      world: {
        setting:
          "An ancient sky-city of brass towers, floating gardens, and dormant signal engines suspended above endless clouds.",
        premise:
          "A solitary restorer arrives in a sleeping city and repairs its machine districts by solving embedded logic systems.",
        factions:
          "No traditional factions; instead, districts represent different schools of machine design and historical city functions.",
        loreSummary:
          "The city was built to transmit a signal across worlds, but its caretakers vanished when its core engine fractured. The player gradually reconstructs what the city was built to communicate.",
        tone: "Calm, mysterious, elegant, quietly hopeful",
        narrativeStructure: "Environmental story progression through district restoration",
        protagonist:
          "A wandering restorer with inherited tools and incomplete notes from the last known caretaker.",
        antagonist:
          "Primary opposition is systemic complexity, decayed machinery, and hidden design contradictions in the city core.",
      },
      systems: {
        coreLoop:
          "Enter puzzle board → understand rule set → manipulate machine nodes → restore power flow → unlock district progress and new mechanics",
        progression:
          "Mechanics unlock by district, with later puzzles combining prior systems in layered configurations",
        systemsList:
          "Rule engine, level progression, hint system, undo/reset, board state tracking, unlock map, codex",
        controls: "Mouse-first with keyboard shortcuts and controller-friendly cursor option",
        combatOrInteraction:
          "Non-combat interaction through node selection, rotation, routing, sequencing, and timing rules",
        economy:
          "No traditional economy; optional collectible fragments unlock lore panels and cosmetic city restoration variants",
        difficulty:
          "Curated ramp with optional hint layers and advanced challenge boards",
        saveModel: "Autosave per puzzle / district progression",
        replayability:
          "Challenge variants, mastery objectives, optional daily boards, alternate district completion routes",
      },
      content: {
        gameModes: "Single-player",
        levelsOrWorldStructure:
          "District-based world map with themed puzzle chains, mastery boards, hidden chambers, and final core lattice",
        questStructure:
          "District restoration goals, optional mastery tasks, secret puzzle unlocks, lore fragment recovery",
        enemiesOrChallenges:
          "No enemies; challenge comes from layered rules, blocked lines, timing nodes, signal splits, and mechanical interference",
        itemsAbilities:
          "Restorer tools, routing lenses, timing keys, polarity switches, signal mirrors",
        uiUxNotes:
          "Clean board readability, subtle motion, strong visual cause/effect, instant reset, progressive hint reveal",
        accessibility:
          "Colorblind-safe channels, reduced motion, text hints, input remapping, zoom, high-contrast board themes",
        tutorialOnboarding:
          "District 1 introduces one rule at a time with visual teaching and optional expanded hint guidance",
      },
      assets: {
        artNeeds:
          "Puzzle board tiles, machine nodes, district backgrounds, UI icons, world map components, animated restoration states",
        animationNeeds:
          "Signal flow, node rotation, unlock transitions, district awakening sequences, UI micro-interactions",
        audioNeeds:
          "Ambient district soundscapes, soft puzzle feedback, restoration chimes, layered music evolution by district",
        vfxNeeds:
          "Signal glow, activation pulses, gear sparks, cloud drift, restoration bloom",
        narrativeAssets:
          "District lore notes, tool descriptions, caretaker journal fragments, codex entries",
        technicalAssets:
          "Puzzle level definitions, node rule configs, district progression schemas, hint metadata, save structures",
        assetPackApproach:
          "Start with ultra-clear placeholder puzzle pieces and gradually layer atmosphere over the same readable rule shapes",
      },
      technical: {
        targetEngine: "Godot, Unity, or web-based custom framework",
        engineArchitecture:
          "Rule-driven puzzle framework with board state engine, level definition schema, district progression manager, hint system, and accessibility-first UI layer",
        coreModules:
          "Input, board interaction, rule engine, level loader, undo/reset, hint system, progression map, save/load, visual feedback manager",
        aiPartnerTasks:
          "Generate puzzle schema, board state logic, reusable level definitions, progression structure, hint tiers, and vertical-slice implementation order",
        requiredTools:
          "Game engine, GitHub, spreadsheet or JSON-based level authoring, UI prototyping workflow, playtest notes system",
        performanceTargets:
          "Instant board interaction, low-latency input, lightweight rendering, no hitching during signal animation",
        saveDataRequirements:
          "Puzzle completion state, district unlocks, hint usage, mastery objectives, settings, lore fragments",
        multiplayer: "No",
        liveOps: "Optional daily puzzles later",
      },
      outputStudio: {
        tone: "Elegant, clear, implementation-oriented, and systems-aware",
        detailLevel: "High",
        preferredFormat: "Markdown",
        includeConceptDoc: true,
        includeFullGdd: true,
        includeLorePack: true,
        includeAssetPack: true,
        includeTechnicalSpec: true,
        includeAiBuildPrompt: true,
        aiPartner: "Copilot / Claude / ChatGPT",
        codingStyle: "Clean, modular, rule-engine friendly",
        additionalInstructions:
          "Prioritize clear rule communication, scalability of level definitions, and a polished but achievable indie scope.",
      },
    },
  },
};

