import { Roborock } from "../main";
export declare class AppPluginManager {
    adapter: Roborock;
    constructor(adapter: Roborock);
    downloadAppPlugins(): Promise<void>;
    updateProduct(duid: string): Promise<void>;
}
