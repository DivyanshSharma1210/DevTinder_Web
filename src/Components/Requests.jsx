import React, { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, removeRequest } from '../utils/requestSlice';

export const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();


  const reviewRequest=async(status,_id)=>{

    try
    {
        await axios.post(BASE_URL+"/request/review/"+status +"/" +_id,{},{withCredentials:true});

       dispatch(removeRequest(_id));

    }
    catch(err)
    {
        console.error(err);
    }
  }

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        BASE_URL + '/user/requests/received',
        { withCredentials: true }
      );
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ✅ Conditional rendering before JSX
  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <div className="text-center my-20 text-gray-500 text-lg">
        No Requests found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Requests</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((request, index) => {
          console.log(request);
          const { firstName, lastName, age, gender, about, photoUrl } =
            request.fromUserId || {};

          return (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center transition-transform transform hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                alt={`${firstName || ''} ${lastName || ''}`}
                src={photoUrl || 'https://via.placeholder.com/150'}
                className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-gray-200"
              />
              <h2 className="font-semibold text-lg text-gray-800">
                {firstName} {lastName}
              </h2>
              {age && gender && (
                <p className="text-sm text-gray-500 mb-2">
                  {age}, {gender}
                </p>
              )}
              <p className="text-center text-gray-600 text-sm mb-3">{about}</p>
              <div>
              <button className="btn btn-primary mx-2" onClick={()=>reviewRequest("rejected",request._id)}>Reject</button>
              <button className="btn btn-secondary mx-2 " onClick={()=>reviewRequest("accepted",request._id)}>Accept</button>
             </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
