import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import "./app/globals.css";
import { store } from "@/redux/store";
import Layout from "@/components/Layout";
import LoginPage from "@/components/LoginPage";
import RequireAuth from "@/components/RequireAuth";
import PersistLogin from "@/components/PersistLogin";
import UsersManagement from "@/components/UsersManagement";
import PublicPage from "@/components/PublicPage";
import MainLayout from "@/components/MainLayout";
import PublicRoute from "@/components/PublicRoute";
import Dashboard from "@/components/Dashboard";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route element={<PublicRoute />}>
              <Route path="/" element={<PublicPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Route>
            <Route element={<PersistLogin />}>
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <MainLayout />
                  </RequireAuth>
                }
              >
                <Route
                  index
                  element={
                    <RequireAuth>
                      <Dashboard />
                    </RequireAuth>
                  }
                />
                {/* To be filled out one by one */}
                <Route
                  path="/dashboard/users"
                  element={
                    <RequireAuth>
                      <UsersManagement />
                    </RequireAuth>
                  }
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
