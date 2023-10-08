import { Button, Space, Card, Row, Col, Typography, Divider } from 'antd';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiConstants } from '../../Const/api';

const { Title } = Typography;
const Listtuyendung = (value) => {
    const { Text } = Typography;
    const Navigate = useNavigate();
    const { id } = useParams();
    const [danhSachViTri, setDSVT] = useState([]);
    const getDSVT = async () => {
        const res = await axios.get(apiConstants.CHI_TIET_DOT_TUYEN_DUNG_GAN_NHAT);
        console.log(res);
        let newData = await res.data.data.danhsach[0].vi_tri
        console.log(newData);
        setDSVT(newData);
    };
    useEffect(() => {
        getDSVT();
    }, []);

    return (
        <Space
            id='vi-tri-tuyen-dung'
            direction="vertical"
            size="middle"
            style={{
                display: 'flex',
                paddingBottom: '10px',
            }}>
            <Divider><Title level={2} align="center">Vị trí tuyển dụng</Title></Divider>
            <Row
                gutter={[16, {
                    xs: 8,
                    sm: 16,
                    md: 32,
                    lg: 40,
                }]}
                align="middle"
            >
                {danhSachViTri.map(vi_tri =>
                    <Col span={5}>
                        <Card
                            className='cardvitri'
                            style={{ marginBottom: '10px' }}

                            size="large"
                            align="center">
                            <Col>
                                <Row align="middle">
                                    <Title level={4}>
                                        {vi_tri.ten_vi_tri}
                                    </Title>
                                </Row>
                                <Divider />
                                <Row align="middle">
                                    <Text style={{ fontSize: 18 }} type="secondary">
                                    {vi_tri.mo_ta}
                                    </Text>
                                </Row>
                                <Row align="middle" style={{ paddingTop: '10px' }}>
                                    <Button onClick={() => Navigate(`chittiet/${vi_tri.id_vi_tri}`)}>xem thêm
                                    </Button>
                                </Row>
                            </Col>
                        </Card>
                    </Col>
                )}
            </Row>
            <Divider />
        </Space>
    );
};
export default Listtuyendung;