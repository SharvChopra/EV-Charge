const mongoose = require('mongoose');
const Station = require('./models/Station');
require('dotenv').config();

const stations = [
    {
        name: 'ChargePoint Delhi Central',
        location: { lat: 28.6139, lng: 77.2090, address: 'Connaught Place, New Delhi' },
        chargerType: ['Type2', 'CCS2'],
        costPerKwh: 15,
        availableSlots: 4
    },
    {
        name: 'GreenPower Gurgaon',
        location: { lat: 28.4595, lng: 77.0266, address: 'Cyber Hub, Gurgaon' },
        chargerType: ['DC Fast', 'Type2'],
        costPerKwh: 18,
        availableSlots: 2
    },
    {
        name: 'EV Hub Noida',
        location: { lat: 28.5355, lng: 77.3910, address: 'Sector 18, Noida' },
        chargerType: ['Type2'],
        costPerKwh: 12,
        availableSlots: 6
    },
    {
        name: 'Highway Charger Jaipur',
        location: { lat: 26.9124, lng: 75.7873, address: 'MI Road, Jaipur' },
        chargerType: ['CCS2', 'DC Fast'],
        costPerKwh: 20,
        availableSlots: 3
    },
    {
        name: 'Midway Halt',
        location: { lat: 27.8, lng: 76.5, address: 'NH48 Behror' }, // Midway Delhi-Jaipur
        chargerType: ['DC Fast'],
        costPerKwh: 22,
        availableSlots: 5
    }
];

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('MongoDB Connected');
        await Station.deleteMany({});
        await Station.insertMany(stations);
        console.log('Stations Seeded');
        process.exit();
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });
