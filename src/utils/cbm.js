// =============================================
// File: src/utils/cbm.js
// =============================================

/**
 * Convert a scalar length in a given unit to meters.
 * Supported units: mm, cm, m, in, ft
 */
export const unitToMeters = (unit) => {
  switch ((unit || "cm").toLowerCase()) {
    case "mm":
      return 0.001;
    case "cm":
      return 0.01;
    case "m":
      return 1;
    case "in":
    case "inch":
      return 0.0254;
    case "ft":
    case "feet":
      return 0.3048;
    default:
      return 0.01; // default to cm if unknown
  }
};

const toNum = (v) => (typeof v === "number" ? v : Number(v) || 0);

/**
 * Compute CBM (cubic meters) for an item row.
 * Assumes `length`, `width`, `height` are per-carton dimensions in the given unit.
 * Formula: (L * W * H in m^3) * carton
 * @param {Object} params
 * @param {number|string} params.length
 * @param {number|string} params.width
 * @param {number|string} params.height
 * @param {number|string} params.carton
 * @param {string} params.unit - one of: mm, cm, m, in, ft
 * @param {number} [params.decimals=4] - rounding precision
 * @returns {number} cbm rounded
 */
export function computeCBM({ length, width, height, carton, unit = "cm", decimals = 4 }) {
  const L = Math.max(0, toNum(length));
  const W = Math.max(0, toNum(width));
  const H = Math.max(0, toNum(height));
  const C = Math.max(0, toNum(carton));
  const u = unitToMeters(unit);

  const perCartonM3 = (L * u) * (W * u) * (H * u); // m^3
  const raw = perCartonM3 * C;
  const factor = Math.pow(10, decimals);
  console.log("From compute cbm. Cbm Calculations done here!!!!!", Math.round(raw * factor) / factor )
  return Math.round(raw * factor) / factor;
}
