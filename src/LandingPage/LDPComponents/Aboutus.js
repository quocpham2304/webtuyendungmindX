import { Space, Card, Row, Col } from 'antd';
import { Typography } from 'antd';

const { Title, Text } = Typography;
const Aboutus = () => (

    <Space className='aboutus'
        direction="vertical"
        size="middle"
        style={{
            display: 'block',
            paddingBottom: '10px',
        }}>
        <Title level={2} align="center" style={{color:'white'}}>Về Chúng Tôi</Title>
        <Row gutter={16} align="middle" style={{paddingTop:'50px'}}>
            <Col span={6}>
                <Card size="large" align="center">
                <img className='iconaboutus' src='https://quocpham2304.github.io/webtuyendungmindX/img/iconshop.jpg'/>
                <Title level={2}>+1000</Title>
                    <Text style={{fontSize: 18}}>Chi nhánh trên toàn quốc</Text>
                </Card>
            </Col>
            <Col span={6}>
                <Card  size="large" align="center" color='black'>
                <img className='iconaboutus' src='https://quocpham2304.github.io/webtuyendungmindX/img/icontrans.jpg'/>
                <Title level={2}>10 Triệu</Title>
                    <Text style={{fontSize: 18}}>Giao dịch mỗi tháng</Text>
                </Card>
            </Col>
            <Col span={6}>
                <Card size="large" align="center">
                <img className='iconaboutus' src='https://quocpham2304.github.io/webtuyendungmindX/img/iconcus.png'/>
                <Title level={2}>20 triệu</Title>
                    <Text style={{fontSize: 18}}>Khách hàng</Text>
                </Card>
            </Col>
            <Col span={6}>
                <Card size="large" align="center">
                <img className='iconaboutus' src='https://quocpham2304.github.io/webtuyendungmindX/img/iconjob.png'/>
                <Title level={2}>+10.000</Title>
                    <Text style={{fontSize: 18}}>Vị Trí đang tuyển dụng</Text>
                </Card>
            </Col>

        </Row>
    </Space>
);
export default Aboutus;