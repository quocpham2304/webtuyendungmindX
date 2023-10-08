import React from "react";
import 'antd/dist/reset.css';
import { Layout, theme, Divider, Row, Col, Typography } from 'antd';
import Formtuyendung from "./Formtuyendung";
import { useParams } from "react-router";
import { useState } from "react";
import { apiConstants } from "../../Const/api";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { DoubleLeftOutlined } from '@ant-design/icons';
import FooterLDP from "../LDPComponents/FooterLDP";
import Menutop from "../LDPComponents/Menutop";


const Tuyendungscreen = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const { id } = useParams();
    const [data, setData] = useState([]);
    const { Title, Text } = Typography;
    const { Header, Content, Footer } = Layout;
    const getCTVT = async (id) => {
        const res = await axios.get(apiConstants.CHI_TIET_VI_TRI(id));
        // console.log(res);
        const chiTietViTri = res.data.data
        setData(chiTietViTri);
    };
    useEffect(() => {
        if (id) {
            getCTVT(id);
        }
    }, [id]);


    return (
        <Layout className="layout">
            <Header>
                <Menutop />
            </Header>
            <Content>
                {/* <Breadcrumbtop /> */}
                <div
                    className="site-layout-content"
                    style={{
                        background: colorBgContainer,
                    }}
                > <Row className="imgheader">
                        <img className='imgheaderbackground' src='../img/8.jpg' />
                        <img className='imgheaderchitiet' src='../img/7.png' />
                        <Row style={{ paddingTop: '10px' }}>
                            <Title
                                level={2}
                                className="titlechitiet "
                                align="center"
                                style={{ color: 'white', fontSize: "30px" }}>
                                Hãy tham gia cùng chúng tôi
                            </Title>
                            <Title
                                level={2}
                                className="titlechitiet "
                                align="center"
                                style={{ color: 'white', paddingTop: "10px" }}>
                                với cương vị là
                                <Title level={2}
                                    style={{ color: 'yellow', paddingTop: "10px" }}>{data.ten_vi_tri}</Title>
                            </Title>
                        </Row>
                    </Row>
                    <Row style={{ paddingTop: '50px', paddingLeft: '50px', background: '#EEEEEE' }}>
                        <Link to={'/webtuyendungmindX'}><DoubleLeftOutlined /> về trang chủ</Link>
                    </Row>
                    <Row style={{ padding: '50px', background: '#EEEEEE' }}>

                        <Col span={12} style={{ background: 'white' }} >
                            <Title level={2} align="center">
                                {data.ten_vi_tri}
                            </Title>
                            <Row style={{ paddingLeft: '50px', paddingTop: '10px' }} >
                                <Col span={5} >
                                    <Text strong > Mã vị trí:</Text>
                                </Col>
                                <Col>
                                    <Text>{data.ma_vi_tri}</Text>
                                </Col>
                            </Row>
                            <Row style={{ paddingLeft: '50px', paddingTop: '10px' }}>
                                <Col span={5}>
                                    <Text strong > Mô tả:</Text>
                                </Col>
                                <Col >
                                    <Text> {data.mo_ta}</Text>
                                </Col>
                            </Row>
                            <Row style={{ paddingLeft: '50px', paddingTop: '10px' }}>
                                <Col span={5}>
                                    <Text strong > Mức lương:</Text>
                                </Col>
                                <Col >
                                    <Text> Thỏa thuận</Text>
                                </Col>
                            </Row>
                            <Row style={{ paddingLeft: '50px', paddingTop: '10px' }}>
                                <Col span={5}>
                                    <Text strong > Địa điểm:</Text>
                                </Col>
                                <Col >
                                    <Text> TP. Hồ Chí Minh</Text>
                                </Col>
                            </Row>
                            <Row style={{ paddingLeft: '50px', paddingTop: '10px' }}>
                                <Col span={5}>
                                    <Text strong > Chi tiết công việc:</Text>
                                </Col>
                                <Col span={19} >
                                    <Text>
                                        <Row>• Mô tả: Trực tiếp tham gia các dự án cho khách hàng, lập trình các sản phẩm HTML với hiệu ứng hiện đại, chuẩn responsive trên các thiết bị từ PC, Desktop, Mobile,...</Row>
                                        <Row>• Cắt HTML, sử dụng HTML5/CSS3, Jquery để làm giao diện , thực hiện các ý tưởng thiết kế, ý tưởng xây dựng của khách hàng</Row>
                                        <Row>• Kiểm thử và nhập liệu mẫu theo đúng dữ liệu mà mình đã cắt html, kiểm tra điều chỉnh lại code nếu có lỗi phát sinh
                                        </Row>
                                    </Text>
                                </Col>
                            </Row>
                            <Row style={{ paddingLeft: '50px', paddingTop: '10px' }}>
                                <Col span={5}>
                                    <Text strong > Yêu cầu ứng viên</Text>
                                </Col>
                                <Col >
                                    <Text>
                                        <Row>• Có ít nhất 2 năm kinh nghiệm với HTML, CSS, JS</Row>
                                        <Row> • Có kinh nghiệm cắt giao diện từ tool design (Figma, Photoshop...)</Row>
                                        <Row>• Có kinh nghiệm làm việc với SCSS, LESS, SASS.</Row>
                                        <Row>• Có kinh nghiệm Javascript, Jquery</Row>
                                        <Row>• Có kinh nghiệm tùy biến giao diện trên nhiều nền tảng trình duyệt web khác nhau (responsive)</Row>
                                        <Row>• Có kinh nghiệm tùy biến file theme của WordPress là lợi thế</Row>
                                        <Row>• Có kinh nghiệm làm việc với template engine (GULP, GRUNT) là điểm cộng.</Row>
                                        <Row>• Biết kỹ năng sử dụng Git
                                        </Row>
                                    </Text>
                                </Col>
                            </Row>
                            <Row style={{ paddingLeft: '50px', paddingTop: '10px' }}>
                                <Col span={5}>
                                    <Text strong > Quyền lợi được hưởng:</Text>
                                </Col>
                                <Col span={19} >
                                    <Text>
                                        <Row>• Luôn được hướng dẫn tư duy Logic nghiệp vụ </Row>
                                        <Row>• Xét lương tối thiểu 1 năm 1 lần và không dưới 10%</Row>
                                        <Row>• Ngày nghỉ: 12 Ngày phép trong năm + Các ngày Lễ/ Tết, Lương tháng 13, Tham gia BHXH, Team building</Row>
                                        <Row>• Các buổi training chuyên sâu kỹ thuật/ kỹ năng mềm định kỳ</Row>
                                        <Row>• Các giải thể thao điện tử định kỳ</Row>
                                        <Row>• Hoạt động bóng đá mỗi thứ 5 hàng tuần</Row>
                                        <Row>• Team Building tối thiểu 1 lần/năm</Row>
                                        <Row>• Làm việc tại một môi trường thoải mái về đồng phục nhưng chuẩn mực về thái độ</Row>
                                        <Row>• Cạnh tranh tại đấu trường Mona E-Sport với các môn thể thao HOT như Counter Strike, PES, Fifa... cùng nhiều giải thưởng hấp dẫn</Row>
                                        <Row>• Hoạt động thể thao, nâng cao sức khỏe thông qua những trận banh siêu kinh điển mỗi tuần</Row>
                                        <Row>• Leader luôn tạo điều kiện học hỏi và phát triển thông qua các buổi Seminar, giúp nâng cao tay nghề, tư duy làm việc chuyên nghiệp</Row>
                                    </Text>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12} style={{ background: 'white' }}>
                            <Divider>Nộp đơn ứng tuyển cho công việc này</Divider>
                            <Formtuyendung />
                        </Col>
                    </Row>
                </div>
            </Content>
            <FooterLDP />
        </Layout>
    )
}
export default Tuyendungscreen;