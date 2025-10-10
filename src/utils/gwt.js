// =============================================
// File: src/utils/gwt.js
// =============================================

const toNum = (v) => (typeof v === "number" ? v : Number(v) || 0);

/**
 * Compute Gross Weight (GWT).
 *
 * Two modes:
 *  - If weightPerCarton is provided → GWT = weightPerCarton × carton
 *  - Else if weightPerPiece is provided → GWT = weightPerPiece × pcs × carton
 *
 * @param {Object} params
 * @param {number|string} params.carton   - number of cartons
 * @param {number|string} [params.pcs]    - pieces per carton (only used if weightPerPiece is given)
 * @param {number|string} [params.weightPerCarton] - gross weight per carton (kg or lb)
 * @param {number|string} [params.weightPerPiece]  - weight per piece (kg or lb)
 * @param {number} [params.decimals=2]    - rounding precision
 * @returns {number} gwt rounded (same unit as provided weights)
 */
export function computeGWT({ carton, pcs, weightPerCarton, weightPerPiece, decimals = 2 }) {
  const C = Math.max(0, toNum(carton));
  const P = Math.max(0, toNum(pcs));
  const Wc = toNum(weightPerCarton);
  const Wp = toNum(weightPerPiece);

  let raw = 0;

  if (Wc > 0) {
    raw = Wc * C;
  } else if (Wp > 0) {
    raw = Wp * P * C;
  }

  const factor = Math.pow(10, decimals);
  return Math.round(raw * factor) / factor;
}
