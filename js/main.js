/**
 * 首页JavaScript文件
 * 处理首页游戏展示
 */
document.addEventListener('DOMContentLoaded', function() {
    // 获取游戏展示容器
    const gameContainers = document.querySelectorAll('.game-grid');
    
    // 记录图片加载失败
    let imgLoadErrors = 0;
    
    // 加载精选游戏
    const featuredGames = getFeaturedGames();
    if (gameContainers[0]) {
        loadGames(gameContainers[0], featuredGames);
    }
    
    // 加载最新游戏
    const newestGames = getNewestGames();
    if (gameContainers[1]) {
        loadGames(gameContainers[1], newestGames);
    }
    
    /**
     * 在容器中加载游戏列表
     * @param {Element} container 容器元素
     * @param {Array} games 游戏数组
     */
    function loadGames(container, games) {
        // 清空容器
        container.innerHTML = '';
        
        // 检查是否有游戏
        if (games.length === 0) {
            container.innerHTML = '<p class="no-games">暂无游戏</p>';
            return;
        }
        
        // 创建游戏卡片
        games.forEach(game => {
            const gameCard = createGameCard(game);
            container.appendChild(gameCard);
        });
    }
    
    /**
     * 创建游戏卡片元素
     * @param {Object} game 游戏对象
     * @returns {Element} 游戏卡片元素
     */
    function createGameCard(game) {
        const card = document.createElement('div');
        card.className = 'game-card';
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
                    <span class="game-rating">★ ${game.rating.toFixed(1)}</span>
                </div>
            </div>
        `;
        
        // 监听图片加载失败
        const img = card.querySelector('img');
        img.addEventListener('error', function() {
            imgLoadErrors++;
            console.log(`图片加载失败: ${game.thumbnail}`);
            this.src = 'images/placeholder.jpg';
            
            // 如果图片加载错误过多，显示提示
            if (imgLoadErrors > 3) {
                const warningElement = document.createElement('div');
                warningElement.className = 'img-load-warning';
                warningElement.textContent = '部分游戏图片加载失败，请检查图片路径';
                
                // 只添加一次警告
                if (!document.querySelector('.img-load-warning')) {
                    document.querySelector('main').prepend(warningElement);
                    
                    // 5秒后自动隐藏
                    setTimeout(() => {
                        warningElement.style.opacity = '0';
                        setTimeout(() => warningElement.remove(), 1000);
                    }, 5000);
                }
            }
        });
        
        // 添加点击事件
        card.addEventListener('click', function(e) {
            // 如果点击的不是"开始游戏"按钮，则整个卡片可点击
            if (!e.target.classList.contains('play-btn')) {
                window.location.href = `game.html?id=${game.id}`;
            }
        });
        
        return card;
    }
}); 