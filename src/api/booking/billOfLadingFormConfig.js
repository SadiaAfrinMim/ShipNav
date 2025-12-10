// File: billOfLadingFormConfig.js

const billOfLadingFormConfig = {
  modes: {
    add: {
      title: "Add Bill of Lading",
      submitText: "Save",
    },
    edit: {
      title: "Edit Bill of Lading",
      submitText: "Update",
    },
  },

  layout: {
    wrapperPadding: 24,
    leftColSpan: 12,
    rightColSpan: 12,
    totalsColSpan: 8,
  },

  fields: [
    // ---------- LEFT COLUMN ----------
    {
      name: "hbl",
      label: "HBL",
      component: "select",
      col: "left",
      rules: [{ required: true, message: "Please select booking" }],
      placeholder: "(-- Select Booking --)",
      optionsKey: "hblOptions", // future dynamic options
    },
    {
      name: "consignmentType",
      label: "Consignment Type",
      component: "select",
      col: "left",
      placeholder: "(-- Select/None --)",
      optionsKey: "consignmentTypeOptions",
    },
    {
      name: "shipperName",
      label: "Shipper Name",
      component: "input",
      col: "left",
    },
    {
      name: "shipperBank",
      label: "Shipper Bank",
      component: "input",
      col: "left",
    },
    {
      name: "consigneeName",
      label: "Consignee Name",
      component: "input",
      col: "left",
    },
    {
      name: "notifyName",
      label: "Notify Name",
      component: "input",
      col: "left",
    },
    {
      name: "alsoNotifyName",
      label: "Also Notify Name",
      component: "input",
      col: "left",
    },
    {
      name: "agentName",
      label: "Agent Name",
      component: "input",
      col: "left",
    },
    {
      name: "markaNo",
      label: "Marka & No.",
      component: "textarea",
      col: "left",
      props: { rows: 2 },
    },

    // ---------- RIGHT COLUMN ----------
    {
      name: "date",
      label: "Date",
      component: "datePicker",
      col: "right",
      rules: [{ required: true, message: "Please select a date" }],
      props: { style: { width: "100%" } },
    },
    {
      name: "freightPayableAt",
      label: "Freight Payable At",
      component: "input",
      col: "right",
    },
    {
      name: "shipperAddress",
      label: "Shipper Address",
      component: "textarea",
      col: "right",
      props: { rows: 1 },
    },
    {
      name: "shipperBankAddress",
      label: "Shipper Bank Address",
      component: "textarea",
      col: "right",
      props: { rows: 1 },
    },
    {
      name: "consigneeAddress",
      label: "Consignee Address",
      component: "textarea",
      col: "right",
      props: { rows: 1 },
    },
    {
      name: "notifyAddress",
      label: "Notify Address",
      component: "textarea",
      col: "right",
      props: { rows: 1 },
    },
    {
      name: "alsoNotifyAddress",
      label: "Also Notify Address",
      component: "textarea",
      col: "right",
      props: { rows: 1 },
    },
    {
      name: "agentAddress",
      label: "Agent Address",
      component: "textarea",
      col: "right",
      props: { rows: 1 },
    },
    {
      name: "goodsDescription",
      label: "Description of Goods",
      component: "textarea",
      col: "right",
      props: { rows: 2 },
    },

    // ---------- TOTALS SECTION ----------
    {
      name: "totalCarton",
      label: "Total Carton",
      component: "input",
      col: "totals",
      span: 8,
    },
    {
      name: "totalCbm",
      label: "Total CBM",
      component: "input",
      col: "totals",
      span: 8,
    },
    {
      name: "onBoardDate",
      label: "On Board Date",
      component: "datePicker",
      col: "totals",
      span: 8,
      props: { style: { width: "100%" } },
    },
    {
      name: "totalGwt",
      label: "Total GWT",
      component: "input",
      col: "totals2",
      span: 8,
    },
    {
      name: "numBols",
      label: "No. of Bills of Lading",
      component: "input",
      col: "totals2",
      span: 8,
    },
    {
      name: "location",
      label: "Location",
      component: "select",
      col: "totals2",
      span: 8,
      placeholder: "(-- Select/None --)",
      optionsKey: "locationOptions",
    },
  ],

  // BLUE INFO BOX LABELS
  infoBox: {
    left: [
      "Place of Receipt :",
      "Port of Discharge :",
      "FDR/VSL :",
      "FDR/VSL ETD :",
      "From FDR/VSL Port :",
      "MTR/VSL :",
      "MTR/VSL ETD :",
      "From MTR/VSL Port :",
    ],
    right: [
      "Port of Loading :",
      "Final Destination :",
      "FDR/VSL Voyage :",
      "FDR/VSL ETA :",
      "To FDR/VSL Port :",
      "MTR/VSL Voyage :",
      "MTR/VSL ETA :",
      "To MTR/VSL Port :",
    ],
  },

  status: {
    name: "status",
    label: "Status",
    initialValue: "opened",
    options: [
      { label: "Opened", value: "opened" },
      { label: "Issued", value: "issued" },
      { label: "Reopened", value: "reopened" },
    ],
  },

  footerNote: "* Required Fields",
};

export default billOfLadingFormConfig;
