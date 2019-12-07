/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Select from '../FieldSelect';
import { formatQuery } from '../../lib/format';

export default function RoomSelect({ hotelID, ...props }) {
    return (
        <Select
            id='roomID'
            fullWidth
            label='Room #'
            disabled={hotelID === ''}
            subscriber={(setData, setLoading) => {
                fetch(
                    formatQuery('/fields/room', {
                        hotelID
                    })
                )
                    .then(res => {
                        res.json().then(({ data }) => {
                            setData(
                                data.map(({ roomno }) => ({
                                    value: roomno,
                                    label: roomno
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
