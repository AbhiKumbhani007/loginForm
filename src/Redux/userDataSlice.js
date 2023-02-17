import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../api/interceptor";
const initialState = {
  userData: [],
  userAuthed: false,
};
const url = "/module/";

export const addUserDataApi = createAsyncThunk("addUserData", async (data) => {
  const response = await api.post(url, data);
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

export const getUserDataApi = createAsyncThunk("getUserData", async () => {
  const response = await api.get(url);
  const data = response.data;
  return data.data;
});

export const updateUserDataApi = createAsyncThunk(
  "updateUserData",
  async (updatingData) => {
    const response = await api.put(
      url.concat(updatingData.id),
      updatingData.data
    );
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
  }
);

export const deleteUserDataApi = createAsyncThunk(
  "deleteUserData",
  async (id) => {
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
  }
);

export const loginWithEmailAndPassword = createAsyncThunk(
  "login",
  async (data) => {
    const response = await api.post("/login/dologin", data);
    const resData = response.data;
    console.log(resData);
    return resData;
  }
);

const userDataSlice = createSlice({
  name: "userData",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserDataApi.fulfilled, (state, action) => {
      state.userData = action.payload;
    });
    builder.addCase(addUserDataApi.fulfilled, (state, action) => {
      state.userData.push(action.payload.data);
    });
    builder.addCase(updateUserDataApi.fulfilled, (state, action) => {
      const index = state.userData.findIndex(
        (item) => item.id === action.payload.data.id
      );
      state.userData[index] = action.payload.data;
    });
    builder.addCase(deleteUserDataApi.fulfilled, (state, action) => {
      const index = state.userData.findIndex(
        (item) => item.id === action.payload.data.id
      );
      state.userData.splice(index, 1);
    });
    builder.addCase(loginWithEmailAndPassword.fulfilled, (state, action) => {
      localStorage.setItem("token", action.payload.data.token);
      state.userAuthed = true;
    });
  },
});

export default userDataSlice.reducer;
