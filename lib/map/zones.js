
let /* map, */ mapBase64, selectedElement, hostedIP;
let left, topMap, mapMinX, mapMinY, mapSizeX, mapSizeY;
let zoomLevel = 0.55;
let scaleFactor = 2;

let canvasOffsetX, canvasOffsetY;


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
					console.log(data.map.val[0]);

					mapBase64 = data.base64.val;
					// map = data.map;
					scaleFactor = data.scale;
					left = data.map.val[0].image.position.left;
					topMap = data.map.val[0].image.position.top;
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
					const xLoc = image.width / scaleFactor - imagePoint.x;
					const yLoc = (image.height) / scaleFactor - imagePoint.y;

					const xPos = Math.round((left + image.width / scaleFactor - xLoc) * 50.0);
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

			localCoordsToRobotCoords({x: mouseX, y: mouseY})
				.then(point => {
					console.log("mousedown robot pos: " + JSON.stringify(point));
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
					offsetX > rect.width - resizeSquareBorderWidth &&
					offsetX <= rect.width + resizeSquareBorderWidth &&
					offsetY > rect.height - resizeSquareBorderWidth &&
					offsetY <= rect.height + resizeSquareBorderWidth
				) {
					console.log("Resizing");
					offsetX = e.pageX - rect.x - rect.width;
					offsetY = e.pageY - rect.y - rect.height;
					selectedRect = i;
					isResizing = true;
				}
				else if (
					offsetX > 0 &&
					offsetX <= rect.width + 2 &&
					offsetY > 0 &&
					offsetY <= rect.height + 2
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

				console.log("resizing - mouseX: " + mouseX + ", mouseY: " + mouseY);
			}
		});

		const deleteButton = document.getElementById("deleteButton");
		deleteButton.addEventListener("click", function() {
			if (!rects[selectedRect]) {
				return;
			}
			rects = rects.filter(rect => rect != rects[selectedRect]);
			selectedRect = null;
			drawRects();
		});

		const addButton = document.getElementById("addButton");
		addButton.addEventListener("click", function() {
			const x = (Math.round((186 * scaleFactor - mapMinX) * zoomLevel) + canvasOffsetX + 2);
			const y = (Math.round((184 * scaleFactor - mapMinY) * zoomLevel) + canvasOffsetY + 3);
			const width = Math.round(25 * scaleFactor * zoomLevel);
			const height = Math.round(25 * scaleFactor * zoomLevel);
			// const x = 25;
			// const y = 25;
			// const width = 25;
			// const height = 25;

			rects.push({ x: x, y: y, width: width, height: height });
			console.log("Square spawned at: " + x + ":" + y);
			drawRects();
		});

		const start = document.getElementById("startButton");
		start.addEventListener("click", function() {
			const data = {};
			data.duid = selectedElement.value;
			data.command = "app_zoned_clean";
			data.parameters = zones;
			console.log(JSON.stringify(zones));
			socket.send(JSON.stringify(data));
		});

		function drawBackgroundImage() {
			const image = new Image();
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
			// rectMin.x = rect.x;
			rectMin.x = Math.round(rect.x / (mapSizeX / mapSizeY) / scaleFactor / zoomLevel + (mapMinX / scaleFactor));
			rectMin.y = Math.round(rect.y / (mapSizeX / mapSizeY) / scaleFactor / zoomLevel + (mapMinY / scaleFactor));
			rectMax.x = Math.round(rect.width / scaleFactor / zoomLevel) + rectMin.x;
			rectMax.y = Math.round(rect.height / scaleFactor / zoomLevel) + rectMin.y;

			console.log("rect.x: " + rect.x);
			console.log("rectMin.x: " + rectMin.x);
			console.log("rect.y: " + rect.y);
			console.log("rectMin.y: " + rectMin.y);

			console.log("rectMax.x: " + rectMax.x);
			console.log("rectMax.y: " + rectMax.y);


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
					console.log("zone: " + JSON.stringify(zone));
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
				const rectMinX = rect.x - canvasOffsetX - 1;
				const rectMinY = rect.y - canvasOffsetY - 1;
				const rectWidth = rect.width;
				const rectHeight = rect.height;

				ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
				// ctx.globalAlpha = 0.5;
				ctx.fillRect(rectMinX, rectMinY, rectWidth, rectHeight);
				ctx.lineWidth = zoomLevel * scaleFactor;
				ctx.strokeStyle = "rgba(255, 255, 255, 1)";
				ctx.strokeRect(rectMinX, rectMinY, rectWidth, rectHeight);

				ctx.fillStyle = "red";
				ctx.beginPath();
				ctx.arc(rectMinX + rectWidth, rectMinY + rectHeight, 5, 0, 2 * Math.PI);
				ctx.fill();

				console.log("Square position: " + JSON.stringify(rect));

				convertToRobotZone(rect);
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