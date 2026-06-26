import {Link} from "react-router-dom";

function Navbar() {
    return (

        <div className="navbar">
            <div className="navbar-links">
                <Link to="/electronics">Electronics</Link>
            </div>
        </div>

    );
}

export default Navbar;