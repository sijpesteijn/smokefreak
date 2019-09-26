import React from 'react';
import SmokeEventRegister from "./SmokeEventRegister";
import SmokeEventLast from "./SmokeEventLast";
import SmokeEventCountDown from "./SmokeEventCountDown";

const Home = () => {
    return (
      <div>
          <SmokeEventRegister></SmokeEventRegister>
          <SmokeEventCountDown></SmokeEventCountDown>
          <SmokeEventLast></SmokeEventLast>
      </div>
    );
};

export default Home;