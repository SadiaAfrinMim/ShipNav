
import HeaderTittleFrom from '../../SharedAllListFrom/HeaderTitle/HeaderTittleFrom';
import CreditNoteList from '../CreditNoteList';





const CreditNoteListLayout = () => {
  return (
    <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderTittleFrom></HeaderTittleFrom>
        <CreditNoteList></CreditNoteList>


      </div>
    </div>
  );
};

export default CreditNoteListLayout;