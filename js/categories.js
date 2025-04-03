/**
 * Categories page JavaScript file
 * Handles game categorization and filtering logic
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const categoryNav = document.getElementById('category-nav');
    const currentCategoryTitle = document.getElementById('current-category');
    const gameGrid = document.getElementById('category-game-grid');
    const searchInput = document.getElementById('game-search');
    const sortSelect = document.getElementById('sort-games');
    
    // Current selected category and sort method
    let currentCategory = 'all';
    let currentSort = 'name';
    
    // Initialize category navigation
    initCategoryNav();
    
    // Load all games
    loadGames();
    
    // Add search event
    searchInput.addEventListener('input', handleSearch);
    
    // Add sort event
    sortSelect.addEventListener('change', handleSort);
    
    /**
     * Initialize category navigation
     */
    function initCategoryNav() {
        try {
            // Clear existing navigation to prevent duplicate loading
            categoryNav.innerHTML = '';
            
            // Add "All" category
            const allCategoryItem = document.createElement('li');
            allCategoryItem.innerHTML = '<a href="#" class="active" data-category="all">All Games</a>';
            categoryNav.appendChild(allCategoryItem);
            
            // Get all categories
            const categories = getAllCategories();
            
            // Sort categories to ensure consistent display order
            const sortedCategories = [...categories].sort();
            
            // Create navigation item for each category
            sortedCategories.forEach(category => {
                const categoryItem = document.createElement('li');
                categoryItem.innerHTML = `<a href="#" data-category="${category}">${translateCategory(category)}</a>`;
                categoryNav.appendChild(categoryItem);
            });
            
            // Add category click event
            categoryNav.addEventListener('click', handleCategoryClick);
            
            // Add statistics information
            updateCategoryStats();
        } catch (error) {
            console.error('Error initializing category navigation:', error);
            categoryNav.innerHTML = '<li><p>Failed to load categories. Please refresh the page and try again.</p></li>';
        }
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
     * Update category statistics
     */
    function updateCategoryStats() {
        const allGames = getAllGames();
        const categories = getAllCategories();
        
        // Get all links
        const links = categoryNav.querySelectorAll('a');
        
        // Update "All" category statistics
        links[0].innerHTML = `All Games <span class="category-count">(${allGames.length})</span>`;
        
        // Update statistics for each category
        categories.forEach((category, index) => {
            const gamesInCategory = getGamesByCategory(category);
            const link = links[index + 1]; // +1 because the first one is "All"
            if (link && link.getAttribute('data-category') === category) {
                link.innerHTML = `${translateCategory(category)} <span class="category-count">(${gamesInCategory.length})</span>`;
            }
        });
    }
    
    /**
     * Handle category click event
     * @param {Event} event Event object
     */
    function handleCategoryClick(event) {
        event.preventDefault();
        
        // Ensure a link was clicked
        if (event.target.tagName === 'A') {
            // Get category
            const category = event.target.getAttribute('data-category');
            
            // Update current category
            currentCategory = category;
            
            // Update UI
            updateActiveCategoryLink(event.target);
            updateCategoryTitle(category);
            
            // Load games
            loadGames();
            
            // Scroll to top of game list
            document.querySelector('.category-games').scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    /**
     * Update active category link
     * @param {Element} activeLink Active link element
     */
    function updateActiveCategoryLink(activeLink) {
        // Remove all active states
        const links = categoryNav.querySelectorAll('a');
        links.forEach(link => link.classList.remove('active'));
        
        // Add active state to current link
        activeLink.classList.add('active');
    }
    
    /**
     * Update category title
     * @param {string} category Category name
     */
    function updateCategoryTitle(category) {
        if (category === 'all') {
            currentCategoryTitle.textContent = 'All Games';
        } else {
            currentCategoryTitle.textContent = translateCategory(category);
        }
    }
    
    /**
     * Handle search event
     */
    function handleSearch() {
        loadGames();
    }
    
    /**
     * Handle sort event
     */
    function handleSort() {
        currentSort = sortSelect.value;
        loadGames();
    }
    
    /**
     * Load games
     */
    function loadGames() {
        try {
            // Get search keyword
            const searchTerm = searchInput.value.trim();
            
            // Get game data
            let games = [];
            
            if (searchTerm) {
                // Search mode
                games = searchGames(searchTerm);
                
                // If there is category filtering, filter further
                if (currentCategory !== 'all') {
                    games = games.filter(game => game.category === currentCategory);
                }
            } else {
                // Non-search mode, get games based on category
                games = getGamesFiltered(currentCategory, currentSort);
            }
            
            // Render games
            renderGames(games);
            
            // Update game count
            updateGameCount(games.length);
        } catch (error) {
            console.error('Error loading games:', error);
            gameGrid.innerHTML = '<p class="error-message">Failed to load games. Please refresh the page and try again.</p>';
        }
    }
    
    /**
     * Update game count
     * @param {number} count Game count
     */
    function updateGameCount(count) {
        let categoryText = currentCategory === 'all' ? 'All Games' : translateCategory(currentCategory);
        
        if (searchInput.value.trim()) {
            categoryText += ` (Search Results)`;
        }
        
        currentCategoryTitle.textContent = `${categoryText} - ${count} Games`;
    }
    
    /**
     * Render games
     * @param {Array} games Games array
     */
    function renderGames(games) {
        // Clear game grid
        gameGrid.innerHTML = '';
        
        // If there are no games
        if (games.length === 0) {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                gameGrid.innerHTML = `<p class="no-games">No games found related to "${searchTerm}"</p>`;
            } else {
                gameGrid.innerHTML = `<p class="no-games">No games available in this category</p>`;
            }
            return;
        }
        
        // Create game cards
        games.forEach(game => {
            const gameCard = createGameCard(game);
            gameGrid.appendChild(gameCard);
        });
    }
    
    /**
     * Create game card
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