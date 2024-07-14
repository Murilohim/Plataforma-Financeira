import CurrencyInput from 'react-currency-input-field';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Info, MinusCircle, PlusCircle } from 'lucide-react';

type Props = {
    value: string;
    onChange: (value: string | undefined) => void;
    disabled?: boolean;
    placeholder?: string;
}

export const AmountInput = ({ value, onChange, disabled, placeholder }: Props) => {

    const parsedValue = parseFloat(value);
    const isIncome = parsedValue > 0;
    const isExpense = parsedValue < 0;

    const onReverseValue = () => {
        if (!value) return;
        const newValue = parseFloat(value) * -1
        onChange(newValue.toString());
    }

    return (
        <div
            className='relative'
        >
            <TooltipProvider>
                <Tooltip
                    delayDuration={100}
                >
                    <TooltipTrigger
                        asChild
                    >
                        <Button
                            type='button'
                            onClick={onReverseValue}
                            className={
                                cn(
                                    "bg-slate-400 hover:bg-slate-500 absolute top-1.5 left-1.5 rounded-md p-2 flex items-center justify-center transition h-7",
                                    isIncome && "bg-emerald-500 hover:bg-emerald-600",
                                    isExpense && "bg-rose-500 hover:bg-rose-600",
                                )
                            }
                        >
                            {!parsedValue && <Info className="size-3 text-white" />}
                            {isIncome && <PlusCircle className="size-3 text-white" />}
                            {isExpense && <MinusCircle className="size-3 text-white" />}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        Use [+] para adicionar uma receita e [-] para adicionar uma despesa
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <CurrencyInput
                prefix="$"
                decimalsLimit={2}
                decimalScale={2}
                value={value}
                onValueChange={onChange}
                disabled={disabled}
                placeholder={placeholder}
                className="pl-10 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <p
                className="text-xs text-muted-foreground mt-2"
            >
                {isIncome && "Isso contará como uma receita"}
                {isExpense && "Isso contará como uma despesa"}
            </p>
        </div>
    )
}