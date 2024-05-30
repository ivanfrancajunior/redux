import { createStore,combineReducers,applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import accountReducer from "./features/accounts/account-slice";
import customerReducer from "./features/costumers/costumers-slice";
import postReducer from "./post_app/post-slice";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
  posts: postReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
