import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import walletReducer from '../features/walletSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    wallet: walletReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
