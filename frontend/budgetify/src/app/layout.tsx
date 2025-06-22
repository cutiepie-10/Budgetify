import "./globals.css";
import Sidebar from "@/Components/Sidebar";
import {UserProvider} from '@/Components/ReducerContext/userReducer'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-[100vh] flex flex-row bg-gray-100">
          <UserProvider>
              <Sidebar/>
              {children}
          </UserProvider>
          
        </main>
        
        
      </body>
    </html>
  );
}
