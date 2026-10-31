import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import localDatabase from "../../db.json";
export const getUserProfile = createAsyncThunk("userProfile/getUserProfile", async () => {
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/friends`,
        method: "GET",
      });
      return response.data?.length ? response.data : localDatabase.friends;
      } catch (error) {
        console.warn("Using bundled profiles because the API is unavailable.", error);
        return localDatabase.friends;
       }
      }
    );

    const initialState = {
      value: [],
    };

    const userProfileSlice = createSlice({
      name: "userProfile",
      initialState,
      extraReducers: {
          [getUserProfile.fulfilled]: (state, action) => {
            state.userProfile = action.payload;
          },
      },
    });

  export default userProfileSlice.reducer;
