# GOOD SIGN — Observatory 更新套件

## 這次改了什麼
- 真實多維度加權契合度演算法（星座元素/MBTI/依戀風格/聊天風格/興趣/年齡），正規化到 50-98%，不再是固定分數
- 新增「你」與「對象」雙欄位輸入表單（Profiles.jsx）
- 星座圖庫改用正片疊底（mix-blend-mode: multiply）疊加真實圖片，並做出焦點模糊景深 hover 效果
- 塔羅牌加大到 >=420px，新增「Avoid Saying」提示
- 新增 AI 練習聊天室（Chat.jsx）：打字中動畫、已讀狀態、星座人格鎖定回覆
- 分享頁新增 IG / Threads 文案產生器
- 整合 Gemini 1.5 Flash API（src/lib/gemini.js），讀取 VITE_GEMINI_API_KEY，沒有金鑰或請求失敗都會自動 fallback 回本地演算法
- 新增希臘迴紋背景飾條 + 閃爍星星粒子；報告/塔羅/聊天/分享頁面會隱藏裝飾性外框，讓畫面更純粹

## 如何套用（github.dev 或網頁版 GitHub）
1. 打開 https://github.dev/jaypeng123/good-sign
2. 用這個 zip 裡對應路徑的檔案，逐一覆蓋 repo 內同路徑的檔案（新檔案直接新增）
3. **刪除** `src/scenes/Calibration.jsx`（已被 Profiles.jsx 取代，不再使用）
4. （選用）在 Vercel 專案設定裡加入環境變數 `VITE_GEMINI_API_KEY`，才會啟用真正的 Gemini AI；不加也完全可以運作，會自動使用本地演算法
5. Commit 並推送，Vercel 會自動重新部署

## 檔案清單
- .env.example（新增）
- .gitignore（新增）
- src/App.jsx
- src/data.js
- src/index.css
- src/components/AmbientBackground.jsx
- src/components/GreekMeander.jsx（新增）
- src/lib/gemini.js（新增）
- src/scenes/Cards.jsx
- src/scenes/ChooseSoul.jsx
- src/scenes/Chat.jsx（新增）
- src/scenes/Profiles.jsx（新增）
- src/scenes/Share.jsx
- ⚠️ 記得刪除 src/scenes/Calibration.jsx
