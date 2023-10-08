import { Button, Col, Form, Input, Row, message } from "antd";
import { apiConstants } from "../Const/api";
import axios from "axios";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { ThemeContext } from "../Admin/Context/ThemeContext";

const Login = () => {
  const navigate = useNavigate()
  const { isLogin, setIsLogin ,userName, setUserName} = useContext(ThemeContext)
  const onFinish = async (values) => {
    try {
      try {
        var result = await axios({
          method: "POST",
          headers: {
            // Authorization: `Bearer ${token}`,
          },
          url: `${apiConstants.DANG_NHAP}`,
          data: values
        });

        console.log(result);

        if(result.data.status == "true"){
          message.info(result.data.message)
          setIsLogin(true)
          sessionStorage.setItem('isLogin',true)
          setUserName(result.data.data.cbnv.username)
          sessionStorage.setItem('username',result.data.data.cbnv.username)
          navigate('/admin/dottuyendung')       
        }
      } catch (error) {
        console.log(error.response.data.message);
        message.error(error.response.data.message);
        return
      }
    } catch (error) {
      console.log(result.data);
      message.error(result.data.message);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Row>
        <Col span={12} offset={5}>
          <h1 style={{ textAlign: "center" }}>ĐĂNG NHẬP</h1>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 14,
            }}
            size="large"
            style={{
              maxWidth: 600,
              marginTop: "60px"
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Tên đăng nhập"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default Login;