import React, { useRef } from "react";
// import { useStoreContext } from "../../utils/GlobalState";
// import { ADD_POST, LOADING } from "../../utils/actions";
// import API from "../../utils/API";

import { VictoryPie } from "victory";

function CreateTimeDonut() {
  let sampleData = [
    { x: 1, y: 3, label: "one" },
    { x: 2, y: 3, label: "two" },
    { x: 3, y: 3, label: "three" },
  ];

  return (
    <VictoryPie
      padAngle={({ datum }) => datum.y}
      innerRadius={100}
      data={sampleData}
    />
  );
}

export default CreateTimeDonut;
