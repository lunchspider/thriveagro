"use server";

import { db } from "@/db";
import { inventory } from "@/db/schema";

export async function add_product_in_inventry(data: {
  user_id: string;
  name: string;
  amount: number;
  cost: number;
}) {
  try {
    const product = await db
      .insert(inventory)
      .values(data)
      .returning({
        name: inventory.name,
        amount: inventory.amount,
        cost: inventory.cost,
        id: inventory.id,
      })
      .then((res) => res[0]);

    return product;
  } catch (e: any) {
    console.log(e);
    throw e;
  }
}
