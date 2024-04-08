import axios from "axios";

export class UserAPI {
  static baseUrl = process.env.baseUrl;

  static async fetchUser(email: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/users/${email}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching User:", error);
    }
  }
}
