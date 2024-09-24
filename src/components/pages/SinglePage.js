import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from "../appBanner/AppBanner";
import { useGetInfoQuery } from '../../redux/apiSlice';


const SinglePage = ({Component, dataType}) => {
        const {id} = useParams();

        const {data, isFetching, isError} = useGetInfoQuery({id, dataType});

        const errorMessage = isError ? <ErrorMessage/> : null;
        const spinner = isFetching ? <Spinner/> : null;
        const content = !(isFetching || isFetching || !data) ? <Component data={data}/> : null;

        return (
            <>
                <AppBanner/>
                {errorMessage}
                {spinner}
                {content}
            </>
        )
}

export default SinglePage;