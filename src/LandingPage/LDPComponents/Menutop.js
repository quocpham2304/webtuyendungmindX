import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Modal, Row, Typography } from "antd";
import Formtuyendung from "../ViTriTuyenDung/Formtuyendung";
import FormtuyendungLDP from "./FormtuyendungLDP";

const Menutop = () => {

    const { Title, Text } = Typography;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <img style={{ height: 50, }} src="https://quocpham2304.github.io/webtuyendungmindX/img/logo-a.png" />
            <Link className="menutab" to={'/webtuyendungmindX'} style={{ color: "white", fontSize: 18 }} > Trang chủ</Link>
            <Button
                className="btn-modal"
                type="primary"
                onClick={showModal}>
                Ứng tuyển ngay
            </Button>
            <Modal
                open={isModalOpen}
                onCancel={handleCancel}>
                <Title level={2}
                    align="center"
                    style={{ color: 'blue', paddingBottom: "10px" }}>
                    Tham gia mạng lưới tuyển dụng
                </Title>
                <Text>
                    Tham gia mạng lưới tuyển dụng của chúng tôi để nhận được những thông tin nhanh nhất về những vị trí tuyển dụng đang mở.

                    <Row>Cập nhật CV của bạn bất kì khi nào.</Row>
                    <Row> Nhận những thông tin mới nhất về những vị trí tuyển dụng có sẵn.</Row>
                    <Row>Kết nối với chúng tôi, chúng tôi sẽ đưa cho bạn những cơ hội nghề nghiệp tuyệt vời nhất.</Row>
                </Text>
                <FormtuyendungLDP />
            </Modal>
        </>

    )
}
export default Menutop;