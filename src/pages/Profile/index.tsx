import { useParams } from "react-router-dom";
import { Fragment, useContext } from "react";
import ProfileForm from "../../components/Profile/EditProfile/ProfileForm";
import { Tab } from "@headlessui/react";
import { UserContext } from "../../components/context/UserContext/UserProvider";
import { User } from "../../Types/User";
import ProfileImage from "./ProfileImage";

function UserProfile() {
    const { userData, updateUserData } = useContext(UserContext);
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

            {userData && <ProfileImage userData={userData} />}
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
                                updateUserData={updateUserData}
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
