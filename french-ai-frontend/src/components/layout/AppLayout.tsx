import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppLayout({
                                      children,
                                  }: {
    children: React.ReactNode;
}) {

    return (
        <div className="flex h-screen bg-gradient-to-b from-[#04050b] to-[#071026] text-white">

            <Sidebar />

            <div className="flex-1 flex flex-col">

                <Topbar />

                <main className="
                    flex-1
                    overflow-y-auto
                    p-8
                ">
                    {children}
                </main>

            </div>
        </div>
    );
}
