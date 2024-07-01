import React from 'react'

import styles from './mainFooter.module.css';
import { Container } from 'react-bootstrap';

const { footer, footerbox } = styles;

const Footer = () => {
  return (
    <footer >
    <div className={footer}>
<div className={footerbox}>
      <div>
        <h3>Funiro</h3>
        <p>400 University Drive Suite 200 Coral</p>
        <p> Gables</p>
        <p>FL 33134 USA</p>
      </div>

      <article>
        <p>Links</p>
        <span>home</span>
        <span>shop</span>
        <span>about</span>
        <span>contact</span>
      </article>
          <article>
              <p>Help</p>
              <span>Payment Options</span>
              <span>Returns</span>
              <span>Privacy Policies</span>
          </article>
          <form>
              <p>Newsletter</p>
              <input type='email' placeholder='enter your email address' name='email' />
              <button type='submit'>subscribe</button>
          </form>
</div>
    {/* <footer> */}
        <p> 2023 furino. All rights reverved </p>
    {/* </footer> */}
      </div>
    </footer>
  )
}

export default Footer;
