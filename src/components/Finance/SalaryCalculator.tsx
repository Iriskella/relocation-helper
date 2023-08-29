import React, { useEffect, useState } from "react";

const calculateIncomeAfterTax = (
  income: number,
  currency: string,
  appliedRuling: boolean
): number => {
  const exchangeRate = currency === "USD" ? 0.92 : 1;

  let incomeEUR = currency === "USD" ? income * exchangeRate : income;

  // Define tax brackets and rates
  const brackets = [0, 34712, 68508];
  const rates = [0.097, 0.03735, 0.495];

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

const rulingToolTipText = (
  <div>
    The salary criteria for the 30% ruling as per January 2023 are as follows:
    <br />
    1. The salary amount does not matter if working with scientific research.
    <br />
    2. The annual taxable salary for an employee with a master’s degree and who
    is younger than 30 years, must be more than 31,891 (2022: 30,001). <br />
    3. The annual taxable salary for other employees must be more than 41,954
    (2022: 39,467).
  </div>
);

export const SalaryCalculator = () => {
  const [ruling, setRuling] = useState(false);
  const [isRulingApplicable, setIsRulingApplicable] = useState(false);
  const [annualGrossIncome, setAnnualGrossIncome] = useState(0);
  const [annualNetIncome, setAnnualNetIncome] = useState(0);
  const [monthlyNetIncome, setMonthlyNetIncome] = useState(0);
  const [currency, setCurrency] = useState("EUR");

  const currenecies = [
    { name: "EUR", icon: "€" },
    { name: "USD", icon: "$" },
  ];

  useEffect(() => {
    const isRulingApplicable =
      (currency === "EUR" && annualGrossIncome > 41954) ||
      (currency === "USD" && annualGrossIncome > 45802);
    setIsRulingApplicable(isRulingApplicable);
  }, [annualGrossIncome, currency]);

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
    <div className="row-container">
      <div className="column-container">
        
        <label>
          Enter Annual Gross Income:{" "}
          <input
            id="grossIncome"
            name="grossIncome"
            type="number"
            placeholder="Annual gross salary"
            onChange={(e) => handleIncomeChange(e.target.value)}
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
          {isRulingApplicable
            ? "With 30% Ruling: "
            : "Less then minimum per ruling"}
          <input
            id="rullingCheck"
            name="rullingCheck"
            type="checkbox"
            checked={ruling}
            onChange={() => setRuling(!ruling)}
            disabled={!isRulingApplicable}
          ></input>
        </label>
        <label>
          A more detailed income tax calculator is{" "}
          <a
            href="https://thetax.nl/"
            rel="dofollow noreferrer"
            target="_blank"
          >
            here
          </a>
        </label>
      </div>
      <div className="column-container">
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
