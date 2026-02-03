import {
    LineChart,
    Line,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

const data = [
    { name: "Mon", users: 30 },
    { name: "Tue", users: 45 },
    { name: "Wed", users: 60 },
    { name: "Thu", users: 40 },
    { name: "Fri", users: 90 },
];

export default function ChartCard() {
    return (
        <div className="bg-white dark:bg-[#121826] p-6 rounded-2xl shadow-md h-[300px]">
            <h3 className="font-semibold mb-4">User Growth</h3>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <Tooltip />
                    <Line type="monotone" dataKey="users" strokeWidth={3} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
