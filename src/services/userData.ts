import axiosInstance from "./axiosInstance";

const API_URL = "/user";

// Get all users (GET)
export const getAllUsersData = async () => {
    const response = await axiosInstance.get(API_URL);
    return response.data;
  };

// Fetch data for a specific user (GET)
export const getUserById = async (userId: string) => {
  const response = await axiosInstance.get(`${API_URL}/${userId}`);
  return response.data;
};

// Update user data for a user (PATCH)
export const updateUserData = async (userId: string, data: any) => {
  try {
    const response = await axiosInstance.patch(`${API_URL}/${userId}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};
