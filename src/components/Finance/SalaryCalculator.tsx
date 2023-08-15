import React, { useEffect, useState } from "react";

const calculateIncomeAfterTax = (
  income: number,
  currency: string,
  appliedRuling: boolean
): number => {
  const exchangeRate = currency === "USD" ? 0.92 : 1;

  let incomeEUR = currency === "USD" ? income * exchangeRate : income;

  // Define tax brackets and rates (as of knowledge cutoff in September 2021)
  const brackets = [0, 35000, 68507, 171842];
  const rates = [0.0375, 0.0375, 0.0385, 0.5145];

  let tax = 0;
  let remainingIncome = incomeEUR;

  for (let i = 0; i < brackets.length - 1; i++) {
    const bracketRange = brackets[i + 1] - brackets[i];
    if (remainingIncome > bracketRange) {
      tax += bracketRange * rates[i];
      remainingIncome -= bracketRange;
    } else {
      tax += remainingIncome * rates[i];
      break;
    }
  }
  if (appliedRuling) {
    tax *= 0.7;
  }

  // Calculate income after tax
  const incomeAfterTax =
    currency === "EUR" ? incomeEUR - tax : (incomeEUR - tax) * 1.09;

  return Number(incomeAfterTax.toFixed(2));
};

const rulingToolTipText = `The salary criteria for the 30% ruling as per January 2023 are as follows:
The salary amount does not matter if working with scientific research.
The annual taxable salary for an employee with a master’s degree and who is younger than 30 years, must be more than 31,891 (2022: 30,001).
The annual taxable salary for other employees must be more than 41,954 (2022: 39,467).`;

export const SalaryCalculator = () => {
  const [ruling, setRuling] = useState(false);
  const [annualGrossIncome, setAnnualGrossIncome] = useState(0);
  const [annualNetIncome, setAnnualNetIncome] = useState(0);
  const [monthlyNetIncome, setMonthlyNetIncome] = useState(0);
  const [currency, setCurrency] = useState("EUR");

  const currenecies = [
    { name: "EUR", icon: "€" },
    { name: "USD", icon: "$" },
  ];

  const handleIncomeChange = (annualGrossIncome: any) => {
    setAnnualGrossIncome(annualGrossIncome);
  };

  const currencyToIcon = () => {
    return currenecies
      .filter((curren) => curren.name === currency)
      .map((curr) => curr.icon);
  };

  useEffect(() => {
    let annual = calculateIncomeAfterTax(annualGrossIncome, currency, ruling);
    setAnnualNetIncome(annual);
    let monthly = (annual / 12).toFixed(2);
    setMonthlyNetIncome(Number(monthly));
  }, [ruling, currency, annualGrossIncome]);

  return (
    <div className="salary-row-container">
      <div className="salary-column-container">
        <label>
          Enter Annual Gross Income:{" "}
          <input
            id="grossIncome"
            name="grossIncome"
            type="text"
            placeholder="Annual gross salary"
            onChange={(e) => handleIncomeChange(Number(e.target.value))}
          ></input>
        </label>
        <label>
          Select Currency:{" "}
          <select onChange={(e) => setCurrency(e.target.value)}>
            {currenecies.map((currency) => (
              <option value={currency.name} key={currency.name}>
                {currency.icon + currency.name}
              </option>
            ))}
          </select>
        </label>
        <span className="tooltip">
          <span className="tooltiptext">{rulingToolTipText}</span>
        </span>
        <label>
          With 30% Ruling:{" "}
          <input
            id="rullingCheck"
            name="rullingCheck"
            type="checkbox"
            checked={ruling}
            onChange={() => setRuling(!ruling)}
          ></input>
        </label>
      </div>
      <div className="salary-column-container">
        {isNaN(annualGrossIncome) ? (
          <h2>Enter a valid number</h2>
        ) : (
          <>
            <h2>
              Annual Net Salary: {annualNetIncome} {currencyToIcon()}
            </h2>
            <h2>
              Monthly Net Salary: {monthlyNetIncome} {currencyToIcon()}
            </h2>
          </>
        )}
      </div>
    </div>
  );
};
