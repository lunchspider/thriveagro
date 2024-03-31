import { Button } from "@/components/ui/button";
import { Inventory, User } from "@/db/schema";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function ProductDetails({ details }: { details: Inventory }) {
  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mx-auto">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
          {details.name}
        </h2>
        <div className="flex justify-between">
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {details.amount} in stock
          </p>
          <div className="font-bold text-2xl">₹ {details.cost}/-</div>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700">
        <dl>
          <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Status
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 capitalize">
                {details.in_stock ? "In Stock" : "Out of Stock"}
              </span>
            </dd>
            <Button className="w-32 mt-3">Buy Product</Button>
          </div>
        </dl>
      </div>
    </div>
  );
}
