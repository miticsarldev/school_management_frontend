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
import DashboardAdmin from "./components/DashboardAdmin/DashboardAdmin";
import DashboardEnseignant from "./components/DashboardEnseignant";
import DashboardEtudiant from "./components/DashboardEtudiant";
import CompanyPage from "./components/CompanyPageSass/CompanyPage";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/style/css/feather.css';
import '../src/index.scss';
import '../src/style/icon/boxicons/boxicons/css/boxicons.min.css';
import '../src/style/icon/weather/weathericons.css';
import '../src/style/icon/typicons/typicons.css';
import '../src/style/icon/fontawesome/css/fontawesome.min.css';
import '../src/style/icon/fontawesome/css/all.min.css';
import '../src/style/icon/ionic/ionicons.css';
import '../src/style/icon/tabler-icons/webfont/tabler-icons.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";



function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route element={<PublicRoute />}>
              <Route path="/" element={<PublicPage />} />
              <Route path="/sass-example" element={<CompanyPage />} />
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
                <Route
                  path="/dashboard/admin"
                  element={
                    <RequireAuth>
                      <DashboardAdmin />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/dashboard/enseignant"
                  element={
                    <RequireAuth>
                      <DashboardEnseignant />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/dashboard/etudiant"
                  element={
                    <RequireAuth>
                      <DashboardEtudiant />
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
