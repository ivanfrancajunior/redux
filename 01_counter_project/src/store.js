import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/accounts/account-slice";
import customerReducer from "./features/costumers/costumers-slice";
import postReducer from "./post_app/post-slice";

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
    posts: postReducer,
  },
});

export default store;
