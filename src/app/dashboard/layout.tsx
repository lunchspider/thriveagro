import Sidebar from "@/components/Sidebar";
import { cn } from "@/lib/utils";
import Dashboard from "@/components/Dashboard";
import Buyer from "@/components/buyer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div lang="en">
      <div className="flex gap-20 w-screen">
        <div className="z-10">
          <Sidebar />
        </div>
        <div
          className={cn(
            "min-h-screen bg-background font-sans w-[1220px] antialiased"
          )}
        >
          <Dashboard />
          {children}
        </div>
      </div>
    </div>
  );
}
