import React, { Component } from "react";

import Game from "./components/Game";

function App() {
  return (
    <div className="flex flex-col items-center mt-10">
      <header>
        <h1 className="text-5xl">Bowling</h1>
      </header>
      <p className="text-center m-5">Enter your score</p>
      <Game />
    </div>
  );
}

export default App;
