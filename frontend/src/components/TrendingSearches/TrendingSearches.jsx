import { useNavigate } from 'react-router-dom';
import { FaFire } from 'react-icons/fa';
import './TrendingSearches.css';

function TrendingSearches() {
  const navigate = useNavigate();

  const trending = [
    { id: 1, tag: "AI Internship" },
    { id: 2, tag: "Machine Learning" },
    { id: 3, tag: "Python Developer" },
    { id: 4, tag: "Data Science" },
    { id: 5, tag: "Software Developer" },
  ];

  const handleTagClick = (tag) => {
    navigate(`/results?q=${encodeURIComponent(tag)}`);
  };

  return (
    <div className="trending">
      <div className="trending-header">
        <FaFire className="fire-icon" />
        <span>Trending Searches</span>
      </div>
      <div className="trending-tags">
        {trending.map((item) => (
          <button 
            key={item.id} 
            className="tag"
            onClick={() => handleTagClick(item.tag)}
          >
            {item.tag}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TrendingSearches;