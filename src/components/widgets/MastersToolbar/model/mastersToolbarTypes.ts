export type ViewMode = 'list' | 'map';

export type MastersToolbarProps = {
    onSortSelect?: (value: string) => void;
    viewMode?: ViewMode;
    onViewModeChange?: (mode: ViewMode) => void;
};
