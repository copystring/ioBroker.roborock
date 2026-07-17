import {
	createOfflineAppPluginEnvelope,
	type AppPluginDesktopIntent,
} from "./apppluginLab/desktop-intents";
import {
	LiveAppPluginMapSurface,
	type LiveAppPluginThemeMode,
	type LiveAppPluginMapSnapshot,
	type LiveAppPluginMapTool,
	type LiveAppPluginSemanticActionId,
	type LiveAppPluginSurfaceView,
} from "./apppluginLab/live-appplugin-map-surface";
type MapTool = LiveAppPluginMapTool;
type CleanScope = "full" | "rooms" | "zones";
type CleanMethod = "smart" | "vacuum" | "mop" | "vacuumThenMop";

function semanticActionForTool(tool: MapTool): LiveAppPluginSemanticActionId | undefined {
	if (tool === "view") return "map.mode.full";
	if (tool === "rooms") return "map.mode.rooms";
	if (tool === "zones") return "map.mode.zones";
	return undefined;
}

function semanticActionForScope(scope: CleanScope): LiveAppPluginSemanticActionId {
	return scope === "full" ? "map.mode.full" : scope === "rooms" ? "map.mode.rooms" : "map.mode.zones";
}

const shellLanguageNames = new Intl.DisplayNames(["de"], { type: "language" });

function shellLanguageName(language: string): string {
	if (language === "es-LA") return "Spanisch (Lateinamerika)";
	return shellLanguageNames.of(language) ?? language;
}

function byId<T extends HTMLElement | SVGElement>(id: string): T {
	const element = document.getElementById(id);
	if (!element) throw new Error(`Desktop-PoC-Element fehlt: ${id}`);
	return element as T;
}

function localRuntimePort(): number {
	const value = new URLSearchParams(location.search).get("runtimePort");
	if (value === null) return 4174;
	const port = Number(value);
	if (!Number.isSafeInteger(port) || port < 1 || port > 65_535) {
		throw new Error(`Ungültiger lokaler AppPlugin-Runtime-Port: ${value}`);
	}
	return port;
}

class AppPluginDesktop {
	private activeNavigation = "map";
	private tool: MapTool = "rooms";
	private scope: CleanScope = "rooms";
	private method: CleanMethod = "smart";
	private passes = 1;
	private logCount = 0;
	private mapSurface!: LiveAppPluginMapSurface;
	private mapSnapshot: LiveAppPluginMapSnapshot | null = null;

	private readonly map = byId<HTMLElement>("desktopMap");
	private readonly mapFrame = byId<HTMLImageElement>("desktopMapFrame");
	private readonly log = byId<HTMLElement>("eventLog");
	private readonly payload = byId<HTMLElement>("payloadPreview");
	private readonly themeMode = byId<HTMLSelectElement>("themeMode");
	private readonly languageMode = byId<HTMLSelectElement>("languageMode");
	private readonly runtimeProfile = byId<HTMLSelectElement>("runtimeProfile");

	public async init(): Promise<void> {
		const runtimePort = localRuntimePort();
		if (![...this.runtimeProfile.options].some(option => option.value === String(runtimePort))) {
			const isolatedProfile = document.createElement("option");
			isolatedProfile.value = String(runtimePort);
			isolatedProfile.textContent = `Isolierter Test · ${runtimePort}`;
			this.runtimeProfile.append(isolatedProfile);
		}
		this.runtimeProfile.value = String(runtimePort);
		this.runtimeProfile.addEventListener("change", () => {
			const url = new URL(location.href);
			if (this.runtimeProfile.value === "4174") url.searchParams.delete("runtimePort");
			else url.searchParams.set("runtimePort", this.runtimeProfile.value);
			location.assign(url);
		});
		this.mapSurface = new LiveAppPluginMapSurface({
			viewport: this.map,
			frame: this.mapFrame,
			apiBaseUrl: `http://127.0.0.1:${runtimePort}`,
			initialView: runtimePort === 4175 ? "full" : "map",
			onEvent: (label, data) => this.logEvent(label, data),
			onChange: snapshot => {
				this.mapSnapshot = snapshot;
				document.documentElement.dataset.theme = snapshot.colorScheme;
				this.map.dataset.apppluginDirection = snapshot.isRTL ? "rtl" : "ltr";
				this.mapFrame.dir = snapshot.isRTL ? "rtl" : "ltr";
				this.syncLanguageControl(snapshot);
				this.themeMode.value = snapshot.colorModel === "default" ? "system" : snapshot.colorModel;
				this.themeMode.disabled = !snapshot.themeSwitching;
				this.themeMode.title = snapshot.themeSwitching
					? "APK-Theme wird an das unveränderte AppPlugin gesendet"
					: "Die laufende PoC-Sitzung muss mit dem neuen Theme-Host neu gestartet werden";
				this.syncMapModeFromAppPlugin(snapshot);
				this.updateMapSummary(snapshot);
				this.updateControlStates();
			},
		});
		await this.mapSurface.init();
		this.bindNavigation();
		this.bindControls();
		this.activateNavigation("map", false);
		this.emitIntent({
			name: "navigation.open",
			arguments: {
				page: "map",
				mapSource: this.mapSurface.snapshot(),
				localization: { owner: "unchanged-model-appplugin", status: "live" },
			},
		}, "Direkte AppPlugin-Sitzung verbunden");
	}

	private bindNavigation(): void {
		document.querySelectorAll<HTMLButtonElement>("[data-navigation]").forEach(button => {
			button.addEventListener("click", () => this.activateNavigation(button.dataset.navigation ?? "map"));
		});
	}

	private activateNavigation(page: string, emit = true): void {
		this.activeNavigation = page;
		document.querySelectorAll<HTMLElement>("[data-navigation]").forEach(element => {
			element.classList.toggle("active", element.dataset.navigation === page);
		});
		document.querySelectorAll<HTMLElement>("[data-context-page]").forEach(element => {
			element.hidden = element.dataset.contextPage !== page;
		});
		byId<HTMLElement>("currentSection").textContent = page === "map" ? "Karte & Reinigung" :
			page === "overview" ? "Geräteübersicht" :
			page === "schedules" ? "Pläne" :
			page === "history" ? "Reinigungsverlauf" :
			"Einstellungen";
		if (emit) this.emitIntent({ name: "navigation.open", arguments: { page } }, "Desktop-Menü geöffnet");
	}

	private bindControls(): void {
		this.languageMode.addEventListener("change", () => {
			void this.mapSurface.setLanguage(this.languageMode.value);
		});
		this.themeMode.addEventListener("change", () => {
			void this.mapSurface.setTheme(this.themeMode.value as LiveAppPluginThemeMode);
		});
		matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
			if (this.themeMode.value === "system") void this.mapSurface.setTheme("system");
		});

		document.querySelectorAll<HTMLButtonElement>("[data-surface-view]").forEach(button => {
			button.addEventListener("click", () => {
				void this.mapSurface.setView(button.dataset.surfaceView as LiveAppPluginSurfaceView);
			});
		});

		document.querySelectorAll<HTMLButtonElement>("button[data-tool]").forEach(button => {
			button.addEventListener("click", () => {
				const requestedTool = button.dataset.tool as MapTool;
				const actionId = semanticActionForTool(requestedTool);
				if (!actionId) {
					this.logEvent("AppPlugin-Werkzeugadapter noch nicht verbunden", {
						requestedTool,
						fallbackUsed: false,
					});
					return;
				}
				void this.mapSurface.invokeSemanticAction(actionId);
			});
		});

		document.querySelectorAll<HTMLButtonElement>("[data-clean-scope]").forEach(button => {
			button.addEventListener("click", () => {
				const requestedScope = button.dataset.cleanScope as CleanScope;
				void this.mapSurface.invokeSemanticAction(semanticActionForScope(requestedScope));
			});
		});

		document.querySelectorAll<HTMLButtonElement>("[data-clean-method]").forEach(button => {
			button.addEventListener("click", () => {
				this.method = button.dataset.cleanMethod as CleanMethod;
				this.updateControlStates();
				this.emitIntent({ name: "clean.setting.change", arguments: { method: this.method } }, "Reinigungsmethode geändert");
			});
		});

		document.querySelectorAll<HTMLButtonElement>("[data-pass-count]").forEach(button => {
			button.addEventListener("click", () => {
				this.passes = Number(button.dataset.passCount) || 1;
				this.updateControlStates();
				this.emitIntent({ name: "clean.setting.change", arguments: { passes: this.passes } }, "Reinigungsdurchläufe geändert");
			});
		});

		document.querySelectorAll<HTMLSelectElement>("[data-setting]").forEach(select => {
			select.addEventListener("change", () => {
				this.emitIntent({
					name: "clean.setting.change",
					arguments: { setting: select.dataset.setting, value: select.value },
				}, "Reinigungseinstellung geändert");
			});
		});

		document.querySelectorAll<HTMLInputElement>("[data-device-setting]").forEach(input => {
			input.addEventListener("change", () => {
				const setting = input.dataset.deviceSetting;

				this.emitIntent({
					name: "device.setting.change",
					arguments: { setting, enabled: input.checked },
				}, "Geräteeinstellung geändert");
			});
		});

		document.querySelectorAll<HTMLButtonElement>("[data-intent]").forEach(button => {
			button.addEventListener("click", () => {
				const name = button.dataset.intent as AppPluginDesktopIntent["name"];
				if (name === "clean.start") this.startCleaning();
				else this.emitIntent({ name, arguments: button.dataset.intentArgument ? { action: button.dataset.intentArgument } : undefined });
			});
		});

		document.querySelectorAll<HTMLInputElement>("[data-schedule]").forEach(input => {
			input.addEventListener("change", () => {
				this.emitIntent({
					name: "schedule.toggle",
					arguments: { scheduleId: input.dataset.schedule, enabled: input.checked },
				}, "Zeitplan geändert");
			});
		});

		document.querySelectorAll<HTMLButtonElement>("[data-history-id]").forEach(button => {
			button.addEventListener("click", () => this.emitIntent({
				name: "history.open",
				arguments: { historyId: button.dataset.historyId },
			}, "Reinigungsdatensatz geöffnet"));
		});

		byId<HTMLButtonElement>("clearSelection").addEventListener("click", () => {
			this.logEvent("AppPlugin-Auswahl löschen noch nicht über UI-Vertrag aufgelöst", { fallbackUsed: false });
		});
		byId<HTMLButtonElement>("zoomOut").addEventListener("click", () => void this.mapSurface.zoomBy(-1));
		byId<HTMLButtonElement>("zoomIn").addEventListener("click", () => void this.mapSurface.zoomBy(1));

		byId<HTMLButtonElement>("clearLog").addEventListener("click", () => {
			this.log.replaceChildren();
			this.payload.textContent = "Noch keine Absicht erfasst.";
			this.logCount = 0;
			byId<HTMLElement>("logCount").textContent = "0";
		});
		this.updateControlStates();
	}

	private startCleaning(): void {
		const action = this.mapSurface.semanticAction("clean.start");
		if (!action?.enabled) {
			this.logEvent("Originale AppPlugin-Reinigungsaktion ist nicht verfügbar", {
				actionId: "clean.start",
				fallbackUsed: false,
			});
			return;
		}
		void this.mapSurface.invokeSemanticAction("clean.start");
	}
	private updateMapSummary(snapshot: LiveAppPluginMapSnapshot): void {
		const deviceFamily = snapshot.deviceModel.includes("ss09") ? "Q10" : "Q7";
		byId<HTMLElement>("deviceFamilyBadge").textContent = deviceFamily;
		byId<HTMLElement>("deviceName").textContent = snapshot.profileLabel;
		const fullView = snapshot.view === "full";
		const selectedMode = snapshot.semanticActions.find(action =>
			action.id.startsWith("map.mode.") && action.selected,
		);
		byId<HTMLElement>("selectionSummary").textContent = selectedMode
			? `${selectedMode.label} · Zustand direkt aus dem Geräte-AppPlugin`
			: "Kartenansicht und Interaktion werden direkt vom Geräte-AppPlugin verwaltet";
		byId<HTMLElement>("mapViewTitle").textContent = fullView
			? "Originale AppPlugin-Testansicht"
			: "Unveränderte AppPlugin-Karte";
		byId<HTMLElement>("mapViewDescription").textContent = fullView
			? "Das vollständige AppPlugin inklusive seiner originalen Menüs. Alle Klicks laufen als APK-Touchereignisse durch dieselbe Hermes-Sitzung."
			: "Geometrie, Farben, Raumnamen, Roboter, Station, Skalierung und Auswahlzustand werden von derselben laufenden Hermes-Sitzung erzeugt. Der Desktop hostet nur APK-Verträge, Eingabe und Ausgabe.";
		byId<HTMLElement>("mapOriginLabel").textContent = fullView
			? `${snapshot.profileLabel} · vollständiger AppPlugin-Root`
			: `${snapshot.profileLabel} · AppPlugin-Kartenviewport`;
		byId<HTMLElement>("mapNotice").textContent = fullView
			? "Testmodus: Öffne hier direkt die originalen AppPlugin-Menüs, beispielsweise Bearbeiten → Zusammenführen. Veröffentlichte DPS erscheinen unten im Protokoll und werden nicht an ein Gerät gesendet."
			: "Direkte native Kartenteilstruktur des laufenden Geräte-AppPlugins. Pointer und Pinch werden als APK-Touchereignisse zurück in dieselbe Sitzung geleitet; Gerätebefehle werden nicht gesendet.";
		document.querySelectorAll<HTMLButtonElement>("[data-surface-view]").forEach(button => {
			const active = button.dataset.surfaceView === snapshot.view;
			button.classList.toggle("active", active);
			button.setAttribute("aria-pressed", String(active));
			button.disabled = !snapshot.availableViews.includes(button.dataset.surfaceView as LiveAppPluginSurfaceView);
		});
	}
	private syncMapModeFromAppPlugin(snapshot: LiveAppPluginMapSnapshot): void {
		const selectedMode = snapshot.semanticActions.find(action =>
			action.id.startsWith("map.mode.") && action.selected,
		);
		if (selectedMode?.id === "map.mode.full") {
			this.tool = "view";
			this.scope = "full";
		} else if (selectedMode?.id === "map.mode.rooms") {
			this.tool = "rooms";
			this.scope = "rooms";
		} else if (selectedMode?.id === "map.mode.zones") {
			this.tool = "zones";
			this.scope = "zones";
		}
		for (const action of snapshot.semanticActions) {
			const tool = action.id === "map.mode.full"
				? "view"
				: action.id === "map.mode.rooms"
					? "rooms"
					: action.id === "map.mode.zones"
						? "zones"
						: undefined;
			if (tool) {
				const button = document.querySelector<HTMLButtonElement>(`button[data-tool="${tool}"]`);
				if (button) button.textContent = action.label;
			}
			const scope = action.id === "map.mode.full"
				? "full"
				: action.id === "map.mode.rooms"
					? "rooms"
					: action.id === "map.mode.zones"
						? "zones"
						: undefined;
			if (scope) {
				const label = document.querySelector<HTMLElement>(`[data-clean-scope="${scope}"] span`);
				if (label) label.textContent = action.label;
			}
			if (action.id === "clean.start") {
				const label = document.querySelector<HTMLElement>('[data-intent="clean.start"] span');
				if (label) label.textContent = action.label;
			}
		}
	}
	private syncLanguageControl(snapshot: LiveAppPluginMapSnapshot): void {
		const currentLanguages = [...this.languageMode.options].map(option => option.value);
		if (currentLanguages.join("\u0000") !== snapshot.availableLanguages.join("\u0000")) {
			this.languageMode.replaceChildren(...snapshot.availableLanguages.map(language => {
				const option = document.createElement("option");
				option.value = language;
				option.textContent = `${shellLanguageName(language)} · ${language}`;
				return option;
			}));
		}
		this.languageMode.value = snapshot.language;
		this.languageMode.disabled = !snapshot.languageSwitching;
		this.languageMode.title = snapshot.languageSwitching
			? `Gemeinsamer APK/AppPlugin-Zustand: ${snapshot.language} (${snapshot.localeIdentifier})`
			: "Die laufende AppPlugin-Sitzung unterstützt den APK-Sprachwechsel noch nicht";
	}
	private updateControlStates(): void {
		document.querySelectorAll<HTMLButtonElement>("button[data-tool]").forEach(button => {
			const active = button.dataset.tool === this.tool;
			button.classList.toggle("active", active);
			button.setAttribute("aria-pressed", String(active));
		});
		document.querySelectorAll<HTMLButtonElement>("[data-clean-scope]").forEach(button => {
			const active = button.dataset.cleanScope === this.scope;
			button.classList.toggle("active", active);
			button.setAttribute("aria-pressed", String(active));
		});
		document.querySelectorAll<HTMLButtonElement>("[data-clean-method]").forEach(button => {
			const active = button.dataset.cleanMethod === this.method;
			button.classList.toggle("active", active);
			button.setAttribute("aria-pressed", String(active));
			button.disabled = true;
			button.title = "Wird erst nach einem belegten semantischen AppPlugin-Einstieg freigeschaltet";
		});
		document.querySelectorAll<HTMLButtonElement>("[data-pass-count]").forEach(button => {
			const active = Number(button.dataset.passCount) === this.passes;
			button.classList.toggle("active", active);
			button.setAttribute("aria-pressed", String(active));
			button.disabled = true;
			button.title = "Wird erst nach einem belegten semantischen AppPlugin-Einstieg freigeschaltet";
		});
		document.querySelectorAll<HTMLSelectElement>("[data-setting]").forEach(select => {
			select.disabled = true;
			select.title = "Wird erst nach einem belegten semantischen AppPlugin-Einstieg freigeschaltet";
		});
		document.querySelectorAll<HTMLButtonElement>("[data-clean-scope]").forEach(button => {
			const scope = button.dataset.cleanScope as CleanScope;
			const action = this.mapSnapshot
				? this.mapSnapshot.semanticActions.find(candidate => candidate.id === semanticActionForScope(scope))
				: undefined;
			button.disabled = action?.enabled !== true;
		});
		document.querySelectorAll<HTMLButtonElement>("button[data-tool]").forEach(button => {
			const actionId = semanticActionForTool(button.dataset.tool as MapTool);
			const action = actionId && this.mapSnapshot
				? this.mapSnapshot.semanticActions.find(candidate => candidate.id === actionId)
				: undefined;
			button.disabled = action?.enabled !== true;
			if (button.disabled) button.title = "Wird erst nach einem belegten AppPlugin-UI-Vertrag freigeschaltet";
			else button.title = "Löst die originale AppPlugin-Aktion ohne feste Bildschirmkoordinate aus";
		});
		const cleanStart = document.querySelector<HTMLButtonElement>('[data-intent="clean.start"]');
		if (cleanStart) {
			cleanStart.disabled = this.mapSnapshot?.semanticActions.some(action =>
				action.id === "clean.start" && action.enabled,
			) !== true;
			cleanStart.title = cleanStart.disabled
				? "Das laufende AppPlugin bietet noch keine semantische Reinigungsaktion an"
				: "Löst die originale AppPlugin-Reinigungsaktion aus; Befehlsparameter bleiben im Bundle";
		}
		byId<HTMLElement>("mapInstruction").textContent = this.mapSnapshot
			? this.mapSnapshot.view === "full"
				? "Original-Testansicht · AppPlugin-Menüs direkt anklicken · DPS unten prüfen"
				: "Direkter AppPlugin-Kartenmodus · Räume anklicken, ziehen oder per Zwei-Finger-Geste zoomen"
			: "Direkte AppPlugin-Sitzung wird verbunden …";
		const zoomOut = document.getElementById("zoomOut") as HTMLButtonElement | null;
		const zoomIn = document.getElementById("zoomIn") as HTMLButtonElement | null;
		if (zoomOut) zoomOut.disabled = this.mapSnapshot === null;
		if (zoomIn) zoomIn.disabled = this.mapSnapshot === null;
	}

	private emitIntent(intent: AppPluginDesktopIntent, label = "Absicht erfasst – nicht gesendet"): void {
		const envelope = createOfflineAppPluginEnvelope(intent);
		this.payload.textContent = JSON.stringify(envelope, null, 2);
		this.logEvent(label, envelope);
	}

	private logEvent(label: string, data: unknown): void {
		const entry = document.createElement("button");
		entry.type = "button";
		entry.className = "log-entry";
		const time = document.createElement("time");
		time.textContent = new Date().toLocaleTimeString("de-DE");
		const content = document.createElement("span");
		content.textContent = label;
		const detail = document.createElement("small");
		detail.textContent = JSON.stringify(data);
		entry.append(time, content, detail);
		entry.addEventListener("click", () => {
			this.payload.textContent = JSON.stringify(data, null, 2);
		});
		this.log.prepend(entry);
		while (this.log.children.length > 60) this.log.lastElementChild?.remove();
		this.logCount = this.log.children.length;
		byId<HTMLElement>("logCount").textContent = String(this.logCount);
	}
}

void new AppPluginDesktop().init().catch(error => {
	const message = error instanceof Error ? error.message : String(error);
	const instruction = document.getElementById("mapInstruction");
	if (instruction) instruction.textContent = `Originalkarte konnte nicht gestartet werden: ${message}`;
	throw error;
});
