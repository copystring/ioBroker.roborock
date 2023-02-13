/* eslint-disable no-undef */
let base64Image;
let selectedElement;
let hostedIP;
// const canvasOffsetX = 65+22.5;
// const canvasOffsetY = 32.5;
let left, topMap, mapOffsetX, mapOffsetY, mapSizeX, mapSizeY;
let zoomLevel = 1;

window.onload = function() {
	(async () => {
		hostedIP = await getLocalIp();

		console.log(`Local IP address: ${hostedIP}`);
		const socket = new WebSocket("ws://" + hostedIP + ":7906");

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
			let mapCoordinates;
			const commandgetMapCoordinates = {};
			const commandGetBase64Image = {};

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

					commandgetMapCoordinates["command"] = "getMapCoordinates";
					commandgetMapCoordinates["parameters"] = {};
					selectedElement = document.getElementById("robotSelect");
					commandgetMapCoordinates.duid = selectedElement.value;
					socket.send(JSON.stringify(commandgetMapCoordinates));

					commandGetBase64Image["command"] = "getbase64Image";
					commandGetBase64Image.duid = selectedElement.value;
					socket.send(JSON.stringify(commandGetBase64Image));
					break;

				case "mapCoordinates":
					mapCoordinates = data.parameters;
					left = mapCoordinates[0];
					topMap = mapCoordinates[1] + 102; // I might need to fix this. This has some offset i did not figure out yet
					mapOffsetX = mapCoordinates[2];
					mapOffsetY = mapCoordinates[3];
					mapSizeX = mapCoordinates[4];
					mapSizeY = mapCoordinates[5];
					console.log("Map coords: " + JSON.stringify(mapCoordinates));
					drawBackgroundImage();
					break;

				case "base64Image":
					base64Image = data.parameters[0];
					// drawBackgroundImage();
					break;
			}

		};

		socket.onclose = () => {
			console.log("Disconnected from WebSocket server");
		};


		const canvas = document.getElementById("myCanvas");
		const ctx = canvas.getContext("2d");

		// drawBackgroundImage();

		let rects = [];
		let zones = [];
		let isDragging = false;
		let isResizing = false;
		let selectedRect = null;
		let offsetX, offsetY;
		const resizeSquareBorderWidth = 5;

		canvas.addEventListener("mousedown", function(e) {
			console.log("mousedown");
			const mouseX = Math.round(e.clientX / zoomLevel + mapOffsetX - 10 / zoomLevel); // IMPORTANT!!!: subtract - 10 because that's the 8px margin of body and 2px margin of the canvas
			const mouseY = Math.round(e.clientY / zoomLevel + mapOffsetY - 10 / zoomLevel); // IMPORTANT!!!: subtract - 10 because that's the 8px margin of body and 2px margin of the canvas
			console.log("mousedown pos - x: " + mouseX + " y: " + mouseY);

			for (let i = 0; i < rects.length; i++) {
				const rect = rects[i];
				const rHeight = rect.height * zoomLevel;
				const rWidth = rect.width * zoomLevel;
				console.log("rect: " + JSON.stringify(rect));

				offsetX = rect.x - mouseX;
				offsetY = rect.y - mouseY;
				console.log("mousedown offset - x: " + offsetX + " y: " + offsetY);

				if (
					mouseX > rect.x + offsetX + rWidth - resizeSquareBorderWidth * zoomLevel &&
					mouseY > rect.y + offsetY + rHeight - resizeSquareBorderWidth * zoomLevel
				) {
					console.log("Resizing");
					selectedRect = i;
					isResizing = true;
				}
				else if (
					mouseX >= rect.x &&
					mouseX <= rect.x + rWidth &&
					mouseY >= rect.y &&
					mouseY <= rect.y + rHeight
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
			drawRects();
		});

		canvas.addEventListener("mousemove", function(e) {
			const mouseX = Math.round(e.clientX / zoomLevel + mapOffsetX - 10 / zoomLevel); // IMPORTANT!!!: subtract - 10 because that's the 8px margin of body and 2px margin of the canvas
			const mouseY = Math.round(e.clientY / zoomLevel + mapOffsetY - 10 / zoomLevel); // IMPORTANT!!!: subtract - 10 because that's the 8px margin of body and 2px margin of the canvas

			if (isDragging) {
				rects[selectedRect].x = mouseX + offsetX;
				rects[selectedRect].y = mouseY + offsetY;
				console.log("rects[selectedRect].x: " + rects[selectedRect].x + " rects[selectedRect].y: " + rects[selectedRect].y);

				console.log("mousemove pos - x: " + Math.round(e.clientX / zoomLevel - canvas.getBoundingClientRect().left + mapOffsetX + offsetX) + " y: " + Math.round(e.clientY / zoomLevel - canvas.getBoundingClientRect().top + mapOffsetY + offsetY));
				console.log("mousemove offset - x: " + offsetX + " y: " + offsetY);
				drawRects();
			}
			else if (isResizing) {
				console.log("rects[selectedRect].x: " + rects[selectedRect].x + " rects[selectedRect].y: " + rects[selectedRect].y);
				rects[selectedRect].width = Math.round(mouseX - rects[selectedRect].x);
				rects[selectedRect].height = Math.round(mouseY - rects[selectedRect].y);
				drawRects();

				console.log("resizing - mouseX: " + mouseX + ", mouseY: " + mouseY);
			}
		});

		const deleteButton = document.getElementById("deleteButton");
		deleteButton.addEventListener("click", function(e) {
			if (!rects[selectedRect]) {
				return;
			}
			rects = rects.filter(rect => rect != rects[selectedRect]);
			selectedRect = null;
			drawRects();
		});

		const addButton = document.getElementById("addButton");
		addButton.addEventListener("click", function(e) {
			// const square = canvas.getContext("2d");
			const x = mapOffsetX + 25;
			const y = mapOffsetY + 25;

			rects.push({ x, y, width: 25, height: 25 });
			drawRects();
		});

		const start = document.getElementById("startButton");
		start.addEventListener("click", function(e) {
			drawRects(); // just be sure that all squares are up to date. Like after select the clean count etc.
			const data = {};
			data.duid = selectedElement.value;
			data.command = "app_zoned_clean";
			data.parameters = zones;
			socket.send(JSON.stringify(data));
		});

		function drawBackgroundImage() {
			const image = new Image();
			image.src = base64Image;
			image.onload = function() {
				canvas.width = image.width;
				canvas.height = image.height;
				// ctx.drawImage(image, 0, 0);

				// Get the aspect ratio of the canvas
				const aspectRatio = canvas.width / canvas.height;

				// Get the aspect ratio of the content
				const contentAspectRatio = mapSizeX / mapSizeY;

				// Determine the zoom level based on the aspect ratios
				if (contentAspectRatio < aspectRatio) {
					zoomLevel = canvas.width / (mapSizeX - mapOffsetX);
				} else {
					zoomLevel = canvas.height / (mapSizeY - mapOffsetY);
				}
				console.log("Zoom level: " + zoomLevel);
				console.log("canvas.width: " + canvas.width, "mapSizeX: " + mapSizeX, "canvas.height: " + canvas.height, "mapSizeY: " + mapSizeY);
				console.log("mapOffsetX: " + mapOffsetX, "mapOffsetY: " + mapOffsetY);
				console.log("canvas.width / (mapSizeX - mapOffsetX): " + canvas.width / (mapSizeX - mapOffsetX), "canvas.height / (mapSizeY - mapOffsetY): " + canvas.height / (mapSizeY - mapOffsetY));

				canvas.style.backgroundImage = `url(${base64Image})`;
				canvas.style.backgroundRepeat = "no-repeat";
				// canvas.style.backgroundSize = "cover";
				canvas.style.backgroundSize = `${canvas.width * zoomLevel}px ${canvas.height * zoomLevel}px`;

				canvas.style.backgroundPosition = `${(- mapOffsetX) * zoomLevel}px ${(- mapOffsetY + 1) * zoomLevel}px`;
			};
		}

		function getSquareZone(rect, canvasHeight)
		{
			// offset 8 because i don't know
			const offset = 8;
			const x1 = rect.x + offset;
			const y1 = rect.y + offset;
			const x2 = rect.x + offset + rect.width;
			const y2 = rect.y + offset + rect.height;

			const xLine1 = (left + x1) * 50;
			const yLine1 = (topMap + canvasHeight - y1) * 50;
			const xLine2 = (left + x2) * 50;
			const yLine2 = (topMap + canvasHeight - y2) * 50;

			const zone = [];
			zone.push(xLine1);
			zone.push(yLine2);
			zone.push(xLine2);
			zone.push(yLine1);
			zone.push(parseInt(document.getElementById("cleanCount").value)); // clean count

			zones.push(zone);
		}

		function drawRects() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			zones = [];

			for (let i = 0; i < rects.length; i++) {
				const rect = rects[i];

				ctx.fillStyle = "white";
				ctx.globalAlpha = 0.5;
				ctx.fillRect((rect.x - mapOffsetX) * zoomLevel, (rect.y - mapOffsetY)*zoomLevel, rect.width*zoomLevel, rect.height*zoomLevel);
				ctx.lineWidth = 1;
				ctx.strokeStyle = "white";
				ctx.strokeRect((rect.x - mapOffsetX)* zoomLevel, (rect.y - mapOffsetY)*zoomLevel, rect.width*zoomLevel, rect.height*zoomLevel);

				ctx.fillStyle = "red";
				ctx.beginPath();
				ctx.arc((rect.x - mapOffsetX)*zoomLevel + rect.width*zoomLevel, (rect.y - mapOffsetY)*zoomLevel + rect.height*zoomLevel, 5, 0, 2 * Math.PI);
				ctx.fill();

				getSquareZone(rect, canvas.height);
			}
			console.log("Zones: " + JSON.stringify(zones));
		}

		async function getLocalIp() {
			try {
				const response = await fetch("http://" + window.location.hostname + ":6824/ip/");
				const data = await response.json();
				return data.ip;
			} catch (error) {
				console.error(error);
			}
		}
	})();
};