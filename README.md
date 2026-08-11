# 木夕大里 · DREAM ISLAND

木夕大里双酒店官方网站：伙山为洱海东岸山中的21间客房建筑与艺术居所，洱海为双廊水边的7间客房姐妹酒店。

## 本地预览 / Local preview

纯静态站点，无需构建。直接打开 `index.html`,或起一个本地服务器:

```bash
# Python
python3 -m http.server 8000
# 然后访问 http://localhost:8000
```

## 发布 / Deploy

源代码推送至 GitHub；生产环境为 Nginx 托管的纯静态文件。发布时应从已提交版本生成干净 artifact，再同步到站点目录，避免上传本地未跟踪文件。

## 结构 / Structure

```
index.html             双酒店品牌 Landing
landing.css/js         Landing SVG 地图与交互
huoshan/               伙山英文页
erhai/                  洱海英文页与独立样式
zh/                     品牌、伙山、洱海中文页
styles.css              Property 页面共享设计系统
script.js               伙山导航、客房、表单与分析交互
images/                  品牌授权图片
```

## 说明 / Notes

- 字体通过 Google Fonts 加载(Cormorant Garamond / Noto Serif SC / Noto Sans SC / Jost)。
- 图片分辨率受原始品牌资料限制,如有更高清原图可直接替换 `images/` 中同名文件。
