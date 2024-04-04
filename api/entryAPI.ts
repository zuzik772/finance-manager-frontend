import axios from "axios";
import { CreateEntryDto } from "../dtos/CreateEntryDto";
import { UpdateEntryDTO } from "../dtos/UpdateEntryDto";
import AsyncStorage from "@react-native-async-storage/async-storage";
//TODO
//ADD axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
export class EntryAPI {
  static baseUrl = "http://10.59.169.168:3000/entry";

  static async getToken(): Promise<string | null> {
    try {
      const tokenData = await AsyncStorage.getItem("user");
      return tokenData ? JSON.parse(tokenData) : null;
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  }

  static async fetchAll(): Promise<any> {
    const token = await this.getToken();
    try {
      const response = await axios.get(this.baseUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching entries:", error);
      throw error;
    }
  }

  static async fetchEntry(id: number): Promise<any> {
    const token = await this.getToken();
    try {
      const response = await axios.get(`${this.baseUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching entry:", error);
      throw error;
    }
  }

  static async createEntry(entry: CreateEntryDto): Promise<any> {
    const token = await this.getToken();
    try {
      const response = await axios.post(this.baseUrl, entry, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating entry:", error);
      throw error;
    }
  }

  static async updateEntry(id: number, entry: UpdateEntryDTO): Promise<any> {
    const token = await this.getToken();
    try {
      const response = await axios.put(`${this.baseUrl}/${id}`, entry, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating entry:", error);
      throw error;
    }
  }

  static async deleteEntry(id: number): Promise<any> {
    const token = await this.getToken();
    try {
      const response = await axios.delete(`${this.baseUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("ENTRY API Error deleting entry:", error);
      throw error;
    }
  }
  // static async deleteEntry(id: number): Promise<any> {
  //   const token = await this.getToken();
  //   try {
  //     // Check if the entry exists
  //     const checkResponse = await axios.get(`${this.baseUrl}/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log("checkResponse", checkResponse);
  //     if (checkResponse.status === 200) {
  //       // If the GET request is successful, delete the entry
  //       const response = await axios.delete(`${this.baseUrl}/${id}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       return response.data;
  //     } else {
  //       console.error("ENTRY API Error: Entry does not exist");
  //       throw new Error("Entry does not exist");
  //     }
  //   } catch (error) {
  //     console.error("ENTRY API Error:", error);
  //     throw error;
  //   }
  // }
}
