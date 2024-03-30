import { Entry } from "./Entry";

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  EntryList: undefined;
  AddEntry: Entry | undefined;
  EntryEdit: { entryId: number };
  EntryDelete: { entryId: number };
};
