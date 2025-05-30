import { randomImage } from './Blog.jsx';

function TrendingCard({ entry }) {
    return(
        <div className="trending-card-container">
            <img className="trending-card-image" src={entry.image}alt="trending-card-image"></img>
        </div>
    );
}

export default TrendingCard