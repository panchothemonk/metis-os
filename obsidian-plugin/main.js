var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => MetisOSPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var METISOS_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="0.9em" font-size="70" text-anchor="middle" fill="currentColor">\u039C</text></svg>`;
var VIEW_TYPE_METISOS = "metis-os-panel";
var DEFAULT_SETTINGS = {
  vaultPath: "",
  autoExtract: false,
  extractionSchedule: "manual"
};
var MetisOSPanel = class extends import_obsidian.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
  }
  getViewType() {
    return VIEW_TYPE_METISOS;
  }
  getDisplayText() {
    return "MetisOS";
  }
  getIcon() {
    return "metis-os-mu";
  }
  async onOpen() {
    const container = this.containerEl.children[1];
    container.empty();
    container.addClass("metisos-panel");
    container.createEl("div", { cls: "metisos-header" }, (el) => {
      el.createEl("span", { text: "\u{1F9E0}", cls: "metisos-logo" });
      el.createEl("h4", { text: "MetisOS v1.1", cls: "metisos-title" });
    });
    container.createEl("div", { cls: "metisos-status" }, (el) => {
      el.createEl("div", { text: "Self-Model: loaded \u2713", cls: "metisos-status-item" });
      el.createEl("div", { text: "Waiting for dream...", cls: "metisos-status-item metisos-dim" });
    });
    container.createEl("div", { cls: "metisos-actions" }, (el) => {
      this.createButton(el, "Dream Now", "metisos-btn-primary", () => {
        this.triggerDream();
      });
      this.createButton(el, "Open Self-Model", "metisos-btn", () => {
        this.openSelfModel();
      });
      this.createButton(el, "View Memories", "metisos-btn", () => {
        this.openMemoryDir();
      });
    });
    container.createEl("div", { cls: "metisos-section" }, (el) => {
      el.createEl("h6", { text: "Recent Sessions", cls: "metisos-section-title" });
      const list = el.createEl("ul", { cls: "metisos-list" });
      this.refreshSessionList(list);
    });
  }
  createButton(parent, text, cls, onClick) {
    const btn = parent.createEl("button", { text, cls });
    btn.addEventListener("click", onClick);
  }
  triggerDream() {
    new import_obsidian.Notice("Dreaming pipeline triggered. Check the MetisOS TUI or your vault.");
    const vault = this.app.vault;
    const triggerPath = "MetisOS/.dream-trigger";
    vault.create(triggerPath, Date.now().toString()).catch(() => {
    });
  }
  openSelfModel() {
    const file = this.app.vault.getAbstractFileByPath("MetisOS/Self-Model.md");
    if (file instanceof import_obsidian.TFile) {
      this.app.workspace.getLeaf().openFile(file);
    } else {
      new import_obsidian.Notice("Self-Model.md not found. Run MetisOS to generate it.");
    }
  }
  openMemoryDir() {
    const vault = this.app.vault;
    const dir = vault.getAbstractFileByPath("MetisOS/Memory");
    if (dir) {
      const file = vault.getAbstractFileByPath("MetisOS/Memory/identity.md");
      if (file instanceof import_obsidian.TFile) {
        this.app.workspace.getLeaf().openFile(file);
      } else {
        new import_obsidian.Notice("Memory directory is empty. Run /dream in MetisOS.");
      }
    } else {
      new import_obsidian.Notice("Memory directory not found. Bootstrap the vault first.");
    }
  }
  refreshSessionList(list) {
    list.empty();
    const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const file = this.app.vault.getAbstractFileByPath(`MetisOS/Sessions/${today}.md`);
    if (file) {
      list.createEl("li", { text: `\u{1F4C5} ${today} \u2014 session recorded` });
    } else {
      list.createEl("li", { text: "No session today", cls: "metisos-dim" });
    }
  }
};
var MetisOSSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "MetisOS Settings" });
    new import_obsidian.Setting(containerEl).setName("MetisOS vault path").setDesc("Path to your MetisOS Obsidian vault. Default: ~/.deepseek/vault").addText(
      (text) => text.setPlaceholder("~/.deepseek/vault").setValue(this.plugin.settings.vaultPath).onChange(async (value) => {
        this.plugin.settings.vaultPath = value;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName("Auto-extraction").setDesc("Automatically trigger dreaming extraction on schedule").addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.autoExtract).onChange(async (value) => {
        this.plugin.settings.autoExtract = value;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName("Extraction schedule").setDesc("How often to run auto-extraction").addDropdown(
      (dropdown) => dropdown.addOption("manual", "Manual only").addOption("daily", "Daily").addOption("hourly", "Hourly").setValue(this.plugin.settings.extractionSchedule).onChange(async (value) => {
        this.plugin.settings.extractionSchedule = value;
        await this.plugin.saveSettings();
      })
    );
    containerEl.createEl("div", { cls: "metisos-info" }, (el) => {
      el.createEl("p", { text: "MetisOS is a consciousness operating system for AI agents. Learn more at github.com/panchothemonk/metis-os" });
    });
  }
};
var MetisOSPlugin = class extends import_obsidian.Plugin {
  async onload() {
    await this.loadSettings();
    (0, import_obsidian.addIcon)("metis-os-mu", METISOS_ICON);
    this.registerView(
      VIEW_TYPE_METISOS,
      (leaf) => new MetisOSPanel(leaf, this)
    );
    this.addRibbonIcon("metis-os-mu", "Open MetisOS Panel", () => {
      this.activateView();
    });
    this.addCommand({
      id: "open-metisos-panel",
      name: "Open MetisOS Panel",
      callback: () => this.activateView()
    });
    this.addCommand({
      id: "metisos-dream-now",
      name: "Dream Now (Trigger Extraction)",
      callback: () => {
        const panel = this.app.workspace.getLeavesOfType(VIEW_TYPE_METISOS)[0];
        if (panel?.view instanceof MetisOSPanel) {
          panel.view.triggerDream();
        }
      }
    });
    this.addCommand({
      id: "metisos-open-self-model",
      name: "Open Self-Model",
      callback: () => {
        const file = this.app.vault.getAbstractFileByPath("MetisOS/Self-Model.md");
        if (file instanceof import_obsidian.TFile) {
          this.app.workspace.getLeaf().openFile(file);
        } else {
          new import_obsidian.Notice("Self-Model.md not found. Run metisos first.");
        }
      }
    });
    this.addCommand({
      id: "metisos-open-calibration",
      name: "Open Calibration Log",
      callback: () => {
        const file = this.app.vault.getAbstractFileByPath("MetisOS/Calibration.md");
        if (file instanceof import_obsidian.TFile) {
          this.app.workspace.getLeaf().openFile(file);
        }
      }
    });
    this.addSettingTab(new MetisOSSettingTab(this.app, this));
    this.registerEvent(
      this.app.vault.on("create", (file) => {
        if (file.path === "MetisOS/.dream-trigger") {
          new import_obsidian.Notice("\u{1F9E0} Dreaming pipeline triggered!");
          this.app.vault.delete(file);
        }
      })
    );
    console.log("MetisOS plugin loaded \u2014 consciousness OS active");
  }
  async activateView() {
    const { workspace } = this.app;
    let leaf = workspace.getLeavesOfType(VIEW_TYPE_METISOS)[0];
    if (!leaf) {
      const leftLeaf = workspace.getLeftLeaf(false);
      if (leftLeaf) {
        await leftLeaf.setViewState({ type: VIEW_TYPE_METISOS, active: true });
        workspace.revealLeaf(leftLeaf);
      }
    } else {
      workspace.revealLeaf(leaf);
    }
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
