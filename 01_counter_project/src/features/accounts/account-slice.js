const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPropose: "",
  isLoading: false,
};

const accountReducer = (
  state = initialStateAccount,
  action
) => {
  const taxes = 1.03;
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
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
    case "account/convertingCurrency":
      return { ...state, isLoading: true };
    default:
      return state;
  }
};

export function deposit(amount, currency) {
  if (currency === "USD")
    return {
      type: "account/deposit",
      payload: amount,
    };
  return async function async(dispatch) {
    dispatch({ type: "account/convertingCurrency" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );

    const data = await res.json();
    const converted_value = data.rates.USD;

    console.log(data);

    dispatch({
      type: "account/deposit",
      payload: converted_value,
    });
  };
}
export function withdraw(amount) {
  return {
    type: "account/withdraw",
    payload: amount,
  };
}
export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}
export function payLoan(amount) {
  return {
    type: "account/payLoan",
    payload: amount,
  };
}

export default accountReducer;
