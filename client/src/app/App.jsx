import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import AppRouter from "./router/AppRouter";
import ErrorBoundary from "@/shared/components/common/ErrorBoundary";

const App = () => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <BrowserRouter>
          <AppRouter />
          <p>Hello DK</p>
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;

