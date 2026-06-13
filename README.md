# 木夕大里 ｜ 伙山 · DREAM ISLAND

木夕大里·伙山度假酒店官方网站 — Official website for Dream Island, a 21-room mountain resort above Erhai Lake in Shuanglang, Dali, Yunnan.

## 本地预览 / Local preview

纯静态站点，无需构建。直接打开 `index.html`,或起一个本地服务器:

```bash
# Python
python3 -m http.server 8000
# 然后访问 http://localhost:8000
```

## 部署到 GitHub Pages / Deploy

1. 新建仓库并推送本文件夹内容:
   ```bash
   git init
   git add .
   git commit -m "Dream Island official site"
   git branch -M main
   git remote add origin https://github.com/<你的用户名>/<仓库名>.git
   git push -u origin main
   ```
2. 仓库 Settings → Pages → Source 选择 `main` 分支根目录,保存即可。

## 结构 / Structure

```
index.html      首页(全部内容)
styles.css      设计系统与样式
script.js       导航、客房标签、滚动动画
images/         站点图片(均裁切自品牌资料)
```

## 说明 / Notes

- 字体通过 Google Fonts 加载(Cormorant Garamond / Noto Serif SC / Noto Sans SC / Jost)。
- 图片分辨率受原始品牌资料限制,如有更高清原图可直接替换 `images/` 中同名文件。
