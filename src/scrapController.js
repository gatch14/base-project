const cheerio = require('cheerio');
const phantom = require('phantom');

// scrap url and return in json
const scrap = async(req, res) => {
  'use strict';
  const url = 'http://www.reseau-stas.fr/fr/actus-et-infos-reseau/3';

  const instance = await phantom.create();
  const page = await instance.createPage();
  await page.on('onResourceRequested', function(requestData) {
    console.info('Requesting', requestData.url);
  });

  const status = await page.open(url);

  if(status === 'fail') {
    res.json({
      result: 'scrap fail url is invalid'
    });
    return;
  }

  const content = await page.property('content');
  await instance.exit();
  const $ = cheerio.load(content);
  let data = [];
  $('h2').each(function(i){
    data.push({});
    data[i].title = $(this).text().trim();
    data[i].date = $(this).next().text().trim();
    data[i].summary = $(this).next().next().text().trim();
  });
  res.json({data: data});
};

module.exports = {
  scrap
};
