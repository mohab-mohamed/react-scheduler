import React, { useState, useEffect } from "react";
// import { Col, Row, Container } from "../components/Grid";
import CreateTimeDonut from "../components/CreateTimeDonut";
import CreateTaskDonut from "../components/CreateTaskDonut";
import Header from "../components/Header";
import ToDoList from "../components/ToDoList";

import { Container, Row, Col } from "react-bootstrap";
import Calendar from "react-calendar";
import "./home.css";
import "./calendar.css";
// import 'react-calendar/dist/Calendar.css';

import { connect } from "react-redux";

import next from "../images/next.svg";
import back from "../images/back.svg";

const Home = (props) => {
  // console.log("ARE PROPS HERE", props.user);
  let user = props.user;
  const [idNames, setIDNames] = useState({
    donuts: "",
    todos: "hide",
    back: "hide",
    next: "",
  });
  const [value, onChange] = useState(new Date());
  const[day, setDay] = useState(null);

  const goToTodos = (ev) => {
    ev.preventDefault();
    const ids = {
      donuts: "hide",
      todos: "",
      back: "",
      next: "hide",
    };
    setIDNames(ids);
  };
  const goToDonuts = (ev) => {
    ev.preventDefault();
    const ids = {
      donuts: "",
      todos: "hide",
      back: "hide",
      next: "",
    };
    setIDNames(ids);
  };

  const clickDay = (val, e) => {
    setDay(val)

    return;
  };

  return (
    <div>
      <Header></Header>
      <img
        width="30"
        height="30"
        className="rightArrow"
        id={idNames.next}
        src={next}
        onClick={goToTodos}
      ></img>
      <img
        width="30"
        height="30"
        className="leftArrow"
        id={idNames.back}
        onClick={goToDonuts}
        src={back}
      ></img>
      <Container fluid className="donutScreen" id={idNames.donuts}>
        <Row>
          <Col className="centerColumn" size="md-6">
            {user && day ? <CreateTimeDonut date={day} />: null}
          </Col>
        </Row>
        <Row>
          <Col className="centerColumn">
            {user && day ? <CreateTaskDonut />: null}
          </Col>
        </Row>
        <Row>
          <Col id="centerCalendar" size="md-6">
            {user? <Calendar  onChange={onChange} onClickDay={clickDay} value={value}></Calendar>: null}
          </Col>
        </Row>
      </Container>
      <Container fluid className="todoScreen" id={idNames.todos}>
        <ToDoList></ToDoList>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};


export default connect(mapStateToProps)(Home);
