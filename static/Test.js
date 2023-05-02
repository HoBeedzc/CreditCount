import React, { useContext } from 'react';
import { MyContext } from './MyContext';

function MyComponent() {
  const data = useContext(MyContext);
  console.log(data)
  return <div>{data}</div>;
}
