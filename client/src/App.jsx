import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Route } from 'react-router-dom';
import MainMenu from './pages/MainMenu';
import Layout from './layout';
import Search from './pages/Search';

function App() {
    return (
        <BrowserRouter>
            <CssBaseline />
            <Route path='/' component={Layout} />
            <Route exact path='/' component={MainMenu} />
            <Route path='/search/:id' component={Search} />
        </BrowserRouter>
    );
}

export default App;
