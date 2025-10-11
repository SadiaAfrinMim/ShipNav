import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd"; // Import ConfigProvider
import "./index.css";
import App from "./App.jsx";
import BookingForm from "./pages/BookingForm.jsx";
import MindBlowingNavbar from "./components/navbar.jsx";
import Login from "./pages/Login.jsx";
import BookingImportGlassForm from "./components/BookingFromInputField.jsx";
import Dashboard from "./components/ExportFolderDetails/DashBoard.jsx";

import StuffingPlanList from "./components/ExportFolderDetails/StuffingPlanList/StuffingPlanList.jsx";

import CargoExportLayout from "./components/ExportFolderDetails/CargoReceiveList/Layout/CargoExportLayout.jsx";
import CargoEXportAddCargo from "./components/ExportFolderDetails/CargoReceiveList/Layout/CargoEXportAddCargo.jsx";



import BookingExportLayout from "./components/ExportFolderDetails/BookingList/Layout/BookingExportLayout.jsx";
import ShippingEXportAddShippingOrder from "./components/ExportFolderDetails/ShippingOrderList/Layout/ShippingEXportAddShippingOrder.jsx";
import ShippingExportLayout from "./components/ExportFolderDetails/ShippingOrderList/Layout/ShippingExportLayout.jsx";
import StuffingExportLayout from "./components/ExportFolderDetails/StuffingPlanList/Layout/StuffingExportLayout.jsx";
import AddStuffingPlanFromLayout from "./components/ExportFolderDetails/StuffingPlanList/Layout/AddStuffingPlanFromLayout.jsx";

import AddStuffingPackageLayout from "./components/ExportFolderDetails/StuffingPackageList/Layout/StuffingPackageLayout.jsx";

import StuffingPackageLayout from "./components/ExportFolderDetails/StuffingPackageList/Layout/StuffingPackageLayout.jsx";
import ExportSeaShipmentAdviceLayout from "./components/ExportFolderDetails/ExportSeaShipmentAdvice/Layout/ExportSeaShipmentAdviceLayout.jsx";
import ShipmentAdviceFormLayout from "./components/ExportFolderDetails/ExportSeaShipmentAdvice/Layout/ShipmentAdviceFormLayout .jsx";
import BillOfLadingExportLayout from "./components/ExportFolderDetails/BillOfLadingExport/Layout/BillOfLadingExportLayout.jsx";
import BillOfLadingExportFrom from "./components/ExportFolderDetails/BillOfLadingExport/Layout/BillOfLadingExportFrom.jsx";
import LegMasterBillList from "./components/ExportFolderDetails/LegMasterBillList/LegMasterBillList.jsx";
import LegMasterBillListLayout from "./components/ExportFolderDetails/LegMasterBillList/Layout/LegMasterBillListLayout.jsx";
import AddFirstLegMasterBill from "./components/ExportFolderDetails/LegMasterBillList/AddFirstLegMasterBill.jsx";
import AddFirstLegMasterBillLayout from "./components/ExportFolderDetails/LegMasterBillList/Layout/AddFirstLegMasterBillLayout.jsx";


const Layout = ({ children }) => {
  return (
    <div>
      <MindBlowingNavbar />
      {children}
    </div>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Routes with navbar */}
        <Route
          path="/"
          element={
            <Layout>
              {/* <BookingImportGlassForm /> */}
              <Dashboard></Dashboard>
            </Layout>
          }
        />
        <Route
          path="/booking"
          element={
            <Layout>
              <BookingImportGlassForm />
              {/* <BookingForm /> */}
            </Layout>
          }
        />
        <Route
          path="/export-sea/booking"
          element={
            <Layout>
              <BookingExportLayout></BookingExportLayout>
            </Layout>
          }
        />
        <Route
          path="/export-sea/shipping-order"
          element={
            <Layout>
              <ShippingExportLayout></ShippingExportLayout>
            </Layout>
          }
        />
        <Route
          path="/export-sea/add-shipping-order"
          element={
            <Layout>
              <ShippingEXportAddShippingOrder></ShippingEXportAddShippingOrder>
            </Layout>
          }
        />
        <Route
          path="/export-sea/cargo-receive"
          element={
            <Layout>
              <CargoExportLayout></CargoExportLayout>
            </Layout>
          }
        />


        <Route
          path="/export-sea/add-cargo-receive"
          element={
            <Layout>
              <CargoEXportAddCargo></CargoEXportAddCargo>
            </Layout>
          }
        />
        <Route
          path="/export-sea/stuffing-plan"
          element={
            <Layout>
              <StuffingExportLayout></StuffingExportLayout>
            </Layout>
          }
        />
        <Route
          path="/export-sea/add-stuffing-plan"
          element={
            <Layout>
              <AddStuffingPlanFromLayout></AddStuffingPlanFromLayout>
            </Layout>
          }
        />
         <Route
          path="/export-sea/stuffing-package"
          element={
            <Layout>
             <StuffingPackageLayout></StuffingPackageLayout>
            </Layout>
          }
        />
         <Route
          path="/export-sea/add-stuffing-package"
          element={
            <Layout>
              <AddStuffingPackageLayout></AddStuffingPackageLayout>
            </Layout>
          }
        />
        <Route
          path="/export-sea/shipment-advice"
          element={
            <Layout>
              <ExportSeaShipmentAdviceLayout></ExportSeaShipmentAdviceLayout>
            </Layout>
          }
        />

         <Route
          path="/export-sea/add-shipment-advice"
          element={
            <Layout>
              <ShipmentAdviceFormLayout></ShipmentAdviceFormLayout>
            </Layout>
          }
        />

         <Route
          path="/export-sea/hbl"
          element={
            <Layout>
              <BillOfLadingExportLayout></BillOfLadingExportLayout>
            </Layout>
          }
        />
        <Route
          path="/export-sea/add-hbl"
          element={
            <Layout>
             <BillOfLadingExportFrom></BillOfLadingExportFrom>
            </Layout>
          }
        />
        <Route
          path="/export-sea/mbl"
          element={
            <Layout>
             <LegMasterBillListLayout></LegMasterBillListLayout>
            </Layout>
          }
        />
         <Route
          path="/export-sea/add-mbl"
          element={
            <Layout>
             <AddFirstLegMasterBillLayout></AddFirstLegMasterBillLayout>
            </Layout>
          }
        />


        <Route
          path="/dashboard"
          element={
            <Layout>
              <App />
            </Layout>
          }
        />

        {/* Route without navbar (login page) */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);