import { useQuery } from "@tanstack/react-query";
import { transactionService } from "../services/transactionService";

export const useTransactions = () => {
  return useQuery({
        queryKey: ["transactions"], 
        queryFn: transactionService.getTransactions
    });
};

export const useCategories = () => {
  return useQuery({
        queryKey: ["categories"], 
        queryFn: transactionService.getCategories
    });
};
