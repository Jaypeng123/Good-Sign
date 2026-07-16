# GOOD SIGN — AI 截圖分析 + 人格化聊天 更新

## 這次改了什麼
1. **對話截圖上傳**（Profiles 頁面 Target 欄位下方，選填）
   上傳後會先嘗試用 Gemini Vision 分析截圖的互動氣氛（回覆速度感、溫暖度、話題延展性），
   沒有 API Key 或請求失敗時，自動改用本地確定性演算法模擬同樣的分析結果——不會是空白或報錯。
   這個分析結果會：
   - 成為契合度演算法的第 6 個加權維度（有上傳截圖時，其他維度權重會等比例讓出空間給它）
   - 自然融入 Oracle Report 第一章「初次印象」的敘述文字裡
   - 微調塔羅話題牌組的推薦分數

2. **AI 練習聊天室升級為使用完整人物側寫**
   之前聊天機器人只知道對方的星座，現在會把你在 Profiles 頁填的 MBTI、聊天風格、依戀風格、
   興趣全部餵給 Gemini 的角色扮演 prompt，讓對話更貼近你設定的這個人，而不是只有星座刻板印象。
   沒有 API Key 時的本地備援回覆也維持運作，但仍以元素分類為主（本地版無法做到完整人格模擬，
   這是預期中的優雅降級）。

## 如何套用（github.dev）
打開 https://github.dev/jaypeng123/good-sign ，用這份 zip 裡對應路徑的檔案，**覆蓋**以下既有檔案：
- src/App.jsx
- src/data.js
- src/lib/gemini.js
- src/scenes/Chat.jsx
- src/scenes/Profiles.jsx

沒有新增檔案，也沒有要刪除的檔案。這是接續先前兩次更新（Observatory 大改版 + 3D雕像小人）之後的疊加更新。

## ⚠️ 關於你分享的 Gemini API Key
你在對話裡貼的那把 Key 我沒有寫進任何檔案裡。請自己到 **Vercel 專案 → Settings → Environment Variables**
新增一筆：
- Key: `VITE_GEMINI_API_KEY`
- Value: 你的金鑰

存好後重新部署（redeploy）即可生效。

**重要提醒**：因為這是純前端 Vite 專案，`VITE_` 開頭的環境變數最終會被打包進瀏覽器下載的 JS 檔案裡，
任何打開瀏覽器開發者工具的訪客都看得到這把金鑰。這是你稍早已經確認過、選擇維持的架構（前端直連、
不做 serverless 代理），適合內部 demo、非付費金鑰的情境；如果之後要正式對外，建議改成後端代理。
