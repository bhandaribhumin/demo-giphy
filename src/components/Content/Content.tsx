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
  masonryConfig={[
    { columns: 2, imageWidth: 110, gutter: 5 },
    { mq: '700px', columns: 3, imageWidth: 110, gutter: 5 },
  ]}
/>
        </>
  </div>
);
  }
export default Content;
