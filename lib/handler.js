const https = require("https");
const url = require('url');
const { post } = require('request').defaults({ encoding: null });
const { BASE_URL, ENDPOINTS, FILE_TYPES, KEY_TYPES } = require("./base")
class Handler {
    constructor(key) {
        if (typeof key !== 'string') throw new TypeError('key is not a string.');
        let type = key.split(" ")[0]
        if (!KEY_TYPES.includes(type)) throw new Error("The key type must be either Wolke or Bearer");

        this.key = `${key}`;
    }
    getTags(hidden = false) {
        return new Promise((resolve, reject) => {
            if (typeof hidden != "boolean") reject(new TypeError("Hidden must be a boolean"))
            https.request(Object.assign(url.parse(BASE_URL + ENDPOINTS.TAGS), {
                headers: { Authorization: this.key }
            }), res => {
                let chunked = '';

                res.setEncoding('utf8');
                res.on('data', chunk => chunked += chunk);
                res.on('error', reject);
                res.on('end', () => {
                    try {
                        let ret = JSON.parse(chunked);

                        if (ret.status !== 200) reject(ret);
                        else resolve(ret.tags);
                    } catch (err) {
                        reject(err);
                    }
                });
            }).on('error', reject).end();
        });
    }
    getTypes(hidden = false) {
        return new Promise((resolve, reject) => {
            if (typeof hidden != "boolean") reject(new TypeError("Hidden must be a boolean"))
            https.request(Object.assign(url.parse(BASE_URL + ENDPOINTS.TYPES), {
                headers: { Authorization: this.key }
            }), res => {
                let chunked = '';

                res.setEncoding('utf8');
                res.on('data', chunk => chunked += chunk);
                res.on('error', reject);
                res.on('end', () => {
                    try {
                        let ret = JSON.parse(chunked);

                        if (ret.status !== 200) reject(ret);
                        else resolve(ret.types);
                    } catch (err) {
                        reject(err);
                    }
                });
            }).on('error', reject).end();
        });
    }
    getVersion() {
        return new Promise((resolve, reject) => {
            https.request(Object.assign(url.parse(BASE_URL + ENDPOINTS.INFO), {
                headers: { Authorization: this.key }
            }), res => {
                let chunked = '';

                res.setEncoding('utf8');
                res.on('data', chunk => chunked += chunk);
                res.on('error', reject);
                res.on('end', () => {
                    try {
                        let ret = JSON.parse(chunked);

                        if (ret.status !== 200) reject(ret);
                        else resolve(ret.version);
                    } catch (err) {
                        reject(err);
                    }
                });
            }).on('error', reject).end();
        });
    }
    getRandom(options = {}) {
        return new Promise((resolve, reject) => {
            if (!options.type && !options.tags) return reject(new Error('Either tags or type are required.'));
            if (options.tags && !(options.tags instanceof Array)) return reject(new TypeError("Tags is not an array"))
            if (options.nsfw && typeof options.nsfw != "boolean" && options.nsfw != "only") return reject(new Error("nsfw must either be true, false or only"))
            if (options.hidden && typeof options.hidden != "boolean") return reject(new TypeError("hidden must be a boolean"))
            if (options.filetype && typeof options.filetype != "string") return reject(new TypeError("filetype must be a string"))
            if (options.filetype && !FILE_TYPES.includes(options.filetype.toLowerCase())) return reject(new Error("filetype must be either jpeg, jpg, png or gif"))
            let query = `?hidden=${options.hidden || false}&nsfw=${options.nsfw || false}`;
            if (options.type) query += `&type=${options.type}`
            if (options.tags) query += `&tags=${options.tags.join(",")}`
            if (options.filetype) query += `&filetype=${options.filetype}`

            https.request(Object.assign(url.parse(BASE_URL + ENDPOINTS.RANDOM + query), {
                headers: { Authorization: this.key }
            }), res => {
                let chunked = '';

                res.setEncoding('utf8');
                res.on('data', chunk => chunked += chunk);
                res.on('error', reject);
                res.on('end', () => {
                    try {
                        let ret = JSON.parse(chunked);

                        if (ret.status !== 200) reject(ret);
                        else {
                            resolve(ret.url);
                        }
                    } catch (err) {
                        reject(err);
                    }
                });
            }).on('error', reject).end();
        });
    }
    generateImage(type, options = {}) {
        return new Promise((resolve, reject) => {
            if (typeof type != "string" || (type != "awooo" && type != "eyes" && type != "wan")) return reject(new TypeError("Type must be a string and either awooo, eyes or wan"))
            let query = "?type=" + type
            if (type = "awoo" && (options.hair || options.face)) {
                if (options.hair && typeof options.hair != "number") return reject(new TypeError("Hair must be a number"))
                if (options.face && typeof options.face != "number") return reject(new TypeError("Face must be a number"))
                query += options.hair ? "&hair=" + options.hair : "" + options.face ? "&face=" + options.face : ""
            }
            https.request(Object.assign(url.parse(BASE_URL + ENDPOINTS.GENERATE + query), {
                headers: { Authorization: this.key }
            }), res => {
                let chunked = '';
                res.setEncoding('utf8');
                res.on('data', chunk => chunked += chunk);
                res.on('error', reject);
                res.on('end', () => {

                    let ret = chunked
                    if (res.statusCode != 200) {
                        let error = JSON.parse(chunked)
                        reject(error.message)
                    } else {
                        try {
                            let buf = new Buffer(ret, 'base64');
                            resolve(buf);
                        } catch (err) {
                            reject(err);
                        }
                    }
                });
            }).on('error', reject).end();
        });
    }
    generateLicense(options = {}) {
        return new Promise((resolve, reject) => {
            if (typeof options.avatar != "string" || typeof options.title != "string") return reject(new Error("Title and Avatar need to be given and must be a string."))
            if (options.badges && (!(options.badges instanceof Array) || options.badges.length > 3 || options.badges.length < 1)) return reject(new TypeError("Badges must be an array that contains at least 1 and not more than 3 values"))
            if (options.widgets && (!(options.widgets instanceof Array) || options.widgets.length > 3 || options.widgets.length < 1)) return reject(new TypeError("Widgets must be an array that contains at least 1 and not more than 3 values"))
            const postData = {
                "title": options.title,
                "avatar": options.avatar
            }
            
            if(options.widgets) postData["widgets"] = options.widgets
            if(options.badges) postData["badges"] = options.badges
            const postOptions = {
                method: 'post', body: postData, json: true, url: Object.assign(url.parse(BASE_URL + ENDPOINTS.LICENSE)),
                  headers: { Authorization: this.key },
              };
            post(postOptions, function (error, response, body) {
                if(error) return reject(error)
                if(response.statusCode != 200) reject(body)
                else resolve(body)
            });
        });
    }
}
module.exports = Handler;