export type Quest = {
  id: string;
  title: string;
  description: string;
  reward: number;
  createdAt: Date;
  requiredItems: Item[];
};

export type Item = {
  id: string;
  name: string;
  createdAt: Date;
  questId: string | null;
};
