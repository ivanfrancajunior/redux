import {
  createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { thunk } from "redux-thunk";
import accountReducer from "./features/accounts/account-slice";
import customerReducer from "./features/costumers/costumers-slice";
import { composeWithDevTools } from "@redux-devtools/extension";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});


//add devtools to store
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
