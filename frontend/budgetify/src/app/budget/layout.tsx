
const BudgetLayout = ({children}:{children:React.ReactNode})=>{
    return(
        <div className="flex-5 flex flex-col gap-10 p-5 pl-10">
            <p className="text-2xl text-gray-600">
                Budget
            </p>
            {children}

        </div>
    );
}
export default BudgetLayout;