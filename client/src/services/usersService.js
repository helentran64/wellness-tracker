import { api } from "./api";

/**
 * Get the all users' information from the database
 */
export async function getUsers() {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (err) {
    console.error("Error fetching users:", err);
  }
}

/**
 * With the user's username, get their information
 */
export async function getUserByUsername(username) {
  try {
    const response = await api.get(`/users/${username}`);
    return response.data;
  } catch (err) {
    console.error(`Error fetching user by username: ${err.message}`);
    throw err;
  }
}

/**
 * Insert user's information into the database
 */
export async function insertUser(userInformation) {
  try {
    const response = await api.post("/users", userInformation);
    return response.data;
  } catch (err) {
    console.error("Error adding user:", err);
  }
}
