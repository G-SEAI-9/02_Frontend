type User = {
  username: string;
  img: string;
  info: string;
  status?: 'active' | 'paused' | 'inactive' | 'deleted' | 'gesperrt';
  id?: number;
  email?: string;
};

export type { User };
