import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import AppRouter from "./router/AppRouter";
import ErrorBoundary from "@/shared/components/common/ErrorBoundary";
import StudentProfile from "@/pages/student/Profile/Profile";
import AdminDashboard from "@/pages/admin/Dashboard/Dashboard";

const App = () => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
