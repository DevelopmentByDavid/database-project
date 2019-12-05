import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import SearchForm from '../components/SearchForm';
import Results from '../components/Results';

export default function Search() {
    return (
        <Container maxWidth='md' style={{ paddingTop: '16px'}}>
            <Grid container spacing={3} justify='center'>
                <Grid item xs={12}>
                    <Paper style={{ padding: '16px' }}>
                        <SearchForm placeholder='test' onSubmit={() => console.log('submitted search')} />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Results data={[]} onClick={id => console.log(id)}/>
                </Grid>
            </Grid>
        </Container>
    );
}
