const BASE_URL = "https://api.weeb.sh"
const ENDPOINTS = {
    INFO: '/images/',
    TAGS: '/images/tags',
    TYPES: '/images/types',
    RANDOM: '/images/random'
}
const KEY_TYPES = [
    "Bearer",
    "Wolke"
]
const FILE_TYPES = [
    "jpeg",
    "jpg",
    "png",
    "gif"
]
module.exports = {BASE_URL, ENDPOINTS, FILE_TYPES, KEY_TYPES};