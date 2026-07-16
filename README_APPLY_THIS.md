# GOOD SIGN — 12星座 3D 小人（希臘雕像風）更新

## 這次改了什麼
新增 `src/components/ZodiacStatue.jsx`：把既有的星座意象圖，透過 CSS 疊圖技巧
（依元素調色的 mix-blend 貼圖 + 光影漸層 + 底座 SVG）做成小型大理石/青銅雕像感，
滑鼠移動時會有真正的透視傾斜（3D tilt），光源也會跟著游標移動——不需要任何額外
的 3D 模型檔案。

套用位置：
- 「Choose The Soul」星座選擇畫廊（取代原本的扁平圓形肖像）
- Oracle Report 結果頁最上方
- AI 練習聊天室的對象頭像

## 如何套用（github.dev）
1. 打開 https://github.dev/jaypeng123/good-sign
2. **新增檔案**：src/components/ZodiacStatue.jsx
3. **覆蓋以下既有檔案**：
   - src/App.jsx
   - src/scenes/Chat.jsx
   - src/scenes/ChooseSoul.jsx
   - src/scenes/Report.jsx
4. Commit 並推送，Vercel 會自動重新部署

⚠️ 這個更新是接續上一次「Observatory」大改版之後的疊加更新，請確認上一份 zip
（good-sign-observatory-update.zip）已經套用過，這次的檔案才能正確運作。
