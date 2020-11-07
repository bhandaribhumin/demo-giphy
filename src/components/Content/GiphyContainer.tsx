// @flow

import React, { useEffect, useRef, useState } from 'react'
import {
  getComponentWrapperWidth,
  getDefaultMasonryConfig,
  getMasonryConfigExceptLast,
  getMediaBreakpoints,
} from './../../utils/masonry'

import Alert from './../Alert/Alert'
import GifItem from './../GifItem/GifItem'
import Grid from './../GridLayout/Grid'
import InfiniteScroll from 'react-infinite-scroller'
import SearchForm from './../SearchForm/SearchForm'
import Spinner from './../Spinner/Spinner'
import assetsSpinner from './../../assets/spinner.svg'
import styled from "styled-components";
import useApi from './../../hooks/useApi'
import useDebounce from './../../hooks/useDebounce'
import useMedia from './../../hooks/useMedia'
import useSearchForm from './../../hooks/useSearchForm'

const componentWrapper = styled.div`
   .componentWrapper {
    box-sizing: border-box;
  }
  .componentWrapper *, .componentWrapper *:before, .componentWrapper *:after {
    box-sizing: inherit;
  }
 
`;
const listWrapper = styled.div`
  .listWrapper {
    overflow-y: auto;
  }
 
`;

const imageBackgroundColor =  styled.div`
.listWrapper {
  overflow-y: auto;
}

`;
export const apiKey = '1OGGn0AcMr0DHbED4oSJQ6smyX0Txp6K';
type MasonryConfig = {
  mq?: string,
  columns: number,
  imageWidth: number,
  gutter: number,
}
type IProp = {
    onSearch: Function,
    onSelect: Function
}


const GiphyContainer = ({onSearch,onSelect}:IProp) => {
  const { query, handleInputChange, handleSubmit } = useSearchForm()
  const debouncedQuery = useDebounce(query, 500)
  const gifPerPage:number = 20;
  const rating:string = 'g';
  const masonryConfig:MasonryConfig[]= [{ columns: 2, imageWidth: 120, gutter: 5 }];
  const messageError:string = 'Oops! Something went wrong. Please, try again.';
  const messageLoading:string = 'Loading...';
  const messageNoMatches:string =  'No matches found.';
  const searchPlaceholder:string = 'Search for GIFs';


 
  
  const apiEndpoint = query ? 'search' : 'trending'
  const apiUrl = (offset:any) =>
    `https://api.giphy.com/v1/gifs/${apiEndpoint}?api_key=${apiKey}&limit=${gifPerPage}&rating=${rating}&offset=${offset}&q=${query}`

  const [{ data, loading, error, lastPage }, fetchImages] = useApi()

  const masonryConfigMatchMedia = useMedia(
    getMediaBreakpoints(masonryConfig),
    getMasonryConfigExceptLast(masonryConfig),
    getDefaultMasonryConfig(masonryConfig),
  )

  // Fetch Giphy Api on component mount and on search query change
  const [firstRun, setFirstRun] = useState(true)
  const isFirstRun = useRef(true)
  useEffect(() => {
    fetchImages(apiUrl(0))
    onSearch(query)

    if (isFirstRun.current) {
      isFirstRun.current = false
      setFirstRun(false)
    }
  }, [debouncedQuery])

  return (
    <div
      className={componentWrapper}
      style={{ width: getComponentWrapperWidth(masonryConfigMatchMedia) }}
    >
      <SearchForm
        value={query}
        setValue={handleInputChange}
        onSubmit={handleSubmit}
        //loadingData={loading}
      
        placeholder={searchPlaceholder}
      />

      <div
        className={listWrapper}
        style={{ height: '100vh' }}
      >
        <Alert
          show={data.length === 0 && !loading && !error && !firstRun}
          message={messageNoMatches}
        />

        <Alert show={error} message={messageError} />

        <Spinner show={loading} message={messageLoading} image={assetsSpinner} />

        <InfiniteScroll
          pageStart={0}
          loadMore={page => fetchImages(apiUrl(page * gifPerPage), true)}
          hasMore={!loading && !lastPage}
          useWindow={false}
          initialLoad={false}
          loader={<>
            {!firstRun && (
              <div key="loading">
                <Spinner
                  show={loading}
                  message={messageLoading}
                  image={assetsSpinner}
                />
              </div>
            )}
            </>}
        >
          {data.length > 0 && (
            <Grid sizes={masonryConfig}>
              {data.map((item:any) => (
                <GifItem
                  item={item}
                  size={masonryConfigMatchMedia.imageWidth}
                  key={item.id}
                 
                  onSelect={onSelect}
               
                />
              ))}
            </Grid>
          )}
        </InfiniteScroll>
      </div>
     
    </div>
  )
}
GiphyContainer.defaultProps = {
    onSearch: () => {},
  }
export default GiphyContainer
