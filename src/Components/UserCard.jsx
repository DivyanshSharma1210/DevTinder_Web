import React from 'react'

const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, photoUrl, about } = user;

  return (
    <div className="flex justify-center items-center p-4">
      <div className="card bg-base-100 w-96 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden border border-gray-200">
        
        {/* User Image */}
        <figure className="bg-gray-100 h-60 overflow-hidden">
          <img
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </figure>

        {/* Card Content */}
        <div className="card-body p-5">
          <h2 className="card-title text-lg font-semibold text-gray-800">
            {firstName} {lastName}
          </h2>
          <p className="text-sm text-gray-600">{age} years old, {gender}</p>
          <p className="text-gray-700 text-sm mt-2">{about}</p>

          {/* Actions */}
          <div className="card-actions justify-center mt-4 space-x-3">
            <button className="btn btn-error btn-sm px-5 rounded-full shadow-md hover:shadow-lg">
              Ignore
            </button>
            <button className="btn btn-primary btn-sm px-5 rounded-full shadow-md hover:shadow-lg">
              Send Connection Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
