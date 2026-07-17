#!/usr/bin/env node

const { spawn, spawnSync } = require("node:child_process");
const { createHash } = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const repositoryRoot = path.resolve(__dirname, "..");
const edgePath = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const targetUrl = process.argv[2] || "http://127.0.0.1:4173/";
const runtimeUrl = new URL(targetUrl).origin;
const debuggingPort = 20_000 + (process.pid % 30_000);

function delay(milliseconds) {
	return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function largestEmbeddedImageFingerprint(svg) {
	const payloads = [...svg.matchAll(/href="data:image\/[^;]+;base64,([^"]+)"/gu)]
		.map(match => match[1]);
	const largest = payloads.sort((left, right) => right.length - left.length)[0];
	return largest ? createHash("sha256").update(largest).digest("hex") : undefined;
}

function vectorPaintFingerprint(svg) {
	const paints = [...svg.matchAll(/<path\b[^>]*>/gu)]
		.flatMap(match => match[0].match(/\b(?:fill|stroke)="[^"]+"/gu) ?? []);
	return createHash("sha256").update(paints.join("|")).digest("hex");
}

async function waitForTarget() {
	for (let attempt = 0; attempt < 100; attempt++) {
		try {
			const targets = await fetch(`http://127.0.0.1:${debuggingPort}/json/list`).then(response => response.json());
			const target = targets.find(candidate => candidate.type === "page" && candidate.url.startsWith(targetUrl));
			if (target) return target;
		} catch {
			// Edge has not opened its DevTools endpoint yet.
		}
		await delay(100);
	}
	throw new Error("Edge DevTools target did not become ready");
}

async function main() {
	if (!fs.existsSync(edgePath)) throw new Error(`Edge executable missing: ${edgePath}`);
	const health = await fetch(`${runtimeUrl}/health`).then(response => {
		if (!response.ok) throw new Error(`AppPlugin runtime health failed: ${response.status}`);
		return response.json();
	});
	const initialState = await fetch(`${runtimeUrl}/state`).then(response => response.json());
	const initialFrame = await fetch(`${runtimeUrl}/frame.svg`).then(response => response.text());
	const browser = spawn(edgePath, [
		"--headless=new",
		"--disable-gpu",
		"--hide-scrollbars",
		"--window-size=1440,1000",
		`--remote-debugging-port=${debuggingPort}`,
		`--user-data-dir=C:/tmp/roborock-appplugin-desktop-smoke-${process.pid}`,
		targetUrl,
	], { stdio: "ignore", windowsHide: true });

	let socket;
	try {
		const target = await waitForTarget();
		socket = new WebSocket(target.webSocketDebuggerUrl);
		await new Promise((resolve, reject) => {
			socket.addEventListener("open", resolve, { once: true });
			socket.addEventListener("error", reject, { once: true });
		});

		let sequence = 0;
		const pending = new Map();
		const runtimeErrors = [];
		socket.addEventListener("message", event => {
			const message = JSON.parse(event.data);
			if (message.id && pending.has(message.id)) {
				const handler = pending.get(message.id);
				pending.delete(message.id);
				if (message.error) handler.reject(new Error(message.error.message));
				else handler.resolve(message.result);
			}
			if (message.method === "Runtime.exceptionThrown") {
				runtimeErrors.push(message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text);
			}
			if (message.method === "Log.entryAdded" && message.params.entry.level === "error") {
				runtimeErrors.push(message.params.entry.text);
			}
		});
		function send(method, params = {}) {
			return new Promise((resolve, reject) => {
				const id = ++sequence;
				pending.set(id, { resolve, reject });
				socket.send(JSON.stringify({ id, method, params }));
			});
		}
		async function evaluate(expression) {
			const result = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
			if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
			return result.result.value;
		}
		async function waitFor(expression, message) {
			let lastError;
			for (let attempt = 0; attempt < 300; attempt++) {
				try {
					if (await evaluate(expression)) return;
				} catch (error) {
					lastError = error;
				}
				await delay(100);
			}
			throw new Error(`${message}${lastError ? `: ${lastError.message}` : ""}`);
		}
		async function mouseClick(point) {
			await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: point.x, y: point.y });
			await send("Input.dispatchMouseEvent", { type: "mousePressed", x: point.x, y: point.y, button: "left", clickCount: 1 });
			await delay(80);
			await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: point.x, y: point.y, button: "left", clickCount: 1 });
		}

		await send("Runtime.enable");
		await send("Log.enable");
		await send("Page.enable");
		try {
			await waitFor(
				`document.readyState === "complete" && document.querySelector("#desktopMap")?.dataset.renderMode === "unchanged-appplugin-session" && document.querySelector("#desktopMapFrame")?.complete && document.querySelector("#desktopMapFrame")?.naturalWidth > 0`,
				"Live AppPlugin map did not initialize",
			);
		} catch (error) {
			const diagnostics = await evaluate(`(() => ({
				readyState: document.readyState,
				renderMode: document.querySelector("#desktopMap")?.dataset.renderMode,
				frameSource: document.querySelector("#desktopMapFrame")?.src,
				frameComplete: document.querySelector("#desktopMapFrame")?.complete,
				frameNaturalWidth: document.querySelector("#desktopMapFrame")?.naturalWidth,
			}))()`);
			throw new Error(`${error.message}: ${JSON.stringify({ diagnostics, runtimeErrors })}`);
		}
		const initial = await evaluate(`(() => ({
			title: document.title,
			renderMode: document.querySelector("#desktopMap").dataset.renderMode,
			bundleKind: document.querySelector("#desktopMap").dataset.bundleKind,
			productFallbackAllowed: document.querySelector("#desktopMap").dataset.productFallbackAllowed,
			frameSource: document.querySelector("#desktopMapFrame").src,
			disabledHostTools: document.querySelectorAll("[data-tool]:disabled").length,
			activeNavigation: document.querySelector("[data-navigation].active")?.dataset.navigation,
			language: document.querySelector(".language-control")?.textContent?.trim(),
			summary: document.querySelector("#selectionSummary")?.textContent,
			logEntries: document.querySelectorAll(".log-entry").length,
		}))()`);
		const selectionWasPristine = !initialState.rawText.some(text => text.includes("ausgewählt"));
		let selectionVerified = false;
		if (selectionWasPristine) {
			await evaluate(`document.querySelector('[data-surface-view="full"]').click()`);
			await waitFor(
				`document.querySelector("#desktopMapFrame")?.src.includes("view=full") && document.querySelector("#desktopMapFrame")?.complete && document.querySelector("#desktopMapFrame")?.naturalWidth > 0`,
				"Desktop did not switch to the original AppPlugin view",
			);
			const modeStartRevision = (await fetch(`${runtimeUrl}/state`).then(response => response.json())).revision;
			const roomsModePoint = await evaluate(`(async () => {
				const health = await fetch("${runtimeUrl}/health?view=full", { cache: "no-store" }).then(response => response.json());
				const rect = document.querySelector("#desktopMap").getBoundingClientRect();
				const viewport = { x: 0, y: 0, width: health.surface.width, height: health.surface.height };
				const scale = Math.min(rect.width / viewport.width, rect.height / viewport.height);
				const left = rect.left + (rect.width - viewport.width * scale) / 2;
				const top = rect.top + (rect.height - viewport.height * scale) / 2;
				return { x: left + 160 * scale, y: top + 645 * scale };
			})()`);
			await mouseClick(roomsModePoint);
			await waitFor(
				`fetch("${runtimeUrl}/state", { cache: "no-store" }).then(response => response.json()).then(state => state.revision > ${modeStartRevision})`,
				"The unchanged AppPlugin did not enter room mode",
			);
			await evaluate(`document.querySelector('[data-surface-view="map"]').click()`);
			await waitFor(
				`document.querySelector("#desktopMapFrame")?.src.includes("view=map") && document.querySelector("#desktopMapFrame")?.complete && document.querySelector("#desktopMapFrame")?.naturalWidth > 0`,
				"Desktop did not return to the AppPlugin map view",
			);
			const roomPoint = await evaluate(`(async () => {
				const health = await fetch("${runtimeUrl}/health", { cache: "no-store" }).then(response => response.json());
				const rect = document.querySelector("#desktopMap").getBoundingClientRect();
				const viewport = health.viewport;
				const scale = Math.min(rect.width / viewport.width, rect.height / viewport.height);
				const left = rect.left + (rect.width - viewport.width * scale) / 2;
				const top = rect.top + (rect.height - viewport.height * scale) / 2;
				return { x: left + (242 - viewport.x) * scale, y: top + (309 - viewport.y) * scale };
			})()`);
			await mouseClick(roomPoint);
			await waitFor(
				`fetch("${runtimeUrl}/state", { cache: "no-store" }).then(response => response.json()).then(state => state.revision > ${initialState.revision} && state.rawText.includes("1 Raum/Räume ausgewählt"))`,
				"The unchanged AppPlugin did not select room 1",
			);
			selectionVerified = true;
		}
		const selectedState = await fetch(`${runtimeUrl}/state`).then(response => response.json());
		const selectedFrame = await fetch(`${runtimeUrl}/frame.svg?revision=${selectedState.revision}`).then(response => response.text());
		const selected = await evaluate(`(() => ({
			summary: document.querySelector("#selectionSummary")?.textContent,
			zoom: document.querySelector("#zoomValue")?.textContent,
			logEntries: document.querySelectorAll(".log-entry").length,
			frameSource: document.querySelector("#desktopMapFrame").src,
		}))()`);
		const zoomStartRevision = selectedState.revision;
		await evaluate(`document.querySelector("#zoomIn").click()`);
		await waitFor(
			`fetch("${runtimeUrl}/state", { cache: "no-store" }).then(response => response.json()).then(state => state.revision > ${zoomStartRevision})`,
			"Desktop zoom control did not send the complete APK pinch sequence",
		);
		const zoomedState = await fetch(`${runtimeUrl}/state`).then(response => response.json());
		const zoomedFrame = await fetch(`${runtimeUrl}/frame.svg?revision=${zoomedState.revision}`).then(response => response.text());

		await evaluate(`document.querySelector('[data-navigation="overview"]').click()`);
		const overviewVisible = await evaluate(`!document.querySelector('[data-context-page="overview"]').hidden`);
		await evaluate(`document.querySelector('[data-navigation="map"]').click()`);

		const screenshot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
		fs.mkdirSync(path.join(repositoryRoot, "artifacts"), { recursive: true });
		fs.writeFileSync(path.join(repositoryRoot, "artifacts", "appplugin-desktop-live-smoke.png"), Buffer.from(screenshot.data, "base64"));

		const report = {
			health,
			initial,
			selected: {
				...selected,
				revision: selectedState.revision,
				appPluginSelectionText: selectedState.rawText.find(text => text.includes("ausgewählt")),
				verifiedThisRun: selectionVerified,
				frameChanged: selectionVerified ? initialFrame !== selectedFrame : undefined,
				largestEmbeddedImageChanged: selectionVerified
					? largestEmbeddedImageFingerprint(initialFrame) !== largestEmbeddedImageFingerprint(selectedFrame)
					: undefined,
				vectorPaintChanged: selectionVerified
					? vectorPaintFingerprint(initialFrame) !== vectorPaintFingerprint(selectedFrame)
					: undefined,
			},
			zoom: {
				revisionBefore: zoomStartRevision,
				revisionAfter: zoomedState.revision,
				frameChanged: selectedFrame !== zoomedFrame,
			},
			overviewVisible,
			runtimeErrors,
		};
		console.log(JSON.stringify(report, null, 2));

		if (initial.renderMode !== "unchanged-appplugin-session" || initial.productFallbackAllowed !== "false") {
			throw new Error("Desktop map is not bound to the unchanged AppPlugin session");
		}
		if (initial.bundleKind !== "hermes-bytecode" || initial.disabledHostTools < 6) {
			throw new Error("AppPlugin provenance or fail-closed tool boundary is missing");
		}
		if (selectionVerified && (
			initialFrame === selectedFrame
			|| vectorPaintFingerprint(initialFrame) === vectorPaintFingerprint(selectedFrame)
			|| !selectedState.rawText.includes("1 Raum/Räume ausgewählt")
		)) {
			throw new Error("AppPlugin-owned room selection did not rerender the native frame");
		}
		if (selectedFrame === zoomedFrame) throw new Error("AppPlugin-owned pinch did not rerender the native frame");
		if (!overviewVisible) throw new Error("Desktop navigation did not switch context");
		if (runtimeErrors.length) throw new Error(`Browser runtime errors: ${runtimeErrors.join(" | ")}`);
	} finally {
		if (socket?.readyState === WebSocket.OPEN) socket.close();
		if (process.platform === "win32") {
			spawnSync("taskkill", ["/PID", String(browser.pid), "/T", "/F"], { stdio: "ignore", windowsHide: true });
		} else {
			browser.kill();
		}
	}
}

main().catch(error => {
	console.error(error);
	process.exitCode = 1;
});
