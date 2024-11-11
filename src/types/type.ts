export type Note = {
  tags: string[];
  content: string;
  id: number;
  noteName: string;
};

export type User = {
  name: string;
};

export type DB = {
  notes: Note[];
  // users: User[];
};
