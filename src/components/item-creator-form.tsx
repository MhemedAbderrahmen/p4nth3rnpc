"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/trpc/react";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const formSchema = z.object({
  itemName: z.string().min(2),
});

export function ItemCreatorForm() {
  const utils = api.useUtils();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: "",
    },
  });

  const { data, isPending } = api.items.get.useQuery();

  const createItem = api.items.create.useMutation({
    async onSuccess() {
      await utils.items.get.invalidate();
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createItem.mutate({ name: values.itemName });
  }

  return (
    <div className="grid gap-4 py-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col space-y-8"
        >
          <FormField
            control={form.control}
            name="itemName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>p4nth3r.world item</FormLabel>
                <FormControl>
                  <Input placeholder="pineapple" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={createItem.isPending} size={"sm"}>
            {createItem.isPending && (
              <Loader2 className="mr-2 animate-spin" size={16} />
            )}
            Create Item
          </Button>
        </form>
      </Form>
      <div className="flex w-full flex-col gap-2">
        {data?.map((item, index) => (
          <div
            key={index}
            className="w-full items-center justify-center rounded-md border p-2 capitalize"
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
