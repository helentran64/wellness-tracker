import { api } from "./api";

/**
 * Get the user's diary entries
 */
export async function getDiary(username) {
  try {
    const result = await api.get(`/diaries/${username}`);
    return result.data;
  } catch (err) {
    console.err(`Fail to fetch ${username}'s diary`, err);
  }
}

/**
 * Insert the user's diary entry into the database
 */
export async function insertToDiary(username, topic, note, dateAndTime) {
  try {
    const result = await api.post(`/diaries/${username}`, {
      topic,
      note,
      dateAndTime,
    });
    return result.data;
  } catch (err) {
    console.err(
      `Failed to insert ${username}'s notes to the diaries table`,
      err
    );
  }
}
