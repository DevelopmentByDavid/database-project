import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import SearchForm from '../components/SearchForm';
import Results from '../components/Results';

export default function Search() {
    return (
        <Container maxWidth='md'>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper style={{ padding: '16px' }}>
                        <SearchForm placeholder='test' onSubmit={() => console.log('submitted search')} />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Results data={[]} />
                </Grid>
            </Grid>
        </Container>
    );
}
