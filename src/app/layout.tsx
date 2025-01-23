// app/layout.tsx
import '@/styles/globals.scss';
import localFont from 'next/font/local';

const commuters = localFont({
    src: [
        {
            path: './fonts/commuters-sans-300.woff',
            weight: '300',
            style: 'normal',
        },
        {
            path: './fonts/commuters-sans-400.woff',
            weight: '400',
            style: 'normal',
        },
        {
            path: './fonts/commuters-sans-600.woff',
            weight: '600',
            style: 'normal',
        },
        {
            path: './fonts/commuters-sans-700.woff',
            weight: '700',
            style: 'normal',
        },
    ],
})

export const metadata = {
    title: 'Portfolio de Christelle Bettoni',
    description: 'Développeuse Front-End',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={commuters.className}>
        <head>
            <link rel="icon" href="/favicon.ico" />
        </head>
        <body>
        {children}
        </body>
        </html>
    );
}