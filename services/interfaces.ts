import { SliderValue } from "./types";

export interface ReferenceValues {
    mapArtifacts: SliderValue[];
    mapValues: SliderValue[];
    orderToHigh: boolean;

}

export interface GameSetup {
    countArtifacts: SliderValue;
    typeValues: SliderValue;
    orderToHigh: boolean;
}

export interface Card {
    id: number;
    order: number;
    title: string;
    imageUrl: string;
    isHidden?:boolean;
    isSketchy?: boolean;
}

