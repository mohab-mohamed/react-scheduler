import React, {  useState, useEffect } from "react";
import API from "../../utils/API";

import { VictoryPie } from "victory";
import CreateTaskDonut from "../CreateTaskDonut";

import { connect } from "react-redux";
import moment from "moment";


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
      480,
      120,
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


  return (
    <div className="centerOuter">
      <svg viewBox={"0 0" + " " + width + " " + width} width="100%">
        <circle
        stroke="#343A40"
        strokeWidth="4"
          onClick={makeTimeTable}
          cx={width / 2}
          cy={width / 2}
          r={35}
          fill="rgba(200,200,200,0.9)"
        />
        <VictoryPie
          colorScale={["rgba(217,132,139,0.9)", "rgba(13, 152, 186, 0.9)", "rgba(255, 204, 0, 0.7)", "rgba(170, 245, 139, 0.9)"] }
          standalone={false}
          width={width}
          height={width}
          innerRadius={Math.round(width * 0.2)}
          animate={{ duration: 1000 }}
          // padAngle={({ datum }) => datum.y}
          data={sampleData}
          labels={() => null}
          style={{data: {stroke:"#343A40", strokeWidth: 3}}}
        />
      </svg>
      <div className="centerColumn">
      <CreateTaskDonut />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapStateToProps)(CreateTimeDonut);
