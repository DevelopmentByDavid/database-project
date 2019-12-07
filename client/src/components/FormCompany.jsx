/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import useSnack from '../hooks/useSnack';

// const fields = ['name', 'address', 'isCertified'];
// const labels = ['Company Name', 'address', 'Certified'];

const defaultState = {
    name: '',
    address: '',
    isCertified: false
};

export default function FormCompany() {
    const [state, setState] = React.useState(defaultState);
    const snack = useSnack();
    const handleSubmit = event => {
        event.preventDefault();
        fetch('/create/2', {
            method: 'POST',
            body: JSON.stringify(state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                res.json().then(({ data, detail }) => {
                    setState(defaultState);
                    if (data === 1) {
                        snack(`Successfully added ${state.name}`, 'success');
                    } else {
                        // console.log(rest);
                        snack(`Error: ${detail}`, 'error');
                    }
                });
            })
            .catch(err => {
                snack('Error, please try again', 'error');
                console.log(err);
            });
    };
    return (
        <Paper style={{ padding: '16px' }}>
            <Typography variant='h4'>Add a Maintenance Company</Typography>
            <form id='new-customer' onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label='Company Name'
                            value={state.name}
                            onChange={e =>
                                setState({ ...state, name: e.target.value })
                            }
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Company Address'
                            value={state.address}
                            onChange={e =>
                                setState({ ...state, address: e.target.value })
                            }
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={(
                                <Checkbox
                                    checked={state.isCertified}
                                    onChange={e =>
                                        setState({
                                            ...state,
                                            isCertified: e.target.checked
                                        })
                                    }
                                    value={state.isCertified}
                                    inputProps={{
                                        'aria-label': 'primary checkbox'
                                    }}
                                />
                            )}
                            label='Certified'
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
    );
}
