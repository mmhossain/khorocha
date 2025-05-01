export interface Category {
    id: string;
    name: string;
}

export interface Transaction {
    id: string;
    title: string;
    amount: number;
    date: string;
    type: "income" | "expense";
    categoryId: string;
}