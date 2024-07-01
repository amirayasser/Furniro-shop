import PageHeader from "@components/common/layout/header/mainHeader/PageHeader";
import Product from "@components/ecommerce/product/Product";
import { useAppSelector } from "@store/hooks";
import React from "react";
import { NavLink, Table } from "react-bootstrap";

const Profile = () => {
  const { user } = useAppSelector((state) => state.authSlice);
  const { orderList, error, loading } = useAppSelector(
    (state) => state.orderSlice
  );

  console.log('orderList:', orderList);

  const userOrders = orderList.filter((order) => order.userId === user?.id);


  return (
    <div className="profilePage">
      <PageHeader pageName={"Profile"} />

{/* sidebar */}

<ul>
<li><NavLink href="/profile">profile</NavLink> </li>
        <li > <NavLink href="/orders">orders </NavLink></li>
        <li > <NavLink href="/checkout">checkout </NavLink></li>
        <li > <NavLink href="/cart">cart </NavLink></li>
</ul>


    <Table hover bordered  className="m-5 w-50 mx-auto">
      <tbody>
          
        <tr>
          <th>user name</th>
          <td>{user?.name}</td>
        </tr>
        <tr>
          <th>email</th>
          <td>{user?.email}</td>
        </tr>
        {/* <tr>
          <th>total price</th>
            <td>
              ${orderList
                .filter((usr) => usr.userId === user?.id)
                .map((usr) => usr.subtotal?.toFixed(2))}
            </td>
        </tr> */}

          <tr>
            <th>Order</th>
            <td>
              
              {loading === 'pending' ? (
                <p>Loading orders...</p>
              ) : error ? (
                <p>{error}</p>
              ) : userOrders.length > 0 ? (
                <>
                  <p>
                    You have placed {userOrders.length} order{userOrders.length > 1 ? 's' : ''}.
                    To see them, click here: <NavLink to={'/orders'}>View your orders</NavLink>
                  </p>
                  {/* <ul>
                    {userOrders.map((order) => (
                      <li key={order.id}>
                        <p>Order ID: {order.id}</p>
                        <ul>
                          {order.itemsList.map((item) => (
                            <li key={item.id}>{item.title}</li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul> */}
                </>
              ) : (
                <p>You have not placed any orders yet.</p>
              )}
            </td>
          </tr>

      </tbody>
    </Table>
    </div>
  );
};

export default Profile;
