/* eslint-disable no-undef */
const base64Image = "data:image/png;base64,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"
let selectedElement;
let mapCoordinates;


window.onload = function() {
	// @ts-ignore
	const socket = new WebSocket("ws://localhost:7906");

	socket.onopen = () => {
		console.log("Connected to WebSocket server");

		const commandGetRobots = {};
		commandGetRobots["command"] = "getRobots";
		socket.send(JSON.stringify(commandGetRobots));

	};

	socket.onmessage = (event) => {
		console.log(`Received message: ${event.data}`);
		const data = JSON.parse(event.data);
		const command = data.command;
		console.log(`Received message command: ${command}`);
		const commandgetMapCoordinates = {};

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
				break;

			case "mapCoordinates":
				mapCoordinates = data.parameters;
				console.log("Map coords: " + JSON.stringify(mapCoordinates));
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
			ctx.lineWidth = 2;
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
};