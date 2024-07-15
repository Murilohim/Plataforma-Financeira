import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { TransactionForm } from "./transaction-form"
import { insertTransactionsSchema } from "@/db/schema";
import { z } from "zod";

import { Loader2 } from "lucide-react";


import { useConfirm } from "@/hooks/use-confirm";
import { useOpenTransaction } from "../hooks/use-open-transaction";
import { useGetTransaction } from "../api/use-get-transaction";
import { useEditTransaction } from "../api/use-edit-transaction";
import { useDeleteTransaction } from "../api/use-delete-transaction";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";

const formSchema = insertTransactionsSchema.omit({
    id: true
});

type FormValues = z.input<typeof formSchema>;

export const EditTransactionSheet = () => {
    const { isOpen, onClose, id } = useOpenTransaction()

    const [ConfirmDialog, confirm] = useConfirm(
        "Você tem certeza?",
        "Você não poderá desfazer essa ação. Deseja prosseguir com a deleção da transação?"
    )

    const { data: transactionData, isLoading: isLoadingTransaction } = useGetTransaction(id)
    const { mutate: editTransactionMutate, isPending: isPendingEditTransaction } = useEditTransaction(id)
    const { mutate: deleteTransactionMutate, isPending: isPendingDeleteTransaction } = useDeleteTransaction(id)

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

    const isPending = isPendingEditTransaction || isPendingDeleteTransaction || isLoadingTransaction || isPendingCreateCategory || isPendingCreateAccount

    const isLoading = isLoadingTransaction || isLoadingCategories || isLoadingAccounts

    const onSubmit = (values: FormValues) => {
        editTransactionMutate(values, {
            onSuccess: () => {
                onClose()
            }
        })
    }

    const onDelete = async () => {
        const ok = await confirm()

        if (ok) {
            deleteTransactionMutate(
                undefined,
                {
                    onSuccess: () => {
                        onClose()
                    }
                }
            )
        }
    }

    const defaultValues = transactionData ? {
        accountId: transactionData.accountId,
        categoryId: transactionData.categoryId,
        amount: transactionData.amount.toString(),
        date: transactionData.date ? new Date(transactionData.date) : new Date(),
        payee: transactionData.payee,
        notes: transactionData.notes,
    } : {
        accountId: "",
        categoryId: "",
        amount: "",
        date: new Date(),
        payee: "",
        notes: "",
    }

    return (
        <>
            <ConfirmDialog />
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className="space-y-4">
                    <SheetHeader>
                        <SheetTitle>
                            Editar transação
                        </SheetTitle>
                        <SheetDescription>
                            Atualize as informações da sua transação
                        </SheetDescription>
                    </SheetHeader>
                    {isLoading ? (
                        <div
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <Loader2
                                className="size-4 text-muted-foreground animate-spin"
                            />
                        </div>
                    ) : (
                        <TransactionForm
                            id={id}
                            defaultValues={defaultValues}
                            onSubmit={onSubmit}
                            onDelete={onDelete}
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
        </>
    )
}