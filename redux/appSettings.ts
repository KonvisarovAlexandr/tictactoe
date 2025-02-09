import { createSlice } from "@reduxjs/toolkit";
import { REHYDRATE, RehydrateAction } from "redux-persist";
import { RootState } from "./configureStore";

type InitialStateTypes = {
  winStreak: number;
  loseStreak: number;
};

const initialState: InitialStateTypes = {
  winStreak: 0,
  loseStreak: 0,
};

const appSettingsSlice = createSlice({
  name: "appSettings",
  initialState,
  reducers: {
    increaseWinStreak: (state) => {
      state.winStreak += 1;
      state.loseStreak = 0;
    },
    increaseLoseStreak: (state) => {
      state.loseStreak += 1;
      state.winStreak = 0;
    },
    killWinStreak: (state) => {
      state.winStreak = 0;
    },
    killLoseStreak: (state) => {
      state.winStreak = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state, action: RehydrateAction) => {
      let rehydrate = {
        winStreak: 0,
      };
      if (action.payload) {
        const rehydratedState = action.payload as Partial<RootState>;
        if (rehydratedState?.appSettings?.winStreak) {
          rehydrate.winStreak = rehydratedState.appSettings.winStreak;
        }
      }
      state.winStreak = rehydrate.winStreak;
    });
  },
});

export const {
  increaseWinStreak,
  increaseLoseStreak,
  killWinStreak,
  killLoseStreak,
} = appSettingsSlice.actions;
export default appSettingsSlice.reducer;
