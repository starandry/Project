import { MasterMarker } from './mapTypes';

export const BELARUS_CENTER: [number, number] = [53.5, 28.0];
export const DEFAULT_ZOOM = 7;
export const MAX_ZOOM = 18;

export const TILE_LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

export const defaultMarkers: MasterMarker[] = [
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
