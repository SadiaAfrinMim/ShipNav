// =============================================
// File: src/components/BookingDetails/catalogs.js
// =============================================

export const catalogs = {
  transportModes: [
    { value: "sea", label: "SEA" },
    { value: "air", label: "AIR" },
  ],
  combinedTransport: [
    { value: "sea-air", label: "SEA-AIR" },
    { value: "air-sea", label: "AIR-SEA" },
    { value: "air-air", label: "AIR-AIR" },
    { value: "sea-sea", label: "SEA-SEA" },
  ],
  freightTerms: [
    "FOB","FCA","CPT","CFR","EXW","FAS","CIF","DPU","DAP","DDP","LDP",
  ].map((t) => ({ value: t, label: t })),
  serviceTypes: [
    "PORT-PORT","PORT-DOOR","DOOR-PORT","DOOR-DOOR"
  ].map((s) => ({ value: s, label: s })),
  salesTypes: [
    { value: "PURE NOMINATION", label: "PURE NOMINATION" },
    { value: "DIRECT SALES", label: "DIRECT SALES" },
    { value: "JOINT SALES", label: "JOINT SALES" },
  ],
  status: [
    { value: "accepted", label: "Accepted" },
    { value: "issued", label: "Issued" },
    { value: "on_review", label: "On Review" },
  ],
  countries: [
    { value: "BD", label: "Bangladesh" },
    { value: "CN", label: "China" },
    { value: "IN", label: "India" },
    { value: "US", label: "United States" },
    { value: "GB", label: "United Kingdom" },
  ],
  ports: [
    { value: "CGP", label: "Chattogram (CGP)" },
    { value: "DAC", label: "Dhaka (DAC)" },
    { value: "SIN", label: "Singapore (SIN)" },
    { value: "HKG", label: "Hong Kong (HKG)" },
  ],
  locations: [
    { value: "Dhaka", label: "Dhaka" },
    { value: "Chattogram", label: "Chattogram" },
    { value: "Narayanganj", label: "Narayanganj" },
  ],
  people: [
    { value: "alice@company.com", label: "Alice" },
    { value: "bob@company.com", label: "Bob" },
    { value: "charlie@company.com", label: "Charlie" },
  ],
  parties: [
    { value: "ACME LTD", label: "ACME LTD" },
    { value: "OMEGA FASHIONS", label: "OMEGA FASHIONS" },
    { value: "GLOBAL TRADERS", label: "GLOBAL TRADERS" },
  ],
  banks: [
    { value: "DBBL", label: "Dutch-Bangla Bank" },
    { value: "EBL", label: "Eastern Bank" },
    { value: "SCB", label: "Standard Chartered" },
  ],
  branches: [
    { value: "Uttara", label: "Uttara" },
    { value: "Gulshan", label: "Gulshan" },
    { value: "Motijheel", label: "Motijheel" },
  ],
  commodities: [
    { value: "GARMENTS", label: "GARMENTS" },
    { value: "FABRICS", label: "FABRICS" },
    { value: "ACCESSORIES", label: "ACCESSORIES" },
  ],
  agents: [
    { value: "OCEAN LINK", label: "OCEAN LINK" },
    { value: "SKY HANDLERS", label: "SKY HANDLERS" },
    { value: "FAST CARGO", label: "FAST CARGO" },
  ],
  marks: [
    { value: "M001", label: "M001" },
    { value: "M002", label: "M002" },
    { value: "M003", label: "M003" },
  ],
};

export const dateFormat = "DD-MM-YYYY";
export const dateTimeFormat = "DD-MM-YYYY HH:mm";
