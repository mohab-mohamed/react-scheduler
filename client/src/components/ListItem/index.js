import React from "react";
import "./listItem.css";
import { connect } from "react-redux";

const ListItem = (props) => {


 
  

  return (
          <li> test </li>        
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapStateToProps)(ListItem);
