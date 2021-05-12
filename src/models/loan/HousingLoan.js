import Loan from "../Loan.js";

export default class HousingLoan extends Loan {
  constructor(amount, paybackTime, interestRate = 0.035) {
    super(amount, paybackTime, interestRate);
  }
}
