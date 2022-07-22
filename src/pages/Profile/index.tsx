import { useParams } from "react-router-dom";
import { DocumentData } from "firebase/firestore";
import { useState, useEffect } from "react";
import ProfileForm from "../../components/Profile/EditProfile/ProfileForm";
import { getSingleDocWithDocId } from "../../firebase/firebase-config";
import { User } from "../../Types/User";

function Profile() {
    const [userData, setUserData] = useState<DocumentData | User>();
    const { userID } = useParams();
    useEffect(() => {
        if (!userID) return;
        (async () => {
            const getUserData = await getSingleDocWithDocId("Users", userID);
            setUserData(getUserData);
        })();
    }, [userID]);

    return (
        <div className="container flex items-center justify-center px-4 py-12 mx-auto sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900 dark:text-white">
                        Update Profile
                    </h2>
                </div>
                {userData && (
                    <ProfileForm userData={userData} docID={String(userID)} />
                )}
            </div>
        </div>
    );
}

export default Profile;
