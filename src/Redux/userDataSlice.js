import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/interceptor";
import { toast } from "react-toastify";
const initialState = {
  userData: [],
};
const url = "/module/";

export const addUserDataApi = createAsyncThunk(url, async (data) => {
  const response = await api.post(url, data);
  return response.data;
});

export const getUserDataApi = createAsyncThunk(url, async () => {
  const response = await api.get(url);
  const data = response.data;
  return data.data;
});

export const updateUserDataApi = createAsyncThunk(url, async (updatingData) => {
  const response = await api.put(
    url.concat(updatingData.id),
    updatingData.data
  );
  return response.data;
});

export const deleteUserDataApi = createAsyncThunk(url, async (id) => {
  const response = await api.delete(url.concat(`${id}`));
  const resData = response.data;
  if (resData.status === 200) {
    toast.success(resData.message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  return response.data;
});

const userDataSlice = createSlice({
  name: "userData",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserDataApi.fulfilled, (state, action) => {
      state.userData = action.payload;
    });
  },
});

export default userDataSlice.reducer;
