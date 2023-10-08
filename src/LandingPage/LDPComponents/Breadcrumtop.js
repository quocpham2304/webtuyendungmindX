import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiConstants } from '../../Const/api';

const Breadcrumbtop = () => {
  const location = useLocation();
  const [danhSachViTri, setDSVT] = useState([]);
  const getDSVT = async (id) => {
    const res = await axios.get(apiConstants.DANH_SACH_VI_TRI);
    console.log(res);
    let newData = res.data.data.danhsach.map(row => {
      return {
        _id: row._id,
        ten_vi_tri: row.ten_vi_tri,
        mo_ta: row.mo_ta,
        ma_vi_tri: row.ma_vi_tri,
      }
    })
    setDSVT(newData);
  };
  useEffect(() => {
    getDSVT();
  }, []);
  return (
    <Breadcrumb
      style={{
        margin: '16px 0',
      }}
    >
      <Breadcrumb.Item>
        <Link
          to={'/'}
          className={location.pathname === "/" ? "breadcrumb-active" : "breadcrumb-not-active"}>Trang chủ
        </Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
      {danhSachViTri.map(danhsach =>
        <Link
          to={`chittiet/${danhsach._id}`}>
          Vị trí tuyển dụng
        </Link>)}
      </Breadcrumb.Item>
    </Breadcrumb>
  )
}
export default Breadcrumbtop;