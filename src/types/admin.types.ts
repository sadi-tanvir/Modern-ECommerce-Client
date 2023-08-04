export type AdminStockDetailsType = {
    _id: string;
    name: string;
    description: string;
    unit: string;
    status: string;
    imageUrl: string;
    price: number;
    discount: number;
    quantity: number;
    sellCount: number;
    category: {
        id: {
            _id: string;
            name: string;
        };
    };
    brand: {
        id: {
            _id: string;
            name: string;
        }
    };
};
