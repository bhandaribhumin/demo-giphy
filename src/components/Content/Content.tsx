import React, { useState } from 'react';

import GiphyContainer from './GiphyContainer';

const Content = () =>  {
const [search, setSearch] = useState('')
  return (
  <div className="content">
    <h1>GIPHY React</h1>
    <>
    <GiphyContainer
  onSelect={(item:any) => console.log(item)}
/>
        </>
  </div>
);
  }
export default Content;
