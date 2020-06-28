import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import store from '@/redux/store';
import { Provider } from 'react-redux';
import Base from './base';
import '@/global/react/global.scss';
import '@/global/react/global';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
const Layout: React.FC = () => {
    return <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        {/* base模块 */}
        <Base />
      </ConfigProvider>
    </Provider>;
};

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Route path="*" component={Layout} />
    </Router>
  );
};

const App: React.FC = () => {
  return <>
    <AppRouter />
  </>;
};
ReactDOM.render(<App />, document.getElementById('root'));
