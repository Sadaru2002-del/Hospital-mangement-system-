/**
 * Generate a human-readable, unique-enough prescription ID.
 * Format: RX-{year}-{4 random digits}-{2 random letters}
 * e.g. RX-2026-9981-AB
 *
 * This is used as a display-friendly identifier (printed on the prescription
 * document / QR code) in addition to MongoDB's own _id.
 *
 * @returns {string}
 */
const generatePrescriptionId = () => {
  const year = new Date().getFullYear();
  const digits = Math.floor(1000 + Math.random() * 9000); // 4-digit number
  const letters = Array.from({ length: 2 }, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26))
  ).join("");

  return `RX-${year}-${digits}-${letters}`;
};

export default generatePrescriptionId;