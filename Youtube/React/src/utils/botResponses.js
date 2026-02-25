export function getBotResponse(msg) {
  const m = msg.toLowerCase().trim();
  if (m.includes('recommend') || m.includes('suggest'))
    return "Based on your watch history, try: 🎵 Lo-Fi Beats, 🐍 Python Crash Course, or 🍳 Gordon Ramsay's Kitchen! Head to the Home feed and use Mood Filters for more personalised picks.";
  if (m.includes('history') || m.includes('watched'))
    return "You can see everything you've watched on the /stats page. It shows total watch time, top categories, and most-watched channels this week! 📊";
  if (m.includes('download') || m.includes('offline'))
    return "Click the ⬇️ icon on any video card to save it for offline viewing. Your downloads live in the /library page — accessible anytime, even without internet!";
  if (m.includes('playlist'))
    return "Head to /playlists to create or browse collaborative playlists. You can add any video via the ⋮ menu on its card, and invite friends by sharing the room link! 🎵";
  if (m.includes('party') || m.includes('watch together'))
    return "Click 'Watch Together' on any video's watch page to generate a Watch Party room link 🎉. It copies to your clipboard — paste it and watch in sync with anyone!";
  if (m.includes('caption') || m.includes('subtitle') || m.includes('cc'))
    return "Press the CC button in the video player controls to toggle captions on/off. Captions sync automatically to the video timestamp in real-time. 💬";
  if (m.includes('mood'))
    return "Use the Mood Filter at the top of the Home feed — 😂 Laugh, 🎓 Learn, 🎵 Music, 😌 Relax. It instantly filters the entire video grid to match your vibe!";
  if (m.includes('stats') || m.includes('watch time'))
    return "Your /stats page is your personal watch dashboard — total watch time this week, top 5 categories with bar charts, and your most-watched channels. All private, all local. 📊";
  if (m.includes('upload') || m.includes('publish') || m.includes('creator'))
    return "Go to /upload to drag & drop your video file. Add a title, description, tags, and chapters. The in-browser preview plays your video live before you publish! 🎬";
  if (m.includes('quality') || m.includes('resolution') || m.includes('4k') || m.includes('8k'))
    return "Use the quality selector (⚙️) in the player controls to switch from 144p all the way up to 8K Ultra. Your preference is remembered per-video automatically! 🖥️";
  if (m.includes('dark') || m.includes('light') || m.includes('theme') || m.includes('mode'))
    return "Toggle dark/light mode using the 🌙 icon in the header. You can also enable High Contrast, Dyslexia Font, and Seizure-Safe Mode in the accessibility settings (⚙️)! ♿";
  if (m.includes('vr') || m.includes('360') || m.includes('virtual reality'))
    return "Look for the 🥽 VR badge on video thumbnails — those are 360° videos! On the watch page, an immersive A-Frame VR viewer loads automatically for full panoramic viewing. 🥽";
  if (m.includes('search') || m.includes('find') || m.includes('look for'))
    return "YTClassic has Smart Natural Language Search — try typing things like 'funny cooking under 5 minutes' or 'gaming speedrun over 30 min' in the search bar! 🔍";
  if (m.includes('ambient') || m.includes('glow'))
    return "Click the Ambient Mode button on the player to extract the dominant color from the video thumbnail and create a cinematic glow effect behind the player. ✨";
  if (m.includes('pip') || m.includes('picture in picture') || m.includes('mini player'))
    return "Click the PiP (📺) button in the player controls to pop the video into a floating Picture-in-Picture window — keep watching while you browse other tabs!";
  if (m.includes('chapter'))
    return "Video chapters appear as white tick marks on the progress bar. Hover over them to see the chapter name. On /upload, you can add chapters with timestamps yourself! 📋";
  if (m.includes('block') || m.includes('not interested') || m.includes('hide'))
    return "Use the ⋮ menu on any video card to mark it as 'Not Interested' or 'Don't recommend this channel'. Those videos and channels will be filtered from your feed automatically! 🚫";
  if (m.includes('diet') || m.includes('break') || m.includes('too much'))
    return "YTClassic has a Content Diet Tracker! After 2 hours in one category, a gentle toast notification suggests a break. It tracks time per category daily. 🧘";
  if (m.includes('poll'))
    return "Some videos have interactive polls that appear at a set timestamp! The player pauses, you vote, see the results, and the video continues. Votes are stored locally. 🗳️";
  if (m.includes('community') || m.includes('post'))
    return "Visit /community to see posts from your favourite channels — text, images, polls. Like and dislike reactions are saved locally so they persist across sessions! 👥";
  if (m.includes('translate') || m.includes('language') || m.includes('spanish') || m.includes('hindi') || m.includes('french'))
    return "Use the language selector (EN/ES/HI/FR) in the header to switch the language of all video titles instantly. Select your language and the whole feed updates! 🌐";
  if (m.includes('hi') || m.includes('hello') || m.includes('hey') || m.includes('sup'))
    return "Hey there! 👋 I'm YT Bot — your intelligent assistant for this platform. Ask me about recommendations, features, watch stats, downloads, playlists, VR videos, and more!";
  if (m.includes('help') || m.includes('what can you do') || m.includes('features'))
    return "I can help with: 🎯 recommendations, 📊 watch stats, ⬇️ downloads, 🎵 playlists, 🎉 watch parties, 💬 captions, 😌 mood filters, 🥽 VR videos, 🔍 smart search, 🌙 dark mode, and much more! Just ask.";
  return "Hmm, I'm not sure about that one! Try asking me about: recommendations, watch history, downloads, playlists, watch parties, VR videos, or any feature you see in the app 🤖";
}
