import ProfileForm from "../../components/Profile/EditProfile/ProfileForm";

function Profile() {
    return (
        <div className="container flex items-center justify-center px-4 py-12 mx-auto sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
                        Update Profile
                    </h2>
                </div>
                <ProfileForm />
            </div>
        </div>
    );
}

export default Profile;
