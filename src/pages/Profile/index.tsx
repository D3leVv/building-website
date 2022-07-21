import { DocumentData } from "firebase/firestore";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../components/context/UserContext/UserProvider";
import ProfileForm from "../../components/Profile/EditProfile/ProfileForm";
import { getSingleDocWithDocId } from "../../firebase/firebase-config";
import { User } from "../../Types/User";

function Profile() {
    const { user } = useContext<any>(UserContext);
    const [userData, setUserData] = useState<DocumentData | User>();

    useEffect(() => {
        (async () => {
            const getUserData = await getSingleDocWithDocId("Users", user.uid);
            setUserData(getUserData);
        })();
    }, [user]);

    return (
        <div className="container flex items-center justify-center px-4 py-12 mx-auto sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
                        Update Profile
                    </h2>
                </div>
                {userData && (
                    <ProfileForm userData={userData} docID={String(user.uid)} />
                )}
            </div>
        </div>
    );
}

export default Profile;
