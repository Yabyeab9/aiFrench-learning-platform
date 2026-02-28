import { motion } from "framer-motion";

export default function StatCard({ title, value, icon }: { title: string; value: string | number; icon?: React.ReactNode }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-[#121826] p-6 rounded-2xl shadow-md flex justify-between items-center"
        >
            <div>
                <p className="text-gray-500">{title}</p>
                <h2 className="text-2xl font-bold mt-1">{value}</h2>
            </div>

            <div className="text-indigo-600">
                {icon}
            </div>
        </motion.div>
    );
}
