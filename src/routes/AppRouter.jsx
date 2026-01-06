import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import PropertiesPage from "../features/properties/PropertiesPage";
import PropertyDetailsPage from "../features/properties/PropertyDetailsPage";
import Footer from "../components/layout/Footer/Footer";
import AddProperty from "../features/properties/pages/AddProperty";
import RegisterForm from "../features/auth/components/RegisterForm";
import LoginForm from "../features/auth/components/LoginForm";
import VerifiedProperties from "../features/properties/VerifiedProperties";
import Support from "../pages/Contact/Support";
import PremiumListings from "../features/properties/PremiumListings";
import Areaexperts from "../pages/Contact/Areaexperts";
import FlexibleViewings from "../pages/Contact/FlexibleViewings";
import Insights from "../pages/OwnerVerification/Insights";
import Articles from "../pages/Articlesandnews/Articles";
import News from "../pages/Articlesandnews/News";
import OwnerDashboard from "../features/owner/OwnerDashboard";
import Header from "../components/layout/Header/Header";
import OwnerProperties from "../features/owner/OwnerProperties";
import OTPVerification from "../features/auth/components/OTPVerification";
import AddPayment from "../features/owner/AddPayment";

// Layout Components
const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

const OwnerLayout = ({ children }) => {
  // Owner layout doesn't have main header/footer
  return <>{children}</>;
};

const AuthLayout = ({ children }) => {
  // Auth layout - no header, no footer
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes with Main Layout (Header + Footer) */}
      <Route
        path="/"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />

      <Route
        path="/articles"
        element={
          <MainLayout>
            <Articles />
          </MainLayout>
        }
      />

      <Route
        path="/news"
        element={
          <MainLayout>
            <News />
          </MainLayout>
        }
      />

      <Route
        path="/properties"
        element={
          <MainLayout>
            <PropertiesPage />
          </MainLayout>
        }
      />

      <Route
        path="/properties/:id"
        element={
          <MainLayout>
            <PropertyDetailsPage />
          </MainLayout>
        }
      />

      <Route
        path="/services/verified-properties"
        element={
          <MainLayout>
            <VerifiedProperties />
          </MainLayout>
        }
      />

      <Route
        path="/services/24/7-support"
        element={
          <MainLayout>
            <Support />
          </MainLayout>
        }
      />

      <Route
        path="/services/premium-listings"
        element={
          <MainLayout>
            <PremiumListings />
          </MainLayout>
        }
      />

      <Route
        path="/services/area-experts"
        element={
          <MainLayout>
            <Areaexperts />
          </MainLayout>
        }
      />

      <Route
        path="/services/flexible-viewings"
        element={
          <MainLayout>
            <FlexibleViewings />
          </MainLayout>
        }
      />

      <Route
        path="/addownerproperty"
        element={
          <MainLayout>
            <AddProperty />
          </MainLayout>
        }
      />

      <Route
        path="/owner/insights"
        element={
          <MainLayout>
            <Insights />
          </MainLayout>
        }
      />

      {/* Auth Routes - NO Header/Footer */}
      <Route
        path="/register"
        element={
          <AuthLayout>
            <RegisterForm />
          </AuthLayout>
        }
      />

      <Route
        path="/login"
        element={
          <AuthLayout>
            <LoginForm />
          </AuthLayout>
        }
      />

      <Route
        path="/otp-verification"
        element={
          <AuthLayout>
            <OTPVerification />
          </AuthLayout>
        }
      />

      {/* Owner Dashboard Routes - NO Header/Footer */}
      <Route
        path="/owner/dashboard_section"
        element={
          <OwnerLayout>
            <OwnerDashboard />
          </OwnerLayout>
        }
      />
      <Route
        path="/owner/ownerproperties_section"
        element={
          <OwnerLayout>
            <OwnerProperties />
          </OwnerLayout>
        }
      />

      <Route
        path="/owner/add-payment"
        element={
          <OwnerLayout>
            <AddPayment />
          </OwnerLayout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
