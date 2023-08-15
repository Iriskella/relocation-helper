import React from "react";
import "./App.css";
import { ExcelToTable } from "./components/Finance/ExcelToTable";
import { SalaryCalculator } from "./components/Finance/SalaryCalculator";
import { TodoList } from "./components/TodoComponent/TodoList";
import { WeatherForecastComponent } from "./components/Weather";

import { mockTodoData } from "./mockData";

const tabs = ["ToDo", "Important Links", "Housing", "Content"];

export const App = () => {
  return (
    <div className="App">
      <div className="main-page">
        <header>
          <section className="header-content">
            <h1 className="header-title animate-pop-in">
              The Katz-Kella's Relocation to Amsterdam
            </h1>
            <h3 className="header-subtitle animate-pop-in">
              A useful start for our relocation
            </h3>
          </section>
        </header>
        <div id="animate-area"></div>
        <div id="salary-calculator" className="section-container">
          <span className="section-title">Salary Calculator</span>
          <SalaryCalculator />
        </div>
        <div id="todo-list" className="section-container">
          <span className="section-title">Relocation ToDo List:</span>
          <TodoList todosData={mockTodoData} />
        </div>
        <div id="weather-forecast" className="section-container">
          <span className="section-title">Weather Forcast for:</span>
          <WeatherForecastComponent />
        </div>
        <div id="excel-to-table" className="section-container">
          <span className="section-title">Excel Diplayer</span>
          <ExcelToTable />
        </div>
      </div>
    </div>
  );
};
