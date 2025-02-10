import React from 'react';
import styles from './CartEmpty.module.scss';

export default function CartEmpty() {
  return (
    <>
      <h1 className={styles.root}>Cart is empty :(</h1>;
    </>
  );
}
