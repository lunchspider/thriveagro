"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { add_product_in_inventry } from "@/actions/inventry";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  amount: z.string().min(1, {
    message: "Product amount must be at least 1.",
  }),
  cost: z.string().min(1, {
    message: "Product cost must be at least 1.",
  }),
});

export function AddProduct({ user_id }: { user_id: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: "",
      cost: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      ...values,
      amount: parseInt(values.amount),
      cost: parseInt(values.cost),
      user_id,
    };

    console.log(data);
    const addingProduct = await add_product_in_inventry(data);
    console.log(addingProduct);
    window.location.reload();
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create a Product</CardTitle>
        <CardDescription>Add anything.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>your Product name</FormLabel>
                  <FormControl>
                    <div className="flex flex-col space-y-1.5">
                      <Input
                        id="name"
                        placeholder="Name of your Product"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>your Product amount</FormLabel>
                  <FormControl>
                    <div className="flex flex-col space-y-1.5">
                      <Input
                        id="amount"
                        type="number"
                        placeholder="amount of your Product"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>your Product cost</FormLabel>
                  <FormControl>
                    <div className="flex flex-col space-y-1.5">
                      <Input
                        id="cost"
                        type="number"
                        placeholder="cost of your Product"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
