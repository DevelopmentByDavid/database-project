import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBack';
import { useHistory, Route } from 'react-router-dom';

export default function Back() {
    const history = useHistory();
    return (
        <Route path='/:path/'>
            <IconButton onClick={() => history.goBack()}>
                <BackIcon style={{ color: 'white' }} />
            </IconButton>
        </Route>
    );
}
