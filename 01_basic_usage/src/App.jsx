import PostApp from "./post_app/post_app";
function App() {
  // const costumer = useSelector(
  //   (store) => store.customer.fullName
  // );
  return (
    <div>
      {/* <h1>🏦 The React-Redux Bank ⚛️</h1>

      {costumer === "" ? (
        <CreateCustomer />
      ) : (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )} */}
      <PostApp />
    </div>
  );
}

export default App;
