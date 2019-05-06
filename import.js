const sourceUrl = 'http://www.mae.ro/maps/3789/',
  jsonfile = 'app/locations.json';

let puppeteer = require('puppeteer'),
  fs = require('fs');


function parse(data) {
  let markers = [];

  data.markers.forEach((marker) => {
    markers.push({
      id: parseInt(marker.n),
      title: marker.m,
      country: marker.co,
      adr: marker.a.replace('<br>', '\n').replace(/\s+$/, ''),
      lat: parseFloat(marker.la),
      lng: parseFloat(marker.lo),
    })
  });

  save({
    source: sourceUrl,
    updated: (new Date).toISOString().split('T')[0],
    markers: markers,
  });
}

function save(data) {
  let fs = require('fs');

  fs.writeFile(jsonfile, JSON.stringify(data, null, 4), 'utf8', (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Successfuly saved data in ${jsonfile}`);
    }
  });
}


(async () => {
  let browser = await puppeteer.launch(),
    page = await browser.newPage();

  await page.goto(sourceUrl, { waitUntil: 'domcontentloaded' });

  let pollingStations = await page.evaluate(
    () => window.pollingStations || []
  );

  if (typeof pollingStations.markers == 'undefined' || !pollingStations.markers.length) {
    console.error('No polling stations data fetched');
  } else {
    parse(pollingStations);
  }

  await browser.close();
})();
