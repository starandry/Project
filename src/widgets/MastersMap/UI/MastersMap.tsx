import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MastersMapProps } from '../model/mapTypes';
import {
    BELARUS_CENTER,
    DEFAULT_ZOOM,
    MAX_ZOOM,
    defaultMarkers,
    TILE_LAYER_URL,
} from '../model/mapConstants';
import { getCustomIcon, getCustomActiveIcon } from '../model/mapIcons';
import { MasterCard } from './MasterCard';
import styles from './index.module.scss';

const ZoomControls: React.FC = () => {
    const map = useMap();

    const zoomSmooth = React.useCallback(
        (delta: number, duration: number = 0.3) => {
            const currentZoom = map.getZoom();
            const newZoom = currentZoom + delta;

            // Ограничиваем зум, чтобы не выходить за пределы
            if (newZoom > MAX_ZOOM || newZoom < map.getMinZoom()) {
                return;
            }

            map.flyTo(map.getCenter(), newZoom, {
                duration,
            });
        },
        [map]
    );

    const handleZoomIn = React.useCallback(() => {
        zoomSmooth(0.4, 0.15);
    }, [zoomSmooth]);

    const handleZoomOut = React.useCallback(() => {
        zoomSmooth(-0.4, 0.15);
    }, [zoomSmooth]);

    const handleWheel = React.useCallback(
        (e: WheelEvent) => {
            e.preventDefault();
            const delta = e.deltaY > 0 ? -0.4 : 0.4;
            zoomSmooth(delta, 0.15);
        },
        [zoomSmooth]
    );

    React.useEffect(() => {
        const mapElement = map.getContainer();
        const wheelHandler = (e: Event) => {
            handleWheel(e as WheelEvent);
        };
        mapElement.addEventListener('wheel', wheelHandler, { passive: false });

        return () => {
            mapElement.removeEventListener('wheel', wheelHandler);
        };
    }, [map, handleWheel]);

    return (
        <div className={styles.zoomControls}>
            <button onClick={handleZoomIn} className={styles.zoomBtn}>
                +
            </button>
            <button onClick={handleZoomOut} className={styles.zoomBtn}>
                −
            </button>
        </div>
    );
};

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
                    maxZoom={MAX_ZOOM}
                    className={styles.map}
                    scrollWheelZoom={false}
                    zoomControl={false}
                    attributionControl={false}
                >
                    <TileLayer url={TILE_LAYER_URL} />
                    <ZoomControls />
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
