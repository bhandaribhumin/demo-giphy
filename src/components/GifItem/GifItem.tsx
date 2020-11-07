// @flow

import React from 'react'
import styles from './GifItem.module.css'

type Props = {

  item: any,
  onSelect: Function,
  size: number,
}

const GifItem = ({
  item,
  size,
  onSelect,
}: Props) => (
  <button
    data-testid="ImageItemButton"
    type="button"
    className={`${styles.imageButton}`}
    style={{
      backgroundColor:'transparent',
      width: `${size}px`,
      height: `${(item.images.fixed_width_downsampled.height * size) /
        item.images.fixed_width_downsampled.width}px`,
    }}
    onClick={() => onSelect(item)}
  >
    <img
      data-testid="ImageItemImage"
      width={item.images.fixed_width_downsampled.width}
      height={item.images.fixed_width_downsampled.height}
      alt={item.title}
      src={item.images.fixed_width_downsampled.url}
      className={styles.image}
    />
  </button>
)

export default GifItem
