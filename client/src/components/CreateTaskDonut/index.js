import React, { useRef, useState, useEffect } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { AUTHENTICATE_USER } from "../../utils/actions";
import API from "../../utils/API";

import { VictoryPie,VictoryLabel } from "victory";

import { connect } from "react-redux";

import "./taskDonut.css";
const CreateTaskDonut = (props) => {
  // const [state, dispatch] = useStoreContext();
  // const getAuthentication = () => {
  //   API.authenticateUser()
  //     .then(() => {
  //       dispatch({
  //         type: AUTHENTICATE_USER
  //       });
  //     })
  //     .catch(err => console.log(err));
  // };

  const checkAuthentication = () => {};

  const renderContext = () => {
    switch (props.user) {
      case null:
        return <p>loading</p>;
      case false:
        return (
          <p style={pointerStyle}>
            <a href="/auth/google">signup with google</a>
          </p>
        );

      default:
        return (
          <React.Fragment>
            <p style={pointerStyle}>
              <a href="/api/logout">logout</a>
            </p>
          </React.Fragment>
        );
    }
  };
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

  let pointerStyle = {
    cursor: "pointer",
  };

  return (
     <svg   viewBox={"0 0" + " "+ width +" " + width}  width="50%" >
        <VictoryPie
          standalone={false}
          width={Math.round(width)}
          height={Math.round(width)}
          innerRadius={Math.round(width*0.2)}
          // padAngle={({ datum }) => datum.y}
          data={sampleData}
          labelComponent={<VictoryLabel active={false}/>}
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
