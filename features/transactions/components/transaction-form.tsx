
import { z } from 'zod';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { accounts, insertAccountsSchema, insertTransactionsSchema } from '@/db/schema';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Select } from '@/components/select';

const formSchema = z.object({
    date: z.coerce.date(),
    accountId: z.string(),
    categoryId: z.string().nullable().optional(),
    payee: z.string(),
    amount: z.number(),
    note: z.string().nullable().optional(),
})

const apiSchema = insertTransactionsSchema.omit({
    id: true
})

type FormValues = z.input<typeof formSchema>;
type ApiFormValues = z.input<typeof apiSchema>;

type Props = {
    id?: string;
    defaultValues?: FormValues;
    onSubmit: (values: ApiFormValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
    accountOptions: { label: string, value: string }[];
    categoryOptions: { label: string, value: string }[];
    onCreateAccount: (name: string) => void;
    onCreateCategory: (name: string) => void;
}

export const TransactionForm = ({ id, defaultValues, onSubmit, onDelete, disabled, accountOptions, categoryOptions, onCreateAccount, onCreateCategory }: Props) => {

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const handleSubmit = (values: FormValues) => {
        console.log({ values });
    }

    const handleDelete = () => {
        onDelete?.();
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className='space-y-4 pt-4'
            >
                <FormField
                    name='accountId'
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Conta
                            </FormLabel>
                            <FormControl>
                                <Select
                                    placeholder='Selecione uma conta'
                                    options={accountOptions}
                                    onCreate={onCreateAccount}
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={disabled}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name='categoryId'
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Categoria
                            </FormLabel>
                            <FormControl>
                                <Select
                                    placeholder='Selecione uma categoria'
                                    options={categoryOptions}
                                    onCreate={onCreateCategory}
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={disabled}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button
                    className='w-full'
                    disabled={disabled}
                >
                    {id ? 'Salvar modificações' : 'Criar nova conta'}
                </Button>
                {id!! && (
                    <Button
                        type='button'
                        disabled={disabled}
                        onClick={handleDelete}
                        variant='outline'
                        className='w-full'
                    >
                        <Trash className='size-4 pr-4' />
                        Deletar conta
                    </Button>
                )}
            </form>

        </Form>
    )
}