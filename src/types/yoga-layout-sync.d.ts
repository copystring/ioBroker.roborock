/**
 * yoga-layout 2.0.1 publishes the correct declarations next to its runtime,
 * but its package exports predate TypeScript's CommonJS `moduleResolution: Node`
 * handling. Keep that compatibility detail at the AppPlugin host boundary.
 */
declare module "yoga-layout/sync" {
	export * from "yoga-layout/src/entrypoint/wasm-sync-node";
	import Yoga from "yoga-layout/src/entrypoint/wasm-sync-node";
	export default Yoga;
}
