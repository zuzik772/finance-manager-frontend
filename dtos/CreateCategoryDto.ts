export class CreateCategoryDto {
  // id?: number;
  name: string;
  // entryIds: number[]; // Assuming only IDs of entries are needed

  constructor(
    // id: number,
    name: string
    // entryIds: number[] = []
  ) {
    // this.id = id;
    this.name = name;
    // this.entryIds = entryIds;
  }
}
