/* eslint-disable @typescript-eslint/no-explicit-any */
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { motion } from "framer-motion";

export default function DashboardLayout({ children }: any) {
    return (
        <div className="flex h-screen bg-gray-100 dark:bg-[#0B0F19]">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Topbar />

                <motion.main
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 overflow-y-auto"
                >
                    {children}
                </motion.main>
            </div>
        </div>
    );
}
