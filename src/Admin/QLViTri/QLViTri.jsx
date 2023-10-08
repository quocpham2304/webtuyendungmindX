import React, { useEffect, Fragment, useState } from "react";
import { Select, Input, Table, Button, Space, Card, Row, Col, Breadcrumb, Form, Layout } from "antd";
import ModalViTri from "./ModalViTri";
import { apiConstants } from "../../Const/api";
import axios from "axios";
import { Link } from "react-router-dom";
import SuaVitri from "./SuaViTri";
import XoaVitri from "./XoaViTri";
import './QlViTri.css';

const Search = Input.Search;
const initState = {
  selectedRowKeys: [],
};
const { Content } = Layout;
export default function QLViTri() {
  const updateFunction = () => {
    // if (params === "function") ;
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Mã vị trí",
      dataIndex: "ma_vi_tri",
      key: "ma_vi_tri",
    },
    {
      title: "Tên vị trí",
      dataIndex: "ten_vi_tri",
      key: "ten_vi_tri",
    },
    {
      title: "Mô tả",
      dataIndex: "mo_ta",
      key: "mo_ta",
    },

    {
      title: "Thao tác",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button>
            <SuaVitri
            Id={record._id}
            MaViTri={record.ma_vi_tri}
            TenViTri={record.ten_vi_tri}
            MoTa={record.mo_ta}
            updateFunction={updateFunction}
          />
          </Button>
          <XoaVitri MaViTri={record.ma_vi_tri} />
        </Space>
      ),
    },
  ];

  const [danhSachViTri, setDSVT] = useState([]);
  const getDSVT = async () => {
    const res = await axios.get(apiConstants.DANH_SACH_VI_TRI);
    console.log(res);
    setDSVT(res.data.data.danhsach);
  };

  useEffect(() => {
    getDSVT();
  }, [updateFunction]);

  const renderTable = () => {
    return (
      <Table
        columns={columns}
        dataSource={danhSachViTri}
        rowKey={(record) => record.key}
      />
    );
  };
  return (
    <>
      <Row>
        <Breadcrumb>
          <Breadcrumb.Item><Link to={'/admin/dottuyendung'} >Trang chủ</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to={'/admin/quan-li-vi-tri'} >Danh sách vị trí</Link></Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Row>
        <h1 style={{ fontSize: "25px", color: "#191970", marginBottom: "40px", marginTop: "10px" }}>QUẢN LÍ VỊ TRÍ</h1>
      </Row>
      <Row>
        <Col span={10}>
          <Form.Item className="form-input" labelCol={{
            xs: { span: 24 },
            sm: { span: 8 },
          }} >
            <Input placeholder="Tìm kiếm vị trí"/>
            {/* <Search
                size="small"
                placeholder="Tìm kiếm vị trí"
                style={{ width: 200 }}
              /> */}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Button> <ModalViTri onSuccess={getDSVT} /> </Button>
        </Col>
      </Row>
      <Row>
        <Content className="testlist-CTB"
          style={{
            padding: '0 5px',
          }}>
          <Row style={{ marginTop: "30px" }}>
            <Col span={24}>
              {renderTable()}
            </Col>
          </Row>
        </Content>
      </Row>
    </>
  );
}
