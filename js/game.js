/**
 * Game page JavaScript file
 * Handles game loading and display logic
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get game ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('id');
    
    // If no game ID, redirect to homepage
    if (!gameId) {
        window.location.href = 'index.html';
        return;
    }
    
    // Get game information
    const game = getGameById(gameId);
    
    // If game doesn't exist, redirect to homepage
    if (!game) {
        window.location.href = 'index.html';
        return;
    }
    
    // 跟踪游戏页面访问
    if (typeof trackEvent === 'function') {
        trackEvent('Games', 'View', game.name);
    } else if (typeof gtag === 'function') {
        gtag('event', 'View', {
            'event_category': 'Games',
            'event_label': game.name
        });
    }
    
    // Update page title
    document.title = `${game.name} - Game Collection`;
    
    // Update game information
    updateGameInfo(game);
    
    // Load game iframe
    loadGameIframe(game);
    
    // Load related games
    loadRelatedGames(game);
    
    // Set up fullscreen button event
    setupFullscreenButton();
    
    // Set up social buttons
    setupSocialButtons(game);
    
    /**
     * Update game information
     * @param {Object} game Game object
     */
    function updateGameInfo(game) {
        document.getElementById('game-title').textContent = game.name;
        document.getElementById('game-description').textContent = game.description;
        document.getElementById('game-category').textContent = game.category;
        document.getElementById('game-rating').textContent = `Rating: ${game.rating.toFixed(1)}/5`;
    }
    
    /**
     * Load game iframe
     * @param {Object} game Game object
     */
    function loadGameIframe(game) {
        const iframe = document.getElementById('game-frame');
        const frameContainer = document.querySelector('.game-frame-container');
        
        // Show loading prompt
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'game-loading';
        loadingDiv.innerHTML = '<p>Loading game...</p>';
        frameContainer.appendChild(loadingDiv);
        
        // Set iframe src attribute
        iframe.src = game.url;
        
        // For external links, add extra security attributes
        if (game.url.startsWith('http')) {
            iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups');
            iframe.setAttribute('allow', 'autoplay; fullscreen; microphone; camera; payment');
            
            // Add prompt information
            const gameContainer = document.querySelector('.game-container');
            const externalInfo = document.createElement('div');
            externalInfo.className = 'external-info';
            externalInfo.innerHTML = '<p>This game is provided by an external platform. If the game does not load properly, please try clicking <a href="' + game.url + '" target="_blank">here</a> to open in a new window.</p>';
            
            // Insert information above iframe
            gameContainer.insertBefore(externalInfo, document.querySelector('.game-frame-container'));
        }
        
        // Listen for iframe load event
        iframe.onload = function() {
            // Remove loading prompt
            if (loadingDiv.parentNode) {
                loadingDiv.parentNode.removeChild(loadingDiv);
            }
            
            // 跟踪游戏加载成功
            if (typeof trackEvent === 'function') {
                trackEvent('Games', 'Load Success', game.name);
            } else if (typeof gtag === 'function') {
                gtag('event', 'Load Success', {
                    'event_category': 'Games',
                    'event_label': game.name
                });
            }
        };
        
        // Listen for iframe load error
        iframe.onerror = function() {
            // 跟踪游戏加载失败
            if (typeof trackEvent === 'function') {
                trackEvent('Games', 'Load Error', game.name);
            } else if (typeof gtag === 'function') {
                gtag('event', 'Load Error', {
                    'event_category': 'Games',
                    'event_label': game.name
                });
            }
            
            handleIframeError(game, frameContainer, loadingDiv);
        };
        
        // Set timeout handling in case iframe takes too long to load
        setTimeout(function() {
            if (document.querySelector('.game-loading')) {
                // 跟踪游戏加载超时
                if (typeof trackEvent === 'function') {
                    trackEvent('Games', 'Load Timeout', game.name);
                } else if (typeof gtag === 'function') {
                    gtag('event', 'Load Timeout', {
                        'event_category': 'Games',
                        'event_label': game.name
                    });
                }
                
                handleIframeError(game, frameContainer, loadingDiv);
            }
        }, 10000); // Check after 10 seconds
    }
    
    /**
     * Handle iframe load error
     * @param {Object} game Game object
     * @param {Element} container iframe container
     * @param {Element} loadingDiv Loading prompt element
     */
    function handleIframeError(game, container, loadingDiv) {
        // Remove loading prompt
        if (loadingDiv.parentNode) {
            loadingDiv.parentNode.removeChild(loadingDiv);
        }
        
        // Create error prompt
        const errorDiv = document.createElement('div');
        errorDiv.className = 'game-error';
        errorDiv.innerHTML = `
            <h3>Game Failed to Load</h3>
            <p>Sorry, the game could not be loaded properly. Please try the following methods:</p>
            <ul>
                <li>Refresh the page and try again</li>
                <li><a href="${game.url}" target="_blank">Open the game directly in a new window</a></li>
                <li>Check your network connection</li>
            </ul>
        `;
        
        // Display error prompt
        container.appendChild(errorDiv);
    }
    
    /**
     * Load related games
     * @param {Object} game Game object
     */
    function loadRelatedGames(game) {
        // Get games in the same category, excluding the current game
        const categoryGames = getGamesByCategory(game.category)
            .filter(g => g.id !== game.id)
            .slice(0, 4); // Show at most 4 related games
        
        const relatedContainer = document.querySelector('.related-games .game-grid');
        
        // Clear container
        relatedContainer.innerHTML = '';
        
        // Check if there are related games
        if (categoryGames.length === 0) {
            relatedContainer.innerHTML = '<p class="no-games">No related games available</p>';
            return;
        }
        
        // Create related game cards
        categoryGames.forEach(relatedGame => {
            const gameCard = createGameCard(relatedGame);
            relatedContainer.appendChild(gameCard);
        });
    }
    
    /**
     * Create game card element
     * @param {Object} game Game object
     * @returns {Element} Game card element
     */
    function createGameCard(game) {
        const card = document.createElement('div');
        card.className = 'game-card small';
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
        
        // Add click event using capture phase to ensure event delegation works correctly
        card.addEventListener('click', function(e) {
            // Check if the click was on a social button or its child
            const isOnSocialButton = e.target.closest('.like-btn') || e.target.closest('.share-btn');
            
            // If not clicking on the play button or social buttons, make the whole card clickable
            if (!e.target.classList.contains('play-btn') && !isOnSocialButton) {
                window.location.href = `game.html?id=${game.id}`;
            }
        }, false); // Using bubbling phase
        
        // Add specific click handlers for social buttons 
        const likeBtn = card.querySelector('.like-btn');
        const shareBtn = card.querySelector('.share-btn');
        
        if (likeBtn) {
            likeBtn.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent default action
                e.stopPropagation(); // Prevent card click
                console.log("游戏卡片点赞按钮被点击: " + game.id);
                
                // Toggle like state
                const isLiked = likeGame(game.id);
                
                // Update button state
                updateLikeButtonState(this, game.id);
                
                // Add animation
                this.classList.add('liked-animation');
                setTimeout(() => {
                    this.classList.remove('liked-animation');
                }, 700);
            }, true); // Using capture phase to ensure it fires first
            
            // 确保点赞按钮显示正确的状态
            updateLikeButtonState(likeBtn, game.id);
        }
        
        if (shareBtn) {
            shareBtn.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent default action
                e.stopPropagation(); // Prevent card click
                console.log("游戏卡片分享按钮被点击: " + game.id);
                
                const gameObj = getGameById(game.id);
                if (gameObj) {
                    openShareModal(gameObj);
                }
            }, true); // Using capture phase to ensure it fires first
        }
        
        return card;
    }
    
    /**
     * Set up fullscreen button event
     */
    function setupFullscreenButton() {
        const fullscreenBtn = document.getElementById('fullscreen-btn');
        const gameFrame = document.getElementById('game-frame');
        
        fullscreenBtn.addEventListener('click', function() {
            // 跟踪全屏模式
            if (typeof trackEvent === 'function') {
                trackEvent('Games', 'Fullscreen', game.name);
            } else if (typeof gtag === 'function') {
                gtag('event', 'Fullscreen', {
                    'event_category': 'Games',
                    'event_label': game.name
                });
            }
            
            if (gameFrame.requestFullscreen) {
                gameFrame.requestFullscreen();
            } else if (gameFrame.webkitRequestFullscreen) { // Safari
                gameFrame.webkitRequestFullscreen();
            } else if (gameFrame.msRequestFullscreen) { // IE11
                gameFrame.msRequestFullscreen();
            }
        });
    }
    
    /**
     * Set up social buttons (like and share)
     * @param {Object} game Game object
     */
    function setupSocialButtons(game) {
        console.log("设置社交按钮，游戏ID: " + game.id);
        
        // Setup like button
        const likeBtn = document.getElementById('like-btn');
        if (likeBtn) {
            // 设置游戏ID
            likeBtn.setAttribute('data-id', game.id);
            
            // 立即更新按钮状态
            updateLikeButtonState(likeBtn, game.id);
            
            // 移除所有已有的事件监听器，防止多次绑定
            const newLikeBtn = likeBtn.cloneNode(true);
            likeBtn.parentNode.replaceChild(newLikeBtn, likeBtn);
            
            // 直接添加点击事件
            newLikeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log("游戏页点赞按钮被点击: " + game.id);
                
                // 切换点赞状态
                const isLiked = likeGame(game.id);
                
                // 更新按钮状态
                updateLikeButtonState(this, game.id);
                
                // 添加动画效果
                this.classList.add('liked-animation');
                setTimeout(() => {
                    this.classList.remove('liked-animation');
                }, 700);
            });
        }
        
        // Setup share button
        const shareBtn = document.getElementById('share-btn');
        if (shareBtn) {
            // 设置游戏ID
            shareBtn.setAttribute('data-id', game.id);
            
            // 移除所有已有的事件监听器，防止多次绑定
            const newShareBtn = shareBtn.cloneNode(true);
            shareBtn.parentNode.replaceChild(newShareBtn, shareBtn);
            
            // 直接添加点击事件
            newShareBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log("游戏页分享按钮被点击: " + game.id);
                
                const gameData = getGameById(game.id);
                if (gameData) {
                    openShareModal(gameData);
                }
            });
        }
    }
}); 