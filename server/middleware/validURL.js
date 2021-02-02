module.exports = (req, res, next) => {
  const { title, link, author, tags, likes } = req.body;

  function isValidHttpUrl(string) {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
  }

  if (req.path === "/track") {
    if (![title, link, author, tags, likes].every(Boolean)) {
      return res.status(403).json("Missing Fields");
    } else if (!isValidHttpUrl(link)) {
      return res.status(401).json("Invalid link to track");
    }
  }
  next();
};
