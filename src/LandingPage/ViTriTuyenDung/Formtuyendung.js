import { Button, Form, Input, InputNumber, message, Upload, notification, Radio } from 'antd';
import { InboxOutlined, PlusOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import axios from "axios";
import { apiConstants } from "../../Const/api";
import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';

const { Dragger } = Upload;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} không đươc đễ trống',
    types: {
        email: '${label} Không hơp lệ',
        number: '${label} Không hơp lệ!',
        Phone: '${label} Không hơp lệ!'
    },
    // number: {
    //     range: '${label} phải trong khoảng từ ${min} đến ${max}',
    // },
    Phone: {
        range: '${label} phải ít nhất 10 chữ số',
    }

};
/* eslint-enable no-template-curly-in-string */

const Formtuyendung = () => {
    const { id } = useParams();
    const [thongTinViTri, setthongTinViTri] = useState();
    const [idDotTuyenDung, setIdDotTuyenDung] = useState()
    const [data, setData] = useState();
    const [api, contextHolder] = notification.useNotification();
    const [form] = useForm();
    const navigate = useNavigate()
    const [danhSachViTri, setDSVT] = useState([]);
    const getCTVT = async (id) => {
        const res = await axios.get(apiConstants.CHI_TIET_VI_TRI(id));
        // console.log(res);
        const chiTietViTri = res.data.data
        form.setFieldsValue({
            ...chiTietViTri,
            id_vi_tri: chiTietViTri.id
        })
        setthongTinViTri(chiTietViTri);
    };
    useEffect(() => {
        if (id) {
            getCTVT(id);
        }
    }, [id]);

    const getDSVT = async () => {
        const res = await axios.get(apiConstants.CHI_TIET_DOT_TUYEN_DUNG_GAN_NHAT);
        console.log(res);
        let newData = await res.data.data.danhsach
        setIdDotTuyenDung(res.data.data.danhsach[0]._id)
        console.log(newData);
        setDSVT(newData);
        // console.log(newData)
        // console.log(res);
        
    };
    useEffect(() => {
        getDSVT();
    }, []);

    const postUngVien = async () => {
        // const body = {
        //     id_vi_tri: thongTinViTri._id,
        //     ho_va_ten: form.getFieldValue('ho_va_ten'),
        //     sdt: form.getFieldValue('sdt'),
        //     email: form.getFieldValue('email'),
        //     nam_sinh: form.getFieldValue('nam_sinh'),
        //     gioi_tinh: form.getFieldValue('gioi_tinh'),
        //     ten_vi_tri: form.getFieldValue('ten_vi_tri'),
        //     file: form.getFieldValue('file'),
        // }
        console.log(idDotTuyenDung);
        const file = form.getFieldValue('file')
        const body = new FormData()
        body.append('id_vi_tri', thongTinViTri._id)
        body.append('id_dot_tuyen_dung', idDotTuyenDung)
        body.append('ho_va_ten', form.getFieldValue('ho_va_ten'))
        body.append('sdt', form.getFieldValue('sdt'))
        body.append('email', form.getFieldValue('email'))
        body.append('nam_sinh', form.getFieldValue('nam_sinh'))
        body.append('gioi_tinh', form.getFieldValue('gioi_tinh'))
        body.append('ten_vi_tri', form.getFieldValue('ten_vi_tri'))
        body.append('file', file, file.name)
        // return console.log(body);
        await axios.post(apiConstants.UNG_TUYEN, body, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then((success) => {
                notification.destroy()
                notification.success({
                    message: 'Nộp đơn ứng tuyển thành công',
                })
                navigate('/')
                
            })
            .catch((error) => {
                notification.destroy()
                notification.error({
                    message: 'Nộp đơn ứng tuyển thất bại',
                })
            })
    }

    return (
        <>
            {contextHolder}
            <Form form={form}
                onFinish={postUngVien}
                {...layout}
                name="nest-messages"
                // onFinish={onFinish}
                style={{
                    maxWidth: 600,
                }}
                validateMessages={validateMessages}
            >
                <Form.Item name='ten_vi_tri' label='Tên vị trí' >
                    <Input name='ten_vi_tri' disabled={id} />
                </Form.Item>
                {/* <Form.Item name='id_vi_tri' label='Mã vị trí' >
                    <Input name='id' disabled={id} />
                </Form.Item> */}
                <Form.Item
                    name='ho_va_ten'
                    label="Họ tên"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name='nam_sinh'
                    label="Năm sinh"
                    rules={[
                        // {
                        //     type: 'number',

                        // },
                        { required: true }
                    ]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    label="Giới tính "
                    name="gioi_tinh"
                    rules={[
                        { required: true }
                    ]}>
                    <Radio.Group>
                        <Radio value="Nam"> Nam </Radio>
                        <Radio value="Nữ"> Nữ </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    name='email'
                    label="Email"
                    rules={[
                        {
                            type: 'email',
                        },
                        { required: true }

                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name='sdt' label="SDT" rules={[
                    {
                        type: 'phone',
                    },
                    { required: true }
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="file"
                    wrapperCol={{
                        ...layout.wrapperCol,
                        offset: 8,
                    }}
                >
                    <Dragger onChange={(info) => form.setFieldValue('file', info.file.originFileObj
                    )} >
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Bấm hoặc kéo tệp vào đây để tải lên</p>
                    </Dragger>

                    <Button type="primary" htmlType="submit" style={{ marginTop: "10px" }}>
                        Nôp đơn ứng tuyển
                    </Button>
                </Form.Item>
                {/* <Form.Item label="Upload" name='file' >
                    <Upload listType="picture-card" name='file'>
                        <div>
                            <PlusOutlined />
                            <div
                                style={{
                                    marginTop: 8,
                                }}
                            >
                                Upload
                            </div>
                        </div>
                    </Upload>
                    <Button type="primary" htmlType="submit" style={{ marginTop: "10px" }}>
                        Nôp đơn ứng tuyển
                    </Button>
                </Form.Item> */}

            </Form>
        </>
    );
};
export default Formtuyendung;