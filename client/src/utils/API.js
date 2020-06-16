import axios from "axios";

export default {

  signIn: function () {
    return axios.get("/auth/google");
  },


  addTask: async function (task, completed, _id) {
    console.log("Task Object Being Sent to Backend: ", {
      task: task,
      completed: completed,
      _id: _id,
    });
    const res = await axios
      .post("/api/task", {
        task: task,
        completed: completed,
        _id: _id,
      })
      .then((res) => {
        console.log("posted", res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
    return res;
  },

  getCalendarId: function (access) {
    return axios.get(
      "https://www.googleapis.com/calendar/v3/users/me/calendarList",
      {
        headers: { Authorization: "Bearer " + access },
      }
    );
  },

  getUpcomingEvents: function (access, calendarId) {
    console.log("calenderid ", calendarId);
    return axios.get(
      "https://www.googleapis.com/calendar/v3/calendars/" +
        calendarId +
        "/events?timeMin=2019-10-18T10:00:00Z",
      {
        headers: { Authorization: "Bearer " + access },
      }
    );
  },

  getTimeTables: function (_id) {
    return axios.get("/api/time_table/" + _id);
  },

  postTimeTable: function (_id, date, timeTable) {
    return axios.post("/api/time_table", {
      _id: _id,
      date: date,
      timeTable: timeTable,
    });
  },
};
