import axios, { AxiosError } from "axios";
import { CreateEntryDto } from "../dtos/CreateEntryDto";
import { UpdateEntryDTO } from "../dtos/UpdateEntryDto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../entities/User";

export class EntryAPI {
  static baseUrl = "http://192.168.1.156:3000/entry";

  static async fetchAll() {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(this.baseUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  }

  static async fetchEntry(id: number) {
    try {
      const response = await axios.get(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching entry:", error);
    }
  }
  static async createEntry(entry: CreateEntryDto) {
    try {
      const response = await axios.post(this.baseUrl, entry);
      return response.data;
    } catch (error) {
      console.error("Error creating entry:", error);
    }
  }
  static async updateEntry(id: number, entry: UpdateEntryDTO) {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.put(`${this.baseUrl}/${id}`, entry, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("updated entry", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating entry:", error);
    }
  }
  static async deleteEntry(id: number) {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.delete(`${this.baseUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("deleted id", id);
      return response.data;
    } catch (error) {
      console.log("Error deleting entry:", error);
    }
  }
}
