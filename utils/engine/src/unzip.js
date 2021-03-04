const _7zip = require("7zip-min")

const file = "./barebones.7z";

_7zip.unpack(file)

console.log("Done")