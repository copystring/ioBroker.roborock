import { Roborock } from "../main";
export declare class roborock_package_helper {
    adapter: Roborock;
    constructor(adapter: Roborock);
    updateProduct(duid: string): Promise<void>;
}
