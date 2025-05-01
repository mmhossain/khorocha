import { Transaction, Category } from "../types";

const categories: Category[] = [
  { id: "1", name: "Food" },
  { id: "2", name: "Rent" },
  { id: "3", name: "Salary" },
  { id: "4", name: "Utilities" },
];

const transactions: Transaction[] = [
  {
    id: "t1",
    title: "Grocery shopping",
    amount: 50,
    date: "2025-04-01",
    type: "expense",
    categoryId: "1",
  },
  {
    id: "t2",
    title: "April Rent",
    amount: 1000,
    date: "2025-04-01",
    type: "expense",
    categoryId: "2",
  },
  {
    id: "t3",
    title: "Monthly Salary",
    amount: 3000,
    date: "2025-04-01",
    type: "income",
    categoryId: "3",
  },
  {
    id: "t4",
    title: "Electric Bill",
    amount: 150,
    date: "2025-04-05",
    type: "expense",
    categoryId: "4",
  },
];

export const transactionService = {
  getCategories: async (): Promise<Category[]> => {
    return new Promise(resolve => setTimeout(() => resolve(categories), 300));
  },
  getTransactions: async (): Promise<Transaction[]> => {
    return new Promise(resolve => setTimeout(() => resolve(transactions), 500));
  }
};
