import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Entry } from '../../Interface/entry.interface';

const entries = createSlice({
    name: "entries",
    initialState: [] as Entry[],
    reducers: {

        setEntries(state, { payload }: PayloadAction<Entry[] | null>) {
            return (state = payload != null ? payload : []);
          },

        updateEntry(state, { payload }: PayloadAction<Entry>) {
           const { id } = payload;
           
           const indexOfEntry = state.findIndex((entry) => entry.id === id);

           indexOfEntry !== -1 ? state.splice(indexOfEntry, 1, payload): console.log("Not Found")


        }
    }
})


export const { setEntries, updateEntry } = entries.actions;
export default entries.reducer;