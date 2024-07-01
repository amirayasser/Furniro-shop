import styles from "./breadcramps.module.css";
import { Breadcrumb, BreadcrumbItem } from "react-bootstrap";

const { breadcrumb, bcitem } = styles;

const Breadcramps = ({ bcItems }) => {
  return (
    <Breadcrumb className={breadcrumb}>
      <BreadcrumbItem className={bcitem} href="/">
        Home
      </BreadcrumbItem>
      {bcItems.map((item, index) => (
        <BreadcrumbItem
          className={bcitem}
          active={index === bcItems.length - 1}
          key={index} // Use index as the key
          href={item.href}
        >
          {item.label}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default Breadcramps;
