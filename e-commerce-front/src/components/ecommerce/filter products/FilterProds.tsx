import React, { useEffect } from 'react';
import styles from './filterProds.module.css';
import { Button, Container, Dropdown } from 'react-bootstrap';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import Form from 'react-bootstrap/Form';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { actGetCateg } from '@store/categories/categoriesSlice';

const { filterContainer, showNo, filterList } = styles;

const FilterProds = ({
    fromNum = 1,
    toNum,
    allSelectedProdsNum,
    prodsPerSlide,
    onOptionChange,
    optionValue,
    handleFilter
}) => {
    const dispatch = useAppDispatch();
    const categs = useAppSelector(state => state.categories.records);

    useEffect(() => {
        dispatch(actGetCateg());
    }, [dispatch]);

   

    const categList = categs.map(categ => categ.prefix);

    return (
        <div className={filterContainer}>
            <div>
                <Dropdown onSelect={handleFilter}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className={filterList}>
                        <HiOutlineAdjustmentsHorizontal />
                        Filter
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item eventKey={'all'}>All Categories</Dropdown.Item>
                        {categList.map((category, index) => (
                            <Dropdown.Item eventKey={category} key={index}>{category}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

                <p>Showing {fromNum}-{toNum} of {allSelectedProdsNum} results</p>
            </div>
            <div>
                <p>Show</p> <span className={showNo}>{prodsPerSlide}</span>
                <p>Sorted by</p>

                <Form.Select aria-label="Default select example" onChange={onOptionChange} value={optionValue}>
                    <option value="1">Default</option>
                    <option value="2">Price: Low to High</option>
                    <option value="3">Price: High to Low</option>
                </Form.Select>
            </div>
        </div>
    );
};

export default FilterProds;
