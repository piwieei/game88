/**
 * Homepage JavaScript file
 * Handles homepage game display
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get game display containers
    const gameContainers = document.querySelectorAll('.game-grid');
    
    // Track image load errors
    let imgLoadErrors = 0;
    
    // Load featured games
    const featuredGames = getFeaturedGames();
    if (gameContainers[0]) {
        loadGames(gameContainers[0], featuredGames);
    }
    
    // Load newest games
    const newestGames = getNewestGames();
    if (gameContainers[1]) {
        loadGames(gameContainers[1], newestGames);
    }
    
    /**
     * Load game list in container
     * @param {Element} container Container element
     * @param {Array} games Games array
     */
    function loadGames(container, games) {
        // Clear container
        container.innerHTML = '';
        
        // Check if there are games
        if (games.length === 0) {
            container.innerHTML = '<p class="no-games">No games available</p>';
            return;
        }
        
        // Create game cards
        games.forEach(game => {
            const gameCard = createGameCard(game);
            container.appendChild(gameCard);
        });
    }
    
    /**
     * Create game card element
     * @param {Object} game Game object
     * @returns {Element} Game card element
     */
    function createGameCard(game) {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.setAttribute('data-id', game.id);
        
        // Build card HTML
        card.innerHTML = `
            <div class="game-thumbnail">
                <img src="${game.thumbnail}" alt="${game.name}" onerror="this.src='images/placeholder.jpg'">
                <div class="game-overlay">
                    <a href="game.html?id=${game.id}" class="play-btn">Play Now</a>
                </div>
            </div>
            <div class="game-info">
                <h3>${game.name}</h3>
                <div class="game-meta">
                    <span class="game-category">${game.category}</span>
                    <span class="game-rating">★ ${game.rating.toFixed(1)}</span>
                </div>
                <div class="social-actions">
                    <button class="like-btn" data-id="${game.id}">
                        <i>♡</i> <span class="like-count">${game.likes}</span>
                    </button>
                    <button class="share-btn" data-id="${game.id}">
                        <i>↗</i> Share
                    </button>
                </div>
            </div>
        `;
        
        // Monitor image load failure
        const img = card.querySelector('img');
        img.addEventListener('error', function() {
            imgLoadErrors++;
            console.log(`Image load failed: ${game.thumbnail}`);
            this.src = 'images/placeholder.jpg';
            
            // If too many image load errors, show a warning
            if (imgLoadErrors > 3) {
                const warningElement = document.createElement('div');
                warningElement.className = 'img-load-warning';
                warningElement.textContent = 'Some game images failed to load. Please check image paths.';
                
                // Only add the warning once
                if (!document.querySelector('.img-load-warning')) {
                    document.querySelector('main').prepend(warningElement);
                    
                    // Auto-hide after 5 seconds
                    setTimeout(() => {
                        warningElement.style.opacity = '0';
                        setTimeout(() => warningElement.remove(), 1000);
                    }, 5000);
                }
            }
        });
        
        // Add click event
        card.addEventListener('click', function(e) {
            // Check if the click was on a social button or its child
            const isOnSocialButton = e.target.closest('.like-btn') || e.target.closest('.share-btn');
            
            // If not clicking on the play button or social buttons, make the whole card clickable
            if (!e.target.classList.contains('play-btn') && !isOnSocialButton) {
                window.location.href = `game.html?id=${game.id}`;
            }
        });
        
        // Add specific click handlers for social buttons 
        const likeBtn = card.querySelector('.like-btn');
        const shareBtn = card.querySelector('.share-btn');
        
        if (likeBtn) {
            likeBtn.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent card click
                const gameId = this.getAttribute('data-id');
                
                // Toggle like state
                const isLiked = likeGame(gameId);
                
                // Update button state
                updateLikeButtonState(this, gameId);
                
                // Add animation
                this.classList.add('liked-animation');
                setTimeout(() => {
                    this.classList.remove('liked-animation');
                }, 700);
            });
            
            // 确保点赞按钮显示正确的状态
            updateLikeButtonState(likeBtn, game.id);
        }
        
        if (shareBtn) {
            shareBtn.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent card click
                const gameId = this.getAttribute('data-id');
                const game = getGameById(gameId);
                
                if (game) {
                    openShareModal(game);
                }
            });
        }
        
        return card;
    }
}); 