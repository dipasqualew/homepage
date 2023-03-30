export interface Favourite {
  title: string;
  url: string;
  icon: string;
};

export interface BigCard {
  block: "big-card";
  favourite: Favourite;
};

export interface Container {
  block: "row" | "column" | "root";
  children: Array<Container | BigCard>
};

export type Layout = BigCard | Container

