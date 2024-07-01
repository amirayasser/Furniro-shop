import React from "react";
// import other react components
import InspireCarousel from "@components/InspirationCarousel";
import Gallery from "@components/custom/gallary/Gallery";

// react router dom
import { NavLink } from "react-router-dom";

// react icons
import { FaArrowRightLong } from "react-icons/fa6";

// bootstrap
import { Figure } from "react-bootstrap";

// import assets
import diningimg from "@assets/image 106.png";
import livingimg from "@assets/Image-living room.png";
import bedroomimg from "@assets/Mask Group.png";
import prod1 from "@assets/image 1.png";
import prod2 from "@assets/image 2.png";
import prod3 from "@assets/image 3.png";
import prod4 from "@assets/image 4.png";
import prod5 from "@assets/image 5.png";
import prod6 from "@assets/image 6.png";
import prod7 from "@assets/image 7.png";
import prod8 from "@assets/image 8.png";
import slidepic1 from "@assets/Rectangle25.png";
import slidepic2 from "@assets/Rectangle 26.png";

// import style
import styles from "@styles/home.module.css";
import Product from "@components/ecommerce/product/Product";

const prodsImgs = [prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8];
const homeProds = [
  {
    pic: prod1,
    name: "Syltherine",
    oldprice: 300,
    newprice: 210,
    descrip: "basic White table",
  },
  {
    pic: prod2,
    name: "Leviosa",
    oldprice: 500,
    newprice: 250,
    descrip: "stylish cafe chair",
  },
  {
    pic: prod3,
    name: "Lolito",
    oldprice: 600,
    descrip: "Luxury big sofa",
  },
  {
    pic: prod4,
    name: "Respira",
    oldprice: 1330,
    newprice: 1000,
    descrip: "Outdoor bar table and stool",
  },
  {
    pic: prod5,
    name: "Grifo",
    oldprice: 400,
    descrip: "Night lamp",
  },
  {
    pic: prod6,
    name: "Muggo",
    oldprice: 2300,
    newprice: 1150,
    descrip: "Small mug",
  },
  {
    pic: prod7,
    name: "Pingky",
    oldprice: 3000,
    newprice: 2700,
    descrip: "Cute living set",
  },
  {
    pic: prod8,
    name: "Potty",
    oldprice: 500,
    descrip: "Leather orange couch",
  },
];
const carouselpics = [slidepic1, slidepic2];

const {
  banner,
  browse,
  pics,
  figcaption,
  ourProducts,
  inspiration,
  inspirationmainpic,
  golink,
  galleryContainSec,
} = styles;

const Home = () => {
  return (
    <React.Fragment>
      {/* banner */}
      <div className={banner}>
        <div className="">
          <h6>New Arrival</h6>
          <h2>Discover Our New Collection</h2>
          <p className="fw-medium">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </p>
          <button>BUY Now</button>
        </div>
      </div>

      {/* browse the range section */}
      <section className={`${browse} fw-bold`}>
        <h2>Browse The Range</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <div className={`${pics} d-flex justify-content-between gap-3`}>
          <Figure>
            <Figure.Image alt="171x180" src={diningimg} />
            <Figure.Caption className={figcaption}> Dining </Figure.Caption>
          </Figure>
          <Figure>
            <Figure.Image alt="171x180" src={livingimg} />
            <Figure.Caption className={figcaption}> Living </Figure.Caption>
          </Figure>
          <Figure>
            <Figure.Image alt="171x180" src={bedroomimg} />
            <Figure.Caption className={figcaption}> Bedroom </Figure.Caption>
          </Figure>
        </div>
      </section>

      {/* Our Products section */}
      <section
        style={{ width: "86%" }}
        className="d-flex flex-wrap flex-column align-items-center"
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "40px",
            fontWeight: "bold",
            color: "#3A3A3A",
            marginBottom: "30px",
          }}
        >
          Our Products
        </h2>
        <div className={ourProducts}>
          {homeProds.map((prod, index) => (
            <Product
              key={index}
              index={index}
              prodPic={prod.pic}
              prodTitle={prod.name}
              prodDescrip={prod.descrip}
              prodPrice={prod.oldprice}
              newProdPrice={prod.newprice}
            />
          ))}
        </div>

        <NavLink
          to={"/shop"}
          style={{
            border: "3px solid #B88E2F",
            color: "#B88E2F",
            backgroundColor: "transparent",
            fontWeight: "600",
            width: "200px",
            padding: "10px 40px",
            textDecoration: "none",
            textAlign: "center",
            marginTop: "15px",
          }}
        >
          Show More
        </NavLink>
      </section>

      {/* inspiration section*/}
      <section className={inspiration}>
        <div style={{ width: "30%" }}>
          <h2
            style={{
              fontSize: "40px",
              fontWeight: "bold",
            }}
          >
            50+ Beautiful rooms inspiration
          </h2>
          <p style={{ color: "#616161" }}>
            {" "}
            Our designer already made a lot of beautiful prototipe of rooms that
            inspire you
          </p>
          <button
            style={{
              backgroundColor: "#B88E2F",
              color: "#fff",
              padding: "10px 30px",
              fontWeight: "600",
              border: "none",
            }}
          >
            Explore More
          </button>
        </div>

        <div className={inspirationmainpic}>
          <div>
            <p>01- Bed Room </p>
            <h3>Inner Peace</h3>
            <NavLink to={"/"} className={golink}>
              <FaArrowRightLong />
            </NavLink>
          </div>
        </div>
        {/* <Carousel images={carouselpics} /> */}
        <InspireCarousel images={carouselpics} />
      </section>

      {/* Furniture section */}
      <section className={galleryContainSec}>
        <div>
          <p>Share your setup with</p>
          <h2>#FuniroFurniture</h2>
        </div>
        <Gallery />
      </section>
    </React.Fragment>
  );
};

export default Home;
