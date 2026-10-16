type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type Filter = 'all' | 'completed' | 'active';

export type { Filter, Todo };
