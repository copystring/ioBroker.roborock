import { Roborock } from "../main";
export declare class roborock_package_helper {
    adapter: Roborock;
    constructor(adapter: any);
    updateProduct(loginApi: any, productID: any, duid: any): Promise<void>;
    findProductIDinPackage(productID: any, list: any): any;
}
