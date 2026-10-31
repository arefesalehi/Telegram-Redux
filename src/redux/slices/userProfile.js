import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import localDatabase from "../../db.json";

const normalizeProfiles = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.friends)) return data.friends;
  if (Array.isArray(data?.profile?.friends)) return data.profile.friends;
  return localDatabase.friends;
};

export const getUserProfile = createAsyncThunk("userProfile/getUserProfile", async () => {
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/friends`,
        method: "GET",
      });
      const profiles = normalizeProfiles(response.data);
      return profiles.length ? profiles : localDatabase.friends;
      } catch (error) {
        console.warn("Using bundled profiles because the API is unavailable.", error);
        return localDatabase.friends;
       }
      }
    );

    const initialState = {
      userProfile: localDatabase.friends,
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
