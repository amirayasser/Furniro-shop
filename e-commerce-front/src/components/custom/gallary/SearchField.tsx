import { useAppDispatch, useAppSelector } from '@store/hooks';
import actSearchForProdByTitle from '@store/products/act/actSearchForProdByTitle';
import { actGetAllProds } from '@store/products/allProdsSlice';
import React, { useState } from 'react'
import { Form, InputGroup } from 'react-bootstrap';
import { FiSearch, FiX } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom';

const SearchField = ({ iconClass }) => {
    const [query, setQuery] = useState('');

    const [showIPField, setShowIPField] = useState(false);

    const dispatch = useAppDispatch();
 
    const navigate = useNavigate()


    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setQuery(inputValue);       
    };

    const handleSearch = () => {
        setShowIPField(true)
        navigate('/shop')
      dispatch(actSearchForProdByTitle(query));      
    };


  const handleHideSearchField = () => {
    setShowIPField(false);
    setQuery('');
  };

  return (
     <InputGroup className="mx-3 w-auto">
       {
        showIPField && 
        <>

          <InputGroup.Text
            id="basic-addon1"
            style={{
              backgroundColor: '#fff',
            }}

            onClick={handleHideSearchField}
          >
            <FiX />
          </InputGroup.Text>


        <Form.Control
        placeholder="search"
        aria-label="search"
        aria-describedby="basic-addon1"
        value={query}
        onChange={handleInputChange}
        />
        
     
        </>
    }
          <InputGroup.Text id="basic-addon1" style={{
              backgroundColor: '#fff', 
              border: showIPField ? '1px solid #dee2e6' : 'none'
              }}>
              <FiSearch className={iconClass} 
          onClick={handleSearch }
               />        
        </InputGroup.Text>
      </InputGroup>
      
  )
}

export default SearchField
