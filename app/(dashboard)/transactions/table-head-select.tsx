import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"


type Props = {
    columnIndex: number
    selectColumns: Record<string, string | null>
    onChange: (columnIndex: number, value: string | null) => void
}

const options = [
    "amount",
    "payee",
    "date",
]

export const TableHeadSelect = (
    { columnIndex, selectColumns, onChange }: Props
) => {

    const currentSelect = selectColumns[`column_${columnIndex}`]

    return (
        <Select
            value={currentSelect || ""}
            onValueChange={(value) => onChange(columnIndex, value)}
        >
            <SelectTrigger
                className={cn(
                    "focus:ring-offset-0 focus:ring-transparent outline-none border-none bg-transparent capitalize",
                    currentSelect && "text-blue-500"
                )}
            >
                <SelectValue
                    placeholder="Pular"
                />
            </SelectTrigger>
            <SelectContent>
                <SelectItem
                    value="skip"
                >
                    Pular
                </SelectItem>
                {options.map((option, index) => {
                    const disabled = Object.values(selectColumns).includes(option) && selectColumns[`column_${columnIndex}`] !== option
                    return (
                        <SelectItem
                            key={index}
                            value={option}
                            disabled={disabled}
                            className="capitalize"
                        >
                            {option}
                        </SelectItem>
                    )
                })}
            </SelectContent>
        </Select>
    )
}