// @flow

import React from 'react'
import styles from './SearchForm.module.css'

type Props = {
  onSubmit: Function,
  placeholder: string,
  setValue: Function,
  value: string,
}

const SearchForm = ({
  onSubmit,
  placeholder,
  setValue,
  value,
}: Props) => (
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
)

export default SearchForm
