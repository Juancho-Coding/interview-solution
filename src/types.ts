// type for a single todo list item
export type toDoItem = {
  complete: boolean;
  message: string;
  id: number;
};

// type for the todo list, includes max as a counter
export type dbData = { items: toDoItem[]; max: number };
