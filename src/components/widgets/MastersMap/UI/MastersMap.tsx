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
    photo?: string;
    specialty?: string;
    address?: string;
    rating?: number;
    reviewsCount?: number;
}

interface MastersMapProps {
    markers?: MasterMarker[];
    onBookClick?: (masterId: number) => void;
}

const defaultMarkers: MasterMarker[] = [
    {
        id: 1,
        name: 'Маргарита Чернышова',
        position: [54.1, 25.3],
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop',
        specialty: 'мастер маникюра',
        address: 'г. Минск, ул. Центральная, 54',
        rating: 5.0,
        reviewsCount: 4,
    },
    {
        id: 2,
        name: 'Анна Петрова',
        position: [53.9, 27.56],
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=400&fit=crop',
        specialty: 'мастер педикюра',
        address: 'г. Минск, ул. Ленина, 12',
        rating: 4.8,
        reviewsCount: 12,
    },
    {
        id: 3,
        name: 'Екатерина Иванова',
        position: [53.68, 23.83],
        photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop',
        specialty: 'мастер маникюра',
        address: 'г. Гродно, ул. Советская, 8',
        rating: 4.9,
        reviewsCount: 8,
    },
    {
        id: 4,
        name: 'Виктория Смирнова',
        position: [53.9, 30.35],
        photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=400&fit=crop',
        specialty: 'дизайн ногтей',
        address: 'г. Гомель, пр. Ленина, 45',
        rating: 5.0,
        reviewsCount: 15,
    },
];

const BELARUS_CENTER: [number, number] = [53.5, 28.0];
const DEFAULT_ZOOM = 7;

const StarIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
);

const ChatIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />
    </svg>
);

const HeartIcon = () => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
);

const MastersMap: React.FC<MastersMapProps> = ({ markers = defaultMarkers, onBookClick }) => {
    const handleBookClick = (masterId: number) => {
        if (onBookClick) {
            onBookClick(masterId);
        }
    };

    const getReviewsText = (count: number) => {
        if (count === 1) return 'отзыв';
        if (count >= 2 && count <= 4) return 'отзыва';
        return 'отзывов';
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
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {markers.map((marker) => (
                        <Marker key={marker.id} position={marker.position} icon={customIcon}>
                            <Popup closeButton={false}>
                                <div className={styles.masterCard}>
                                    <div className={styles.masterCardTop}>
                                        {marker.photo && (
                                            <img
                                                src={marker.photo}
                                                alt={marker.name}
                                                className={styles.masterPhoto}
                                            />
                                        )}
                                        <div className={styles.masterInfo}>
                                            <div className={styles.masterHeader}>
                                                <h3 className={styles.masterName}>{marker.name}</h3>
                                                <button className={styles.favoriteBtn} type="button">
                                                    <HeartIcon />
                                                </button>
                                            </div>
                                            {marker.specialty && (
                                                <p className={styles.masterSpecialty}>{marker.specialty}</p>
                                            )}
                                            {marker.address && (
                                                <p className={styles.masterAddress}>{marker.address}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className={styles.masterCardBottom}>
                                        <div className={styles.masterStats}>
                                            {marker.rating !== undefined && (
                                                <div className={styles.masterRating}>
                                                    <StarIcon />
                                                    <span>{marker.rating.toFixed(1)}</span>
                                                </div>
                                            )}
                                            {marker.reviewsCount !== undefined && (
                                                <div className={styles.masterReviews}>
                                                    <ChatIcon />
                                                    <span>
                                                        {marker.reviewsCount} {getReviewsText(marker.reviewsCount)}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            className={styles.bookButton}
                                            type="button"
                                            onClick={() => handleBookClick(marker.id)}
                                        >
                                            Записаться
                                        </button>
                                    </div>
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
