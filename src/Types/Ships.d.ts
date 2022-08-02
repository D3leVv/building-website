import { FieldValue } from "firebase/firestore";

export type Ship = {
    owner: string;
    description: string;
    image: string;
    title: string;
    price: number;
    timestamp?: FieldValue;
    docID: string;
};
