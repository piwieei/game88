/**
 * Popular Games page JavaScript file
 * Handles popular games display logic
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Initialize tabs
    initTabs();
    
    // Load most played games
    loadMostPlayedGames();
    
    // Add tab click events
    addTabEvents();
    
    /**
     * Initialize tabs
     */
    function initTabs() {
        // Hide all tab contents
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Show first tab content
        tabContents[0].classList.add('active');
        
        // Activate first tab button
        tabButtons[0].classList.add('active');
    }
    
    /**
     * Add tab click events
     */
    function addTabEvents() {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Get tab ID
                const tabId = this.getAttribute('data-tab');
                
                // Switch tab
                switchTab(tabId, this);
                
                // Load appropriate games
                loadTabGames(tabId);
            });
        });
    }
    
    /**
     * Switch tab
     * @param {string} tabId Tab ID
     * @param {Element} activeButton Active button element
     */
    function switchTab(tabId, activeButton) {
        // Remove active state from all tab buttons
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active state to current button
        activeButton.classList.add('active');
        
        // Hide all tab contents
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Show current tab content
        document.getElementById(tabId).classList.add('active');
    }
    
    /**
     * Load tab games
     * @param {string} tabId Tab ID
     */
    function loadTabGames(tabId) {
        switch (tabId) {
            case 'most-played':
                loadMostPlayedGames();
                break;
            case 'highest-rated':
                loadHighestRatedGames();
                break;
            case 'trending':
                loadTrendingGames();
                break;
        }
    }
    
    /**
     * Load most played games
     */
    function loadMostPlayedGames() {
        const games = getMostPlayedGames();
        const container = document.querySelector('#most-played .game-grid');
        renderGames(games, container);
    }
    
    /**
     * Load highest rated games
     */
    function loadHighestRatedGames() {
        const games = getHighestRatedGames();
        const container = document.querySelector('#highest-rated .game-grid');
        renderGames(games, container);
    }
    
    /**
     * Load trending games
     */
    function loadTrendingGames() {
        const games = getTrendingGames();
        const container = document.querySelector('#trending .game-grid');
        renderGames(games, container);
    }
    
    /**
     * Render game cards
     * @param {Array} games Games array
     * @param {Element} container Container element
     */
    function renderGames(games, container) {
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
     * Translate category names from Chinese to English
     * @param {string} category Category name
     * @returns {string} Translated category name
     */
    function translateCategory(category) {
        // Category names are already in English, so just return the original
        return category;
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
                    <span class="game-category">${translateCategory(game.category)}</span>
                    <span class="game-rating">
                        <i class="star-icon">★</i> ${game.rating.toFixed(1)}
                    </span>
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