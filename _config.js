var mongoURI = {
 development: 'mongodb://localhost/target-marketing',
 test: 'mongodb://localhost/target-marketing-test',
 production: process.env.MONGOLAB_URI
};

module.exports = {
 TOKEN_SECRET: process.env.TOKEN_SECRET,
 MONGO_URI: mongoURI,
 SALT_WORK_FACTOR: 10,
 GOOGLE_SECRET: process.env.GOOGLE_SECRET,
 GITHUB_SECRET: process.env.GITHUB_SECRET,
 BEA_ID: process.env.BEA_ID,
 CENS_ID: process.env.CENS_ID
};









