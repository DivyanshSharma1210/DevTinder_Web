import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionslice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const userConnections = await axios.get(
        BASE_URL + "/user/connections",
        { withCredentials: true }
      );
      dispatch(addConnections(userConnections.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  },);

  if (!connections) return null;
  if (connections.length === 0)
    return (
      <div className="text-center my-20 text-gray-500 text-lg">
        No Connections found
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Connections</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {connections.map((connection, index) => {
            console.log(connection)
          const { firstName, lastName, age, gender, about, photoUrl } =
            connection;
          return (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center transition-transform transform hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                alt={firstName + " " + lastName}
                src={photoUrl || "https://via.placeholder.com/150"}
                className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-gray-200"
              />
              <h2 className="font-semibold text-lg text-gray-800">
                {firstName}  {lastName}
              </h2>
              {age && gender && (
                <p className="text-sm text-gray-500 mb-2">
                  {age}, {gender}
                </p>
              )}
              <p className="text-center text-gray-600 text-sm mb-3">{about}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
