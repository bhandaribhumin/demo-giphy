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
import styles from './GiphyContainer.module.css'
import useApi from './../../hooks/useApi'
import useDebounce from './../../hooks/useDebounce'
import useMedia from './../../hooks/useMedia'
import useSearchForm from './../../hooks/useSearchForm'

export const apiKey = '1OGGn0AcMr0DHbED4oSJQ6smyX0Txp6K';
type GridConfig = {
  mq?: string,
  columns: number,
  imageWidth?: number,
  gutter: number,
}
type IProp = {
    onSearch: Function,
    onSelect: Function,
    gridConfig: Array<GridConfig>
}


const GiphyContainer = ({onSearch,onSelect,gridConfig}:IProp) => {
  const { query, handleInputChange, handleSubmit } = useSearchForm()
  const debouncedQuery = useDebounce(query, 500)
  const gifPerPage:number = 20;
  const rating:string = 'g';
  const messageError:string = 'Oops! Something went wrong. Please, try again.';
  const messageLoading:string = 'Loading...';
  const messageNoMatches:string =  'No matches found.';
  const searchPlaceholder:string = 'Search for GIFs';
   

 
  
  const apiEndpoint = query ? 'search' : 'trending'
  const apiUrl = (offset:any) =>
    `https://api.giphy.com/v1/${type}/${apiEndpoint}?api_key=${apiKey}&limit=${gifPerPage}&rating=${rating}&offset=${offset}&q=${query}`

  const [{ data, loading, error, lastPage }, fetchImages] = useApi()

  const gridConfigMatchMedia = useMedia(
    getMediaBreakpoints(gridConfig),
    getMasonryConfigExceptLast(gridConfig),
    getDefaultMasonryConfig(gridConfig),
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
  console.log('GridConfig',getComponentWrapperWidth(gridConfigMatchMedia));
  return (
    <div
      className={styles.componentWrapper}
      style={{ width: '100%' }}
    >
      <SearchForm
        value={query}
        setValue={handleInputChange}
        onSubmit={handleSubmit}
        //loadingData={loading}
      
        placeholder={searchPlaceholder}
      />

      <div
        className={styles.listWrapper}
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

          loader={
              <div key="loading">
                <Spinner
                  show={loading}
                  message={messageLoading}
                  image={assetsSpinner}
                />
              </div>
            }
        >
          {data.length > 0 && (
            <Grid sizes={gridConfig}>
                {console.log('data',data)}
              {data.map((item:any) => (
                <GifItem
                  item={item}
                  size={gridConfigMatchMedia.imageWidth}
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
    onSearch:  () => {},
    onSelect:  () => {},
    masonryConfig: [{ columns: 2, imageWidth: 120, gutter: 5 }],
  }
export default GiphyContainer
