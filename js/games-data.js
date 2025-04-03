/**
 * Game data
 * Contains information for all games on the website
 */
const gamesData = [
    {
        id: 'giant-rush',
        name: 'Giant Rush',
        description: '在巨人冲刺中奔跑、合并和战斗巨人 – 这是一场终极动作冒险！这是一个令人兴奋的街机游戏，你需要在充满障碍的赛道上奔跑，收集彩色人偶来变得更大更强！你吸收的越多，你的巨人就会变得越大 – 而在终点线，一场史诗级的Boss战等着你！躲避危险，完美把握时机，合并走向胜利。每次奔跑，你都可以升级巨人的力量并解锁新的挑战。',
        thumbnail: 'images/games/giant-rush.jpg',
        url: 'https://play.famobi.com/giant-rush',
        category: 'Arcade',
        rating: 4.7,
        playCount: 23450,
        dateAdded: '2023-06-18',
        isFeatured: true,
        isTrending: true,
        likes: 342
    },
    {
        id: 'rise-up',
        name: 'Rise Up',
        description: '在上升中保护、躲避并上升到顶端 – 这是终极生存挑战！这是一个紧张刺激的街机游戏，你唯一的目标就是不惜一切代价保护上升的气球！当它飘得越来越高时，危险的障碍物会出现在它的路径上，随时准备刺破它。你的任务？使用你的盾牌推开物体，清除道路，确保气球安全上升。随着难度的增加，每一秒都很重要，需要快速反应和战略性移动。',
        thumbnail: 'images/games/rise-up.jpg',
        url: 'https://play.famobi.com/rise-up',
        category: 'Arcade',
        rating: 4.6,
        playCount: 19870,
        dateAdded: '2023-06-15',
        isFeatured: true,
        isTrending: true,
        likes: 287
    },
    {
        id: 'western-sniper',
        name: 'Western Sniper',
        description: '瞄准并成为终极枪手！在《西部狙击手》中，您将扮演一位无畏的神枪手，在狂野西部与匪徒展开对决。匪徒已经占领了小镇，现在需要您用精准的射击将他们一一击倒！从酒馆到尘土飞扬的街道，每个关卡都会带来新的敌人和更具挑战性的任务。运用您的狙击技能，完美把握时机，证明您是西部最快的枪手。《西部狙击手》以身临其境的环境和刺激的枪战带来持续不断的激动体验！',
        thumbnail: 'images/games/western-sniper.jpg',
        url: 'https://play.famobi.com/western-sniper',
        category: 'Action',
        rating: 4.5,
        playCount: 18650,
        dateAdded: '2023-07-05',
        isFeatured: true,
        isTrending: false,
        likes: 213
    },
    {
        id: 'spot-the-cat',
        name: 'Spot the Cat',
        description: '在《寻找猫咪》这款有趣的寻物解谜游戏中发现隐藏的物品！这是一款充满魅力的益智游戏，您将在充满活力的卡通场景中寻找顽皮的猫咪和隐藏的物品。从阳光明媚的海滨沙滩上的沙滩球到雪地里的香蕉，每个关卡都提供了令人愉快的挑战，让您在猫咪们的顽皮玩耍中寻找巧妙隐藏的物品。凭借精美的场景和越来越具挑战性的谜题，《寻找猫咪》为所有年龄段的玩家提供了轻松而引人入胜的体验。',
        thumbnail: 'images/games/spot-the-cat.jpg',
        url: 'https://play.famobi.com/spot-the-cat',
        category: 'Puzzle',
        rating: 4.4,
        playCount: 15780,
        dateAdded: '2023-07-12',
        isFeatured: false,
        isTrending: true,
        likes: 198
    },
    {
        id: 'train-miner',
        name: 'Train Miner',
        description: '踏上无尽的采矿之旅！在《矿车列车》中扩张、升级并称霸铁轨。这是一款独特而令人上瘾的资源采矿游戏，您将控制一列行驶在循环轨道上的火车，自动收获附近的宝贵资源。随着采矿进行，轨道会扩展，解锁新区域并提高您的利润。出售您的资源，升级您的火车，并观察它随着每次运行变得更长、更快！《矿车列车》完美融合了策略、自动化和令人满足的进度发展，让您在建立终极采矿帝国的过程中乐此不疲。加入铁路，挖掘资源，并在《矿车列车》中扩展您的铁路帝国！',
        thumbnail: 'images/games/train-miner.jpg',
        url: 'https://play.famobi.com/train-miner',
        category: 'Arcade',
        rating: 4.3,
        playCount: 14320,
        dateAdded: '2023-07-20',
        isFeatured: false,
        isTrending: true,
        likes: 167
    },
    {
        id: 'braindom',
        name: 'Braindom',
        description: '《脑力挑战》是一款令人上瘾的益智游戏，通过各种创意十足的小游戏让您的大脑保持活跃。每一关都会呈现一个独特的谜题或脑筋急转弯，您需要找出确切的解答方式。这不仅仅是解谜游戏，《脑力挑战》还带您穿越历史长河！随着游戏进程，您将解锁关于历史重要人物的有趣事实。游戏包含数百个关卡，既富有教育意义又无尽欢乐。来测试您的智慧，揭开历史秘密吧！',
        thumbnail: 'images/games/braindom.jpg',
        url: 'https://play.famobi.com/braindom',
        category: 'Puzzle',
        rating: 4.5,
        playCount: 17650,
        dateAdded: '2023-08-02',
        isFeatured: true,
        isTrending: true,
        likes: 231
    },
    {
        id: 'sort-it',
        name: 'Sort It',
        description: '《颜色分类》是一款考验您逻辑和策略能力的益智游戏。游戏目标很简单：将不同颜色的球分类到对应颜色的管子中。但不要被这种简单性所欺骗！随着游戏的进行，谜题变得越来越复杂，将您的问题解决能力推向极限。通过鲜艳的视觉效果和难度逐渐提升的关卡，《颜色分类》提供了无尽小时的引人入胜的游戏体验，既有趣又能锻炼大脑。准备好挑战自己的分类能力了吗？',
        thumbnail: 'images/games/sort-it.jpg',
        url: 'https://play.famobi.com/sort-it',
        category: 'Puzzle',
        rating: 4.4,
        playCount: 16780,
        dateAdded: '2023-08-05',
        isFeatured: false,
        isTrending: true,
        likes: 189
    },
    {
        id: 'cube-match',
        name: 'Cube Match',
        description: '《立方体配对》是一款令人着迷的3D游戏体验，将您的解谜技巧推向极限。在这个浮动立方体的世界中，立方体上装饰着独特的符号，您的任务是旋转这个集群并排列图标以获得优势。通过简单的点击，将立方体传送到您的个人栏，但要有策略——只有通过对齐三个相同的符号才能将它们清除。您只有八个位置可用，所以每一步都至关重要。您能保持栏位清晰并智胜立方体阵列，还是会被填满的栏位击败？挑战随着每个关卡升级，挑战您成为符号的终极大师。',
        thumbnail: 'images/games/cube-match.jpg',
        url: 'https://play.famobi.com/cube-match',
        category: 'Puzzle',
        rating: 4.2,
        playCount: 14270,
        dateAdded: '2023-08-08',
        isFeatured: false,
        isTrending: false,
        likes: 143
    },
    {
        id: 'parking-jam',
        name: 'Parking Jam',
        description: '《停车场混乱》是一款考验您逻辑和问题解决能力的益智游戏！您的目标是什么？将汽车从拥挤的停车场中解救出来，但有一个问题——汽车彼此阻挡，您需要按正确的顺序移动它们以避免交通拥堵。每个关卡都带来一个新的停车场谜题，随着更多汽车和障碍物的出现，复杂度不断增加。成功清空停车场的满足感让每一步都值得！勇敢面对挑战，成为《停车场混乱》中的终极停车大师！',
        thumbnail: 'images/games/parking-jam.jpg',
        url: 'https://play.famobi.com/parking-jam',
        category: 'Puzzle',
        rating: 4.3,
        playCount: 15380,
        dateAdded: '2023-08-12',
        isFeatured: false,
        isTrending: false,
        likes: 156
    },
    {
        id: 'fashion-battle',
        name: 'Fashion Battle',
        description: '《时尚对决》是一款引人入胜的时尚游戏，您将与CPU对手在激动人心的T台对决中一决高下。为您的模特搭配完美契合给定主题的服装，确保每个细节都恰到好处。当您走上T台，每一步都会让压力不断攀升。最终考验来自于评审团对您的造型进行评估并加冕最具时尚感的参赛者。通过各种主题和无尽的衣橱可能性，每一轮都是展示您时尚实力的机会！踏入聚光灯下，让您的时尚直觉引领您走向胜利！',
        thumbnail: 'images/games/fashion-battle.jpg',
        url: 'https://play.famobi.com/fashion-battle',
        category: 'Girls',
        rating: 4.2,
        playCount: 13920,
        dateAdded: '2023-08-15',
        isFeatured: true,
        isTrending: false,
        likes: 178
    },
    {
        id: 'fruit-party',
        name: 'Fruit Party',
        description: '《水果派对》是一款令人上瘾的2D游戏，您需要将水果放入篮子并合并相同的水果以创造更大、更多汁的水果。每次成功合并都会增加您的分数并为每次未见过的升级提供金币。但要注意！随着篮子的填满，挑战会变得更加激烈，如果您的水果越过顶线，游戏就结束了。使用能力如免费升级或篮子摇晃来保持游戏进行并最大化您的分数。开始投放、合并和发展您的水果帝国吧！',
        thumbnail: 'images/games/fruit-party.jpg',
        url: 'https://play.famobi.com/fruit-party',
        category: 'Arcade',
        rating: 4.4,
        playCount: 16280,
        dateAdded: '2023-08-18',
        isFeatured: false,
        isTrending: true,
        likes: 203
    },
    {
        id: 'peet-a-lock',
        name: 'Peet a Lock',
        description: '《开锁大挑战》是一款充满乐趣的急速开锁游戏！帮助主角Peet解锁浴室门，这是他人生中最重要的挑战。游戏玩法非常简单但极具挑战性——当线条在圆圈中移动时，您需要精确地点击屏幕，击中高亮显示的点。随着关卡的进展，难度会不断增加，需要击中的点越来越多。但要小心——如果您没能及时解锁门，Peet就会失控并遭遇尴尬状况！凭借其搞笑的游戏玩法和令人上瘾的机制，《开锁大挑战》既有趣又具挑战性，无限关卡让您永远不会感到无聊。',
        thumbnail: 'images/games/peet-a-lock.jpg',
        url: 'https://play.famobi.com/peet-a-lock',
        category: 'Skill',
        rating: 4.3,
        playCount: 12500,
        dateAdded: '2023-08-25',
        isFeatured: false,
        isTrending: true,
        likes: 165
    }
];

/**
 * Get all games data
 * @returns {Array} Array of game data
 */
function getAllGames() {
    return gamesData;
}

/**
 * Get game by ID
 * @param {string} id Game ID
 * @returns {Object|null} Game object or null
 */
function getGameById(id) {
    return gamesData.find(game => game.id === id) || null;
}

/**
 * Get featured games
 * @returns {Array} Array of featured games
 */
function getFeaturedGames() {
    return gamesData.filter(game => game.isFeatured);
}

/**
 * Get trending games
 * @returns {Array} Array of trending games
 */
function getTrendingGames() {
    return gamesData.filter(game => game.isTrending);
}

/**
 * Get newest games
 * @param {number} limit Limit count
 * @returns {Array} Array of newest games
 */
function getNewestGames(limit = 6) {
    return [...gamesData]
        .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
        .slice(0, limit);
}

/**
 * Get games by category
 * @param {string} category Game category
 * @returns {Array} Array of games in specified category
 */
function getGamesByCategory(category) {
    return category === 'all' 
        ? gamesData 
        : gamesData.filter(game => game.category === category);
}

/**
 * Get all game categories
 * @returns {Array} Array of unique game categories
 */
function getAllCategories() {
    const categories = new Set(gamesData.map(game => game.category));
    return Array.from(categories);
}

/**
 * Get most played games
 * @param {number} limit Limit count
 * @returns {Array} Array of most played games
 */
function getMostPlayedGames(limit = 12) {
    return [...gamesData]
        .sort((a, b) => b.playCount - a.playCount)
        .slice(0, limit);
}

/**
 * Get highest rated games
 * @param {number} limit Limit count
 * @returns {Array} Array of highest rated games
 */
function getHighestRatedGames(limit = 12) {
    return [...gamesData]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit);
}

/**
 * Search games
 * @param {string} query Search keyword
 * @returns {Array} Array of matching games
 */
function searchGames(query) {
    const searchTerm = query.toLowerCase();
    return gamesData.filter(game => 
        game.name.toLowerCase().includes(searchTerm) || 
        game.description.toLowerCase().includes(searchTerm)
    );
}

/**
 * Get games filtered by category and sort method
 * @param {string} category Game category
 * @param {string} sortBy Sort method (name, rating, newest)
 * @returns {Array} Sorted array of games
 */
function getGamesFiltered(category, sortBy = 'name') {
    let filteredGames = category === 'all' 
        ? [...gamesData] 
        : gamesData.filter(game => game.category === category);
    
    switch(sortBy) {
        case 'name':
            return filteredGames.sort((a, b) => a.name.localeCompare(b.name));
        case 'rating':
            return filteredGames.sort((a, b) => b.rating - a.rating);
        case 'newest':
            return filteredGames.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        default:
            return filteredGames;
    }
}

/**
 * Get most liked games
 * @param {number} limit Limit count
 * @returns {Array} Array of most liked games
 */
function getMostLikedGames(limit = 12) {
    return [...gamesData]
        .sort((a, b) => b.likes - a.likes)
        .slice(0, limit);
}

/**
 * Like a game by ID
 * @param {string} id Game ID
 * @returns {boolean} Success status
 */
function likeGame(id) {
    // Find the game
    const game = getGameById(id);
    if (!game) return false;
    
    // Check if user already liked this game
    const likedGames = getLikedGames();
    if (likedGames.includes(id)) {
        // User already liked the game, so unlike it
        game.likes = Math.max(0, game.likes - 1);
        
        // Remove from liked games
        const updatedLikedGames = likedGames.filter(gameId => gameId !== id);
        localStorage.setItem('likedGames', JSON.stringify(updatedLikedGames));
        return false;
    } else {
        // User hasn't liked the game yet, so like it
        game.likes++;
        
        // Add to liked games
        likedGames.push(id);
        localStorage.setItem('likedGames', JSON.stringify(likedGames));
        return true;
    }
}

/**
 * Get all games liked by the user
 * @returns {Array} Array of game IDs liked by the user
 */
function getLikedGames() {
    const likedGames = localStorage.getItem('likedGames');
    return likedGames ? JSON.parse(likedGames) : [];
}

/**
 * Check if a game is liked by the user
 * @param {string} id Game ID
 * @returns {boolean} True if the game is liked
 */
function isGameLiked(id) {
    const likedGames = getLikedGames();
    return likedGames.includes(id);
} 