/* eslint-disable no-console */
/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import HotelSelect from './Fields/HotelSelect';
import StaffSelect from './Fields/StaffSelect';
import RoomSelect from './Fields/RoomSelect';
import useSnack from '../hooks/useSnack';

const defaultState = {
    staffID: '',
    hotelID: '',
    roomNo: ''
};

export default function FormAssign() {
    const [state, setState] = React.useState(defaultState);
    const snack = useSnack();

    const handleSubmit = event => {
        event.preventDefault();
        fetch('/create/5', {
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
                            `Successfully assigned ${state.staffID} to room ${state.roomNo} at hotel ${state.hotelID}`,
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
            <Typography variant='h4'>Assign</Typography>
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
                        <StaffSelect
                            hotelID={state.hotelID}
                            value={state.staffID}
                            onChange={e =>
                                setState({
                                    ...state,
                                    staffID: e.target.value
                                })
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <RoomSelect
                            hotelID={state.hotelID}
                            value={state.roomNo}
                            onChange={e =>
                                setState({
                                    ...state,
                                    roomNo: e.target.value
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
    );
}
