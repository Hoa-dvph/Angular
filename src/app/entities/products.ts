export interface IProduct {
    id: number;
    productName: string;
    productCode: string;
    releaseDate: string;
    price: number;
    description: string;
    starRating: number;
    imageUrl: string;
    category: number;
}
export type ProductAdd = Omit<IProduct, 'id' | 'rating'> & {
    rate: number;
};