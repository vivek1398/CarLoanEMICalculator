// CarLoanEMICalculator.js

import React, { useState } from 'react';
import './CarLoanEMICalculator.css';

function CarLoanEMICalculator() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [numberOfMonths, setNumberOfMonths] = useState('');
  const [emiSchedule, setEmiSchedule] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const calculateEMI = () => {
    let principal = loanAmount - downPayment;
    const monthlyInterestRate = (interestRate / 12) / 100;
    const emi =
      (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths)) /
      (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1);

    const emiScheduleArray = [];

    let currentDate = new Date(startDate); // Parse the start date
    for (let month = 1; month <= numberOfMonths; month++) {
      const interestPayment = (principal * monthlyInterestRate).toFixed(2);
      const principalPayment = (emi - interestPayment).toFixed(2);
      const remainingPrincipal = (principal - principalPayment).toFixed(2);

      const formattedDate = currentDate.toLocaleDateString('en-IN', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      });

      const formattedMonth = `Month ${month} (${currentDate.toLocaleDateString('en-IN', {
        month: 'long',
        year: 'numeric',
      })})`;

      emiScheduleArray.push({
        month: formattedMonth,
        emi: emi.toFixed(2),
        principalPayment,
        interestPayment,
        remainingPrincipal,
        date: formattedDate,
      });

      // Calculate the next month's date
      currentDate.setMonth(currentDate.getMonth() + 1);

      principal = remainingPrincipal;
    }

    setEmiSchedule(emiScheduleArray);
  };

  return (
    <div className="emi-calculator">
      <div className="input-section">
        <h2>Car Loan EMI Calculator</h2>
        {/* Input fields for loan details */}
        <div>
          <label htmlFor="loanAmount">Loan Amount (in INR):</label>
          <input
            type="number"
            id="loanAmount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="interestRate">Interest Rate (% per annum):</label>
          <input
            type="number"
            id="interestRate"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="downPayment">Down Payment (in INR):</label>
          <input
            type="number"
            id="downPayment"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="startDate">Loan Start Date (mm-dd-yy):</label>
          <input
            type="text"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="endDate">Loan End Date (mm-dd-yy):</label>
          <input
            type="text"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="numberOfMonths">Number of Months:</label>
          <input
            type="number"
            id="numberOfMonths"
            value={numberOfMonths}
            onChange={(e) => setNumberOfMonths(e.target.value)}
          />
        </div>
        <button onClick={calculateEMI}>Calculate EMI</button>
      </div>
      {emiSchedule.length > 0 && (
        <div className="emi-details">
          <h3>EMI Schedule</h3>
          {/* Render individual tables for each month */}
          {emiSchedule.map((item) => (
            <div key={item.month} className="emi-schedule">
              <h4>{item.month}</h4>
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>EMI (INR)</td>
                    <td>{item.emi}</td>
                  </tr>
                  <tr>
                    <td>Principal Payment</td>
                    <td>{item.principalPayment}</td>
                  </tr>
                  <tr>
                    <td>Interest Payment</td>
                    <td>{item.interestPayment}</td>
                  </tr>
                  <tr>
                    <td>Remaining Principal</td>
                    <td>{item.remainingPrincipal}</td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>{item.date}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CarLoanEMICalculator;