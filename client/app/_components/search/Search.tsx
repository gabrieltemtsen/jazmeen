import { FormInput } from '../form/FormInput';
import { IoIosSearch } from "react-icons/io";

const SearchInput = () => {

  return (
    <div>
      <FormInput
        placeholder='Type to search'
        id='search'
        Icon={IoIosSearch}
        // onChange={(e) => handleSelectChange(e.target.value)}
        className='bg-transparent font-dmSans font-light rounded border-gray-400 text-gray-300' />
    </div>
  );
};

export default SearchInput;