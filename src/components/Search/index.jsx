import React, { useContext, useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss';
import { SearchContext } from '../../App';

export default function Search() {
  const { setSearchValue } = useContext(SearchContext);
  const [value, setValue] = useState('');

  // Оптимизированная функция с debounce через useCallback
  const debounceSearch = useCallback(
    debounce((searchText) => {
      setSearchValue(searchText);
    }, 250),
    [],
  );

  const onChangeInput = (event) => {
    const searchText = event.target.value;
    setValue(searchText);
    debounceSearch(searchText); // Вызываем debounce-функцию
  };

  const onClickClear = () => {
    setValue('');
    setSearchValue('');
  };

  return (
    <div className={styles.root}>
      <input onChange={onChangeInput} value={value} className={styles.input} placeholder="Search" />
      {value && (
        <svg
          onClick={onClickClear}
          className={styles.icon}
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
          <path d="M0 0h48v48h-48z" fill="none" />
        </svg>
      )}
    </div>
  );
}
