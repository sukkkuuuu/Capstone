import LodingLogo from "../../loading.png";
const Loading = () => {
    return (
        <>
        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <img src={LodingLogo} width="60px" />
            <h2>Loading...</h2>
        </div>
        </>
        );
};

export default Loading;