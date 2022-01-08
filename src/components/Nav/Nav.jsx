import React from "react";
import {Link} from 'react-router-dom';

const Nav = () => {
  return <div>
     <ul className="nav">
        <li ><Link to="/">Products</Link></li>
      </ul>
  </div>;
};

export default Nav;
