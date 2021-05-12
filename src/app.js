import HousingLoan from "./models/loan/HousingLoan.js";

document.getElementById("calculate").addEventListener("click", handleSubmit);

function handleSubmit(e)
{
  e.preventDefault();

  var formData = new FormData(e.target.closest("form"));

  const amount = formData.get("amount");
  const paybackTime = formData.get("years");
  const loan = new HousingLoan(amount, paybackTime);

  renderSchedule(loan);
}


// todo: would be better as a component
function renderSchedule(loan)
{
  const schedule = loan.generateAmortizationSchedule();
  const monthlyPayment = loan.getMonthlyPayment();

  const table = document.createElement("table");

  table.innerHTML = `<thead>
    <tr>
      <th>Month</th>
      <th>Payment</th>
      <th>Principal</th>
      <th>Interest</th>
      <th>Total interest</th>
      <th>Balance</th>
    </tr>
  </thead>`;

  const tbody = document.createElement("tbody");
  table.appendChild(tbody);

  for (let i in schedule)
  {
    const row = document.createElement("tr");

    let content = `
      <td>${parseInt(i)+1}</td>
      <td>${monthlyPayment.toFixed(2)}</td>`;

    const columns = ['principal', 'interest', 'totalInterest', 'balance'];
    for (var j in columns)
    {
      content += `<td>${schedule[i][columns[j]].toFixed(2)}</td>`;
    }

    row.innerHTML = content;
    tbody.appendChild(row);
  }

  const scheduleDiv = document.getElementById("schedule");
  scheduleDiv.innerHTML = "";
  scheduleDiv.appendChild(table);
}
