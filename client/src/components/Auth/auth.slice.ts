import {CounterId} from "@/components/Counter/counter.slice";
import {createAction, createReducer} from "@reduxjs/toolkit";

const initialUserState = {
  id: "",
  username: "",
  email: "",
  avatarUrl: "",
  role: "USER",
};


export type User = {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
  role: "USER" | "MODERATOR" | "ADMIN" | "OWNER";
};

// export type UserUpdateAction = {
//   type: "userUpdate";
//   payload: User;
// };

// type Action = UserUpdateAction;


export const userUpdateAction = createAction<User>("user/update")

createReducer(initialUserState, (builder) => {
  builder.addCase(userUpdateAction, (state, action) => {
    state.email = action.payload.email;
    state.username = action.payload.username;
    state.avatarUrl = action.payload.avatarUrl;
    state.role = action.payload.role;
  })
})

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
