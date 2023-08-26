import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./global.css";
import Home from "./components/Home";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <div className={darkMode ? "dark dark:h-full" : ""}>
      <div className="dark:bg-monkey dark:text-white bg-white h-full">
        <button
          className="p-1 border rounded shadow-sm dark:border-type absolute right-0 top-3 lg:right-3 md:right-3 dark:border-2"
          onClick={toggleDarkMode}
        >
          {" "}
          {darkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-sun-high dark:stroke-text"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="1"
              // stroke="#ffffff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14.828 14.828a4 4 0 1 0 -5.656 -5.656a4 4 0 0 0 5.656 5.656z" />
              <path d="M6.343 17.657l-1.414 1.414" />
              <path d="M6.343 6.343l-1.414 -1.414" />
              <path d="M17.657 6.343l1.414 -1.414" />
              <path d="M17.657 17.657l1.414 1.414" />
              <path d="M4 12h-2" />
              <path d="M12 4v-2" />
              <path d="M20 12h2" />
              <path d="M12 20v2" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-moon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="1"
              stroke="#000000"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
            </svg>
          )}
        </button>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
