import React, { useCallback } from 'react';
import styles from './index.css';
// import { useSelector, useDispatch } from 'react-redux'
// import * as store from './store'
const App:React.FC = (_props) => {
  // const dispatch = useDispatch();
  // 如果不关注callback 这两个是不需要使用的
  // const xxx = useSelector(useCallback((storeData: store.IStoreData) => storeData.xxx, []))
  // const click = useCallback(() => {
  //   dispatch(store.xxx('xxx'))
  // }, [])
  // redux相关api
  // const click = () => dispatch(store.xxx('xxx'))
  // const xxx = useSelector((storeData: store.IStoreData) => storeData.xxx)
    return (
        <div className={styles.normal}>
          hooks
        </div>
    );
};

export default App;
