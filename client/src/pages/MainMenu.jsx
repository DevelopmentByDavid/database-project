import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import Menu from '../components/Results'; // results component can just be used as the menu here -- doesn't matter

/*
                These are sample SQL statements
				System.out.println("MAIN MENU");
				System.out.println("---------");
				System.out.println("1. Add new customer");
				System.out.println("2. Add new room");
				System.out.println("3. Add new maintenance company");
				System.out.println("4. Add new repair");
				System.out.println("5. Add new Booking"); 
				System.out.println("6. Assign house cleaning staff to a room");
				System.out.println("7. Raise a repair request");
				System.out.println("8. Get number of available rooms");
				System.out.println("9. Get number of booked rooms");
				System.out.println("10. Get hotel bookings for a week");
				System.out.println("11. Get top k rooms with highest price for a date range");
				System.out.println("12. Get top k highest booking price for a customer");
				System.out.println("13. Get customer total cost occurred for a give date range"); 
				System.out.println("14. List the repairs made by maintenance company");
				System.out.println("15. Get top k maintenance companies based on repair count");
				System.out.println("16. Get number of repairs occurred per year for a given hotel room");
				System.out.println("17. < EXIT");
*/

const menu = [
    'Add new customer', // 0
    'Add new room', // 1
    'Add new maintenance company', // 2
    'Add new repair', // 3
    'Add new Booking', // 4
    'Assign house cleaning staff to a room', // 5
    'Raise a repair request', // 6
    'Get number of available rooms', // 7
    'Get number of booked rooms', // 8
    'Get hotel bookings for a week', // 9
    'Get top k rooms with highest price for a date range', // 10
    'Get top k highest booking price for a customer', // 11
    'Get customer total cost occurred for a given date range', // 12
    'List the repairs made by maintenance company', // 13
    'Get top k maintenance companies based on repair count', // 14
    'Get number of repairs occurred per year for a given hotel room' // 15
].map((choice, idx) => ({ _id: idx, primary: choice }));

export default function MainMenu() {
    const history = useHistory();
    const handleClick = id => {
        // < 7 is a create, >= 7 is a query
        if (id < 7) {
            history.push(`/create/${id}`);
        } else {
            history.push(`/read/${id}`);
        }
    };
    return (
        <Container maxWidth='md' style={{ paddingtop: '16px' }}>
            <Typography variant='h4'>Menu</Typography>
            <Paper>
                <Menu data={menu} onClick={handleClick} />
            </Paper>
        </Container>
    );
}
