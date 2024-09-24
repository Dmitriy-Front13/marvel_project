import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';
import { useGetAllComicsQuery } from '../../redux/apiSlice';

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const { data , isError, isFetching} = useGetAllComicsQuery(offset);

    useEffect(() => {
        if (data) {
            setComicsList((prevComicsList) => [...prevComicsList, ...data]);
            if (data.length < 9) {
                setComicsEnded(true);
            }
        }
    }, [data])

    const loadMore = () => {
        setOffset((prevOffset)=> prevOffset + 9)
    }

    function renderItems (arr) {
        const items = arr.map((item, i) => {
            return (
                <li className="comics__item" key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(comicsList);

    const errorMessage = isError ? <ErrorMessage/> : null;
    const spinner = isFetching ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button 
                disabled={isFetching} 
                style={{'display' : comicsEnded ? 'none' : 'block'}}
                className="button button__main button__long"
                onClick={loadMore}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;