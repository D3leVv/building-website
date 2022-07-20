import { useState, useEffect } from "react";
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    StorageError,
} from "firebase/storage";
import { storage } from "../../firebase/firebase-config";

const useFileUpload = (
    file: File | null,
    parentFolder = "news-images",
    childFolder: string
) => {
    const [progress, setProgress] = useState(0) as any;
    const [error, setError] = useState<StorageError | null>(null);
    const [url, setUrl] = useState() as any;

    useEffect(() => {
        if (!file) return;
        //add file.name + file.exttention to the storageRef
        const storageRef = ref(
            storage,
            `${parentFolder}/${childFolder}/${file.name}`
        );
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prc = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(prc);
            },
            (error) => {
                return setError(error);
            },
            () => {
                getDownloadURL(storageRef)
                    .then((url) => {
                        setUrl({ url, name: file.name });
                    })
                    .catch((e) => {
                        setError(e);
                        console.log(e.message);
                    });
            }
        );
    }, [file, parentFolder, childFolder]);

    return { progress, error, url };
};

export default useFileUpload;
