import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Col, DatePicker, Form, Input, Row, Select, Space, message } from 'antd';
import { apiConstants } from '../../Const/api';
import axios from "axios";
import { useEffect, useState } from 'react';
import { Option } from 'antd/es/mentions';
import TextArea from 'antd/es/input/TextArea';
import { useNavigate } from 'react-router';
import './dotTuyenDung.css';
import { Link } from 'react-router-dom';
import moment from 'moment';

const TaoDotTuyenDung = () => {
    const [viTriList, setViTriList] = useState([])
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
        console.log('Received values of form:', values);
        try {
            var result = await axios({
                method: "POST",
                headers: {
                    // Authorization: `Bearer ${token}`,
                },
                url: `${apiConstants.TAO_DOT_TUYEN_DUNG}`,
                data: values
            });
        } catch (error) {
            console.log(error.response.data.message);
            message.error(error.response.data.message);
            return
        }
        if (result.data.status == "true") {
            navigate("/admin/dottuyendung")
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
        console.log(danhsach);
        await setViTriList(danhsach);
    };

    useEffect(() => {
        getViTri()
    }, [])

    return (
        <>
            <Row>
                <Breadcrumb>
                    <Breadcrumb.Item><Link to={'/admin'} >Trang chủ</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to={'/admin/dottuyendung'} >Danh sách đợt tuyển dụng</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to={'/admin/dottuyendung/create'} >Tạo đợt tuyển dụng</Link></Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <Row>
                <Col span={24}>
                    <h1>TẠO ĐỢT TUYỂN DỤNG</h1>
                </Col>
            </Row>
            <Row>
                <Form
                    name="dynamic_form_nest_item"
                    onFinish={onFinish}
                    style={{
                        width: "100%"
                        // maxWidth: 600,
                    }}
                    autoComplete="off"
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
                                                    <Select placeholder="Vị trí tuyển dụng">
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
                                                    <Input placeholder="Số lượng" />
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
                                    Submit
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

            </Row>
        </>
    )
}

export default TaoDotTuyenDung;