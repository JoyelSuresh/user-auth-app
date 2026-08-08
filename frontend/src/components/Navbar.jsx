import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <h2>User Auth App</h2>

      <div className="nav-links">
        
        <Link to="/dashboard">Dashboard</Link>

        <Link to="/edit-profile">Edit Profile</Link>

        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;