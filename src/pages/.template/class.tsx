import React from "react";
import styles from './index.css';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps, IProps } from './store';
class App extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props)
  }
// setfunc=()=>{
//  this.props.setXXX();
// }
  render(){
    // const xxx = this.props.xxx;
    return (
      <div className={styles.normal}>
        class
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
