import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Route } from 'react-router-dom';
import MainMenu from './pages/MainMenu';
import Layout from './layout';
import Read from './pages/Read';
import Create from './pages/Create';

function App() {
    return (
        <BrowserRouter>
            <CssBaseline />
            <Route path='/' component={Layout} />
            <Route exact path='/' component={MainMenu} />
            <Route path='/read/:id' component={Read} />
            <Route path='/create/:id' component={Create} />
        </BrowserRouter>
    );
}

export default App;
