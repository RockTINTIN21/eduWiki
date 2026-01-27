import {
	configureStore,
	type ThunkAction,
	type UnknownAction,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import { slice } from "@/features/auth/model/slice";

const extraArgument = {
	// api,
};

export const store = configureStore({
	reducer: {
		[slice.name]: slice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ thunk: { extraArgument } }),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<R = void> = ThunkAction<
	R,
	AppState,
	typeof extraArgument,
	UnknownAction
>;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
