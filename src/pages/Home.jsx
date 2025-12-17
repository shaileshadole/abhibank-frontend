import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();
    
    return (
        <div className="home-container">
            <h5>Welcome to Abhi Bank</h5>
            <h3>ATM SERVICES</h3>

            <div>
                <button onClick={() => navigate("/users/register")}>New Customer</button>
                <button onClick={() => navigate("/users/login")}>Existing Customer</button>
            </div>
        </div>
    );
}

export default Home;