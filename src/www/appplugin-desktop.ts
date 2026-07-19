import {
	createOfflineAppPluginEnvelope,
	type AppPluginDesktopIntent,
} from "./apppluginLab/desktop-intents";
import {
	LiveAppPluginMapSurface,
	hasInteractiveAppPluginMap,
	readAppPluginSessionToken,
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

function appPluginRuntimeEvidence(snapshot: LiveAppPluginMapSnapshot) {
	return {
		sessionId: snapshot.sessionId,
		profileId: snapshot.profileId,
		mapFamily: snapshot.mapFamily,
		deviceModel: snapshot.deviceModel,
		profileLabel: snapshot.profileLabel,
		bundleKind: snapshot.bundleKind,
		bundleSha256: snapshot.bundleSha256,
		bundleProvenance: snapshot.bundleProvenance,
		deviceSession: snapshot.deviceSession,
	};
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
	private readonly sessionToken = readAppPluginSessionToken();

	private readonly map = byId<HTMLElement>("desktopMap");
	private readonly mapFrame = byId<HTMLImageElement>("desktopMapFrame");
	private readonly log = byId<HTMLElement>("eventLog");
	private readonly payload = byId<HTMLElement>("payloadPreview");
	private readonly themeMode = byId<HTMLSelectElement>("themeMode");
	private readonly languageMode = byId<HTMLSelectElement>("languageMode");
	private readonly runtimeProfile = byId<HTMLSelectElement>("runtimeProfile");
	private readonly runtimeStatus = byId<HTMLElement>("runtimeStatus");
	private readonly deviceContextKind = byId<HTMLElement>("deviceContextKind");

	public async init(): Promise<void> {
		this.bindNavigation();
		this.activateNavigation("map", false);
		this.bindRuntimeProfile();
		this.runtimeProfile.disabled = true;
		this.setSessionControlsConnected(false);
		this.runtimeStatus.textContent = "Verbinde gemeinsame AppPlugin-Sitzung …";
		this.runtimeStatus.dataset.state = "connecting";
		this.mapSurface = new LiveAppPluginMapSurface({
			viewport: this.map,
			frame: this.mapFrame,
			apiBaseUrl: location.origin,
			onEvent: (label, data) => this.logEvent(label, data),
			onChange: snapshot => {
				this.mapSnapshot = snapshot;
				this.syncRuntimeProfile(snapshot);
				this.updateRuntimeStatus(snapshot);
				this.runtimeProfile.disabled = snapshot.availableProfiles.length < 2;
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
		try {
			await this.mapSurface.init();
		} catch (error) {
			this.showRuntimeConnectionError(error);
			return;
		}
		this.setSessionControlsConnected(true);
		this.bindControls();
		this.emitIntent({
			name: "navigation.open",
			arguments: {
				page: "map",
				mapSource: appPluginRuntimeEvidence(this.mapSurface.snapshot()),
				localization: { owner: "unchanged-model-appplugin", status: "live" },
			},
		}, "Direkte AppPlugin-Sitzung verbunden");
	}

	private bindRuntimeProfile(): void {
		this.runtimeProfile.addEventListener("change", () => {
			void this.switchRuntimeProfile(this.runtimeProfile.value);
		});
	}

	private syncRuntimeProfile(snapshot: LiveAppPluginMapSnapshot): void {
		const catalog = snapshot.profileCatalog.length > 0
			? snapshot.profileCatalog
			: snapshot.availableProfiles.map(id => ({
				id,
				label: id.toUpperCase(),
				aliases: [id],
				bundleKind: "hermes-bytecode" as const,
				bundleSha256: "",
				runtimeMode: "fixture-replay" as const,
				modelSource: "home-data-fixture" as const,
				availability: "available" as const,
			}));
		this.runtimeProfile.replaceChildren();
		const replayGroup = document.createElement("optgroup");
		replayGroup.label = "Mit echter lokaler Geräteaufnahme";
		const auditGroup = document.createElement("optgroup");
		auditGroup.label = "Unverändertes Bundle · UI-Audit ohne Live-Gerät";
		for (const entry of catalog) {
			const option = document.createElement("option");
			option.value = entry.id;
			option.textContent = entry.runtimeMode === "fixture-replay"
				? entry.label
				: `${entry.label} · ${entry.availability === "failed" ? "noch nicht startfähig" : "UI-Audit"}`;
			option.disabled = !snapshot.availableProfiles.includes(entry.id);
			option.title = entry.failure
				?? entry.warning
				?? `${entry.bundleKind} · ${entry.bundleSha256.slice(0, 12)}`;
			(entry.runtimeMode === "fixture-replay" ? replayGroup : auditGroup).append(option);
		}
		if (replayGroup.children.length > 0) this.runtimeProfile.append(replayGroup);
		if (auditGroup.children.length > 0) this.runtimeProfile.append(auditGroup);
		const currentOption = [...this.runtimeProfile.options].find(option => option.value === snapshot.profileId);
		if (!currentOption && snapshot.profileId !== "unknown") {
			const option = document.createElement("option");
			option.value = snapshot.profileId;
			option.textContent = snapshot.profileLabel;
			this.runtimeProfile.prepend(option);
		}
		if (snapshot.profileId !== "unknown") {
			this.runtimeProfile.value = snapshot.profileId;
		} else {
			this.runtimeProfile.selectedIndex = -1;
		}
	}

	private updateRuntimeStatus(snapshot: LiveAppPluginMapSnapshot): void {
		const entry = snapshot.profileCatalog.find(candidate => candidate.id === snapshot.profileId);
		const contextLabel = entry?.runtimeMode === "bundle-audit"
			? entry.modelSource === "apk-home-data"
				? "Originalmodell aus lokaler APK-HomeData · ohne Live-Gerät"
				: entry.modelSource === "appplugin-project"
					? "Originaler AppPlugin-Paketkontext · ohne Live-Gerät"
					: "Neutraler AppPlugin-Auditkontext · ohne Live-Gerät"
			: "Echte lokale Geräteaufnahme";
		this.runtimeStatus.textContent = `Bundle unverändert · ${contextLabel}`;
		this.deviceContextKind.textContent = contextLabel;
		this.runtimeStatus.dataset.state = "connected";
		this.runtimeProfile.title = entry
			? [
				`${snapshot.profileCatalog.length} unterschiedliche Bundles im gemeinsamen Katalog`,
				`${entry.bundleKind} · ${entry.bundleSha256.slice(0, 12)}`,
				entry.warning,
			].filter(Boolean).join("\n")
			: "Gemeinsamer AppPlugin-Katalog";
	}

	private async switchRuntimeProfile(profile: string): Promise<void> {
		const previousSnapshot = this.mapSnapshot;
		if (!previousSnapshot || profile === previousSnapshot.profileId) return;
		this.runtimeProfile.disabled = true;
		this.setSessionControlsConnected(false);
		const target = previousSnapshot.profileCatalog.find(entry => entry.id === profile);
		this.runtimeStatus.textContent = `Wechsle AppPlugin zu ${target?.label ?? profile} …`;
		this.runtimeStatus.dataset.state = "connecting";
		try {
			const response = await fetch(`${location.origin}/profile`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-AppPlugin-Session": this.sessionToken,
				},
				body: JSON.stringify({ profile }),
				signal: AbortSignal.timeout(5_000),
			});
			const payload = await response.json() as {
				error?: string;
				profile?: string;
				sessionId?: string;
				sessionRestarting?: boolean;
			};
			if (!response.ok || payload.error) {
				throw new Error(payload.error ?? `Profilwechsel antwortet mit HTTP ${response.status}`);
			}
			this.logEvent("AppPlugin-Profilwechsel angefordert", payload);
			if (!payload.sessionRestarting) {
				this.runtimeProfile.disabled = false;
				this.setSessionControlsConnected(true);
				return;
			}
			await this.waitForRuntimeProfile(profile, previousSnapshot.sessionId);
			location.reload();
		} catch (error) {
			this.runtimeProfile.value = previousSnapshot.profileId;
			this.runtimeProfile.disabled = false;
			this.setSessionControlsConnected(true);
			this.runtimeStatus.textContent = "AppPlugin-Profilwechsel fehlgeschlagen";
			this.runtimeStatus.dataset.state = "error";
			this.logEvent("AppPlugin-Profilwechsel fehlgeschlagen", {
				profile,
				message: error instanceof Error ? error.message : String(error),
			});
		}
	}

	private async waitForRuntimeProfile(profile: string, previousSessionId: string): Promise<void> {
		const deadline = performance.now() + 30_000;
		let lastError: unknown;
		while (performance.now() < deadline) {
			try {
				const response = await fetch(`${location.origin}/health`, {
					cache: "no-store",
					headers: { "X-AppPlugin-Session": this.sessionToken },
					signal: AbortSignal.timeout(1_000),
				});
				if (response.ok) {
					const health = await response.json() as {
						status?: string;
						profileId?: string;
						sessionId?: string;
						profileCatalog?: Array<{
							id?: string;
							availability?: string;
							failure?: string;
						}>;
					};
					const target = health.profileCatalog?.find(entry => entry.id === profile);
					if (target?.availability === "failed") {
						lastError = new Error(target.failure ?? `Profil ${profile} ist noch nicht startfähig`);
						break;
					}
					if (health.status === "appplugin-session-ready"
						&& health.profileId === profile
						&& health.sessionId !== previousSessionId) {
						return;
					}
				}
			} catch (error) {
				lastError = error;
			}
			await new Promise<void>(resolve => setTimeout(resolve, 100));
		}
		throw new Error(
			`Profil ${profile} wurde auf dem gemeinsamen Server nicht bereit: ${
				lastError instanceof Error ? lastError.message : "Zeitüberschreitung"
			}`,
		);
	}

	private setSessionControlsConnected(connected: boolean): void {
		document.querySelectorAll<HTMLButtonElement | HTMLSelectElement | HTMLInputElement>(
			".workbench button, .workbench select, .workbench input",
		).forEach(control => {
			control.disabled = !connected;
		});
		this.themeMode.disabled = !connected;
		this.languageMode.disabled = !connected;
		if (!connected || this.mapSnapshot === null) return;
		this.themeMode.disabled = !this.mapSnapshot.themeSwitching;
		this.languageMode.disabled = !this.mapSnapshot.languageSwitching;
		this.updateMapSummary(this.mapSnapshot);
		this.updateControlStates();
	}

	private showRuntimeConnectionError(error: unknown): void {
		const message = error instanceof Error ? error.message : String(error);
		this.setSessionControlsConnected(false);
		this.runtimeStatus.textContent = "Gemeinsame AppPlugin-Sitzung nicht erreichbar";
		this.runtimeStatus.dataset.state = "error";
		byId<HTMLElement>("mapInstruction").textContent =
			"Der gemeinsame AppPlugin-Server ist nicht bereit. Es gibt keinen zweiten Runtime-Port als Ausweichweg.";
		byId<HTMLElement>("selectionSummary").textContent =
			"Die Desktop-Navigation bleibt verfügbar; AppPlugin-Aktionen sind bis zur Verbindung deaktiviert.";
		this.logEvent("Gemeinsame AppPlugin-Sitzung nicht erreichbar", { message });
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

		document.querySelectorAll<HTMLButtonElement>("[data-semantic-action]").forEach(button => {
			button.addEventListener("click", () => {
				void this.mapSurface.invokeSemanticAction(
					button.dataset.semanticAction as LiveAppPluginSemanticActionId,
				);
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
			this.logEvent("Hostadapter findet keine AppPlugin-Reinigungsaktion", {
				actionId: "clean.start",
				fallbackUsed: false,
			});
			return;
		}
		void this.mapSurface.invokeSemanticAction("clean.start");
	}
	private updateMapSummary(snapshot: LiveAppPluginMapSnapshot): void {
		const deviceFamilyBadge = byId<HTMLElement>("deviceFamilyBadge");
		const compatibility = snapshot.deviceSession.compatibility;
		const runtimeUsage = snapshot.deviceSession.runtimeUsage;
		deviceFamilyBadge.textContent = runtimeUsage.missingNativeCallCount > 0
			? `Fehlt ${runtimeUsage.missingNativeCallCount}`
			: runtimeUsage.unavailableHostServiceCount > 0
				? "Dienste offen"
				: runtimeUsage.unexpectedRejectionCount > 0
					? `Abweisung ${runtimeUsage.unexpectedRejectionCount}`
				: "APK-Verträge ✓";
		deviceFamilyBadge.title = snapshot.deviceSession.source === "apk-device-session-descriptor"
			? `APK-validierter Gerätekontext · API ${compatibility.status === "compatible"
				? compatibility.hostApiLevel
				: "unbekannt"} · ${snapshot.deviceSession.package?.models.join(", ") ?? snapshot.deviceModel}`
				+ ` · ${runtimeUsage.invocationCount} tatsächliche Native-Aufrufe`
				+ ` · ${runtimeUsage.missingNativeCallCount} fehlende APK-Verträge`
				+ ` · ${runtimeUsage.unavailableHostServiceCount} offene externe APK-Dienste`
				+ ` · ${runtimeUsage.expectedDomainRejectionCount} erwartete APK-Fachablehnungen`
				+ ` · ${runtimeUsage.unexpectedRejectionCount} unerwartete Abweisungen`
			: "Legacy-Probe ohne Sitzungsdeskriptor";
		byId<HTMLElement>("deviceName").textContent = snapshot.profileLabel;
		const fullView = snapshot.view === "full";
		const selectedMode = snapshot.semanticActions.find(action =>
			action.id.startsWith("map.mode.") && action.selected,
		);
		byId<HTMLElement>("selectionSummary").textContent = selectedMode
			? `${selectedMode.label} · Zustand direkt aus dem Geräte-AppPlugin`
			: "Kartenansicht und Interaktion werden direkt vom Geräte-AppPlugin verwaltet";
		byId<HTMLElement>("mapViewTitle").textContent = fullView
			? "AppPlugin-Hostdiagnose"
			: "AppPlugin-Karte als Hostdiagnose";
		byId<HTMLElement>("mapViewDescription").textContent = fullView
			? "Vom unveränderten Bundle erzeugter UI-Baum, diagnostisch durch den Host als SVG dargestellt. Klicks laufen durch die nachgebildete APK-Touchbrücke."
			: "UI-Baum und Eigenschaften kommen aus derselben unveränderten AppPlugin-Sitzung. Die sichtbaren SVG-Pixel und die optimistische Drag-Darstellung erzeugt der Host diagnostisch.";
		byId<HTMLElement>("mapOriginLabel").textContent = fullView
			? `${snapshot.profileLabel} · vollständiger AppPlugin-Root`
			: `${snapshot.profileLabel} · AppPlugin-Kartenviewport`;
		byId<HTMLElement>("mapNotice").textContent = fullView
			? "Diagnosemodus: AppPlugin-Menüs und Bundle-Payloads testen. Die Darstellung stammt vom Host-SVG-Renderer und behauptet keine APK-Pixelparität."
			: "PC-Kartenmodus mit optimistischer Browserdarstellung. Pointer gehen über die nachgebildete APK-Touchbrücke zurück in dieselbe Bundle-Sitzung; Gerätebefehle werden nicht gesendet.";
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
			if (action.id === "dock.panel") {
				const label = document.querySelector<HTMLElement>('[data-semantic-action="dock.panel"] span');
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
		const interactiveMapAvailable = this.mapSnapshot !== null
			&& hasInteractiveAppPluginMap(this.mapSnapshot);
		const unavailableMapTitle = "Die laufende AppPlugin-Sitzung bietet keine belegte interaktive Kartenfläche an";
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
			button.disabled = !interactiveMapAvailable || action?.enabled !== true;
			if (!interactiveMapAvailable) button.title = unavailableMapTitle;
		});
		document.querySelectorAll<HTMLButtonElement>("button[data-tool]").forEach(button => {
			const actionId = semanticActionForTool(button.dataset.tool as MapTool);
			const action = actionId && this.mapSnapshot
				? this.mapSnapshot.semanticActions.find(candidate => candidate.id === actionId)
				: undefined;
			button.disabled = !interactiveMapAvailable || action?.enabled !== true;
			if (!interactiveMapAvailable) button.title = unavailableMapTitle;
			else if (button.disabled) button.title = "Wird erst nach einem belegten AppPlugin-UI-Vertrag freigeschaltet";
			else button.title = "Löst die hostseitig aus dem AppPlugin-Baum abgeleitete Aktion aus";
		});
		const cleanStart = document.querySelector<HTMLButtonElement>('[data-intent="clean.start"]');
		if (cleanStart) {
			cleanStart.disabled = !interactiveMapAvailable || this.mapSnapshot?.semanticActions.some(action =>
				action.id === "clean.start" && action.enabled,
			) !== true;
			cleanStart.title = cleanStart.disabled
				? interactiveMapAvailable
					? "Das laufende AppPlugin bietet noch keine semantische Reinigungsaktion an"
					: unavailableMapTitle
				: "Löst die aus dem AppPlugin-Baum abgeleitete Reinigungsaktion aus; Befehlsparameter bleiben im Bundle";
		}
		document.querySelectorAll<HTMLButtonElement>("[data-semantic-action]").forEach(button => {
			const action = this.mapSnapshot?.semanticActions.find(candidate =>
				candidate.id === button.dataset.semanticAction,
			);
			button.disabled = action?.enabled !== true;
			button.title = button.disabled
				? "Das laufende AppPlugin bietet diese semantische Aktion noch nicht an"
				: "Löst die hostseitig aus dem AppPlugin-Baum abgeleitete Aktion aus";
		});
		const clearSelection = byId<HTMLButtonElement>("clearSelection");
		clearSelection.disabled = true;
		clearSelection.title = "Noch kein belegter semantischer AppPlugin-Vertrag";
		document.querySelectorAll<HTMLButtonElement>("[data-intent]:not([data-intent=\"clean.start\"])").forEach(button => {
			button.disabled = true;
			button.title = "Vorschau: semantischer AppPlugin-Vertrag noch offen";
		});
		document.querySelectorAll<HTMLInputElement>("[data-device-setting], [data-schedule]").forEach(input => {
			input.disabled = true;
			input.title = "Vorschau: semantischer AppPlugin-Vertrag noch offen";
		});
		document.querySelectorAll<HTMLButtonElement>("[data-history-id]").forEach(button => {
			button.disabled = true;
			button.title = "Vorschau: AppPlugin-Historienvertrag noch offen";
		});
		byId<HTMLElement>("mapInstruction").textContent = this.mapSnapshot
			? this.mapSnapshot.view === "full"
				? interactiveMapAvailable
					? "Hostdiagnose · AppPlugin-Menüs testen · DPS unten prüfen"
					: "Hostdiagnose · keine belegte interaktive Kartenfläche · DPS unten prüfen"
				: "Direkter AppPlugin-Kartenmodus · Räume anklicken, ziehen oder per Zwei-Finger-Geste zoomen"
			: "Direkte AppPlugin-Sitzung wird verbunden …";
		const zoomOut = document.getElementById("zoomOut") as HTMLButtonElement | null;
		const zoomIn = document.getElementById("zoomIn") as HTMLButtonElement | null;
		if (zoomOut) {
			zoomOut.disabled = !interactiveMapAvailable;
			zoomOut.title = interactiveMapAvailable ? "Verkleinern" : unavailableMapTitle;
		}
		if (zoomIn) {
			zoomIn.disabled = !interactiveMapAvailable;
			zoomIn.title = interactiveMapAvailable ? "Vergrößern" : unavailableMapTitle;
		}
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
	if (instruction) instruction.textContent = `AppPlugin-Hostdiagnose konnte nicht gestartet werden: ${message}`;
	throw error;
});
