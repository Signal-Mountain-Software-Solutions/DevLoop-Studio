import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

import { ENGINE_STARTERS } from "@/data/engineStarters";
import { EXAMPLE_TEMPLATES } from "@/data/exampleTemplates";
import { OUTPUT_TOGGLES } from "@/data/outputToggles";
import { SECTIONS } from "@/data/sections";

import { getNestedValue } from "@/lib/nestedData";
import { downloadText } from "@/lib/exportFiles";
import { downloadBundle } from "@/lib/exportBundle";
import { slugify } from "@/lib/helpers";

import { renderConceptMarkdown } from "@/generators/conceptGenerator";
import { renderFullMarkdown } from "@/generators/fullGddGenerator";
import { renderLorePack } from "@/generators/lorePackGenerator";
import { renderAssetPack } from "@/generators/assetPackGenerator";
import { renderTechnicalSpec } from "@/generators/technicalSpecGenerator";
import { renderAiPrompt } from "@/generators/aiPromptGenerator";

import { BUILDER_ACTIONS } from "./builderActions";
import { builderReducer, createInitialBuilderState } from "./builderReducer";

const STORAGE_KEY = "game-design-document-builder-v1";

const BuilderContext = createContext(null);

export function BuilderProvider({ children }) {
  const [state, dispatch] = useReducer(builderReducer, undefined, createInitialBuilderState);

  const { data, activeTab, copiedKey, savedAt } = state;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const parsed = JSON.parse(raw);

      dispatch({
        type: BUILDER_ACTIONS.LOAD_SAVED_DATA,
        payload: parsed,
      });
    } catch (error) {
      console.error("Failed to load saved state", error);
    }
  }, []);

  useEffect(() => {
    const starter = ENGINE_STARTERS[data.meta.genre];

    dispatch({
      type: BUILDER_ACTIONS.SYNC_ENGINE_STARTER,
      value: starter.label,
    });
  }, [data.meta.genre]);

  const setField = (path, value) => {
    dispatch({
      type: BUILDER_ACTIONS.SET_FIELD,
      path,
      value,
    });
  };

  const setActiveTab = (value) => {
    dispatch({
      type: BUILDER_ACTIONS.SET_ACTIVE_TAB,
      value,
    });
  };

  const saveLocal = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

      dispatch({
        type: BUILDER_ACTIONS.SAVE_SUCCESS,
        value: new Date().toLocaleString(),
      });
    } catch (error) {
      console.error("Failed to save state", error);
    }
  };

  const resetAll = () => {
    localStorage.removeItem(STORAGE_KEY);

    dispatch({
      type: BUILDER_ACTIONS.RESET_ALL,
    });
  };

  const applyGenreSuggestions = () => {
    dispatch({
      type: BUILDER_ACTIONS.APPLY_GENRE_SUGGESTIONS,
    });
  };

  const loadTemplate = (templateId) => {
    const template = EXAMPLE_TEMPLATES[templateId];
    if (!template) return;

    dispatch({
      type: BUILDER_ACTIONS.LOAD_TEMPLATE,
      payload: template.data,
    });
  };

  const flattenedFields = useMemo(() => {
    return SECTIONS.flatMap((section) => section.fields.map((f) => f.path));
  }, []);

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

      return {
        ...section,
        completed: filled,
        total,
        percent: Math.round((filled / total) * 100),
      };
    });
  }, [data]);

  const starter = ENGINE_STARTERS[data.meta.genre];

  const outputs = useMemo(() => {
    return {
      concept: renderConceptMarkdown(data),
      gdd: renderFullMarkdown(data),
      lore: renderLorePack(data),
      assets: renderAssetPack(data),
      technical: renderTechnicalSpec(data),
      prompt: renderAiPrompt(data),
      json: JSON.stringify(data, null, 2),
    };
  }, [data]);

  const baseName = slugify(data.meta.projectName || "untitled-game");

  const fileNames = {
    concept: `${baseName}-concept.md`,
    gdd: `${baseName}-gdd.md`,
    lore: `${baseName}-lore-pack.md`,
    assets: `${baseName}-asset-pack.md`,
    technical: `${baseName}-technical-spec.md`,
    prompt: `${baseName}-ai-build-prompt.md`,
    json: `${baseName}-data.json`,
  };

  const enabledOutputKeys = [
    ...OUTPUT_TOGGLES.filter((toggle) => data.outputStudio[toggle.key]).map((toggle) => toggle.fileKey),
    "json",
  ];

  const copyOutput = async (key) => {
    try {
      await navigator.clipboard.writeText(outputs[key]);

      dispatch({
        type: BUILDER_ACTIONS.COPY_SUCCESS,
        value: key,
      });

      setTimeout(() => {
        dispatch({
          type: BUILDER_ACTIONS.CLEAR_COPIED,
        });
      }, 1500);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  const downloadOutput = (key) => {
    downloadText(fileNames[key], outputs[key]);
  };

  const downloadAllOutputs = async () => {
    try {
      const files = enabledOutputKeys.map((key) => ({
        name: fileNames[key],
        content: outputs[key],
      }));

      await downloadBundle(`${baseName}-full-package`, files);
    } catch (error) {
      console.error("Bundle download failed", error);
    }
  };

  const quickStats = [
    { label: "Overall completion", value: `${completion}%` },
    { label: "Genre starter", value: starter.label },
    { label: "Primary engine", value: data.technical.targetEngine || "TBD" },
    {
      label: "Outputs enabled",
      value: OUTPUT_TOGGLES.filter((item) => data.outputStudio[item.key]).length,
    },
  ];

  const value = {
    data,
    activeTab,
    copiedKey,
    savedAt,
    starter,
    completion,
    sectionCompletion,
    outputs,
    fileNames,
    enabledOutputKeys,
    quickStats,

    setField,
    setActiveTab,
    saveLocal,
    resetAll,
    applyGenreSuggestions,
    loadTemplate,
    copyOutput,
    downloadOutput,
    downloadAllOutputs,
  };

  return <BuilderContext.Provider value={value}>{children}</BuilderContext.Provider>;
}

export function useBuilder() {
  const context = useContext(BuilderContext);

  if (!context) {
    throw new Error("useBuilder must be used within a BuilderProvider");
  }

  return context;
}