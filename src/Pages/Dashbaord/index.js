import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
  
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers, getInventory, getOrders, getRevenue } from "../../API";
import Rating from "../../Components/Ratting/Rating";
import Chat from "../../Components/Chat/Chat";

import VideoChat from "../../Components/video/VideoChat";
import Lobby from "../../Components/video/lobby"





import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



function Dashboard() {
  const [orders, setOrders] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    getOrders().then((res) => {
      setOrders(res.total);
      setRevenue(res.discountedTotal);
    });
    getInventory().then((res) => {
      setInventory(res.total);
    });
    getCustomers().then((res) => {
      setCustomers(res.total);
    });
  }, []);
  



  

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Dashboard</Typography.Title>
     
      <Space>
        <RecentOrders />
        <DashboardChart />
      </Space>
    </Space>
  );
}

function DashboardCard() {
  return (
   
    <>
    </>
  );
}
function RecentOrders() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCalled, setIsCalled] = useState(false);

  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      setDataSource(res.products.splice(0, 3));
      setLoading(false);
    });
  }, []);

 

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const roomId = urlParams.get('room');
      
  return (
    <>
    <div className="SideMenuAndPageContent">
      <div className="VideoSection">
      
        {roomId ? <VideoChat /> : <Lobby />}
      </div>
      <div className="ChatSection">
        <h1>Interviewer-Student Chat</h1>
        <Chat />
      </div>
      <div className="ReviewSection">
        <h1>Review Section</h1>
        <Rating />
      </div>
    </div>
  </>
);

    
 }  



function DashboardChart() {
 

  return (
    <>
    </>
   
  );
}
export default Dashboard;
