const initialStateCostumer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

const customerReducer = (
  state = initialStateCostumer,
  action
) => {
  switch (action.type) {
    case "customer/create":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.natinalId,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload.fullName,
      };
    default:
      return state;
  }
};

export function createCustomer(fullName, nationalId) {
  return {
    type: "customer/create",
    payload: {
      fullName,
      nationalId,
      createdAt: new Date().toISOString(),
    },
  };
}
export function updateName(fullName) {
  return {
    type: "customer/updateName",
    payload: {
      fullName,
    },
  };
}
export default customerReducer;
