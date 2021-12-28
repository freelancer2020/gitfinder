import { createSlice } from "@reduxjs/toolkit";

type ContactState = {
  toggle: boolean;
};

const contactState: ContactState = {
  toggle: false,
};

export const contact = createSlice({
  name: "contact state",
  initialState: contactState,
  reducers: {
    toggleState(state, action) {
      action.payload === "1" ? (state.toggle = true) : (state.toggle = false);
    },
  },
});

export const contactAction = contact.actions;
