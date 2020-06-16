import React from "react";

import { connect } from "react-redux";

import { Navbar, Button } from "react-bootstrap";

const Header = (props) => {

  const renderContext = () => {
    switch (props.user) {
      case null:
        return <p>loading</p>;
      case false:
        return ;

      default:
        return (
          <React.Fragment>
            <a href="/api/logout"><Button variant="danger">Log Out</Button></a>
          </React.Fragment>
        );
    }
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" >
        <Navbar.Brand href="/home">PROCRAST</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
          {renderContext()}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapStateToProps)(Header);
