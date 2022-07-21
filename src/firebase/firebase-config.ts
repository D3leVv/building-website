import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, deleteObject } from "firebase/storage";
import {
    CollectionReference,
    DocumentData,
    getFirestore,
    doc,
    getDoc,
    collection,
    serverTimestamp,
    FieldValue,
    addDoc,
    query,
    where,
    limit,
    getDocs,
    setDoc,
    updateDoc,
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
export const db = getFirestore(app);
export const firebaseServerTimestap = serverTimestamp();

export function createDocumentIDRef(collectionID: string) {
    const collectionRef: CollectionReference<DocumentData> = collection(
        db,
        collectionID
    );
    const documentID = doc(collectionRef);
    return documentID.id;
}

export async function deletePicture(path: string, fileName: string) {
    const spaceRef = ref(storage, `${path}/${fileName}`);

    // Delete the file
    try {
        await deleteObject(spaceRef);
        return "success";
    } catch (error) {
        console.log(error);
    }
}

export async function writeSingleDocument(
    collectionReference: "news" | "Users",
    payload: any
) {
    try {
        payload["timestamp"] = firebaseServerTimestap;
        await addDoc(collection(db, collectionReference), payload);
        return "success";
    } catch (error: any) {
        console.log(error.message);
        throw new Error("Error in writing document to Firebase");
    }
}

export async function writeSingleUserDocument(
    collectionReference: "Users",
    payload: any,
    documentID: string
) {
    try {
        payload["timestamp"] = firebaseServerTimestap;
        await setDoc(doc(db, collectionReference, documentID), payload);
        return "success";
    } catch (error: any) {
        console.log(error.message);
        throw new Error("Error in writing document to Firebase");
    }
}

export async function getSingleDocWithDocId(
    collectionRef: string,
    docID: string
) {
    const docReference = doc(db, collectionRef, docID);
    try {
        const res = await getDoc(docReference);
        const data = res.data();
        return data;
    } catch (error: any) {
        console.log(error.message);
        throw new Error("Error in fetching document from Firebase");
    }
}
export async function getDocumentsWithWhere(
    collectionToQuery: string,
    whereStatments: Array<{
        field: string;
        operator: any;
        searchValue: string | number | boolean | Array<any>;
    }>,
    limitResults: number
) {
    const collectionRef = collection(db, collectionToQuery);

    let collectionQuery;
    try {
        for (let statment of whereStatments) {
            collectionQuery = query(
                collectionRef,
                where(statment.field, statment.operator, statment.searchValue),
                limit(limitResults)
            );
        }

        if (collectionQuery) {
            const firebaseResults = (await getDocs(collectionQuery)).docs;

            return firebaseResults;
        }
    } catch (error) {
        console.log(error);
    }
}

// Update Single Document
export async function updateSingleDocumentWithDocID<T>(
    collection: "Users" | "news",
    payload: T & { timestamp?: FieldValue },
    docID: string
) {
    try {
        payload["timestamp"] = firebaseServerTimestap;
        await updateDoc(doc(db, collection, docID), payload);
        return "success";
    } catch (error) {
        console.log(error);
        throw new Error("Error in writing document to Firebase");
    }
}

export const storage = getStorage(app);
export const auth = getAuth(app);
