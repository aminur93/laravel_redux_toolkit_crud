import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {http} from "../service/http_service";

export const getAllEmployee = createAsyncThunk("employee/getAllEmployee", async() => {
    
    try {
        const response = await http().get('crud/v1/employee');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
});

export const storeEmployee = createAsyncThunk("employee/storeEmployee", async(data) => {

    try {
        const response = await http().post('crud/v1/employee/store', data);
        return response.data;
    } catch(error) {
        return error.response.data;
    }
});

export const getEditEmployee = createAsyncThunk("employee/getEditEmployee", async(id) => {
    
    try {
        const response = await http().get(`crud/v1/employee/edit/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
});

export const updateEmployee = createAsyncThunk("employee/updateEmployee", async(data) => {

    try {
        const response = await http().post(`crud/v1/employee/update/${data.id}`, data);

        this.getAllEmployee();

        return response.data;
    } catch(error) {
        return error.response.data;
    }
});

export const deleteEmployee = createAsyncThunk("employee/deleteEmployee", async(id) => {
    try {
        const response = await http().delete(`crud/v1/employee/destroy/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
})

const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        isLoading: false,
        employees: [],
        employee: {
            id: '',
            name: '',
            email: '',
            phone: '',
            country: '',
            city: '',
            _method: 'PUT'
        },
        success_message: '',
        error: null
    },
    extraReducers: (builder) => {
        /*all employee show start*/
        builder.addCase(getAllEmployee.pending, (state) => {
            state.isLoading = true;
        })

        builder.addCase(getAllEmployee.fulfilled, (state, action) => {
            state.isLoading = false;
            state.employees = action.payload.employees;
   
            state.error = null;
        })

        builder.addCase(getAllEmployee.rejected, (state, action) => {
            state.isLoading = false;
            state.employees = [];
            state.error = action.error.message;
        })
        /*all employee show end*/

        /*Employee store section start*/
        builder.addCase(storeEmployee.pending, (state) => {
            state.isLoading = true;
        })

        builder.addCase(storeEmployee.fulfilled, (state, action) => {
            state.isLoading = false;
            state.success_message = action.payload.message;
            state.error = null;
        })

        builder.addCase(storeEmployee.rejected, (state, action) => {
            state.isLoading = false;
            state.employees = [];
            state.error = action.error.message;
        })
        /*Employee store section end*/

        /*employee edit section start*/
        builder.addCase(getEditEmployee.fulfilled, (state, action) => {
            state.isLoading = false;
            state.employee = action.payload.employee;
            state.error = null;
        })
        /*employee edit section end*/

        /*employee update section start*/
        builder.addCase(updateEmployee.pending, (state) => {
            state.isLoading = true;
        })

        builder.addCase(updateEmployee.fulfilled, (state, action) => {
            state.isLoading = false;
            state.success_message = action.payload.message;
            state.error = null;
        })

        builder.addCase(updateEmployee.rejected, (state, action) => {
            state.isLoading = false;
            state.employees = [];
            state.error = action.error.message;
        })
        /*employee update section end*/

        /*Employee delete section start*/
        builder.addCase(deleteEmployee.fulfilled, (state, action) => {
            state.isLoading = false;

            const id = action.payload.id;

            state.employees = state.employees.filter((employee) => {
                return employee.id !== id
            });

            state.success_message = action.payload.message

            state.error = null;
        })
        /*EMployee delete section end*/
    }
});

export default employeeSlice.reducer;