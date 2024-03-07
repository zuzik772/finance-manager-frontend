export class UpdateEntryDTO {
  id?: number;
  amount?: number;
  date?: string;
  currency?: string;
  name?: string;
  comment?: string;

  constructor(updateData: {
    id?: number;
    amount?: number;
    date?: string;
    currency?: string;
    name?: string;
    comment?: string;
  }) {
    this.id = updateData.id;
    this.amount = updateData.amount;
    this.date = updateData.date;
    this.currency = updateData.currency;
    this.name = updateData.name;
    this.comment = updateData.comment;
  }
}
