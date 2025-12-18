// Example Chart component (used in dashboard.tsx lazy loading example)
import React from "react";

export default function Chart() {
    return (
        <div style={{
            padding: "2rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
            margin: "2rem 0"
        }}>
            <h2>Analytics Chart</h2>
            <p>This is a heavy component that's lazy loaded for better performance.</p>

            {/* Simulated chart visualization */}
            <div style={{
                height: "200px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "1.2rem"
            }}>
                📊 Chart Visualization
            </div>

            <p style={{ marginTop: "1rem", color: "#666" }}>
                In a real app, this would be a heavy charting library like Chart.js,
                Recharts, or D3.js that benefits from lazy loading.
            </p>
        </div>
    );
}
