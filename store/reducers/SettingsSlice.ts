import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGameSettings } from "../../models/IGameSettings";

interface GameSettingsState {
    gameSettings: IGameSettings;
}

export const mapArtifacts = [2, 3, 4, 5];
export const mapValues = ["A", 9, 19, 50, 99, 999];

const initialState: GameSettingsState = {
    gameSettings: {
        countArtifacts: mapArtifacts[0],
        typeValues: mapValues[0],
        orderToHigh: true,
    },
};

export const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setGameSettings(state, action: PayloadAction<IGameSettings>) {
            state.gameSettings = action.payload;
        },
    },
});

export default settingsSlice.reducer;
