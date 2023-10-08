import { Link } from "react-router-dom";

const Menutop = () =>{
    return(
        <>
        <img style={{ height: 50, }} src="https://quocpham2304.github.io/webtuyendungmindX/img/logo-a.png" />
        <Link className="menutab" to={'/webtuyendungmindX'} style={{color:"white", fontSize:18}} > Trang chủ</Link>
        
        </>
        
    )
}
export default Menutop;