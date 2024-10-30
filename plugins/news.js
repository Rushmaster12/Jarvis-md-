const { System, isPrivate, TechNews } = require("../lib/");

System({
  pattern: 'technews (.*)',
  fromMe: isPrivate,
  desc: 'Get tech news',
  type: 'news',
}, async (message, match, m) => {
  const techNews = new TechNews();
  const topic = match.toLowerCase();
  const availableTopics = ['gadgets', 'technology', 'laptops', 'reviews', 'science', 'gallery', 'videos', 'mobiles', 'techook'];
  
  if (availableTopics.includes(topic)) {
    const result = await techNews.news(topic);
    let newsItem;
    
    if (result.gadgets) {
      const gadgets = result.gadgets;
      const randomIndex = Math.floor(Math.random() * gadgets.length);
      newsItem = gadgets[randomIndex];
    } else if (result.technology) {
      const technology = result.technology;
      const randomIndex = Math.floor(Math.random() * technology.length);
      newsItem = technology[randomIndex];
    } else if (result.videos) {
      const videos = result.videos;
      const randomIndex = Math.floor(Math.random() * videos.length);
      newsItem = videos[randomIndex];
    } else if (result.laptops) {
      const laptops = result.laptops;
      const randomIndex = Math.floor(Math.random() * laptops.length);
      newsItem = laptops[randomIndex];
    } else if (result.reviews) {
      const reviews = result.reviews;
      const randomIndex = Math.floor(Math.random() * reviews.length);
      newsItem = reviews[randomIndex];
    } else if (result.science) {
      const science = result.science;
      const randomIndex = Math.floor(Math.random() * science.length);
      newsItem = science[randomIndex];
    } else if (result.gallery) {
      const gallery = result.gallery;
      const randomIndex = Math.floor(Math.random() * gallery.length);
      newsItem = gallery[randomIndex];
    } else if (result.mobiles) {
      const mobiles = result.mobiles;
      const randomIndex = Math.floor(Math.random() * mobiles.length);
      newsItem = mobiles[randomIndex];
    } else if (result.techook) {
      const techook = result.techook;
      const randomIndex = Math.floor(Math.random() * techook.length);
      newsItem = techook[randomIndex];
    } else {
      newsItem = result;
    }
    
    if (newsItem) {
      await message.send(`*TITLE:* ${newsItem.title}\n*LINK:* ${newsItem.link}`, {
        image: newsItem.image,
        footer: "*JARVIS-MD*",
        title: "*TOP TECH NEWS*"
      });
    } else {
      await message.reply(`*No news found for* ${topic}`);
    }
  } else {
    await message.reply(`*Available topics:* ${availableTopics.join(', ')}. *Please specify a valid topic, e.g., technews gadgets*`);
  }
});
