
import HeaderAddFromTitle from '../../SharedAllListFrom/HeaderTitle/HeaderAddFromTitle';
import AddExpenseBill from '../AddExpenseBill';

const AddExpenseBillLayout = () => {
  return (
    <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderAddFromTitle></HeaderAddFromTitle>
        <AddExpenseBill></AddExpenseBill>


      </div>
    </div>
  );
};

export default AddExpenseBillLayout;