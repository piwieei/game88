/**
 * 游戏页面JavaScript文件
 * 处理游戏加载和展示逻辑
 */
document.addEventListener('DOMContentLoaded', function() {
    // 获取URL中的游戏ID
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('id');
    
    // 如果没有游戏ID，重定向到首页
    if (!gameId) {
        window.location.href = 'index.html';
        return;
    }
    
    // 获取游戏信息
    const game = getGameById(gameId);
    
    // 如果游戏不存在，重定向到首页
    if (!game) {
        window.location.href = 'index.html';
        return;
    }
    
    // 更新页面标题
    document.title = `${game.name} - 游戏集锦`;
    
    // 更新游戏信息
    updateGameInfo(game);
    
    // 加载游戏iframe
    loadGameIframe(game);
    
    // 加载相关游戏
    loadRelatedGames(game);
    
    // 设置全屏按钮事件
    setupFullscreenButton();
    
    // 设置收藏按钮事件
    setupFavoriteButton(game);
    
    /**
     * 更新游戏信息
     * @param {Object} game 游戏对象
     */
    function updateGameInfo(game) {
        document.getElementById('game-title').textContent = game.name;
        document.getElementById('game-description').textContent = game.description;
        document.getElementById('game-category').textContent = game.category;
        document.getElementById('game-rating').textContent = `评分: ${game.rating.toFixed(1)}/5`;
    }
    
    /**
     * 加载游戏iframe
     * @param {Object} game 游戏对象
     */
    function loadGameIframe(game) {
        const iframe = document.getElementById('game-frame');
        const frameContainer = document.querySelector('.game-frame-container');
        
        // 显示加载中提示
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'game-loading';
        loadingDiv.innerHTML = '<p>游戏加载中...</p>';
        frameContainer.appendChild(loadingDiv);
        
        // 设置iframe的src属性
        iframe.src = game.url;
        
        // 对于外部链接，添加额外的安全属性
        if (game.url.startsWith('http')) {
            iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups');
            iframe.setAttribute('allow', 'autoplay; fullscreen; microphone; camera; payment');
            
            // 添加提示信息
            const gameContainer = document.querySelector('.game-container');
            const externalInfo = document.createElement('div');
            externalInfo.className = 'external-info';
            externalInfo.innerHTML = '<p>此游戏由外部平台提供。如果游戏无法正常加载，请尝试点击<a href="' + game.url + '" target="_blank">这里</a>在新窗口中打开。</p>';
            
            // 在iframe上方插入信息
            gameContainer.insertBefore(externalInfo, document.querySelector('.game-frame-container'));
        }
        
        // 监听iframe加载事件
        iframe.onload = function() {
            // 移除加载中提示
            if (loadingDiv.parentNode) {
                loadingDiv.parentNode.removeChild(loadingDiv);
            }
        };
        
        // 监听iframe加载错误
        iframe.onerror = function() {
            handleIframeError(game, frameContainer, loadingDiv);
        };
        
        // 设置超时处理，以防iframe加载太久
        setTimeout(function() {
            if (document.querySelector('.game-loading')) {
                handleIframeError(game, frameContainer, loadingDiv);
            }
        }, 10000); // 10秒后检查
    }
    
    /**
     * 处理iframe加载错误
     * @param {Object} game 游戏对象
     * @param {Element} container iframe容器
     * @param {Element} loadingDiv 加载提示元素
     */
    function handleIframeError(game, container, loadingDiv) {
        // 移除加载中提示
        if (loadingDiv.parentNode) {
            loadingDiv.parentNode.removeChild(loadingDiv);
        }
        
        // 创建错误提示
        const errorDiv = document.createElement('div');
        errorDiv.className = 'game-error';
        errorDiv.innerHTML = `
            <h3>游戏加载失败</h3>
            <p>很抱歉，游戏无法正常加载。请尝试以下方法：</p>
            <ul>
                <li>刷新页面重试</li>
                <li><a href="${game.url}" target="_blank">在新窗口中直接打开游戏</a></li>
                <li>检查您的网络连接</li>
            </ul>
        `;
        
        // 显示错误提示
        container.appendChild(errorDiv);
    }
    
    /**
     * 加载相关游戏
     * @param {Object} game 游戏对象
     */
    function loadRelatedGames(game) {
        // 获取相同类别的游戏，排除当前游戏
        const categoryGames = getGamesByCategory(game.category)
            .filter(g => g.id !== game.id)
            .slice(0, 4); // 最多显示4个相关游戏
        
        const relatedContainer = document.querySelector('.related-games .game-grid');
        
        // 清空容器
        relatedContainer.innerHTML = '';
        
        // 检查是否有相关游戏
        if (categoryGames.length === 0) {
            relatedContainer.innerHTML = '<p class="no-games">暂无相关游戏</p>';
            return;
        }
        
        // 创建相关游戏卡片
        categoryGames.forEach(relatedGame => {
            const gameCard = createGameCard(relatedGame);
            relatedContainer.appendChild(gameCard);
        });
    }
    
    /**
     * 创建游戏卡片元素
     * @param {Object} game 游戏对象
     * @returns {Element} 游戏卡片元素
     */
    function createGameCard(game) {
        const card = document.createElement('div');
        card.className = 'game-card small';
        card.setAttribute('data-id', game.id);
        
        // 构建卡片HTML
        card.innerHTML = `
            <div class="game-thumbnail">
                <img src="${game.thumbnail}" alt="${game.name}" onerror="this.src='images/placeholder.jpg'">
                <div class="game-overlay">
                    <a href="game.html?id=${game.id}" class="play-btn">开始游戏</a>
                </div>
            </div>
            <div class="game-info">
                <h3>${game.name}</h3>
                <div class="game-meta">
                    <span class="game-category">${game.category}</span>
                </div>
            </div>
        `;
        
        // 添加点击事件
        card.addEventListener('click', function() {
            window.location.href = `game.html?id=${game.id}`;
        });
        
        return card;
    }
    
    /**
     * 设置全屏按钮事件
     */
    function setupFullscreenButton() {
        const fullscreenBtn = document.getElementById('fullscreen-btn');
        const gameFrame = document.getElementById('game-frame');
        
        fullscreenBtn.addEventListener('click', function() {
            if (gameFrame.requestFullscreen) {
                gameFrame.requestFullscreen();
            } else if (gameFrame.mozRequestFullScreen) { // Firefox
                gameFrame.mozRequestFullScreen();
            } else if (gameFrame.webkitRequestFullscreen) { // Chrome, Safari, Opera
                gameFrame.webkitRequestFullscreen();
            } else if (gameFrame.msRequestFullscreen) { // IE/Edge
                gameFrame.msRequestFullscreen();
            }
        });
    }
    
    /**
     * 设置收藏按钮事件
     * @param {Object} game 游戏对象
     */
    function setupFavoriteButton(game) {
        const favoriteBtn = document.getElementById('favorite-btn');
        
        // 检查游戏是否已收藏
        const favorites = getFavorites();
        const isFavorite = favorites.includes(game.id);
        
        // 更新按钮文本
        updateFavoriteButtonText(isFavorite);
        
        // 添加点击事件
        favoriteBtn.addEventListener('click', function() {
            toggleFavorite(game.id);
            
            // 更新按钮文本
            const newFavorites = getFavorites();
            const isNowFavorite = newFavorites.includes(game.id);
            updateFavoriteButtonText(isNowFavorite);
        });
    }
    
    /**
     * 更新收藏按钮文本
     * @param {boolean} isFavorite 是否已收藏
     */
    function updateFavoriteButtonText(isFavorite) {
        const favoriteBtn = document.getElementById('favorite-btn');
        favoriteBtn.textContent = isFavorite ? '取消收藏' : '收藏游戏';
        favoriteBtn.classList.toggle('favorited', isFavorite);
    }
    
    /**
     * 获取收藏的游戏ID
     * @returns {Array} 收藏的游戏ID数组
     */
    function getFavorites() {
        const favoritesStr = localStorage.getItem('favorites');
        return favoritesStr ? JSON.parse(favoritesStr) : [];
    }
    
    /**
     * 切换游戏收藏状态
     * @param {string} gameId 游戏ID
     */
    function toggleFavorite(gameId) {
        const favorites = getFavorites();
        const index = favorites.indexOf(gameId);
        
        if (index === -1) {
            // 添加到收藏
            favorites.push(gameId);
        } else {
            // 从收藏中移除
            favorites.splice(index, 1);
        }
        
        // 保存收藏到本地存储
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}); 