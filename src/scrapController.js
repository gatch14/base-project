const cheerio = require('cheerio');
const phantom = require('phantom');

// scrap url and return in json
const scrap = async(req, res) => {
  const instance = await phantom.create();
  const page = await instance.createPage();
  await page.on('onResourceRequested', function(requestData) {
    console.info('Requesting', requestData.url);
  });

  const status = await page.open('https://www.reseau-stas.fr/fr/actus-et-infos-reseau/3');

  if(status === 'fail') {
    res.json({
      result: 'scrap fail'
    });
    return;
  }

  const content = await page.property('content');
  await instance.exit();
  const $ = cheerio.load(content);
  let result = [];
  $('h2').each(function(i){
    result.push({});
    result[i].title = $(this).text().trim();
    result[i].date = $(this).next().text().trim();
    result[i].summary = $(this).next().next().text().trim();
  });
  res.json({data: result});
  return;
};

module.exports = {
  scrap
};
