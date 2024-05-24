import { configureStore } from "@reduxjs/toolkit";
import familyMembersReducer from "./reducers/familyMembersSlice";

const store = configureStore({
  reducer: { familyMembers: familyMembersReducer },
});

export default store;
