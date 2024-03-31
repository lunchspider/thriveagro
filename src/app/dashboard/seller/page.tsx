import Link from "next/link";
// import { Input } from "@/components/ui/input";
// import ProjectDetails from "@/components/ProjectDetails";
import { getUser } from "@/actions/user";
// import { Profile } from "@/components/Profile";
// import { AddProject } from "@/components/AddProject";
import { redirect } from "next/navigation";
import { get_all_products_in_inventry } from "@/actions/inventry";
import { AddProduct } from "@/components/AddProducts";
import ProductDetails from "@/components/ProductDetails";
import { Inventory } from "@/db/schema";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function Page() {
  const user = await getUser();
  if (!user) {
    redirect("/sign-in");
  }
  const userProducts = await get_all_products_in_inventry(user.id);

  console.log("userProducts", userProducts);

  return (
    <>
      <div className="flex flex-col w-full min-h-screen">
        <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
          <Link
            className="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4"
            href="/"
          >
            <FrameIcon className="w-6 h-6" />
            <span className="sr-only">Event</span>
          </Link>
          <nav className="hidden font-medium sm:flex flex-row items-center gap-5 text-sm lg:gap-6">
            <Link className="font-bold w-28" href="/dashboard">
              Product
            </Link>
          </nav>
          <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
            {/* <Profile userdetails={user} /> */}
          </div>
        </header>
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] bg-gray-100/40 flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 dark:bg-gray-800/40">
          <div className="max-w-6xl w-full mx-auto flex items-center gap-4">
            <AlertDialog>
              <AlertDialogTrigger>
                <Button variant="outline">Add Product</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <div className="flex justify-center">
                  <AddProduct user_id={user.id} />
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className="flex gap-3">
            {userProducts.map((product: Inventory, index: number) => {
              return <ProductDetails details={product} key={index} />;
            })}
          </div>
        </main>
      </div>
    </>
  );
}

function FrameIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" x2="2" y1="6" y2="6" />
      <line x1="22" x2="2" y1="18" y2="18" />
      <line x1="6" x2="6" y1="2" y2="22" />
      <line x1="18" x2="18" y1="2" y2="22" />
    </svg>
  );
}
