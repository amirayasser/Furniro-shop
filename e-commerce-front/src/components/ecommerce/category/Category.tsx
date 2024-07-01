import { TCategory } from '@customTypes/shared';
import React from 'react'
import { Link } from 'react-router-dom';
import styles from './style.module.css';

const Category = ({title, img, prefix}: TCategory) => {
  return (
    <div>
      <Link to={`/categories/products/${prefix}`}>
        <div>
          <img src={img} alt={title}/>
        </div>
        <h4>{title}</h4>
      </Link>
    </div>
  )
}

export default Category
