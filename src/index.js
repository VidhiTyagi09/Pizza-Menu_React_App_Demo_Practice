import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { pizzaData } from "./data";
import "./index.css";

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  // ifwe have pizza then only render
  const pizzas = pizzaData;
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      {pizzas.length > 0 ? (
        //  we cannot return two similar level chidren in a JSX
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All for
            our stone oven, all organic and all delicious
          </p>
          <ul className="pizzas">
            {pizzas.map((pizza) => (
              <Pizza pizza={pizza} key={pizza.name} />
            ))}
          </ul>
        </>
      ) : (
        <p>Sorry! We are finished with all our Pizzas.</p>
      )}
    </main>
  );
}

function Pizza({ pizza }) {
  return (
    <li className={`pizza ${pizza.soldOut ? "sold-out" : ""}`}>
      <img src={pizza.photoName} alt={pizza.photoName} />
      <div>
        <h3>{pizza.name}</h3>
        <p>{pizza.ingredients}</p>
        <span>{pizza.soldOut ? "Not Available" : "₹" + pizza.price}</span>
      </div>
    </li>
  );
}

function Footer() {
  // we are off on Mondays!
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date().getDay();
  const [hours, setHours] = React.useState(new Date().getHours());
  const openHour = 10;
  const closingHour = 23;
  console.log(hours);

  const open = `We are currently Open till ${
    closingHour > 12 ? closingHour - 12 + ` PM` : closingHour + ` AM`
  }! Come or order online!`;
  const closed =
    (today === 0
      ? `Today is ${days[today]} and we are Off on ${days[today]}!`
      : "Sorry! We have Closed for today.") +
    ` We will open on ${days[today === 0 ? 1 : (today + 1) % 7]} Morning at ${
      openHour === 0 ? 12 : openHour
    } AM!`;

  const timeDetails = {
    openHour: openHour,
    closingHour: closingHour,
    hours: hours,
    openMsg: open,
    closeMsg: closed,
  };

  useEffect(function () {
    setInterval(function () {
      setHours(new Date().getHours());
    }, 1000);
  });
  return (
    <footer className="footer">
      <Order timeDetails={timeDetails} />
    </footer>
  );
}

function Order({ timeDetails }) {
  return (
    <div className="order">
      <p>
        {timeDetails.hours >= timeDetails.openHour &&
        timeDetails.hours < timeDetails.closingHour
          ? timeDetails.openMsg
          : timeDetails.closeMsg}
      </p>
      <button className="btn">Order</button>
    </div>
  );
}

// React v18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
