/**
 * 热门游戏页面JavaScript文件
 * 处理热门游戏展示逻辑
 */
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // 初始化标签页
    initTabs();
    
    // 加载最多游玩的游戏
    loadMostPlayedGames();
    
    // 添加标签点击事件
    addTabEvents();
    
    /**
     * 初始化标签页
     */
    function initTabs() {
        // 隐藏所有标签内容
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // 显示第一个标签内容
        tabContents[0].classList.add('active');
        
        // 激活第一个标签按钮
        tabButtons[0].classList.add('active');
    }
    
    /**
     * 添加标签点击事件
     */
    function addTabEvents() {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // 获取标签ID
                const tabId = this.getAttribute('data-tab');
                
                // 切换标签
                switchTab(tabId, this);
                
                // 加载相应的游戏
                loadTabGames(tabId);
            });
        });
    }
    
    /**
     * 切换标签
     * @param {string} tabId 标签ID
     * @param {Element} activeButton 活动按钮元素
     */
    function switchTab(tabId, activeButton) {
        // 移除所有标签按钮的活动状态
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // 添加活动状态到当前按钮
        activeButton.classList.add('active');
        
        // 隐藏所有标签内容
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // 显示当前标签内容
        document.getElementById(tabId).classList.add('active');
    }
    
    /**
     * 加载标签游戏
     * @param {string} tabId 标签ID
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
     * 加载最多游玩的游戏
     */
    function loadMostPlayedGames() {
        const games = getMostPlayedGames();
        const container = document.querySelector('#most-played .game-grid');
        renderGames(games, container);
    }
    
    /**
     * 加载评分最高的游戏
     */
    function loadHighestRatedGames() {
        const games = getHighestRatedGames();
        const container = document.querySelector('#highest-rated .game-grid');
        renderGames(games, container);
    }
    
    /**
     * 加载热门游戏
     */
    function loadTrendingGames() {
        const games = getTrendingGames();
        const container = document.querySelector('#trending .game-grid');
        renderGames(games, container);
    }
    
    /**
     * 渲染游戏卡片
     * @param {Array} games 游戏数组
     * @param {Element} container 容器元素
     */
    function renderGames(games, container) {
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
                <img src="${game.thumbnail}" alt="${game.name}">
                <div class="game-overlay">
                    <a href="game.html?id=${game.id}" class="play-btn">开始游戏</a>
                </div>
            </div>
            <div class="game-info">
                <h3>${game.name}</h3>
                <div class="game-meta">
                    <span class="game-category">${game.category}</span>
                    <span class="game-rating">
                        <i class="star-icon">★</i> ${game.rating.toFixed(1)}
                    </span>
                </div>
            </div>
        `;
        
        // 添加点击事件
        card.querySelector('.game-thumbnail').addEventListener('click', function() {
            window.location.href = `game.html?id=${game.id}`;
        });
        
        return card;
    }
}); 