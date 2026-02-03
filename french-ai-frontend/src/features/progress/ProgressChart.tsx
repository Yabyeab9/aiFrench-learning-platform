import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const data = [
    { day: "Mon", xp: 20 },
    { day: "Tue", xp: 40 },
    { day: "Wed", xp: 80 },
    { day: "Thu", xp: 60 },
    { day: "Fri", xp: 120 },
];

export default function ProgressChart() {

    return (
        <div className="
            bg-slate-900
            p-6
            rounded-3xl
            h-80
        ">
            <ResponsiveContainer>
                <LineChart data={data}>
                    <XAxis dataKey="day"/>
                    <YAxis/>
                    <Tooltip/>
                    <Line
                        type="monotone"
                        dataKey="xp"
                        stroke="#6366f1"
                        strokeWidth={3}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
