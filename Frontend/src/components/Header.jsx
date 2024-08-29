import React, { useState } from "react";
import "../css/Header.css";
import RequestBox from "./RequestBox";

const Header = () => {
  const [isRequestBoxOpen, setIsRequestBoxOpen] = useState(false);

  const openRequestBox = () => setIsRequestBoxOpen(true);
  const closeRequestBox = () => setIsRequestBoxOpen(false);

  return (
    <>
      <header>
        <div className="header-left">
          <h3>Abstract</h3>|<h3>Help Center</h3>
        </div>
        <div className="header-right">
          <button onClick={openRequestBox}>Submit a request</button>
        </div>
      </header>

      <RequestBox isOpen={isRequestBoxOpen} onClose={closeRequestBox} />
    </>
  );
};

export default Header;
