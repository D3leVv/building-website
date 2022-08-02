import { FieldValue } from "firebase/firestore";

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
    timestamp?: FieldValue;
    docID: string;
};
