import { useParams } from "react-router-dom";
import { Fragment, useContext } from "react";
import ProfileForm from "../../components/Profile/EditProfile/ProfileForm";
import { Tab } from "@headlessui/react";
import { UserContext } from "../../components/context/UserContext/UserProvider";
import { User } from "../../Types/User";

function UserProfile() {
    const { userData } = useContext(UserContext);
    const { userID } = useParams();

    console.log("hello");
    return (
        // <div "className="container flex items-center justify-center px-4 py-12 mx-auto sm:px-6 lg:px-8>
        //     <div className="w-full max-w-md space-y-8">
        //         <div>
        //             <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900 dark:text-white">
        //                 Update Profile
        //             </h2>
        //         </div>
        //         {userData && (
        //             <ProfileForm userData={userData} docID={String(userID)} />
        //         )}
        //     </div>
        // </div>
        <div className="flex flex-col items-center justify-center w-full h-full">
            {/* Profile header */}

            <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
                <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                    <div className="flex-1 min-w-0 mt-6 sm:hidden 2xl:block">
                        <h1 className="text-2xl font-bold text-gray-900 truncate dark:text-gray-200">
                            {userData?.firstName}
                        </h1>
                    </div>
                </div>

                <div className="flex-1 hidden min-w-0 mt-6 sm:block 2xl:hidden">
                    <h1 className="text-2xl font-bold text-gray-900 truncate dark:text-gray-200">
                        {userData?.firstName}
                    </h1>
                </div>
            </div>

            <Tab.Group
                as="div"
                className="container flex flex-col items-center justify-center px-4 py-12 mx-auto sm:px-6 lg:px-8"
            >
                <Tab.List className="grid grid-cols-2 border border-gray-200 rounded-md ">
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button
                                className={`${
                                    selected
                                        ? "border-b-2 border-yellow-200"
                                        : "border-b-2 border-transparent"
                                } w-full h-full p-3`}
                            >
                                Profile information
                            </button>
                        )}
                    </Tab>
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button
                                className={`${
                                    selected
                                        ? "border-b-2 border-yellow-200"
                                        : "border-b-2 border-transparent"
                                } w-full h-full p-3`}
                            >
                                Update profile
                            </button>
                        )}
                    </Tab>
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>Content 1</Tab.Panel>
                    <Tab.Panel className="w-full h-full">
                        {userData && (
                            <ProfileForm
                                userData={userData}
                                docID={String(userID)}
                            />
                        )}
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}

export default UserProfile;

const ProfileImage = ({ userData }: { userData: User }) => {
    return (
        <div className="flex items-center justify-center gap-3">
            <p>{userData?.firstName}</p>
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
        </div>
    );
};
