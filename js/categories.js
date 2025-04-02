/**
 * 分类页面JavaScript文件
 * 处理游戏分类和筛选逻辑
 */
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const categoryNav = document.getElementById('category-nav');
    const currentCategoryTitle = document.getElementById('current-category');
    const gameGrid = document.getElementById('category-game-grid');
    const searchInput = document.getElementById('game-search');
    const sortSelect = document.getElementById('sort-games');
    
    // 当前选中的分类和排序方式
    let currentCategory = 'all';
    let currentSort = 'name';
    
    // 初始化分类导航
    initCategoryNav();
    
    // 加载所有游戏
    loadGames();
    
    // 添加搜索事件
    searchInput.addEventListener('input', handleSearch);
    
    // 添加排序事件
    sortSelect.addEventListener('change', handleSort);
    
    /**
     * 初始化分类导航
     */
    function initCategoryNav() {
        try {
            // 清空现有导航，以防重复加载
            categoryNav.innerHTML = '';
            
            // 添加"全部"分类
            const allCategoryItem = document.createElement('li');
            allCategoryItem.innerHTML = '<a href="#" class="active" data-category="all">全部游戏</a>';
            categoryNav.appendChild(allCategoryItem);
            
            // 获取所有分类
            const categories = getAllCategories();
            
            // 对类别进行排序，确保一致的显示顺序
            const sortedCategories = [...categories].sort();
            
            // 为每个分类创建导航项
            sortedCategories.forEach(category => {
                const categoryItem = document.createElement('li');
                categoryItem.innerHTML = `<a href="#" data-category="${category}">${category}</a>`;
                categoryNav.appendChild(categoryItem);
            });
            
            // 添加分类点击事件
            categoryNav.addEventListener('click', handleCategoryClick);
            
            // 添加统计信息
            updateCategoryStats();
        } catch (error) {
            console.error('初始化分类导航时出错:', error);
            categoryNav.innerHTML = '<li><p>加载分类失败，请刷新页面重试</p></li>';
        }
    }
    
    /**
     * 更新分类统计信息
     */
    function updateCategoryStats() {
        const allGames = getAllGames();
        const categories = getAllCategories();
        
        // 获取所有链接
        const links = categoryNav.querySelectorAll('a');
        
        // 更新"全部"分类的统计
        links[0].innerHTML = `全部游戏 <span class="category-count">(${allGames.length})</span>`;
        
        // 更新每个分类的统计
        categories.forEach((category, index) => {
            const gamesInCategory = getGamesByCategory(category);
            const link = links[index + 1]; // +1 因为第一个是"全部"
            if (link && link.getAttribute('data-category') === category) {
                link.innerHTML = `${category} <span class="category-count">(${gamesInCategory.length})</span>`;
            }
        });
    }
    
    /**
     * 处理分类点击事件
     * @param {Event} event 事件对象
     */
    function handleCategoryClick(event) {
        event.preventDefault();
        
        // 确保点击的是链接
        if (event.target.tagName === 'A') {
            // 获取分类
            const category = event.target.getAttribute('data-category');
            
            // 更新当前分类
            currentCategory = category;
            
            // 更新UI
            updateActiveCategoryLink(event.target);
            updateCategoryTitle(category);
            
            // 加载游戏
            loadGames();
            
            // 滚动到游戏列表顶部
            document.querySelector('.category-games').scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    /**
     * 更新活动分类链接
     * @param {Element} activeLink 活动链接元素
     */
    function updateActiveCategoryLink(activeLink) {
        // 移除所有活动状态
        const links = categoryNav.querySelectorAll('a');
        links.forEach(link => link.classList.remove('active'));
        
        // 添加活动状态到当前链接
        activeLink.classList.add('active');
    }
    
    /**
     * 更新分类标题
     * @param {string} category 分类名称
     */
    function updateCategoryTitle(category) {
        if (category === 'all') {
            currentCategoryTitle.textContent = '所有游戏';
        } else {
            currentCategoryTitle.textContent = category;
        }
    }
    
    /**
     * 处理搜索事件
     */
    function handleSearch() {
        loadGames();
    }
    
    /**
     * 处理排序事件
     */
    function handleSort() {
        currentSort = sortSelect.value;
        loadGames();
    }
    
    /**
     * 加载游戏
     */
    function loadGames() {
        try {
            // 获取搜索关键词
            const searchTerm = searchInput.value.trim();
            
            // 获取游戏数据
            let games = [];
            
            if (searchTerm) {
                // 搜索模式
                games = searchGames(searchTerm);
                
                // 如果有分类筛选，进一步筛选
                if (currentCategory !== 'all') {
                    games = games.filter(game => game.category === currentCategory);
                }
            } else {
                // 非搜索模式，根据分类获取游戏
                games = getGamesFiltered(currentCategory, currentSort);
            }
            
            // 渲染游戏
            renderGames(games);
            
            // 更新游戏计数
            updateGameCount(games.length);
        } catch (error) {
            console.error('加载游戏时出错:', error);
            gameGrid.innerHTML = '<p class="error-message">加载游戏失败，请刷新页面重试</p>';
        }
    }
    
    /**
     * 更新游戏计数
     * @param {number} count 游戏数量
     */
    function updateGameCount(count) {
        let categoryText = currentCategory === 'all' ? '所有游戏' : currentCategory;
        
        if (searchInput.value.trim()) {
            categoryText += ` (搜索结果)`;
        }
        
        currentCategoryTitle.textContent = `${categoryText} - ${count} 款游戏`;
    }
    
    /**
     * 渲染游戏
     * @param {Array} games 游戏数组
     */
    function renderGames(games) {
        // 清空游戏网格
        gameGrid.innerHTML = '';
        
        // 如果没有游戏
        if (games.length === 0) {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                gameGrid.innerHTML = `<p class="no-games">没有找到与"${searchTerm}"相关的游戏</p>`;
            } else {
                gameGrid.innerHTML = `<p class="no-games">当前分类下暂无游戏</p>`;
            }
            return;
        }
        
        // 创建游戏卡片
        games.forEach(game => {
            const gameCard = createGameCard(game);
            gameGrid.appendChild(gameCard);
        });
    }
    
    /**
     * 创建游戏卡片
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
                    <span class="game-rating">
                        <i class="star-icon">★</i> ${game.rating.toFixed(1)}
                    </span>
                </div>
            </div>
        `;
        
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