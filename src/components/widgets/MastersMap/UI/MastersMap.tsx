import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MastersMapProps } from '../model/mapTypes';
import {
    BELARUS_CENTER,
    DEFAULT_ZOOM,
    defaultMarkers,
    TILE_LAYER_URL,
} from '../model/mapConstants';
import { getCustomIcon, getCustomActiveIcon } from '../model/mapIcons';
import { MasterCard } from './MasterCard';
import styles from './index.module.scss';

const MastersMap: React.FC<MastersMapProps> = ({ markers = defaultMarkers, onBookClick }) => {
    const [activeMarkerId, setActiveMarkerId] = React.useState<number | null>(null);

    const customIcon = getCustomIcon(styles.customMarker);
    const customActiveIcon = getCustomActiveIcon(styles.customMarkerActive);

    const handleBookClick = (masterId: number) => {
        if (onBookClick) {
            onBookClick(masterId);
        }
    };

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
                    <TileLayer url={TILE_LAYER_URL} />
                    {markers.map((marker) => (
                        <Marker
                            key={marker.id}
                            position={marker.position}
                            icon={activeMarkerId === marker.id ? customActiveIcon : customIcon}
                            eventHandlers={{
                                popupopen: () => setActiveMarkerId(marker.id),
                                popupclose: () => setActiveMarkerId(null),
                            }}
                        >
                            <Popup closeButton={false}>
                                <MasterCard marker={marker} onBookClick={handleBookClick} />
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export { MastersMap };
