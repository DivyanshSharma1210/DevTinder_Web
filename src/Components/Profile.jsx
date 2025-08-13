import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Profile Details Card */}
        <div className="lg:w-1/3 bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
          <div className="flex flex-col items-center">
            <img
              // Corrected the key from 'photoURL' to 'photoUrl' to match the EditProfile component.
              src={user.photoUrl || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-indigo-500 object-cover shadow-md"
            />
            <h2 className="text-3xl font-extrabold text-gray-900 mt-4">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-lg text-gray-500 mt-1">{user.email}</p>
          </div>
          <div className="mt-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center text-gray-700">
                <span className="font-semibold w-24">Age:</span>
                <span className="ml-2">{user.age || "N/A"}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <span className="font-semibold w-24">Gender:</span>
                <span className="ml-2">{user.gender || "N/A"}</span>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">About</h3>
            <p className="text-gray-600 leading-relaxed">
              {user.about || "No description provided."}
            </p>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {user.skills && user.skills.length > 0 ? (
                user.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-800 text-sm font-medium px-4 py-1.5 rounded-full"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-gray-400 text-sm">No skills added</p>
              )}
            </div>
          </div>
        </div>

        {/* Edit Profile Card */}
        <div className="lg:w-2/3 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
            Edit Profile
          </h2>
          <EditProfile user={user} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
