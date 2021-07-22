import { createSlice } from '@reduxjs/toolkit'

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    value: 0,
    logMonthlyBreakdown: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
    noOfUsers: "12K",
    noOfUploads: "2K",
    noOfNodes: "2K",
    logDetails: [
        {id: 1, fileName: "log_5362526353626", fileSize: "12KB", date: "3245675", ip: "168.23.12.2", action: "", content: ""},
        {id: 2, fileName: "log_53fget36537", fileSize: "21KB", date: "3223675", ip: "168.23.12.3", action: "", content: ""},
        {id: 3, fileName: "log_873662292334", fileSize: "6KB", date: "3244575", ip: "168.23.12.2", action: "", content: ""},
        {id: 4, fileName: "log_732hg386483", fileSize: "8KB", date: "32456755", ip: "168.23.12.4", action: "", content: ""},
    ]
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = dataSlice.actions

export default dataSlice.reducer