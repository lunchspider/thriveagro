'use server';

import { db } from "@/db";
import { NewComplain, complains } from "@/db/schema";


export async function create_complain(values: NewComplain) {
    await db.insert(complains).values(values);
}
