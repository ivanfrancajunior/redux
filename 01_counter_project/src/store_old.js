import { createStore, combineReducers } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPropose: "",
};
const initialStateCostumer = {
  fullname: "",
  nationalId: "",
  createdAt: "",
};

const accountReducer = (
  state = initialStateAccount,
  action
) => {
  const taxes = 1.15;
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        loan: action.payload.amount,
        loanPropose: action.payload.purpose,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPropose: "",
        balance: state.balance - action.payload * taxes,
      };
    default:
      return state;
  }
};

function deposit(amount) {
  return {
    type: "account/deposit",
    payload: amount,
  };
}
function withdraw(amount) {
  return {
    type: "account/withdraw",
    payload: amount,
  };
}
function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}
function payLoan(amount) {
  return {
    type: "account/payLoan",
    payload: amount,
  };
}

function createCustomer(fullname, nationalId) {
  return {
    type: "customer/create",
    payload: {
      fullname,
      nationalId,
      createdAt: new Date().toISOString(),
    },
  };
}
function updateName(fullname) {
  return {
    type: "customer/updateName",
    payload: {
      fullname,
    },
  };
}

const costumerReducer = (
  state = initialStateCostumer,
  action
) => {
  switch (action.type) {
    case "customer/create":
      return {
        ...state,
        fullname: action.payload.fullname,
        nationalId: action.payload.natinalId,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return {
        ...state,
        fullname: action.payload.fullname,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  account: accountReducer,
  costumer: costumerReducer,
});

const store = createStore(rootReducer);

console.log(store.getState());
store.dispatch(deposit(1000));
console.log(store.getState());

store.dispatch(withdraw(250));
console.log(store.getState());

store.dispatch(requestLoan(300, "buy a car"));
console.log(store.getState());

store.dispatch(payLoan(300));
console.log(store.getState());

store.dispatch(createCustomer("John Doe", "123456789"));
console.log(store.getState());

store.dispatch(updateName("John Doe Smith"));
console.log(store.getState());
