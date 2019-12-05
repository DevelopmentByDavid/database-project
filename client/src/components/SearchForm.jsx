import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';

export default function SearchForm({ placeholder, onSubmit }) {
    return (
        <form onSubmit={onSubmit}>
            <Grid container>
                <Grid item xs={8}>
                    <TextField id='search' label='Search...' placeholder={placeholder} fullWidth />
                </Grid>
                <Grid item xs={4}>
                    <IconButton type='submit'>
                        <SearchIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </form>
    );
}

SearchForm.propTypes = {
    placeholder: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
}


