export interface RriotData {
    u: string;
    s: string;
    h: string;
    k: string;
    r: {
        r: string;
        a: string;
        m: string;
        l: string;
    };
}
export interface LoginV4Result {
    uid: number;
    rruid: string;
    token: string;
    region: string;
    countrycode: string;
    country: string;
    nickname: string;
    avatarUrl: string;
    rriot: RriotData;
}
export interface LoginV4Response {
    code: number;
    msg: string;
    data?: LoginV4Result;
}
export interface ProductTag {
    name: string;
    requirePlugin: boolean;
    pluginLevel: number;
    forceShow: boolean;
}
export interface CardSpecValue {
    desc: Record<string, string>;
    value: number[];
}
export interface CardSpecItem {
    dps: number;
    desc?: Record<string, string>;
    value?: CardSpecValue[];
}
export interface CardSpecData {
    data: {
        state?: CardSpecItem;
        battery?: CardSpecItem;
        offline?: CardSpecItem;
        offpeak?: CardSpecItem;
        error?: CardSpecItem;
        [key: string]: CardSpecItem | undefined;
    };
}
export interface ProductCategory {
    id: number;
    code: string;
    displayName: string;
    iconUrl: string;
    cardspec: string;
}
export interface ProductInfo {
    id: number;
    name: string;
    model: string;
    picurl: string;
    productTags: ProductTag[];
}
export interface CategoryDetail {
    category: ProductCategory;
    productList: ProductInfo[];
}
export interface ProductV5Response {
    code: number;
    msg: string;
    data: {
        categoryDetailList: CategoryDetail[];
    };
}
