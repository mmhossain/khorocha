import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Input,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Stack,
  Select,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

// Hardcoded categories
const categoryOptions = [
  { id: "1", name: "Food" },
  { id: "2", name: "Rent" },
  { id: "3", name: "Salary" },
  { id: "4", name: "Utilities" },
];

// Validation schema
const schema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z
    .number({ invalid_type_error: "Amount is required" })
    .positive("Amount must be positive"),
  date: z.string().min(1, "Date is required"),
  type: z.enum(["income", "expense"]),
  categoryId: z.string().min(1, "Category is required"),
});

type TransactionFormValues = z.infer<typeof schema>;

const AddEditTransactionDialog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: async (data: TransactionFormValues) => {
      console.log(data);
      setLoading(true);
      return new Promise((resolve) => setTimeout(() => resolve(data), 1000));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast({ title: "Transaction saved", status: "success", duration: 2000 });
      reset();
      onClose();
      setLoading(false);
    },
    onError: () => {
      toast({ title: "Failed to save transaction", status: "error" });
      setLoading(false);
    },
  });

  const onSubmit = (data: TransactionFormValues) => {
    mutation.mutate(data);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        Add Transaction
      </Button>

      <Modal
        isCentered={true}
        isOpen={isOpen}
        closeOnOverlayClick={false}
        onClose={onClose}
        onCloseComplete={() => reset()}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Transaction</ModalHeader>
          <ModalCloseButton onClick={handleClose} />
          <ModalBody>
            <form id="transaction-form" onSubmit={handleSubmit(onSubmit)}>
              <FormControl mb={3}>
                <FormLabel>Title</FormLabel>
                <Input {...register("title")} />
                <Text color="red.500">{errors.title?.message}</Text>
              </FormControl>

              <FormControl mb={3}>
                <FormLabel>Amount</FormLabel>
                <Input
                  type="number"
                  step="0.01"
                  {...register("amount", { valueAsNumber: true })}
                />
                <Text color="red.500">{errors.amount?.message}</Text>
              </FormControl>

              <FormControl mb={3}>
                <FormLabel>Date</FormLabel>
                <Input type="date" {...register("date")} />
                <Text color="red.500">{errors.date?.message}</Text>
              </FormControl>

              <FormControl mb={3}>
                <FormLabel>Type</FormLabel>
                <RadioGroup defaultValue="expense">
                  <Stack direction="row">
                    <Radio value="expense" {...register("type")}>
                      Expense
                    </Radio>
                    <Radio value="income" {...register("type")}>
                      Income
                    </Radio>
                  </Stack>
                </RadioGroup>
                <Text color="red.500">{errors.type?.message}</Text>
              </FormControl>

              <FormControl mb={3}>
                <FormLabel>Category</FormLabel>
                <Select {...register("categoryId")}>
                  <option value="">Select category</option>
                  {categoryOptions.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </Select>
                <Text color="red.500">{errors.categoryId?.message}</Text>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={handleClose} marginX={2}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              type="submit"
              form="transaction-form"
              isLoading={loading}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddEditTransactionDialog;
