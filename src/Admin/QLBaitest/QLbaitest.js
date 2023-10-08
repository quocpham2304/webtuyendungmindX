import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'antd/dist/reset.css';
import {
  Layout, theme, Select, Button,
  DatePicker,
  Form,
  Input,
  Typography, Table, Space, Row, Col, Breadcrumb
} from 'antd';
import { Link, useNavigate } from "react-router-dom";
import './BaiTest.css';
import { pageType } from '../../Const/constant';



const QLBaitest = () => {
  const { Title } = Typography;

  const columns = [
    {
      title: 'Mã bài test',
      dataIndex: 'ma_bai_test',
      key: 'ma_bai_test',
    },
    {
      title: 'Tên bài test',
      dataIndex: 'ten_bai_test',
      key: 'ten_bai_test',
    },
    {
      title: 'Mô tả',
      dataIndex: 'mo_ta',
      key: 'mo_ta',
    },
    {
      title: 'Ngày chỉnh sữa gần nhất',
      dataIndex: 'ngay_chinh_sua_gan_nhat',
      key: 'ngay_chinh_sua_gan_nhat',
      render: (value) => moment(value).format("DD/MM/yyyy")
    },
    {
      title: 'Ngày tạo bài test',
      dataIndex: 'ngay_tao_bai_test',
      key: 'ngay_tao_bai_test',
      render: (value) => moment(value).format("DD/MM/yyyy")
    },
    {
      title: 'Thời lượng',
      dataIndex: 'thoi_luong',
      key: 'thoi_luong',
    },
    {
      title: 'Số điểm tối thiểu',
      dataIndex: 'so_diem_toi_thieu',
      key: 'so_diem_toi_thieu',
    },
    {
      title: 'Vị trí',
      dataIndex: 'vi_tri',
      key: 'vi_tri',
    },
    {
      title: "Thao tác",
      key: 'thao_tac',
      render: (value) => (
        <Space size="middle">
          {/* <a>Invite {record.lastName}</a> */}
          {/* <Xoabaitest 
        onSuccess = { () => getData(keyword,idViTri)}
        id ={value.id}
        ma_bai_test={value.ma_bai_test} /> */}
          <Button type="primary" onClick={() => navigate(`${pageType.chiTiet}/${value.id}`)}>Chi tiết</Button>
        </Space>
      )
    },
  ];
  const navigate = useNavigate()
  const [danhsachvitri, setDanhSachViTri] = useState([]);
  const [data, setData] = useState();
  const [idViTri, setIdViTri] = useState("");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  const getDanhSachViTri = async () => {
    const resp = await axios.get('https://quan-ly-tuyen-dung-be.onrender.com/vitri')
    setDanhSachViTri(resp.data.data.danhsach.map(vitri => ({
      value: vitri._id,
      label: vitri.ten_vi_tri
    })))
  }
  useEffect(() => {
    getDanhSachViTri()
  }, [])
  const getData = async (keyword, idViTri) => {
    keyword = keyword || ""
    idViTri = idViTri || ""
    axios.get(`https://quan-ly-tuyen-dung-be.onrender.com/baitest?term=${keyword}&vitri=${idViTri}`).then(res => {

      setLoading(false)
      let newData = res.data.data.danhsach.map(row => {
        return {
          id: row._id,
          ma_bai_test: row.ma_bai_test,
          ten_bai_test: row.ten_bai_test,
          mo_ta: row.mo_ta,
          ngay_chinh_sua_gan_nhat: row.ngay_chinh_sua_gan_nhat,
          ngay_tao_bai_test: row.ngay_tao_bai_test,
          thoi_luong: row.thoi_luong,
          so_diem_toi_thieu: row.so_diem_toi_thieu,
          vi_tri: row.vi_tri.map(item => <span style={{ border: '1px solid black', margin: '5px', padding: '8px' }}>{item.ten_vi_tri}</span>)
        }
      })
      setData(newData);

    })
  }

  useEffect(() => {
    getData(keyword, idViTri);
  }, [JSON.stringify(tableParams)]);
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };
  const { Content, Footer } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      <Row>
        <Breadcrumb>
          <Breadcrumb.Item><Link to={'/admin/dottuyendung'} >Trang chủ</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to={'/admin/quan-li-bai-test'} >Danh sách bài test</Link></Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Row>
        <Col span={24}>
          <h1 style={{ fontSize: "25px", color: "#191970", marginBottom: "40px", marginTop: "10px" }}>DANH SÁCH BÀI KIỂM TRA</h1>
        </Col>
        <Col span={10}>
          <Form.Item className="form-input" labelCol={{
            xs: { span: 24 },
            sm: { span: 8 },
          }} >
            <Input placeholder="Tìm kiếm bài kiểm tra" onChange={(e) => setKeyword(e.target.value)} />
          </Form.Item>
        </Col>
        {/* <Col span={6}>
          <Form.Item className="form-select" label="Vị trí tuyển dụng" labelCol={{
            xs: { span: 24 },
            sm: { span: 8 },
          }}>
            <Select placeholder="Nhập vị trí" options={danhsachvitri} style={{ width: 300, }} />
          </Form.Item>
        </Col> */}
        <Col span={6}>
          <Form.Item className="form-button" wrapperCol={{
            offset: 2,
            span: 16,
          }} >
            <Button type='primary' onClick={(e) => getData(keyword, idViTri)}  >Tìm Kiếm</Button>
          </Form.Item>
        </Col>
        <Col span={8} style={{ display: "flex", justifyContent: "flex-end" }}>
          <Form.Item className="form-button" labelCol={{
            xs: { span: 24 },
            sm: { span: 8 },
          }} >
            <Button type='primary'  onClick={() => navigate(`${pageType.taoMoi}`)}>+ Tạo mới</Button>
          </Form.Item>
        </Col>
      </Row>
      {/* </Content> */}
      <Content className="testlist-CTB"
        style={{
          padding: '0 5px',
        }}>
        <Row style={{ marginTop: "30px" }}>
          <Col span={24}>
            <Table
              columns={columns}
              // rowKey={(record) => record.login.uuid}
              dataSource={data}
              pagination={tableParams.pagination}
              loading={loading}
              onChange={handleTableChange}
            />
          </Col>
        </Row>
      </Content>
    </>

  );
};
export default QLBaitest;


