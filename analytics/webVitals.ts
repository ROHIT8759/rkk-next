import { NextWebVitalsMetric } from "next/app";

export function reportWebVitals(metric: NextWebVitalsMetric) {
  const { id, name, value } = metric;

  console.log("[Vitals]", name, value);

  // future: send to analytics
}
