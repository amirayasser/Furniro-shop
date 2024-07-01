import PageHeader from "@components/common/layout/header/mainHeader/PageHeader";
import { useAppSelector } from "@store/hooks";
import { useState } from "react";
import { Accordion, Table } from "react-bootstrap";
import logo from "@assets/Meubel House_Logos-05.png";

const OrdersBills = () => {
  const { user } = useAppSelector((state) => state.authSlice);
  const { orderList, error } = useAppSelector(
    (state) => state.orderSlice
  );
  const billingFormData = useAppSelector(
    (state) => state.checkoutSlice.billingData
  );


  const userOrders = orderList.filter((order) => order.userId === user?.id);

  console.log("your orders bills:", userOrders);

  const descUsOrders = userOrders.sort((a, b) => {
    return b.id - a.id;
  });

  const userBillingData = billingFormData.filter(
    (bfd) => bfd.userId === user?.id
  );

  console.log("userBillingData", userBillingData);

  const urOrderItemsList = userOrders.flatMap((order) => order.itemsList);

  console.log("urOrderItemsList", urOrderItemsList);

  const [activeKey, setActiveKey] = useState(null);

  const handleAccordionClick = (eventKey) => {
    setActiveKey(activeKey === eventKey ? null : eventKey);
  };

  return (
    <div className="OrdersPage">
      <PageHeader pageName={"Orders Bills"} />
      <div className="ms-5 mt-5 ">

        <h2>Welcome {' '}
          <span style={{ color: '#B88E2F' }}>
            {user?.name}
          </span>
        </h2>

        {userOrders.length > 0 &&

          <p>you placed <mark>  {userOrders?.length}</mark> orders
            <br />
            click on it to see the order bill
          </p>
        }
      </div>

      {userOrders.length > 0 ? (
        <Accordion
          activeKey={activeKey}
          style={{
            width: "70%",
            marginInline: "auto",
            marginTop: "50px",
            marginBottom: "50px",
          }}
        >
          {descUsOrders.map((urOrder, index) => {
            const globalOrderIndex = orderList.findIndex(order => order.id === urOrder.id);
            const salesOrderNo = `SO-${globalOrderIndex + 1}`;
            return userBillingData.map((ubd) => {
              if (ubd.id === urOrder.id) {
                return (
                  <Accordion.Item eventKey={index.toString()} key={index}>
                    <Accordion.Header onClick={() => handleAccordionClick(index.toString())}>Order No {userOrders.length - index}</Accordion.Header>
                    <Accordion.Body className="bill  my-5 mx-auto p-4  m-2">
                      <h2 className="text-center mb-4 ">
                        Purchase Order
                      </h2>

                      <Table className="topTable">

                        <tbody>
                          <tr>
                            <td className="fs-3 mb-3 d-flex align-items-center fw-bold gap-2">
                              <img src={logo} alt="logo" />
                              Furniro
                            </td>
                            <td>
                              <td>PO #</td>
                              <td>{userOrders.length - index}</td>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <td>address:</td>
                              <td>{ubd.address}</td>
                            </td>
                            <td>
                              <td>Purchase Date:</td>
                              <td>
                                {urOrder.orderDate ? (
                                  <>
                                    {urOrder.orderDate.date} <br />{" "}
                                    {urOrder.orderDate.time}
                                  </>
                                ) : (
                                  ""
                                )}
                              </td>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <td>city:</td>
                              <td>{ubd.city}</td>
                            </td>
                            <td>
                              <td>sales order No. </td>
                              <td>{salesOrderNo}</td>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <td>zipCode: </td>
                              <td> {ubd.zipCode}</td>
                            </td>
                            <td>
                              <td>client No. </td>
                              <td>{urOrder.id}</td>
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <td>phone:</td>
                              <td>{ubd.phone}</td>
                            </td>
                            <td>
                              <td>client Name:</td>
                              <td>
                                {ubd.firstName} {ubd?.lastName}
                              </td>
                            </td>
                          </tr>
                        </tbody>
                      </Table>

                      <Table className="prodsTable">
                        <thead>
                          <tr>
                            <th>Item #</th>
                            <th>Name</th>
                            <th>Unit Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          {urOrder.id &&
                            urOrder.itemsList.map((item, itemIndex) => (
                              <tr key={item.id}>
                                <td>{itemIndex + 1}</td>
                                <td className="text-start">{item.title}</td>
                                <td>{item.price.toFixed(2)}</td>
                                <td>{item.quantity}</td>
                                <td> $ {(item.price * item?.quantity).toFixed(2)}</td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                      <Table
                        className=" ms-auto me-0"
                        style={{
                          width: "32.7%",
                          border: "1px solid black",
                        }}
                      >
                        <thead>
                          <tr>
                            <th
                              colSpan={2}
                              className="text-center bg-dark text-bg-dark"
                            >
                              total
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>subtotal</td>
                            <td>{urOrder.subtotal.toFixed(2)}</td>
                          </tr>
                          <tr>
                            <td>tax</td>
                            <td>14%</td>
                          </tr>
                          {ubd.address && (
                            <tr>
                              <td>shipping</td>
                              <td>100.00</td>
                            </tr>
                          )}
                          <tr>
                            <td>total</td>
                            <td className="billTotPrice">
                              $ {(ubd.address
                                ? 100 + urOrder.subtotal * 1.14
                                : urOrder.subtotal * 1.14
                              ).toFixed(2)}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Accordion.Body>
                  </Accordion.Item>
                );
              }
            });
          })}
        </Accordion>
      ) : (
        <p
        className="text-center my-5 fw-bold fs-6 "
        >{error?.message || "You have not placed an order yet"}</p>
      )}
    </div>
  );
};

export default OrdersBills;