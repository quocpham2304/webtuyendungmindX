import 'antd/dist/reset.css';
import { Breadcrumb, Layout, Menu, theme, Row, Button, Typography } from 'antd';
import React from 'react';
import Aboutus from './LDPComponents/Aboutus';
import Listtuyendung from './ViTriTuyenDung/Listtuyendung';
import Footerslider from './LDPComponents/Footerslider';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import FooterLDP from './LDPComponents/FooterLDP';
import Menutop from './LDPComponents/Menutop';



const LandingPage = () => {
    const { Header, Content, Footer } = Layout;
    const { Title } = Typography;
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout className="layout">
            <Header>
                {/* <div className="logo" /> */}
                <Menutop />
            </Header>
            <Content>
                <div
                    id='top'
                    className="site-layout-content"
                    style={{
                        background: colorBgContainer,
                    }}>
                    <Row className="imgheader">
                        <img className='imgheaderbackground' src='https://quocpham2304.github.io/webtuyendungmindX/img/8.jpg' />
                        <img className='imgheaderchitiet' src='https://quocpham2304.github.io/webtuyendungmindX/img/7.png' />
                        <Row style={{ paddingTop: '10px' }}>
                            <Title
                                level={2}
                                className="titlechitiet "
                                align="center"
                                style={{ color: 'white', fontSize: "50px" }}>
                                Hãy tham gia cùng chúng tôi
                            </Title>
                            <Title
                                level={2}
                                className="titlechitiet "
                                align="center"
                                style={{ color: 'white', paddingTop: "30px" }}>
                                Hơn 10.000 vị trí đang chờ bạn
                            </Title>
                            <Button
                                className="Buttonchitiet"
                                align="center">
                                <HashLink
                                    to='/#vi-tri-tuyen-dung'
                                    scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'end' })}>
                                    Xem ngay
                                </HashLink>
                            </Button>
                        </Row>
                    </Row>
                    <Aboutus />
                    <Listtuyendung />
                    <Footerslider />
                </div>
            </Content>
            <FooterLDP />
        </Layout>

    );
};
export default LandingPage;