export type CounterId = string;

type CounterState = {
  counter: number;
};

export type CountersState = Record<CounterId, CounterState | undefined>;

export type IncrementAction = {
  type: "increment";
  payload: {
    counterId: CounterId;
  };
};

export type DecrementAction = {
  type: "decrement";
  payload: {
    counterId: CounterId;
  };
};

type Action = IncrementAction | DecrementAction;


const initialCountersState: CountersState = {};

const initialCounterState: CounterState = { counter: 0 };

export const countersReducer = (
  state = initialCountersState,
  action: Action,
) => {
  switch (action.type) {
  case "increment": {
    const { counterId } = action.payload;
    const currentCounter = state[counterId] ?? initialCounterState;
    return {
      ...state,
      [counterId]: {
        counter: currentCounter.counter + 1,
      },
    };
  }
  case "decrement": {
    const { counterId } = action.payload;
    const currentCounter = state[counterId] ?? initialCounterState;
    return {
      ...state,
      [counterId]: {
        counter: currentCounter.counter - 1,
      },
    };
  }
  default:
    return state;
  }
};