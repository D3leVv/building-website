export type Ship = {
    owner: string;
    description: string;
    image: string;
    id: number;
    category: string;
    title: string;
    rating: {
        count: number;
        rate: number;
    };
    price: number;
    timestamp?: Date;
    docID: string;
};
