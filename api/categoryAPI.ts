import axios from "axios";
import { CreateCategoryDto } from "../dtos/CreateCategoryDto";

export class CategoryAPI {
  static baseUrl = "http://192.168.1.156:3000/category";

  static async fetchAll() {
    try {
      const response = await axios.get(this.baseUrl);
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  static async fetchCategory(id: number) {
    try {
      const response = await axios.get(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  }

  static async createCategory(category: CreateCategoryDto) {
    try {
      const response = await axios.post(this.baseUrl, category);
      return response.data;
    } catch (error) {
      console.error("Error creating category:", error);
    }
  }

  static async updateCategory(categoryName: string, id: number) {
    const updatedCategory = { name: categoryName };
    try {
      const response = await axios.patch(
        `${this.baseUrl}/${id}`,
        updatedCategory
      );
      return response.data;
    } catch (error) {
      console.error("Error updating category:", error);
    }
  }

  static async deleteCategory(id: number) {
    try {
      const response = await axios.delete(`${this.baseUrl}/${id}`);
      console.log("deleted id", id);
      return response.data;
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  }
}
