import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar/Navbar';
import { 
  FaUser, 
  FaEnvelope, 
  FaCalendar, 
  FaEdit, 
  FaSave, 
  FaSignOutAlt, 
  FaArrowLeft,
  FaCamera,
  FaVenusMars,
  FaGlobe,
  FaBirthdayCake,
  FaIdCard
} from 'react-icons/fa';
import './Profile.css';

function Profile() {
  const { user, logout, setUser } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [birthdate, setBirthdate] = useState(user?.birthdate || '');
  const [country, setCountry] = useState(user?.country || '');
  const [gender, setGender] = useState(user?.gender || '');
  const [profileImage, setProfileImage] = useState(user?.profileImage || null);
  const [successMessage, setSuccessMessage] = useState('');

  const goBackHome = () => {
    navigate('/');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current.click();
  };

  const handleSave = () => {
    const updatedUser = { 
      ...user, 
      name: name, 
      email: email,
      birthdate: birthdate,
      country: country,
      gender: gender,
      profileImage: profileImage
    };
    
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    if (setUser) {
      setUser(updatedUser);
    }
    
    setIsEditing(false);
    setSuccessMessage('Profile updated successfully!');
    
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleCancel = () => {
    setName(user?.name || '');
    setEmail(user?.email || '');
    setBirthdate(user?.birthdate || '');
    setCountry(user?.country || '');
    setGender(user?.gender || '');
    setProfileImage(user?.profileImage || null);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const calculateAge = (birthdate) => {
    if (!birthdate) return 'Not set';
    const today = new Date();
    const birth = new Date(birthdate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <>
      <Navbar />
      <div className="profile-page">
        <div className="profile-container">
          {/* Back to Home Button */}
          <button className="back-home-btn-profile" onClick={goBackHome} title="Go back home">
            <FaArrowLeft />
            <span>Back to Home</span>
          </button>

          <div className="profile-header">
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar" onClick={triggerImageUpload}>
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="profile-avatar-img" />
                ) : (
                  <span>{user?.name?.charAt(0) || 'U'}</span>
                )}
                <div className="avatar-overlay">
                  <FaCamera className="camera-icon" />
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <p className="avatar-hint">Click to upload photo</p>
            </div>
            <h1>My Profile</h1>
            <p>Manage your account settings and preferences</p>
          </div>

          {successMessage && (
            <div className="success-message">
              {successMessage}
            </div>
          )}

          <div className="profile-content">
            <div className="profile-card">
              <div className="profile-card-header">
                <h2>Personal Information</h2>
                <div className="profile-actions">
                  {isEditing ? (
                    <>
                      <button className="cancel-btn" onClick={handleCancel}>
                        Cancel
                      </button>
                      <button className="save-btn-header" onClick={handleSave}>
                        <FaSave /> Save Changes
                      </button>
                    </>
                  ) : (
                    <button className="edit-btn" onClick={() => setIsEditing(true)}>
                      <FaEdit /> Edit Profile
                    </button>
                  )}
                </div>
              </div>

              <div className="profile-info">
                <div className="info-item">
                  <FaUser className="info-icon" />
                  <div className="info-content">
                    <label>Full Name</label>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <p>{user?.name || 'Not set'}</p>
                    )}
                  </div>
                </div>

                <div className="info-item">
                  <FaEnvelope className="info-icon" />
                  <div className="info-content">
                    <label>Email Address</label>
                    {isEditing ? (
                      <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                      />
                    ) : (
                      <p>{user?.email || 'Not set'}</p>
                    )}
                  </div>
                </div>

                <div className="info-item">
                  <FaIdCard className="info-icon" />
                  <div className="info-content">
                    <label>Age</label>
                    <p>{user?.birthdate ? calculateAge(user.birthdate) + ' years' : 'Not set'}</p>
                  </div>
                </div>

                <div className="info-item">
                  <FaBirthdayCake className="info-icon" />
                  <div className="info-content">
                    <label>Date of Birth</label>
                    {isEditing ? (
                      <input 
                        type="date" 
                        value={birthdate} 
                        onChange={(e) => setBirthdate(e.target.value)}
                      />
                    ) : (
                      <p>{user?.birthdate ? new Date(user.birthdate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      }) : 'Not set'}</p>
                    )}
                  </div>
                </div>

                <div className="info-item">
                  <FaVenusMars className="info-icon" />
                  <div className="info-content">
                    <label>Gender</label>
                    {isEditing ? (
                      <select 
                        value={gender} 
                        onChange={(e) => setGender(e.target.value)}
                        className="profile-select"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-binary">Non-binary</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    ) : (
                      <p>{user?.gender || 'Not set'}</p>
                    )}
                  </div>
                </div>

                <div className="info-item">
                  <FaGlobe className="info-icon" />
                  <div className="info-content">
                    <label>Country</label>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={country} 
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="Enter your country"
                      />
                    ) : (
                      <p>{user?.country || 'Not set'}</p>
                    )}
                  </div>
                </div>

                <div className="info-item">
                  <FaCalendar className="info-icon" />
                  <div className="info-content">
                    <label>Member Since</label>
                    <p>{new Date().toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="edit-actions">
                  <button className="save-btn" onClick={handleSave}>
                    <FaSave /> Save Changes
                  </button>
                  <button className="cancel-btn-full" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              )}

              <button className="logout-btn" onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </div>

            <div className="profile-stats">
              <div className="stat-card">
                <h3>12</h3>
                <p>Searches Performed</p>
              </div>
              <div className="stat-card">
                <h3>5</h3>
                <p>Saved Searches</p>
              </div>
              <div className="stat-card">
                <h3>3</h3>
                <p>Platforms Connected</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
