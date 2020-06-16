import React, { useRef, useState, useEffect } from "react";
import API from "../../utils/API";

import { VictoryPie } from "victory";

import { connect } from "react-redux";
import moment from "moment";
import { set } from "mongoose";

const CreateTimeDonut = (props) => {
  const [timeTable, setTimeTable] = useState([0, 0, 0, 1440]);

  useEffect(() => {
    async function fetchTables() {
      // You can await here
      console.log("enetered effect");
      const resTimeTables = await API.getTimeTables(props.user._id);
      const timeTables = resTimeTables.data;
      // console.log(timeTables[0].date);
      // console.log(JSON.stringify(props.date));
      // console.log("time tables", timeTables[0].date===JSON.stringify(props.date));

      let dayTableArray = timeTables.filter(
        (timeTable) => timeTable.date === JSON.stringify(props.date)
      );
      if (dayTableArray.length > 0) {
        setTimeTable(dayTableArray[0].timeTable);
      } else {
        setTimeTable([0, 0, 0, 1440]);
      }
    }
    fetchTables();
  }, [props.date]);

  console.log("PROPS SHOULD BE HERE", props);

  // console.log("ARE PROPS HERE", props);
  const makeTimeTable = async () => {
    // get todays moment
    const now = moment(props.date);
    const start = now.startOf("day");
    const startDay = now.add("7", "hours");

    // grab primary calendar id
    const idRes = await API.getCalendarId(props.user.access);
    const calendarId = idRes.data.items[0].id;

    // grab evnt response and filter only events after today
    const eventsRes = await API.getUpcomingEvents(
      props.user.access,
      calendarId
    );
    const allResponseEvents = eventsRes.data.items;
    // filter
    const allEvents = allResponseEvents.filter((event) =>
      moment(event.start.dateTime).isAfter(startDay)
    );

    // calculate work time
    let workTime = 0;
    allEvents.forEach((event) => {
      const startTime = moment(event.start.dateTime);
      const endTime = moment(event.end.dateTime);
      const duration = moment.duration(endTime.diff(startTime));
      const minutes = duration.asMinutes();
      console.log(minutes);
      workTime += minutes;
    });

    // calcualte new time table and set state
    const newTimeTable = [
      workTime,
      timeTable[1],
      timeTable[2],
      1440 - workTime,
    ];
    setTimeTable(newTimeTable);
    await API.postTimeTable(props.user._id, JSON.stringify(props.date), newTimeTable);
    return;
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
    { x: 1, y: timeTable[0] },
    { x: 2, y: timeTable[1] },
    { x: 3, y: timeTable[2] },
    { x: 4, y: timeTable[3] },
  ];

  let pointerStyle = {
    cursor: "pointer",
  };

  return (
    <div>
      <svg viewBox={"0 0" + " " + width + " " + width} width="100%">
        <circle
          onClick={makeTimeTable}
          cx={width / 2}
          cy={width / 2}
          r={40}
          fill="#c43a31"
        />
        <VictoryPie
          standalone={false}
          width={width}
          height={width}
          innerRadius={Math.round(width * 0.2)}
          animate={{ duration: 1000 }}
          // padAngle={({ datum }) => datum.y}
          data={sampleData}
          labels={() => null}
        />
      </svg>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapStateToProps)(CreateTimeDonut);
