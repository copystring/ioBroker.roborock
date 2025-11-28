import { Roborock } from "../main";
export declare class roborock_package_helper {
    adapter: Roborock;
    constructor(adapter: Roborock);
    updateProduct(loginApi: any, productID: string, duid: string): Promise<void>;
    findProductIDinPackage(productID: string, list: any): any;
}
