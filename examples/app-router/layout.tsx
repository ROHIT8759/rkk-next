import { generateAppMetadata } from "rkk-next";

export const metadata = generateAppMetadata({
    title: "My App",
    description: "Built with Next.js App Router and rkk-next",
    image: "/og-default.png",
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body>{children}</body>
        </html>
    );
}
