import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { combineReducers, createStore } from "redux";
import userReducer from "./user";
import thunk from "redux-thunk";

const reducer = combineReducers({
  user: userReducer,
});

const store = createStore(reducer, {});

export default store;
