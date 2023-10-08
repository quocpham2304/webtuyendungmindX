import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Col, DatePicker, Form, Input, Row, Select, Space, message } from 'antd';
import { apiConstants } from '../../Const/api';
import axios from "axios";
import { useEffect, useState } from 'react';
import { Option } from 'antd/es/mentions';
import TextArea from 'antd/es/input/TextArea';
import { useNavigate, useParams } from 'react-router';
import { formatDate } from '../../Const/functions';
import dayjs from 'dayjs';
import './dotTuyenDung.css';
import { Link } from 'react-router-dom';

const EditDotTuyenDung = () => {
    const [viTriList, setViTriList] = useState([])
    const [chiTietDotTuyenDung, setChiTietDotTuyenDung] = useState({})
    const params = useParams()
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const config = {
        rules: [
            {
                type: 'object',
                required: true,
                message: 'Xin chọn thời gian!',
            },
        ],
    };
    const onFinish = async (values) => {
        if(values.ngay_bat_dau > values.ngay_ket_thuc){
            message.error("Ngày bắt đầu phải sớm hơn ngày kết thúc");
            return
        }

        values.ngay_bat_dau = values.ngay_bat_dau.format('YYYY-MM-DD')
        values.ngay_ket_thuc = values.ngay_ket_thuc.format('YYYY-MM-DD')
        values.id_dot_tuyen_dung = params.idDotTuyenDung
        values.vi_tri = values.vi_tri.map(e => {
            let temp = {
                id_dot_tuyen_dung_vi_tri: e.id_dot_tuyen_dung_vi_tri,
                id_dot_tuyen_dung: params.idDotTuyenDung,
                id_vi_tri: e.id_vi_tri,
                so_luong: e.so_luong
            }
            return temp
        })
        console.log('Received values of form:', values);
        try {
            var result = await axios({
                method: "PUT",
                headers: {
                    // Authorization: `Bearer ${token}`,
                },
                url: `${apiConstants.CAP_NHAT_DOT_TUYEN_DUNG}`,
                data: values
            });
        } catch (error) {
            console.log(error.response.data);
            message.error(error.response.data.message);
            return
        }
        if (result.data.status == "true") {
            navigate(`/admin/dottuyendung/chitiet/${params.idDotTuyenDung}`)
        } else {
            console.log(result.data);
            message.error(result.data.message);
        }
    };

    const getViTri = async () => {
        // let token = sessionStorage.getItem("token");
        const res = await axios({
            method: "GET",
            headers: {
                // Authorization: `Bearer ${token}`,
            },
            url: `${apiConstants.DANH_SACH_VI_TRI}`,
            data: null,
        })
        let danhsach = await res.data.data.danhsach
        await setViTriList(danhsach);
    };

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
        if (danhsach) {
            console.log(danhsach);
            danhsach.map(e => e.ngay_bat_dau = dayjs(e.ngay_bat_dau))
            danhsach.map(e => e.ngay_ket_thuc = dayjs(e.ngay_ket_thuc))
            let viTriList = danhsach[0].vi_tri.map(e => {
                return ({
                    id_dot_tuyen_dung: idDotTuyenDung,
                    id_dot_tuyen_dung_vi_tri: e.id_dot_tuyen_dung_vi_tri,
                    id_vi_tri: e.id_vi_tri,
                    so_luong: e.so_luong
                })
            })

            danhsach[0].vi_tri = viTriList
            console.log(danhsach[0]);
            await setChiTietDotTuyenDung(danhsach[0]);
            await form.setFieldsValue(danhsach[0])
        }
    }

    useEffect(() => {
        getViTri()
        getDanhSach(params.idDotTuyenDung)
    }, [])

    return (
        <>
            <Row>
                <Breadcrumb>
                    <Breadcrumb.Item><Link to={'/admin'} >Trang chủ</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to={'/admin/dottuyendung'} >Danh sách đợt tuyển dụng</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to={`/admin/dottuyendung/chitiet/${params.idDotTuyenDung}`} >Chi tiết đợt tuyển dụng</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to={`/admin/dottuyendung/edit/${params.idDotTuyenDung}`} >Chỉnh sửa đợt tuyển dụng</Link></Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <Row>
                <Col span={24}>
                    <h1>CHỈNH SỬA ĐỢT TUYỂN DỤNG</h1>
                </Col>
            </Row>
            <Row>
                <Form
                    name="dynamic_form_nest_item"
                    onFinish={onFinish}
                    form={form}
                    style={{
                        width: "100%"
                        // maxWidth: 600,
                    }}
                    autoComplete="off"
                    initialValues={chiTietDotTuyenDung}
                    layout="vertical"
                >
                    <Row>
                        <Col span={12}>
                            <Form.Item name="ten" label="Tên đợt tuyển dụng" rules={[{ required: true, message: "Thiếu tên đợt tuyển dụng" }]}>
                                <Input />
                            </Form.Item>
                            <Row>
                                <Col span={11}>
                                    <Form.Item name="ngay_bat_dau" label="Ngày bắt đầu" rules={[{ required: true }]} {...config}>
                                        <DatePicker style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>
                                <Col span={11} offset={2}>
                                    <Form.Item name="ngay_ket_thuc" label="Ngày kết thúc" rules={[{ required: true }]} {...config}>
                                        <DatePicker style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item name="mo_ta_khac" label="Mô tả" >
                                <TextArea />
                            </Form.Item>
                        </Col>
                        <Col span={10} offset={1} style={{ paddingTop: "30px" }}>
                            <Form.List name="vi_tri" >
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <Space
                                                key={key}
                                                style={{
                                                    display: 'flex',
                                                    marginBottom: 8,
                                                }}
                                                align="baseline"
                                            >
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'id_vi_tri']}
                                                    style={{ width: "50%", minWidth: 250 }}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Thiếu vị trí tuyển dụng',
                                                        },
                                                    ]}
                                                >
                                                    <Select placeholder="Vị trí tuyển dụng" >
                                                        {viTriList.map((item) => (
                                                            <Option key={item._id} value={item._id}>
                                                                {item.ten_vi_tri}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'so_luong']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Thiếu số lượng',
                                                        },
                                                    ]}
                                                >
                                                    <Input placeholder="Số lượng" type='number'/>
                                                </Form.Item>
                                                <MinusCircleOutlined onClick={() => remove(name)} />
                                            </Space>
                                        ))}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                Thêm vị trí tuyển dụng
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Cập nhật
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

            </Row>
        </>
    )
}

export default EditDotTuyenDung;