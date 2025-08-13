import React from 'react';

const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, photoUrl, about } = user;

  return (
    // Main container with a clean, centered background
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      {/* The card with a modern, rounded design and a deep shadow */}
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 transform hover:scale-[1.02] transition-all duration-300 ease-in-out">
        
        {/* User Image section with a hover-zoom effect */}
        <figure className="h-60 overflow-hidden">
          <img
            src={photoUrl || "https://placehold.co/400x400/5D5D81/FFFFFF?text=User"}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            // Adding onerror for image fallback in case photoUrl is broken
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x400/5D5D81/FFFFFF?text=User" }}
          />
        </figure>

        {/* Card Content section with improved typography and spacing */}
        <div className="p-6 text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 leading-tight">
            {firstName} {lastName}
          </h2>
          <p className="text-sm text-gray-500 font-medium">
            {age ? `${age} years old` : "N/A"} • {gender || "N/A"}
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mt-2">
            {about || "No description provided."}
          </p>

          {/* Actions section with enhanced buttons and hover effects */}
          <div className="flex justify-center items-center gap-4 pt-4">
            {/* Ignore button with a subtle hover effect */}
            <button className="bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-full shadow-md hover:bg-gray-300 transition-colors duration-200 ease-in-out">
              Ignore
            </button>
            {/* Send Request button with a vibrant gradient and a lift effect on hover */}
            <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-0.5">
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
