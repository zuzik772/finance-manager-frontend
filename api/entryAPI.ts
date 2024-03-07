import axios from "axios";
import { CreateEntryDto } from "../dtos/CreateEntryDto";
import { Update } from "@reduxjs/toolkit";
import { UpdateEntryDTO } from "../dtos/UpdateEntryDto";

export class EntryAPI {
  static baseUrl = "http://192.168.1.156:3000/entry";

  static async fetchAll() {
    try {
      const response = await axios.get(this.baseUrl);
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
      const response = await axios.put(`${this.baseUrl}/${id}`);
      console.log("updated entry", response.data);
      // return response.data;
    } catch (error) {
      console.error("Error updating entry:", error);
    }
  }
  static async deleteEntry(id: number) {
    try {
      const response = await axios.delete(`${this.baseUrl}/${id}`);
      console.log("deleted id", id);
      return response.data;
    } catch (error) {
      console.log("Error deleting entry:", error);
    }
  }
}
