const fs = require("fs");
const { Reader } = require("maxmind");

const db = "./data/Geoacumen-Country.mmdb";
const blockedCountry = "FR";

module.exports = (req, res, next) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    const lookup = new Reader(fs.readFileSync(db));
    const info = lookup.get(ip);

    if (info && info.country.iso_code == blockedCountry) {
        const template = "./public/maintenance.html";
        const view = fs.readFileSync(template);

        res.setHeader("Content-Type", "text/html");
        res.write(view);
        res.end();
    } else {
        next();
    }
};
