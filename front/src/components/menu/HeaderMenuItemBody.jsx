import React from "react";
import MenuItemBody from "./MenuItemBody";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const HeaderMenuItemBody = ({icon, text, to}) => {
  return (
      <Link to={to} style={{'textDecoration': 'none'}}>
          <MenuItemBody text={text} icon={icon} />
      </Link>
  )
}

HeaderMenuItemBody.propTypes = {
    icon: PropTypes.node.isRequired,
    text: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
}

export default HeaderMenuItemBody;
