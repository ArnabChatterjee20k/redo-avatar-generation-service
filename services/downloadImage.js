async function downloadImage(url){
  const cloudinary = require("cloudinary");
  cloudinary.v2.config({
    cloud_name: "dn2xsmbku",
    api_key: "159531681514635",
    api_secret: "e9S_Fl0tY8MPMReMNG0uIirpcgA",
  });
  const uri = await cloudinary.v2.uploader.upload(url);
  return uri
};

module.exports = downloadImage