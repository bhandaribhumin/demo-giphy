
export type IMasonryConfig = {
    mq?: string,
    columns: number,
    imageWidth: number,
    gutter: number,
  }
  
export type IProps = {
    apiKey: string,
    gifListHeight: string,
    gifPerPage: number,
    imageBackgroundColor: string,
    library: 'gifs' | 'stickers',
    listItemClassName: string,
    listWrapperClassName: string,
    loadingImage: string,
    masonryConfig: Array<IMasonryConfig>,
    messageError: string,
    messageLoading: string,
    messageNoMatches: string,
    onSearch: Function,
    onSelect: Function,
    poweredByGiphy: boolean,
    poweredByGiphyImage: string,
    rating: string,
    searchFormClassName: string,
    searchPlaceholder: string,
    wrapperClassName: string,
  }

