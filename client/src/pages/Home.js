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
import GoogleButton from "react-google-button";

import { connect } from "react-redux";

import next from "../images/next.svg";
import back from "../images/back.svg";

import ParticlesBg from "particles-bg";

const Home = (props) => {
  // console.log("ARE PROPS HERE", props.user);
  let user = props.user;
  const [idNames, setIDNames] = useState({
    donuts: "hide",
    todos: "hide",
    back: "hide",
    next: "hide",
    signIn: "",
  });
  const [value, onChange] = useState(new Date());
  const [day, setDay] = useState(null);

  let config = {
    num: [4, 7],
    rps: 0.1,
    radius: [5, 40],
    life: [1.5, 3],
    v: [2, 3],
    tha: [-40, 40],
    alpha: [0.6, 0],
    scale: [0.1, 0.4],
    position: "all",
    color: ["random", "#ff0000"],
    cross: "dead",
    // emitter: "follow",
    random: 15,
  };

  if (Math.random() > 0.85) {
    config = Object.assign(config, {
      onParticleUpdate: (ctx, particle) => {
        ctx.beginPath();
        ctx.rect(
          particle.p.x,
          particle.p.y,
          particle.radius * 2,
          particle.radius * 2
        );
        ctx.fillStyle = particle.color;
        ctx.fill();
        ctx.closePath();
      },
    });
  }

  useEffect(() => {
    const ids = {
      donuts: "",
      todos: "hide",
      back: "hide",
      next: "",
      signIn: "hide",
    };
    const idsButton = {
      donuts: "hide",
      todos: "hide",
      back: "hide",
      next: "hide",
      signIn: "",
    };

    if (props.user) {
      setIDNames(ids);
    } else if (props.user === null) {
      setIDNames(idsButton);
    } else {
      setIDNames(idsButton);
    }
  }, [props.user]);

  const goToTodos = (ev) => {
    ev.preventDefault();
    const ids = {
      donuts: "hide",
      todos: "",
      back: "",
      next: "hide",
      signIn: "hide",
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
      signIn: "hide",
    };
    setIDNames(ids);
  };

  const clickDay = (val, e) => {
    setDay(val);

    return;
  };

  // const signIn = () => {
  //   const ids = {
  //     donuts: "",
  //     todos: "hide",
  //     back: "hide",
  //     next: "",
  //     signIn: "hide",
  //   };
  //   setIDNames(ids);
  //   return;
  // };

  return (
    <div>
      <Header></Header>
      <div  className="signInContainer" id={idNames.signIn}>
        <a href="/auth/google">
          <GoogleButton type="light"></GoogleButton>
        </a>
      </div>
      {user && day ? (
        <img
          width="30"
          height="30"
          className="rightArrow"
          id={idNames.next}
          src={next}
          onClick={goToTodos}
          alt="next arrow"
        ></img>
      ) : null}
      {user && day ? (
        <img
          width="30"
          height="30"
          className="leftArrow"
          id={idNames.back}
          onClick={goToDonuts}
          src={back}
          alt="back arrow"
        ></img>
      ) : null}
      <Container fluid className="donutScreen" id={idNames.donuts}>
        <Row>
          <Col className="centerColumn" size="md-6">
            {user && day ? (
              <CreateTimeDonut date={day} />
            ) : (
              <div className="pickDate">
                <p>Please Pick a Date</p>
              </div>
            )}
          </Col>
        </Row>
        <Row>
          <Col className="centerColumn">
            {user && day ? <CreateTaskDonut /> : null}
          </Col>
        </Row>
        <Row>
          <Col id="centerCalendar" size="md-6">
            {user ? (
              <Calendar
                onChange={onChange}
                onClickDay={clickDay}
                value={value}
              ></Calendar>
            ) : null}
          </Col>
        </Row>
      </Container>
      <Container fluid className="todoScreen" id={idNames.todos}>
        <ToDoList></ToDoList>
      </Container>
      <ParticlesBg type="custom" config={config} bg={true} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapStateToProps)(Home);
