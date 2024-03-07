import { Entry } from "./Entry";

export type RootStackParamList = {
  EntryList: undefined;
  AddEntry: Entry | undefined;
  EntryEdit: { entryId: number };
  EntryDelete: { entryId: number };
};
