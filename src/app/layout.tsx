import { AuthProvider } from "./auth/auth.context";
import "./globals.css";
// import Header from "./component/header";

export const metadata = {
  title: "Dashboard App",
  description: "A dynamic dashboard with authentication and API integration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="flex h-screen bg-gray-100">
            {/* <Sidebar /> */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* <Header /> */}
              <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
                {children}
              </main>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
