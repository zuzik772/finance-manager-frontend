import axios from "axios";
import { CreateUserDto } from "../dtos/CreateUserDto";

export class UserAPI {
  static baseUrl = "http://192.168.1.156:3000";

  static async fetchUser(email: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/users/${email}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching User:", error);
    }
  }
  static async createUser(user: CreateUserDto) {
    try {
      const response = await axios.post(`${this.baseUrl}/auth/signUp`, user);
      return response.data;
    } catch (error) {
      console.error("Error creating Users:", error);
    }
  }
}
