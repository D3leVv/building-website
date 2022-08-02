import { FieldValue } from "firebase/firestore";

export type User = {
    firstName: string;
    lastName: string;
    email: string;
    score: number;
    heroShip: string;
    image: {
        url: string;
        alt: string;
    };
    timestamp?: FieldValue;
};
