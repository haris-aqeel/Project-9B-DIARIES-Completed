import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Diary } from '../../Interface/diary.interface'


const diaries = createSlice({
    name: "diaries",
    initialState: [] as Diary[], 
    reducers: {
        addDiary : (state, {payload}: PayloadAction<Diary[]>) => {
        
            const diarySave = payload.filter((diary) => {
                return state.findIndex((item) => item.id === diary.id) === -1;
              });

            state.push(...diarySave)
        },

        updateDiary: (state, {payload}: PayloadAction<Diary>) => {

            // To get Just the key of the required Diary
            const {id} = payload;
            
            const indexOfDiary = state.findIndex((diary) => diary.id === id);

            indexOfDiary !== -1 ? state.splice(indexOfDiary, 1, payload): console.log("Not Found")

            // indexOfDiary ====> Name of array
            // Elements to remove
            // Payload Items to be place instead
        }
    }
})



export const { addDiary, updateDiary } = diaries.actions;
export default diaries.reducer;