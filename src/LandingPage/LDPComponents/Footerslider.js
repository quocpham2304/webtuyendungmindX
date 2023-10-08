import { Carousel, Col, Row, Typography } from 'antd';
import { TypeIcon } from 'antd/es/message/PurePanel';
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Title from 'antd/es/skeleton/Title';


const contentStyle = {
  height: '400px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: 'rgba(19, 38, 71, 1)',
  paddingTop:'50px',
  dotscolor:'white',
};
const Footerslider = () => {
  const { Text, Paragraph } = Typography
  return (
    <div>
      <Title style={{color:"red"}}> allo</Title>
    <Carousel draggable autoplay dots={true}>
      <div>
        <Row style={contentStyle} >
          <Col span={6} style={{ left: '300px' }}>
            <img className='imgfooterslide' src='https://quocpham2304.github.io/webtuyendungmindX/img/per1.jpg' />
          </Col>
          <Col span={12} style={{ left: '300px' }}>
            <Paragraph style={{ color: 'white', fontSize: 18, paddingTop: '100px' }} >
              Đây thật sự là vinh dự khi được làm việc tại đây.
              Nhìn lại thời gian qua mình cũng rất tự hào và ngạc nhiên với những gì đạt được, phát triển cùng với công ty suốt thời gian qua.
            </Paragraph>
            <Paragraph style={{ color: 'white', fontSize: 18 }}> Head of Engineer </Paragraph>
            <Paragraph style={{ color: 'white', fontSize: 18 }}> Chris Evan </Paragraph>
          </Col>
        </Row>
      </div>
      <div>
        <Row style={contentStyle}>
          <Col span={6} style={{ left: '300px' }}>
            <img className='imgfooterslide' src='https://quocpham2304.github.io/webtuyendungmindX/img/per2.jpg' />
          </Col>
          <Col span={12} style={{ left: '300px' }}>
            <Paragraph style={{ color: 'white', fontSize: 18, paddingTop: '100px' }} >
              Đây thật sự là vinh dự khi được làm việc tại đây.
            </Paragraph>
            <Paragraph style={{ color: 'white', fontSize: 18 }}> DEPOPS </Paragraph>
            <Paragraph style={{ color: 'white', fontSize: 18 }}> Babel Zelegenr </Paragraph>
          </Col>
        </Row>
      </div>
    </Carousel>
    </div>
  );
};
export default Footerslider;