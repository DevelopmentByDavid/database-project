import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CompanySelect from './Fields/CompanySelect';
import Dialog from './Dialog';
import { formatQuery } from '../lib/format';

// const fields = ['cmpID'];
// const labels = ['Company ID'];

export default function FormCompany() {
    const [state, setState] = React.useState({
        cmpID: ''
    });
    const [data, setData] = React.useState(null);
    const handleSubmit = event => {
        event.preventDefault();
        // const { cmpID } = event.target;
        // const values = {
        //     cmpID: cmpID.value,
        // };
        const url = formatQuery('/read/13', state);
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                res.json().then(({ data: resData }) => {
                    // console.log(obj);
                    console.log(resData);
                    setData(resData);
                });
            })
            .catch(err => {
                console.log(err);
            });
    };
    return (
        <>
            <Paper style={{ padding: '16px' }}>
                <Typography variant='h4'>
                    Repairs By Maintenance Company
                </Typography>
                <form id='new-customer' onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <CompanySelect
                                value={state.cmpID}
                                onChange={e =>
                                    setState({
                                        ...state,
                                        cmpID: e.target.value
                                    })
                                }
                            />
                        </Grid>
                        <Grid container item xs={12} justify='flex-end'>
                            <Button
                                variant='contained'
                                onSubmit={handleSubmit}
                                type='submit'
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
            <Dialog
                data={data || []}
                open={Boolean(data)}
                handleClose={() => setData(null)}
            />
        </>
    );
}
