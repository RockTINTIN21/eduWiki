import {configureStore} from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";

type CounterState = {
  counter: number;
}

type Token = string;

export type User = {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
  role: 'USER' | 'MODERATOR' | 'ADMIN' | 'OWNER';
}

export type CounterId = string;


type State = {
  counters: Record<CounterId, CounterState | undefined>;
  user: User | undefined;
}

export type IncrementAction = {
  type: 'increment';
  payload: {
    counterId: CounterId
  }
}

export type DecrementAction = {
  type: 'decrement';
  payload: {
    counterId: CounterId
  }
}

export type UserUpdateAction = {
  type: 'userUpdate';
  payload: {
    user: User
  }
}

const initialCounterState: CounterState = { counter: 0 }
const initialUserState: User = {
  id: "",
  username: "",
  email: "",
  avatarUrl: "",
  role: "USER",
}

const initialState: State = {
  counters: {},
  user: initialUserState,
};

type Action = IncrementAction | DecrementAction | UserUpdateAction;

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
  case 'increment': {
    const { counterId } = action.payload;
    const currentCounter = state.counters[counterId] ?? initialCounterState;
    return {
      ...state,
      counters: {
        ...state.counters,
        [counterId]: {
          counter: currentCounter.counter + 1,
        }
      }
    };
  }
  case 'decrement': {
    const { counterId } = action.payload;
    const currentCounter = state.counters[counterId] ?? initialCounterState;
    return {
      ...state,
      counters: {
        ...state.counters,
        [counterId]: {
          counter: currentCounter.counter - 1,
        }
      }
    };
  }
  case 'userUpdate': {
    const { user } = action.payload;
    return {
      ...state,
      user: user,
    }
  }
  default:
    return state;
  }
};

export const store = configureStore({
  reducer: reducer,
})

store.dispatch({
  type: 'userUpdate',
  payload: {
    user: {
      username: ''
    }
  },

})

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>()