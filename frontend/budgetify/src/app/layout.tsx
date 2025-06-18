import "./globals.css";
import Sidebar from "@/Components/Sidebar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-[100vh] flex flex-row bg-gray-100">
          <Sidebar/>
          {children}
        </main>
        
        
      </body>
    </html>
  );
}
