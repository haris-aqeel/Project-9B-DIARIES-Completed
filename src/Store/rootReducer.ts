import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '../features/Auth/authSlice'
import userReducer from '../features/Auth/userSlice'
import entriesReducer from '../features/Entry/entries'
import diariesReducer from '../features/Diary/diary'
import editorReducer from '../features/Diary/editorState'


const rootReducer = combineReducers({
    auth: authReducer,
    diaries: diariesReducer,
    entries: entriesReducer,
    user: userReducer,
    editor: editorReducer,
  });

export default rootReducer;