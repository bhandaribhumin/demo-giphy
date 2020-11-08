import React, { useState } from 'react';

import GiphyContainer from './GiphyContainer';
import useWindowDimensions from './../../hooks/useWindowDimensions';

const Content = () => {
  const { height, width } = useWindowDimensions();
  const [search, setSearch] = useState('')

  return (
    <div className="content">
      <h1>GIPHY React</h1>
      <>
        <GiphyContainer
          onSelect={(item: any) => console.log(item)}
          gridConfig={[{ columns: 2, gutter: 5, imageWidth: 120 }, { mq: '768px', columns: 3, gutter: 5, imageWidth: 210 }, { mq: '1024px', columns: 6, gutter: 5, imageWidth: 210 }]}
        />
      </>
    </div>
  );
}
export default Content;
