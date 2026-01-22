import {CounterId} from "@/components/Counter/counter.slice";
import { createAction, createReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";


export type User = {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
  role: "USER" | "MODERATOR" | "ADMIN" | "OWNER";
} | null;

const initialUserState: User = {
  id: "",
  username: "",
  email: "",
  avatarUrl: "",
  role: "USER",
};

export type AuthState = {
  user: User;
  accessToken: string;
  fetchAuthStatus: "idle" | "pending" | "success" | "failed";
}

export type SessionPayload = {
  user: User,
  accessToken: string;
}

const initialAuthState: AuthState = {
  user: null,
  accessToken: "",
  fetchAuthStatus: "idle"
}



// export const userUpdateAction = createAction<User>("user/update")

// createReducer(initialUserState, (builder) => {
//   builder.addCase(userUpdateAction, (state, action) => {
//
//   })
// })


export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  selectors: {
    getUser: (state) => state.user,
    getAccessToken: (state) => state.accessToken,
  },
  reducers: {
    fetchAuthSuccess: (state, action: PayloadAction<SessionPayload>) => {
      state.user = action.payload.user;
      state.fetchAuthStatus = "success";
      state.accessToken = action.payload.accessToken;
    },
    fetchAuthPending(state) {
      state.fetchAuthStatus = "pending";
    },
    fetchAuthFailed(state) {
      state.fetchAuthStatus = "failed";
    },
    logout(state){
      state.fetchAuthStatus = "success";
      state.user = null;
      state.accessToken = "";
    }
  },
});

// export const userReducer = (state = initialUserState, action: Action) => {
//   switch (action.type) {
//   case "userUpdate": {
//     console.log("payload", action.payload);
//     return {
//       ...action.payload,
//     };
//   }
//   default:
//     return state;
//   }
// };
