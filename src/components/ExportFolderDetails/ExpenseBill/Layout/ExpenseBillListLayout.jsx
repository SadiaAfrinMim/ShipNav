import HeaderTittleFrom from "../../SharedAllListFrom/HeaderTitle/HeaderTittleFrom";
import ExpenseBillList from "../ExpenseBillList";



const ExpenseBillListLayout = () => {
  return (
    <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderTittleFrom></HeaderTittleFrom>
        <ExpenseBillList></ExpenseBillList>


      </div>
    </div>
  );
};

export default ExpenseBillListLayout;