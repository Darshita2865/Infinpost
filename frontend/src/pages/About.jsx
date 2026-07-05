import { useState } from 'react';
import Navbar from "../components/Navbar/Navbar";
import { 
  FaBrain, 
  FaChartLine,
  FaUsers,
  FaShieldAlt,
  FaClock,
  FaMobileAlt,
  FaRocket,
  FaEnvelope,
  FaUser,
  FaComment
} from 'react-icons/fa';
import './About.css';

function About() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const features = [
    { 
      icon: FaBrain, 
      title: "AI-Powered Search", 
      description: "Advanced machine learning algorithms to find exactly what you're looking for across all platforms." 
    },
    { 
      icon: FaChartLine, 
      title: "Real-Time Analytics", 
      description: "Get instant insights and analysis on posts, trends, and engagement metrics." 
    },
    { 
      icon: FaUsers, 
      title: "Cross-Platform", 
      description: "Seamlessly search and analyze content from Instagram, LinkedIn, and Facebook." 
    },
    { 
      icon: FaShieldAlt, 
      title: "Privacy First", 
      description: "Your data is secure and private. We never share your personal information." 
    },
    { 
      icon: FaClock, 
      title: "Save Time", 
      description: "Find relevant content faster with intelligent search suggestions and filters." 
    },
    { 
      icon: FaMobileAlt, 
      title: "Responsive Design", 
      description: "Access InfinPost from any device - desktop, tablet, or mobile." 
    },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add API call to send email
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <>
      <Navbar />
      <div className="about-page">
        {/* Why InfinPost Section */}
        <div className="about-why">
          <div className="section-header">
            <span className="section-tag">Why InfinPost</span>
            <h2>Why Choose InfinPost?</h2>
            <p>Everything you need to master social media intelligence in one powerful platform.</p>
          </div>
          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon-wrapper">
                <FaRocket className="why-icon" />
              </div>
              <h3>Cutting-Edge AI</h3>
              <p>Leverage state-of-the-art artificial intelligence to get the most accurate insights from social media data.</p>
            </div>
            <div className="why-card">
              <div className="why-icon-wrapper">
                <FaUsers className="why-icon" />
              </div>
              <h3>All-in-One Platform</h3>
              <p>Search and analyze content from Instagram, LinkedIn, and Facebook in one unified dashboard.</p>
            </div>
            <div className="why-card">
              <div className="why-icon-wrapper">
                <FaShieldAlt className="why-icon" />
              </div>
              <h3>Enterprise Security</h3>
              <p>Bank-grade encryption and privacy controls to keep your data safe and secure at all times.</p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="about-features">
          <div className="section-header">
            <span className="section-tag">Features</span>
            <h2>Powerful Features</h2>
            <p>Discover what makes InfinPost the ultimate social media intelligence tool.</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon-wrapper">
                  <feature.icon className="feature-icon" />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Us Section with Form */}
        <div className="about-contact">
          <div className="section-header">
            <span className="section-tag">Get in Touch</span>
            <h2>Contact Us</h2>
            <p>Have questions? We'd love to hear from you. Send us a message and we'll get back to you.</p>
          </div>
          <div className="contact-content">
            <div className="contact-form-wrapper">
              <div className="contact-email-display">
                <FaEnvelope className="contact-email-icon" />
                <div>
                  <h4>Email Us</h4>
                  <p>support@infinpost.com</p>
                </div>
              </div>

              {submitted ? (
                <div className="success-message">
                  <span>✅</span>
                  <h3>Message Sent Successfully!</h3>
                  <p>We'll get back to you soon.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Your Name</label>
                      <div className="input-wrapper">
                        <FaUser className="form-icon" />
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <div className="input-wrapper">
                        <FaEnvelope className="form-icon" />
                        <input
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Message</label>
                    <div className="input-wrapper">
                      <FaComment className="form-icon" />
                      <textarea
                        name="message"
                        placeholder="Write your message here..."
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <button type="submit" className="submit-btn">
                    <FaEnvelope /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;