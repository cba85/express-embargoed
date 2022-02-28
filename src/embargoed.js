const fs = require("fs");
const path = require("path");
const { Reader } = require("maxmind");

const db = path.join(__dirname, "../data", "Geoacumen-Country.mmdb");
const blockedCountry = "RU"; // Russia

module.exports = (req, res, next) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    const lookup = new Reader(fs.readFileSync(db));
    const info = lookup.get(ip);

    if (info && info.country.iso_code == blockedCountry) {
        const template = path.join(__dirname, "../public", "embargoed.html");
        const view = fs.readFileSync(template);

        res.setHeader("Content-Type", "text/html");
        res.write(view);
        res.end();
    } else {
        next();
    }
};
