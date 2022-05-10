const mongoose = require('mongoose');

const topSchema = new mongoose.Schema({
    post_id: String,
    post_name: {
    type: String,
    required:'Yes'
    },
    post_description: String,
    post_image: String,
    post_category: String,
    post_author: String,
    post_date: String,
    post_url: String,
    post_content: String
});

module.exports = mongoose.model('news_lists', topSchema, 'news_list');