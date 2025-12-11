// src/lib/roomColoring.ts

/**
 * Standard Roborock color palette (Dark Mode style).
 * Index 0 is the background/default. Indices 1-4 are the main room colors.
 */
export const ROBOROCK_PALETTE = [
	"#DFDFDFff", // 0: Default (background/no color)
	"#50A4FF", // 1: Blue
	"#FF744D", // 2: Orange
	"#008FA8", // 3: Cyan
	"#F5AF10", // 4: Yellow
	"#E9E9E9ff", // 5: Reserve/Fallback
];

/**
 * Defines the input data required for the coloring algorithm.
 */
export interface ColoringData {
	/** The highest segment ID (defines the size of the adjacency matrix). Usually 32. */
	maxBlockNum: number;
	/**
	 * A flat (row-major) adjacency matrix (size * size).
	 * neighborInfo[a * size + b] === 1 if room 'a' and room 'b' are neighbors.
	 */
	neighborInfo: number[];
	/** An array storing the pixel count (area) for each segment ID. */
	pointsCount: number[];
}

/**
 * Defines the options for the coloring algorithm.
 */
export interface ColoringOptions {
	/** Whether segment IDs start at 1 (Roborock standard). */
	oneBased: boolean;
}

/**
 * Return structure containing the assignment results.
 */
export interface ColoringResult {
	/** Maps room ID to a logical color bucket index (1-4). */
	colorBucket: number[];
	/** Maps room ID to the final hex color string. */
	colorHex: string[];
}

/**
 * Assigns colors to rooms based on the Roborock graph coloring algorithm.
 * Ensures that adjacent rooms receive different colors where possible.
 * @param data The room topology and neighbor data.
 * @param options Configuration options (e.g. is index 1-based?).
 * @returns The color assignments (buckets and hex codes).
 */
export function assignRoborockRoomColorsToHex(data: ColoringData, options: ColoringOptions): ColoringResult {
	const { maxBlockNum, neighborInfo, pointsCount } = data;
	const { oneBased } = options;

	const numColors = 4; // Algorithm is strictly designed for 4 colors + 1 "no color"
	const idOffset = oneBased ? 1 : 0;
	const matrixSize = maxBlockNum;

	// colorData stores the assigned logical color index (1-4) for each room ID.
	const colorData = new Array(matrixSize).fill(0);

	// 1. Calculate neighbor counts for each room to prioritize coloring
	// [roomID, neighborCount]
	const neighbourColorSet: [number, number][] = [];

	for (let i = idOffset; i < matrixSize; i++) {
		let count = 0;
		for (let j = idOffset; j < matrixSize; j++) {
			if (i !== j && neighborInfo[i * matrixSize + j] === 1) {
				count++;
			}
		}
		neighbourColorSet.push([i, count]);
	}

	// Sort rooms by number of neighbors descending (most connected rooms first)
	neighbourColorSet.sort((a, b) => b[1] - a[1]);

	// 2. Find the largest room by area (pixel count)
	let maxIndex = 0;
	let maxPointsCount = 0;

	for (let i = idOffset; i < matrixSize; i++) {
		if (pointsCount[i] > maxPointsCount) {
			maxPointsCount = pointsCount[i];
			maxIndex = i;
		}
	}

	// 3. Assign the first color (index 1) to the largest room immediately
	if (maxIndex >= idOffset && maxIndex < matrixSize) {
		colorData[maxIndex] = 1;
	}

	// Buckets for tracking which rooms are assigned to which color index (0-3 mapped to colors 1-4)
	const colorUsed: number[][] = Array.from({ length: numColors }, () => []);

	if (maxIndex >= idOffset && maxIndex < matrixSize) {
		colorUsed[0].push(maxIndex);
	}

	// 4. Main Greedy Coloring Loop
	for (const [roomId] of neighbourColorSet) {
		// Skip the largest room as it is already colored
		if (roomId === maxIndex) continue;

		// Check if the room actually exists (diagonal element must be 1, or check logic)
		// If neighborInfo[i][i] == 0, the room is considered empty/non-existent
		if (neighborInfo[roomId * matrixSize + roomId] === 0) {
			colorData[roomId] = 0;
			continue;
		}

		// Determine which colors are blocked by neighbors
		const colorOccupied = new Array(numColors + 1).fill(0);

		for (const [otherRoomId] of neighbourColorSet) {
			// If 'otherRoomId' is a neighbor of 'roomId' AND has a color assigned
			if (neighborInfo[otherRoomId * matrixSize + roomId] !== 0 && colorData[otherRoomId] !== 0) {
				colorOccupied[colorData[otherRoomId]] = 1;
			}
		}

		// Find the first available color (1-4)
		let assigned = false;
		for (let j = 1; j <= numColors; j++) {
			if (colorOccupied[j] === 0) {
				colorData[roomId] = j;
				colorUsed[j - 1].push(roomId);
				assigned = true;
				break;
			}
		}

		// Fallback: If all colors are taken, force color 1
		if (!assigned) {
			colorData[roomId] = 1;
			if (colorUsed[0]) {
				colorUsed[0].push(roomId);
			}
		}
	}

	// --- START: Balancing Logic (Distribute colors evenly) ---

	// 5. First Balancing Step: Fill empty color buckets
	for (let i = 0; i < numColors; i++) {
		if (colorUsed[i].length === 0) {
			const sourceID = Math.floor((i + 1) / 2) - 1;

			if (sourceID < 0 || sourceID >= numColors || colorUsed[sourceID].length <= 1) continue;

			const sourceLength = colorUsed[sourceID].length;
			const startIndex = Math.floor(sourceLength / 2);

			const itemsToMove: number[] = [];
			for (let j = sourceLength - 1; j >= startIndex; j--) {
				itemsToMove.push(colorUsed[sourceID][j]);
			}

			for (let k = itemsToMove.length - 1; k >= 0; k--) {
				colorUsed[i].push(itemsToMove[k]);
			}

			for (let j = 0; j < itemsToMove.length; j++) {
				colorUsed[sourceID].pop();
			}
		}
	}

	// 6. Second Balancing Step: Move from largest bucket to empty bucket
	let maxLength = 0;
	let maxID = 0;
	let zeroID = -1;

	for (let i = 0; i < numColors; i++) {
		if (colorUsed[i].length > maxLength) {
			maxLength = colorUsed[i].length;
			maxID = i;
		}
		if (colorUsed[i].length === 0) zeroID = i;
	}

	if (maxLength >= 2 && zeroID !== -1) {
		while (colorUsed[maxID].length > colorUsed[zeroID].length) {
			const itemToMove = colorUsed[maxID].pop();
			if (itemToMove !== undefined) {
				colorUsed[zeroID].push(itemToMove);
			} else {
				break;
			}
		}
	}

	// --- END: Balancing Logic ---

	// 7. Final Assignment: Rewrite colorData based on balanced buckets
	for (let i = 0; i < numColors; i++) {
		for (const blockIndex of colorUsed[i]) {
			if (blockIndex >= 0 && blockIndex < matrixSize) {
				colorData[blockIndex] = i + 1;
			}
		}
	}

	// 8. Generate Hex Colors
	const colorHex = new Array(matrixSize).fill(ROBOROCK_PALETTE[0]);

	for (let i = idOffset; i < matrixSize; i++) {
		const colorIndex = colorData[i];

		if (colorIndex > 0 && colorIndex < ROBOROCK_PALETTE.length) {
			colorHex[i] = ROBOROCK_PALETTE[colorIndex];
		} else if (colorIndex !== 0) {
			// Fallback for indices outside range (wrap around 1-4)
			colorHex[i] = ROBOROCK_PALETTE[1 + ((colorIndex - 1) % numColors)];
		}
	}

	return {
		colorBucket: colorData,
		colorHex: colorHex,
	};
}
