import React from "react";

// react router dom
import { Outlet } from "react-router-dom";

// import style
import styles from "./MainLayout.module.css";

// import other react components
import MainHeader from "@components/common/layout/header/mainHeader/MainHeader";
import Footer from "@components/common/layout/footer/MainFooter";

// bootstrap
import { Container } from "react-bootstrap";

const { container, wrapper } = styles;

const MainLayout = () => {
  return (
    <Container fluid className={container}>
      {/* header */}
      <MainHeader />

      {/* wrapper */}
      <div className={wrapper}>
        <Outlet />
      </div>

      {/* footer */}
      <Footer />
    </Container>
  );
};

export default MainLayout;
