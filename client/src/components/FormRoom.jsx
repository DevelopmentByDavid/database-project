/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import HotelSelect from './Fields/HotelSelect';
import Select from './FieldSelect';
import useSnack from '../hooks/useSnack';

// const fields = ['hotelID', 'roomNo', 'roomType'];
// const labels = ['Hotel ID', 'Room Number', 'Room Type'];

const defaultState = {
    hotelID: '',
    roomNo: '',
    roomType: ''
};

export default function FormRoom() {
    const [state, setState] = React.useState(defaultState);
    const snack = useSnack();
    const handleSubmit = event => {
        event.preventDefault();
        fetch('/create/1', {
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
                        snack(
                            `Successfully added assigned ${state.roomNo} of type ${state.roomType} to hotel ${state.hotelID}`,
                            'success'
                        );
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
            <Typography variant='h4'>Add a Room</Typography>
            <form id='new-customer' onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <HotelSelect
                            value={state.hotelID}
                            onChange={e =>
                                setState({ ...state, hotelID: e.target.value })
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            value={state.roomNo}
                            onChange={e =>
                                setState({ ...state, roomNo: e.target.value })
                            }
                            label='Room #'
                            type='number'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Select
                            id='roomType'
                            label='Room Type'
                            disabled={false}
                            value={state.roomType}
                            onChange={e =>
                                setState({ ...state, roomType: e.target.value })
                            }
                            subscriber={(setData, setLoading) => {
                                const choices = ['Economy', 'Deluxe', 'Suite'];
                                setData(
                                    choices.map(choice => ({
                                        label: choice,
                                        value: choice
                                    }))
                                );
                                setLoading(false);
                            }}
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
