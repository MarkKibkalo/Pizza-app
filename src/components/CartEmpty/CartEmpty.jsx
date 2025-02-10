import React from 'react';
import styles from './CartEmpty.module.scss';
import { Link } from 'react-router-dom';

export default function CartEmpty() {
  return (
    <div className={styles.root}>
      <h1>Cart is empty :(</h1>
      <Link to="/" className="button button--outline button--add go-back-btn">
        <span>Повернутись назад</span>
      </Link>
    </div>
  );
}
