import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers, getInventory } from "../../API";

function Customers() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getCustomers().then((res) => {
      setDataSource(res.users);
      setLoading(false);
    });
  }, []);

  return (
    // 
    <>
    </>
  );
}
export default Customers;
