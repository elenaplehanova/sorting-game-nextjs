import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGameSetup } from "../../models/IGameSetup";

interface GameSetupState {
    gameSetup: IGameSetup;
}

export const mapArtifacts = [2, 3, 4, 5];
export const mapValues = ["А", 9, 19, 50, 99, 999];

const initialState: GameSetupState = {
    gameSetup: {
        countArtifacts: mapArtifacts[0],
        typeValues: mapValues[0],
        orderToHigh: true,
    },
};

export const setupSlice = createSlice({
    name: "setup",
    initialState,
    reducers: {
        setGameSetup(state, action: PayloadAction<IGameSetup>) {
            state.gameSetup = action.payload;
        },
    },
});

export default setupSlice.reducer;
