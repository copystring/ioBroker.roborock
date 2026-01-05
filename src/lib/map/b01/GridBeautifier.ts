import { Point as IPoint } from "../MapHelper";

export const CONSTANTS = {
	BLACK: -128,
	WHITE: 127,
	BOUNDARY: -2,
};

export interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface ChainPoint {
    chain_point: Point;
}

export interface DoorInfo {
    door_point: Point[];
    area_id: number[];
}

export interface RoomInfo {
    tid: number;
    center_pose: Point;
    chain_infor: ChainPoint[];
    door_info: DoorInfo[];
}

export interface TMapStruct {
    map: Int8Array | Uint8Array;
    x_min: number;
    x_max: number;
    y_min: number;
    y_max: number;
    resolution: number;
    info: RoomInfo[] | null;
}

export class Point implements IPoint {
	x: number;
	y: number;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
}

export function beautify(tMapStruct: TMapStruct): { result: Int8Array | Uint8Array } {
	let map = tMapStruct.map;
	let tRect: Rect = { x: 0, y: 0, width: 0, height: 0 };
	const x_min = tMapStruct.resolution * Math.round(tMapStruct.x_min / tMapStruct.resolution);
	const y_min = tMapStruct.resolution * Math.round(tMapStruct.y_min / tMapStruct.resolution);
	const resolution = tMapStruct.resolution;
	const size_x = parseInt(Math.round((tMapStruct.x_max - tMapStruct.x_min) / tMapStruct.resolution).toString());
	const size_y = parseInt(Math.round((tMapStruct.y_max - tMapStruct.y_min) / tMapStruct.resolution).toString());

	let black_boundary: any[] = [];
	let non_boundary_noise: any[] = [];
	let all_region: any[] = [];

	const m_four_Dir = [[0, -1], [-1, 0], [1, 0], [0, 1]];
	const m_eight_Dir = [[1, 0], [-1, 0], [0, 1], [0, -1], [-1, -1], [1, -1], [-1, 1], [1, 1]];

	const findRoiMap_result = findRoiMap(tRect, map, size_x, size_y);
	tRect = findRoiMap_result.result;

	const expandBlackRect_result = expandBlackRect(4, 4, map[0], tRect, map, size_x, size_y);
	map = expandBlackRect_result.result;
	const expandWhiteRect_result = expandWhiteRect(4, 4, map[0], tRect, map, size_x, size_y);
	map = expandWhiteRect_result.result;

	const refineBoundary_reult1 = refineBoundary(0, 10, tRect, map, size_x);
	map = refineBoundary_reult1.result;

	const result = eliminateNonBoundaryNoise(non_boundary_noise, tRect, CONSTANTS.WHITE, CONSTANTS.BLACK, 0, map, size_x);
	non_boundary_noise = result.tempnonBoundaryNoise;
	map = result.map;

	const expandSingleConvexBoundary_result = expandSingleConvexBoundary(50, CONSTANTS.BLACK, 4, 4, tRect, map, size_x);
	map = expandSingleConvexBoundary_result.result;
	if(typeof global !== "undefined") (global as any).mapSnapshotOrig = new Int8Array(map);

	const all_region_result = findWhiteConnectComponent(all_region, 150, tRect, size_x, map);
	all_region = all_region_result.result;

	const result1 = removeIndependentRegion(all_region, black_boundary, 2, tRect, map, size_x);
	black_boundary = result1.temp_black_boundary;
	map = result1.map;

	const result2 = fillNonBoundaryNoise2(non_boundary_noise, tRect, map, size_x);
	non_boundary_noise = result2.nonBoundaryNoise;
	map = result2.map;

	const refineBoundary_result2 = refineBoundary(0, 10, tRect, map, size_x);
	map = refineBoundary_result2.result;

	const fillBlackComponent_result = fillBlackComponent(map, black_boundary, CONSTANTS.BLACK, size_x);
	map = fillBlackComponent_result.result;

	const filterSmallAreas_result = filterSmallAreas(map, tRect, size_x, size_y, m_four_Dir, m_eight_Dir);
	map = filterSmallAreas_result.result;

	const fillInternalObstacles_result = fillInternalObstacles(map, tRect, size_x);
	map = fillInternalObstacles_result.result;

	if (tMapStruct.info) {
		const roomColorByChainAndDoor_result = roomColorByChainAndDoor(tMapStruct.info, map, size_x, size_y, x_min, y_min, resolution);
		map = roomColorByChainAndDoor_result.map;
	}

	return {result: map};
}

function findRoiMap(rect: Rect, map: Int8Array | Uint8Array, size_x: number, size_y: number): { result: Rect } {
	let top_bound = size_x;
	let bottom_bound = 0;
	let left_bound = size_y;
	let right_bound = 0;

	for (let idx = 0; idx < size_x; idx++) {
		for (let idy = 0; idy < size_y; idy++) {
			if (map[idy * size_x + idx] != 0) {
				if (left_bound > idy - 10) {
					if (idx - 10 >= 0) {
						left_bound = idy - 10;
					} else {
						left_bound = 0;
					}
				} else {
					break;
				}
			}
		}
	}

	for (let idx = 0; idx < size_x; idx++) {
		for (let idy = size_y - 1; idy > 0; idy--) {
			if (map[idy * size_x + idx] != 0) {
				if (right_bound < idy + 10) {
					if (idy + 10 < size_y) {
						right_bound = idy + 10;
					} else {
						right_bound = size_y - 1;
					}
				} else {
					break;
				}
			}
		}
	}

	for (let idy = 0; idy < size_y; idy++) {
		for (let idx = 0; idx < size_x; idx++) {
			if (map[idy * size_x + idx] != 0) {
				if (top_bound > idx - 10) {
					if (idx - 10 >= 0) {
						top_bound = idx - 10;
					} else {
						top_bound = 0;
					}
				} else {
					break;
				}
			}
		}
	}

	for (let idy = 0; idy < size_y; idy++) {
		for (let idx = size_x - 1; idx > 0; idx--) {
			if (map[idy * size_x + idx] != 0) {
				if (bottom_bound < idx + 10) {
					if (idx + 10 < size_x) {
						bottom_bound = idx + 10;
					} else {
						bottom_bound = size_x - 1;
					}
				} else {
					break;
				}
			}
		}
	}

	const width = right_bound - left_bound + 1;
	const height = bottom_bound - top_bound + 1;

	if (width > 0 && height > 0 && width < size_y && height < size_x) {
		rect.x = top_bound;
		rect.y = left_bound;
		rect.width = width;
		rect.height = height;
		return {result: rect};
	} else {
		rect.x = 0;
		rect.y = 0;
		rect.width = size_y;
		rect.height = size_x;
	}
	return {result: rect};
}

function expandBlackRect(kernel_size_x: number, kernel_size_y: number, threshold: number, rect: Rect, map: any, size_x: number, size_y: number): { result: any } {
	let il, ir, jl, jr;
	if (kernel_size_x % 2 == 1) {
		ir = (kernel_size_x - 1) >> 1;
		il = -ir;
	} else {
		ir = kernel_size_x >> 1;
		il = 1 - ir;
	}
	if (kernel_size_y % 2 == 1) {
		jr = (kernel_size_y - 1) >> 1;
		jl = -jr;
	} else {
		jr = kernel_size_y >> 1;
		jl = 1 - jr;
	}

	const dst = new Array(size_x * size_y).fill(CONSTANTS.WHITE);

	for (let i = rect.y; i < rect.y + rect.width; i++) {
		for (let j = rect.x; j < rect.x + rect.height; j++) {
			if (map[i * size_x + j] < threshold) {
				for (let di = il; di <= ir; di++) {
					for (let dj = jl; dj <= jr; dj++) {
						if (i + di < 0 || i + di >= rect.y + rect.width || j + dj < 0 || j + dj >= rect.x + rect.height) {
							continue;
						}
						if (dst[(i + di) * size_x + j + dj] > map[i * size_x + j]) {
							dst[(i + di) * size_x + j + dj] = map[i * size_x + j];
						}
					}
				}
			}
		}
	}

	for (let i = 0; i < size_y; i++) {
		for (let j = 0; j < size_x; j++) {
			const index = i * size_x + j;
			if (dst[index] == CONSTANTS.WHITE) {
				dst[index] = map[index];
			}
		}
	}
	map = dst;
	return {result: map};
}

function expandWhiteRect(kernel_size_x: number, kernel_size_y: number, threshold: number, rect: Rect, map: any, size_x: number, size_y: number): { result: any } {
	let il, ir, jl, jr;
	if (kernel_size_x % 2 == 1) {
		ir = (kernel_size_x - 1) >> 1;
		il = -ir;
	} else {
		ir = kernel_size_x >> 1;
		il = 1 - ir;
	}
	if (kernel_size_y % 2 == 1) {
		jr = (kernel_size_y - 1) >> 1;
		jl = -jr;
	} else {
		jr = kernel_size_y >> 1;
		jl = 1 - jr;
	}

	const dst = new Array(size_x * size_y).fill(CONSTANTS.BLACK);

	for (let i = rect.y; i < rect.y + rect.width; i++) {
		for (let j = rect.x; j < rect.x + rect.height; j++) {
			if (map[i * size_x + j] > threshold) {
				for (let di = il; di <= ir; di++) {
					for (let dj = jl; dj <= jr; dj++) {
						if (i + di < 0 || i + di >= rect.y + rect.width || j + dj < 0 || j + dj >= rect.x + rect.height) {
							continue;
						}
						if (dst[(i + di) * size_x + j + dj] < map[i * size_x + j] && map[(i + di) * size_x + j + dj] < threshold) {
							dst[(i + di) * size_x + j + dj] = map[i * size_x + j];
						}
					}
				}
			}
		}
	}

	for (let i = 0; i < size_y; i++) {
		for (let j = 0; j < size_x; j++) {
			const index = i * size_x + j;
			if (dst[index] == CONSTANTS.BLACK) {
				dst[index] = map[index];
			}
		}
	}

	map = dst;
	return {result: map};
}

function refineBoundary(threshold_black: number, threshold_white: number, rect: Rect, map: any, size_x: number): { result: any } {
	const Qx = [];
	const Qy = [];
	let hasWhiteNeighbor;
	for (let i = rect.y; i < rect.y + rect.width; i++) {
		for (let j = rect.x; j < rect.x + rect.height; j++) {
			if (map[i * size_x + j] < threshold_black) {
				hasWhiteNeighbor = false;
				for (let di = -1; di <= 1; di++) {
					for (let dj = -1; dj <= 1; dj++) {
						if (i + di < 0 || i + di >= rect.y + rect.width || j + dj < 0 || j + dj >= rect.x + rect.height) {
							continue;
						}
						if (map[(i + di) * size_x + j + dj] > threshold_white) {
							hasWhiteNeighbor = true;
						}
					}
				}
				if (!hasWhiteNeighbor) {
					Qx.push(i);
					Qy.push(j);
				}
			}
		}
	}
	for (let i = 0; i < Qx.length; i++) {
		map[Qx[i] * size_x + Qy[i]] = 0;
	}
	return {result: map};
}

function eliminateNonBoundaryNoise(nonBoundaryNoise: Point[], rect: Rect, noise_color: number, border_color: number, outer_border_color: number, map: any, size_x: number): { map: any, tempnonBoundaryNoise: Point[] } {
	const tempnonBoundaryNoise = nonBoundaryNoise;
	for (let i = rect.y; i < rect.y + rect.width; i++) {
		for (let j = rect.x; j < rect.x + rect.height; j++) {
			if (map[i * size_x + j] == border_color) {
				if (i - 1 < 0 || i + 1 >= rect.y + rect.width || j - 1 < 0 || j + 1 >= rect.x + rect.height) {
					continue;
				}
				if (map[(i - 1) * size_x + j] != outer_border_color &&
            map[(i + 1) * size_x + j] != outer_border_color &&
            map[i * size_x + j - 1] != outer_border_color &&
            map[i * size_x + j + 1] != outer_border_color &&
            map[(i - 1) * size_x + j - 1] != outer_border_color &&
            map[(i - 1) * size_x + j + 1] != outer_border_color &&
            map[(i + 1) * size_x + j - 1] != outer_border_color &&
            map[(i + 1) * size_x + j + 1] != outer_border_color) {
					map[i * size_x + j] = noise_color;
					tempnonBoundaryNoise.push(new Point(i, j));
				}
			}
		}
	}

	return {
		map: map,
		tempnonBoundaryNoise: tempnonBoundaryNoise
	};
}

function expandSingleConvexBoundary(external_corner_value: number, fill_value: number, valid_length: number, times: number, rect: Rect, map: any, size_x: number): { result: any } {
	try {
		let contour: Point[] = [];


		let contour_map = [...map];

		const result = extractExternalContoursNewStrategy(contour_map, contour, rect, size_x);

		const isInBounds = (x: number, y: number) => (
			x >= rect.x &&
      x < rect.x + rect.height &&
      y >= rect.y &&
      y < rect.y + rect.width
		);

		for (let i = 0; i < times; i++) {
			let extract_corners: Point[] = [];
			// let contour = [];
			let fill_edges: Point[][] = [];
			const inner_corner_value = external_corner_value + 5;
			const four_neighbourhood = [[-1, 0], [1, 0], [0, -1], [0, 1]];

			let delete_point: Point[] = [];

			contour_map = result.temp_map;
			contour = result.contour;


			const corner_map = [...map];

			const result1 = extractCorners(corner_map, extract_corners, contour, external_corner_value, inner_corner_value, rect, map, size_x);


			let result2_delete_point: Point[] = [];
			result1.extract_corners.forEach((it: Point) => {
				let is_valid_length = false;
				const p_oint = it;

				for (let k = 0; k < 4; k++) {
					const temp_idy = p_oint.x + four_neighbourhood[k][0];
					const temp_idx = p_oint.y + four_neighbourhood[k][1];

					if (!isInBounds(temp_idx, temp_idy)) {
						continue;
					}

					if (result1.corner_map[temp_idy * size_x + temp_idx] == inner_corner_value) {
						const near_inner_p_oint = new Point(temp_idy, temp_idx);
						const resultInner = statisticalLineLength(result1.corner_map, near_inner_p_oint, external_corner_value, inner_corner_value, valid_length, rect, size_x);
						is_valid_length = resultInner.result;
						break;
					}
					if (k == 3) {
						is_valid_length = true;
					}
				}

				const fourNeighbourhoodSearchForExtractCorners_result = fourNeighbourhoodSearchForExtractCorners(result1.corner_map, p_oint, fill_edges, delete_point, external_corner_value, inner_corner_value, valid_length, is_valid_length, rect, map, size_x);
				const result2Internal = fourNeighbourhoodSearchForExtractCorners_result.result;
				fill_edges = result2Internal.fill_edges;
				result2_delete_point = result2Internal.delete_point;
				map = result2Internal.map;
			});

			const arrResult = updateContour(contour, result2_delete_point);
			const array = arrResult.result;
			const result3 =  fillEdges(map, array, fill_edges, fill_value, size_x);
			map = result3.map;

			contour = result3.contour;
			delete_point = [];
			extract_corners = [];
			fill_edges = [];
		}
		contour = [];
		return {result: map};
	} catch (e: any) {
		console.error("expandSingle CRASH:", e);
		throw e;
	}
}

function extractExternalContoursNewStrategy(temp_map: any, contour: Point[], rect: Rect, size_x: number): { temp_map: any, contour: Point[] } {
	let gray_region: Point[] = [];
	const result = findGrayConnectComponent(temp_map, gray_region, rect, size_x);
	gray_region = result.gray_region;
	temp_map = result.temp_map;
	const result1 = findExternalContoursNewStrategy(temp_map, gray_region, contour, rect, size_x);
	return {
		temp_map: result1.temp_map,
		contour: result1.contour
	};
}

function findGrayConnectComponent(temp_map: any, gray_region: Point[], rect: Rect, size_x: number): { gray_region: Point[], temp_map: any } {
	const four_neighbourhood = [[-1, 0], [0, 1], [1, 0], [0, -1]];
	let findOnePoint = false;
	const isInBounds = (x: number, y: number) => (
		x >= rect.x &&
      x < rect.x + rect.height &&
      y >= rect.y &&
      y < rect.y + rect.width
	);
	for (let idy = rect.y; idy < rect.y + rect.width; idy++) {
		for (let idx = rect.x; idx < rect.x + rect.height; idx++) {
			if (temp_map[idy * size_x + idx] == 0) {
				findOnePoint = true;
				const p_oint_for_search: Point[] = [];

				gray_region.push(new Point(idy, idx));
				p_oint_for_search.push(new Point(idy, idx));
				temp_map[idy * size_x + idx] = 30;

				let index = 0;
				while (index < p_oint_for_search.length) {
					const seed = p_oint_for_search[index];
					index++;

					for (let k = 0; k < 4; k++) {
						const temp_idy = seed.x + four_neighbourhood[k][0];
						const temp_idx = seed.y + four_neighbourhood[k][1];

						if (!isInBounds(temp_idx, temp_idy)) {
							continue;
						}

						if (temp_map[temp_idy * size_x + temp_idx] == 0) {
							temp_map[temp_idy * size_x + temp_idx] = 30;

							p_oint_for_search.push(new Point(temp_idy, temp_idx));
							gray_region.push(new Point(temp_idy, temp_idx));
						}
					}
				}
			}
			if (findOnePoint) {
				break;
			}
		}
		if (findOnePoint) {
			findOnePoint = false;
			break;
		}
	}

	return {
		gray_region: gray_region,
		temp_map: temp_map
	};
}

function findExternalContoursNewStrategy(temp_map: any, gray_region: Point[], contour: Point[], rect: Rect, size_x: number): { temp_map: any, contour: Point[] } {
	const eight_neighbourhood = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, 1], [1, 1], [1, -1], [-1, -1]];
	const isInBounds = (x: number, y: number) => (
		x >= rect.x &&
      x < rect.x + rect.height &&
      y >= rect.y &&
      y < rect.y + rect.width
	);

	for (let i = 0; i < gray_region.length; i++) {
		for (let k = 0; k < 8; k++) {
			const temp_idy = gray_region[i].x + eight_neighbourhood[k][0];
			const temp_idx = gray_region[i].y + eight_neighbourhood[k][1];

			if (!isInBounds(temp_idx, temp_idy)) {
				continue;
			}

			if (temp_map[temp_idy * size_x + temp_idx] == CONSTANTS.BLACK) {
				temp_map[temp_idy * size_x + temp_idx] = 40;
				contour.push(new Point(temp_idy, temp_idx));
			}
		}
	}

	return {
		temp_map: temp_map,
		contour: contour
	};
}

function extractCorners(corner_map: any, extract_corner: Point[], contour: Point[], external_corner_value: number, inner_corner_value: number, rect: Rect, map: any, size_x: number): { corner_map: any, extract_corners: Point[] } {
	const four_neighbourhood = [[-1, 0], [0, 1], [1, 0], [0, -1]];

	const temp_map = [...map];

	const isInBounds = (x: number, y: number) => (
		x >= rect.x &&
      x < rect.x + rect.height &&
      y >= rect.y &&
      y < rect.y + rect.width
	);

	for (let i = 0; i < contour.length; i++) {
		let black_count = 0;
		let white_count = 0;
		let gray_count = 0;

		for (let k = 0; k < 4; k++) {
			const temp_idy = contour[i].x + four_neighbourhood[k][0];
			const temp_idx = contour[i].y + four_neighbourhood[k][1];

			if (!isInBounds(temp_idx, temp_idy)) {
				continue;
			}

			if (temp_map[temp_idy * size_x + temp_idx] === CONSTANTS.BLACK) {
				black_count++;
			} else if (temp_map[temp_idy * size_x + temp_idx] == 0) {
				gray_count++;
			} else if(temp_map[temp_idy * size_x + temp_idx] == CONSTANTS.WHITE) {
				white_count++;
			}

			if (gray_count == 2 && black_count == 2) {
				extract_corner.push(new Point(contour[i].x, contour[i].y));
				corner_map[contour[i].x * size_x + contour[i].y] = external_corner_value;
			} else if((white_count == 2) && (black_count == 2))
			{
				corner_map[contour[i].x * size_x + contour[i].y] = inner_corner_value;
			}
		}
	}

	return {
		corner_map: corner_map,
		extract_corners: extract_corner
	};
}


function statisticalLineLength(temp_map: any, p_oint: Point, external_corner_value: number, inner_corner_value: number, valid_length: number, rect: Rect, size_x: number): { result: boolean } {
	const result1 = upSearchStatisticalLineLength(temp_map, p_oint, external_corner_value, inner_corner_value, valid_length, rect, size_x);
	if (result1.result) {
		return {result: true};
	}
	const result2 = downSearchStatisticalLineLength(temp_map, p_oint, external_corner_value, inner_corner_value, valid_length, rect, size_x);
	if (result2.result) {
		return {result: true};
	}
	const result3 = leftSearchStatisticalLineLength(temp_map, p_oint, external_corner_value, inner_corner_value, valid_length, rect, size_x);
	if (result3.result) {
		return {result: true};
	}
	const result4 = rightSearchStatisticalLineLength(temp_map, p_oint, external_corner_value, inner_corner_value, valid_length, rect, size_x);
	if (result4.result) {
		return {result: true};
	}
	return {result: false};
}

function upSearchStatisticalLineLength(temp_map: any, p_oint: Point, external_corner_value: number, inner_corner_value: number, valid_length: number, rect: Rect, size_x: number): { result: boolean } {
	if ((p_oint.x + 1 < rect.y + rect.width) && (temp_map[(p_oint.x + 1) * size_x + p_oint.y]) == CONSTANTS.WHITE) {
		const idy = p_oint.x + 1;
		const idx = p_oint.y;

		const line = [];
		line.push(new Point(idy, idx));

		for (let j = idy; j < rect.y + rect.width; j++) {
			if (temp_map[j * size_x + idx] == CONSTANTS.WHITE) {
				let black_count = 0;
				const left_and_right_neighbourhood = [[0, -1], [0, 1]];
				for (let k = 0; k < 2; k++) {
					const tmp_idy = j + left_and_right_neighbourhood[k][0];
					const tmp_idx = idx + left_and_right_neighbourhood[k][1];

					const maxY = rect.y + rect.width;
					const minX = rect.x, maxX = rect.x + rect.height;
					if (tmp_idx < minX || tmp_idx >= maxX || tmp_idy < rect.y || tmp_idy >= maxY) {
						continue;
					}

					if (temp_map[tmp_idy * size_x + tmp_idx] == CONSTANTS.BLACK ||
              temp_map[tmp_idy * size_x + tmp_idx] == inner_corner_value ||
              temp_map[tmp_idy * size_x + tmp_idx] == external_corner_value) {
						black_count++;
					}
				}
				if (black_count == 1) {
					line.push(new Point(j, idx));
				} else {
					break;
				}
			} else {
				break;
			}
		}

		if (line.length > valid_length) {
			return {result: true};
		} else {
			return {result: false};
		}
	}
	return {result: false};
}

function downSearchStatisticalLineLength(temp_map: any, p_oint: Point, external_corner_value: number, inner_corner_value: number, valid_length: number, rect: Rect, size_x: number): { result: boolean } {
	if ((p_oint.x - 1 > rect.y) && (temp_map[(p_oint.x - 1) * size_x + p_oint.y] == CONSTANTS.WHITE)) {
		const idy = p_oint.x - 1;
		const idx = p_oint.y;

		const line = [];
		line.push(new Point(idy, idx));

		for (let j = idy; j > rect.y; j--) {
			if (temp_map[j * size_x + idx] == CONSTANTS.WHITE) {
				let black_count = 0;
				const left_and_right_neighbourhood = [[0, -1], [0, 1]];

				for (let k = 0; k < 2; k++) {
					const tmp_idy = j + left_and_right_neighbourhood[k][0];
					const tmp_idx = idx + left_and_right_neighbourhood[k][1];

					const maxY = rect.y + rect.width;
					const minX = rect.x, maxX = rect.x + rect.height;
					if (tmp_idy < rect.y || tmp_idy >= maxY || tmp_idx < minX || tmp_idx >= maxX) {
						continue;
					}

					if (temp_map[tmp_idy * size_x + tmp_idx] == CONSTANTS.BLACK ||
              temp_map[tmp_idy * size_x + tmp_idx] == inner_corner_value ||
              temp_map[tmp_idy * size_x + tmp_idx] == external_corner_value) {
						black_count++;
					}
				}

				if (black_count == 1) {
					line.push(new Point(j, idx));
				} else {
					break;
				}
			} else {
				break;
			}
		}

		return {result: line.length > valid_length};
	}
	return {result: false};
}

function leftSearchStatisticalLineLength(temp_map: any, p_oint: Point, external_corner_value: number, inner_corner_value: number, valid_length: number, rect: Rect, size_x: number): { result: boolean } {
	if ((p_oint.y + 1 < rect.x + rect.height) && (temp_map[p_oint.x * size_x + p_oint.y + 1] == CONSTANTS.WHITE)) {
		const idy = p_oint.x;
		const idx = p_oint.y + 1;

		const line = [];
		line.push(new Point(idy, idx));

		for (let j = idx; j < rect.x + rect.height; j++) {
			if (temp_map[idy * size_x + j] == CONSTANTS.WHITE) {
				let black_count = 0;
				const up_and_down_neighbourhood = [[-1, 0], [1, 0]];

				for (let k = 0; k < 2; k++) {
					const tmp_idy = idy + up_and_down_neighbourhood[k][0];
					const tmp_idx = j + up_and_down_neighbourhood[k][1];

					const maxY = rect.y + rect.width;
					const minX = rect.x, maxX = rect.x + rect.height;
					if (tmp_idy < rect.y || tmp_idy >= maxY || tmp_idx < minX || tmp_idx >= maxX) {
						continue;
					}

					if (temp_map[tmp_idy * size_x + tmp_idx] == CONSTANTS.BLACK ||
              temp_map[tmp_idy * size_x + tmp_idx] == inner_corner_value ||
              temp_map[tmp_idy * size_x + tmp_idx] == external_corner_value) {
						black_count++;
					}
				}
				if (black_count == 1) {
					line.push(new Point(idy, j));
				} else {
					break;
				}
			} else {
				break;
			}
		}

		return {result: line.length > valid_length};
	}
	return {result: false};
}

function rightSearchStatisticalLineLength(temp_map: any, p_oint: Point, external_corner_value: number, inner_corner_value: number, valid_length: number, rect: Rect, size_x: number): { result: boolean } {
	if ((p_oint.y - 1 > rect.x) && (temp_map[p_oint.x * size_x + p_oint.y - 1] == CONSTANTS.WHITE)) {
		const idy = p_oint.x;
		const idx = p_oint.y - 1;

		const line = [];
		line.push(new Point(idy, idx));

		for (let j = idx; j > rect.x; j--) {
			if (temp_map[idy * size_x + j] == CONSTANTS.WHITE) {
				let black_count = 0;
				const up_and_down_neighbourhood = [[-1, 0], [1, 0]];

				for (let k = 0; k < 2; k++) {
					const tmp_idy = idy + up_and_down_neighbourhood[k][0];
					const tmp_idx = j + up_and_down_neighbourhood[k][1];

					const maxY = rect.y + rect.width;
					const minX = rect.x, maxX = rect.x + rect.height;
					if (tmp_idx < minX || tmp_idx >= maxX || tmp_idy < rect.y || tmp_idy >= maxY) {
						continue;
					}

					if (temp_map[tmp_idy * size_x + tmp_idx] == CONSTANTS.BLACK ||
              temp_map[tmp_idy * size_x + tmp_idx] == inner_corner_value ||
              temp_map[tmp_idy * size_x + tmp_idx] == external_corner_value) {
						black_count++;
					}
				}
				if (black_count == 1) {
					line.push(new Point(idy, j));
				} else {
					break;
				}
			} else {
				break;
			}
		}

		return {result: line.length > valid_length};
	}
	return {result: false};
}

function fourNeighbourhoodSearchForExtractCorners(temp_map: any, p_oint: Point, fill_edges: Point[][], delete_point: Point[], external_corner_value: number, inner_corner_value: number, valid_length: number, is_valid_length: boolean, rect: Rect, map: any, size_x: number): { result: any } {
	const result1 = upSearchForExtractCorners(temp_map, p_oint, fill_edges, delete_point, external_corner_value, inner_corner_value, valid_length, is_valid_length, rect, map, size_x);
	const result2 = downSearchForExtractCorners(temp_map, p_oint, result1.fill_edges, result1.delete_point, external_corner_value, inner_corner_value, valid_length, is_valid_length, rect, result1.map, size_x);
	const result3 = leftSearchForExtractCorners(temp_map, p_oint, result2.fill_edges, result2.delete_point, external_corner_value, inner_corner_value, valid_length, is_valid_length, rect, result2.map, size_x);
	const result4 = rightSearchForExtractCorners(temp_map, p_oint, result3.fill_edges, result3.delete_point, external_corner_value, inner_corner_value, valid_length, is_valid_length, rect, result3.map, size_x);
	return {result: result4};
}

function upSearchForExtractCorners(temp_map: any, p_oint: Point, fill_edges: Point[][], delete_point: Point[], external_corner_value: number, inner_corner_value: number, valid_length: number, is_valid_length: boolean, rect: Rect, map: any, size_x: number): { delete_point: Point[], fill_edges: Point[][], map: any } {
	if ((p_oint.x + 1 < rect.y + rect.width) && map[(p_oint.x + 1) * size_x + p_oint.y] == 0) {
		const idy = p_oint.x + 1;
		const idx = p_oint.y;

		let line: Point[] = [];
		line.push(new Point(idy, idx));

		for (let j = idy; j < rect.y + rect.width; j++) {
			if (temp_map[j * size_x + idx] == 0) {
				let black_count = 0;
				const left_and_right_neighbourhood = [[0, -1], [0, 1]];
				for (let k = 0; k < 2; k++) {
					const tmp_idy = j + left_and_right_neighbourhood[k][0];
					const tmp_idx = idx + left_and_right_neighbourhood[k][1];

					const minY = rect.y, maxY = rect.y + rect.width;
					const minX = rect.x, maxX = rect.x + rect.height;
					if (tmp_idx < minX || tmp_idx >= maxX || tmp_idy < minY || tmp_idy >= maxY) {
						continue;
					}
					if (temp_map[tmp_idy * size_x + tmp_idx] == CONSTANTS.BLACK ||
              temp_map[tmp_idy * size_x + tmp_idx] == external_corner_value ||
              temp_map[tmp_idy * size_x + tmp_idx] == inner_corner_value) {
						black_count++;
					}
				}
				if (black_count == 1) {
					line.push(new Point(j, idx));
				} else {
					break;
				}
			} else {
				break;
			}
		}

		if (is_valid_length && line.length > 1) {
			line.push(p_oint);
			fill_edges.push(line);

			for (let i = 0; i < line.length; i++) {
				const left_and_right_neighbourhood = [[0, -1], [0, 1]];
				for (let k = 0; k < 2; k++) {
					const tmp_idy = line[i].x + left_and_right_neighbourhood[k][0];
					const tmp_idx = line[i].y + left_and_right_neighbourhood[k][1];

					const minY = rect.y, maxY = rect.y + rect.width;
					const minX = rect.x, maxX = rect.x + rect.height;
					if (tmp_idx < minX || tmp_idx >= maxX || tmp_idy < minY || tmp_idy >= maxY) {
						continue;
					}
					if (temp_map[tmp_idy * size_x + tmp_idx] == CONSTANTS.BLACK || temp_map[tmp_idy * size_x + tmp_idx] == inner_corner_value) {
						map[tmp_idy * size_x + tmp_idx] = CONSTANTS.WHITE;
						delete_point.push(new Point(tmp_idy, tmp_idx));
					}
				}
			}
		} else if (line.length > valid_length) {
			line.push(p_oint);
			fill_edges.push(line);

			for (let i = 0; i < line.length; i++) {
				const left_and_right_neighbourhood = [[0, -1], [0, 1]];
				for (let k = 0; k < 2; k++) {
					const tmp_idy = line[i].x + left_and_right_neighbourhood[k][0];
					const tmp_idx = line[i].y + left_and_right_neighbourhood[k][1];

					const minY = rect.y, maxY = rect.y + rect.width;
					const minX = rect.x, maxX = rect.x + rect.height;
					if (tmp_idx < minX || tmp_idx >= maxX || tmp_idy < minY || tmp_idy >= maxY) {
						continue;
					}
					if (temp_map[tmp_idy * size_x + tmp_idx] == CONSTANTS.BLACK || temp_map[tmp_idy * size_x + tmp_idx] == inner_corner_value) {
						map[tmp_idy * size_x + tmp_idx] = CONSTANTS.WHITE;
						delete_point.push(new Point(tmp_idy, tmp_idx));
					}
				}
			}
		} else {
			line = [];
		}
	}
	return {
		delete_point: delete_point,
		fill_edges: fill_edges,
		map: map
	};
}

function downSearchForExtractCorners(temp_map: any, p_oint: Point, fill_edges: Point[][], delete_point: Point[], external_corner_value: number, inner_corner_value: number, valid_length: number, is_valid_length: boolean, rect: Rect, map: any, size_x: number): { delete_point: Point[], fill_edges: Point[][], map: any } {
	if ((p_oint.x - 1 > rect.y) && (map[(p_oint.x - 1) * size_x + p_oint.y] == 0)) {
		const idy = p_oint.x - 1;
		const idx = p_oint.y;

		let line: Point[] = [];
		line.push(new Point(idy, idx));

		for (let j = idy; j > rect.y; j--) {
			if (temp_map[j * size_x + idx] == 0) {
				let black_count = 0;
				const left_and_right_neighbourhood = [[0, -1], [0, 1]];

				for (let k = 0; k < 2; k++) {
					const tmp_idy = j + left_and_right_neighbourhood[k][0];
					const tmp_idx = idx + left_and_right_neighbourhood[k][1];

					const minY = rect.y, maxY = rect.y + rect.width;
					const minX = rect.x, maxX = rect.x + rect.height;
					if (tmp_idy < minY || tmp_idy >= maxY || tmp_idx < minX || tmp_idx >= maxX) {
						continue;
					}

					if (temp_map[tmp_idy * size_x + tmp_idx] == CONSTANTS.BLACK ||
              temp_map[tmp_idy * size_x + tmp_idx] == external_corner_value ||
              temp_map[tmp_idy * size_x + tmp_idx] == inner_corner_value) {
						black_count++;
					}
				}

				if (black_count == 1) {
					line.push(new Point(j, idx));
				} else {
					break;
				}
			} else {
				break;
			}
		}

		if (is_valid_length && line.length > 1) {
			line.push(p_oint);
			fill_edges.push(line);

			for (let i = 0; i < line.length; i++) {
				const left_and_right_neighbourhood = [[0, -1], [0, 1]];
				for (let k = 0; k < 2; k++) {
					const tmp_idy = line[i].x + left_and_right_neighbourhood[k][0];
					const tmp_idx = line[i].y + left_and_right_neighbourhood[k][1];

					const minY = rect.y, maxY = rect.y + rect.width;
					const minX = rect.x, maxX = rect.x + rect.height;
					if (tmp_idy < minY || tmp_idy >= maxY || tmp_idx < minX || tmp_idx >= maxX) {
						continue;
					}
					if (temp_map[tmp_idy * size_x + tmp_idx] == CONSTANTS.BLACK || temp_map[tmp_idy * size_x + tmp_idx] == inner_corner_value) {
						map[tmp_idy * size_x + tmp_idx] = CONSTANTS.WHITE;
						delete_point.push(new Point(tmp_idy, tmp_idx));
					}
				}
			}
		} else if (line.length > valid_length) {
			line.push(p_oint);
			fill_edges.push(line);

			for (let i = 0; i < line.length; i++) {
				const left_and_right_neighbourhood = [[0, -1], [0, 1]];
				for (let k = 0; k < 2; k++) {
					const tmp_idy = line[i].x + left_and_right_neighbourhood[k][0];
					const tmp_idx = line[i].y + left_and_right_neighbourhood[k][1];

					const minY = rect.y, maxY = rect.y + rect.width;
					const minX = rect.x, maxX = rect.x + rect.height;
					if (tmp_idy < minY || tmp_idy >= maxY || tmp_idx < minX || tmp_idx >= maxX) {
						continue;
					}
					if (temp_map[tmp_idy * size_x + tmp_idx] == CONSTANTS.BLACK || temp_map[tmp_idy * size_x + tmp_idx] == inner_corner_value) {
						map[tmp_idy * size_x + tmp_idx] = CONSTANTS.WHITE;
						delete_point.push(new Point(tmp_idy, tmp_idx));
					}
				}
			}
		} else {
			line = [];
		}
	}
	return {
		delete_point: delete_point,
		fill_edges: fill_edges,
		map: map
	};
}

function leftSearchForExtractCorners(temp_map: any, p_oint: Point, fill_edges: Point[][], delete_point: Point[], external_corner_value: number, inner_corner_value: number, valid_length: number, is_valid_length: boolean, rect: Rect, map: any, size_x: number): { delete_point: Point[], fill_edges: Point[][], map: any } {
	if ((p_oint.y + 1 < rect.x + rect.height) && (map[p_oint.x * size_x + p_oint.y + 1] == 0)) {
		const idy = p_oint.x;
		const idx = p_oint.y + 1;

		let line: Point[] = [];
		line.push(new Point(idy, idx));

		for (let j = idx; j < rect.x + rect.height; j++) {
			if (temp_map[idy * size_x + j] == 0) {
				let black_count = 0;
				const up_and_down_neighbourhood = [[-1, 0], [1, 0]];

				for (let k = 0; k < 2; k++) {
					const tmp_idy = idy + up_and_down_neighbourhood[k][0];
					const tmp_idx = j + up_and_down_neighbourhood[k][1];

					const minY = rect.y, maxY = rect.y + rect.width;
					const minX = rect.x, maxX = rect.x + rect.height;
					if (tmp_idy < minY || tmp_idy >= maxY || tmp_idx < minX || tmp_idx >= maxX) {
						continue;
					}
					if (temp_map[tmp_idy * size_x + tmp_idx] == CONSTANTS.BLACK ||
              temp_map[tmp_idy * size_x + tmp_idx] == external_corner_value ||
              temp_map[tmp_idy * size_x + tmp_idx] == inner_corner_value) {
						black_count++;
					}
				}
				if (black_count == 1) {
					line.push(new Point(idy, j));
				} else {
					break;
				}
			} else {
				break;
			}
		}

		if (is_valid_length && line.length > 1) {
			line.push(p_oint);
			fill_edges.push(line);

			for (let i = 0; i < line.length; i++) {
				const up_and_down_neighbourhood = [[-1, 0], [1, 0]];

				for (let k = 0; k < 2; k++) {
					const tmp_idy = line[i].x + up_and_down_neighbourhood[k][0];
					const tmp_idx = line[i].y + up_and_down_neighbourhood[k][1];

					const maxY = rect.y + rect.width;
					const minX = rect.x, maxX = rect.x + rect.height;
					if (tmp_idy < rect.y || tmp_idy >= maxY || tmp_idx < minX || tmp_idx >= maxX) {
						continue;
					}
					if (temp_map[tmp_idy * size_x + tmp_idx] == CONSTANTS.BLACK || temp_map[tmp_idy * size_x + tmp_idx] == inner_corner_value) {
						map[tmp_idy * size_x + tmp_idx] = CONSTANTS.WHITE;
						delete_point.push(new Point(tmp_idy, tmp_idx));
					}
				}
			}
		} else if (line.length > valid_length) {
			line.push(p_oint);
			fill_edges.push(line);

			for (let i = 0; i < line.length; i++) {
				const up_and_down_neighbourhood = [[-1, 0], [1, 0]];

				for (let k = 0; k < 2; k++) {
					const tmp_idy = line[i].x + up_and_down_neighbourhood[k][0];
					const tmp_idx = line[i].y + up_and_down_neighbourhood[k][1];

					const minY = rect.y, maxY = rect.y + rect.width;
					const minX = rect.x, maxX = rect.x + rect.height;
					if (tmp_idy < minY || tmp_idy >= maxY || tmp_idx < minX || tmp_idx >= maxX) {
						continue;
					}
					if (temp_map[tmp_idy * size_x + tmp_idx] == CONSTANTS.BLACK || temp_map[tmp_idy * size_x + tmp_idx] == inner_corner_value) {
						map[tmp_idy * size_x + tmp_idx] = CONSTANTS.WHITE;
						delete_point.push(new Point(tmp_idy, tmp_idx));
					}
				}
			}
		} else {
			line = [];
		}
	}
	return {
		delete_point: delete_point,
		fill_edges: fill_edges,
		map: map
	};
}

function rightSearchForExtractCorners(temp_map: any, p_oint: Point, fill_edges: Point[][], delete_point: Point[], external_corner_value: number, inner_corner_value: number, valid_length: number, is_valid_length: boolean, rect: Rect, map: any, size_x: number): { delete_point: Point[], fill_edges: Point[][], map: any } {
	if ((p_oint.y - 1 > rect.x) && (map[p_oint.x * size_x + p_oint.y - 1] == 0)) {
		const idy = p_oint.x;
		const idx = p_oint.y - 1;

		let line: Point[] = [];
		line.push(new Point(idy, idx));

		for (let j = idx; j > rect.x; j--) {
			if (temp_map[idy * size_x + j] == 0) {
				let black_count = 0;
				const up_and_down_neighbourhood = [[-1, 0], [1, 0]];

				for (let k = 0; k < 2; k++) {
					const tmp_idy = idy + up_and_down_neighbourhood[k][0];
					const tmp_idx = j + up_and_down_neighbourhood[k][1];

					const minY = rect.y, maxY = rect.y + rect.width;
					const minX = rect.x, maxX = rect.x + rect.height;
					if (tmp_idx < minX || tmp_idx >= maxX || tmp_idy < minY || tmp_idy >= maxY) {
						continue;
					}
					if (temp_map[tmp_idy * size_x + tmp_idx] == CONSTANTS.BLACK ||
              temp_map[tmp_idy * size_x + tmp_idx] == external_corner_value ||
              temp_map[tmp_idy * size_x + tmp_idx] == inner_corner_value) {
						black_count++;
					}
				}
				if (black_count == 1) {
					line.push(new Point(idy, j));
				} else {
					break;
				}
			} else {
				break;
			}
		}

		if (is_valid_length && line.length > 1) {
			line.push(p_oint);
			fill_edges.push(line);

			for (let i = 0; i < line.length; i++) {
				const up_and_down_neighbourhood = [[-1, 0], [1, 0]];

				for (let k = 0; k < 2; k++) {
					const tmp_idy = line[i].x + up_and_down_neighbourhood[k][0];
					const tmp_idx = line[i].y + up_and_down_neighbourhood[k][1];

					const minY = rect.y, maxY = rect.y + rect.width;
					const minX = rect.x, maxX = rect.x + rect.height;
					if (tmp_idx < minX || tmp_idx >= maxX || tmp_idy < minY || tmp_idy >= maxY) {
						continue;
					}
					if (temp_map[tmp_idy * size_x + tmp_idx] == CONSTANTS.BLACK || temp_map[tmp_idy * size_x + tmp_idx] == inner_corner_value) {
						map[tmp_idy * size_x + tmp_idx] = CONSTANTS.WHITE;
						delete_point.push(new Point(tmp_idy, tmp_idx));
					}
				}
			}
		} else if (line.length > valid_length) {
			line.push(p_oint);
			fill_edges.push(line);

			for (let i = 0; i < line.length; i++) {
				const up_and_down_neighbourhood = [[-1, 0], [1, 0]];

				for (let k = 0; k < 2; k++) {
					const tmp_idy = line[i].x + up_and_down_neighbourhood[k][0];
					const tmp_idx = line[i].y + up_and_down_neighbourhood[k][1];

					if (tmp_idx < rect.x || tmp_idx >= rect.x + rect.height || tmp_idy < rect.y || tmp_idy >= rect.y + rect.width) {
						continue;
					}
					if (temp_map[tmp_idy * size_x + tmp_idx] == CONSTANTS.BLACK || temp_map[tmp_idy * size_x + tmp_idx] == inner_corner_value) {
						map[tmp_idy * size_x + tmp_idx] = CONSTANTS.WHITE;
						delete_point.push(new Point(tmp_idy, tmp_idx));
					}
				}
			}
		} else {
			line = [];
		}
	}
	return {
		delete_point: delete_point,
		fill_edges: fill_edges,
		map: map
	};
}

function updateContour(contour: Point[], delete_points: Point[]): { result: Point[] } {
	const delete_point_size = delete_points.length;


	for (let i = 0; i < delete_point_size; i++) {
		const delete_point = delete_points[i];

		contour = contour.filter((it: Point) => !(it.x === delete_point.x && it.y === delete_point.y));
	}

	return {result: contour};
}

function fillEdges(map: any, contour: Point[], fill_edges: Point[][], value: number, size_x: number): { contour: Point[], map: any } {
	for (let i = 0; i < fill_edges.length; i++) {
		const edge = fill_edges[i];

		for (let j = 0; j < edge.length; j++) {
			map[edge[j].x * size_x + edge[j].y] = value;
			contour.push(edge[j]);
		}
	}
	return {
		contour: contour,
		map: map
	};
}

function findWhiteConnectComponent(all_region: { first: Point[], second: Point[] }[], valid_area: number, rect: Rect, size_x: number, map: any): { result: { first: Point[], second: Point[] }[] } {

	let temp_map = [...map];

	const four_neighbourhood = [[-1, 0], [0, 1], [1, 0], [0, -1]];

	const isInBounds = (x: number, y: number) => (
		x >= rect.x &&
      x < rect.x + rect.height &&
      y >= rect.y &&
      y < rect.y + rect.width
	);

	for (let idy = rect.y + 1; idy < rect.y + rect.width - 1; idy++) {
		for (let idx = rect.x + 1; idx < rect.x + rect.height - 1; idx++) {
			if (temp_map[idy * size_x + idx] == CONSTANTS.WHITE) {
				const tmp_white_region: Point[] = [];
				let tmp_black_region: Point[] = [];
				const p_oint_for_search: Point[] = [];

				tmp_white_region.push(new Point(idy, idx));
				p_oint_for_search.push(new Point(idy, idx));
				temp_map[idy * size_x + idx] = 30;

				let pointIndex = 0;
				while (pointIndex < p_oint_for_search.length) {
					// 删除数组中的第一个元素并返回删除的元素
					const seed = p_oint_for_search[pointIndex];
					pointIndex++;

					const result = findBlackTPoint(temp_map, seed, tmp_black_region, size_x, rect);
					temp_map = result.temp_map;
					tmp_black_region = result.tmp_black_region;

					for (let k = 0; k < 4; k++) {
						const temp_idy = seed.x + four_neighbourhood[k][0];
						const temp_idx = seed.y + four_neighbourhood[k][1];

						if (!isInBounds(temp_idx, temp_idy)) {
							continue;
						}
						if (temp_map[temp_idy * size_x + temp_idx] == CONSTANTS.WHITE) {
							temp_map[temp_idy * size_x + temp_idx] = 30;

							p_oint_for_search.push(new Point(temp_idy, temp_idx));
							tmp_white_region.push(new Point(temp_idy, temp_idx));
						}
					}
				}
				all_region.push({
					first: tmp_black_region,
					second: tmp_white_region
				});
			}
		}
	}

	const tempAll_region: { first: Point[], second: Point[] }[] = [];
	for (let i = 0; i < all_region.length; i++) {
		const temp = all_region[i];
		if (temp.second.length < valid_area || temp.first.length == 0 || temp.second.length == 0) {

		} else {
			tempAll_region.push(temp);
		}
	}
	all_region = tempAll_region;

	if (all_region.length > 0) {
		all_region.sort((a, b) => b.first.length - a.first.length);
	}

	return {result: all_region};
}

function findBlackTPoint(temp_map: any, seed: Point, black_region: Point[], size_x: number, tRect: Rect): { temp_map: any, tmp_black_region: Point[] } {
	const eight_neighbourhood = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, 1], [1, 1], [1, -1], [-1, -1]];
	for (let k = 0; k < 8; k++) {
		const temp_idy = seed.x + eight_neighbourhood[k][0];
		const temp_idx = seed.y + eight_neighbourhood[k][1];

		if (temp_idy < tRect.y || temp_idy >= tRect.y + tRect.width || temp_idx < tRect.x || temp_idx >= tRect.x + tRect.height) {
			continue;
		}
		if (temp_map[temp_idy * size_x + temp_idx] == CONSTANTS.BLACK) {
			temp_map[temp_idy * size_x + temp_idx] = 10;
			black_region.push(new Point(temp_idy, temp_idx));
		}
	}

	return {
		temp_map: temp_map,
		tmp_black_region: black_region,
	};
}

function removeIndependentRegion(all_region: { first: Point[], second: Point[] }[], black_boundary: Point[], valid_length: number, rect: Rect, map: any, size_x: number): { temp_black_boundary: Point[], map: any } {
	let temp_black_boundary = black_boundary;
	if (all_region.length > 0) {

		let temp_map = [...map];

		const tmp_all_region: { first: Point[], second: Point[] }[] = [];
		const temp_map_result = fillBlackComponent(temp_map, all_region[0].first, 30, size_x);
		temp_map = temp_map_result.result;

		tmp_all_region.push(all_region[0]);

		const result = {
			temp_map: temp_map,
			black_boundary: black_boundary,
		};
		for (let i = 1; i < all_region.length; i++) {
			let is_home = false;
			const black_boundary_size = all_region[i].first.length;
			for (let j = 0; j < black_boundary_size; j++) {
				let search_success = false;
				const seed = all_region[i].first[j];

				const tempResult = fourNeighbourhoodSearchArea(result.temp_map, seed, result.black_boundary, 30, valid_length, rect, size_x);
				search_success = tempResult.boolStatus;
				temp_black_boundary = tempResult.black_boundary;
				result.temp_map = tempResult.temp_map;
				result.black_boundary = tempResult.black_boundary;
				if (search_success) {
					is_home = true;
				}
			}
			if (is_home) {
				tmp_all_region.push(all_region[i]);
			}
		}

		const fillConnectComponent_result = fillConnectComponent(result.temp_map, tmp_all_region, 30, size_x);
		result.temp_map = fillConnectComponent_result.result;
		for (let idy = rect.y + 1; idy < rect.y + rect.width - 1; idy++) {
			for (let idx = rect.x + 1; idx < rect.x + rect.height - 1; idx++) {
				if (result.temp_map[idy * size_x + idx] != 0 && result.temp_map[idy * size_x + idx] != 30) {
					map[idy * size_x + idx] = 0;
				}
			}
		}
	}

	return {
		temp_black_boundary: temp_black_boundary,
		map: map
	};
}

function fillConnectComponent(temp_map: any, all_region: { first: Point[], second: Point[] }[], value: number, size_x: number): { result: any } {
	for (let i = 0; i < all_region.length; i++) {
		for (let j = 0; j < all_region[i].first.length; j++) {
			temp_map[all_region[i].first[j].x * size_x + all_region[i].first[j].y] = value;
		}
		for (let j2 = 0; j2 < all_region[i].second.length; j2++) {
			temp_map[all_region[i].second[j2].x * size_x + all_region[i].second[j2].y] = value;
		}
	}
	return {result: temp_map};
}

interface SearchAreaResult {
	boolStatus: boolean;
	line: Point[];
}

function fourNeighbourhoodSearchArea(temp_map: any, p_oint: Point, black_boundary: Point[], boundary_value: number, valid_length: number, rect: Rect, size_x: number): { temp_map: any, black_boundary: Point[], boolStatus: boolean } {
	let up_result: SearchAreaResult = { boolStatus: false, line: [] };
	let down_result: SearchAreaResult = { boolStatus: false, line: [] };
	let left_result: SearchAreaResult = { boolStatus: false, line: [] };
	let right_result: SearchAreaResult = { boolStatus: false, line: [] };

	up_result = upSearchArea(temp_map, p_oint, boundary_value, valid_length, rect, size_x);
	down_result = downSearchArea(temp_map, p_oint, boundary_value, valid_length, rect, size_x);
	left_result = leftSearchArea(temp_map, p_oint, boundary_value, valid_length, rect, size_x);
	right_result = rightSearchArea(temp_map, p_oint, boundary_value, valid_length, rect, size_x);

	if (up_result.boolStatus || down_result.boolStatus || left_result.boolStatus || right_result.boolStatus) {
		if (up_result.line.length > 0) {
			for (let i = 0; i < up_result.line.length; i++) {
				black_boundary.push(up_result.line[i]);
			}
		}
		if (down_result.line.length > 0) {
			for (let i = 0; i < down_result.line.length; i++) {
				black_boundary.push(down_result.line[i]);
			}
		}
		if (left_result.line.length > 0) {
			for (let i = 0; i < left_result.line.length; i++) {
				black_boundary.push(left_result.line[i]);
			}
		}
		if (right_result.line.length > 0) {
			for (let i = 0; i < right_result.line.length; i++) {
				black_boundary.push(right_result.line[i]);
			}
		}
		return {
			temp_map: temp_map,
			black_boundary: black_boundary,
			boolStatus: true
		};
	} else {
		return {
			temp_map: temp_map,
			black_boundary: black_boundary,
			boolStatus: false
		};
	}
}

function upSearchArea(temp_map: any, p_oint: Point, boundary_value: number, valid_length: number, rect: Rect, size_x: number): SearchAreaResult {
	if ((p_oint.y + 1 < rect.x + rect.height) && (temp_map[p_oint.x * size_x + p_oint.y + 1] == 0)) {
		const idy = p_oint.x;
		const idx = p_oint.y + 1;

		let line: Point[] = [];
		line.push(new Point(idy, idx));
		let has_black_boundary = false;

		for (let j = idx; j < idx + valid_length; j++) {
			if (j >= rect.x + rect.height) {
				continue;
			}
			if (temp_map[idy * size_x + j] == boundary_value) {
				has_black_boundary = true;
				break;
			} else if (temp_map[idy * size_x + j] == CONSTANTS.WHITE || temp_map[idy * size_x + j] == CONSTANTS.BLACK) {
				line = [];
				break;
			} else if (temp_map[idy * size_x + j] == 0) {
				line.push(new Point(idy, j));
			}
		}

		if (has_black_boundary) {
			return {
				boolStatus: true,
				line: line
			};
		} else {
			line = [];
			return {
				boolStatus: false,
				line: line
			};
		}
	}
	return {
		boolStatus: false,
		line: []
	};
}

function downSearchArea(temp_map: any, p_oint: Point, boundary_value: number, valid_length: number, rect: Rect, size_x: number): SearchAreaResult {
	if ((p_oint.y - 1 > rect.x) && (temp_map[p_oint.x * size_x + p_oint.y - 1] == 0)) {
		const idy = p_oint.x;
		const idx = p_oint.y - 1;

		let line: Point[] = [];
		line.push(new Point(idy, idx));
		let has_black_boundary = false;

		for (let j = idx; j > idx - valid_length; j--) {
			if (j < rect.x) {
				continue;
			}
			if (temp_map[idy * size_x + j] == boundary_value) {
				has_black_boundary = true;
				break;
			} else if (temp_map[idy * size_x + j] == CONSTANTS.WHITE || temp_map[idy * size_x + j] == CONSTANTS.BLACK) {
				line = [];
				break;
			} else if (temp_map[idy * size_x + j] == 0) {
				line.push(new Point(idy, j));
			}
		}

		if (has_black_boundary) {
			return {
				boolStatus: true,
				line: line
			};
		} else {
			line = [];
			return {
				boolStatus: false,
				line: line
			};
		}
	}
	return {
		boolStatus: false,
		line: []
	};
}

function leftSearchArea(temp_map: any, p_oint: Point, boundary_value: number, valid_length: number, rect: Rect, size_x: number) {
	if ((p_oint.x + 1 < rect.y + rect.width) && (temp_map[(p_oint.x + 1) * size_x + p_oint.y] == 0)) {
		const idy = p_oint.x + 1;
		const idx = p_oint.y;

		let line: Point[] = [];
		line.push(new Point(idy, idx));
		let has_black_boundary = false;

		for (let j = idy; j < idy + valid_length; j++) {
			if (j >= rect.y + rect.width) {
				continue;
			}
			if (temp_map[j * size_x + idx] == boundary_value) {
				has_black_boundary = true;
				break;
			} else if (temp_map[j * size_x + idx] == CONSTANTS.WHITE || temp_map[j * size_x + idx] == CONSTANTS.BLACK) {
				line = [];
				break;
			} else if (temp_map[j * size_x + idx] == 0) {
				line.push(new Point(j, idx));
			}
		}

		if (has_black_boundary) {
			return {
				boolStatus: true,
				line: line
			};
		} else {
			line = [];
			return {
				boolStatus: false,
				line: line
			};
		}
	}
	return {
		boolStatus: false,
		line: []
	};
}

function rightSearchArea(temp_map: any, p_oint: Point, boundary_value: number, valid_length: number, rect: Rect, size_x: number) {
	if ((p_oint.x - 1 > rect.y) && (temp_map[(p_oint.x - 1) * size_x + p_oint.y] == 0)) {
		const idy = p_oint.x - 1;
		const idx = p_oint.y;

		let line: Point[] = [];
		line.push(new Point(idy, idx));
		let has_black_boundary = false;

		for (let j = idy; j > idy - valid_length; j--) {
			if (j <= rect.y) {
				continue;
			}
			if (temp_map[j * size_x + idx] == boundary_value) {
				has_black_boundary = true;
				break;
			} else if (temp_map[j * size_x + idx] == CONSTANTS.WHITE || temp_map[j * size_x + idx] == CONSTANTS.BLACK) {
				line = [];
				break;
			} else if (temp_map[j * size_x + idx] == 0) {
				line.push(new Point(j, idx));
			}
		}

		if (has_black_boundary) {
			return {
				boolStatus: true,
				line: line
			};
		} else {
			line = [];
			return {
				boolStatus: false,
				line: line
			};
		}
	}
	return {
		boolStatus: false,
		line: []
	};
}

function fillBlackComponent(temp_map: any, black_region: Point[], value: number, size_x: number): { result: any } {
	for (let i = 0; i < black_region.length; i++) {
		temp_map[black_region[i].x * size_x + black_region[i].y] = value;
	}
	return {result: temp_map};
}

function filterSmallAreas(map: any, rect: Rect, size_x: number, size_y: number, m_four_Dir: any, m_eight_Dir: any): { result: any } {
	let show_map = [...map];
	let areas: { first: number, second: Point[] } = {
		first: 0,
		second: []
	};
	const areas_vec: { first: number, second: Point[] }[] = [];

	for (let i = rect.x; i < rect.x + rect.height; i++) {
		for (let j = rect.y; j < rect.y + rect.width; j++) {
			if (show_map[j * size_x + i] == CONSTANTS.WHITE) {
				const findAllFillRegional_result = findAllFillRegional(show_map, new Point(i , j), size_x, size_y, m_four_Dir);
				areas = findAllFillRegional_result.areas;
				show_map = findAllFillRegional_result.tmp_map;
				areas_vec.push(areas);
			}
		}
	}
	show_map = [];

	let test_map = [...map];
	const filter_pt_vec: Point[] = [];
	for (let i = 0; i < areas_vec.length; i++) {
		let tmp_pt = new Point(-1 , -1);
		for (let j = 0; j < areas_vec[i].second.length; j++) {
			tmp_pt = areas_vec[i].second[j];
			test_map[tmp_pt.y * size_x + tmp_pt.x] = 80;
		}
		filter_pt_vec.push(tmp_pt);
	}

	let tmp_map = [...test_map];
	for (let i = 0; i < filter_pt_vec.length; i++) {
		if (filter_pt_vec[i].x < 0 || filter_pt_vec[i].y < 0 || filter_pt_vec[i].x >= size_x || filter_pt_vec[i].y >= size_y) {
			continue;
		}
		const isFillAreas_result = isFillAreas(tmp_map, filter_pt_vec[i], size_x, size_y, m_eight_Dir);
		tmp_map = isFillAreas_result.tmp_map;
		if (isFillAreas_result.result) {
			const filterAreas_result = filterAreas(test_map, filter_pt_vec[i], size_x, size_y, m_eight_Dir);
			test_map = filterAreas_result.test_map;
		}
	}
	tmp_map = [];

	const black_pt_vec = [];
	for (let i = rect.x; i < rect.x + rect.height; i++) {
		for (let j = rect.y; j < rect.y + rect.width; j++) {
			if (test_map[j * size_x + i] == 80) {
				test_map[j * size_x + i] = CONSTANTS.WHITE;
			} else if(test_map[j * size_x + i] == CONSTANTS.BLACK) {
				black_pt_vec.push(new Point(i, j));
			}
		}
	}
	const filterIslandPt_result = filterIslandPt(test_map, black_pt_vec, size_x, size_y, m_four_Dir);
	test_map = filterIslandPt_result.test_map;

	for (let idx = rect.x; idx < rect.x + rect.height; idx++) {
		for (let idy = rect.y; idy < rect.y + rect.width; idy++) {
			map[idy * size_x + idx] = test_map[idy * size_x + idx];
		}
	}

	return {
		result: map
	};
}

function findAllFillRegional(tmp_map: any, pt: Point, size_x: number, size_y: number, m_four_Dir: number[][]): { areas: { first: number, second: Point[] }, tmp_map: any } {
	const areas: { first: number, second: Point[] } = {
		first: 0,
		second: []
	};
	let ptGrowing = new Point(-1, -1);
	let area_num = 0;

	let growPtVec: Point[] = [];
	let changePoints: Point[] = [];
	growPtVec = [];
	changePoints = [];

	tmp_map[pt.y * size_x + pt.x] = 80;
	changePoints.push(pt);
	growPtVec.push(pt);

	while (growPtVec.length > 0) {
		const currPt = growPtVec.pop()!;
		for (let j = 0; j < 4; j++) {
			ptGrowing = new Point(currPt.x + m_four_Dir[j][0], currPt.y + m_four_Dir[j][1]);

			if (ptGrowing.x < 0 || ptGrowing.y < 0 || ptGrowing.x >= size_x || ptGrowing.y >= size_y) {
				continue;
			}

			if (tmp_map[ptGrowing.y * size_x + ptGrowing.x] == CONSTANTS.WHITE) {
				changePoints.push(ptGrowing);
				growPtVec.push(ptGrowing);
				tmp_map[ptGrowing.y * size_x + ptGrowing.x] = 80;
			}
		}
	}

	area_num = changePoints.length;
	for (let i = 0; i < changePoints.length; i++) {
		if (area_num <= 150) {
			areas.first = area_num;
			areas.second.push(new Point(changePoints[i].x, changePoints[i].y));
		}
	}

	changePoints = [];
	growPtVec = [];

	return {
		areas: areas,
		tmp_map: tmp_map
	};
}

function isFillAreas(image: any, pt: Point, size_x: number, size_y: number, m_eight_Dir: number[][]): { tmp_map: any, result: boolean } {
	let ptGrowing = new Point(-1, -1);

	let growPtVec: Point[] = [];
	growPtVec = [];
	growPtVec.push(pt);

	if (pt.x < 0 || pt.x >= size_x || pt.y < 0 || pt.y >= size_y) {
		return {
			tmp_map: image,
			result: false
		};
	}

	let fill_area_size = 0;
	image[pt.y * size_x + pt.x] = CONSTANTS.BLACK;
	while (growPtVec.length > 0) {
		const currPt = growPtVec.pop()!;

		for (let i = 0; i < 8; i++) {
			ptGrowing = new Point(currPt.x + m_eight_Dir[i][0], currPt.y + m_eight_Dir[i][1]);

			if (ptGrowing.x < 0 || ptGrowing.y < 0 || ptGrowing.x >= size_x || ptGrowing.y >= size_y) {
				continue;
			}
			if (image[ptGrowing.y * size_x + ptGrowing.x] == 0) {
				return {
					tmp_map: image,
					result: true
				};
			} else if (image[ptGrowing.y * size_x + ptGrowing.x] == 80) {
				growPtVec.push(ptGrowing);
				image[ptGrowing.y * size_x + ptGrowing.x] = CONSTANTS.BLACK;
				fill_area_size++;
			} else {
				continue;
			}
		}
	}

	if (fill_area_size <= 150) {
		return {
			tmp_map: image,
			result: true
		};
	}
	return {
		tmp_map: image,
		result: false
	};
}

function filterAreas(image: any, pt: Point, size_x: number, size_y: number, m_eight_Dir: number[][]): { test_map: any } {
	let ptGrowing = new Point(-1, -1);
	let growPtVec: Point[] = [];
	growPtVec = [];
	growPtVec.push(pt);

	if (pt.x < 0 || pt.x >= size_x || pt.y < 0 || pt.y >= size_y) {
		return {
			test_map: image
		};
	}

	image[pt.y * size_x + pt.x] = 0;
	while (growPtVec.length > 0) {
		const currPt = growPtVec.pop()!;
		for (let i = 0; i < 8; i++) {
			ptGrowing = new Point(currPt.x + m_eight_Dir[i][0], currPt.y + m_eight_Dir[i][1]);

			if (ptGrowing.x < 0 || ptGrowing.y < 0 || ptGrowing.x >= size_x || ptGrowing.y >= size_y) {
				continue;
			}

			if (image[ptGrowing.y * size_x + ptGrowing.x] == 80) {
				growPtVec.push(ptGrowing);
				image[ptGrowing.y * size_x + ptGrowing.x] = 0;
			} else if (image[ptGrowing.y * size_x + ptGrowing.x] == CONSTANTS.BLACK) {
				let neighbor_pt = new Point(-1, -1);
				let white_flag = false;

				for (let j = 0; j < 8; j++) {
					neighbor_pt = new Point(ptGrowing.x + m_eight_Dir[j][0], ptGrowing.y + m_eight_Dir[j][1]);
					if (image[neighbor_pt.y * size_x + neighbor_pt.x] == CONSTANTS.WHITE) {
						white_flag = true;
					}
					if (white_flag) {
						image[ptGrowing.y * size_x + ptGrowing.x] = CONSTANTS.BLACK;
						break;
					} else {
						image[ptGrowing.y * size_x + ptGrowing.x] = 0;
					}
				}
			} else {
				continue;
			}
		}
	}
	growPtVec = [];

	return {
		test_map: image
	};
}

function filterIslandPt(dst_img: any, pt_vec: Point[], size_x: number, size_y: number, m_four_Dir: number[][]): { test_map: any } {
	for (let i = 0; i < pt_vec.length; i++) {
		if (pt_vec[i].y < 0 || pt_vec[i].y >= size_y || pt_vec[i].x < 0 || pt_vec[i].x >= size_x || dst_img[pt_vec[i].y * size_x + pt_vec[i].x] == 80) {
			continue;
		}

		let growPtVec: Point[] = [];
		let changePoints: Point[] = [];

		growPtVec = [];
		changePoints = [];

		growPtVec.push(pt_vec[i]);
		dst_img[pt_vec[i].y * size_x + pt_vec[i].x] = 80;
		changePoints.push(pt_vec[i]);

		let hasWhiteNeighbor = false;
		while (growPtVec.length > 0) {
			const currPt = growPtVec.pop()!;
			for (let j = 0; j < 4; j++) {
				const tmp_pt = new Point(currPt.x + m_four_Dir[j][0], currPt.y + m_four_Dir[j][1]);

				if (tmp_pt.x < 0 || tmp_pt.y < 0 || tmp_pt.x >= size_x || tmp_pt.y >= size_y) {
					continue;
				}
				if (dst_img[tmp_pt.y * size_x + tmp_pt.x] == CONSTANTS.BLACK) {
					dst_img[tmp_pt.y * size_x + tmp_pt.x] = 80;
					changePoints.push(tmp_pt);
					growPtVec.push(tmp_pt);
				} else if (dst_img[tmp_pt.y * size_x + tmp_pt.x] == CONSTANTS.WHITE) {
					hasWhiteNeighbor = true;
				}
			}
		}

		if (!hasWhiteNeighbor && changePoints.length > 1) {
			for (let j = 0; j < changePoints.length; j++) {
				dst_img[changePoints[j].y * size_x + changePoints[j].x] = 0;
			}
		}
	}

	for (let x = 0; x < size_x; x++) {
		for (let y = 0; y < size_y; y++) {
			if(dst_img[y * size_x + x] == 80) {
				dst_img[y * size_x + x] = CONSTANTS.BLACK;
			}
		}
	}

	return {
		test_map: dst_img
	};
}

function fillNonBoundaryNoise2(nonBoundaryNoise: Point[], rect: Rect, map: any, size_x: number): { nonBoundaryNoise: Point[], map: any } {
	const temp_map = [...map];

	for (let i = 0; i < nonBoundaryNoise.length; i++) {
		temp_map[nonBoundaryNoise[i].x * size_x + nonBoundaryNoise[i].y] = 28;
	}

	const four_neighbourhood = [[5, 0, 4, 0, 3, 0, 2, 0, 1, 0], [0, 5, 0, 4, 0, 3, 0, 2, 0, 1], [-5, 0, -4, 0, -3, 0, -2, 0, -1, 0], [0, -5, 0, -4, 0, -3, 0, -2, 0, -1]];
	const noise_size = nonBoundaryNoise.length;
	for (let i = 0; i < noise_size; i++) {
		for (let k = 0; k < 4; k++) {
			const tmp_idx5 = nonBoundaryNoise[i].y + four_neighbourhood[k][0];
			const tmp_idy5 = nonBoundaryNoise[i].x + four_neighbourhood[k][1];

			const tmp_idx4 = nonBoundaryNoise[i].y + four_neighbourhood[k][2];
			const tmp_idy4 = nonBoundaryNoise[i].x + four_neighbourhood[k][3];

			const tmp_idx3 = nonBoundaryNoise[i].y + four_neighbourhood[k][4];
			const tmp_idy3 = nonBoundaryNoise[i].x + four_neighbourhood[k][5];

			const tmp_idx2 = nonBoundaryNoise[i].y + four_neighbourhood[k][6];
			const tmp_idy2 = nonBoundaryNoise[i].x + four_neighbourhood[k][7];

			const tmp_idx1 = nonBoundaryNoise[i].y + four_neighbourhood[k][8];
			const tmp_idy1 = nonBoundaryNoise[i].x + four_neighbourhood[k][9];

			if (tmp_idy5 < rect.y || tmp_idy5 >= rect.y + rect.width || tmp_idx5 < rect.x || tmp_idx5 >= rect.x + rect.height ||
            tmp_idy4 < rect.y || tmp_idy4 >= rect.y + rect.width || tmp_idx4 < rect.x || tmp_idx4 >= rect.x + rect.height ||
            tmp_idy3 < rect.y || tmp_idy3 >= rect.y + rect.width || tmp_idx3 < rect.x || tmp_idx3 >= rect.x + rect.height ||
            tmp_idy2 < rect.y || tmp_idy2 >= rect.y + rect.width || tmp_idx2 < rect.x || tmp_idx2 >= rect.x + rect.height ||
            tmp_idy1 < rect.y || tmp_idy1 >= rect.y + rect.width || tmp_idx1 < rect.x || tmp_idx1 >= rect.x + rect.height) {
				continue;
			}

			if (temp_map[tmp_idy5 * size_x + tmp_idx5] == CONSTANTS.BLACK &&
            temp_map[tmp_idy4 * size_x + tmp_idx4] == CONSTANTS.WHITE &&
            temp_map[tmp_idy3 * size_x + tmp_idx3] == CONSTANTS.WHITE &&
            temp_map[tmp_idy2 * size_x + tmp_idx2] == CONSTANTS.WHITE &&
            temp_map[tmp_idy1 * size_x + tmp_idx1] == CONSTANTS.WHITE) {
				nonBoundaryNoise.push(new Point(tmp_idy4, tmp_idx4));
				nonBoundaryNoise.push(new Point(tmp_idy3, tmp_idx3));
				nonBoundaryNoise.push(new Point(tmp_idy2, tmp_idx2));
				nonBoundaryNoise.push(new Point(tmp_idy1, tmp_idx1));
				break;
			} else if (temp_map[tmp_idy4 * size_x + tmp_idx4] == CONSTANTS.BLACK &&
            temp_map[tmp_idy3 * size_x + tmp_idx3] == CONSTANTS.WHITE &&
            temp_map[tmp_idy2 * size_x + tmp_idx2] == CONSTANTS.WHITE &&
            temp_map[tmp_idy1 * size_x + tmp_idx1] == CONSTANTS.WHITE) {
				nonBoundaryNoise.push(new Point(tmp_idy3, tmp_idx3));
				nonBoundaryNoise.push(new Point(tmp_idy2, tmp_idx2));
				nonBoundaryNoise.push(new Point(tmp_idy1, tmp_idx1));
				break;
			} else if (temp_map[tmp_idy3 * size_x + tmp_idx3] == CONSTANTS.BLACK &&
            temp_map[tmp_idy2 * size_x + tmp_idx2] == CONSTANTS.WHITE &&
            temp_map[tmp_idy1 * size_x + tmp_idx1] == CONSTANTS.WHITE) {
				nonBoundaryNoise.push(new Point(tmp_idy2, tmp_idx2));
				nonBoundaryNoise.push(new Point(tmp_idy1, tmp_idx1));
				break;
			} else if (temp_map[tmp_idy2 * size_x + tmp_idx2] == CONSTANTS.BLACK && temp_map[tmp_idy1 * size_x + tmp_idx1] == CONSTANTS.WHITE) {
				nonBoundaryNoise.push(new Point(tmp_idy1, tmp_idx1));
				break;
			}
		}
	}

	for (let i = 0; i < nonBoundaryNoise.length; i++) {
		map[nonBoundaryNoise[i].x * size_x + nonBoundaryNoise[i].y] = CONSTANTS.BLACK;
	}

	return {
		nonBoundaryNoise: nonBoundaryNoise,
		map: map
	};
}

function roomColorByChainAndDoor(area_info: RoomInfo[], map: any, size_x: number, size_y: number, x_min: number, y_min: number, resolution: number): { map: any } {
	const length = size_x * size_y;
	for (let i = 0; i < length; i++) {
		if (map[i] === CONSTANTS.BLACK) map[i] = -1;
		else if (map[i] === CONSTANTS.WHITE) map[i] = 1;
	}

	// 1.房间轮廓内填色并获得外扩链条点
	let fill_array: Point[] = [];
	let extend_door_point: Point[] = [];
	const fillInsidColorAndGetBound_result = fillInsidColorAndGetBound(area_info, fill_array, extend_door_point, map, size_x, size_y, x_min, y_min, resolution);
	area_info = fillInsidColorAndGetBound_result.area_info;
	fill_array = fillInsidColorAndGetBound_result.fill_array;
	extend_door_point = fillInsidColorAndGetBound_result.extend_door_point;
	map = fillInsidColorAndGetBound_result.map;

	// 2.封闭门线和房间链条外扩漫水
	let close_array: Point[] = [];
	const floodfillDoorAndChainPoint_result = floodfillDoorAndChainPoint(fill_array, close_array, extend_door_point, map, size_x, size_y);
	fill_array = floodfillDoorAndChainPoint_result.fill_array;
	close_array = floodfillDoorAndChainPoint_result.close_array;
	extend_door_point = floodfillDoorAndChainPoint_result.extend_door_point;
	map = floodfillDoorAndChainPoint_result.map;

	// 3.确定房间门点的颜色
	let fill_door_point: Point[] = [];
	let color_id_list: number[] = [];
	area_info.map(area => {
		color_id_list.push(area.tid);
	});
	const getEachDoorPointColor_result = getEachDoorPointColor(extend_door_point, fill_door_point, color_id_list, map, size_x, size_y);
	extend_door_point = getEachDoorPointColor_result.extend_door_point;
	fill_door_point = getEachDoorPointColor_result.fill_door_point;
	color_id_list = getEachDoorPointColor_result.color_id_list;
	map = getEachDoorPointColor_result.map;

	// 4.利用房间门点对剩余区域补填色
	const floodfillEachPoint_result = floodfillEachPoint(fill_door_point, close_array, map, size_x, size_y);
	fill_door_point = floodfillEachPoint_result.fill_array;
	close_array = floodfillEachPoint_result.close_array;
	map = floodfillEachPoint_result.map;

	// 5.封闭区域补填色
	const floodFillEdgeArray_result = floodFillEdgeArray(close_array, map, size_x, size_y);
	map = floodFillEdgeArray_result.map;

	return {
		map: map
	};
}

function floodFillEdgeArray(edge_array: Point[], map: any, size_x: number, size_y: number): { map: any } {
	let index = 0;
	while (index < edge_array.length) {
		const item = edge_array[index];
		const root_col = item.x;
		const root_row = item.y;
		index++;

		if (map[root_row * size_x + root_col] > 1) {
			for (let di = 1; di <= 4; di++) {
				if (root_row + di < 0 || root_row + di >= size_y || root_col < 0 || root_col >= size_x) {
					continue;
				} else {
					if (map[(root_row + di) * size_x + root_col] == 1) {
						const result1 = fillMapByOffsetPoint(root_row, root_col, di, 0, map, size_x, size_y);
						map = result1.map;
					} else if (map[(root_row + di) * size_x + root_col] == 0) {
						break;
					}
				}
			}
			for (let di = -1; di >= -4; di--) {
				if (root_row + di < 0 || root_row + di >= size_y || root_col < 0 || root_col >= size_x) {
					continue;
				} else {
					if (map[(root_row + di) * size_x + root_col] == 1) {
						const result2 = fillMapByOffsetPoint(root_row, root_col, di, 0, map, size_x, size_y);
						map = result2.map;
					} else if (map[(root_row + di) * size_x + root_col] == 0) {
						break;
					}
				}
			}
			for (let dj = 1; dj <= 4; dj++) {
				if (root_row < 0 || root_row >= size_y || root_col + dj < 0 || root_col + dj >= size_x) {
					continue;
				} else {
					if (map[root_row * size_x + (root_col + dj)] == 1) {
						const result3 = fillMapByOffsetPoint(root_row, root_col, 0, dj, map, size_x, size_y);
						map = result3.map;
					} else if (map[root_row * size_x + (root_col + dj)] == 0) {
						break;
					}
				}
			}
			for (let dj = -1; dj >= -4; dj--) {
				if (root_row < 0 || root_row >= size_y || root_col + dj < 0 || root_col + dj >= size_x) {
					continue;
				} else {
					if (map[root_row * size_x + (root_col + dj)] == 1) {
						const result4 = fillMapByOffsetPoint(root_row, root_col, 0, dj, map, size_x, size_y);
						map = result4.map;
					} else if (map[root_row * size_x + (root_col + dj)] == 0) {
						break;
					}
				}
			}
		}
	}
	return {
		map: map,
	};
}

function fillMapByOffsetPoint(root_row: number, root_col: number, off_y: number, off_x: number, map: any, size_x: number, size_y: number) {
	const value = map[root_row * size_x + root_col];
	const temp_point = new Point(root_col + off_x, root_row + off_y);
	const scanLineFloodFill_result = scanLineFloodFill(map, temp_point, 1, value, size_x, size_y);
	return {
		map: scanLineFloodFill_result.result
	};
}

function fillInsidColorAndGetBound(area_info: RoomInfo[], fill_array: Point[], extend_door_point: Point[], map: any, size_x: number, size_y: number, x_min: number, y_min: number, resolution: number): { area_info: RoomInfo[], fill_array: Point[], extend_door_point: Point[], map: any } {
	let dst = new Array(size_y * size_x).fill(1);

	// 0.获取基础数据
	const chain_infor_list = [];
	const color_id_list = [];
	const center_pose_list = [];
	const door_lines = [];
	const door_area_ids = [];
	for (const area of area_info) {
		chain_infor_list.push(area.chain_infor);
		color_id_list.push(area.tid);
		center_pose_list.push(area.center_pose);
		for (let i = 0; i < area.door_info.length; i++) {
			door_lines.push(area.door_info[i].door_point);
			door_area_ids.push(area.door_info[i].area_id);
		}
	}

	// 1.获得内部填色地图
	let inside_color_map = [...dst];
	const getInsideColorMap_result = getInsideColorMap(inside_color_map, chain_infor_list, color_id_list, center_pose_list, size_x, size_y, x_min, y_min, resolution);
	inside_color_map = getInsideColorMap_result.inside_color_map;

	// 2. 填入房间链条为 -value
	for (let i = 0; i < chain_infor_list.length; ++i) {
		for (const point of chain_infor_list[i]) {
			if (point.chain_point.y < 0 || point.chain_point.x < 0 || point.chain_point.y >= size_y || point.chain_point.x >= size_x) {
				return {
					area_info: area_info,
					fill_array: fill_array,
					extend_door_point: extend_door_point,
					map: map
				};
			}
			const row = point.chain_point.y;
			const col = point.chain_point.x;
			dst[row * size_x + col] = -1 * color_id_list[i]; // 后面的覆盖前面的链条点
		}
	}

	// 2.链条外填成0
	const init_seed = { x: 1, y: 1 };
	const scanLineFloodFill_result = scanLineFloodFill(dst, init_seed, 1, 0, size_x, size_y);
	dst = scanLineFloodFill_result.result;

	// 3.填入延长门线
	const fillExtendDoorLineInMap_result = fillExtendDoorLineInMap(dst, inside_color_map, door_lines, door_area_ids, extend_door_point, size_x, size_y);
	dst = fillExtendDoorLineInMap_result.fill_map;
	inside_color_map = fillExtendDoorLineInMap_result.color_map;
	extend_door_point = fillExtendDoorLineInMap_result.extend_door_point;

	const four_neigh = [[-1, 0], [1, 0], [0, -1], [0, 1]];

	// 4.各房间填色
	for (let i = 0; i < color_id_list.length; ++i) {
		if (init_seed.y >= 0 && init_seed.y < size_y && init_seed.x >= 0 && init_seed.x < size_x && dst[init_seed.y * size_x + init_seed.x] !== 1) { // 保护，避免中点被堵住，漫水失败
			dst[init_seed.y * size_x + init_seed.x] = 1;
		}
		init_seed.x = x2idx(center_pose_list[i].x, x_min, resolution);
		init_seed.y = y2idx(center_pose_list[i].y, y_min, resolution);
		const scanLineFloodFill_result2 = scanLineFloodFill(dst, init_seed, 1, color_id_list[i], size_x, size_y);
		dst = scanLineFloodFill_result2.result;
	}

	// 5.获得有效外扩填色链条
	for (let i = 0; i < chain_infor_list.length; ++i) {
		const single_array = [];
		for (const point of chain_infor_list[i]) {
			if (dst[point.chain_point.y * size_x + point.chain_point.x] !== CONSTANTS.BOUNDARY) {
				for (let k = 0; k < 4; ++k) {
					const tmp_row = point.chain_point.y + four_neigh[k][0];
					const tmp_col = point.chain_point.x + four_neigh[k][1];
					if (dst[tmp_row * size_x + tmp_col] === color_id_list[i]) {
						const new_p = new Point(point.chain_point.x, point.chain_point.y);
						single_array.push(new_p);
						break;
					}
				}
			}
		}

		for (const point of single_array) { // 有效链条点填回color_id
			dst[point.y * size_x + point.x] = color_id_list[i];
		}
		fill_array.push(...single_array);
	}

	for (let i = 0; i < size_y; i++) {
		for (let j = 0; j < size_x; j++) {
			const index = i * size_x + j;
			if (map[index] === 1 && (dst[index] > 1 || dst[index] === CONSTANTS.BOUNDARY)) {
				map[index] = dst[index];
			}
		}
	}

	return {
		area_info: area_info,
		fill_array: fill_array,
		extend_door_point: extend_door_point,
		map: map
	};
}

function getInsideColorMap(inside_color_map: any, chain_infor_list: ChainPoint[][], color_id_list: number[], center_pose_list: Point[], size_x: number, size_y: number, x_min: number, y_min: number, resolution: number): { inside_color_map: any } {
	for (let i = 0; i < chain_infor_list.length; ++i) {
		for (const point of chain_infor_list[i]) {
			if (point.chain_point.y < 0 || point.chain_point.x < 0 || point.chain_point.y >= size_y || point.chain_point.x >= size_x) {
				return {
					inside_color_map: inside_color_map
				};
			}
			const row = point.chain_point.y;
			const col = point.chain_point.x;
			const rowOffset = row * size_x;
			inside_color_map[rowOffset + col] = color_id_list[i]; // 后面的覆盖前面的链条点
		}
	}

	const init_seed = { x: 1, y: 1 };
	const scanLineFloodFill_result = scanLineFloodFill(inside_color_map, init_seed, 1, 0, size_x, size_y);
	inside_color_map = scanLineFloodFill_result.result;

	for (let i = 0; i < color_id_list.length; ++i) {
		if (init_seed.y >= 0 && init_seed.y < size_y && init_seed.x >= 0 && init_seed.x < size_x &&
        inside_color_map[init_seed.y * size_x + init_seed.x] !== 1) { // 保护，避免中点被堵住，漫水失败
			inside_color_map[init_seed.y * size_x + init_seed.x] = 1;
		}
		init_seed.x = x2idx(center_pose_list[i].x, x_min, resolution);
		init_seed.y = y2idx(center_pose_list[i].y, y_min, resolution);
		const scanLineFloodFill_result2 = scanLineFloodFill(inside_color_map, init_seed, 1, color_id_list[i], size_x, size_y);
		inside_color_map = scanLineFloodFill_result2.result;
	}

	return {
		inside_color_map: inside_color_map
	};
}

function x2idx(x: number, x_min: number, resolution: number) {
	return Math.floor((x - x_min) / resolution);
}

function y2idx(y: number, y_min: number, resolution: number) {
	return Math.floor((y - y_min) / resolution);
}

function fillExtendDoorLineInMap(fill_map: any, color_map: any, door_lines: Point[][], door_area_ids: number[][], extend_door_point: Point[], size_x: number, size_y: number): { fill_map: any, color_map: any, extend_door_point: Point[] } {
	for (let i = 0; i < door_lines.length; ++i) {
		const door_point = door_lines[i];
		const door_id = door_area_ids[i];
		const mid = Math.floor(door_point.length / 2);
		for (let j = mid; j >= 0; --j) {
			const point = door_point[j];
			let color_val = color_map[point.y * size_x + point.x]; // 如果碰到了其他房间，直接break
			if (color_val < -9) {
				color_val = -1 * color_val;
			}
			if (point.x < 0 || point.x >= size_x || point.y < 0 || point.y >= size_y) {
				break;
			}
			const notIndeque_result = notIndeque(door_id, color_val);
			if (color_val > 1 && notIndeque_result.result) {
				break;
			}

			fill_map[point.y * size_x + point.x] = CONSTANTS.BOUNDARY;
			extend_door_point.push(point);
		}

		for (let j = mid + 1; j < door_point.length; ++j) {
			const point = door_point[j];
			let color_val = color_map[point.y * size_x + point.x]; // 如果碰到了其他房间，直接break
			if (color_val < -9) {
				color_val = -1 * color_val;
			}
			if (point.x < 0 || point.x >= size_x || point.y < 0 || point.y >= size_y) {
				break;
			}
			const notIndeque_result = notIndeque(door_id, color_val);
			if (color_val > 1 && notIndeque_result.result) {
				break;
			}

			fill_map[point.y * size_x + point.x] = CONSTANTS.BOUNDARY;
			extend_door_point.push(point);
		}
	}

	return {
		fill_map: fill_map,
		color_map: color_map,
		extend_door_point: extend_door_point
	};
}

function notIndeque(find_list: any, search_num: any) {
	for (const num of find_list) {
		if (num === search_num) {
			return {
				result: false
			};
		}
	}
	return {
		result: true
	};
}

function floodfillDoorAndChainPoint(fill_array: Point[], close_array: Point[], extend_door_point: Point[], map: any, size_x: number, size_y: number): { fill_array: Point[], close_array: Point[], extend_door_point: Point[], map: any } {
	const eight_neighbourhood = [[0, -1], [0, 1], [-1, 0], [1, 0]]; // 上下左右

	while (fill_array.length > 0) {
		let find_flag = false;
		let fill_count = 0;
		const root_col = fill_array[0].x;
		const root_row = fill_array[0].y;
		fill_array.shift();

		for (let i = 0; i < 4; ++i) {
			const tmp_x = root_col + eight_neighbourhood[i][0];
			const tmp_y = root_row + eight_neighbourhood[i][1];
			if (tmp_y < 0 || tmp_y >= size_y || tmp_x < 0 || tmp_x >= size_x) {
				continue;
			}
			if (map[tmp_y * size_x + tmp_x] === 1) {
				if (map[root_row * size_x + root_col] > 1) {
					find_flag = true;
					map[tmp_y * size_x + tmp_x] = map[root_row * size_x + root_col];
					const temp_point = new Point(tmp_x, tmp_y);
					fill_array.push(temp_point);
				} else if (map[root_row * size_x + root_col] === CONSTANTS.BOUNDARY) {
					let opp_x = -1, opp_y = -1;
					if (i === 0) {
						opp_x = root_col + eight_neighbourhood[1][0];
						opp_y = root_row + eight_neighbourhood[1][1];
					} else if (i === 1) {
						opp_x = root_col + eight_neighbourhood[0][0];
						opp_y = root_row + eight_neighbourhood[0][1];
					} else if (i === 2) {
						opp_x = root_col + eight_neighbourhood[3][0];
						opp_y = root_row + eight_neighbourhood[3][1];
					} else if (i === 3) {
						opp_x = root_col + eight_neighbourhood[2][0];
						opp_y = root_row + eight_neighbourhood[2][1];
					}

					if (opp_x >= 0 && opp_x < size_x && opp_y >= 0 && opp_y < size_y && map[opp_y * size_x + opp_x] === CONSTANTS.BOUNDARY) {
						map[tmp_y * size_x + tmp_x] = map[root_row * size_x + root_col];
						const temp_point = new Point(tmp_x, tmp_y);
						fill_array.push(temp_point);
						extend_door_point.push(temp_point);
					}
				}
			} else if (map[tmp_y * size_x + tmp_x] > 1) {
				fill_count++;
			}
		}
		if (!find_flag && fill_count < 4) {
			// 没有找到漫水点，并且周围有墙点，定为边缘点，用于补填色
			const temp_point = new Point(root_col, root_row);
			close_array.push(temp_point); // 记下边缘点
		}
	}

	return {
		fill_array: fill_array,
		close_array: close_array,
		extend_door_point: extend_door_point,
		map: map
	};
}

function getEachDoorPointColor(extend_door_point: any, fill_door_point: any, color_id_list: any, map: any, size_x: number, size_y: number) {
	// 遍历门点，优先用更小房间填
	// 0. 获取colorId和index的对应关系
	const color_id_map = new Map();
	for (let i = 0; i < color_id_list.length; ++i) {
		const color = color_id_list[i];
		color_id_map.set(color, i + 1);
	}
	const fill_point_color = [];
	const supple_fill_point = []; //后续再确认的颜色点

	// 1.先恢复通路，提高漫水效率（一段延长门点理应属于同一个colorID）
	const four_neighbour_direct = [[0, -1], [0, 1], [-1, 0], [1, 0]]; // 上下左右
	for (let i = 0; i < extend_door_point.length; ++i) {
		const point = extend_door_point[i];
		const row = point.y;
		const col = point.x;
		const rowOffset = row * size_x;
		if (map[rowOffset + col] === CONSTANTS.BOUNDARY) {
			const direct_color: number[] = [];
			const color_map = new Map<number, number>();
			for (let j = 0; j < 4; ++j) {
				const x = point.x + four_neighbour_direct[j][0];
				const y = point.y + four_neighbour_direct[j][1];
				let cell_value = 0;
				if (!(x < 0 || y < 0 || x >= size_x || y >= size_y)) {
					cell_value = map[y * size_x + x];
					if (cell_value >= 10) {
						color_map.set(cell_value, (color_map.get(cell_value) || 0) + 1);
					}
				}
				direct_color.push(cell_value);
			}
			if (direct_color.length !== 4) {
				// 找到补填色点
				continue;
			}

			if ((direct_color[0] === CONSTANTS.BOUNDARY || direct_color[1] === CONSTANTS.BOUNDARY) && (direct_color[2] === CONSTANTS.BOUNDARY || direct_color[3] === CONSTANTS.BOUNDARY)) {
				supple_fill_point.push(point);
			} else if ((direct_color[0] === CONSTANTS.BOUNDARY || direct_color[1] === CONSTANTS.BOUNDARY) && (direct_color[0] === -1 || direct_color[1] === -1) || (direct_color[2] === CONSTANTS.BOUNDARY || direct_color[3] === CONSTANTS.BOUNDARY) && (direct_color[2] === -1 || direct_color[3] === -1)) {
				supple_fill_point.push(point);
			} else {
				let max_color = -1;
				let max_index = -1;
				let max_num = 0;

				color_map.forEach((count, color_id) => {
					if (count >= max_num) {
						if (!color_id_map.has(color_id)) {
							return;
						}
						if (count > max_num || (color_id_map.get(color_id) > max_index)) {
							max_num = count;
							max_index = color_id_map.get(color_id);
							max_color = color_id;
						}
					}
				});
				if (max_color !== -1) {
					fill_door_point.push(point);
					fill_point_color.push(max_color);
					if (fill_door_point.length !== fill_point_color.length) { //数量不匹配，直接填值
						map[rowOffset + col] = max_color;
					}
				}
			}
		}
	}

	if (fill_door_point.length === fill_point_color.length) {
		for (let i = 0; i < fill_door_point.length; ++i) {
			const p_t = fill_door_point[i];
			map[p_t.y * size_x + p_t.x] = fill_point_color[i];
		}
	}

	//确认剩余门点颜色
	for (let i = 0; i < supple_fill_point.length; ++i) {
		const point = supple_fill_point[i];
		const row = point.y;
		const col = point.x;

		const rowOffset = row * size_x;
		if (map[rowOffset + col] === CONSTANTS.BOUNDARY || map[rowOffset + col] === 1) {
			//找周围有没有颜色点
			map[rowOffset + col] = 1;
			const color_map = new Map<number, number>();
			for (let j = 0; j < 4; ++j) {
				// 找4邻域颜色
				const x = point.x + four_neighbour_direct[j][0];
				const y = point.y + four_neighbour_direct[j][1];
				if (!(x < 0 || y < 0 || x >= size_x || y >= size_y)) {
					const cell_value = map[y * size_x + x];
					if (cell_value >= 10) {
						color_map.set(cell_value, (color_map.get(cell_value) || 0) + 1);
					}
				}
			}
			let max_color = -1;
			let max_index = -1;
			let max_num = 0;

			color_map.forEach((count, color_id) => {
				if (count >= max_num && color_id_map.has(color_id) && (count > max_num || (color_id_map.get(color_id) > max_index))) {
					max_num = count;
					max_index = color_id_map.get(color_id);
					max_color = color_id;
				}

			});
			if (max_color !== -1) {
				map[rowOffset + col] = max_color;
			}
		}
	}

	let index = 0;
	while (index < extend_door_point.length) { // 将剩余-2点变成1
		const point = extend_door_point[index];
		index++;
		if (map[point.y * size_x + point.x] === CONSTANTS.BOUNDARY) {
			map[point.y * size_x + point.x] = 1;
		}
	}

	return {
		extend_door_point: extend_door_point,
		fill_door_point: fill_door_point,
		color_id_list: color_id_list,
		map: map
	};
}

function floodfillEachPoint(fill_array: Point[], close_array: Point[], map: any, size_x: number, size_y: number): { fill_array: Point[], close_array: Point[], map: any } {
	while (fill_array.length > 0) {
		let find_flag = false;
		let fill_count = 0;
		const root_col = fill_array[0].x;
		const root_row = fill_array[0].y;
		fill_array.shift();

		for (let di = -1; di <= 1; di++) {
			for (let dj = -1; dj <= 1; dj++) {
				if (di !== 0 && dj !== 0) {
					continue;
				} else {
					if (root_row + di < 0 || root_row + di >= size_y || root_col + dj < 0 || root_col + dj >= size_x) {
						continue;
					}
					if (map[(root_row + di) * size_x + root_col + dj] === 1) {
						if (map[root_row * size_x + root_col] > 1) {
							find_flag = true;
							map[(root_row + di) * size_x + root_col + dj] = map[root_row * size_x + root_col];
							const temp_point = new Point(root_col + dj, root_row + di);
							fill_array.push(temp_point);
						}
					} else if (map[(root_row + di) * size_x + root_col + dj] > 1) {
						fill_count++;
					}
				}
			}
		}

		if (!find_flag && fill_count < 4) {
			const temp_point = new Point(root_col, root_row);
			close_array.push(temp_point);
		}
	}

	return {
		fill_array: fill_array,
		close_array: close_array,
		map: map
	};
}


function scanLineFloodFill(dst: any, initial_seed: Point, raw_value: number, new_value: number, size_x: number, size_y: number): { result: any } {
	let scan_line_seed: Point[] = [];
	scan_line_seed.push(initial_seed);

	let tempDst: any;
	let index = 0;
	while (index < scan_line_seed.length) {
		const seed = scan_line_seed[index];
		index++;
		const result1 = floodFillLine(dst, seed, -1, raw_value, new_value, size_x);
		const x_left = result1.boundary;
		const result2 = floodFillLine(result1.dst, seed, 1, raw_value, new_value, size_x);
		const x_right = result2.boundary;
		tempDst = result2.dst;

		const searchLineForNewSeed_result1 = searchLineForNewSeed(result2.dst, x_left, x_right, seed.y - 1, raw_value, scan_line_seed, size_x, size_y);
		scan_line_seed = searchLineForNewSeed_result1.result;
		const searchLineForNewSeed_result2 = searchLineForNewSeed(result2.dst, x_left, x_right, seed.y + 1, raw_value, scan_line_seed, size_x, size_y);
		scan_line_seed = searchLineForNewSeed_result2.result;
	}

	return {result: tempDst};
}

function floodFillLine(dst: any, initial_seed: any, direction: number, raw_value: number, new_value: number, size_x: number) {
	const row = initial_seed.y;
	let col = initial_seed.x;
	let boundary = col;

	if (direction > 0) {
		col += direction;
	}

	while (col >= 0 && col < size_x) {
		if (dst[row * size_x + col] == raw_value) {
			boundary = col;
			dst[row * size_x + col] = new_value;
			col += direction;
		} else {
			break;
		}
	}

	return {
		dst: dst,
		boundary: boundary
	};
}

function searchLineForNewSeed(dst: any, x_left: number, x_right: number, line_row: number, raw_value: number, scan_line_seed: any, size_x: number, size_y: number) {
	if (line_row < 0 || line_row > size_y - 1) {
		return {result: scan_line_seed};
	}

	let x_right_copy = x_right;

	let is_find_seed = false;
	while (x_right_copy >= x_left) {
		if (dst[line_row * size_x + x_right_copy] == raw_value) {
			if (!is_find_seed) {
				const seed = new Point(x_right_copy, line_row);
				scan_line_seed.push(seed);
				is_find_seed = true;
			}
		} else {
			is_find_seed = false;
		}

		x_right_copy--;
	}
	return {result: scan_line_seed};
}

function fillInternalObstacles(map: any, tRect: Rect, size_x: number): { result: any } {
	let contour: Point[] = [];
	let internal_obstacles: Point[] = [];
	let contour_map = [...map];
	const result1 = extractExternalContoursNewStrategy(contour_map, contour, tRect, size_x);
	contour_map = result1.temp_map;
	contour = result1.contour;

	const result2 = findContourConnectComponent(contour_map, contour, tRect, size_x);
	contour_map = result2.temp_map;
	contour = result2.contour;

	const contour_map_result = fillBlackComponent(contour_map, contour, 30, size_x);
	contour_map = contour_map_result.result;

	const findInternalObstacles_result = findInternalObstacles(contour_map, internal_obstacles, tRect, size_x);
	internal_obstacles = findInternalObstacles_result.result;

	const map_result = fillBlackComponent(map, internal_obstacles, -9, size_x);
	map = map_result.result;

	return {result: map};
}

function findContourConnectComponent(temp_map: any, contour: Point[], rect: Rect, size_x: number): { temp_map: any, contour: Point[] } {
	const eight_neighbourhood = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, 1], [1, 1], [1, -1], [-1, -1]];
	const temp_contour = [...contour];

	const isInBounds = (x: number, y: number): boolean => (
		x >= rect.x &&
      x < rect.x + rect.height &&
      y >= rect.y &&
      y < rect.y + rect.width
	);

	while(temp_contour.length != 0)
	{
		const seed = temp_contour.shift()!;
		for(let k = 0; k < 8; k++)
		{
			const temp_idy = seed.x + eight_neighbourhood[k][0];
			const temp_idx = seed.y + eight_neighbourhood[k][1];

			if(!isInBounds(temp_idx, temp_idy))
				continue;

			if(temp_map[temp_idy * size_x + temp_idx] == CONSTANTS.BLACK)
			{
				temp_map[temp_idy * size_x + temp_idx] = 30;

				temp_contour.push(new Point(temp_idy, temp_idx));
				contour.push(new Point(temp_idy, temp_idx));
			}
		}
	}
	return {
		temp_map: temp_map,
		contour: contour
	};
}

function findInternalObstacles(temp_map: any, point_deque: Point[], rect: Rect, size_x: number): { result: Point[] } {
	for(let idy = rect.y; idy < rect.y + rect.width; idy++)
	{
		for(let idx = rect.x; idx < rect.x + rect.height; idx++)
		{
			if(temp_map[idy * size_x + idx] == CONSTANTS.BLACK)
				point_deque.push(new Point(idy, idx));
		}
	}
	return {result: point_deque};
}




