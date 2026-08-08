import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getProfile, updateProfile } from "../api/auth";

function EditProfile() {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const user = await getProfile();
        setName(user.name);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");
    setSaving(true);

    try {
      await updateProfile({ name });

      setSuccess("Profile updated successfully!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container">
          <p>Loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="card">
          <h2>Edit Profile</h2>

          <form onSubmit={handleSubmit}>
            <label>Name</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />

            {error && <p className="error">{error}</p>}

            {success && <p className="success">{success}</p>}

            <button type="submit" disabled={saving}>
              {saving ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditProfile;