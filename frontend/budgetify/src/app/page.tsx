import Topbar from "@/Components/Topbar";

export default function Home() {
  
  return (
    <div className="flex-5 flex flex-col gap-10 p-5 pl-10">
      <Topbar/>
      <div className="flex flex-col">
        <h1 className="text-3xl font-semibold">
          Overview
        </h1>
        <p className="text-sm text-gray-600">
          Welcome! This is your personal finance dashboard where you can track your income, expenses, and savings.
        </p>
      </div>
    </div>
      
  
  );
}
