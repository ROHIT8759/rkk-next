import { MetaManager, lazyImport, DefaultLoader } from "rkk-next";
import { useEffect } from "react";
import { observeRoutes } from "rkk-next";

// Lazy load heavy components
const HeavyChart = lazyImport(
    () => import("../components/Chart"),
    {
        loading: DefaultLoader,
        ssr: false,
        delay: 100,
    }
);

export default function Dashboard() {
    useEffect(() => {
        // Track route changes
        const unsubscribe = observeRoutes((event) => {
            console.log("Route changed:", event.url);
            console.log("Navigation took:", event.duration.toFixed(2), "ms");

            // Send to your analytics service
            // trackEvent('page_view', { url: event.url, duration: event.duration });
        });

        return unsubscribe;
    }, []);

    return (
        <>
            <MetaManager
                title="Dashboard"
                description="User dashboard with analytics and insights"
                noIndex // Don't index private dashboard pages
            />

            <main style={{ padding: "2rem" }}>
                <h1>Dashboard</h1>
                <p>Welcome to your analytics dashboard</p>

                {/* Heavy component loaded lazily */}
                <HeavyChart />
            </main>
        </>
    );
}
