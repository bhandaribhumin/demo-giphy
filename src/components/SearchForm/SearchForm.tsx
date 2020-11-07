// @flow

import React from 'react'
import styles from './SearchForm.module.css'

type Props = {
  onSubmit: () => void,
  placeholder: string,
  setValue:  () => void,
  value: string,
}

const SearchForm = ({
  onSubmit,
  placeholder,
  setValue,
  value,
}: Props) => { 
  
  return(
  <form
    data-testid="SearchFormForm"
    onSubmit={onSubmit}
    autoComplete="off"
    className={`${styles.form}`}
  >
    <input
      data-testid="SearchFormInput"
      type="text"
      placeholder={placeholder}
      onChange={setValue}
      value={value}
      name="search"
      className={styles.input}
    />
  </form>
)}

export default SearchForm
