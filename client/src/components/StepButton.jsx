/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const StepButton = props => (
    <Grid container justify='flex-end'>
        <Grid item>
            <Button
                variant='contained'
                color='primary'
                type='submit'
                style={{ marginTop: '16px' }}
                {...props}
            >
                Next
            </Button>
        </Grid>
    </Grid>
);

export default StepButton;
