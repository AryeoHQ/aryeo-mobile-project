import React, { useState, useEffect } from 'react';

const ThemeContext = React.createContext();

const ThemeProvider = (props) => {
  const brandColor = '#F9D949';
  return (
    <ThemeContext.Provider
      value={{
        brandColor,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
