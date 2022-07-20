import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {
    CollectionReference,
    DocumentData,
    getFirestore,
    doc,
    collection,
    serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_API_KEY}`,
    authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
    projectId: `${process.env.REACT_APP_PROJECT_ID}`,
    storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER}`,
    appId: `${process.env.REACT_APP_APP_ID}`,
    measurementId: `${process.env.REACT_APP_MEASUREMENT_ID}`,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const firebaseServerTimestap = serverTimestamp();


export function createDocumentIDRef(collectionID: string) {
    const collectionRef: CollectionReference<DocumentData> = collection(
        db,
        collectionID
    );
    const documentID = doc(collectionRef);
    return documentID.id;
}



export const storage = getStorage(app);
export const auth = getAuth(app);
