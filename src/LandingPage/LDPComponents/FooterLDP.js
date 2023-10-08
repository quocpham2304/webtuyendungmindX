import { Button, Col, Row, Typography } from "antd"
import { Content } from "antd/es/layout/layout"
import { FacebookFilled, LinkedinFilled, MailFilled,PhoneFilled,ShopFilled  } from '@ant-design/icons';
import Link from "antd/es/typography/Link";


const FooterLDP = () => {
    const { Text, Paragraph } = Typography
    return (
        <Content style={{ height: 250, backgroundColor: 'black' }}>
            <Row>
                <Col span={6} offset={2} style={{ paddingTop: "40px", left: "200px" }} >
                    <img style={{ height: 150, }} src="https://quocpham2304.github.io/webtuyendungmindX/img/logo-a.png" />
                </Col>
                <Col span={6} style={{ paddingTop: "50px" }}>
                    <Row>
                        <Paragraph style={{ color: "white", fontSize: 18 }}>
                        <ShopFilled style={{fontSize: '30px'}} /> Headoffice: 131 Nguyễn Trãi, Phường 2, Quận 5, Hồ Chí Minh
                        </Paragraph>
                    </Row>
                    <Row>
                        <Paragraph style={{ color: "white", fontSize: 18 }}>
                        <PhoneFilled style={{fontSize: '30px'}} /> Điện thoại: 028 3915 1133
                        </Paragraph>
                    </Row>
                    <Row>
                        <Paragraph style={{ color: "white", fontSize: 18 }}>
                        <MailFilled style={{fontSize: '30px'}} /> Email: careers@example.com
                        </Paragraph>
                    </Row>
                </Col>
                <Col span={6} style={{left: "200px", paddingTop: "50px" }}>
                    <Row>
                        <Link href="https://www.facebook.com/" style={{ color: "white", fontSize: 18 }}>
                            <FacebookFilled style={{fontSize: '30px'}} /> Facebook
                        </Link>
                    </Row>
                    <Row>
                        <Link href="https://www.linkedin.com/" style={{ color: "white", fontSize: 18 }}>
                            <LinkedinFilled style={{fontSize: '30px'}} /> Linkedin
                        </Link>
                    </Row>
                </Col>
            </Row>
        </Content>
    )
}

export default FooterLDP