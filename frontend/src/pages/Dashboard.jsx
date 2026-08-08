import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getProfile } from "../api/auth";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const profile = await getProfile();
        setUser(profile);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="container">
          <div className="card">
            <h2>Loading...</h2>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />

        <div className="container">
          <div className="card">
            <p className="error">{error}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="card dashboard-card">

          <h2>
            Welcome {user.name}
          </h2>

          <div className="profile-item">
            <strong>Name</strong>
            <p>{user.name}</p>
          </div>

          <div className="profile-item">
            <strong>Email</strong>
            <p>{user.email}</p>
          </div>

          <div className="profile-item">
            <strong>User ID</strong>
            <p>{user._id}</p>
          </div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;