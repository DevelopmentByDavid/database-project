/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

export default function DatePicker({ id, label, ...passThroughProps }) {
    return (
        <TextField
            id={id}
            label={label}
            type='date'
            // defaultValue=
            InputLabelProps={{
                shrink: true
            }}
            {...passThroughProps}
        />
    );
}

DatePicker.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};
