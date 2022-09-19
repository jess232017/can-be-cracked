// database.config.ts
import Dexie, { Table } from "dexie";

export interface IFriend {
  id?: number;
  email: string;
  password: string;
}

export class MySubClassedDexie extends Dexie {
  // 'users' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  users!: Table<IFriend>;

  constructor() {
    super("database");
    this.version(1).stores({
      users: "++id, email, password", // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();
