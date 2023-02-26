/* eslint-disable no-undef */

let /* map, */ mapBase64, selectedElement;
let left, topMap, mapMinX, mapMinY, mapSizeX, mapSizeY, goToTarget = false;
let zoomLevel = 0.55;
let scaleFactor = 2;

const go_to_pin_image = "data:image/png;base64,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AAAOVWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNC40LjAtRXhpdjIiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6R0lNUD0iaHR0cDovL3d3dy5naW1wLm9yZy94bXAvIgogICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgIHhtcE1NOkRvY3VtZW50SUQ9ImdpbXA6ZG9jaWQ6Z2ltcDplODk0ZjlkMy1iNjZlLTQ1ODQtODY0MS0zMGI5MTk2ZDM2NTQiCiAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6YjM1MWM4ODEtZmQwYi00MjlkLWExZDMtNjkwOTFiNWE1YzYxIgogICB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6YTZlMmNkZTctOGZhZC00ZDVhLWI5N2UtY2VhZTc0NWNmYjVmIgogICBkYzpGb3JtYXQ9ImltYWdlL3BuZyIKICAgR0lNUDpBUEk9IjIuMCIKICAgR0lNUDpQbGF0Zm9ybT0iV2luZG93cyIKICAgR0lNUDpUaW1lU3RhbXA9IjE2NzczNjQ5MzQzNDYyMjgiCiAgIEdJTVA6VmVyc2lvbj0iMi4xMC4zMiIKICAgdGlmZjpPcmllbnRhdGlvbj0iMSIKICAgeG1wOkNyZWF0b3JUb29sPSJHSU1QIDIuMTAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjM6MDI6MjVUMjM6NDI6MTIrMDE6MDAiCiAgIHhtcDpNb2RpZnlEYXRlPSIyMDIzOjAyOjI1VDIzOjQyOjEyKzAxOjAwIj4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MjcxYWIyOGQtODExMy00NWRiLWJkMjQtNGJkOTJjZjk5NThmIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJHaW1wIDIuMTAgKFdpbmRvd3MpIgogICAgICBzdEV2dDp3aGVuPSIyMDIzLTAyLTI1VDIzOjI1OjIzIi8+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InNhdmVkIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjA4MjZiNWE2LTgwZjctNDU2My1hY2UwLThjMTMzYjQyZmZhNCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iR2ltcCAyLjEwIChXaW5kb3dzKSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyMy0wMi0yNVQyMzo0MjoxNCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz6W+nyxAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5wIZFioOADz0AgAAAyVJREFUaN7tmr9uE0EQhz8ncmKSwglQkMSCIg0URMgFFUUkZARyj1DeIhQuIsQj0LqnJHkBK6FJ5QK5IIpBsuhiWVEiOY7y3/INxaybBOE9+27vbPknjWSfd2fmu/Xt7c4djDXWWGMNkRLhupcJ4CnwHHgNrADLwLxp0AT+AD+B78Ae8BsS3pCdR5kCeQPyA+QExAORHuaZtj9M36lhgX0FsmMB2Mt21Fd8QVMgGyA3AcB27cb4TMUNdgbkG0gnQNiudYzvmbjA3gPZDAH0tm1qrGhhJ0C+Wk5Kg5pnYk1ECfwB5NoBbNeuNWY0sPdBjhzCdu1IY7uFTYAUI4DtWlFzcAf8CKQeIXBdc/CvfieAt8Cinw6ZDBQKUC5Do6FWLuuxTMZ3/EWTg7MRrvgZkXxepFIR8Ty5I8/T3/J536NccQW7CHJpm9jKikitJj1Vq2lbH8CXmkv4wDk/y8dSSaxVKvleduZcXMNPgEmbhrkcZLP2jrNZ7WOpSZNL6MBztvvopSVIp+0dp9Pax8defs4F8LQtcCoFyaS942RS+/gAnnYBfAaITcOrK2i37R2329rHdjIxuYQOfAJYlWDqdWi17B23WtrHUp7JJfRZejVGs/SqC+CHIBcxuA9faC5uFh97MVhp7blcWq77XfBnMiKFgki5LNJoqJXLeiyT6WsDse4SeBnkPMLd0rnm4G63dAhUIyy1VE0OroATZ8BWhMBbJgenVY95kNMI/s6nGrs/DVABTDSBYgSjWzSxIynkPQNpOhzdpsbsXwPWeBO/gJLDM1wyMSMtxi+AtByMbktjDaYgqviH5lqWMM+qiXFIPCQLIMchju5xEKMbNPRaiMBrxE8yC7IbAuyu+o6lJAvSDhC2rT5jLfkU0IPxjvqKvWQOZD8A4H31NRSSFwNuH8/Vx9BIEuZlFK/PJ/0bjh+HBgI91eesvTtE72jdgX4McuAD9kD7DLXkvWVZ90bbjoTkc49bVUfbjIxkFmT7P8DbMV5N9Q39AKT6D9iq/jaSkpe39s4tPTbSknfmdYVL/exWEdzcZQL4aL58GcKXwccaa6yx3Okve0d25MUPGTcAAAAASUVORK5CYII=";
const goToPin = new Image();

let canvasOffsetX, canvasOffsetY;


window.onload = function() {
	(async () => {
		const socket = new WebSocket("ws://" + window.location.hostname + ":7906");

		socket.onopen = () => {
			console.log("Connected to WebSocket server");

			const commandGetRobots = {};
			commandGetRobots["command"] = "getRobots";
			socket.send(JSON.stringify(commandGetRobots));
		};

		socket.onmessage = (event) => {
			// console.log(`Received message: ${event.data}`);
			const data = JSON.parse(event.data);
			const command = data.command;
			console.log(`Received message command: ${command}`);
			const commandGetMap = {};

			switch (command) {
				case "robotList":
					console.log("Robot IDs: " + data.parameters);

					selectedElement = document.getElementById("robotSelect");

					data.parameters.forEach(robot => {
						const option = document.createElement("option");
						option.value = robot[0];
						option.text = robot[1];
						selectedElement.add(option);
					});

					commandGetMap.command = "getMap";
					commandGetMap.duid = selectedElement.value;
					socket.send(JSON.stringify(commandGetMap));
					break;

				case "map":
					console.log(data.map);

					mapBase64 = data.base64;
					// map = data.map;
					scaleFactor = data.scale;
					left = data.map.image.position.left;
					topMap = data.map.image.position.top;
					drawBackgroundImage();
					break;
			}

		};

		socket.onclose = () => {
			console.log("Disconnected from WebSocket server");
		};


		const canvas = document.getElementById("myCanvas");
		const ctx = canvas.getContext("2d");

		async function localCoordsToRobotCoords(imagePoint) {
			const image = new Image();
			image.src = mapBase64;
			const point = {};
			await new Promise(resolve => {
				image.onload = function() {
					const xLoc = imagePoint.x;
					const yLoc = image.height / scaleFactor - imagePoint.y;

					const xPos = Math.round((left + xLoc) * 50.0);
					const yPos = Math.round((topMap + yLoc) * 50.0);
					point.x = xPos;
					point.y = yPos;
					resolve(point);
				};
			});
			return point;
		}

		function getMouseX(x) {
			return (Math.round((x - canvas.getBoundingClientRect().left) / zoomLevel + mapMinX ) / scaleFactor - 1); // - 1 because of a slight map offset
		}
		function getMouseY(y) {
			return (Math.round((y - canvas.getBoundingClientRect().top) / zoomLevel + mapMinY ) / scaleFactor - 1); // - 1 because of a slight map offset
		}

		let rects = [];
		let zones = [];
		let isDragging = false;
		let isResizing = false;
		let selectedRect = null;
		let offsetX, offsetY;
		const resizeSquareBorderWidth = 5;

		canvas.addEventListener("mousedown", function(e) {
			const mouseX = getMouseX(e.pageX);
			const mouseY = getMouseY(e.pageY);
			console.log("e.clientX: " + e.clientX + " e.clientY: " + e.clientY);
			console.log("e.pageX: " + e.pageX + " e.pageY: " + e.pageY);
			console.log("mousedown pos - x: " + mouseX + " y: " + mouseY);

			localCoordsToRobotCoords({x: mouseX, y: mouseY + 2})
				.then(point => {
					console.log("mousedown robot pos: " + JSON.stringify(point));
					if (goToTarget == true) {
						const data = {};
						data.duid = selectedElement.value;
						data.command = "app_goto_target";
						data.parameters = [point.x, point.y];
						socket.send(JSON.stringify(data));
						goToTarget = false;
						stop.disabled = false;
						drawRects();
					}
				})
				.catch(error => {
					console.error("Error: " + error);
				});

			for (let i = 0; i < rects.length; i++) {
				const rect = rects[i];
				console.log("rect.x: " + rect.x + " rect.y: " + rect.y + " rect.width: " + rect.width + " rect.height: " + rect.height);

				offsetX = e.pageX - rect.x + 1;
				offsetY = e.pageY - rect.y + 1;
				console.log("rect: " + JSON.stringify(rect));
				console.log("mousedown offset - x: " + offsetX + " y: " + offsetY);
				console.log("left offset: " + canvasOffsetX + " top offset: " + canvasOffsetY);

				if (
					offsetX - canvasOffsetX > rect.width - resizeSquareBorderWidth &&
					offsetX - canvasOffsetX <= rect.width + resizeSquareBorderWidth &&
					offsetY - canvasOffsetY > rect.height - resizeSquareBorderWidth &&
					offsetY - canvasOffsetY <= rect.height + resizeSquareBorderWidth
				) {
					console.log("Resizing");
					offsetX = e.pageX - rect.x - rect.width;
					offsetY = e.pageY - rect.y - rect.height;
					selectedRect = i;
					isResizing = true;
				}
				else if (
					offsetX - canvasOffsetX > 0 &&
					offsetX - canvasOffsetX <= rect.width + 2 &&
					offsetY - canvasOffsetY > 0 &&
					offsetY - canvasOffsetY <= rect.height + 2
				) {
					console.log("Square selected: " + i);
					selectedRect = i;
					isDragging = true;
					break;
				}
			}
		});

		canvas.addEventListener("mouseup", function() {
			isDragging = false;
			isResizing = false;
			// drawRects();
			if (rects.length > 0)
			{
				convertToRobotZone(rects[selectedRect]);
			}
		});

		canvas.addEventListener("mousemove", function(e) {
			if (isDragging) {
				const draggingX = e.pageX - offsetX + 1;
				const draggingY = e.pageY - offsetY + 1;
				console.log("dragging mouseX pos with offset: " + draggingX);
				console.log("dragging mouseY pos with offset: " + draggingY);
				rects[selectedRect].x = draggingX;
				rects[selectedRect].y = draggingY;
				drawRects();
			}
			else if (isResizing) {
				rects[selectedRect].width = e.pageX - rects[selectedRect].x - offsetX;
				rects[selectedRect].height = e.pageY - rects[selectedRect].y - offsetY;
				drawRects();
			}
			else if (goToTarget)
			{
				const goToX = e.pageX + 5;
				const goToY = e.pageY + 5;

				drawRects();
				ctx.drawImage(goToPin, goToX - goToPin.width/2, goToY - goToPin.height/2 - 12, goToPin.width/2, goToPin.height/2);
			}
		});

		const deleteButton = document.getElementById("deleteButton");
		deleteButton.addEventListener("click", function() {
			if (rects[selectedRect]) {
				rects.splice(selectedRect, 1);
				console.log("rects.length: " + rects.length);
				if (rects.length < 5) {
					addButton.disabled = false;
				}
				if (rects.length < 1) {
					deleteButton.disabled = true;
					start.disabled = true;
				}
				selectedRect = rects.length - 1;
				drawRects();
			}
		});

		const addButton = document.getElementById("addButton");
		addButton.addEventListener("click", function() {
			const x = (Math.round((186 * scaleFactor - mapMinX) * zoomLevel) + 2);
			const y = (Math.round((184 * scaleFactor - mapMinY) * zoomLevel) + 3);
			const width = Math.round(25 * scaleFactor * zoomLevel);
			const height = Math.round(25 * scaleFactor * zoomLevel);

			rects.push({ x: x, y: y, width: width, height: height });
			console.log("length: " + rects.length);
			if (rects.length > 0) {
				deleteButton.disabled = false;
				start.disabled = false;
			}
			if (rects.length > 4) {
				addButton.disabled = true;
			}
			console.log("Square spawned at: " + x + ":" + y);
			selectedRect = rects.length - 1;
			drawRects();
			convertToRobotZone({ x: x, y: y, width: width, height: height });
		});

		const start = document.getElementById("startButton");
		start.addEventListener("click", function() {
			const data = {};
			data.duid = selectedElement.value;
			if (zones.length > 0) {
				data.command = "app_zoned_clean";
			}
			else {
				data.command = "app_start";
			}
			data.parameters = zones;
			console.log("Zones to start with: " + JSON.stringify(zones));
			start.disabled = true;
			addButton.disabled = true;
			deleteButton.disabled = true;
			socket.send(JSON.stringify(data));
			rects = [];
			drawRects();

			startButton.style.display = "none";
			pauseButton.style.display = "inline-block";
		});

		const pause = document.getElementById("pauseButton");
		pause.addEventListener("click", function() {
			const data = {};
			data.duid = selectedElement.value;
			data.command = "app_pause";
			start.disabled = false;
			socket.send(JSON.stringify(data));

			startButton.style.display = "inline-block";
			pauseButton.style.display = "none";
		});

		const stop = document.getElementById("stopButton");
		stop.addEventListener("click", function() {
			const data = {};
			data.duid = selectedElement.value;
			data.command = "app_stop";
			start.disabled = false;
			addButton.disabled = false;
			socket.send(JSON.stringify(data));

			startButton.style.display = "inline-block";
			pauseButton.style.display = "none";
		});

		const dock = document.getElementById("dockButton");
		dock.addEventListener("click", function() {
			const data = {};
			data.duid = selectedElement.value;
			data.command = "app_charge";
			socket.send(JSON.stringify(data));
		});

		const goTo = document.getElementById("goToButton");
		goTo.addEventListener("click", function() {
			goToTarget = true;
			goToPin.src = go_to_pin_image;
		});

		function drawBackgroundImage() {
			const image = new Image();
			// console.log("mapBase64:" + mapBase64);
			image.src = mapBase64;
			image.onload = function() {
				canvasOffsetX = canvas.getBoundingClientRect().left;
				canvasOffsetY = canvas.getBoundingClientRect().top;
				console.log("canvasOffsetX: " + canvasOffsetX);
				console.log("canvasOffsetY: " + canvasOffsetY);

				// Get the image data and calculate the actual dimensions of the image
				const tempCanvas = document.createElement("canvas");
				tempCanvas.width = image.width;
				tempCanvas.height = image.height;
				const tempCtx = tempCanvas.getContext("2d");
				tempCtx.drawImage(image, 0, 0);
				const imageData = tempCtx.getImageData(0, 0, image.width, image.height);
				mapMinX = image.width;
				mapMinY = image.height;
				let mapMaxX = 0, mapMaxY = 0;
				for (let y = 0; y < image.height; y++) {
					for (let x = 0; x < image.width; x++) {
						const index = (y * image.width + x) * 4;
						if (imageData.data[index+3] > 0) { // Check if the alpha value is non-zero
							mapMinX = Math.min(mapMinX, x);
							mapMinY = Math.min(mapMinY, y);
							mapMaxX = Math.max(mapMaxX, x);
							mapMaxY = Math.max(mapMaxY, y);
						}
					}
				}
				mapSizeX = mapMaxX - mapMinX;
				mapSizeY = mapMaxY - mapMinY;
				console.log("Image data map image.width: " + image.width + " image.height: " + image.height);
				console.log("Image data map mapSizeX: " + mapSizeX + " mapSizeY: " + mapSizeY);
				console.log("Image data mapMinX: " + mapMinX + " mapMinY: " + mapMinY + " mapMaxX: " + mapMaxX + " mapMaxY: " + mapMaxY);

				const aspectRatio = canvas.width / canvas.height;

				const contentAspectRatio = mapSizeX / mapSizeY;

				if (contentAspectRatio > aspectRatio) {
					zoomLevel = canvas.width / mapSizeX;
				} else {
					zoomLevel = canvas.height / mapSizeY;
				}
				console.log("image.width: " + image.width);
				console.log("image.height: " + image.height);
				console.log("zoomLevel: " + zoomLevel);

				// Create a temporary canvas to draw the truncated image
				const truncatedCanvas = document.createElement("canvas");
				truncatedCanvas.width = mapSizeX;
				truncatedCanvas.height = mapSizeY;
				const truncatedCtx = truncatedCanvas.getContext("2d");
				truncatedCtx.drawImage(image, mapMinX, mapMinY, mapSizeX, mapSizeY, 0, 0, mapSizeX, mapSizeY);

				const backgroundWidth = Math.round(mapSizeX * zoomLevel);
				const backgroundHeight = Math.round(mapSizeY * zoomLevel);
				canvas.style.backgroundImage = `url(${truncatedCanvas.toDataURL()})`;
				canvas.style.backgroundSize = `${backgroundWidth}px ${backgroundHeight}px`;
				canvas.style.backgroundPosition = "0 0";
				canvas.style.backgroundRepeat = "no-repeat";
			};
		}

		function convertToRobotZone(rect)
		{
			const rectMin = {}, rectMax = {};
			let ratio = 0;
			if ((mapSizeX / mapSizeY) > 1) {
				ratio = mapSizeX / mapSizeY;
			}
			else if ((mapSizeY / mapSizeX) > 1) {
				ratio = mapSizeY / mapSizeX;
			}

			rectMin.x = Math.round((rect.x  + canvasOffsetX + 2) / ratio / scaleFactor / zoomLevel + ((mapMinX) / scaleFactor));
			rectMin.y = Math.round((rect.y + canvasOffsetY + 2) / ratio / scaleFactor / zoomLevel + ((mapMinY) / scaleFactor));
			rectMax.x = Math.round(rect.width / scaleFactor / zoomLevel) + rectMin.x;
			rectMax.y = Math.round(rect.height / scaleFactor / zoomLevel) + rectMin.y;


			const zone = [];
			let lineleft;
			let lineBottom;
			let lineRight;
			let lineTop;
			localCoordsToRobotCoords(rectMin)
				.then(pointMin => {
					lineleft = pointMin.x;
					lineTop = pointMin.y;
					zone.push(lineleft);

					localCoordsToRobotCoords(rectMax)
						.then(pointMax => {
							lineRight = pointMax.x;
							lineBottom = pointMax.y;
							zone.push(lineBottom);
							zone.push(lineRight);
							zone.push(lineTop);
							zone.push(parseInt(document.getElementById("cleanCount").value)); // clean count
							zones.push(zone);
							console.log("zone: " + JSON.stringify(zone));
						})
						.catch(error => {
							console.error("Error: " + error);
						});
				})
				.catch(error => {
					console.error("Error: " + error);
				});

		}

		function drawRects() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			zones = [];

			for (let i = 0; i < rects.length; i++) {
				const rect = rects[i];
				const rectMinX = rect.x - 1;
				const rectMinY = rect.y - 1;
				const rectWidth = rect.width;
				const rectHeight = rect.height;

				ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
				ctx.fillRect(rectMinX, rectMinY, rectWidth, rectHeight);
				ctx.lineWidth = zoomLevel * scaleFactor;
				ctx.strokeStyle = "rgba(255, 255, 255, 1)";
				ctx.strokeRect(rectMinX, rectMinY, rectWidth, rectHeight);

				ctx.fillStyle = "red";
				ctx.beginPath();
				ctx.arc(rectMinX + rectWidth, rectMinY + rectHeight, 5, 0, 2 * Math.PI);
				ctx.fill();

				console.log("Square position: " + JSON.stringify(rect));

				// convertToRobotZone(rect);
			}
		}
	})();
};