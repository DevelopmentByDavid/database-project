import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import { BrowserRouter, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import MainMenu from './pages/MainMenu';
import Layout from './layout';
import Read from './pages/Read';
import Create from './pages/Create';

// add action to all snackbars
const notistackRef = React.createRef();
const onClickDismiss = key => () => {
    notistackRef.current.closeSnackbar(key);
};

function App() {
    return (
        <BrowserRouter>
            <SnackbarProvider
                maxSnack={3}
                ref={notistackRef}
                action={key => (
                    <Button onClick={onClickDismiss(key)}>Dismiss</Button>
                )}
            >
                <CssBaseline />
                <Route path='/' component={Layout} />
                <Route exact path='/' component={MainMenu} />
                <Route path='/read/:id' component={Read} />
                <Route path='/create/:id' component={Create} />
            </SnackbarProvider>
        </BrowserRouter>
    );
}

export default App;
