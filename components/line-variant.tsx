import { format } from 'date-fns';
import { ResponsiveContainer, XAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';
import { ptBR } from 'date-fns/locale';
import { CustomTooltip } from './custom-tooltip';

type Props = {
    data?: {
        date: string,
        income: number,
        expenses: number
    }[]
}

export const LineVariant = ({ data }: Props) => {
    return (
        <ResponsiveContainer
            width="100%"
            height={350}
        >
            <LineChart
                data={data}
            >
                <CartesianGrid
                    strokeDasharray="3 3"
                />
                <XAxis
                    axisLine={false}
                    tickLine={false}
                    dataKey="date"
                    tickFormatter={(value) => format(value, 'dd MMM', { locale: ptBR })}
                    style={{
                        fontSize: 12,
                    }}
                    tickMargin={16}
                />
                <Tooltip
                    content={<CustomTooltip />}
                />
                <Line
                    dot={false}
                    dataKey="income"
                    stroke="#3d82f6"
                    strokeWidth={2}
                    className='drop-shadow-sm'
                />
                <Line
                    dot={false}
                    dataKey="expenses"
                    stroke="#f43f5e"
                    strokeWidth={2}
                    className='drop-shadow-sm'
                />
            </LineChart>
        </ResponsiveContainer>
    )
}