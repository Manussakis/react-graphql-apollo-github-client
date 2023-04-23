import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import "./App.scss";

function App() {
  const [organizationName, setOrganizationName] = useState("facebook");

  const onOrganizationSearch = (value: string) => {
    setOrganizationName(value);
  };

  return (
    <div className="App">
      <Navigation
        organizationName={organizationName}
        onOrganizationSearch={onOrganizationSearch}
      />
      <h1>Github Client</h1>
      <div className="App-content_small-header">
        <Outlet context={organizationName} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
