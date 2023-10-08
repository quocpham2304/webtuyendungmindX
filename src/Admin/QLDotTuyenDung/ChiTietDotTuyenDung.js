import { Breadcrumb, Button, Col, Form, Input, Row, Space, Table, Tabs, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { apiConstants } from "../../Const/api";
import axios from "axios";
import { formatDate } from "../../Const/functions";
import './dotTuyenDung.css'
import YeuCauUngTuyen from "./ungVienDotTuyenDung";
import { Link } from "react-router-dom";

const ChiTietDotTuyenDung = () => {
    const params = useParams()
    const [form] = Form.useForm();
    const [chiTietDotTuyenDung, setChiTietDotTuyenDung] = useState({})
    const [danhSachUngVien, setDanhSachUngVien] = useState([])
    const navigate = useNavigate()
    const columns = [
        {
            title: 'Tên vị trí',
            dataIndex: 'ten_vi_tri',
            key: 'ten_vi_tri',
        },
        {
            title: 'Số lượng',
            dataIndex: 'so_luong',
            key: 'so_luong',
        }
    ];
    const columnsUngVien = [
        {
            title: 'Họ và tên',
            dataIndex: ['ung_vien', 'ho_va_ten'],
            key: ['ung_vien', 'ho_va_ten'],
        },
        {
            title: 'Trạng thái',
            dataIndex: ['ung_vien', 'trang_thai'],
            key: ['ung_vien', 'trang_thai'],
        },
        {
            title: 'SĐT',
            dataIndex: ['ung_vien', 'sdt'],
            key: ['ung_vien', 'sdt'],
        },
        {
            title: 'CV',
            dataIndex: ['ung_vien', 'cv'],
            key: ['ung_vien', 'cv'],
            render: (_, record) => {
                const fileList = [
                    {
                        uid: '-1',
                        name: record.ung_vien.cv ? "Download" : "None",
                        status: 'done',
                        url: record.ung_vien.cv,
                    },
                ]
                return (<Upload fileList={fileList}>
                    {/* <Button icon={<UploadOutlined />}></Button> */}
                </Upload>)
            }
            ,
        },
        {
            title: 'Thời gian test',
            dataIndex: ['ung_vien', 'thoi_gian_lam_test'],
            key: ['ung_vien', 'thoi_gian_lam_test'],
        },
        {
            title: 'Kết quả test',
            dataIndex: ['ung_vien', 'diem_lam_test_dau_vao'],
            key: ['ung_vien', 'diem_lam_test_dau_vao'],
        },
        {
            title: 'Thời gian phỏng vấn',
            dataIndex: ['ung_vien', 'thoi_gian_pv'],
            key: ['ung_vien', 'thoi_gian_pv'],
        },
        {
            title: 'Hình thức phỏng vấn',
            dataIndex: ['ung_vien', 'hinh_thuc_pv'],
            key: ['ung_vien', 'hinh_thuc_pv'],
        },
        {
            title: 'Kết quả phỏng vấn',
            dataIndex: ['ung_vien', 'ket_qua_pv'],
            key: ['ung_vien', 'ket_qua_pv'],
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Button type="primary" onClick={() => navigate(`chitiet/${record._id}`)}>
                    Edit
                </Button>
            ),
        },
    ];
    const dotTuyenDungComponent = (
        <>
            <Row>
                <Col span={12}>
                    <Row style={{ margin: "20px 0px" }}>
                        <Col span={10}><b>Tên đợt tuyển dụng:</b></Col>
                        <Col span={12}>{chiTietDotTuyenDung.ten}</Col>
                    </Row>
                    <Row style={{ margin: "20px 0px" }}>
                        <Col span={10}><b>Ngày bắt đầu:</b></Col>
                        <Col span={12}>{chiTietDotTuyenDung.ngay_bat_dau}</Col>
                    </Row>
                    <Row style={{ margin: "20px 0px" }}>
                        <Col span={10}><b>Ngày kết thúc:</b></Col>
                        <Col span={12}>{chiTietDotTuyenDung.ngay_ket_thuc}</Col>
                    </Row>
                    <Row style={{ margin: "20px 0px" }}>
                        <Col span={10}><b>Mô tả:</b></Col>
                        <Col span={12}>{chiTietDotTuyenDung.mo_ta_khac}</Col>
                    </Row>
                    <Row style={{ margin: "30px 0px" }}>
                        <Button onClick={() => navigate(`/admin/dottuyendung/edit/${params.idDotTuyenDung}`)}>Chỉnh sửa đợt tuyển dụng</Button>
                    </Row>
                </Col>
                <Col span={9} offset={2}>
                    <Table columns={columns} dataSource={chiTietDotTuyenDung.vi_tri} />
                </Col>
            </Row>
        </>
    )
    const ungVienComponent = (
        <>
            <Row>
                <Col span={24}>
                    <YeuCauUngTuyen idDotTuyenDung={params.idDotTuyenDung} />
                </Col>
            </Row>
            {/* <Row>
                <Col span={12}>
                    <Row style={{ margin: "20px 0px" }}>
                        <Col span={10}>Tên đợt tuyển dụng:</Col>
                        <Col span={12}>{chiTietDotTuyenDung.ten}</Col>
                    </Row>
                    <Row style={{ margin: "20px 0px" }}>
                        <Col span={10}>Ngày bắt đầu:</Col>
                        <Col span={12}>{chiTietDotTuyenDung.ngay_bat_dau}</Col>
                    </Row>
                    <Row style={{ margin: "20px 0px" }}>
                        <Col span={10}>Ngày kết thúc:</Col>
                        <Col span={12}>{chiTietDotTuyenDung.ngay_ket_thuc}</Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Table columns={columnsUngVien} dataSource={danhSachUngVien} style={{ marginTop: "30px" }} />
            </Row> */}
        </>
    )
    const onChange = (key) => {
    };
    const items = [
        {
            key: '1',
            label: `Thông tin đợt tuyển dụng`,
            children: dotTuyenDungComponent,
        },
        {
            key: '2',
            label: `Danh sách ứng viên`,
            children: ungVienComponent,
        }
    ];

    const getDanhSach = async (idDotTuyenDung) => {
        // let token = sessionStorage.getItem("token");
        const res = await axios({
            method: "GET",
            headers: {
                // Authorization: `Bearer ${token}`,
            },
            url: `${apiConstants.CHI_TIET_DOT_TUYEN_DUNG}/${idDotTuyenDung}`,
            data: null,
        })
        let danhsach = await res.data.data.danhsach
        danhsach.map(e => e.ngay_bat_dau = formatDate(e.ngay_bat_dau))
        danhsach.map(e => e.ngay_ket_thuc = formatDate(e.ngay_ket_thuc))
        await setChiTietDotTuyenDung(danhsach[0]);
    }

    const getUngVien = async (idDotTuyenDung) => {
        // let token = sessionStorage.getItem("token");
        const res = await axios({
            method: "GET",
            headers: {
                // Authorization: `Bearer ${token}`,
            },
            url: `${apiConstants.DANH_SACH_UNG_VIEN}?term=&iddottuyendung=${idDotTuyenDung}`,
            data: null,
        })
        let danhsach = await res.data.data.danhsach
        await setDanhSachUngVien(danhsach);
    }

    useEffect(() => {
        getDanhSach(params.idDotTuyenDung)
        getUngVien(params.idDotTuyenDung)
    }, [])
    return (
        <>
            <Row>
                <Breadcrumb>
                    <Breadcrumb.Item><Link to={'/admin'} >Trang chủ</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to={'/admin/dottuyendung'} >Danh sách đợt tuyển dụng</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to={`/admin/dottuyendung/chitiet/${params.idDotTuyenDung}`} >Chi tiết đợt tuyển dụng</Link></Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <Row>
                <h1>CHI TIẾT ĐỢT TUYỂN DỤNG</h1>
            </Row>
            <Tabs defaultActiveKey="1" items={items} type="card" onChange={onChange} colorBorder={"#1677ff"}/>
        </>
    )
}

export default ChiTietDotTuyenDung;