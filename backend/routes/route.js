const express = require('express');
const router = express.Router();
const Station = require('../models/Station');


// Helper to calculate distance in km
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

router.post('/', async (req, res) => {
    const { start, destination, currentBattery, vehicleRange } = req.body;

    if (!start || !destination) {
        return res.status(400).json({ msg: 'Start and destination are required' });
    }

    try {
        // 1. Geocode Start
        const startRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(start)}&format=json&limit=1`);
        const startData = await startRes.json();
        if (!startData.length) return res.status(404).json({ msg: 'Start location not found' });
        const startCoords = { lat: parseFloat(startData[0].lat), lng: parseFloat(startData[0].lon) };

        // 2. Geocode Destination
        const destRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(destination)}&format=json&limit=1`);
        const destData = await destRes.json();
        if (!destData.length) return res.status(404).json({ msg: 'Destination location not found' });
        const destCoords = { lat: parseFloat(destData[0].lat), lng: parseFloat(destData[0].lon) };

        // 3. Get Route from OSRM
        const osrmUrl = `http://router.project-osrm.org/route/v1/driving/${startCoords.lng},${startCoords.lat};${destCoords.lng},${destCoords.lat}?overview=full&geometries=geojson`;
        const routeRes = await fetch(osrmUrl);
        const routeData = await routeRes.json();

        if (routeData.code !== 'Ok' || !routeData.routes.length) {
            return res.status(500).json({ msg: 'Could not calculate route' });
        }

        const routeGeoJSON = routeData.routes[0].geometry;
        // Leaflet expects [lat, lng], GeoJSON is [lng, lat]
        const routePath = routeGeoJSON.coordinates.map(coord => [coord[1], coord[0]]);

        // 4. Find stations along the route (Improved: Proximity Check)
        // First, get broader candidates via bounding box + buffer
        const buffer = 0.5; // approx 50km buffer
        const minLat = Math.min(startCoords.lat, destCoords.lat) - buffer;
        const maxLat = Math.max(startCoords.lat, destCoords.lat) + buffer;
        const minLng = Math.min(startCoords.lng, destCoords.lng) - buffer;
        const maxLng = Math.max(startCoords.lng, destCoords.lng) + buffer;

        const candidates = await Station.find({
            'location.lat': { $gte: minLat, $lte: maxLat },
            'location.lng': { $gte: minLng, $lte: maxLng }
        });

        // Filter candidates: Must be within 10km of ANY point on the route path
        // Optimization: Check against every 10th point to save computation
        const MAX_DISTANCE_KM = 10;

        const stationsAlongRoute = candidates.filter(station => {
            // Simple check: is this station close to any route point?
            // We sample the route to avoid checking thousands of points
            for (let i = 0; i < routePath.length; i += 5) {
                const routePoint = routePath[i];
                const dist = calculateDistance(
                    station.location.lat,
                    station.location.lng,
                    routePoint[0],
                    routePoint[1] // routePath is [lat, lng]
                );
                if (dist <= MAX_DISTANCE_KM) return true;
            }
            return false;
        });

        // MOCK GENERATOR: If we have too few stations, generate some for demonstration
        if (stationsAlongRoute.length < 3) {
            const numMocks = 3 - stationsAlongRoute.length;
            const step = Math.floor(routePath.length / (numMocks + 1));

            for (let i = 1; i <= numMocks; i++) {
                const index = i * step;
                if (index < routePath.length) {
                    const mockCoord = routePath[index]; // [lat, lng]

                    // Create a realistic-looking mock station
                    stationsAlongRoute.push({
                        _id: `mock_${Date.now()}_${i}`,
                        name: `EV Station - ${['Highway', 'City', 'Express', 'Green'][Math.floor(Math.random() * 4)]} Point ${Math.floor(Math.random() * 100)}`,
                        location: {
                            lat: mockCoord[0],
                            lng: mockCoord[1],
                            address: 'Highway Route Stop (Simulated)'
                        },
                        costPerKwh: 15 + Math.floor(Math.random() * 10),
                        availableSlots: 2 + Math.floor(Math.random() * 5),
                        isMock: true // Flag to identify if needed
                    });
                }
            }
        }

        // Filter strict distance from route path (sampled)
        // Simple optimization: check distance to start, end, or midpoints
        // For prototype, we return stations in the bounding box

        res.json({
            route: routePath,
            stationsAlongRoute: stationsAlongRoute,
            duration: routeData.routes[0].duration, // in seconds
            distance: routeData.routes[0].distance // in meters
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
