import { useContext, useEffect, useState } from 'react';

import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';
import Categories from '../components/Categories';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { SearchContext } from '../App';

export default function Home() {
  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярністю',
    sortProperty: 'rating',
  });

  const list = [
    { name: 'популярністю', sortProperty: 'rating' },
    { name: 'ціною', sortProperty: 'price' },
    { name: 'алфавітом', sortProperty: 'title' },
  ];

  useEffect(() => {
    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    async function pizzaList() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://67658436410f849996555f31.mockapi.io/Items?${category}&sortBy=${sortBy}&order=${order}${search}`,
        );
        const data = await response.json();
        setItems(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Помилка завантаження даних:', error);
      }
    }

    pizzaList();
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue]);

  const skeletonItems = [...new Array(8)].map((_, i) => <Skeleton key={i} />);
  const pizzaItems = items
    .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={setCategoryId} />
        <Sort
          value={list.findIndex((item) => item.sortProperty === sortType.sortProperty)}
          onChangeSort={(i) => setSortType(list[i])}
        />
      </div>
      <h2 className="content__title">Усі піци</h2>
      <div className="content__items">{isLoading ? skeletonItems : pizzaItems}</div>
    </div>
  );
}
