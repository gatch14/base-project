const fs = require('fs');
const util = require('util');

const obj = fs.readFileSync('data/transports.json', 'utf-8');
const out = JSON.parse(obj);

const show = (req, res) => {
  res.render('transport', { title: 'Googlemap', result: out.transports[ 1 ], travel: 'DRIVING' });
};

const showTransport = (req, res) => {
  req.checkParams({
    transport: {
      isInt: {
        options: [ { min: 1, max: out.transports.length } ],
        errorMessage: 'No transport'
      }
    }
  });

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.json({
        result: 'error',
        message: util.inspect(result.array())
      });
      return;
    }
    const transport = req.params.transport - 1;

    const travelMode = () => {
      if (out.transports[ transport ].vehicule === 'bike') {
        return 'BICYCLING';
      } else if (out.transports[ transport ].vehicule === 'foot') {
        return 'WALKING';
      }
      return 'DRIVING';
    };

    res.render('transport', {
      title: 'Googlemap',
      result: out.transports[ transport ],
      travel: travelMode()
    });
  });

};

module.exports = {
  show,
  showTransport
};
