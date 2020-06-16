import React, {  useState, useEffect } from "react";


import { VictoryPie } from "victory";

import { connect } from "react-redux";

import "./taskDonut.css";
const CreateTaskDonut = (props) => {


  
  const [width, setWidth] = useState(window.innerWidth);
  const updateWidth = (ev) => {
    setWidth(ev.target.innerWidth);
  };

  // useEffect replaces `componentDidMount` and others
  useEffect(() => {
    window.addEventListener("resize", updateWidth);

    // Removes listener on unmount
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  let sampleData = [
    { x: 1, y: 3 },
    { x: 2, y: 4 },
    { x: 3, y: 5 },
  ];

 

  return (
     <svg   viewBox={"0 0" + " "+ width +" " + width}  width="40%" >
        <VictoryPie
          standalone={false}
          width={Math.round(width)}
          height={Math.round(width)}
          innerRadius={Math.round(width*0.2)}
          // padAngle={({ datum }) => datum.y}
          data={sampleData}
          labels={() => null}
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
