var mapBase64, selectedElement;
var left,
	topMap,
	mapMinX,
	mapMinY,
	mapSizeX,
	mapSizeY,
	goToTarget = false;
var zoomLevel = 0.55;
var scaleFactor = 2;

var zoomStep = 0.1;
var minZoom = 0.5;
var maxZoom = 3;
var wheelZoom = 1;

var panOffsetX = 0;
var panOffsetY = 0;
var isPanning = false;
var startX = 0;
var startY = 0;

var popupX, popupY;

var go_to_pin_image =
	"data:image/png;base64,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AAAOVWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNC40LjAtRXhpdjIiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6R0lNUD0iaHR0cDovL3d3dy5naW1wLm9yZy94bXAvIgogICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgIHhtcE1NOkRvY3VtZW50SUQ9ImdpbXA6ZG9jaWQ6Z2ltcDplODk0ZjlkMy1iNjZlLTQ1ODQtODY0MS0zMGI5MTk2ZDM2NTQiCiAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6YjM1MWM4ODEtZmQwYi00MjlkLWExZDMtNjkwOTFiNWE1YzYxIgogICB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6YTZlMmNkZTctOGZhZC00ZDVhLWI5N2UtY2VhZTc0NWNmYjVmIgogICBkYzpGb3JtYXQ9ImltYWdlL3BuZyIKICAgR0lNUDpBUEk9IjIuMCIKICAgR0lNUDpQbGF0Zm9ybT0iV2luZG93cyIKICAgR0lNUDpUaW1lU3RhbXA9IjE2NzczNjQ5MzQzNDYyMjgiCiAgIEdJTVA6VmVyc2lvbj0iMi4xMC4zMiIKICAgdGlmZjpPcmllbnRhdGlvbj0iMSIKICAgeG1wOkNyZWF0b3JUb29sPSJHSU1QIDIuMTAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjM6MDI6MjVUMjM6NDI6MTIrMDE6MDAiCiAgIHhtcDpNb2RpZnlEYXRlPSIyMDIzOjAyOjI1VDIzOjQyOjEyKzAxOjAwIj4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MjcxYWIyOGQtODExMy00NWRiLWJkMjQtNGJkOTJjZjk5NThmIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJHaW1wIDIuMTAgKFdpbmRvd3MpIgogICAgICBzdEV2dDp3aGVuPSIyMDIzLTAyLTI1VDIzOjI1OjIzIi8+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InNhdmVkIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjA4MjZiNWE2LTgwZjctNDU2My1hY2UwLThjMTMzYjQyZmZhNCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iR2ltcCAyLjEwIChXaW5kb3dzKSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyMy0wMi0yNVQyMzo0MjoxNCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz6W+nyxAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5wIZFioOADz0AgAAAyVJREFUaN7tmr9uE0EQhz8ncmKSwglQkMSCIg0URMgFFUUkZARyj1DeIhQuIsQj0LqnJHkBK6FJ5QK5IIpBsuhiWVEiOY7y3/INxaybBOE9+27vbPknjWSfd2fmu/Xt7c4djDXWWGMNkRLhupcJ4CnwHHgNrADLwLxp0AT+AD+B78Ae8BsS3pCdR5kCeQPyA+QExAORHuaZtj9M36lhgX0FsmMB2Mt21Fd8QVMgGyA3AcB27cb4TMUNdgbkG0gnQNiudYzvmbjA3gPZDAH0tm1qrGhhJ0C+Wk5Kg5pnYk1ECfwB5NoBbNeuNWY0sPdBjhzCdu1IY7uFTYAUI4DtWlFzcAf8CKQeIXBdc/CvfieAt8Cinw6ZDBQKUC5Do6FWLuuxTMZ3/EWTg7MRrvgZkXxepFIR8Ty5I8/T3/J536NccQW7CHJpm9jKikitJj1Vq2lbH8CXmkv4wDk/y8dSSaxVKvleduZcXMNPgEmbhrkcZLP2jrNZ7WOpSZNL6MBztvvopSVIp+0dp9Pax8defs4F8LQtcCoFyaS942RS+/gAnnYBfAaITcOrK2i37R2329rHdjIxuYQOfAJYlWDqdWi17B23WtrHUp7JJfRZejVGs/SqC+CHIBcxuA9faC5uFh97MVhp7blcWq77XfBnMiKFgki5LNJoqJXLeiyT6WsDse4SeBnkPMLd0rnm4G63dAhUIyy1VE0OroATZ8BWhMBbJgenVY95kNMI/s6nGrs/DVABTDSBYgSjWzSxIynkPQNpOhzdpsbsXwPWeBO/gJLDM1wyMSMtxi+AtByMbktjDaYgqviH5lqWMM+qiXFIPCQLIMchju5xEKMbNPRaiMBrxE8yC7IbAuyu+o6lJAvSDhC2rT5jLfkU0IPxjvqKvWQOZD8A4H31NRSSFwNuH8/Vx9BIEuZlFK/PJ/0bjh+HBgI91eesvTtE72jdgX4McuAD9kD7DLXkvWVZ90bbjoTkc49bVUfbjIxkFmT7P8DbMV5N9Q39AKT6D9iq/jaSkpe39s4tPTbSknfmdYVL/exWEdzcZQL4aL58GcKXwccaa6yx3Okve0d25MUPGTcAAAAASUVORK5CYII=";
var goToPin = new Image();

var canvasOffsetX, canvasOffsetY;

var data;
var map;
var popupTimeout;
var timeoutStart;

var selectedObstacleID;

window.onload = function () {
	var popup = document.getElementById("popup");
	var popupImage = document.getElementById("popup-image");
	var triangle = document.getElementById("triangle");
	var largePhoto = document.getElementById("largePhoto");
	var largePhotoImage = document.getElementById("largePhoto-image");

	var socket = new WebSocket("ws://" + window.location.hostname + ":7906");

	socket.onopen = () => {
		console.log("Connected to WebSocket server");

		socket.send(JSON.stringify({ command: "getRobots" }));
	};

	socket.onmessage = (event) => {
		// console.log(`Received message: ${event.data}`);
		data = JSON.parse(event.data);
		var command = data.command;
		// console.log(`Received message command: ${command}`);

		switch (command) {
			case "robotList":
				console.log("Robot IDs: " + data.parameters);

				selectedElement = document.getElementById("robotSelect");

				if (selectedElement.childElementCount == 0) {
					data.parameters.forEach((robot) => {
						var option = document.createElement("option");
						option.value = robot[0];
						option.text = robot[1];
						selectedElement.add(option);
					});

					getMap(selectedElement.value); // get map once for the selected robot
					selectedElement.addEventListener("change", (event) => {
						getMap(event.target.value);
					});
				}
				break;

			case "map":
				map = data.map;
				console.log(`map:`, map);

				if (selectedElement.value == data.duid) {
					mapBase64 = data.base64;
					scaleFactor = data.scale;
					left = map.IMAGE.position.left;
					topMap = map.IMAGE.position.top;
					drawBackgroundImage();
				}
				break;
			case "get_status":
				if (selectedElement.value == data.duid) {
					if (data.parameters.isCleaning) {
						// console.log("Cleaning in progress for robot: " + data.duid);
						startButton.disabled = true;
						stop.disabled = false;
					} else {
						// console.log("Cleaning not in progress for robot: " + data.duid);
						startButton.disabled = false;
						stop.disabled = true;
					}
				}
				break;
		}
	};

	socket.onclose = () => {
		console.log("Disconnected from WebSocket server");
		setTimeout(() => {
			window.onload();
		}, 10000);
	};

	function getMap(duid) {
		const commandGetMap = {};
		commandGetMap.command = "getMap";
		commandGetMap.duid = duid;
		socket.send(JSON.stringify(commandGetMap));
	}

	const canvas = document.getElementById("myCanvas");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;

	const maxPanX = canvas.width / 2;
	const maxPanY = canvas.height / 2;

	canvasOffsetX = canvas.getBoundingClientRect().left;
	canvasOffsetY = canvas.getBoundingClientRect().top;
	console.log("canvasOffsetX: " + canvasOffsetX);
	console.log("canvasOffsetY: " + canvasOffsetY);

	async function localCoordsToRobotCoords(imagePoint) {
		const image = new Image();
		image.src = mapBase64;
		const point = {};
		await new Promise((resolve) => {
			image.onload = function () {
				point.x = Math.round((imagePoint.x + left) * 50.0);
				point.y = Math.round((image.height / scaleFactor + topMap - imagePoint.y) * 50.0);
				resolve(point);
			};
		});
		return point;
	}

	function mouseXtoCanvasX(e) {
		return (e.pageX || e.touches[0].clientX) - canvasOffsetX - 2;
	}
	function mouseYtoCanvasY(e) {
		return (e.pageY || e.touches[0].clientY) - canvasOffsetY - 2;
	}

	function canvasXtoMapX(x) {
		return roundTwoDecimals(((x - panOffsetX) / wheelZoom / zoomLevel + mapMinX) / scaleFactor);
	}
	function canvasYtoMapY(y) {
		return roundTwoDecimals(((y - panOffsetY) / wheelZoom / zoomLevel + mapMinY) / scaleFactor);
	}

	// maybe I need the functions one day
	// function mapXtoCanvasX(x) {
	// 	return roundTwoDecimals((x * scaleFactor - mapMinX) * wheelZoom * zoomLevel);
	// }
	// function mapYtoCanvasY(y) {
	// 	return roundTwoDecimals((y * scaleFactor - mapMinY) * wheelZoom * zoomLevel);
	// }

	function getOriginalX(transformedX) {
		return Math.floor((transformedX - map.IMAGE.position.left) * scaleFactor - 2 - mapMinX);
	}
	function getOriginalY(transformedY) {
		return Math.floor((map.IMAGE.dimensions.height / scaleFactor + map.IMAGE.position.top - transformedY) * scaleFactor - 2 - mapMinY);
	}

	function rectXtoRobotX(x) {
		return Math.round(canvasXtoMapX((x + panOffsetX / wheelZoom) * wheelZoom));
	}
	function rectYtoRobotY(y) {
		return Math.round(canvasYtoMapY((y + panOffsetY / wheelZoom) * wheelZoom));
	}

	let rects = [];
	let zones = [];
	let isDragging = false;
	let isResizing = false;
	let selectedRect = null;
	let offsetRectX, offsetRectY;
	let redDotOffsetX, redDotOffsetY;

	async function downEvent(e) {
		const mouseX = mouseXtoCanvasX(e);
		const mouseY = mouseYtoCanvasY(e);
		console.log(`mouseX: ${mouseX} mouseY: ${mouseY}`);

		const mapX = canvasXtoMapX(mouseX);
		const mapY = canvasYtoMapY(mouseY);

		const point = await localCoordsToRobotCoords({ x: mapX, y: mapY });

		// console.log("mousedown robot pos: " + JSON.stringify(point));
		console.log("Robot coords: " + JSON.stringify([point.x, point.y]));
		if (goToTarget == true) {
			const data = {};
			data.duid = selectedElement.value;
			data.command = "app_goto_target";
			data.parameters = [point.x, point.y];
			socket.send(JSON.stringify(data));
			goToTarget = false;
			drawMap(true);
		}

		for (let i = 0; i < rects.length; i++) {
			const rect = rects[i];

			const canvasMinRectX = Math.round((rect.x + panOffsetX / wheelZoom) * wheelZoom);
			const canvasMinRectY = Math.round((rect.y + panOffsetY / wheelZoom) * wheelZoom);

			const canvasMaxRectX = Math.round((rect.x + rect.width + panOffsetX / wheelZoom) * wheelZoom);
			const canvasMaxRectY = Math.round((rect.y + rect.height + panOffsetY / wheelZoom) * wheelZoom);

			offsetRectX = mouseX - canvasMinRectX;
			offsetRectY = mouseY - canvasMinRectY;

			redDotOffsetX = (mouseX - canvasMaxRectX) / wheelZoom;
			redDotOffsetY = (mouseY - canvasMaxRectY) / wheelZoom;
			const distanceRedDot = Math.sqrt(Math.pow(redDotOffsetX, 2) + Math.pow(redDotOffsetY, 2));

			if (distanceRedDot < 10) {
				console.log("Resizing");
				selectedRect = i;
				isResizing = true;
				e.preventDefault();
			} else if (offsetRectX >= 0 && offsetRectY >= 0 && offsetRectX <= rect.width * wheelZoom + 1 && offsetRectY <= rect.height * wheelZoom + 1) {
				console.log("Square selected: " + i);
				selectedRect = i;
				isDragging = true;
				e.preventDefault();
				break;
			}
		}

		if (!isResizing && !isDragging) {
			isPanning = true;
			startX = mouseX - panOffsetX;
			startY = mouseY - panOffsetY;
			console.log("startX: " + startX + " startY: " + startY);
			drawMap(true);
		}

		if (map?.OBSTACLES2) {
			map?.OBSTACLES2?.forEach((obstacle) => {
				const canvasX = getOriginalX(obstacle[0] / 50) * zoomLevel * wheelZoom + panOffsetX;
				const canvasY = getOriginalY(obstacle[1] / 50) * zoomLevel * wheelZoom + panOffsetY;
				const x = obstacle[0] / 50;
				const y = obstacle[1] / 50;

				const distance = Math.sqrt(Math.pow(mouseX - canvasX, 2) + Math.pow(mouseY - canvasY, 2));
				console.log(`distance: ${distance}`);

				if (distance <= 5) {
					selectedObstacleID = obstacle[6];

					if (popupTimeout) {
						clearTimeout(popupTimeout);
						popupTimeout = null;
					}
					console.log(`obstacle coords x: ${x}, y: ${y}`);

					popupX = x;
					popupY = y;

					const data = {};
					data.duid = selectedElement.value;
					data.command = "get_photo";
					data.attribute = {
						data_filter: {
							img_id: selectedObstacleID,
							type: 1, // 1 = small photo, 0 full photo
						},
					};

					if (popupImage.src) popupImage.src = "";

					triangle.style.left = "45px";
					triangle.style.top = "100px";

					popup.style.display = "block";

					socket.send(JSON.stringify(data));
					socket.onmessage = function (event) {
						const serverData = JSON.parse(event.data);

						if (serverData.image) {
							popupImage.src = serverData.image;
							socket.onmessage = null;

							popupImage.addEventListener("click", function () {
								console.log(`Request to large photo started!`);
								const data = {};
								data.duid = selectedElement.value;
								data.command = "get_photo";
								data.attribute = {
									data_filter: {
										img_id: selectedObstacleID,
										type: 0, // 1 = small photo, 0 full photo
									},
								};
								socket.send(JSON.stringify(data));

								socket.onmessage = function (event) {
									const serverData = JSON.parse(event.data);

									if (serverData.image) {
										popup.style.display = "none";
										largePhoto.style.display = "block";
										largePhotoImage.src = serverData.image;

										largePhotoImage.onclick = function () {
											largePhoto.style.display = "none";
										};
										socket.onmessage = null;
									}
								};

								setTimeout(() => {
									largePhoto.style.display = "none";
								}, 10000);
							});
						}
					};

					// Hide the popup after 10 seconds
					timeoutStart = Date.now();
					popupTimeout = setTimeout(() => {
						popup.style.display = "none";
						socket.onmessage = null;
						popupTimeout = null;
						selectedObstacleID = null;
					}, 10000);
					updatePopupPosition();
					isPanning = false;
				}
			});
		}
		drawMap(true);
	}

	canvas.addEventListener("mousedown", downEvent);
	canvas.addEventListener("touchstart", downEvent);

	function upEvent(e) {
		isDragging = false;
		isResizing = false;
		isPanning = false;
		if (rects.length > 0) {
			updateRobotZones();
		}

		// This is needed to prevent the popup from hiding instantly after showing it
		const elapsed = Date.now() - timeoutStart;
		if (elapsed > 250) popup.style.display = "none";

		e.preventDefault(false);
	}
	canvas.addEventListener("mouseup", upEvent);
	canvas.addEventListener("touchend", upEvent);

	canvas.addEventListener("mouseleave", () => {
		isPanning = false;
	});

	let goToX = 0;
	let goToY = 0;
	async function moveEvent(e) {
		const mouseX = mouseXtoCanvasX(e);
		const mouseY = mouseYtoCanvasY(e);
		if (isDragging) {
			rects[selectedRect].x = roundTwoDecimals((mouseX - panOffsetX - offsetRectX) / wheelZoom);
			rects[selectedRect].y = roundTwoDecimals((mouseY - panOffsetY - offsetRectY) / wheelZoom);
		} else if (isResizing) {
			rects[selectedRect].width = roundTwoDecimals((mouseX - panOffsetX - rects[selectedRect].x - redDotOffsetX) / wheelZoom);
			rects[selectedRect].height = roundTwoDecimals((mouseY - panOffsetY - rects[selectedRect].y - redDotOffsetY) / wheelZoom);
		} else if (goToTarget) {
			goToX = (mouseX - panOffsetX) / wheelZoom;
			goToY = (mouseY - panOffsetY) / wheelZoom;
		} else if (isPanning) {
			const deltaX = roundTwoDecimals(mouseX - startX);
			const deltaY = roundTwoDecimals(mouseY - startY);

			// Calculate the limits based on the map dimensions and zoom level
			const minOffsetX = maxPanX - mapSizeX * zoomLevel * wheelZoom;
			const maxOffsetX = maxPanX;
			const minOffsetY = maxPanY - mapSizeY * zoomLevel * wheelZoom;
			const maxOffsetY = maxPanY;

			// Clamp the pan offsets within the defined boundaries
			panOffsetX = clamp(deltaX, minOffsetX, maxOffsetX);
			panOffsetY = clamp(deltaY, minOffsetY, maxOffsetY);

			updatePopupPosition();
		}
	}
	canvas.addEventListener("mousemove", moveEvent);
	canvas.addEventListener("touchmove", moveEvent);

	canvas.addEventListener("wheel", (e) => {
		e.preventDefault();
		const clientX = mouseXtoCanvasX(e);
		const clientY = mouseYtoCanvasY(e);
		const prevZoom = wheelZoom;

		if (e.deltaY < 0) {
			wheelZoom += zoomStep;
		} else {
			wheelZoom -= zoomStep;
		}
		wheelZoom = roundTwoDecimals(Math.min(Math.max(wheelZoom, minZoom), maxZoom) * 100) / 100;

		panOffsetX = roundTwoDecimals(clientX + panOffsetX - (clientX * wheelZoom) / prevZoom);
		panOffsetY = roundTwoDecimals(clientY + panOffsetY - (clientY * wheelZoom) / prevZoom);

		updatePopupPosition();
		drawMap(true);

		if (rects.length > 0) {
			updateRobotZones();
		}

		console.log(`wheelZoom: ${wheelZoom}`);
	});

	const deleteButton = document.getElementById("deleteButton");
	deleteButton.addEventListener("click", function () {
		if (rects[selectedRect]) {
			rects.splice(selectedRect, 1);
			console.log("rects.length: " + rects.length);
			if (rects.length < 5) {
				addButton.disabled = false;
			}
			if (rects.length < 1) {
				deleteButton.disabled = true;
			}
			selectedRect = rects.length - 1;
			drawMap(true);
		}
	});

	const addButton = document.getElementById("addButton");
	addButton.addEventListener("click", function () {
		goToTarget = false;

		const width = (25 * scaleFactor) / wheelZoom;
		const height = (25 * scaleFactor) / wheelZoom;
		const x = canvas.width / 2 - width / 2;
		const y = canvas.height / 2 - height / 2;

		rects.push({ x: x, y: y, width: width, height: height });
		console.log("length: " + rects.length);
		if (rects.length > 0) {
			deleteButton.disabled = false;
		}
		if (rects.length > 4) {
			addButton.disabled = true;
		}
		console.log("Square spawned at: " + x + ":" + y);
		selectedRect = rects.length - 1;
		drawMap(true);
		updateRobotZones();
	});

	const startButton = document.getElementById("startButton");
	startButton.addEventListener("click", function () {
		const data = {};
		data.duid = selectedElement.value;
		if (zones.length > 0) {
			data.command = "app_zoned_clean";
			data.parameters = zones;
		} else {
			data.command = "app_start";
		}
		console.log("Zones to start with: " + JSON.stringify(zones));
		socket.send(JSON.stringify(data));
		rects = [];
		drawMap(true);

		startButton.style.display = "none";
		pauseButton.style.display = "inline-block";
	});

	const pauseButton = document.getElementById("pauseButton");
	pauseButton.addEventListener("click", function () {
		const data = {};
		data.duid = selectedElement.value;
		data.command = "app_pause";
		socket.send(JSON.stringify(data));

		startButton.style.display = "inline-block";
		pauseButton.style.display = "none";
	});

	const stop = document.getElementById("stopButton");
	stop.addEventListener("click", function () {
		data.duid = selectedElement.value;
		console.log(map);
		data.command = "app_stop";
		socket.send(JSON.stringify(data));

		startButton.style.display = "inline-block";
		pauseButton.style.display = "none";
	});

	const dock = document.getElementById("dockButton");
	dock.addEventListener("click", function () {
		const data = {};
		data.duid = selectedElement.value;
		data.command = "app_charge";
		socket.send(JSON.stringify(data));
	});

	const goTo = document.getElementById("goToButton");
	goTo.addEventListener("click", function () {
		goToTarget = true;
		goToPin.src = go_to_pin_image;
		drawMap(true);
	});

	const resetZoom = document.getElementById("resetZoomButton");
	resetZoom.addEventListener("click", function () {
		panOffsetX = 0;
		panOffsetY = 0;
		wheelZoom = 1;
		updatePopupPosition();
		drawMap(true);
	});

	const image = new Image();
	const tempCanvas = document.createElement("canvas");

	async function drawBackgroundImage() {
		// console.log("mapBase64:" + mapBase64);
		image.src = mapBase64;
		image.onload = await function () {
			const tempCtx = tempCanvas.getContext("2d", { willReadFrequently: true });

			let mapMaxX = 0,
				mapMaxY = 0;
			mapMinX = image.width;
			mapMinY = image.height;

			tempCanvas.width = image.width;
			tempCanvas.height = image.height;
			tempCtx.drawImage(image, 0, 0);

			// Get the image data and calculate the actual dimensions of the image
			const imageData = tempCtx.getImageData(0, 0, image.width, image.height);
			const pixels = imageData.data;
			for (let i = 0; i < pixels.length; i += 4) {
				const alpha = pixels[i + 3];
				if (alpha > 0) {
					// Check if the alpha value is non-zero
					const x = (i / 4) % image.width;
					const y = Math.floor(i / 4 / image.width);

					mapMinX = Math.min(mapMinX, x);
					mapMinY = Math.min(mapMinY, y);
					mapMaxX = Math.max(mapMaxX, x);
					mapMaxY = Math.max(mapMaxY, y);
				}
			}
			// Add some padding to the map
			mapMinX--;
			mapMinY--;
			mapMaxX++;
			mapMaxY++;

			mapSizeX = mapMaxX - mapMinX;
			mapSizeY = mapMaxY - mapMinY;

			const aspectRatio = canvas.width / canvas.height;

			const contentAspectRatio = mapSizeX / mapSizeY;

			if (contentAspectRatio > aspectRatio) {
				console.log("Aspect ratio is greater than canvas aspect ratio mapSizeX: " + mapSizeX + " mapSizeY: " + mapSizeY);
				zoomLevel = Math.round((canvas.width * 100) / mapSizeX) / 100;
			} else {
				console.log("Aspect ratio is less than canvas aspect ratio mapSizeX: " + mapSizeX + " mapSizeY: " + mapSizeY);
				zoomLevel = Math.round((canvas.height * 100) / mapSizeY) / 100;
			}
			console.log("zoomLevel: " + zoomLevel);

			drawMap(true);
		};
	}

	function updateRobotZones() {
		// console.log("rect.x : " + rect.x + " rect.y: " + rect.y);
		// console.log("rect.x : " + rect.x + " rect.y: " + rect.y);

		// console.log("canvasOffsetX : " + canvasOffsetX + " canvasOffsetY: " + canvasOffsetY);
		// console.log("panOffsetX : " + panOffsetX + " panOffsetY: " + panOffsetY);

		// console.log("x : " + getX(rect.x) + " y: " + getY(rect.y));
		// console.log("rect.x : " + rect.x + " rect.y: " + rect.y);

		zones = [];
		for (const rect in rects) {
			const zone = [];

			// const x = canvasXtoMapX(rects[rect].x);
			const x = rectXtoRobotX(rects[rect].x);
			const y = rectYtoRobotY(rects[rect].y);
			const xMax = rectXtoRobotX(rects[rect].x + rects[rect].width);
			const yMax = rectYtoRobotY(rects[rect].y + rects[rect].height);

			localCoordsToRobotCoords({ x: x, y: y }).then((coords1) => {
				console.log("coords1.x : " + coords1.x + " coords1.y: " + coords1.y);
				localCoordsToRobotCoords({ x: xMax, y: yMax }).then((coords2) => {
					console.log("coords2.x : " + coords2.x + " coords2.y: " + coords2.y);

					zone.push(Math.min(coords1.x, coords2.x));
					zone.push(Math.min(coords1.y, coords2.y));
					zone.push(Math.max(coords1.x, coords2.x));
					zone.push(Math.max(coords1.y, coords2.y));
					zone.push(parseInt(document.getElementById("cleanCount").value)); // clean count
					zones.push(zone);
					// console.log("zone: " + JSON.stringify(zone));
					console.log("Zones length: " + zones.length);
					console.log("Zones to start with: " + JSON.stringify(zones));
				});
			});
		}
	}

	function updatePopupPosition() {
		if (popupTimeout) {
			const x = getOriginalX(popupX) * zoomLevel * wheelZoom + panOffsetX;
			const y = getOriginalY(popupY) * zoomLevel * wheelZoom + panOffsetY;

			popup.style.left = `${x - parseInt(popupImage.style.width, 10) / 2 + 10}px`;
			popup.style.top = `${y - parseInt(popupImage.style.height, 10)}px`;
		}
	}

	// Create a temporary canvas to draw the truncated image
	const truncatedCanvas = document.createElement("canvas");
	let rafId = null;
	function drawMap(manualDraw = false) {
		if (manualDraw || isDragging || isResizing || isPanning || goToTarget) {
			truncatedCanvas.width = mapSizeX;
			truncatedCanvas.height = mapSizeY;
			const truncatedCtx = truncatedCanvas.getContext("2d");
			truncatedCtx.drawImage(image, mapMinX, mapMinY, mapSizeX, mapSizeY, 0, 0, mapSizeX, mapSizeY);

			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.save();
			ctx.translate(panOffsetX, panOffsetY);
			ctx.scale(wheelZoom * zoomLevel, wheelZoom * zoomLevel);

			ctx.drawImage(truncatedCanvas, 0, 0, mapSizeX, mapSizeY);

			for (let i = 0; i < rects.length; i++) {
				const rect = rects[i];

				ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
				ctx.fillRect(rect.x / zoomLevel, rect.y / zoomLevel, rect.width / zoomLevel, rect.height / zoomLevel);
				ctx.lineWidth = 5;
				ctx.strokeStyle = "rgba(255, 255, 255, 1)";
				ctx.strokeRect(rect.x / zoomLevel, rect.y / zoomLevel, rect.width / zoomLevel, rect.height / zoomLevel);

				ctx.fillStyle = "red";
				ctx.beginPath();
				ctx.arc((rect.x + rect.width) / zoomLevel, (rect.y + rect.height) / zoomLevel, 10, 0, 2 * Math.PI);
				ctx.fill();

				console.log("Square position: " + JSON.stringify(rect));
			}

			// ctx.beginPath();
			// ctx.arc(100, 100, 50, 0, 2 * Math.PI);
			// ctx.fillStyle = "red";
			// ctx.fill();
			// ctx.stroke();

			const goToPosX = (goToX - 8) / zoomLevel;
			const goToPosY = (goToY - 12) / zoomLevel;
			const goToSizeX = goToPin.width / 2;
			const goToSizeY = goToPin.height / 2;

			ctx.drawImage(goToPin, goToPosX, goToPosY, goToSizeX, goToSizeY);

			ctx.restore();

			// this is needed to update the canvas only when needed
			if (!rafId) {
				rafId = requestAnimationFrame(() => {
					rafId = null;
					drawMap();
				});
			}
		}
	}

	function roundTwoDecimals(number) {
		return Math.round(number * 100) / 100;
	}

	function clamp(value, min, max) {
		return Math.min(Math.max(value, min), max);
	}
};
