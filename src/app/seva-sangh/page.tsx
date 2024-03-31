'use server';

import { get_complains } from "@/actions/complains";
import styles from './seva.module.css';
import { CalendarCheck , MapPin } from "lucide-react"
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
    const data = await get_complains();

    return (
        <div className="flex flex-col w-full h-screen items-center justify-around">
            <div>
                <div className="container mx-auto py-16">
                    <h1 className={styles.heading}>Seva Form</h1>
                    <div className={styles.inputContainer}>
                        <div className={styles.inputGroup}>
                            <CalendarCheck size={24} className={styles.icon} />
                            {/* <label htmlFor="date">Date:</label> */}
                            <input type="text" id="date" className={styles.input} placeholder="mm/dd/yyyy" />

                        </div>
                        <div className={styles.inputGroup}>
                            {/* <label htmlFor="location">Location:</label> */}
                            <MapPin />
                            <input type="text" id="location" className={styles.input} placeholder="Location" />
                        </div>
                        <div className={styles.inputGroup}>
                            {/* <label htmlFor="category">Category:</label> */}
                            <select id="category" className={styles.input}>
                                <option value="roads">Category</option>
                                <option value="roads">Roads</option>
                                <option value="irrigation">Irrigation</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* <Post/> */}
            </div>
            {data.length == 0 && <>
                <div className="text-5xl">
                    No issue yet Yay!
                </div>
            </>}
            {data.map((x) => {
                return <div className="flex flex-wrap bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden max-w-md mx-auto" key = {x.id}>
                    <div className="px-4 py-5 sm:p-6">
                        <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                            {x.issue}
                        </h2>
                        <div className="flex justify-between">
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {x.name}
                            </p>
                            <div className="font-bold">{x.date.getDate()}-{x.date.getMonth()}-{x.date.getFullYear()}</div>
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
                                        Unresolved
                                    </span>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            })}
            <Link href="/seva-sangh/create">
                <Button>New Issue?</Button>
            </Link>
        </div>)
} 
