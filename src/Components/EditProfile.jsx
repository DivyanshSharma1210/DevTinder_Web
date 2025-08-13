import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { XMarkIcon } from '@heroicons/react/24/solid';

const CustomAlert = ({ message, type, onClose }) => {
  let bgColor, textColor, icon;
  switch (type) {
    case "success":
      bgColor = "bg-green-100";
      textColor = "text-green-700";
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-8.72"/>
          <path d="M22 4L12 14.01l-3-3"/>
        </svg>
      );
      break;
    case "error":
      bgColor = "bg-red-100";
      textColor = "text-red-700";
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="15" y1="9" x2="9" y2="15"/>
          <line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
      );
      break;
    default:
      bgColor = "bg-gray-100";
      textColor = "text-gray-700";
      icon = null;
  }

  return (
    <div className={`p-4 rounded-lg flex items-center justify-between ${bgColor} ${textColor} transition-all duration-300 ease-in-out`}>
      <div className="flex items-center">
        {icon && <span className="mr-3">{icon}</span>}
        <span>{message}</span>
      </div>
      <button onClick={onClose} className={`p-1 rounded-full ${textColor} hover:${bgColor.replace('100', '200')}`}>
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
};


const EditProfile = ({ onSave }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    photoUrl: "",
    about: "",
    skills: [],
  });

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        age: user.age || "",
        gender: user.gender || "",
        photoUrl: user.photoUrl || "",
        about: user.about || "",
        skills: user.skills || [],
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "skills") {
      setFormData({ ...formData, skills: value.split(",").map((s) => s.trim()) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          ...formData,
          skills: formData.skills.map((s) => s.trim()),
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      if (onSave) onSave(res.data.data);
      setMessage("Profile updated successfully!");
      setMessageType("success");
    } catch (err) {
      console.error("Error saving profile:", err);
      setMessage("Failed to update profile!");
      setMessageType("error");
    } finally {
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    }
  };

  const handleCloseMessage = () => {
    setMessage(null);
    setMessageType(null);
  };

  return (
    <div className="bg-gray-50 rounded-2xl shadow-2xl p-10">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b-2 border-indigo-200 pb-2">
        Edit Profile
      </h2>
      
      {message && (
        <div className="mb-6">
          <CustomAlert message={message} type={messageType} onClose={handleCloseMessage} />
        </div>
      )}

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <input
          name="photoUrl"
          value={formData.photoUrl}
          onChange={handleChange}
          placeholder="Photo URL"
          className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
        />
        <textarea
          name="about"
          value={formData.about}
          onChange={handleChange}
          placeholder="About yourself"
          rows={5}
          className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
        />
        <input
          name="skills"
          value={formData.skills.join(", ")}
          onChange={handleChange}
          placeholder="Skills (e.g., React, JavaScript, CSS)"
          className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
        />
        <button
          onClick={saveProfile}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold tracking-wide px-6 py-4 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg transform hover:translate-y-[-2px]"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
