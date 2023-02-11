/* eslint-disable no-undef */
let base64Image;
let selectedElement;
let mapCoordinates;
let hostedIP;

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
					console.log("Map coords: " + JSON.stringify(mapCoordinates));
					break;

				case "base64Image":
					base64Image = data.parameters[0];
					drawBackgroundImage();
					break;
			}

		};

		socket.onclose = () => {
			console.log("Disconnected from WebSocket server");
		};


		const canvas = document.getElementById("myCanvas");
		const ctx = canvas.getContext("2d");

		drawBackgroundImage();

		let rects = [];
		let zones = [];
		let isDragging = false;
		let isResizing = false;
		let selectedRect = null;
		let startX, startY, offsetX, offsetY;
		const resizeSquareBorderWidth = 5;

		canvas.addEventListener("mousedown", function(e) {
			console.log("mousedown");

			startX = e.clientX;
			startY = e.clientY;
			for (let i = 0; i < rects.length; i++) {
				const rect = rects[i];
				console.log("rect: " + JSON.stringify(rect));

				if (
					startX > rect.x &&
					startX < rect.x + rect.width &&
					startY > rect.y &&
					startY < rect.y + rect.height
				) {
					console.log("Square selected: " + i);
					selectedRect = rect;
					offsetX = startX - rect.x;
					offsetY = startY - rect.y;
					isDragging = true;
					break;
				}
				else if (
					startX > rect.x + rect.width - resizeSquareBorderWidth &&
					startY > rect.y + rect.height - resizeSquareBorderWidth
				) {
					console.log("Resizing");
					selectedRect = rect;
					offsetX = startX - rect.x;
					offsetY = startY - rect.y;
					isResizing = true;
				}
			}
		});

		canvas.addEventListener("mouseup", function() {
			isDragging = false;
			isResizing = false;
		});

		canvas.addEventListener("mousemove", function(e) {
			if (isDragging) {
				const x = e.clientX - canvas.getBoundingClientRect().left - offsetX;
				const y = e.clientY - canvas.getBoundingClientRect().top - offsetY;
				selectedRect.x = x;
				selectedRect.y = y;
				drawRects();
				// console.log("dragging - x: " + x + ", y: " + y);
			}
			else if (isResizing) {
				const posX = e.clientX - canvas.getBoundingClientRect().left;
				const posY = e.clientY - canvas.getBoundingClientRect().top;
				selectedRect.width = posX - selectedRect.x;
				selectedRect.height = posY - selectedRect.y;
				drawRects();

				console.log("resizing - x: " + posX + ", y: " + posY);
			}
		});

		const deleteButton = document.getElementById("deleteButton");
		deleteButton.addEventListener("click", function(e) {
			if (!selectedRect) {
				return;
			}
			rects = rects.filter(rect => rect != selectedRect);
			selectedRect = null;
			drawRects();
		});

		const addButton = document.getElementById("addButton");
		addButton.addEventListener("click", function(e) {
			// const square = canvas.getContext("2d");
			const width = 100;
			const height = 100;
			const x = canvas.width / 2 - width / 2;
			const y = canvas.height / 2 - height / 2;

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
				ctx.drawImage(image, 0, 0);
			};
			canvas.style.backgroundImage = `url(${base64Image})`;
			canvas.style.backgroundRepeat = "no-repeat";
			canvas.style.backgroundSize = "cover";
		}

		function getSquareZone(rect, canvasHeight)
		{
			const x1 = rect.x;
			const y1 = rect.y;
			const x2 = rect.x + rect.width;
			const y2 = rect.y + rect.height;

			const left = mapCoordinates[0];
			const top = mapCoordinates[1] + 102; // I might need to fix this. This has some offset i did not figure out yet
			console.log("left: " + left + " top: " + top);

			// const top = 357;
			// const left = 262;

			const xLine1 = (left + x1) * 50;
			const yLine1 = (top + canvasHeight - y1) * 50;
			const xLine2 = (left + x2) * 50;
			const yLine2 = (top + canvasHeight - y2) * 50;

			const zone = [];
			zone.push(xLine1);
			zone.push(yLine2);
			zone.push(xLine2);
			zone.push(yLine1);
			zone.push(document.getElementById("cleanCount").value); // clean count

			console.log("x1: " + x1 + " y1: " + y1 + " x2: " + x2 + " y2: " + y2);
			console.log(JSON.stringify(zone));
			zones.push(zone);
		}

		function drawRects() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			zones = [];

			for (let i = 0; i < rects.length; i++) {
				const rect = rects[i];
				ctx.fillStyle = "white";
				ctx.globalAlpha = 0.5;
				ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
				ctx.lineWidth = 1;
				ctx.strokeStyle = "white";
				ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);

				ctx.fillStyle = "red";
				ctx.beginPath();
				ctx.arc(rect.x + rect.width, rect.y + rect.height, 5, 0, 2 * Math.PI);
				ctx.fill();

				getSquareZone(rect, canvas.height);

				// const resizeCorner = rect.getContext("2d");
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