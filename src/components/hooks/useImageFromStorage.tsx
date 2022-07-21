import { useState, useEffect } from "react";
import { ref, getDownloadURL, StorageError } from "firebase/storage";
import { storage } from "../../firebase/firebase-config";

function useImageFromStorage(parentFolder: string, fileName: string) {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<StorageError | null>(null);
    const [currUrl, setCurrUrl] = useState<{ url: string; alt: string } | null>(
        null
    );

    useEffect(() => {
        async function runImage() {
            const storageRef = ref(storage, `${parentFolder}/${fileName}`);
            if (fileName)
                getDownloadURL(storageRef)
                    .then((url) => {
                        setCurrUrl({
                            url: url,
                            alt: fileName,
                        });
                    })
                    .catch((e) => {
                        setError(e);
                        console.log(e.message);
                    });
        }

        runImage();
    }, [fileName, parentFolder]);

    return { progress, error, currUrl, setCurrUrl };
}

export default useImageFromStorage;
