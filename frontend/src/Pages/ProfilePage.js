import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProfilePage.css";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await fetch("https://build-component.onrender.com/api/user", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setUser(data.user);
      setFormData({ name: data.user.name, email: data.user.email, password: "" });
    } catch (err) {
      console.error(err);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://build-component.onrender.com/api/user", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      alert("Profile updated successfully!");
      setUser(data.user);
      setFormData({ ...formData, password: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;
    try {
      const res = await fetch("https://build-component.onrender.com/api/user", {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      alert(data.message || "Account deleted.");
      navigate("/login", { replace: true });
    } catch (err) {
      console.error(err);
      alert("Failed to delete account.");
    }
  };

  if (!user) return <p className="loading-text">Loading profile...</p>;

  return (
    <div className="outer-profile-container">
      <div className="profile-card">
        <div className="profile-nav">
          <button className="home-button" onClick={() => navigate("/")}>← Home</button>
          <span className="profile-title">Profile</span>
        </div>

        <h1>My Profile</h1>

        <form onSubmit={handleUpdate}>
          <div className="profile-form-group">
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="profile-form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="profile-form-group">
            <label>New Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Leave blank to keep current password"
            />
          </div>

          <button type="submit" className="update-button" disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </button>
          <button type="button" className="delete-button" onClick={handleDelete}>
            Delete Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
