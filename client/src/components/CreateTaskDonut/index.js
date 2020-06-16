import React, { useState, useEffect } from "react";

import { VictoryPie } from "victory";

import { connect } from "react-redux";

import "./taskDonut.css";
const CreateTaskDonut = (props) => {
  const [taskTable, setTaskTable] = useState(props.taskTable);

  const [width, setWidth] = useState(window.innerWidth);
  const updateWidth = (ev) => {
    setWidth(ev.target.innerWidth);
  };

  useEffect(() => {
    setTaskTable(props.taskTable);
  }, [props.taskTable]);

  // useEffect replaces `componentDidMount` and others
  useEffect(() => {
    window.addEventListener("resize", updateWidth);

    // Removes listener on unmount
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  let sampleData = [
    { x: 1, y: taskTable[0] },
    { x: 2, y: taskTable[1] },
    { x: 3, y: taskTable[2] },
    { x: 4, y: taskTable[3] },
  ];

  return (
    <svg viewBox={"0 0" + " " + width + " " + width} width="40%">
      <VictoryPie
        animate={{ duration: 1000 }}
        colorScale={[
          "rgba(234,144,122,0.9)",
          "rgba(251, 198, 135, 0.9)",
          "rgba(244, 247, 191, 0.9)",
          "rgba(170, 205, 190, 0.9)",
        ]}
        standalone={false}
        width={Math.round(width)}
        height={Math.round(width)}
        innerRadius={Math.round(width * 0.2)}
        // padAngle={({ datum }) => datum.y}
        data={sampleData}
        labels={() => null}
        style={{ data: { stroke: "#343A40", strokeWidth: 6 } }}
      />
    </svg>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapStateToProps)(CreateTaskDonut);
