import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllEmployee = createAsyncThunk("employees/getAllEmployee", async() => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");

    return res.data;
});

const employeeSlice = createSlice({
    name: 'employees',
    initialState: {
        isLoading: false,
        employees: [],
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(getAllEmployee.pending, (state) => {
            state.isLoading = true;
        })

        builder.addCase(getAllEmployee.fulfilled, (state, action) => {
            state.isLoading = false;
            state.employees = action.payload;
            state.error = null;
        })

        builder.addCase(getAllEmployee.rejected, (state, action) => {
            state.isLoading = false;
            state.employees = [];
            state.error = action.error.message;
        })
    }
});

export default employeeSlice.reducer;