import React from 'react';

export default function Categories({ value, onChangeCategory }) {
  const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy'];

  return (
    <div className="categories">
      <ul className="categories__list">
        {categories.map((categoryName, i) => (
          <li key={i} onClick={() => onChangeCategory(i)} className={value === i ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}
