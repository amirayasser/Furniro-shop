import './pageHeader.css';
import Breadcramps from './bread cramps header/Breadcramps';
import { useLocation } from 'react-router-dom';
import bgpic from '@assets/Rectangle 1.png';
import logo from "@assets/Meubel House_Logos-05.png";

const PageHeader = ({ bgPic = bgpic, prodName = null, bgstyle = {}, pageName }) => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((pathname) => pathname !== '')
    

        const breadcrumbItems = pathnames.map((pathname) => {
            let href;

            if (pathname === 'Products') {
            
                href ='/shop';
                pathname = 'Shop';

            } else if (!isNaN(pathname)) {
              
                href = `/products/${pathname}`;
                 pathname = prodName
            } else if (pathname === 'wishlist:userId') {

                href = '/wishlist:userId';
                pathname = 'Wish List';

            }
          
            return { label: pathname, href: href };
        });

   
    const headerStyle = {
        backgroundImage: `url(${bgPic})`,
        ...bgstyle
    };
  return (
      <header className="pageHeader"
          style={headerStyle}
      >
         {
   !( pageName === 'Shop' || pageName === undefined) &&  
         <img src={logo} alt="logo" style={{ marginBottom: '-10px' }} />
         } 
          <h2 style={{ marginBottom: '-10px', color: '#000' }}>{pageName}</h2>
          <Breadcramps bcItems={breadcrumbItems}/>
      </header>
  )
}

export default PageHeader
