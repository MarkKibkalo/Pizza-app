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
      <svg className={styles.icon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z" />
      </svg>
      <input
        onChange={onChangeInput}
        value={value}
        className={styles.input}
        placeholder="Пошук піцци..."
      />
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
