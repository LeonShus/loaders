import React, { useState } from "react";

import { ProgressShortTable } from "./components/ProgressShortTable/ProgressShortTable";

// const COLUMN_WIDTH = 24;
// const COLUMN_WIDTH = 10;

function App() {
  const [columnWidth, setColumnWidth] = useState(10);
  const [withBorder, setWithBorder] = useState(false);

  return (
    <div className="App">
      <div style={{ marginBottom: "30px" }}>
        <div style={{ marginBottom: "20px" }}>
          <span>Ширина колонок</span>
          <input
            // value={columnWidth}
            placeholder={`${10}`}
            type="number"
            onChange={(e) => {
              setColumnWidth(Number(e.currentTarget.value));
            }}
            style={{ marginLeft: "10px" }}
          />
        </div>

        <div>
          <input
            onChange={(e) => {
              setWithBorder(e.target.checked);
            }}
            id="checkbox_borders"
            type="checkbox"
            name="scales"
          />
          <label htmlFor="checkbox_borders">Показывать колонки</label>
        </div>
      </div>

      {/* <ProgressTable/> */}

      <ProgressShortTable columnWidth={columnWidth === 0 ? 10 : columnWidth} withBorder={withBorder}/>
    </div>
  );
}

export default App;
