import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { Zap, MapPin } from 'lucide-react';

// Custom Marker Icons
const createIcon = (icon) => {
    return divIcon({
        html: renderToStaticMarkup(icon),
        className: "bg-transparent",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });
};

const stationIcon = createIcon(<div className="bg-ev-green text-ev-dark p-1 rounded-full border-2 border-white"><Zap size={20} /></div>);
const startIcon = createIcon(<div className="bg-blue-500 text-white p-1 rounded-full border-2 border-white"><MapPin size={20} /></div>);

const MapComponent = ({ stations, route, onStationSelect }) => {
    const defaultCenter = [20.5937, 78.9629]; // India Center

    return (
        <div className="h-full w-full rounded-lg overflow-hidden border border-gray-700 z-0">
            <MapContainer center={defaultCenter} zoom={5} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Stations */}
                {stations.map(station => (
                    <Marker
                        key={station._id}
                        position={[station.location.lat, station.location.lng]}
                        icon={stationIcon}
                        eventHandlers={{ click: () => onStationSelect(station) }}
                    >
                        <Popup className="text-black">
                            <h3 className="font-bold">{station.name}</h3>
                            <p>₹{station.costPerKwh}/kWh</p>
                            <button className="bg-ev-green text-ev-dark px-2 py-1 rounded text-xs font-bold mt-1">Book Slot</button>
                        </Popup>
                    </Marker>
                ))}

                {/* Route Polyline */}
                {route && <Polyline positions={route} color="#00D084" weight={5} />}
            </MapContainer>
        </div>
    );
};

export default MapComponent;
