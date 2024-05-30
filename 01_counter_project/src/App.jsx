import CreateCustomer from "./features/costumers/CreateCustomer";
import Customer from "./features/costumers/Customer";
import AccountOperations from "./features/accounts/AccountOperations";
import BalanceDisplay from "./features/accounts/BalanceDisplay";
import { useSelector } from "react-redux";

function App() {
  const costumer = useSelector(
    (store) => store.customer.fullName
  );
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>

      {costumer === "" ? (
        <CreateCustomer />
      ) : (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )}
    </div>
  );
}

export default App;
