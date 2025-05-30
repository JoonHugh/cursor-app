import TrendingCard from './TrendingCard.jsx';

function TrendingPosts({ entry }) {
    return(
        <div className="trending-posts-container">
            <h5>TRENDING POSTS</h5>
            <div className="trending-posts-grid">
                <TrendingCard entry={entry}/>
            </div>
        </div>
    );
}

export default TrendingPosts