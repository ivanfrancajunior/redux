import { useSelector } from "react-redux";
import AccountOperations from "./features/accounts/AccountOperations";
import BalanceDisplay from "./features/accounts/BalanceDisplay";
import CreateCustomer from "./features/costumers/CreateCustomer";
import Customer from "./features/costumers/Customer";

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
      {/* <PostApp /> */}
    </div>
  );
}

export default App;
