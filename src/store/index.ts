import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { MovieService } from "./service/movie";
import { FavoriteService } from "./service/favorite";

export const store = configureStore({
  reducer: {
    [MovieService.reducerPath]: MovieService.reducer,
    [FavoriteService.reducerPath]: FavoriteService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(MovieService.middleware).concat(FavoriteService.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
