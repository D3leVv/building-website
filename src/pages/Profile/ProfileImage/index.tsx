import { User } from "../../../Types/User";

const ProfileImage = ({ userData }: { userData: User }) => {
    return (
        <div className="flex flex-col items-center justify-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-200 border-2 border-yellow-400 rounded-full">
                {userData?.image.url ? (
                    <img
                        src={userData?.image.url}
                        className="object-cover w-full h-full rounded-full"
                        alt={userData.firstName}
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-200 border-2 border-yellow-400 rounded-full ">
                        <p className="text-lg font-bold capitalize">
                            {userData?.firstName[0]}
                        </p>
                    </div>
                )}
            </div>
            <p>{userData?.firstName}</p>
        </div>
    );
};

export default ProfileImage;
