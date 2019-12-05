# How to Run
## 1. Setup DB
```bash
cd server
cp .env.example .env # you must then edit the .env file
source ./db/startPostgreSQL.sh
./db/createPostGreDB.sh
yarn seed
```
# CS 166 Database Phase 3
This app simulates a Hotel database system in which customers, hotel staff, and
maintenance staff can access the necessary information.

## Hotel Portal Specifications
### Hotel Management
1. Given a hotel ID, list a given room’s bookings for the week.
2. For each hotel ID, get highest price among all booked rooms for a given data range
3. Given a hotel ID and a date, get (1) the number of rooms still available and (2) number of
rooms booked
4. Given a hotel ID and date, get a list of customers who made bookings for that date
5. Given a booking ID, retrieve information about the customer (First & Last Name, Gender,
Date of birth, Address) who made the booking
6. Given a hotel ID and customer ID, get the total cost incurred by the customer for a given
data range.

### Hotel Staff
1. Given a Hotel ID, list all details pertaining to staff, including their positions/roles (Hotel Managers, Receptionists, House cleaning, etc.) who are employed by that hotel
2. Hotel Managers may make maintenance/room repair requests, which will be handled by a maintenance company. The maintenance company must be certified to handle that specific type of repair. Given a manager ID list the hotel ID, room number and date of request.
3. Given a hotel ID and House cleaning staff ID list all the rooms he/she is assigned to

### Customers
1. Given customer ID, list all the rooms previously booked by that customer in all the hotels
2. Given a price and a data range, list all the available rooms in all hotels for that date range,
and price at or below the specified price.
3. Given a customer ID give the hotel ID where the per-day cost incurred by that customer
was the highest.

### Maintenance Companies
1. Given a maintenance company ID, list the type of repair, the hotel, and the room number for all repairs made by that company
2. For a given date range, list all the requests received by the maintenance company from a particular hotel manager ID

## ER Diagram
![ER Diagram](https://github.com/DevelopmentByDavid/database-project/blob/master/images/er-diagram.png?raw=true)
