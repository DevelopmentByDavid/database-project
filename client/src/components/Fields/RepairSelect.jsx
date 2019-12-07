/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Select from '../FieldSelect';

export default function HotelSelect(props) {
    return (
        <Select
            id='rID'
            disabled={false}
            fullWidth
            label='Repair ID'
            subscriber={(setData, setLoading) => {
                fetch('/fields/repair')
                    .then(res => {
                        res.json().then(({ data }) => {
                            setData(
                                data.map(({ rid }) => ({
                                    value: rid,
                                    label: rid
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
