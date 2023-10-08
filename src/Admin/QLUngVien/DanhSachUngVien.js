import { Breadcrumb, Button, Col, DatePicker, Form, Input, InputNumber, Popconfirm, Row, Select, Table, Typography, Upload, message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { apiConstants } from '../../Const/api';
import './ungVien.css'
import { Option } from 'antd/es/mentions';
import dayjs from 'dayjs';
import { Link, useNavigate } from 'react-router-dom';
const originData = [];
for (let i = 0; i < 100; i++) {
    originData.push({
        key: i.toString(),
        name: `Edward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
    });
}
const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const renderInputType = (inputType, record) => {
        switch (inputType) {
            case 'email':
                return (<Input type='email' />)
            case 'text':
                return (<Input type='text' />)
            case 'trang_thai':
                return (
                    <Select
                        defaultValue=''
                        options={[
                            { value: 'Đang ứng tuyển', label: 'Đang ứng tuyển' },
                            { value: 'Đã lưu lại hồ sơ', label: 'Đã lưu lại hồ sơ' },
                            { value: 'Xác nhận vị trí', label: 'Xác nhận vị trí' },
                            { value: 'Từ chối vị trí', label: 'Từ chối vị trí' },
                        ]}
                    />
                )
        }
    }

    const inputNode = renderInputType(inputType, record)
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};
const DanhSachUngVien = () => {
    const [danhSachUngVien, setDanhSachUngVien] = useState([])
    const [form] = Form.useForm();
    const [searchTerm, setSearchTerm] = useState('')
    const [data, setData] = useState(originData);
    const navigate = useNavigate()
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record._id == editingKey;
    const edit = (record) => {
        let temp = record

        form.setFieldsValue({
            ...temp,
        });

        setEditingKey(record._id);
    };
    const cancel = (record) => {
        let temp = record
        form.setFieldsValue({
            ...temp,
        });
        setEditingKey('');
    };
    const save = async (key, record) => {
        try {
            console.log(record);
            const row = await form.validateFields();
            console.log(row);
            row._id = record?._id

            const res = await axios({
                method: "PUT",
                headers: {
                    // Authorization: `Bearer ${token}`,
                },
                url: `${apiConstants.CAP_NHAT_THONG_TIN_UNG_VIEN}`,
                data: row,
            })

            console.log(res);
            if (res.data.status == "true") {
                getDanhSach(searchTerm)
            }
            setEditingKey('');
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const onFinish = (values) => {
        console.log(values.searchTerm);
        setSearchTerm(values.searchTerm)
        getDanhSach(values.searchTerm)
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    const columns = [
        {
            title: 'Họ và tên',
            dataIndex: 'ho_va_ten',
            editable: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            editable: true,
        },
        {
            title: 'SĐT',
            dataIndex: 'sdt',
            editable: true,
        },
        {
            title: 'Giới tính',
            dataIndex: 'gioi_tinh',
            editable: true,
        },
        {
            title: 'Năm sinh',
            dataIndex: 'nam_sinh',
            editable: true,
        },
        {
            title: 'CV',
            dataIndex: 'cv',
            key: 'cv',
            render: (_, record) => {
                const handleClick = () => {
                    window.open(record.cv)
                }
                return (
                    <>
                        {(record.cv) ? (<a onClick={handleClick}>Xem CV</a>) : <div>None</div>}
                    </>
                )
            }
            ,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'trang_thai',
            editable: true,
        },
        {
            title: 'Thao tác',
            dataIndex: 'thao_tac',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key, record)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Bạn có chắc muốn hủy?" onConfirm={() => cancel(record)}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: checkInputType(col.dataIndex),
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const checkInputType = (dataIndex) => {
        switch (dataIndex) {
            case 'email':
                return 'email'
            case 'trang_thai':
                return 'trang_thai'
            default:
                return 'text'
        }
    }

    const getDanhSach = async (searchTerm) => {
        // let token = sessionStorage.getItem("token");
        const res = await axios({
            method: "GET",
            headers: {
                // Authorization: `Bearer ${token}`,
            },
            url: `${apiConstants.DANH_SACH_THONG_TIN_UNG_VIEN}?term=${searchTerm}`,
            data: null,
        })

        console.log(res);

        if (res.data.status == "false") {
            message.error("Không tìm thấy danh sách ứng viên tương ứng")
            setDanhSachUngVien([])
            return
        }
        let danhsach = await res.data.data.danhsach
        await setDanhSachUngVien(danhsach);
    };

    useEffect(() => {
        getDanhSach(searchTerm)
    }, [])

    return (
        <>
            <Row>
                <Breadcrumb>
                    <Breadcrumb.Item><Link to={'/admin/dottuyendung'} >Trang chủ</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to={'/admin/ungvien'} >Danh sách ứng viên</Link></Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <Row>
                <Col span={24}>
                    <h1 style={{ fontSize: "25px", color: "#191970", marginBottom: "40px", marginTop: "10px" }}>DANH SÁCH ỨNG VIÊN</h1>
                </Col>
            </Row>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}

                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Row>
                    <Col span={10}>
                        <Form.Item
                            name="searchTerm"
                            style={{ width: "100% !important" }}
                            wrapperCol={{
                                sm: 23
                            }}
                        >
                            <Input placeholder="Từ khóa tìm kiếm" style={{ width: "100% !important" }} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                        >
                            <Button type="primary" htmlType="submit" >
                                Tìm kiếm
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Row style={{ marginTop: "30px" }}>
                <Col span={24}>
                    <Form form={form} component={false} >
                        <Table
                            components={{
                                body: {
                                    cell: EditableCell,
                                },
                            }}
                            bordered
                            dataSource={danhSachUngVien}
                            className='table-yeu-cau-ung-tuyen'
                            columns={mergedColumns}
                            rowClassName="editable-row"
                            pagination={{
                                onChange: cancel,
                            }}
                        />
                    </Form>
                </Col>
            </Row>
        </>

    );
};
export default DanhSachUngVien;