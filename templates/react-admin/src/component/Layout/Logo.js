import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from './antd.svg';

class Logo extends React.PureComponent {
  render() {
    return (
      <div>
        <Link className="sider-logo" to="/home">
          <img src={logoImg} className="App-logo" alt="logo" />
          <span>REACT ADMIN</span>
        </Link>
      </div>
    );
  }
}

export default Logo;
