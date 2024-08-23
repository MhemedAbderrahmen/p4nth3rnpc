"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/trpc/react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(2),
  reward: z.coerce.number(),
  requiredItems: z.array(z.string()),
});

export function QuestCreatorForm() {
  const utils = api.useUtils();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      reward: 0,
      requiredItems: [],
    },
  });

  const { data: users } = api.user.all.useQuery();
  const { data: items } = api.items.get.useQuery();
  const { data } = api.quests.get.useQuery();

  const createUserQuestItems = api.userQuestItems.create.useMutation();
  const createUserQuest = api.userQuests.create.useMutation();

  const createItem = api.quests.create.useMutation({
    async onSuccess({ id }) {
      if (users) {
        const promises = users.map(async (user) => {
          const userQuest = await createUserQuest.mutateAsync({
            userId: user.id,
            questId: id,
          });
          await createUserQuestItems.mutateAsync({
            userId: user.id,
            userQuestId: userQuest.id,
            items: userQuest.quest.requiredItems.map((item) => item.name),
          });
        });

        await Promise.all(promises);
        await utils.quests.get.invalidate();
      }
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createItem.mutate(values);
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
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>p4nth3r.world Quest Title</FormLabel>
                <FormControl>
                  <Input placeholder="The Stinky Situation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>p4nth3r.world Quest Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="The Stinky Situation's description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reward"
            render={({ field }) => (
              <FormItem>
                <FormLabel>p4nth3r.world Quest Reward 🏆</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="3200" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {items && (
            <FormField
              control={form.control}
              name="requiredItems"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Sidebar</FormLabel>
                  </div>
                  {items.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="requiredItems"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked: boolean) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id,
                                        ),
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.name}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button type="submit" disabled={createItem.isPending}>
            {createItem.isPending && (
              <Loader2 className="mr-2 animate-spin" size={16} />
            )}
            Create Quest
          </Button>
        </form>
      </Form>

      <div className="flex w-full flex-col gap-2">
        {data?.map((item, index) => (
          <div
            key={index}
            className="w-full items-center justify-center rounded-md border p-2 capitalize"
          >
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
}
