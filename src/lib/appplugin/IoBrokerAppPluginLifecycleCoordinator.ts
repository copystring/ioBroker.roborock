export type IoBrokerAppPluginLifecycleCoordinatorState =
	| "open"
	| "closing"
	| "closed";

/**
 * Adapter-wide serialization boundary for AppPlugin operations which may
 * create a runtime generation or replace its installed package. Individual
 * model locks remain responsible for model-local invariants.
 */
export class IoBrokerAppPluginLifecycleCoordinator {
	#close?: Promise<void>;
	#operation: Promise<void> = Promise.resolve();
	#state: IoBrokerAppPluginLifecycleCoordinatorState = "open";

	public get state(): IoBrokerAppPluginLifecycleCoordinatorState {
		return this.#state;
	}

	public run<T>(operation: () => Promise<T>): Promise<T> {
		if (this.#state !== "open") {
			return Promise.reject(new Error("Der AppPlugin-Lebenszyklus wird bereits beendet"));
		}
		const result = this.#operation.then(operation, operation);
		this.#operation = result.then(() => undefined, () => undefined);
		return result;
	}

	public close(): Promise<void> {
		if (this.#close) return this.#close;
		this.#state = "closing";
		this.#close = this.#operation.then(() => {
			this.#state = "closed";
		});
		return this.#close;
	}
}
