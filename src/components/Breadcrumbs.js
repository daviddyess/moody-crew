import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export const Breadcrumbs = ({ base, links, active }) => {
  const basePath = () => {
    switch (base) {
      default:
        return (
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
        );
    }
  };

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {basePath()}
        {links &&
          links.map((item, index) => {
            return (
              <li key={index} className="breadcrumb-item">
                <Link to={item.url}>{item.name}</Link>
              </li>
            );
          })}
        <li className="breadcrumb-item active" aria-current="page">
          <span className="active">{active}</span>
        </li>
      </ol>
    </nav>
  );
};
Breadcrumbs.propTypes = {
  base: PropTypes.string,
  links: PropTypes.array,
  active: PropTypes.string
};

export default Breadcrumbs;
