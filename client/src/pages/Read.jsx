import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { useParams } from 'react-router-dom';
import SearchForm from '../components/SearchForm';
import Results from '../components/Results';

export default function Read() {
    const { id } = useParams();
    const handleSearch = e => {
        e.preventDefault();
        console.log(id);
    };
    return (
        <Container maxWidth='md' style={{ paddingTop: '16px' }}>
            <Grid container spacing={3} justify='center'>
                <Grid item xs={12}>
                    <Paper style={{ padding: '16px' }}>
                        <SearchForm
                            placeholder='test'
                            onSubmit={handleSearch}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Results
                        data={[]}
                        onClick={resultId => console.log(resultId)}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
