import {configureStore} from "@reduxjs/toolkit";

type CounterState = {
  counter: number;
}

export type CounterId = string;

type State = {
  counters: Record<CounterId, CounterState | undefined>;
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

const initialCounterState: CounterState = { counter: 0 }

const initialState: State = {
  counters: {}
};

type Action = IncrementAction | DecrementAction;

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
  default:
    return state;
  }
};

export const store = configureStore({
  reducer: reducer,
})

export type AppState = ReturnType<typeof store.getState>;