import { Connection } from "./conn.js";
import * as d3 from "d3";
import { go_to_pin_image } from "./images.js";
import { localCoordsToRobotCoords, robotCoordsToLocalCoords } from "./coords.js";
// --- Global Application State ---
let connection;
let instanceId;
let currentRobotDuid = null;
// CORRECTED: Used ioBroker.State instead of any
let onStateChange = null;
let currentMapSubscriptions = [];
// --- Map State ---
let map;
let left, topMap, mapMinX, mapMinY, mapSizeX, mapSizeY, mapMaxY;
let scaleFactor = null; // Perfekt so (null, damit wir wissen, dass er noch nicht geladen ist)
let goToTarget = false;
let zoomLevel = 0.55;
// --- D3 & SVG State ---
const image = new Image(); // Global image object for performance
let initialTransform;
let svg;
let svgContainer;
let mainGroup;
let mapImageElement;
let zoneGroup;
let obstacleGroup;
let pinGroup;
let zoom;
let wheelZoom = 1;
const minZoom = 0.1;
const maxZoom = 10;
// --- UI State ---
let popupTimeout;
let popupX, popupY;
let selectedObstacleID;
let rects = []; // Data array for zones
let zones = []; // Formatted zones for the robot
let selectedRect = null;
let rectCounter = 0; // To create unique zone IDs
let popup;
let popupImage;
let triangle;
let largePhoto;
let largePhotoImage;
// =================================================================================
// --- Application Functions (Defined globally) ---
// =================================================================================
/**
 * Fetches the list of robots from the ioBroker object database.
 * This works even if the adapter is not running.
 */
function fetchRobotList() {
	console.log("Fetching robot list via getObjectView...");
	const startKey = `${instanceId}.Devices.`;
	const endKey = `${instanceId}.Devices.\u9999`; // \u9999 ist ein Marker für "alles danach"
	connection
		.getObjectView("system", "device", { startkey: startKey, endkey: endKey })
		.then((res) => {
			const robots = [];
			if (res && res.rows) {
				console.log(`getObjectView found ${res.rows.length} devices.`);
				res.rows.forEach((row) => {
					// Die ID ist z.B. "roborock.0.Devices.12345"
					// Wir brauchen den letzten Teil als duid
					const idParts = row.id.split(".");
					const duid = idParts[idParts.length - 1];
					// Der Name ist in common.name
					const name = row.value && row.value.common && row.value.common.name ? row.value.common.name : duid; // Fallback, falls kein Name gesetzt ist
					if (duid) {
						robots.push({ duid: duid, name: name });
					}
				});
			}
			popup = document.getElementById("popup");
			popupImage = document.getElementById("popup-image");
			triangle = document.getElementById("triangle");
			largePhoto = document.getElementById("largePhoto");
			largePhotoImage = document.getElementById("largePhoto-image");
			const robotSelect = document.getElementById("robotSelect");
			if (robots.length === 0) {
				console.warn("Did not find any devices via getObjectView. Using fallback.");
				// Fallback (z.B. wenn keine Geräte da sind)
				const instanceDuid = getQueryParam("instance");
				if (instanceDuid) {
					robotSelect.innerHTML = ""; // Dropdown leeren
					const option = document.createElement("option");
					option.value = instanceDuid;
					// Der 'instance'-Parameter ist nicht die DUID, aber wir nutzen ihn als Notlösung
					option.text = `Roborock (Instance ${instanceDuid})`;
					robotSelect.appendChild(option);
					currentRobotDuid = instanceDuid;
					setupSocketListeners(instanceDuid);
				}
				else {
					console.error("No robots found and no instance ID available.");
				}
				return;
			}
			// Standardlogik: Wir haben eine Roboterliste
			console.log("Received robot list from objects:", robots);
			robotSelect.innerHTML = ""; // Dropdown leeren
			robots.forEach((robot) => {
				const option = document.createElement("option");
				option.value = robot.duid;
				option.text = robot.name;
				robotSelect.appendChild(option);
			});
			// Ersten Roboter standardmäßig auswählen
			if (robots.length > 0) {
				const duid = robots[0].duid;
				currentRobotDuid = duid;
				robotSelect.value = duid;
				setupSocketListeners(duid); // Listener für den ersten Roboter starten
			}
		})
		.catch((err) => {
			console.error("Error fetching robot list via getObjectView, using fallback:", err);
			// Fallback für einen Fehler (z.B. getObjectView nicht in conn.js hinzugefügt)
			const robotSelect = document.getElementById("robotSelect");
			const instanceDuid = getQueryParam("instance");
			if (instanceDuid) {
				robotSelect.innerHTML = "";
				const option = document.createElement("option");
				option.value = instanceDuid;
				option.text = `Roborock (Instance ${instanceDuid})`;
				robotSelect.appendChild(option);
				currentRobotDuid = instanceDuid;
				setupSocketListeners(instanceDuid);
			}
		});
}
function getMapParams() {
	if (!image.width || !image.height || left === undefined || topMap === undefined || scaleFactor === null || mapMaxY === undefined) {
		console.error("getMapParams called before all map data was loaded.");
		return null;
	}
	return {
		scaleFactor: scaleFactor,
		left: left,
		topMap: topMap,
		mapMaxY: mapMaxY,
		imageHeight: image.height,
	};
}
/**
 * Unsubscribes from old map states and subscribes to the new robot's map states.
 * Fetches the initial map data to draw it.
 * @param duid The DUID of the newly selected robot.
 */
function setupSocketListeners(duid) {
	// 1. ALTE STATES KÜNDIGEN (WICHTIG!)
	if (onStateChange && currentMapSubscriptions.length > 0) {
		const handlerToUnsubscribe = onStateChange; // (brauchen wir nicht, aber egal)
		currentMapSubscriptions.forEach((id) => {
			// Dieser Aufruf ist jetzt entscheidend:
			connection.unsubscribeState(id);
		});
		currentMapSubscriptions = [];
	}
	// 2. Clear old map data from UI
	map = undefined;
	mapImageElement.attr("href", null);
	obstacleGroup.selectAll("*").remove();
	pinGroup.selectAll("*").remove();
	rects = [];
	drawZones(); // Re-draw (which will clear zones)
	document.getElementById("deleteButton").disabled = true;
	document.getElementById("addButton").disabled = false;
	// 3. Define new state IDs (Case-sensitive!)
	const mapBase64StateId = `${instanceId}.Devices.${duid}.map.mapBase64`;
	const mapDataStateId = `${instanceId}.Devices.${duid}.map.mapData`;
	// Wir speichern die neuen IDs, damit wir sie beim nächsten Wechsel kündigen können
	currentMapSubscriptions = [mapBase64StateId, mapDataStateId];
	// 4. Create the new state change handler
	onStateChange = (id, state) => {
		if (!state || !state.val) {
			// Handle null/empty states (e.g., map deleted)
			if (id === mapBase64StateId) {
				mapImageElement.attr("href", null);
			}
			if (id === mapDataStateId) {
				map = undefined;
				obstacleGroup.selectAll("*").remove();
			}
			return;
		}
		switch (id) {
			case mapBase64StateId:
				console.log(`Received new map Base64 for ${duid}`);
				drawBackgroundImage(state.val);
				break;
			case mapDataStateId:
				try {
					// Map data is often stored as a JSON string
					map = typeof state.val === "string" ? JSON.parse(state.val) : state.val;
					if (map && map.IMAGE) {
						left = map.IMAGE.position.left;
						topMap = map.IMAGE.position.top;
						console.log(`Received new map Data for ${duid}:`, map);
						// We must have the base64 image *before* we can calculate boundaries
						// drawBackgroundImage will be called by mapBase64StateId's handler
					}
					else {
						console.warn("Received invalid map data structure:", map);
					}
				}
				catch (e) {
					console.error("Failed to parse map data JSON:", state.val, e);
					map = undefined;
				}
				break;
		}
	};
	// 5. Subscribe to new states
	connection.subscribeState(mapBase64StateId);
	connection.subscribeState(mapDataStateId);
	// 6. Fetch initial values for immediate draw
	// CORRECTED: Used specific type for states
	connection.getStates([mapBase64StateId, mapDataStateId]).then((states) => {
		console.log(`Fetched initial states for ${duid}:`, states);
		if (!onStateChange)
			return; // Handler might have been cleared by another quick change
		// Manually trigger the handler to process initial data
		onStateChange(mapDataStateId, states[mapDataStateId]);
		onStateChange(mapBase64StateId, states[mapBase64StateId]);
	});
}
/**
 * Converts screen-space coordinates (e.g., mouse click) to world-space (map pixel) coordinates.
 * @param x The screen X coordinate.
 * @param y The screen Y coordinate.
 */
function screenToWorldCoords(x, y) {
	if (mapMinX === undefined || mapMinY === undefined)
		return { x: 0, y: 0 };
	const transform = d3.zoomTransform(svgContainer.node());
	const inverted = transform.invert([x, y]);
	// Convert D3's inverted coordinates to our map's world system
	return { x: inverted[0] + mapMinX, y: inverted[1] + mapMinY };
}
/**
 * Converts world-space (map pixel) coordinates back to SVG-space (for D3 positioning).
 * @param x The world X coordinate.
 * @param y The world Y coordinate.
 */
function worldToSvgCoords(x, y) {
	if (mapMinX === undefined || mapMinY === undefined)
		return { x: 0, y: 0 };
	return { x: x - mapMinX, y: y - mapMinY };
}
/**
 * Draws the map image onto the SVG.
 * Calculates map boundaries and applies the initial zoom.
 * @param mapBase64 The base64 string of the map image.
 */
function drawBackgroundImage(mapBase64) {
	if (!mapBase64) {
		mapImageElement.attr("href", null);
		return;
	}
	image.src = mapBase64;
	image.onload = () => {
		// Use a temporary canvas to find the map boundaries
		const tempCanvas = document.createElement("canvas");
		const tempCtx = tempCanvas.getContext("2d", { willReadFrequently: true });
		if (!tempCtx)
			return;
		let mapMaxX = 0;
		mapMaxY = 0;
		mapMinX = image.width;
		mapMinY = image.height;
		tempCanvas.width = image.width;
		tempCanvas.height = image.height;
		tempCtx.drawImage(image, 0, 0);
		const imageData = tempCtx.getImageData(0, 0, image.width, image.height);
		const pixels = imageData.data;
		for (let i = 0; i < pixels.length; i += 4) {
			const alpha = pixels[i + 3];
			if (alpha > 0) {
				// Find non-transparent pixels
				const x = (i / 4) % image.width;
				const y = Math.floor(i / 4 / image.width);
				mapMinX = Math.min(mapMinX, x);
				mapMinY = Math.min(mapMinY, y);
				mapMaxX = Math.max(mapMaxX, x);
				mapMaxY = Math.max(mapMaxY, y);
			}
		}
		mapMinX--;
		mapMinY--;
		mapMaxX++;
		mapMaxY++;
		mapSizeX = mapMaxX - mapMinX;
		mapSizeY = mapMaxY - mapMinY;
		// Update the D3 <image> element
		mapImageElement
			.attr("href", mapBase64)
			.attr("x", 0)
			.attr("y", 0)
			.attr("width", image.width)
			.attr("height", image.height)
			.attr("transform", `translate(${-mapMinX}, ${-mapMinY})`);
		// Calculate initial zoom to fit the map
		const svgWidth = parseFloat(svg.attr("width"));
		const svgHeight = parseFloat(svg.attr("height"));
		const aspectRatio = svgWidth / svgHeight;
		const contentAspectRatio = mapSizeX / mapSizeY;
		if (contentAspectRatio > aspectRatio) {
			zoomLevel = roundTwoDecimals((svgWidth * 100) / mapSizeX) / 100;
		}
		else {
			zoomLevel = roundTwoDecimals((svgHeight * 100) / mapSizeY) / 100;
		}
		// Apply the initial centered zoom
		initialTransform = d3.zoomIdentity.translate((svgWidth - mapSizeX * zoomLevel) / 2, (svgHeight - mapSizeY * zoomLevel) / 2).scale(zoomLevel);
		svgContainer.call(zoom.transform, initialTransform);
		drawObstacles();
	};
	image.onerror = () => {
		console.error("Failed to load map image from base64 string.");
	};
}
/**
 * Draws obstacle markers on the map using D3 data binding.
 */
// [CODEBLOCK] Gesamte drawObstacles-Funktion in map.ts ersetzen
function drawObstacles() {
	const params = getMapParams();
	if (!params) {
		console.error("Cannot update obstacles, map params not ready.");
		return;
	}
	if (!map || !map.OBSTACLES2) {
		obstacleGroup.selectAll("circle.obstacle-marker").remove(); // Clear old ones
		return;
	}
	const markers = obstacleGroup.selectAll("circle.obstacle-marker").data(map.OBSTACLES2);
	// EXIT (remove old markers)
	markers.exit().remove();
	// ENTER (add new markers)
	markers
		.enter()
		.append("circle")
		.attr("class", "obstacle-marker")
		.attr("r", (1 * params.scaleFactor) / wheelZoom)
		.on("click", (event, d) => {
			// HINWEIS: Wir verwenden NICHT getMapParams() oder robotCoordsToLocalCoords()
			// da die Obstacle-Daten ein anderes System verwenden.
			if (!currentRobotDuid) {
				console.warn("Obstacle clicked but no robot selected");
				return;
			}
			event.stopPropagation(); // Prevents map panning
			selectedObstacleID = d[6];
			const robotPoint = { x: d[0], y: d[1] };
			const worldPoint = robotCoordsToLocalCoords(robotPoint, params);
			popupX = worldPoint.x;
			popupY = worldPoint.y;
			if (popupTimeout)
				clearTimeout(popupTimeout);
			const command = "get_obstacle_image";
			const parameters = { obstacleId: selectedObstacleID, duid: currentRobotDuid };
			connection
				.sendTo(instanceId, command, parameters)
				.then((response) => {
					if (response && response.image) {
						let imageData = response.image;
						console.log("Empfangene Bild-Daten (komplett):");
						console.log(imageData);
						if (typeof imageData === "string" && !imageData.startsWith("data:image/")) {
							console.log("Data-URL-Prefix fehlt, füge ihn hinzu...");
							imageData = "data:image/png;base64," + imageData;
						}
						// Jetzt die korrekte URL zuweisen
						popupImage.src = imageData;
						largePhotoImage.src = imageData;
						popup.style.display = "block";
						triangle.style.display = "block";
						updatePopupPosition();
						popupTimeout = window.setTimeout(() => {
							popup.style.display = "none";
							triangle.style.display = "none";
							popupTimeout = null;
						}, 3000);
					}
					else {
						console.warn("Got no image for obstacle", selectedObstacleID, response);
					}
				})
				.catch((err) => console.error("Error getting obstacle image:", err));
			updatePopupPosition();
		})
		.merge(markers)
		.attr("cx", (d) => {
			if (!params)
				return 0; // Zu früh aufgerufen
			const robotPoint = { x: d[0], y: d[1] };
			const worldPoint = robotCoordsToLocalCoords(robotPoint, params);
			return worldPoint.x - mapMinX;
		})
		.attr("cy", (d) => {
			if (!params)
				return 0; // Zu früh aufgerufen
			const robotPoint = { x: d[0], y: d[1] };
			const worldPoint = robotCoordsToLocalCoords(robotPoint, params);
			return worldPoint.y - mapMinY;
		});
}
/**
 * Draws interactive cleaning zones using D3 data binding.
 */
function drawZones() {
	const deleteButton = document.getElementById("deleteButton");
	// --- Drag Handler for moving the zone ---
	const dragHandler = d3
		.drag()
		.on("start", function (event, d) {
			d3.select(this).raise().style("cursor", "grabbing");
			selectedRect = d;
			deleteButton.disabled = false;
		})
		.on("drag", function (event, d) {
			if (!image.width)
				return; // Prevent dragging before map loaded
			// Map boundaries
			const minBoundX = mapMinX;
			const minBoundY = mapMinY;
			const maxBoundX = mapMinX + mapSizeX;
			const maxBoundY = mapMinY + mapSizeY;
			// Apply delta to data
			let newX = d.x + event.dx;
			let newY = d.y + event.dy;
			// Clamp position (top-left corner)
			newX = Math.max(minBoundX, newX);
			newY = Math.max(minBoundY, newY);
			// Clamp position (bottom-right corner)
			if (newX + d.width > maxBoundX) {
				newX = maxBoundX - d.width;
			}
			if (newY + d.height > maxBoundY) {
				newY = maxBoundY - d.height;
			}
			// Apply clamped position to data
			d.x = newX;
			d.y = newY;
			// Move the <g> element
			d3.select(this).attr("transform", `translate(${d.x - mapMinX}, ${d.y - mapMinY})`);
		})
		.on("end", function (event, d) {
			d3.select(this).style("cursor", "move");
			updateRobotZones();
		});
	// --- Drag Handler for resizing the zone ---
	const resizeHandler = d3
		.drag()
		.on("start", function (event, d) {
			event.sourceEvent.stopPropagation(); // Stop parent drag handler
			d3.select(this).raise();
		})
		.on("drag", function (event, d) {
			if (!image.width)
				return;
			const maxBoundX = mapMinX + mapSizeX;
			const maxBoundY = mapMinY + mapSizeY;
			// Update data dimensions
			let newWidth = d.width + event.dx;
			let newHeight = d.height + event.dy;
			// Clamp minimum size
			newWidth = Math.max(newWidth, 20);
			newHeight = Math.max(newHeight, 20);
			// Clamp maximum size (map edge)
			if (d.x + newWidth > maxBoundX) {
				newWidth = maxBoundX - d.x;
			}
			if (d.y + newHeight > maxBoundY) {
				newHeight = maxBoundY - d.y;
			}
			d.width = newWidth;
			d.height = newHeight;
			// Update the visual <rect> and <circle>
			const parentGroup = d3.select(this.parentNode);
			parentGroup.select("rect").attr("width", d.width).attr("height", d.height);
			parentGroup.select("circle.zone-handle").attr("cx", d.width).attr("cy", d.height);
		})
		.on("end", function (event, d) {
			updateRobotZones(); // Update coordinates for robot
		});
	// --- D3 Enter/Update/Exit Pattern ---
	// 1. Bind data
	const selection = zoneGroup.selectAll("g.zone").data(rects, (d) => d.id);
	// 2. EXIT (Remove elements no longer in data)
	selection.exit().remove();
	// 3. ENTER (Create new elements)
	const enterGroup = selection
		.enter()
		.append("g")
		.attr("class", "zone")
		.call(dragHandler); // Attach drag handler to the group
	// Add the rectangle
	enterGroup
		.append("rect")
		.attr("class", "zone-rect")
		.attr("x", 0)
		.attr("y", 0)
		.style("stroke-width", 1.5 / wheelZoom); // Set initial scaled stroke
	// Add the resize handle
	const baseRadius = 5;
	enterGroup
		.append("circle")
		.attr("class", "zone-handle")
		.attr("r", baseRadius / wheelZoom) // Set initial scaled radius
		.call(resizeHandler); // Attach resize handler
	// 4. UPDATE (Apply attributes to all elements, new and old)
	const mergedSelection = selection.merge(enterGroup);
	mergedSelection.attr("transform", (d) => `translate(${d.x - mapMinX}, ${d.y - mapMinY})`); // Position the group
	mergedSelection
		.select("rect") // Update rect size
		.attr("width", (d) => d.width)
		.attr("height", (d) => d.height)
		.style("stroke-width", 1.5 / wheelZoom); // Update stroke on zoom/drag
	mergedSelection
		.select("circle.zone-handle") // Update handle position and size
		.attr("cx", (d) => d.width)
		.attr("cy", (d) => d.height)
		.attr("r", baseRadius / wheelZoom);
}
/**
 * Converts the visual D3 `rects` data into the robot-specific coordinate array.
 */
function updateRobotZones() {
	const params = getMapParams();
	if (!params) {
		console.error("Cannot update robot zones, map params not ready.");
		return;
	}
	const cleanCountInput = document.getElementById("cleanCount");
	zones = [];
	const cleanCount = parseInt(cleanCountInput.value) || 1;
	for (const rect of rects) {
		const p1 = { x: rect.x, y: rect.y };
		const p2 = { x: rect.x + rect.width, y: rect.y + rect.height };
		const coords1 = localCoordsToRobotCoords(p1, params);
		const coords2 = localCoordsToRobotCoords(p2, params);
		const zone = [Math.min(coords1.x, coords2.x), Math.min(coords1.y, coords2.y), Math.max(coords1.x, coords2.x), Math.max(coords1.y, coords2.y), cleanCount];
		zones.push(zone);
	}
	console.log("Zones (for robot) updated: " + JSON.stringify(zones));
}
/**
 * Repositions the HTML obstacle popup based on map pan/zoom.
 */
function updatePopupPosition() {
	if (popup.style.display === "block" && popupX !== undefined && popupY !== undefined) {
		// Convert the stored world coordinates to screen coordinates
		const transform = d3.zoomTransform(svgContainer.node());
		const svgCoords = worldToSvgCoords(popupX, popupY);
		const screenCoords = transform.apply([svgCoords.x, svgCoords.y]);
		// Position the HTML popup
		popup.style.left = `${screenCoords[0]}px`;
		popup.style.top = `${screenCoords[1]}px`;
	}
}
/**
 * Rounds a number to two decimal places.
 */
function roundTwoDecimals(number) {
	return Math.round(number * 100) / 100;
}
/**
 * Gets a URL query parameter by name.
 * @param param The name of the parameter (e.g., "instance").
 */
function getQueryParam(param) {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get(param);
}
// =================================================================================
// --- Application Entry Point ---
// =================================================================================
window.onload = async () => {
	// --- 1. Get DOM Elements ---
	const popup = document.getElementById("popup");
	const popupImage = document.getElementById("popup-image");
	const triangle = document.getElementById("triangle");
	const largePhoto = document.getElementById("largePhoto");
	const largePhotoImage = document.getElementById("largePhoto-image");
	const robotSelect = document.getElementById("robotSelect");
	const deleteButton = document.getElementById("deleteButton");
	const addButton = document.getElementById("addButton");
	const startButton = document.getElementById("startButton");
	const pauseButton = document.getElementById("pauseButton");
	const stopButton = document.getElementById("stopButton");
	const dockButton = document.getElementById("dockButton");
	const goToButton = document.getElementById("goToButton");
	const resetZoomButton = document.getElementById("resetZoomButton");
	console.log("--- DEBUG START ---");
	console.log(`Page loaded from: ${window.location.protocol}//${window.location.hostname}:${window.location.port}`);
	// --- 2. Initialize Instance & Connection ---
	const instance = getQueryParam("instance");
	if (instance === null) {
		document.body.innerHTML = "<h1>Error: No instance specified in URL.</h1>";
		console.error("No instance found in URL (?instance=...)");
		return;
	}
	instanceId = `roborock.${instance}`;
	console.log(`Initializing instance: ${instanceId}`);
	// Create the connection object (now an instance of the class)
	// connection = new Connection({ port: 8084});
	connection = new Connection();
	// 2. Die Callbacks definieren
	const connCallbacks = {
		onConnChange: async (isConnected) => {
			// 'async' ist wichtig
			console.log("Connection state changed: " + isConnected);
			if (isConnected) {
				try {
					// 1. Lade die Adapter-Konfiguration
					const configObjectId = `system.adapter.${instanceId}`;
					console.log(`Fetching config object: ${configObjectId}`);
					const configObj = await connection.getObject(configObjectId);
					// KORREKTUR: Wir verwenden deinen Schlüssel 'map_scale'
					if (configObj && configObj.native && configObj.native.map_scale !== undefined) {
						scaleFactor = parseFloat(configObj.native.map_scale);
						console.log(`Successfully fetched map_scale from config: ${scaleFactor}`);
						// Sicherheitsprüfung, falls der Wert ungültig ist
						if (isNaN(scaleFactor) || scaleFactor === 0) {
							console.warn(`map_scale is invalid ('${configObj.native.map_scale}'). Using fallback 8.`);
							scaleFactor = 8; // Dein Fallback-Wert
						}
					}
					else {
						// Fallback, falls das Feld 'map_scale' fehlt
						console.warn(`Could not find 'native.map_scale' in config. Using fallback value 8.`);
						scaleFactor = 8;
					}
				}
				catch (err) {
					console.error("Error fetching adapter config:", err);
					console.warn("Using fallback mapScale value 8.");
					scaleFactor = 8; // Fallback bei Fehler
				}
				// 2. Jetzt, da wir den scaleFactor haben, lade die Roboterliste
				fetchRobotList();
			}
		},
		onUpdate: (id, state) => {
			if (onStateChange) {
				onStateChange(id, state);
			}
		},
		onError: (err) => {
			console.error("Connection error:", err);
		},
	};
	// 3. Die Verbindung initialisieren
	const socketUrl = `${window.location.protocol}//${window.location.hostname}:8082`; // Dein Port
	console.log(`Forcing socket.io connection to: ${socketUrl}`);
	connection.init({ name: instanceId, connLink: socketUrl }, connCallbacks, true // objectsRequired
	);
	// --- 3. D3 & SVG Setup ---
	svgContainer = d3.select("#mapSvgContainer");
	svg = d3.select("#mapSvg");
	// Create layer groups in order
	mainGroup = svg.append("g").attr("class", "main-group");
	mapImageElement = mainGroup.append("image").attr("class", "map-image");
	obstacleGroup = mainGroup.append("g").attr("class", "obstacles");
	zoneGroup = mainGroup.append("g").attr("class", "zones");
	pinGroup = mainGroup.append("g").attr("class", "pins");
	// --- 4. D3 Zoom Setup ---
	zoom = d3
		.zoom() // <-- Sag D3, dass es auf einem DIV arbeitet
		.scaleExtent([minZoom, maxZoom]) // CORRECTED: Use defined consts
	// CORRECTED: Used specific event type
		.on("zoom", (event) => {
			const transform = event.transform;
			mainGroup.attr("transform", transform);
			// Store global transform values
			// panOffsetX = transform.x; // Not used, can be removed if not needed elsewhere
			// panOffsetY = transform.y; // Not used
			wheelZoom = transform.k; // 'k' is the zoom factor
			// Dynamically scale strokes and handles
			const baseStrokeWidth = 1.5;
			zoneGroup.selectAll("rect.zone-rect").style("stroke-width", baseStrokeWidth / wheelZoom);
			const baseRadius = 5;
			zoneGroup.selectAll("circle.zone-handle").attr("r", baseRadius / wheelZoom);
			const obstacleBaseRadius = 1 * (scaleFactor || 8);
			obstacleGroup.selectAll("circle.obstacle-marker").attr("r", obstacleBaseRadius / wheelZoom);
			updatePopupPosition();
		});
	svgContainer.call(zoom);
	// --- 5. Bind All Event Listeners ---
	// Robot selection
	robotSelect.addEventListener("change", () => {
		const newDuid = robotSelect.value;
		if (newDuid && newDuid !== currentRobotDuid) {
			console.log(`Robot selection changed to: ${newDuid}`);
			currentRobotDuid = newDuid;
			setupSocketListeners(newDuid); // Switch map data to new robot
		}
	});
	// Zone buttons
	deleteButton.addEventListener("click", () => {
		if (rects.length > 0) {
			rects.pop(); // Remove last zone from data
			selectedRect = null;
			drawZones(); // Re-draw
			if (rects.length < 5)
				addButton.disabled = false;
			if (rects.length < 1)
				deleteButton.disabled = true;
		}
	});
	addButton.addEventListener("click", () => {
		if (goToTarget) {
			// If in GoTo mode, cancel it
			goToTarget = false;
			svg.style("cursor", "grab");
			svgContainer.on("mousemove.gototarget", null);
			svgContainer.on("click.gototarget", null);
			pinGroup.selectAll("image.goto-pin").remove();
			return;
		}
		// Add a new zone in the center of the current view
		const svgWidth = parseFloat(svg.attr("width"));
		const svgHeight = parseFloat(svg.attr("height"));
		const centerWorld = screenToWorldCoords(svgWidth / 2, svgHeight / 2);
		const params = getMapParams();
		if (!params) {
			console.error("Cannot add zone, map params not ready.");
			return;
		}
		const newRect = {
			id: rectCounter++,
			// Zentriere die Zone und skaliere sie mit dem scaleFactor
			x: centerWorld.x - 25 * params.scaleFactor,
			y: centerWorld.y - 25 * params.scaleFactor,
			width: 50 * params.scaleFactor,
			height: 50 * params.scaleFactor,
		};
		rects.push(newRect);
		drawZones(); // Re-draw
		if (rects.length > 0)
			deleteButton.disabled = false;
		if (rects.length > 4)
			addButton.disabled = true;
		updateRobotZones();
	});
	// Robot command buttons
	startButton.addEventListener("click", () => {
		if (!currentRobotDuid) {
			console.warn("Start clicked but no robot selected");
			return;
		}
		updateRobotZones(); // Finalize zone coordinates
		let command;
		let parameters;
		if (zones.length > 0) {
			command = "app_zoned_clean";
			parameters = { zones: zones, duid: currentRobotDuid };
		}
		else {
			command = "app_start";
			parameters = { duid: currentRobotDuid };
		}
		console.log(`Sending command "${command}" to ${instanceId}`, parameters);
		connection
			.sendTo(instanceId, command, parameters)
			.then((response) => console.log("Adapter response:", response))
			.catch((err) => console.error("Error sending command:", err));
		// Clear zones after starting
		rects = [];
		drawZones();
		deleteButton.disabled = true;
		addButton.disabled = false;
		startButton.style.display = "none";
		pauseButton.style.display = "inline-block";
	});
	pauseButton.addEventListener("click", () => {
		if (!currentRobotDuid)
			return;
		connection.sendTo(instanceId, "app_pause", { duid: currentRobotDuid }).catch((err) => console.error("Error sending command (pause):", err));
		startButton.style.display = "inline-block";
		pauseButton.style.display = "none";
	});
	stopButton.addEventListener("click", () => {
		if (!currentRobotDuid)
			return;
		connection.sendTo(instanceId, "app_stop", { duid: currentRobotDuid }).catch((err) => console.error("Error sending command (stop):", err));
		startButton.style.display = "inline-block";
		pauseButton.style.display = "none";
	});
	dockButton.addEventListener("click", () => {
		if (!currentRobotDuid)
			return;
		connection.sendTo(instanceId, "app_charge", { duid: currentRobotDuid }).catch((err) => console.error("Error sending command (dock):", err));
	});
	// GoTo button
	goToButton.addEventListener("click", () => {
		goToTarget = true;
		svg.style("cursor", "crosshair");
		// Add the pin image that follows the mouse
		const pin = pinGroup
			.append("image")
			.attr("class", "goto-pin")
			.attr("href", go_to_pin_image)
			.attr("width", 29)
			.attr("height", 24)
			.style("opacity", 0.7)
			.style("pointer-events", "none");
		// Mousemove listener to move the pin
		svgContainer.on("mousemove.gototarget", (event) => {
			const [mouseX, mouseY] = d3.pointer(event, mainGroup.node());
			pin.attr("x", mouseX - 29 / 2).attr("y", mouseY - 24);
		});
		// Click listener to send the command
		svgContainer.on("click.gototarget", (event) => {
			// CORRECTED: Stop other click listeners (like coordtest) from firing
			event.stopImmediatePropagation();
			const params = getMapParams();
			if (!currentRobotDuid) {
				console.warn("GoTo clicked but no robot selected");
			}
			else if (!params) {
				console.error("GoTo clicked, but map params not ready.");
			}
			else {
				const [mouseX, mouseY] = d3.pointer(event, mainGroup.node());
				const worldX = mouseX + mapMinX;
				const worldY = mouseY + mapMinY;
				const point = localCoordsToRobotCoords({ x: worldX, y: worldY }, params);
				console.log("GoTo Robot coords: " + JSON.stringify([point.x, point.y]));
				const parameters = { points: [point.x, point.y], duid: currentRobotDuid };
				connection.sendTo(instanceId, "app_goto_target", parameters).catch((err) => console.error("Error sending command (goto):", err));
				// Leave the pin at the clicked location
				pin.style("opacity", 1.0);
			}
			// Clean up GoTo mode
			goToTarget = false;
			svg.style("cursor", "grab");
			svgContainer.on("mousemove.gototarget", null);
			svgContainer.on("click.gototarget", null);
			// If we didn't send a command, remove the floating pin
			if (!currentRobotDuid) {
				pinGroup.selectAll("image.goto-pin").remove();
			}
		});
	});
	// Coordinate test listener (optional)
	svgContainer.on("click.coordtest", (event) => {
		if (goToTarget)
			return;
		try {
			const params = getMapParams();
			if (!params)
				return; // Daten noch nicht geladen
			const [svgX, svgY] = d3.pointer(event, mainGroup.node());
			const worldPoint_IN = { x: svgX + mapMinX, y: svgY + mapMinY };
			// NEUER AUFRUF
			const robotPoint_OUT = localCoordsToRobotCoords(worldPoint_IN, params);
			console.log(`--- Coord Test ---`);
			console.log(`World: x=${worldPoint_IN.x.toFixed(2)}, y=${worldPoint_IN.y.toFixed(2)}`);
			console.log(`Robot: x=${robotPoint_OUT.x}, y=${robotPoint_OUT.y}`);
		}
		catch (error) {
			console.error("Fehler im Koordinaten-Test:", error);
		}
	});
	// Reset zoom button
	resetZoomButton.addEventListener("click", () => {
		if (initialTransform) {
			svgContainer.transition().duration(750).call(zoom.transform, initialTransform);
		}
	});
	// Popup image click
	popupImage.addEventListener("click", () => {
		largePhoto.style.display = "block"; // Großes Popup-Fenster anzeigen
		popup.style.display = "none";
		triangle.style.display = "none";
		if (popupTimeout)
			clearTimeout(popupTimeout);
		popupTimeout = null;
		// === HIER DIE NEUE ANFRAGE FÜR DAS GROSSE BILD ===
		if (!currentRobotDuid || !selectedObstacleID) {
			console.error("Cannot fetch large image, DUID or ObstacleID is missing.");
			return;
		}
		console.log(`Requesting large photo (type 0) for obstacle: ${selectedObstacleID}`);
		largePhotoImage.src = ""; // Lade-Indikator (oder altes Bild löschen)
		const command = "get_obstacle_image";
		// WICHTIG: 'type: 0' für das große Bild übergeben
		const parameters = {
			obstacleId: selectedObstacleID,
			duid: currentRobotDuid,
			type: 0, // 0 = großes Bild
		};
		connection
			.sendTo(instanceId, command, parameters)
			.then((response) => {
				if (response && typeof response.image === "string") {
					const imageData = response.image.replace(/\s/g, ""); // Whitespace entfernen
					largePhotoImage.src = imageData;
				}
				else if (response && response.error) {
					console.error("Failed to get large obstacle image (Backend Error):", response.error);
				}
				else {
					console.warn("Got no large image or invalid response", selectedObstacleID, response);
				}
			})
			.catch((err) => console.error("Error getting large obstacle image (Frontend Error):", err));
		// === ENDE NEUE ANFRAGE ===
	});
	largePhoto.addEventListener("click", () => {
		largePhoto.style.display = "none";
	});
};
//# sourceMappingURL=map.js.map