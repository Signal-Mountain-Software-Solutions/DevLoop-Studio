import { DEFAULT_DATA } from "@/data/defaultData";
import { ENGINE_STARTERS } from "@/data/engineStarters";
import { setNestedValue } from "@/lib/nestedData";
import { BUILDER_ACTIONS } from "./builderActions";

export function mergeSavedData(saved) {
  return {
    ...DEFAULT_DATA,
    ...saved,
    meta: { ...DEFAULT_DATA.meta, ...(saved?.meta || {}) },
    concept: { ...DEFAULT_DATA.concept, ...(saved?.concept || {}) },
    world: { ...DEFAULT_DATA.world, ...(saved?.world || {}) },
    systems: { ...DEFAULT_DATA.systems, ...(saved?.systems || {}) },
    content: { ...DEFAULT_DATA.content, ...(saved?.content || {}) },
    assets: { ...DEFAULT_DATA.assets, ...(saved?.assets || {}) },
    technical: { ...DEFAULT_DATA.technical, ...(saved?.technical || {}) },
    outputStudio: { ...DEFAULT_DATA.outputStudio, ...(saved?.outputStudio || {}) },
  };
}

export function createInitialBuilderState() {
  return {
    data: DEFAULT_DATA,
    activeTab: "dashboard",
    copiedKey: "",
    savedAt: "",
  };
}

export function builderReducer(state, action) {
  switch (action.type) {
    case BUILDER_ACTIONS.LOAD_SAVED_DATA: {
      return {
        ...state,
        data: mergeSavedData(action.payload),
      };
    }

    case BUILDER_ACTIONS.SET_FIELD: {
      return {
        ...state,
        data: setNestedValue(state.data, action.path, action.value),
      };
    }

    case BUILDER_ACTIONS.SET_ACTIVE_TAB: {
      return {
        ...state,
        activeTab: action.value,
      };
    }

    case BUILDER_ACTIONS.SAVE_SUCCESS: {
      return {
        ...state,
        savedAt: action.value,
      };
    }

    case BUILDER_ACTIONS.RESET_ALL: {
      return {
        ...createInitialBuilderState(),
      };
    }

    case BUILDER_ACTIONS.COPY_SUCCESS: {
      return {
        ...state,
        copiedKey: action.value,
      };
    }

    case BUILDER_ACTIONS.CLEAR_COPIED: {
      return {
        ...state,
        copiedKey: "",
      };
    }

    case BUILDER_ACTIONS.LOAD_TEMPLATE: {
      return {
        ...state,
        data: mergeSavedData(action.payload),
        activeTab: "dashboard",
        copiedKey: "",
        savedAt: "",
      };
    }

    case BUILDER_ACTIONS.SYNC_ENGINE_STARTER: {
      const starterLabel = action.value;
      if (state.data.meta.engineStarter === starterLabel) {
        return state;
      }

      return {
        ...state,
        data: setNestedValue(state.data, "meta.engineStarter", starterLabel),
      };
    }

    case BUILDER_ACTIONS.APPLY_GENRE_SUGGESTIONS: {
      const starter = ENGINE_STARTERS[state.data.meta.genre];
      const next = JSON.parse(JSON.stringify(state.data));

      if (!next.systems.coreLoop.trim()) {
        next.systems.coreLoop = starter.coreLoops.join(" → ");
      }

      if (!next.systems.systemsList.trim()) {
        next.systems.systemsList = starter.suggestedSystems.join(", ");
      }

      if (!next.technical.coreModules.trim()) {
        next.technical.coreModules = starter.engineFit.join(", ");
      }

      if (!next.content.levelsOrWorldStructure.trim()) {
        next.content.levelsOrWorldStructure = starter.suggestedContent.join(", ");
      }

      if (!next.technical.aiPartnerTasks.trim()) {
        next.technical.aiPartnerTasks =
          `Scaffold the ${starter.label} starter engine, define data models, ` +
          `propose placeholder assets, generate implementation sequence, and identify risks / missing design decisions.`;
      }

      return {
        ...state,
        data: next,
      };
    }

    default:
      return state;
  }
}
