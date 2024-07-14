import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useNewTransaction } from "../hooks/use-new-transaction"
import { insertTransactionsSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateTransaction } from "../api/use-create-transaction";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { TransactionForm } from "./transaction-form";
import { Loader2 } from "lucide-react";

const formSchema = insertTransactionsSchema.omit({
    id: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewTransactionSheet = () => {
    const { isOpen, onClose } = useNewTransaction()

    const { mutate: createTransactionMutate, isPending: isPendingCreateTransaction } = useCreateTransaction()

    const { data: categoriesData, isLoading: isLoadingCategories } = useGetCategories()
    const { mutate: createCategoryMutate, isPending: isPendingCreateCategory } = useCreateCategory()
    const onCreateCategory = (name: string) => {
        createCategoryMutate({ name })
    }
    const categoryOptions = categoriesData?.map(category => ({
        label: category.name,
        value: category.id
    })) || []

    const { data: accountsData, isLoading: isLoadingAccounts } = useGetAccounts()
    const { mutate: createAccountMutate, isPending: isPendingCreateAccount } = useCreateAccount()
    const onCreateAccount = (name: string) => {
        createAccountMutate({ name })
    }
    const accountOptions = accountsData?.map(account => ({
        label: account.name,
        value: account.id
    })) || []


    const isPending = isPendingCreateTransaction || isPendingCreateCategory || isPendingCreateAccount

    const isLoading = isLoadingCategories || isLoadingAccounts


    const onSubmit = (values: FormValues) => {
        createTransactionMutate(values, {
            onSuccess: () => {
                onClose()
            }
        })
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>
                        Nova transação
                    </SheetTitle>
                    <SheetDescription>
                        Crie uma nova transação
                    </SheetDescription>
                </SheetHeader>
                {
                    isLoading ?
                        (
                            <div
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <Loader2
                                    className="size-4 text-muted-foreground animate-spin"
                                />
                            </div>
                        ) : (
                            <TransactionForm
                                onSubmit={onSubmit}
                                disabled={isPending}
                                categoryOptions={categoryOptions}
                                onCreateCategory={onCreateCategory}
                                accountOptions={accountOptions}
                                onCreateAccount={onCreateAccount}
                            />
                        )
                }

            </SheetContent>
        </Sheet>
    )
}