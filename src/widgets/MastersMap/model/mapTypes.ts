export interface MasterMarker {
    id: number;
    name: string;
    position: [number, number];
    photo?: string;
    specialty?: string;
    address?: string;
    rating?: number;
    reviewsCount?: number;
}

export interface MastersMapProps {
    markers?: MasterMarker[];
    onBookClick?: (masterId: number) => void;
}
