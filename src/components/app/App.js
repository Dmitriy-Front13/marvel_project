import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { marvelApi } from '../../redux/apiSlice';

import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicLayout = lazy(() => import('../pages/singleComicLayout/SingleComicLayout'));
const SingleCharacterLayout = lazy(() => import('../pages/singleCharacterLayout/SingleCharacterLayout'));
const SinglePage = lazy(() => import('../pages/SinglePage'));

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <ApiProvider api={marvelApi}>
                        <Suspense fallback={<Spinner />}>
                            <Switch>
                                <Route exact path="/">
                                    <MainPage />
                                </Route>
                                <Route exact path="/comics">
                                    <ComicsPage />
                                </Route>
                                <Route exact path="/comics/:id">
                                    <SinglePage Component={SingleComicLayout} dataType='comic' />
                                </Route>
                                <Route exact path="/characters/:id">
                                    <SinglePage Component={SingleCharacterLayout} dataType='character' />
                                </Route>
                                <Route path="*">
                                    <Page404 />
                                </Route>
                            </Switch>
                        </Suspense>
                    </ApiProvider>
                </main>
            </div>
        </Router>
    )
}

export default App;