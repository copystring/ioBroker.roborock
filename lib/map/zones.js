/* eslint-disable no-undef */
let base64Image;
let selectedElement;
let hostedIP;
let left, topMap, mapOffsetX, mapOffsetY, mapSizeX, mapSizeY;
let zoomLevel = 1.5;



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
					topMap = mapCoordinates[1];
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

		async function localCoordsToRobotCoords(imagePoint) {
			const image = new Image();
			image.src = base64Image;
			const point = {};
			await new Promise(resolve => {
				image.onload = function() {
					const canvasOffsetX = canvas.getBoundingClientRect().left;
					const canvasOffsetY = canvas.getBoundingClientRect().top;
					const xLoc = Math.round((image.width * zoomLevel - imagePoint.x * zoomLevel - canvasOffsetX * zoomLevel) / zoomLevel);
					const yLoc = Math.round((image.height * zoomLevel - imagePoint.y * zoomLevel - canvasOffsetY * zoomLevel) / zoomLevel);

					const xPos = Math.round((left + image.width - xLoc) * 50.0);
					const yPos = Math.round((topMap + yLoc) * 50.0);
					point.x = xPos;
					point.y = yPos;
					resolve();
				};
			});
			return point;
		}

		function getMouseX(e) {
			return Math.round(e.clientX / zoomLevel + mapOffsetX - (canvas.getBoundingClientRect().left + 2) / zoomLevel);
		}
		function getMouseY(e) {
			return Math.round(e.clientY / zoomLevel + mapOffsetY - (canvas.getBoundingClientRect().top + 2) / zoomLevel);
		}

		let rects = [];
		let zones = [];
		let isDragging = false;
		let isResizing = false;
		let selectedRect = null;
		let offsetX, offsetY;
		const resizeSquareBorderWidth = 5;

		canvas.addEventListener("mousedown", function(e) {
			const mouseX = getMouseX(e);
			const mouseY = getMouseY(e);


			for (let i = 0; i < rects.length; i++) {
				const rect = rects[i];

				offsetX = mouseX - rect.x;
				offsetY = mouseY - rect.y;
				console.log("rect: " + JSON.stringify(rect));
				console.log("mousedown pos - x: " + mouseX + " y: " + mouseY);
				console.log("mousedown offset - x: " + offsetX + " y: " + offsetY);
				console.log("left offset: " + canvas.getBoundingClientRect().left + " top offset: " + canvas.getBoundingClientRect().top);

				if (
					mouseX > rect.x + rect.width - resizeSquareBorderWidth &&
					mouseY > rect.y + rect.height - resizeSquareBorderWidth &&
					mouseX < rect.x + rect.width + resizeSquareBorderWidth &&
					mouseY < rect.y + rect.height + resizeSquareBorderWidth
				) {
					console.log("Resizing");
					offsetX = mouseX - rect.x - rect.width;
					offsetY = mouseY - rect.y - rect.height;
					selectedRect = i;
					isResizing = true;
				}
				else if (
					mouseX >= rect.x &&
					mouseX <= rect.x + rect.width &&
					mouseY >= rect.y &&
					mouseY <= rect.y + rect.height
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
			const mouseX = getMouseX(e);
			const mouseY = getMouseY(e);

			if (isDragging) {
				rects[selectedRect].x = mouseX - offsetX;
				rects[selectedRect].y = mouseY - offsetY;
				drawRects();
			}
			else if (isResizing) {
				rects[selectedRect].width = Math.round(mouseX - rects[selectedRect].x - offsetX);
				rects[selectedRect].height = Math.round(mouseY - rects[selectedRect].y - offsetY);
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
			const x = mapOffsetX + 25;
			const y = mapOffsetY + 25;

			rects.push({ x, y, width: 25, height: 25 });
			drawRects();
		});

		const start = document.getElementById("startButton");
		start.addEventListener("click", function(e) {
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
				// Get the image data and calculate the actual dimensions of the image
				const tempCanvas = document.createElement("canvas");
				tempCanvas.width = image.width;
				tempCanvas.height = image.height;
				const tempCtx = tempCanvas.getContext("2d");
				tempCtx.drawImage(image, 0, 0);
				const imageData = tempCtx.getImageData(0, 0, canvas.width, canvas.height);
				mapOffsetX = canvas.width;
				mapOffsetY = canvas.height;
				let maxX = 0, maxY = 0;
				for (let y = 0; y < canvas.height; y++) {
					for (let x = 0; x < canvas.width; x++) {
						const index = (y * canvas.width + x) * 4;
						if (imageData.data[index+3] > 0) { // Check if the alpha value is non-zero
							mapOffsetX = Math.min(mapOffsetX, x);
							mapOffsetY = Math.min(mapOffsetY, y);
							maxX = Math.max(maxX, x);
							maxY = Math.max(maxY, y);
						}
					}
				}
				mapSizeX = maxX - mapOffsetX + 1;
				mapSizeY = maxY - mapOffsetY + 1;
				console.log("Image data mapOffsetX: " + mapOffsetX + " mapOffsetY: " + mapOffsetY + " maxX: " + maxX + " maxY: " + maxY);

				const aspectRatio = canvas.width / canvas.height;

				const contentAspectRatio = mapSizeX / mapSizeY;

				if (contentAspectRatio > aspectRatio) {
					zoomLevel = canvas.width / mapSizeX;
				} else {
					zoomLevel = canvas.height / mapSizeY;
				}

				// Create a temporary canvas to draw the truncated image
				const truncatedCanvas = document.createElement("canvas");
				truncatedCanvas.width = mapSizeX;
				truncatedCanvas.height = mapSizeY;
				const truncatedCtx = truncatedCanvas.getContext("2d");
				truncatedCtx.drawImage(image, mapOffsetX, mapOffsetY, mapSizeX, mapSizeY, 0, 0, mapSizeX, mapSizeY);

				// Set the canvas background to the truncated image
				const backgroundWidth = Math.round(mapSizeX * zoomLevel);
				const backgroundHeight = Math.round(mapSizeY * zoomLevel);
				canvas.style.backgroundImage = `url(${truncatedCanvas.toDataURL()})`;
				canvas.style.backgroundSize = `${backgroundWidth}px ${backgroundHeight}px`;
				canvas.style.backgroundPosition = "0 0";
				canvas.style.backgroundRepeat = "no-repeat";
			};
		}

		function getSquareZone(rect)
		{
			const image = new Image();
			image.src = base64Image;

			const canvasOffsetX = canvas.getBoundingClientRect().left;
			const canvasOffsetY = canvas.getBoundingClientRect().top;
			const rectMin = {}, rectMax = {};
			rectMin.x = rect.x - canvasOffsetX;
			rectMin.y = rect.y - canvasOffsetY;
			rectMax.x = rect.x - canvasOffsetX + rect.width;
			rectMax.y = rect.y - canvasOffsetY + rect.height;
			const zone = [];
			let lineleft;
			let lineBottom;
			let lineRight;
			let lineTop;
			localCoordsToRobotCoords(rectMin)
				.then(point => {
					lineleft = point.x;
					lineTop = point.y;
					zone.push(lineleft);
				})
				.catch(error => {
					console.error("Error: " + error);
				});

			localCoordsToRobotCoords(rectMax)
				.then(point => {
					lineRight = point.x;
					lineBottom = point.y;
					zone.push(lineBottom);
					zone.push(lineRight);
					zone.push(lineTop);
					zone.push(parseInt(document.getElementById("cleanCount").value)); // clean count
					zones.push(zone);
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
				const rectMinX = (rect.x - mapOffsetX) * zoomLevel;
				const rectMinY = (rect.y - mapOffsetY) * zoomLevel;
				const rectMaxX = rect.width*zoomLevel;
				const rectMaxY = rect.height*zoomLevel;

				ctx.fillStyle = "white";
				ctx.globalAlpha = 0.5;
				ctx.fillRect(rectMinX, rectMinY, rectMaxX, rectMaxY);
				ctx.lineWidth = 1;
				ctx.strokeStyle = "white";
				ctx.strokeRect(rectMinX, rectMinY, rectMaxX, rectMaxY);

				ctx.fillStyle = "red";
				ctx.beginPath();
				ctx.arc(rectMinX + rectMaxX, rectMinY + rectMaxY, 5, 0, 2 * Math.PI);
				ctx.fill();

				console.log("Square position: " + JSON.stringify(rect));

				getSquareZone(rect);
			}
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