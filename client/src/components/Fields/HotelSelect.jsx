/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Select from '../FieldSelect';

export default function HotelSelect(props) {
    return (
        <Select
            id='hotelID'
            disabled={false}
            fullWidth
            label='Hotel ID'
            subscriber={(setData, setLoading) => {
                fetch('/fields/hotel')
                    .then(res => {
                        res.json().then(({ data }) => {
                            setData(
                                data.map(({ hotelid }) => ({
                                    value: hotelid,
                                    label: hotelid
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
