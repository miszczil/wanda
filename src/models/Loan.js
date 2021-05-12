export default class Loan {
  constructor(amount, paybackTime, interestRate) {
    this.amount = amount;
    this.paybackTime = paybackTime;
    this.interestRate = interestRate;

    this.monthlyRate = this.interestRate / 12;
    this.totalMonths = this.paybackTime * 12;
  }

  getMonthlyPayment() {
    // var payment = amount * r * (1 + r)**n / [(1 + r)**n - 1]
    const payment = this.amount * this.monthlyRate * (1 + this.monthlyRate)**this.totalMonths /
      [(1 + this.monthlyRate)**this.totalMonths - 1];

    return payment;

  }

  generateAmortizationSchedule() {

    const schedule = [];
    const monthlyRate = this.monthlyRate;
    const payment = this.getMonthlyPayment();
    let balance = this.amount;

    const calculateInterest = function()
    {
      return monthlyRate * balance;
    }

    for (var i = 0; i < this.totalMonths; i++)
    {
        const interest = calculateInterest();
        const totalInterest = schedule.length > 0 ?
          schedule[schedule.length - 1].totalInterest + interest
          : interest;
        const principal = payment - interest;
        balance -= principal;

        schedule.push({
          principal: principal,
          interest: interest,
          totalInterest: totalInterest,
          balance: balance
        });
    }

    return schedule;
  }
}
