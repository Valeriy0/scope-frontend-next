import React from 'react';

const loaders = {
  black: '/assets/loader/black.svg',
  white: '/assets/loader/white.svg',
};

const ScopeLoader = ({ type = 'black', width = '100px', height = '100px' }) => {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ width, height }}
    >
      <img
        className="animate-spin transition-all duration-200"
        src={loaders[type]}
        alt="Scope Logo"
        style={{ width: width, height: height }}
      />
    </div>
  );
};

export default ScopeLoader;
