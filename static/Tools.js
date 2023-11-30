'use strict';

import React from 'react';

const MyContext = React.createContext();

function MyProvider(props) {
  const data = 'This is some data';

  return <MyContext.Provider value={data}>{props.children}</MyContext.Provider>;
}

export { MyContext, MyProvider };
