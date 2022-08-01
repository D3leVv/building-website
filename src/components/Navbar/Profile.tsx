import { useContext } from "react";
import { UserContext } from "../context/UserContext/UserProvider";

function Profile() {
    const { userData } = useContext(UserContext);

    return (
        <div className="flex items-center justify-center gap-3">
            <p>{userData?.firstName}</p>
            <div className="flex items-center justify-center w-12 h-12 bg-gray-200 border-2 border-yellow-400 rounded-full">
                {userData?.image.url ? (
                    <img
                        src={userData?.image.url}
                        className="object-cover w-full h-full rounded-full"
                        alt={userData.name}
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-200 border-2 border-yellow-400 rounded-full ">
                        <p className="text-lg font-bold capitalize">
                            {userData?.firstName[0]}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;
