
import { z } from 'zod';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { accounts, insertAccountsSchema, insertTransactionsSchema } from '@/db/schema';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Select } from '@/components/select';
import { DatePicker } from '@/components/date-picker';
import { Textarea } from '@/components/ui/textarea';
import { AmountInput } from '@/components/amount-input';
import { convertAmountToMiliunits } from '@/lib/utils';

const formSchema = z.object({
    date: z.coerce.date(),
    accountId: z.string(),
    categoryId: z.string().nullable().optional(),
    payee: z.string(),
    amount: z.string(),
    notes: z.string().nullable().optional(),
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
        const amountReplace = values.amount.replace('.', '').replace(',', '.')
        const amount = parseFloat(amountReplace);

        onSubmit({
            ...values,
            amount: amount
        });
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
                    name='date'
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <DatePicker
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={disabled}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
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
                <FormField
                    name='payee'
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Beneficiário
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    disabled={disabled}
                                    placeholder='Nome do beneficiário'
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name='amount'
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Quantia
                            </FormLabel>
                            <FormControl>
                                <AmountInput
                                    {...field}
                                    disabled={disabled}
                                    placeholder='0.00'
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name='notes'
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Observações
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    value={field.value ?? ''}
                                    disabled={disabled}
                                    placeholder='Observações ou notas adicionais'
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button
                    className='w-full'
                    disabled={disabled}
                >
                    {id ? 'Salvar modificações' : 'Criar nova transação'}
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