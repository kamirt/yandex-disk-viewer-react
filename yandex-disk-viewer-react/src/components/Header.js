import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Header extends Component {

  render() {
    return (
      <Link to='/'>
        <header className="header-main">
          <h1 className="header-main__title"><span className="y-letter">Y</span>andex disk viewer</h1>
        </header>
      </Link>
    );
  }
}

export default Header;
