/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Select from '../FieldSelect';

export default function HotelSelect(props) {
    return (
        <Select
            id='managerID'
            disabled={false}
            fullWidth
            label='Manager ID'
            subscriber={(setData, setLoading) => {
                fetch('/fields/staff?staffRole=%27Manager%27')
                    .then(res => {
                        res.json().then(({ data }) => {
                            setData(
                                data.map(({ ssn }) => ({
                                    value: ssn,
                                    label: ssn
                                }))
                            );
                            setLoading(false);
                        });
                    })
                    .catch(err => console.log(err));
            }}
            {...props}
        />
    );
}
