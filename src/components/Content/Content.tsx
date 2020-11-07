import React, { useState } from 'react';

import SearchBarComponent_ from './../search-bar';
import SuggestionBar from '../search-bar/suggestion-bar';
import styled from '@emotion/styled'

const SearchBarComponent = styled(SearchBarComponent_)`
    margin-bottom: 10px;
`
const Content = () =>  {
const [search, setSearch] = useState('')
  return (
  <div className="content">
    <h1>GIPHY React</h1>
    <>
            <SearchBarComponent />
            <SuggestionBar />
        </>
  </div>
);
  }
export default Content;
