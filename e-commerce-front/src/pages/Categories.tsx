import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetCateg } from "@store/categories/categoriesSlice";
import { Col, Container, Row } from "react-bootstrap";
import { useEffect } from "react";

const Categories = () => {
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector(
    (state) => state.categories
  );
  useEffect(() => {
    dispatch(actGetCateg());
  }, [dispatch]);

  const categoriesList =
    records.length > 0
      ? records.map((record) => {
          return (
            <Col key={record.id}>
              <div>{record.title}</div>
              <img src={record.img} alt={record.title} />
            </Col>
          );
        })
      : "there are no categories";

  return (
    <Container>
      <Row>{categoriesList}</Row>
    </Container>
  );
};

export default Categories;