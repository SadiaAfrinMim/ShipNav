
import HeaderTittleFrom from '../../SharedAllListFrom/HeaderTitle/HeaderTittleFrom';
import DebitNoteList from '../DebitNoteList';





const DebitNoteListLayout = () => {
  return (
    <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderTittleFrom></HeaderTittleFrom>
        <DebitNoteList></DebitNoteList>


      </div>
    </div>
  );
};

export default DebitNoteListLayout;