export class UpdateCategoryDtos {
  name?: string;
  entryIds?: number[]; // Assuming only IDs of entries are updated

  constructor(updateData: { name?: string; entryIds?: number[] }) {
    this.name = updateData.name;
    this.entryIds = updateData.entryIds;
  }
}
