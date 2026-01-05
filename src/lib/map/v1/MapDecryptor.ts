import * as MapHelper from "../MapHelper";

export class MapDecryptor {
	/**
	 * Decompresses V1 map data using centralized robust decompression.
	 * @param rawData The raw buffer from the robot.
	 * @returns The decompressed buffer, or the original buffer if not compressed.
	 */
	public static async decrypt(rawData: Buffer): Promise<Buffer> {
		return MapHelper.decompress(rawData);
	}
}
