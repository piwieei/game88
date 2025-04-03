/**
 * Social functionality for game website
 * Includes like and share features
 */

/**
 * Initialize social features
 */
function initSocialFeatures() {
    console.log("初始化社交功能...");
    
    // 直接为主页面上的点赞和分享按钮添加事件处理
    const mainLikeBtn = document.getElementById('like-btn');
    const mainShareBtn = document.getElementById('share-btn');
    
    if (mainLikeBtn) {
        console.log("找到点赞按钮，添加事件...");
        const gameId = mainLikeBtn.getAttribute('data-id');
        if (gameId) {
            // 更新初始状态
            updateLikeButtonState(mainLikeBtn, gameId);
            
            // 添加点击事件
            mainLikeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log("点赞按钮被点击: " + gameId);
                
                // 切换点赞状态
                const isLiked = likeGame(gameId);
                
                // 更新按钮状态
                updateLikeButtonState(this, gameId);
                
                // 添加动画效果
                this.classList.add('liked-animation');
                setTimeout(() => {
                    this.classList.remove('liked-animation');
                }, 700);
            });
        }
    }
    
    if (mainShareBtn) {
        console.log("找到分享按钮，添加事件...");
        const gameId = mainShareBtn.getAttribute('data-id');
        if (gameId) {
            // 添加点击事件
            mainShareBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log("分享按钮被点击: " + gameId);
                
                const game = getGameById(gameId);
                if (game) {
                    openShareModal(game);
                }
            });
        }
    }
    
    // 同时也调用原来的初始化函数以兼容
    initGameDetailSocialButtons();
}

/**
 * Initialize social buttons on game detail page
 */
function initGameDetailSocialButtons() {
    // Only initialize buttons on the game detail page - using specific IDs to target main game buttons only
    const likeBtn = document.getElementById('like-btn');
    const shareBtn = document.getElementById('share-btn');
    
    // Only proceed if we're on the game detail page (indicated by presence of these specific buttons)
    if (likeBtn && shareBtn) {
        const gameId = likeBtn.getAttribute('data-id');
        if (!gameId) return;
        
        // Update like button state
        updateLikeButtonState(likeBtn, gameId);
        
        // Add like button event
        likeBtn.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            // Toggle like state
            const isLiked = likeGame(gameId);
            
            // Update button state
            updateLikeButtonState(likeBtn, gameId);
            
            // Add animation
            likeBtn.classList.add('liked-animation');
            setTimeout(() => {
                likeBtn.classList.remove('liked-animation');
            }, 700);
        });
        
        // Add share button event
        shareBtn.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            const game = getGameById(gameId);
            if (game) {
                openShareModal(game);
            }
        });
    }
}

/**
 * Update like button state
 * @param {Element} button Like button element
 * @param {string} gameId Game ID
 */
function updateLikeButtonState(button, gameId) {
    // Check if game is liked
    const isLiked = isGameLiked(gameId);
    
    // Update button class
    if (isLiked) {
        button.classList.add('liked');
    } else {
        button.classList.remove('liked');
    }
    
    // Update icon
    const iconElement = button.querySelector('i');
    if (iconElement) {
        iconElement.textContent = isLiked ? '♥' : '♡';
    }
    
    // Update like count
    const likeCountElement = button.querySelector('.like-count');
    if (likeCountElement) {
        const game = getGameById(gameId);
        if (game) {
            likeCountElement.textContent = game.likes;
        }
    }
}

/**
 * Open share modal
 * @param {Object} game Game object
 */
function openShareModal(game) {
    // Create modal HTML
    const modalHTML = `
        <div class="share-modal-overlay">
            <div class="share-modal">
                <div class="share-modal-header">
                    <h3>Share ${game.name}</h3>
                    <button class="close-modal">×</button>
                </div>
                <div class="share-modal-body">
                    <div class="share-game-info">
                        <img src="${game.thumbnail}" alt="${game.name}" class="share-thumbnail">
                        <div class="share-game-details">
                            <h4>${game.name}</h4>
                            <p>${game.description.substring(0, 100)}...</p>
                        </div>
                    </div>
                    <div class="share-options">
                        <button class="share-option" data-platform="facebook">
                            <i class="share-icon facebook-icon">Facebook</i>
                        </button>
                        <button class="share-option" data-platform="twitter">
                            <i class="share-icon twitter-icon">Twitter</i>
                        </button>
                        <button class="share-option" data-platform="linkedin">
                            <i class="share-icon linkedin-icon">LinkedIn</i>
                        </button>
                        <button class="share-option" data-platform="copylink">
                            <i class="share-icon link-icon">Copy Link</i>
                        </button>
                    </div>
                    <div class="share-link-container">
                        <input type="text" class="share-link" readonly value="${window.location.origin}/game.html?id=${game.id}">
                        <button class="copy-link-btn">Copy</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to DOM
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);
    
    // Add close event
    const closeButton = modalContainer.querySelector('.close-modal');
    closeButton.addEventListener('click', function() {
        document.body.removeChild(modalContainer);
    });
    
    // Add click outside to close
    const overlay = modalContainer.querySelector('.share-modal-overlay');
    overlay.addEventListener('click', function(event) {
        if (event.target === overlay) {
            document.body.removeChild(modalContainer);
        }
    });
    
    // Add copy link functionality
    const copyButton = modalContainer.querySelector('.copy-link-btn');
    const linkInput = modalContainer.querySelector('.share-link');
    
    copyButton.addEventListener('click', function() {
        linkInput.select();
        document.execCommand('copy');
        
        // Show copied feedback
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
            copyButton.textContent = 'Copy';
        }, 2000);
    });
    
    // Add share platform events
    const shareOptions = modalContainer.querySelectorAll('.share-option');
    shareOptions.forEach(option => {
        option.addEventListener('click', function() {
            const platform = this.getAttribute('data-platform');
            shareGame(game, platform);
        });
    });
}

/**
 * Share game to platform
 * @param {Object} game Game object
 * @param {string} platform Platform name
 */
function shareGame(game, platform) {
    const gameUrl = `${window.location.origin}/game.html?id=${game.id}`;
    const title = `Play ${game.name} - Fun HTML5 Games`;
    const description = game.description.substring(0, 100) + '...';
    
    // Handle different platforms
    switch(platform) {
        case 'facebook':
            // Facebook sharing
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(gameUrl)}&quote=${encodeURIComponent(title)}`, '_blank', 'width=600,height=400');
            break;
            
        case 'twitter':
            // Twitter sharing
            window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(gameUrl)}&text=${encodeURIComponent(title)}`, '_blank', 'width=600,height=400');
            break;
            
        case 'linkedin':
            // LinkedIn sharing
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(gameUrl)}`, '_blank', 'width=600,height=400');
            break;
            
        case 'copylink':
            // Copy link functionality is handled in the modal
            const linkInput = document.querySelector('.share-link');
            if (linkInput) {
                linkInput.select();
                document.execCommand('copy');
                
                // Show copied feedback
                const copyButton = document.querySelector('.copy-link-btn');
                if (copyButton) {
                    copyButton.textContent = 'Copied!';
                    setTimeout(() => {
                        copyButton.textContent = 'Copy';
                    }, 2000);
                }
            }
            break;
            
        default:
            // Try to use Web Share API if available
            if (navigator.share) {
                navigator.share({
                    title: title,
                    text: description,
                    url: gameUrl,
                }).catch(error => console.log('Error sharing:', error));
            } else {
                alert('Sharing is not supported on this browser. Please copy the link manually.');
            }
    }
}

// Initialize social features when DOM is loaded
document.addEventListener('DOMContentLoaded', initSocialFeatures); 