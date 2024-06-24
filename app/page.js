// Portal.jsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useRequireAuth } from "@/utils/auth";

const Portal = () => {
  const router = useRouter();
  useRequireAuth(); // Ensure user is authenticated

  // State for household ID search, members data, and search input
  const [householdId, setHouseholdId] = useState("");
  const [members, setMembers] = useState(
    Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      name: `Member ${index + 1}`,
      age: 0,
    }))
  );
  const [searchInput, setSearchInput] = useState("");

  // Function to handle member name change
  const handleNameChange = (id, newName) => {
    const updatedMembers = members.map((member) =>
      member.id === id ? { ...member, name: newName } : member
    );
    setMembers(updatedMembers);
  };

  // Function to handle member age change
  const handleAgeChange = (id, newAge) => {
    const updatedMembers = members.map((member) =>
      member.id === id ? { ...member, age: newAge } : member
    );
    setMembers(updatedMembers);
  };

  // Function to handle saving changes
  const handleSave = () => {
    // Here you can implement saving logic
    console.log("Saved:", members);
    // Example: send data to backend or perform necessary actions
  };

  // Function to handle search input change
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Function to handle search button click
  const handleSearch = () => {
    // Here you can implement actual search logic
    console.log("Searching for household ID:", searchInput);
    // Example: search for household ID in database or API
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    router.push("/login"); // Redirect to login page
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-3xl h-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Household Information
        </h2>

        {/* Household ID search */}
        <div className="mb-4 flex items-center space-x-4">
          <input
            type="text"
            id="householdId"
            name="householdId"
            value={searchInput}
            onChange={handleSearchInputChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search Household ID"
            required
          />
          <button
            type="button"
            onClick={handleSearch}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Search
          </button>
        </div>

        {/* Members list for editing */}
        <div className="space-y-4 overflow-auto border-2 p-3 rounded h-[50vh]">
          {members.map((member) => (
            <div key={member.id} className="flex items-center space-x-4">
              <div className="w-1/2">
                <label
                  htmlFor={`memberName${member.id}`}
                  className="block text-sm font-medium text-gray-700"
                >{`Member ${member.id} Name`}</label>
                <input
                  type="text"
                  id={`memberName${member.id}`}
                  name={`memberName${member.id}`}
                  value={member.name}
                  onChange={(e) => handleNameChange(member.id, e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor={`memberAge${member.id}`}
                  className="block text-sm font-medium text-gray-700"
                >{`Member ${member.id} Age`}</label>
                <input
                  type="number"
                  id={`memberAge${member.id}`}
                  name={`memberAge${member.id}`}
                  value={member.age}
                  onChange={(e) =>
                    handleAgeChange(member.id, parseInt(e.target.value))
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
            </div>
          ))}
        </div>

        {/* Save button */}
        <button
          type="button"
          onClick={handleSave}
          className="mt-6 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Save
        </button>

        {/* Logout button */}
        <button
          type="button"
          onClick={handleLogout}
          className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Logout
        </button>
      </div>
    </main>
  );
};

export default Portal;
