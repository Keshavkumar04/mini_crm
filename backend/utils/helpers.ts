export function simulateDelivery(): "SENT" | "FAILED" {
  return Math.random() < 0.9 ? "SENT" : "FAILED"; // 90% chance of SENT
}
