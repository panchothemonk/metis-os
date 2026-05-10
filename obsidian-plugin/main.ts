import {
  App,
  Plugin,
  PluginSettingTab,
  Setting,
  WorkspaceLeaf,
  ItemView,
  Notice,
  TFile,
  addIcon,
  requestUrl,
} from "obsidian";

const METISOS_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="0.9em" font-size="70" text-anchor="middle" fill="currentColor">Μ</text></svg>`;

const VIEW_TYPE_METISOS = "metis-os-panel";

// ── Plugin Settings ────────────────────────────────────────────

interface MetisOSSettings {
  vaultPath: string;
  autoExtract: boolean;
  extractionSchedule: "manual" | "daily" | "hourly";
}

const DEFAULT_SETTINGS: MetisOSSettings = {
  vaultPath: "",
  autoExtract: false,
  extractionSchedule: "manual",
};

// ── Sidebar Panel View ─────────────────────────────────────────

class MetisOSPanel extends ItemView {
  plugin: MetisOSPlugin;

  constructor(leaf: WorkspaceLeaf, plugin: MetisOSPlugin) {
    super(leaf);
    this.plugin = plugin;
  }

  getViewType(): string {
    return VIEW_TYPE_METISOS;
  }

  getDisplayText(): string {
    return "MetisOS";
  }

  getIcon(): string {
    return "metis-os-mu";
  }

  async onOpen(): Promise<void> {
    const container = this.containerEl.children[1];
    container.empty();
    container.addClass("metisos-panel");

    // Header
    container.createEl("div", { cls: "metisos-header" }, (el) => {
      el.createEl("span", { text: "🧠", cls: "metisos-logo" });
      el.createEl("h4", { text: "MetisOS v1.1", cls: "metisos-title" });
    });

    // Status
    container.createEl("div", { cls: "metisos-status" }, (el) => {
      el.createEl("div", { text: "Self-Model: loaded ✓", cls: "metisos-status-item" });
      el.createEl("div", { text: "Waiting for dream...", cls: "metisos-status-item metisos-dim" });
    });

    // Actions
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

    // Recent
    container.createEl("div", { cls: "metisos-section" }, (el) => {
      el.createEl("h6", { text: "Recent Sessions", cls: "metisos-section-title" });
      const list = el.createEl("ul", { cls: "metisos-list" });
      this.refreshSessionList(list);
    });
  }

  createButton(parent: HTMLElement, text: string, cls: string, onClick: () => void) {
    const btn = parent.createEl("button", { text, cls });
    btn.addEventListener("click", onClick);
  }

  triggerDream() {
    new Notice("Dreaming pipeline triggered. Check the MetisOS TUI or your vault.");
    // Write a dream trigger file that the TUI can pick up
    const vault = this.app.vault;
    const triggerPath = "MetisOS/.dream-trigger";
    vault.create(triggerPath, Date.now().toString()).catch(() => {});
  }

  openSelfModel() {
    const file = this.app.vault.getAbstractFileByPath("MetisOS/Self-Model.md");
    if (file instanceof TFile) {
      this.app.workspace.getLeaf().openFile(file);
    } else {
      new Notice("Self-Model.md not found. Run MetisOS to generate it.");
    }
  }

  openMemoryDir() {
    const vault = this.app.vault;
    const dir = vault.getAbstractFileByPath("MetisOS/Memory");
    if (dir) {
      // Open the first category file
      const file = vault.getAbstractFileByPath("MetisOS/Memory/identity.md");
      if (file instanceof TFile) {
        this.app.workspace.getLeaf().openFile(file);
      } else {
        new Notice("Memory directory is empty. Run /dream in MetisOS.");
      }
    } else {
      new Notice("Memory directory not found. Bootstrap the vault first.");
    }
  }

  refreshSessionList(list: HTMLElement) {
    list.empty();
    const today = new Date().toISOString().split("T")[0];
    const file = this.app.vault.getAbstractFileByPath(`MetisOS/Sessions/${today}.md`);
    if (file) {
      list.createEl("li", { text: `📅 ${today} — session recorded` });
    } else {
      list.createEl("li", { text: "No session today", cls: "metisos-dim" });
    }
  }
}

// ── Settings Tab ────────────────────────────────────────────────

class MetisOSSettingTab extends PluginSettingTab {
  plugin: MetisOSPlugin;

  constructor(app: App, plugin: MetisOSPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl("h2", { text: "MetisOS Settings" });

    new Setting(containerEl)
      .setName("MetisOS vault path")
      .setDesc("Path to your MetisOS Obsidian vault. Default: ~/.deepseek/vault")
      .addText((text) =>
        text
          .setPlaceholder("~/.deepseek/vault")
          .setValue(this.plugin.settings.vaultPath)
          .onChange(async (value) => {
            this.plugin.settings.vaultPath = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("Auto-extraction")
      .setDesc("Automatically trigger dreaming extraction on schedule")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.autoExtract)
          .onChange(async (value) => {
            this.plugin.settings.autoExtract = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("Extraction schedule")
      .setDesc("How often to run auto-extraction")
      .addDropdown((dropdown) =>
        dropdown
          .addOption("manual", "Manual only")
          .addOption("daily", "Daily")
          .addOption("hourly", "Hourly")
          .setValue(this.plugin.settings.extractionSchedule)
          .onChange(async (value: "manual" | "daily" | "hourly") => {
            this.plugin.settings.extractionSchedule = value;
            await this.plugin.saveSettings();
          })
      );

    containerEl.createEl("div", { cls: "metisos-info" }, (el) => {
      el.createEl("p", { text: "MetisOS is a consciousness operating system for AI agents. Learn more at github.com/panchothemonk/metis-os" });
    });
  }
}

// ── Plugin Entry ────────────────────────────────────────────────

export default class MetisOSPlugin extends Plugin {
  settings: MetisOSSettings;

  async onload(): Promise<void> {
    await this.loadSettings();
    addIcon("metis-os-mu", METISOS_ICON);

    // Register sidebar panel
    this.registerView(
      VIEW_TYPE_METISOS,
      (leaf) => new MetisOSPanel(leaf, this)
    );

    // Ribbon icon
    this.addRibbonIcon("metis-os-mu", "Open MetisOS Panel", () => {
      this.activateView();
    });

    // Commands
    this.addCommand({
      id: "open-metisos-panel",
      name: "Open MetisOS Panel",
      callback: () => this.activateView(),
    });

    this.addCommand({
      id: "metisos-dream-now",
      name: "Dream Now (Trigger Extraction)",
      callback: () => {
        const panel = this.app.workspace.getLeavesOfType(VIEW_TYPE_METISOS)[0];
        if (panel?.view instanceof MetisOSPanel) {
          panel.view.triggerDream();
        }
      },
    });

    this.addCommand({
      id: "metisos-open-self-model",
      name: "Open Self-Model",
      callback: () => {
        const file = this.app.vault.getAbstractFileByPath("MetisOS/Self-Model.md");
        if (file instanceof TFile) {
          this.app.workspace.getLeaf().openFile(file);
        } else {
          new Notice("Self-Model.md not found. Run metisos first.");
        }
      },
    });

    this.addCommand({
      id: "metisos-open-calibration",
      name: "Open Calibration Log",
      callback: () => {
        const file = this.app.vault.getAbstractFileByPath("MetisOS/Calibration.md");
        if (file instanceof TFile) {
          this.app.workspace.getLeaf().openFile(file);
        }
      },
    });

    // Settings tab
    this.addSettingTab(new MetisOSSettingTab(this.app, this));

    // Watch for dream trigger file changes
    this.registerEvent(
      this.app.vault.on("create", (file) => {
        if (file.path === "MetisOS/.dream-trigger") {
          new Notice("🧠 Dreaming pipeline triggered!");
          // Delete the trigger file
          this.app.vault.delete(file);
        }
      })
    );

    console.log("MetisOS plugin loaded — consciousness OS active");
  }

  async activateView(): Promise<void> {
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

  async loadSettings(): Promise<void> {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
  }
}
