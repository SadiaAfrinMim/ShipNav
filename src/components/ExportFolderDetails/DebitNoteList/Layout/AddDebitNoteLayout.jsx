
import HeaderAddFromTitle from '../../SharedAllListFrom/HeaderTitle/HeaderAddFromTitle';
import AddDebitNote from '../../SharedAllListFrom/SharedFrom/AddDebitNote';

const AddDebitNoteLayout = () => {
  return (
    <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderAddFromTitle></HeaderAddFromTitle>
        <AddDebitNote></AddDebitNote>


      </div>
    </div>
  );
};

export default AddDebitNoteLayout;