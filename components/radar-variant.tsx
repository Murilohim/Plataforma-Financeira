import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer
} from "recharts";

type Props = {
    data?: {
        name: string
        value: number
    }[]
}

export const RadarVariant = ({ data }: Props) => {

    return (
        <ResponsiveContainer
            width="100%"
            height={350}
        >
            <RadarChart
                data={data}
                cy="50%"
                cx="50%"
                outerRadius="60%"
            >
                <PolarGrid />
                <PolarAngleAxis
                    dataKey="name"
                    style={{
                        fontSize: "12px"
                    }}
                />
                <PolarRadiusAxis
                    style={{
                        fontSize: "12px"
                    }}
                />
                <Radar
                    dataKey="value"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.6}
                />
            </RadarChart>
        </ResponsiveContainer>
    )
}