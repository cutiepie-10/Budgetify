import "./globals.css";
import Sidebar from "@/Components/Sidebar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-[100vh] flex flex-row">
        <Sidebar/>
        {children}
        
      </body>
    </html>
  );
}
