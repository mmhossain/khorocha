import axios from "axios";
import { Transaction, Category } from "../types";

export const transactionService = {
  getCategories: async (): Promise<Category[]> => {
    return [
      { id: "1", name: "Food" },
      { id: "2", name: "Rent" },
      { id: "3", name: "Salary" },
      { id: "4", name: "Utilities" },
      { id: "5", name: "Transport" },
      { id: "6", name: "Entertainment" },
      { id: "7", name: "Healthcare" },
      { id: "8", name: "Internet" },
      { id: "9", name: "Subscription" },
      { id: "10", name: "Miscellaneous" }
    ];
  },

  getTransactions: async (): Promise<Transaction[]> => {
    const response = await axios.get<Transaction[]>("/mockTransactions.json");
    return response.data;
  }
};
