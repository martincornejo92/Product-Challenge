
export interface List {
    createdAt: string;
    product: string;
    points: any;
    image: string;
    is_redemption: boolean;
    id: string;
}

export type StoredProduct =  Pick<List, 'createdAt' | 'product' | 'points' | 'image' | 'is_redemption' | 'id' >