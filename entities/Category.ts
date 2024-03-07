import { Entry } from "./Entry";

export class Category {
  id: number;
  name: string;
  entries: Entry[];
  constructor(id: number, name: string, entries: Entry[] = []) {
    (this.id = id), (this.name = name), (this.entries = entries);
  }
}
