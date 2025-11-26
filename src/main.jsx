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
import LegMasterBillList from "./components/ExportFolderDetails/SharedAllListFrom/SharedList/LegMasterBillList.jsx";
import LegMasterBillListLayout from "./components/ExportFolderDetails/LegMasterBillList/Layout/LegMasterBillListLayout.jsx";
import AddFirstLegMasterBill from "./components/ExportFolderDetails/SharedAllListFrom/SharedFrom/AddFirstLegMasterBill.jsx";
import AddFirstLegMasterBillLayout from "./components/ExportFolderDetails/LegMasterBillList/Layout/AddFirstLegMasterBillLayout.jsx";
import FreightInvoiceListLayout from "./components/ExportFolderDetails/FreightInvoiceList/Layout/FreightInvoiceListLayout.jsx";
import AddDebitNoteLayout from "./components/ExportFolderDetails/DebitNoteList/Layout/AddDebitNoteLayout.jsx";
import DebitNoteListLayout from "./components/ExportFolderDetails/DebitNoteList/Layout/DebitNoteListLayout.jsx";
import AddFreightInvoiceLayout from "./components/ExportFolderDetails/FreightInvoiceList/Layout/AddFreightInvoiceLayout.jsx";
import AddFreightInvoice from "./components/ExportFolderDetails/FreightInvoiceList/AddFreightInvoiceFrom.jsx";
import AddDebitNote from "./components/ExportFolderDetails/SharedAllListFrom/SharedFrom/AddDebitNote.jsx";
import CreditNoteListLayout from "./components/ExportFolderDetails/CreditNoteList/Layout/CreditNoteListLayout.jsx";
import AddCreditNoteListLayout from "./components/ExportFolderDetails/CreditNoteList/Layout/AddCreditNoteListLayout.jsx";
import PLExpSea from "./components/ExportFolderDetails/PLExpSea/PLExpSea.jsx";
import VolumeStatementExpSea from "./components/ExportFolderDetails/VolumeStatementExpSea/VolumeStatementExpSea.jsx";
import ExportSeaBookingLayout from "./components/ExportSeaFolderDetails/ExportSeaBooking/Layout/ExportSeaBookingLayout.jsx";
import ExportSeaAddBooking from "./components/ExportSeaFolderDetails/ExportSeaBooking/Layout/ExportSeaAddBooking.jsx";
import ShippingExportAirLayout from "./components/ExportSeaFolderDetails/ExportSeaShipping/Layout/ShippingExportAirLayout.jsx";
import ShippingEXportAirAddShippingOrder from "./components/ExportSeaFolderDetails/ExportSeaShipping/Layout/ShippingEXportAirAddShippingOrder.jsx";
import ExportAirCargoLayout from "./components/ExportSeaFolderDetails/ExportAirCargo/Layout/ExportAirCargoLayout.jsx";
import ExportAirCargoAddLayout from "./components/ExportSeaFolderDetails/ExportAirCargo/Layout/ExportAirCargoAddLayout.jsx";
import ExportAirMasterListLayout from "./components/ExportSeaFolderDetails/ExportAirMasterBill/Layout/ExportAirMasterListLayout.jsx";
import ExportAirMasterAddBillLayout from "./components/ExportSeaFolderDetails/ExportAirMasterBill/Layout/ExportAirMasterAddBillLayout.jsx";
import ExportAirAddFreightInvoiceLayout from "./components/ExportSeaFolderDetails/FreightInvoiceList/Layout/ExportAirAddFreightInvoiceLayout.jsx";
import ArrivalNoticeListLayout from "./components/ExportSeaFolderDetails/ArrivalNoticeList/Layout/ArrivalNoticeListLayout.jsx";
import AddArrivalNoticeLayout from "./components/ExportSeaFolderDetails/ArrivalNoticeList/Layout/AddArrivalNoticeLayout.jsx";
import ForwardLetterListLayout from "./components/ExportSeaFolderDetails/ForwardLetterList/Layout/ForwardLetterListLayout.jsx";
import AddForwardLetterLayout from "./components/ExportSeaFolderDetails/ForwardLetterList/Layout/AddForwardLetterLayout.jsx";
import PaymentVoucherForm from "./components/SharedAllListFrom/SharedFrom/Accounts/PaymentVoucherFormAccount.jsx";
import AccountLayout from "./components/AccoutLayout/AccountLayout.jsx";
import ReceiveVoucherListLayout from "./components/AccoutLayout/ReceiveVoucherListLayout.jsx";
import OrderLayout from "./components/Orders/OrderLayout.jsx";
import ReceiveVoucherFormLayout from "./components/Orders/ReceiveVoucherFormLayout.jsx";
import EssentialLayout from "./components/Essential/EssentialLayout.jsx";
import BankStatementLayout from "./components/Reports/BankStatementLayout.jsx";
import ExpenditureSummaryFilterLayout from "./components/Reports/ExpenditureSummaryFilterLayout.jsx";
import JournalListFilterLayout from "./components/Reports/JournalListFilterLayout.jsx";
import BalanceSheetLayout from "./components/Reports/BalanceSheetLayout.jsx";
import StockReorderPageLayout from "./components/Reports/StockReorderPageLayout.jsx";
import PartyLedgerPageLayout from "./components/Reports/PartyLedgerPageLayout.jsx";
import SalesPurchaseDetailsPageLayout from "./components/Reports/SalesPurchaseDetailsPageLayout.jsx";
import SalesPurchaseSummaryPageLayout from "./components/Reports/SalesPurchaseSummaryPageLayout.jsx";
import ProductWiseSalePageLayout from "./components/SharedAllListFrom/Reports/ProductWiseSalePageLayout.jsx";
import CreditNotePageLayout from "./components/Reports/CreditNotePageLayout.jsx";
import CnfProfitLossImpSeaPage from "./components/ExportFolderDetails/CnfProfitLossImpSeaPage.jsx/CnfProfitLossImpSeaPage.jsx";
import CnfVolumeStatementImpSeaPage from "./components/ExportFolderDetails/CnfVolumeStatementImpSeaPage/CnfVolumeStatementImpSeaPage.jsx";
import BusinessListLayout from "./components/Admin/BusinessListLayout.jsx";
import GeneralLedgerSetup from "./components/Admin/GeneralLedgerSetup.jsx";
import RecalculationList from "./components/SharedAllListFrom/SharedList/RecalculationList.jsx";
import RecalculationListLayout from "./components/Admin/RecalculationListLayout.jsx";
import HeaderListLayout from "./components/Admin/HeaderListLayout.jsx";
import SystemPrefixListLayout from "./components/Admin/SystemPrefixListLayout.jsx";
import UserListLayout from "./components/Admin/UserListLayout.jsx";
import GroupListLayout from "./components/Admin/GroupListLayout.jsx";
import LogList from "./components/SharedAllListFrom/SharedList/LogList.jsx";
import ShipperParty from "./components/settings/Party/ShipperParty.jsx";
import ProductListLayout from "./components/settings/inventory/ProductListLayout.jsx";
import GhAgentListLayout from "./components/settings/GhAgentListLayout.jsx";
import ContainerListLayout from "./components/settings/ContainerListLayout.jsx";
import MAWBListLayout from "./components/settings/MAWBListLayout.jsx";
import PortListLayout from "./components/settings/PortListLayout.jsx";
import AddCurrencyListLayout from "./components/settings/AddCurrencyListLayout.jsx";
import CountryListLayout from "./components/settings/CountryListLayout.jsx";



const Layout = ({ children }) => {
  return (
    <div >
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
          path="/export-sea/add-booking"
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
          path="/export-sea/freight-invoice"
          element={
            <Layout>
              <FreightInvoiceListLayout></FreightInvoiceListLayout>
            </Layout>
          }
        />
        <Route
          path="/export-sea/add-freight-invoice"
          element={
            <Layout>
              <AddFreightInvoiceLayout></AddFreightInvoiceLayout>
            </Layout>
          }
        />
        <Route
          path="/export-sea/add-freight-invoice"
          element={
            <Layout>
              <AddDebitNoteLayout></AddDebitNoteLayout>
            </Layout>
          }
        />
        <Route
          path="/export-sea/debit-note"
          element={
            <Layout>
              <DebitNoteListLayout></DebitNoteListLayout>
            </Layout>
          }
        />
        <Route
          path="/export-sea/add-debit-note"
          element={
            <Layout>
              <AddDebitNoteLayout></AddDebitNoteLayout>
            </Layout>
          }
        />
        <Route
          path="/export-sea/credit-note"
          element={
            <Layout>
              <CreditNoteListLayout></CreditNoteListLayout>
            </Layout>
          }
        />
        <Route
          path="/export-sea/add-credit-note"
          element={
            <Layout>
              <AddCreditNoteListLayout></AddCreditNoteListLayout>
            </Layout>
          }
        />
        <Route
          path="/export-sea/expense-bill"
          element={
            <Layout>
              <CreditNoteListLayout></CreditNoteListLayout>
            </Layout>
          }
        />
        <Route
          path="/export-sea/add-expense-bill"
          element={
            <Layout>
              <AddCreditNoteListLayout></AddCreditNoteListLayout>
            </Layout>
          }
        />
        <Route
          path="/export-sea/report/profit-loss"
          element={
            <Layout>
              <PLExpSea></PLExpSea>
            </Layout>
          }
        />
        <Route
          path="/export-sea/report/volume"
          element={
            <Layout>
              <VolumeStatementExpSea></VolumeStatementExpSea>
            </Layout>
          }
        />

        {/* export Air */}
        <Route
          path="/export-air/booking"
          element={
            <Layout>
              <ExportSeaBookingLayout></ExportSeaBookingLayout>
            </Layout>
          }
        />
        <Route
          path="/export-air/add-booking"
          element={
            <Layout>
              <ExportSeaAddBooking></ExportSeaAddBooking>
            </Layout>
          }
        />
        <Route
          path="/export-air/shipping-order"
          element={
            <Layout>
              <ShippingExportAirLayout></ShippingExportAirLayout>
            </Layout>
          }
        />
        <Route
          path="/export-air/add-shipping-order"
          element={
            <Layout>
              <ShippingEXportAirAddShippingOrder></ShippingEXportAirAddShippingOrder>
            </Layout>
          }
        />

        <Route
          path="/export-air/cargo-receive"
          element={
            <Layout>
              <ExportAirCargoLayout></ExportAirCargoLayout>
            </Layout>
          }
        />
        <Route
          path="/export-air/add-cargo-receive"
          element={
            <Layout>
              <ExportAirCargoAddLayout></ExportAirCargoAddLayout>
            </Layout>
          }
        />
        <Route
          path="/export-air/mawb"
          element={
            <Layout>
              <ExportAirMasterListLayout></ExportAirMasterListLayout>
            </Layout>
          }
        />
        <Route
          path="/export-air/add-mawb"
          element={
            <Layout>
              <ExportAirMasterAddBillLayout></ExportAirMasterAddBillLayout>
            </Layout>
          }
        />

        <Route
          path="/export-air/freight-invoice"
          element={
            <Layout>
              <FreightInvoiceListLayout></FreightInvoiceListLayout>
            </Layout>
          }
        />



        <Route
          path="/export-air/add-freight-invoice"
          element={
            <Layout>
              <ExportAirAddFreightInvoiceLayout></ExportAirAddFreightInvoiceLayout>
            </Layout>
          }
        />
        <Route
          path="/export-air/debit-note"
          element={
            <Layout>
              <DebitNoteListLayout></DebitNoteListLayout>
            </Layout>
          }
        />
        <Route
          path="/export-air/add-debit-note"
          element={
            <Layout>
              <AddDebitNoteLayout></AddDebitNoteLayout>
            </Layout>
          }
        />

        <Route
          path="/export-air/credit-note"
          element={
            <Layout>
              <CreditNoteListLayout></CreditNoteListLayout>
            </Layout>
          }
        />
        <Route
          path="/export-air/expense-bill"
          element={
            <Layout>
              <CreditNoteListLayout></CreditNoteListLayout>
            </Layout>
          }
        />
        <Route
          path="/export-air/add-expense-bill"
          element={
            <Layout>
              <AddCreditNoteListLayout></AddCreditNoteListLayout>
            </Layout>
          }
        />
         <Route
          path="/export-air/add-credit-note"
          element={
            <Layout>
              <AddCreditNoteListLayout></AddCreditNoteListLayout>
            </Layout>
          }
        />
        <Route
          path="/export-air/report/profit-loss"
          element={
            <Layout>
              <PLExpSea></PLExpSea>
            </Layout>
          }
        />
        <Route
          path="/export-air/report/volume"
          element={
            <Layout>
              <VolumeStatementExpSea></VolumeStatementExpSea>
            </Layout>
          }
        />

        {/* import Sea */}

        <Route
          path="/import-sea/booking"
          element={
            <Layout>
              <ExportSeaBookingLayout></ExportSeaBookingLayout>
            </Layout>
          }
        />
        <Route
          path="/import-sea/add-booking"
          element={
            <Layout>
              <BookingImportGlassForm />
              {/* <BookingForm /> */}
            </Layout>
          }
        />
        <Route
          path="/import-sea/master-bl"
          element={
            <Layout>
              <LegMasterBillListLayout></LegMasterBillListLayout>
            </Layout>
          }
        />
        <Route
          path="/import-sea/add-master-bl"
          element={
            <Layout>
              <AddFirstLegMasterBillLayout></AddFirstLegMasterBillLayout>
            </Layout>
          }
        />
        <Route
          path="/import-sea/arrival-notice"
          element={
            <Layout>
              <ArrivalNoticeListLayout></ArrivalNoticeListLayout>
            </Layout>
          }
        />
        <Route
          path="/import-sea/add-arrival-notice"
          element={
            <Layout>
              <AddArrivalNoticeLayout></AddArrivalNoticeLayout>
            </Layout>
          }
        />
        <Route
          path="/import-sea/forward-letter"
          element={
            <Layout>
              <ForwardLetterListLayout></ForwardLetterListLayout>
            </Layout>
          }
        />
        <Route
          path="/import-sea/add-forward-letter"
          element={
            <Layout>
              <AddForwardLetterLayout></AddForwardLetterLayout>
            </Layout>
          }
        />




        <Route
          path="/import-sea/add-credit-note"
          element={
            <Layout>
              <AddCreditNoteListLayout></AddCreditNoteListLayout>
            </Layout>
          }
        />




        <Route
          path="/import-sea/freight-invoice"
          element={
            <Layout>
              <FreightInvoiceListLayout></FreightInvoiceListLayout>
            </Layout>
          }
        />



        <Route
          path="/import-sea/add-freight-invoice"
          element={
            <Layout>
              <ExportAirAddFreightInvoiceLayout></ExportAirAddFreightInvoiceLayout>
            </Layout>
          }
        />
        <Route
          path="/import-sea/debit-note"
          element={
            <Layout>
              <DebitNoteListLayout></DebitNoteListLayout>
            </Layout>
          }
        />
        <Route
          path="/import-sea/add-debit-note"
          element={
            <Layout>
              <AddDebitNoteLayout></AddDebitNoteLayout>
            </Layout>
          }
        />

        <Route
          path="/import-sea/credit-note"
          element={
            <Layout>
              <CreditNoteListLayout></CreditNoteListLayout>
            </Layout>
          }
        />
        <Route
          path="/import-sea/add-credit-note"
          element={
            <Layout>
              <AddCreditNoteListLayout></AddCreditNoteListLayout>
            </Layout>
          }
        />
        <Route
          path="/import-sea/expense-bill"
          element={
            <Layout>
              <CreditNoteListLayout></CreditNoteListLayout>
            </Layout>
          }
        />
        <Route
          path="/import-sea/add-expense-bill"
          element={
            <Layout>
              <AddCreditNoteListLayout></AddCreditNoteListLayout>
            </Layout>
          }
        />
        <Route
          path="/import-sea/report/profit-loss"
          element={
            <Layout>
              <CnfProfitLossImpSeaPage></CnfProfitLossImpSeaPage>
            </Layout>
          }
        />
        <Route
          path="/import-sea/report/volume"
          element={
            <Layout>
              <CnfVolumeStatementImpSeaPage></CnfVolumeStatementImpSeaPage>
            </Layout>
          }
        />


        {/* import air */}

        <Route
          path="/import-air/booking"
          element={
            <Layout>
              <ExportSeaBookingLayout></ExportSeaBookingLayout>
            </Layout>
          }
        />
        <Route
          path="/import-air/add-booking"
          element={
            <Layout>
              <BookingImportGlassForm />
              {/* <BookingForm /> */}
            </Layout>
          }
        />
        <Route
          path="/import-air/master-bl"
          element={
            <Layout>
              <LegMasterBillListLayout></LegMasterBillListLayout>
            </Layout>
          }
        />
        <Route
          path="/import-air/add-master-bl"
          element={
            <Layout>
              <AddFirstLegMasterBillLayout></AddFirstLegMasterBillLayout>
            </Layout>
          }
        />
        <Route
          path="/import-air/arrival-notice"
          element={
            <Layout>
              <ArrivalNoticeListLayout></ArrivalNoticeListLayout>
            </Layout>
          }
        />
        <Route
          path="/import-air/add-arrival-notice"
          element={
            <Layout>
              <AddArrivalNoticeLayout></AddArrivalNoticeLayout>
            </Layout>
          }
        />
        <Route
          path="/import-air/forward-letter"
          element={
            <Layout>
              <ForwardLetterListLayout></ForwardLetterListLayout>
            </Layout>
          }
        />
        <Route
          path="/import-air/add-forward-letter"
          element={
            <Layout>
              <AddForwardLetterLayout></AddForwardLetterLayout>
            </Layout>
          }
        />




        <Route
          path="/import-air/add-credit-note"
          element={
            <Layout>
              <AddCreditNoteListLayout></AddCreditNoteListLayout>
            </Layout>
          }
        />




        <Route
          path="/import-air/freight-invoice"
          element={
            <Layout>
              <FreightInvoiceListLayout></FreightInvoiceListLayout>
            </Layout>
          }
        />



        <Route
          path="/import-air/add-freight-invoice"
          element={
            <Layout>
              <ExportAirAddFreightInvoiceLayout></ExportAirAddFreightInvoiceLayout>
            </Layout>
          }
        />
        <Route
          path="/import-air/debit-note"
          element={
            <Layout>
              <DebitNoteListLayout></DebitNoteListLayout>
            </Layout>
          }
        />
        <Route
          path="/import-air/add-debit-note"
          element={
            <Layout>
              <AddDebitNoteLayout></AddDebitNoteLayout>
            </Layout>
          }
        />

        <Route
          path="/import-air/credit-note"
          element={
            <Layout>
              <CreditNoteListLayout></CreditNoteListLayout>
            </Layout>
          }
        />
        <Route
          path="/import-air/add-credit-note"
          element={
            <Layout>
              <AddCreditNoteListLayout></AddCreditNoteListLayout>
            </Layout>
          }
        />
        <Route
          path="/import-air/expense-bill"
          element={
            <Layout>
              <CreditNoteListLayout></CreditNoteListLayout>
            </Layout>
          }
        />
        <Route
          path="/import-air/add-expense-bill"
          element={
            <Layout>
              <AddCreditNoteListLayout></AddCreditNoteListLayout>
            </Layout>
          }
        />
        <Route
          path="/import-air/report/profit-loss"
          element={
            <Layout>
              <CnfProfitLossImpSeaPage></CnfProfitLossImpSeaPage>
            </Layout>
          }
        />
        <Route
          path="/import-air/report/volume"
          element={
            <Layout>
              <CnfVolumeStatementImpSeaPage></CnfVolumeStatementImpSeaPage>
            </Layout>
          }
        />
        <Route
          path="/accounts/receive-voucher"
          element={
            <Layout>
              <ReceiveVoucherListLayout></ReceiveVoucherListLayout>
            </Layout>
          }
        />

        <Route
          path="/accounts/receive-voucher"
          element={
            <Layout>
              <ReceiveVoucherListLayout></ReceiveVoucherListLayout>
            </Layout>
          }
        />
        <Route
          path="/accounts/receive-journal"
          element={
            <Layout>
              <ReceiveVoucherListLayout></ReceiveVoucherListLayout>
            </Layout>
          }
        />

        <Route
          path="/accounts/add-receive-journal"
          element={
            <Layout>
              <AccountLayout></AccountLayout>
            </Layout>
          }
        />

        <Route
          path="/accounts/payment-voucher"
          element={
            <Layout>
              <ReceiveVoucherListLayout></ReceiveVoucherListLayout>
            </Layout>
          }
        />

        <Route
          path="/accounts/add-payment-voucher"
          element={
            <Layout>
              <AccountLayout></AccountLayout>
            </Layout>
          }
        />

        <Route
          path="/accounts/payment-journal"
          element={
            <Layout>
              <ReceiveVoucherListLayout></ReceiveVoucherListLayout>
            </Layout>
          }
        />

        <Route
          path="/accounts/add-payment-journal"
          element={
            <Layout>
              <AccountLayout></AccountLayout>
            </Layout>
          }
        />
        <Route
          path="/accounts/journal-voucher"
          element={
            <Layout>
              <ReceiveVoucherListLayout></ReceiveVoucherListLayout>
            </Layout>
          }
        />

        <Route
          path="/accounts/add-journal-voucher"
          element={
            <Layout>
              <AccountLayout></AccountLayout>
            </Layout>
          }
        />
        <Route
          path="/accounts/contra-voucher"
          element={
            <Layout>
              <ReceiveVoucherListLayout></ReceiveVoucherListLayout>
            </Layout>
          }
        />

        <Route
          path="/accounts/add-contra-voucher"
          element={
            <Layout>
              <AccountLayout></AccountLayout>
            </Layout>
          }
        />
        <Route
          path="/accounts/customer-receipt"
          element={
            <Layout>
              <ReceiveVoucherListLayout></ReceiveVoucherListLayout>
            </Layout>
          }
        />

        <Route
          path="/accounts/add-customer-receipt"
          element={
            <Layout>
              <AccountLayout></AccountLayout>
            </Layout>
          }
        />

        <Route
          path="/accounts/supplier-payment"
          element={
            <Layout>
              <ReceiveVoucherListLayout></ReceiveVoucherListLayout>
            </Layout>
          }
        />

        <Route
          path="/accounts/add-supplier-payment"
          element={
            <Layout>
              <AccountLayout></AccountLayout>
            </Layout>
          }
        />
        <Route
          path="/orders/sale-order"
          element={
            <Layout>
              <OrderLayout></OrderLayout>
            </Layout>
          }
        />
        <Route
          path="/orders/add-sale-order"
          element={
            <Layout>
              <ReceiveVoucherFormLayout></ReceiveVoucherFormLayout>
            </Layout>
          }
        />


        <Route
          path="/orders/sale-return"
          element={
            <Layout>
              <OrderLayout></OrderLayout>
            </Layout>
          }
        />
        <Route
          path="/orders/add-sale-return"
          element={
            <Layout>
              <ReceiveVoucherFormLayout></ReceiveVoucherFormLayout>
            </Layout>
          }
        />

        <Route
          path="/orders/purchase-order"
          element={
            <Layout>
              <OrderLayout></OrderLayout>
            </Layout>
          }
        />
        <Route
          path="/orders/add-purchase-order"
          element={
            <Layout>
              <ReceiveVoucherFormLayout></ReceiveVoucherFormLayout>
            </Layout>
          }
        />

        <Route
          path="/orders/purchase-return"
          element={
            <Layout>
              <OrderLayout></OrderLayout>
            </Layout>
          }
        />
        <Route
          path="/orders/add-purchase-return"
          element={
            <Layout>
              <ReceiveVoucherFormLayout></ReceiveVoucherFormLayout>
            </Layout>
          }
        />

        <Route
          path="/orders/adjustments"
          element={
            <Layout>
              <OrderLayout></OrderLayout>
            </Layout>
          }
        />
        <Route
          path="/orders/add-adjustments"
          element={
            <Layout>
              <ReceiveVoucherFormLayout></ReceiveVoucherFormLayout>
            </Layout>
          }
        />

        <Route
          path="/essential/masters"
          element={
            <Layout>
              <EssentialLayout></EssentialLayout>
            </Layout>
          }
        />

        <Route
          path="reports/fin/bank-statement"
          element={
            <Layout>
              <BankStatementLayout></BankStatementLayout>
            </Layout>
          }
        />

        <Route
          path="/reports/fin/general-ledger"
          element={
            <Layout>
              <BankStatementLayout></BankStatementLayout>
            </Layout>
          }
        />


        <Route
          path="/reports/fin/exp-summary"
          element={
            <Layout>
              <ExpenditureSummaryFilterLayout></ExpenditureSummaryFilterLayout>
            </Layout>
          }
        />

        <Route
          path="/reports/fin/journal-list"
          element={
            <Layout>
              <JournalListFilterLayout></JournalListFilterLayout>
            </Layout>
          }
        />

        <Route
          path="/reports/fin/trial-balance"
          element={
            <Layout>
              <JournalListFilterLayout></JournalListFilterLayout>
            </Layout>
          }
        />

        <Route
          path="/reports/fin/profit-loss"
          element={
            <Layout>
              <JournalListFilterLayout></JournalListFilterLayout>
            </Layout>
          }
        />

        <Route
          path="/reports/fin/balance-sheet"
          element={
            <Layout>
              <BalanceSheetLayout></BalanceSheetLayout>
            </Layout>
          }
        />
        <Route
          path="/reports/inv/stock-balance"
          element={
            <Layout>
              <JournalListFilterLayout></JournalListFilterLayout>
            </Layout>
          }
        />

        <Route
          path="/reports/inv/product-ledger"
          element={
            <Layout>
              <BankStatementLayout></BankStatementLayout>
            </Layout>
          }
        />

        <Route
          path="/reports/inv/product-pl"
          element={
            <Layout>
              <BankStatementLayout></BankStatementLayout>
            </Layout>
          }
        />
        <Route
          path="/reports/inv/adj-register"
          element={
            <Layout>
              <BankStatementLayout></BankStatementLayout>
            </Layout>
          }
        />

        <Route
          path="/reports/inv/reorder"
          element={
            <Layout>
              <StockReorderPageLayout></StockReorderPageLayout>
            </Layout>
          }
        />

        <Route
          path="/reports/party/ledger"
          element={
            <Layout>
              <PartyLedgerPageLayout></PartyLedgerPageLayout>
            </Layout>
          }
        />

        {/* party */}

        <Route
          path="/reports/party/ledger"
          element={
            <Layout>
              <PartyLedgerPageLayout></PartyLedgerPageLayout>
            </Layout>
          }
        />
        <Route
          path="/reports/party/order"
          element={
            <Layout>
              <PartyLedgerPageLayout></PartyLedgerPageLayout>
            </Layout>
          }
        />

        <Route
          path="/reports/party/balance"
          element={
            <Layout>
              <PartyLedgerPageLayout></PartyLedgerPageLayout>
            </Layout>
          }
        />

        {/* sales */}

        <Route
          path="/reports/sale/details"
          element={
            <Layout>
              <SalesPurchaseDetailsPageLayout></SalesPurchaseDetailsPageLayout>
            </Layout>
          }
        />

        <Route
          path="/reports/sale/summary"
          element={
            <Layout>
              <SalesPurchaseSummaryPageLayout></SalesPurchaseSummaryPageLayout>
            </Layout>
          }
        />

        <Route
          path="/reports/sale/product-wise"
          element={
            <Layout>
              <ProductWiseSalePageLayout></ProductWiseSalePageLayout>
            </Layout>
          }
        />

        <Route
          path="/reports/pur/party-wise"
          element={
            <Layout>
              <ProductWiseSalePageLayout></ProductWiseSalePageLayout>
            </Layout>
          }
        />

        <Route
          path="/reports/sale/credit-note"
          element={
            <Layout>
              <CreditNotePageLayout></CreditNotePageLayout>
            </Layout>
          }
        />

        {/* purchase */}
        {/* sales */}

        <Route
          path="/reports/pur/details"
          element={
            <Layout>
              <SalesPurchaseDetailsPageLayout></SalesPurchaseDetailsPageLayout>
            </Layout>
          }
        />

        <Route
          path="/reports/pur/summary"
          element={
            <Layout>
              <SalesPurchaseSummaryPageLayout></SalesPurchaseSummaryPageLayout>
            </Layout>
          }
        />

        <Route
          path="/reports/pur/product-wise"
          element={
            <Layout>
              <ProductWiseSalePageLayout></ProductWiseSalePageLayout>
            </Layout>
          }
        />

        <Route
          path="/reports/pur/party-wise"
          element={
            <Layout>
              <ProductWiseSalePageLayout></ProductWiseSalePageLayout>
            </Layout>
          }
        />

        <Route
          path="/reports/pur/debit-note"
          element={
            <Layout>
              <CreditNotePageLayout></CreditNotePageLayout>
            </Layout>
          }
        />

        <Route
          path="/import-sea/report/cnf-profit-loss"
          element={
            <Layout>
              <CnfProfitLossImpSeaPage></CnfProfitLossImpSeaPage>
            </Layout>
          }
        />
        <Route
          path="/import-sea/report/cnf-volume"
          element={
            <Layout>
              <CnfVolumeStatementImpSeaPage></CnfVolumeStatementImpSeaPage>
            </Layout>
          }
        />

        <Route
          path="/import-air/report/cnf-profit-loss"
          element={
            <Layout>
              <CnfProfitLossImpSeaPage></CnfProfitLossImpSeaPage>
            </Layout>
          }
        />
        <Route
          path="/import-air/report/cnf-volume"
          element={
            <Layout>
              <CnfVolumeStatementImpSeaPage></CnfVolumeStatementImpSeaPage>
            </Layout>
          }
        />

        {/* admin  */}
        <Route
          path="/admin/business"
          element={
            <Layout>
              <BusinessListLayout></BusinessListLayout>
            </Layout>
          }
        />
        <Route
          path="/admin/branch"
          element={
            <Layout>
              <BusinessListLayout></BusinessListLayout>
            </Layout>
          }
        />

        <Route
          path="/admin/configuration"
          element={
            <Layout>
              <GeneralLedgerSetup></GeneralLedgerSetup>
            </Layout>
          }
        />
        <Route
          path="/admin/recalculation"
          element={
            <Layout>
              <RecalculationListLayout></RecalculationListLayout>
            </Layout>
          }
        />
         <Route
          path="/admin/template"
          element={
            <Layout>
              <HeaderListLayout></HeaderListLayout>
            </Layout>
          }
        />
         <Route
          path="/admin/system-prefix"
          element={
            <Layout>
              <SystemPrefixListLayout></SystemPrefixListLayout>
            </Layout>
          }
        />

        <Route
          path="/admin/users"
          element={
            <Layout>
              <UserListLayout></UserListLayout>
            </Layout>
          }
        />
         <Route
          path="/admin/user-groups"
          element={
            <Layout>
              <GroupListLayout></GroupListLayout>
            </Layout>
          }
        />
         <Route
          path="/admin/user-activity"
          element={
            <Layout>
              <LogList></LogList>
            </Layout>
          }
        />

        {/* SETTINGS */}
         <Route
          path="/settings/party/shipper"
          element={
            <Layout>
              <ShipperParty></ShipperParty>
            </Layout>
          }
        />
         <Route
          path="/settings/party/consignee"
          element={
            <Layout>
              <ShipperParty></ShipperParty>
            </Layout>
          }
        />
         <Route
          path="/settings/party/agent"
          element={
            <Layout>
              <ShipperParty></ShipperParty>
            </Layout>
          }
        />
      
         <Route
          path="/settings/party/cnf-agent"
          element={
            <Layout>
              <ShipperParty></ShipperParty>
            </Layout>
          }
        />
         <Route
          path="/settings/party/carrier"
          element={
            <Layout>
              <ShipperParty></ShipperParty>
            </Layout>
          }
        />
         <Route
          path="/settings/party/3rd-party"
          element={
            <Layout>
              <ShipperParty></ShipperParty>
            </Layout>
          }
        />
         <Route
          path="/settings/party/cfs"
          element={
            <Layout>
              <ShipperParty></ShipperParty>
            </Layout>
          }
        />
         <Route
          path="/settings/party/customer"
          element={
            <Layout>
              <ShipperParty></ShipperParty>
            </Layout>
          }
        />
         <Route
          path="/settings/party/supplier"
          element={
            <Layout>
              <ShipperParty></ShipperParty>
            </Layout>
          }
        />
         <Route
          path="/settings/party/employee"
          element={
            <Layout>
              <ShipperParty></ShipperParty>
            </Layout>
          }
        />
         <Route
          path="/settings/party/supplier"
          element={
            <Layout>
              <ShipperParty></ShipperParty>
            </Layout>
          }
        />
         <Route
          path="/settings/party/management"
          element={
            <Layout>
              <ShipperParty></ShipperParty>
            </Layout>
          }
        />
         <Route
          path="/settings/party/others"
          element={
            <Layout>
              <ShipperParty></ShipperParty>
            </Layout>
          }
        />
         <Route
          path="/settings/party/department"
          element={
            <Layout>
              <ShipperParty></ShipperParty>
            </Layout>
          }
        />
          <Route
          path="/settings/party/designation"
          element={
            <Layout>
              <ShipperParty></ShipperParty>
            </Layout>
          }
        />
         <Route
          path="/settings/inventory/product"
          element={
            <Layout>
              <ProductListLayout></ProductListLayout>
            </Layout>
          }
        />

         <Route
          path="/settings/gh-agent"
          element={
            <Layout>
              <GhAgentListLayout></GhAgentListLayout>
            </Layout>
          }
        />

         <Route
          path="/settings/container"
          element={
            <Layout>
              <ContainerListLayout></ContainerListLayout>
            </Layout>
          }
        />
        <Route
          path="/settings/fdr-vsl"
          element={
            <Layout>
              <ContainerListLayout></ContainerListLayout>
            </Layout>
          }
        />

         <Route
          path="/settings/mtr-vsl"
          element={
            <Layout>
              <ContainerListLayout></ContainerListLayout>
            </Layout>
          }
        />
        <Route
          path="/settings/mode"
          element={
            <Layout>
              <ContainerListLayout></ContainerListLayout>
            </Layout>
          }
        />
        <Route
          path="/settings/trade"
          element={
            <Layout>
              <ContainerListLayout></ContainerListLayout>
            </Layout>
          }
        />
         <Route
          path="/settings/tos"
          element={
            <Layout>
              <ContainerListLayout></ContainerListLayout>
            </Layout>
          }
        />
        <Route
          path="/settings/commodity"
          element={
            <Layout>
              <ContainerListLayout></ContainerListLayout>
            </Layout>
          }
        />
        <Route
          path="/settings/mawb"
          element={
            <Layout>
              <MAWBListLayout></MAWBListLayout>
            </Layout>
          }
        />
         <Route
          path="/settings/port"
          element={
            <Layout>
              <PortListLayout></PortListLayout>
            </Layout>
          }
        />
         <Route
          path="/settings/currency"
          element={
            <Layout>
              <AddCurrencyListLayout></AddCurrencyListLayout>
            </Layout>
          }
        />

          <Route
          path="/settings/country"
          element={
            <Layout>
              <CountryListLayout></CountryListLayout>
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