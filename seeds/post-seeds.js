const { Post } = require("../models");

const postData = [
  {
    title: "Lorem ipsum dolor sit amet consectetur, adipiscing elit ridiculus.",
    content:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit dapibus phasellus, fusce iaculis posuere a torquent turpis ut proin. Purus rhoncus praesent tincidunt senectus, elementum lobortis condimentum pharetra, faucibus ligula urna.",
    user_id: 1,
  },
  {
    title: "Lorem ipsum dolor sit amet consectetur, adipiscing elit ridiculus.",
    content:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit dapibus phasellus, fusce iaculis posuere a torquent turpis ut proin. Purus rhoncus praesent tincidunt senectus, elementum lobortis condimentum pharetra, faucibus ligula urna.",
    user_id: 2,
  },
  {
    title: "Lorem ipsum dolor sit amet consectetur, adipiscing elit ridiculus.",
    content:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit dapibus phasellus, fusce iaculis posuere a torquent turpis ut proin. Purus rhoncus praesent tincidunt senectus, elementum lobortis condimentum pharetra, faucibus ligula urna.",
    user_id: 3,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
