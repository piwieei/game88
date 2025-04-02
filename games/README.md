# 游戏文件夹

这个文件夹用于存放本地HTML5游戏。

外部游戏（如巨人冲刺和上升）直接通过iframe链接加载，不需要存放在此文件夹中。

## 游戏结构

每个游戏应该有自己的文件夹，例如：

```
games/
├── tetris/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── ...
├── snake/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── ...
└── ...
```

## 添加本地游戏

1. 创建新的游戏文件夹
2. 添加游戏文件
3. 在 `js/games-data.js` 中添加游戏信息
4. 在 `images/games/` 中添加游戏缩略图 