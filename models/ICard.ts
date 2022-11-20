export interface ICard {
    id: number;
    order: number;
    title: string;
    imageUrl: string;
    isHidden?: boolean;
    isSketchy?: boolean;
}
