import React, { useEffect, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Layout, theme, Form, Input, Select, Button,
    Checkbox,
    Row, Col, notification
} from 'antd';
import axios from "axios";
import TextArea from "antd/es/input/TextArea";
import { useForm } from "antd/es/form/Form";
import { Navigate, useNavigate, useParams } from "react-router";
import { pageType } from "../../Const/constant";
import { apiConstants } from "../../Const/api";


const Themmoibaitest = () => {
    const [api, contextHolder] = notification.useNotification();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const Navigate = useNavigate();
    const { id,pageType:currentPageType} = useParams();
    const {Content} = Layout;
    const [danhsachvitri, setDanhSachViTri] = useState([]);
    const [form] = useForm();
    const maBaiKiemtra = Form.useWatch('ma_bai_test', form);
    
    const danhsachcauhoi = Form.useWatch('danhSachCauHoi', form);
    const taoCauHoi = () => {
        const danhSachCauHoi = form.getFieldValue('danhSachCauHoi') ?? [];
        form.setFieldValue('danhSachCauHoi', [...danhSachCauHoi, {
            so_diem_cau_hoi: '',
            noi_dung: '',
            dap_an: ['', '', '', ''],
            dap_an_dung: [],
        }])
    }
    const fetchBaiTest = async (id) => {
        const res = await axios.get(apiConstants.CHI_TIET_BAI_TEST(id) )
        console.log(res);
        const baitest = res.data.data[0]
        
        form.setFieldsValue({
            ...baitest,
            danhSachCauHoi: baitest.cau_hoi
        })
        console.log(baitest);
    }
    const postBaiTest = async () => {
        const danhSachCauHoi = form.getFieldValue('danhSachCauHoi') ?? [];
        const body = {
            ma_bai_test: form.getFieldValue('ma_bai_test'),
            mo_ta: form.getFieldValue('mo_ta'),
            so_diem_toi_thieu: form.getFieldValue('so_diem_toi_thieu'),
            ten_bai_test: form.getFieldValue('ten_bai_test'),
            thoi_luong: form.getFieldValue('thoi_luong'),
            ten_vi_tri: form.getFieldValue('ten_vi_tri'),
            vi_tri: form.getFieldValue('vi_tri'),
            danhSachCauHoi: danhSachCauHoi
        }
        await axios.post(apiConstants.TAO_BAI_TEST, body)
            .then((success) =>{
                notification.destroy()
                notification.success({
                    message: 'Thêm bài test thành công',
                })
                Navigate('/admin/quan-li-bai-test')
            })
            .catch((error) =>{
                notification.destroy()
                notification.error({
                    message: 'Thêm bài test thất bại',
                })
            })
    }
    const putBaiTest = async () => {
        const danhSachCauHoi = form.getFieldValue('danhSachCauHoi') ?? [];
        const body = {
            id_bai_test: id,
            mo_ta: form.getFieldValue('ma_bai_test'),
            so_diem_toi_thieu: form.getFieldValue('so_diem_toi_thieu'),
            ten_bai_test: form.getFieldValue('ten_bai_test'),
            thoi_luong: form.getFieldValue('thoi_luong'),
            ten_vi_tri: form.getFieldValue('ten_vi_tri'),
            vi_tri: form.getFieldValue('vi_tri'),
            cau_hoi: danhSachCauHoi
        }
        await axios.put(apiConstants.CAP_NHAT_BAI_TEST, body)
            .then((success) =>{
                notification.destroy()
                notification.success({
                    message: 'Cập nhật bài test thành công',
                })
                Navigate('/admin/quan-li-bai-test')
            })
            .catch((error) =>{
                notification.destroy()
                notification.error({
                    message: 'Cập nhật bài test thất bại',
                })})
    }
    const getDanhSachViTri = async () => {
        const resp = await axios.get(apiConstants.DANH_SACH_VI_TRI)
        setDanhSachViTri(resp.data.data.danhsach.map(vitri => ({ value: vitri._id, label: vitri.ten_vi_tri })))
    }
    useEffect(() => {
        getDanhSachViTri()
    }, [])
    useEffect(() => {
        if (id) {
            fetchBaiTest(id);
        }
    }, [id])
  
    
    return (
        <>
            {contextHolder}
            <Content
                style={{
                    padding: '0 5px',
                }}>
                <Row>
                    <Col span={24}>
                        <h1 style={{ fontSize: "25px", color: "#191970", marginBottom: "40px", marginTop: "10px" }}>{pageType.chiTiet == currentPageType ? 'CHI TIẾT BÀI KIỂM TRA' : 'TẠO MỚI BÀI KIỂM TRA'}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col span={11}>
                        <Form form={form}
                        // onFinish={pageType.chiTiet == currentPageType ? putBaiTest : postBaiTest }
                         >
                            <Row>
                                <Col span={24} style={{ paddingBottom: 10 }} >
                                    <Form.Item label="Mã bài kiểm tra" rules={[{ required: true, message: '${label} không được để trống', },]} name='ma_bai_test' >
                                        <Input placeholder="Nhập mã bài kiểm tra" name='ma_bai_test' disabled={id} />
                                    </Form.Item>
                                </Col>
                                <Col span={24} style={{ paddingBottom: 10 }}>
                                    <Form.Item label="Tên bài kiểm tra" rules={[{ required: true, message: '${label} không được để trống' },]} name='ten_bai_test'>
                                        <Input placeholder="Nhập tên bài kiểm tra" name='ten_bai_test' />
                                    </Form.Item>
                                </Col>
                                <Col span={24} style={{ paddingBottom: 10 }}>
                                    <Form.Item label="Mô tả" rules={[{ required: true, message: '${label} không được để trống' },]} name='mo_ta'>
                                        <TextArea placeholder="nhập mô tả" name='mo_ta' />
                                    </Form.Item>
                                </Col>
                                <Col span={24} style={{ paddingBottom: 10 }}>
                                    <Form.Item label="Vị Trí" rules={[{ required: true, message: '${label} không được để trống' },]} name='vi_tri'>
                                        <Select placeholder="Nhập vị trí" mode="multiple" options={danhsachvitri} />
                                    </Form.Item>
                                </Col>
                                <Col span={24} style={{ paddingBottom: 10 }}>
                                    <Form.Item label="Điểm số tối thiểu" name='so_diem_toi_thieu' rules={[
                                        {
                                            required: true,
                                            message: '${label} phải là 1 số'
                                        },
                                    ]}>
                                        <Input placeholder="nhập điểm" name='so_diem_toi_thieu' />
                                    </Form.Item>
                                </Col>
                                <Col span={24} style={{ paddingBottom: 10 }}>
                                    <Form.Item label="Thời lượng" name='thoi_luong' rules={[{ required: true, message: '${label} không được để trống' },]} >
                                        <Input placeholder="nhập thời lượng" name='thoi_luong' />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                    <Col span={12} offset={1}>
                        <Form form={form}  >
                            {(fields, { remove }) => (
                                <Row>
                                    <Form.Item name={'danhSachCauHoi'} hidden ></Form.Item>

                                    {danhsachcauhoi && danhsachcauhoi.map((cauhoi, index) => 
                                    <Row>
                                        
                                        <Col span={24}>
                                            <b>CÂU HỎI SỐ {index + 1}</b>
                                            
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item
                                                {...cauhoi} 
                                                name={['danhSachCauHoi', index, 'noi_dung']}
                                                rules={[{
                                                    required: true,
                                                    message: 'Nội dung câu hỏi không được để trống'
                                                },]}>
                                                <TextArea placeholder="nhập nội dung câu hỏi" />
                                                {/* <MinusCircleOutlined onClick={() => remove(cauhoi.name)} /> */}
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item
                                                // label="Điểm số" 
                                                name={['danhSachCauHoi', index, 'so_diem_cau_hoi']}
                                                rules={[{
                                                    required: true,
                                                    message: 'Điểm số không được để trống'
                                                },]}>
                                                <Input placeholder="số điểm câu hỏi" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item name={['danhSachCauHoi', index, 'dap_an_dung']}>
                                                <Checkbox.Group>
                                                    <Row gutter={[0, 16]}>
                                                        {cauhoi.dap_an.map((dap_an, index_dap_an) => <Col span={24} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                            <Checkbox name="dap_an_dung" value={index_dap_an} />
                                                            <Form.Item
                                                                // label="Đáp án" 
                                                                name={['danhSachCauHoi', index, 'dap_an', index_dap_an]}
                                                                rules={[{
                                                                    required: true, message: 'Đáp án không được để trống'
                                                                },]}
                                                                className={'nhapnoidungdapan'}>
                                                                <Input placeholder="nhập vào đáp án" name="dap_an" />
                                                            </Form.Item>
                                                        </Col>)}
                                                    </Row>
                                                </Checkbox.Group>
                                                
                                            </Form.Item>
                                        </Col>
                                    </Row>)}
                                    <Col span={24}>
                                        <Button type="dashed" onClick={taoCauHoi} name='danhSachCauHoi' block icon={<PlusOutlined />}> Tạo mới câu hỏi </Button>
                                    </Col>
                                    
                                    <Col span={6}>
                                        {pageType.chiTiet == currentPageType ?
                                            <Button
                                                htmlType="button"
                                                onClick={putBaiTest}
                                                > Cập nhật
                                            </Button> :
                                            <Button
                                                htmlType="button"
                                                onClick={postBaiTest}
                                                > Tạo mới
                                            </Button>}
                                    </Col>
                                </Row>
                            )}
                        </Form>
                    </Col>
                </Row>
            </Content>
        </>
    );
};

export default Themmoibaitest;
