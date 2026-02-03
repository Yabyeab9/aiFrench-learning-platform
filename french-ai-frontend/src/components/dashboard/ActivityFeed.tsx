export default function ActivityFeed() {
    const activities = [
        "User John registered",
        "Payment received",
        "New AI model deployed",
        "Password changed",
    ];

    return (
        <div className="bg-white dark:bg-[#121826] p-6 rounded-2xl shadow-md">
            <h3 className="font-semibold mb-4">Recent Activity</h3>

            <ul className="space-y-3">
                {activities.map((a, i) => (
                    <li
                        key={i}
                        className="border-b border-gray-200 pb-2"
                    >
                        {a}
                    </li>
                ))}
            </ul>
        </div>
    );
}
