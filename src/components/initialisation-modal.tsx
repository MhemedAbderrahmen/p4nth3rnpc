"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/trpc/react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function InitialisationModal() {
  const router = useRouter();
  const utils = api.useUtils();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const generateUserQuestItems = api.userQuestItems.generate.useMutation();
  const generateUserQuest = api.userQuests.generate.useMutation({
    async onSuccess() {
      await utils.user.get.invalidate();
    },
  });
  const createUser = api.user.create.useMutation({
    async onSuccess({ id }) {
      await generateUserQuest.mutateAsync({ userId: id });
      await generateUserQuestItems.mutateAsync({ userId: id });
      router.push("/journal/" + form.getValues("username"));
    },
    onError({ data }) {
      if (data?.code === "CONFLICT")
        router.push("/journal/" + form.getValues("username"));
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createUser.mutate({ username: values.username });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <Button size={"sm"}>Start Questing</Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start questing now!</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-col space-y-8"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>p4nth3r.world username</FormLabel>
                    <FormControl>
                      <Input placeholder="leboomslang" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is needs to be your p4nth3r.world username!
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={createUser.isPending} size={"sm"}>
                {createUser.isPending && (
                  <Loader2 className="mr-2 animate-spin" size={16} />
                )}
                Start your adventure!
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
