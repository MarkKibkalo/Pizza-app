import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchContext } from '../App';

import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';
import Categories from '../components/Categories';
import Skeleton from '../components/PizzaBlock/Skeleton';

import { setCategoryId } from '../redux/slices/filterSlices';
import { fetchPizzas } from '../redux/slices/pizzaThunk';

export default function Home() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.pizza.items);
  const { categoryId, sort } = useSelector((state) => state.filter);
  const sortType = sort.sortProperty;
  const { searchValue } = useContext(SearchContext);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchPizzas({ categoryId, sortType, searchValue })).finally(() => {
      setIsLoading(false);
    });

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
