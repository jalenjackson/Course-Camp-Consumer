const Quiz = require('../models/quiz');
const Tag = require('../models/tags');
const mongoose = require('mongoose');
const sitemap = require('sitemap');
const fs = require('fs');
const _ = require('lodash');
let sitemapData;

mongoose.connect('mongodb+srv://jalenjackson:kiHNDOvn8U22Q05U@quizopcluster-16smp.mongodb.net/production?retryWrites=true', {
  useNewUrlParser: true,
})
  .then(() => {
    const generateSitemap = async () => {
      const quizzes = await Quiz.find();
      let urls = [];
      const quizUrls = quizzes.map((quiz) => `/quiz/${_.kebabCase(quiz.title)}/${quiz._id}`);
      const quizSinglePlayerGameUrls = quizzes.map((quiz) => `/single-player/answer-choice/${_.kebabCase(quiz.title)}/${quiz._id}`);

      const personalityQuizzes = await Quiz.find({ 'personalityResultsLength': { $gt: 1 } });
      const personalityQuizGameUrls = personalityQuizzes.map((quiz) => `/personality-quiz/${_.kebabCase(quiz.title)}/${quiz._id}` );
      const blogUrls = ['/blog/7-ways-to-stay-motivated-and-make-millions/5c121805ef33f247b8f90f89'];
      const categoriesUrl = ['/categories'];
      const categories = await Tag.find();
      const categoryUrl = categories.map((category) => `/category/${_.kebabCase(category.name)}`);
      const createAQuizUrl = ['/create-quiz'];
      const featuredUrl = ['/featured'];
      const loginUrl = ['/login']
      const personalityQuizzesUrl = ['/personality-quizzes'];
      const privacyPolicyUrl = ['/privacy-policy'];
      const registerUrl = ['/register'];
      const termsandconditions = ['/terms-and-conditions'];

      urls.push(quizUrls, quizSinglePlayerGameUrls, personalityQuizGameUrls,
          blogUrls, categoriesUrl, categoryUrl, createAQuizUrl, featuredUrl,
          loginUrl, personalityQuizzesUrl, privacyPolicyUrl, registerUrl, termsandconditions
      );
      let finalUrls = [].concat.apply([], urls);

      sitemapData = sitemap.createSitemap({
        hostname: 'https://brainflop.com',
        cacheTime: 600000,        // 600 sec - cache purge period 
        urls: finalUrls
      });
      sitemapData.toXML( function (err, xml) {
        if (err) {
          return res.status(500).end();
        }

        fs.writeFileSync("./sitemapindex.xml", xml);
      });
    };
    generateSitemap()
  });


