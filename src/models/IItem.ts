export interface IItem {
  id: string;
  title: string;
  description: string;
  quantity: number;
}

export const initialItem: IItem = {
  id: "",
  title: "",
  description: "",
  quantity: 0,
};
