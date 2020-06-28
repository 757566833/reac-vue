import React from 'react';
import { BrowserRouter as Router, Link as RouterLink } from 'react-router-dom';

const Link:React.FC<{to:string}> = (props)=>{
  return <Router><RouterLink to={props.to}>{props.children}</RouterLink></Router>;
};
export default Link;
