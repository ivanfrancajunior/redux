import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deposit,
  withdraw,
  requestLoan,
  payLoan,
} from "./account-slice";
function AccountOperations() {
  const dispatch = useDispatch();
  const { loan: loan_value, isLoading } = useSelector(
    (store) => store.account
  );
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] =
    useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("USD");

  function handleDeposit() {
    if (!depositAmount) return;

    dispatch(deposit(depositAmount, currency));
    setDepositAmount("");
    setCurrency("USD");
  }

  function handleWithdrawal() {
    if (!withdrawalAmount) return;
    dispatch(withdraw(Number(withdrawalAmount)));
  }

  function handleRequestLoan() {
    if (!loanAmount || !loanPurpose) return;
    dispatch(requestLoan(Number(loanAmount), loanPurpose));
    setLoanAmount("");
    setLoanPurpose("");
  }

  function handlePayLoan() {
    if (!loanAmount) return;
    dispatch(payLoan(Number(loanAmount)));
    setLoanAmount("");
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className='inputs'>
        <div>
          <label>Deposit</label>
          <input
            type='number'
            value={depositAmount}
            onChange={(e) =>
              setDepositAmount(+e.target.value)
            }
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value='USD'>US Dollar</option>
            <option value='EUR'>Euro</option>
            <option value='GBP'>British Pound</option>
            <option value='BRL'>Reais</option>
          </select>

          <button
            onClick={handleDeposit}
            disabled={isLoading}
          >
            {isLoading
              ? "Converting..."
              : `Deposit ${depositAmount}`}
          </button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type='number'
            value={withdrawalAmount}
            onChange={(e) =>
              setWithdrawalAmount(+e.target.value)
            }
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type='number'
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder='Loan amount'
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder='Loan purpose'
          />
          <button onClick={handleRequestLoan}>
            Request loan
          </button>
        </div>

        <div>
          <span>
            Pay back ${(loan_value * 1.03).toFixed(2)}
          </span>
          <button onClick={handlePayLoan}>Pay loan</button>
        </div>
      </div>
    </div>
  );
}

export default AccountOperations;
