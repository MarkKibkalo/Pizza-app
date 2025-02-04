import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';
import Categories from '../components/Categories';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlices';

export default function Home() {
  const dispatch = useDispatch();
  const { categoryId, sort } = useSelector((state) => state.filter);
  const sortType = sort.sortProperty;
  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  useEffect(() => {
    const sortBy = sortType ? sortType.replace('-', '') : 'rating';
    const order = sortType && sortType.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    async function pizzaList() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `https://67658436410f849996555f31.mockapi.io/Items?${category}&sortBy=${sortBy}&order=${order}${search}`,
        );
        setItems(data);
      } catch (error) {
        console.error('Помилка завантаження піц:', error);
      } finally {
        setIsLoading(false);
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
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Усі піци</h2>
      <div className="content__items">{isLoading ? skeletonItems : pizzaItems}</div>
    </div>
  );
}
