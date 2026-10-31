import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import localDatabase from '../../db.json';
export const getSidebarContacts= createAsyncThunk('contacts/getSidebarContacts', async()=>{

    try {
        const response = await axios ({
            url:`${process.env.REACT_APP_API_URL}/profile`,
            method: 'GET'
        })
        return response.data.friends || localDatabase.profile.friends;
    }catch (error) {
      console.warn('Using bundled contacts because the API is unavailable.', error);
      return localDatabase.profile.friends;
    }
  });
 

    const initialState = {
        sidebarContacts: [],   
    }

    const sidebarContactSlice = createSlice({
        name: 'sidebarContacts',
        initialState,
        extraReducers: {
            [getSidebarContacts.fulfilled]: (state,action) => {
                state.sidebarContacts = action.payload;
            }, 
        },
    })

    export default sidebarContactSlice.reducer
