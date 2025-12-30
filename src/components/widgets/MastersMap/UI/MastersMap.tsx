import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './index.module.scss';

const customIcon = new L.DivIcon({
    className: styles.customMarker,
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -40],
    html: `<svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.164 0 0 7.164 0 16C0 28 16 40 16 40C16 40 32 28 32 16C32 7.164 24.836 0 16 0Z" fill="#9B59B6"/>
        <circle cx="16" cy="16" r="8" fill="white"/>
    </svg>`,
});

interface MasterMarker {
    id: number;
    name: string;
    position: [number, number];
    services?: string;
}

interface MastersMapProps {
    markers?: MasterMarker[];
}

const defaultMarkers: MasterMarker[] = [
    { id: 1, name: 'Мастер Ольга', position: [54.1, 25.3], services: 'Маникюр, педикюр' },
    { id: 2, name: 'Мастер Анна', position: [53.9, 27.56], services: 'Наращивание ногтей' },
    { id: 3, name: 'Мастер Екатерина', position: [53.68, 23.83], services: 'Маникюр' },
    { id: 4, name: 'Мастер Виктория', position: [53.9, 30.35], services: 'Дизайн ногтей' },
];

const BELARUS_CENTER: [number, number] = [53.5, 28.0];
const DEFAULT_ZOOM = 7;

const MastersMap: React.FC<MastersMapProps> = ({ markers = defaultMarkers }) => {
    return (
        <div className={styles.mapContainer}>
            <div className={styles.mapWrapper}>
                <MapContainer
                center={BELARUS_CENTER}
                zoom={DEFAULT_ZOOM}
                className={styles.map}
                scrollWheelZoom={true}
                attributionControl={false}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {markers.map((marker) => (
                    <Marker key={marker.id} position={marker.position} icon={customIcon}>
                        <Popup>
                            <div className={styles.popup}>
                                <strong>{marker.name}</strong>
                                {marker.services && <p>{marker.services}</p>}
                            </div>
                        </Popup>
                    </Marker>
                ))}
                </MapContainer>
            </div>
        </div>
    );
};

export { MastersMap };
