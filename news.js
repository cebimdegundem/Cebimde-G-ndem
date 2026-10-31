const Parser = require("rss-parser");
const parser = new Parser({ timeout: 12000, headers: { "User-Agent": "CebimdeGundem/1.0" } });
const feeds = {
 "Tümü":"https://news.google.com/rss?hl=tr&gl=TR&ceid=TR:tr",
 "Türkiye":"https://news.google.com/rss/headlines/section/topic/NATION?hl=tr&gl=TR&ceid=TR:tr",
 "İstanbul":"https://news.google.com/rss/search?q=İstanbul&hl=tr&gl=TR&ceid=TR:tr",
 "Dünya":"https://news.google.com/rss/headlines/section/topic/WORLD?hl=tr&gl=TR&ceid=TR:tr",
 "Ekonomi":"https://news.google.com/rss/headlines/section/topic/BUSINESS?hl=tr&gl=TR&ceid=TR:tr",
 "Spor":"https://news.google.com/rss/headlines/section/topic/SPORTS?hl=tr&gl=TR&ceid=TR:tr",
 "Teknoloji":"https://news.google.com/rss/headlines/section/topic/TECHNOLOGY?hl=tr&gl=TR&ceid=TR:tr",
 "Hava & Afet":"https://news.google.com/rss/search?q=deprem+OR+sel+OR+fırtına+OR+hava+durumu&hl=tr&gl=TR&ceid=TR:tr"
};
module.exports = async (req,res) => {
 res.setHeader("Cache-Control","s-maxage=180, stale-while-revalidate=300");
 const category=String(req.query.category||"Tümü"), url=feeds[category]||feeds["Tümü"];
 try {
  const feed=await parser.parseURL(url);
  const articles=(feed.items||[]).slice(0,80).map(x=>({
   title:String(x.title||"Başlıksız haber").replace(/\s+-\s+[^-]+$/,""),
   url:x.link,source:x.creator||"Haber kaynağı",publishedAt:x.isoDate||x.pubDate||null,category
  })).filter(x=>x.title&&x.url&&/^https:\/\//.test(x.url));
  res.status(200).json({category,articles,fetchedAt:new Date().toISOString()});
 } catch(e){res.status(502).json({error:"Haber kaynağına şu anda ulaşılamıyor."});}
};