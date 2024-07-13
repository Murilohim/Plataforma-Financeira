import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { AccountForm } from "./account-form"
import { insertAccountsSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateAccount } from "../api/use-create-account";
import { useOpenAccount } from "../hooks/use-open-account";
import { useGetAccount } from "../api/use-get-account";
import { Loader2 } from "lucide-react";

const formSchema = insertAccountsSchema.pick({
    name: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditAccountSheet = () => {
    const { isOpen, onClose, id } = useOpenAccount()

    const { data: accountData, isLoading: isLoadingAccount } = useGetAccount(id)

    const mutation = useCreateAccount()

    const onSubmit = (values: FormValues) => {
        mutation.mutate(values, {
            onSuccess: () => {
                onClose()
            }
        })
    }

    const defaultValues = accountData ? { name: accountData.name } : { name: '' }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>
                        Editar conta
                    </SheetTitle>
                    <SheetDescription>
                        Atualize as informações da sua conta
                    </SheetDescription>
                </SheetHeader>
                {isLoadingAccount ? (
                    <div
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <Loader2
                            className="size-4 text-muted-foreground animate-spin"
                        />
                    </div>
                ) : (
                    <AccountForm
                        id={id}
                        onSubmit={onSubmit}
                        disabled={mutation.isPending}
                        defaultValues={defaultValues}
                    />
                )
                }
            </SheetContent>
        </Sheet>
    )
}