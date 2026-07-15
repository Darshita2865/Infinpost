import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Loader from '../components/Loader/Loader';
import { searchPosts } from '../services/api';
import './Results.css';

function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('q') || '';

  useEffect(() => {
    if (query) {
      handleSearch(query);
    }
  }, [query]);

  const handleSearch = async (searchQuery) => {
    setLoading(true);
    setError('');
    try {
      console.log('🔍 Searching for:', searchQuery);
      const data = await searchPosts(searchQuery);
      console.log('✅ Results:', data);
      setResults(data);
    } catch (err) {
      console.error('❌ Error:', err);
      setError('Failed to fetch results. Please try again.');
    }
    setLoading(false);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };


  const getCompanyName = (post) => {
    if (post.company) return post.company;
    if (post.author) return post.author;
    if (post.username) return post.username;
    if (post.owner) return post.owner;
    if (post.page_name) return post.page_name;
    
    const content = post.content || post.text || '';
    const companyMatches = content.match(/(?:at|@|for|with)\s+([A-Z][a-zA-Z0-9\s&.]+?)(?:\s|,|\.|$)/);
    if (companyMatches) {
      return companyMatches[1].trim();
    }
    
    return 'Unknown Company';
  };

  const getApplyLink = (post) => {
    if (post.apply_url) return post.apply_url;
    if (post.url) return post.url;
    if (post.link) return post.link;
    
    const content = post.content || post.text || '';
    const urlMatches = content.match(/(https?:\/\/[^\s]+)/g);
    if (urlMatches) {
      return urlMatches[0];
    }
    
    const emailMatches = content.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g);
    if (emailMatches) {
      return `mailto:${emailMatches[0]}`;
    }
    
    return null;
  };

  const isJobPost = (post) => {
    const content = (post.content || post.text || '').toLowerCase();
    const jobKeywords = ['hiring', 'job', 'internship', 'opportunity', 'career', 'apply', 'opening', 'position', 'recruiting', 'vacancy'];
    return jobKeywords.some(keyword => content.includes(keyword));
  };

  const searchOnGoogle = (companyName) => {
    if (companyName && companyName !== 'Unknown Company') {
      const searchQuery = encodeURIComponent(`${companyName} careers jobs`);
      window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank');
    }
  };

  const searchOnLinkedIn = (companyName) => {
    if (companyName && companyName !== 'Unknown Company') {
      const searchQuery = encodeURIComponent(companyName);
      window.open(`https://www.linkedin.com/search/results/companies/?keywords=${searchQuery}`, '_blank');
    }
  };

  return (
    <>
      <Navbar />
      <div className="results-page">
        <div className="results-header">
          <h1>Search Results</h1>
          {query && <p>Showing results for: <strong>"{query}"</strong></p>}
          {results.length > 0 && <p className="result-count">Found {results.length} results</p>}
        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <div className="error-message">
            <p>{error}</p>
            <p style={{ fontSize: '14px', marginTop: '10px', color: '#8a8fa8' }}>
              💡 Make sure backend is running at http://localhost:8000
            </p>
          </div>
        ) : results.length > 0 ? (
          <div className="results-grid">
            {results.map((result, index) => (
              <div 
                key={result.id || index} 
                className="result-card clickable"
                onClick={() => handlePostClick(result)}
              >
                <div className={`result-platform platform-${result.platform || 'general'}`}>
                  {result.platform || 'Social'}
                </div>
                <h3>{result.title || 'Post'}</h3>
                <p className="result-preview">
                  {(result.content || result.text || result.description || 'No description available').slice(0, 150)}
                  {(result.content || '').length > 150 ? '...' : ''}
                </p>
                <div className="result-meta">
                  <span>❤️ {result.likes || result.like_count || 0} likes</span>
                  <span>👤 {result.author || result.username || 'Unknown'}</span>
                  {isJobPost(result) && <span className="job-badge">💼 Job Post</span>}
                  <span className="click-hint">Click to view →</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span>🔍</span>
            <h2>No results found</h2>
            <p>Try adjusting your search terms or try something else.</p>
          </div>
        )}
      </div>

      {/* Modal for full post view */}
      {selectedPost && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>
            
            <div className="modal-platform">
              <span className={`platform-tag platform-${selectedPost.platform || 'general'}`}>
                {selectedPost.platform || 'Social'}
              </span>
              {isJobPost(selectedPost) && (
                <span className="job-tag">💼 Job Opportunity</span>
              )}
            </div>
            
            <h2 className="modal-title">{selectedPost.title || 'Post'}</h2>
            
            <div className="modal-author">
              <div className="author-item">
                <span className="author-label">🏢 Company</span>
                <span className="author-value">{getCompanyName(selectedPost)}</span>
              </div>
              <div className="author-divider"></div>
              <div className="author-item">
                <span className="author-label">👤 Posted by</span>
                <span className="author-value">{selectedPost.author || selectedPost.username || 'Unknown'}</span>
              </div>
              <div className="author-divider"></div>
              <div className="author-item">
                <span className="author-label">📅 Posted on</span>
                <span className="author-value">{formatDate(selectedPost.created_at || selectedPost.timestamp)}</span>
              </div>
            </div>
            
            <div className="modal-body">
              <p>{selectedPost.content || selectedPost.text || selectedPost.description || 'No content available'}</p>
            </div>
            
            <div className="modal-stats">
              <div className="modal-stat">
                <span>❤️</span>
                <span>{selectedPost.likes || selectedPost.like_count || 0}</span>
                <span>Likes</span>
              </div>
              <div className="modal-stat">
                <span>💬</span>
                <span>{selectedPost.comments || selectedPost.comment_count || 0}</span>
                <span>Comments</span>
              </div>
              <div className="modal-stat">
                <span>📤</span>
                <span>{selectedPost.shares || 0}</span>
                <span>Shares</span>
              </div>
            </div>

            <div className="modal-actions">
              {getApplyLink(selectedPost) ? (
                <a 
                  href={getApplyLink(selectedPost)} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="apply-btn"
                >
                  📧 Apply Now
                </a>
              ) : (
                <div className="no-link-message">
                  <span>🔗</span>
                  <p>No application link found in this post.</p>
                  {getCompanyName(selectedPost) && getCompanyName(selectedPost) !== 'Unknown Company' && (
                    <div className="search-options">
                      <button 
                        className="google-search-btn"
                        onClick={() => searchOnGoogle(getCompanyName(selectedPost))}
                      >
                        🌐 Search {getCompanyName(selectedPost)} on Google
                      </button>
                      <button 
                        className="linkedin-search-btn"
                        onClick={() => searchOnLinkedIn(getCompanyName(selectedPost))}
                      >
                        💼 Find {getCompanyName(selectedPost)} on LinkedIn
                      </button>
                    </div>
                  )}
                </div>
              )}
              
              {selectedPost.url && selectedPost.url !== getApplyLink(selectedPost) && (
                <a 
                  href={selectedPost.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="modal-link"
                >
                  View Original Post 🔗
                </a>
              )}
            </div>

            {isJobPost(selectedPost) && (
              <div className="job-tips">
                <h4>💡 Application Tips</h4>
                <ul>
                  <li>📝 Customize your resume for this role</li>
                  <li>✉️ Write a personalized cover letter</li>
                  <li>🔗 Include links to your portfolio or GitHub</li>
                  <li>📊 Highlight relevant skills and experience</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Results;
