import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

export default function WeeklyXpChart({ data }: { data: any[] }) {
    return (
        <ResponsiveContainer width="100%" height="80%">
            <LineChart data={data ?? []}>
                <Tooltip />
                <Line type="monotone" dataKey="xp" stroke="#6366f1" strokeWidth={3} />
            </LineChart>
        </ResponsiveContainer>
    );
}
