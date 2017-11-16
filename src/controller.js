const fs = require('fs');
const util = require('util');
const obj = fs.readFileSync('data/transports.json', 'utf-8');
const out = JSON.parse(obj);
const Sequelize = require('sequelize');

const show = (req, res) => {
  'use strict';
  res.render('transport', { title: 'Googlemap', result: out.transports[ 1 ], travel: 'DRIVING' });
};

// show travel with param id
const showTransport = (req, res) => {
  'use strict';
  req.check({
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

// save travel in db
const save = (req, res) => {
  'use strict';
  req.check({
    title: {
      notEmpty: {
        errorMessage: 'error_required'
      },
      isLength: {
        options: [ { min: 5, max: 250 } ],
        errorMessage: 'error_min_max'
      }
    },
    fromLat: {
      notEmpty: {
        errorMessage: 'error_required'
      },
      isFloat: {
        options: [ { min: 0, max: 90 } ],
        errorMessage: 'error_data_lat'
      }
    },
    fromLon: {
      notEmpty: {
        errorMessage: 'error_required'
      },
      isFloat: {
        options: [ { min: -180, max: 180 } ],
        errorMessage: 'error_data_lon'
      }
    },
    toLat: {
      notEmpty: {
        errorMessage: 'error_required'
      },
      isFloat: {
        options: [ { min: 0, max: 90 } ],
        errorMessage: 'error_data_lat'
      }
    },
    toLon: {
      notEmpty: {
        errorMessage: 'error_required'
      },
      isFloat: {
        options: [ { min: -180, max: 180 } ],
        errorMessage: 'error_data_lon'
      }
    },
    vehicule: {
      notEmpty: {
        errorMessage: 'error_required'
      },
      isIn: {
        options: [ [ 'DRIVING', 'WALKING', 'BICYCLING', 'TRANSIT' ] ],
        errorMessage: 'must_be_a_valid_travel_mode'
      }
    },
    comment: {
      optional: true
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

    // model
    const travel = req.connect.define('transport', {
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fromLat: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      fromLon: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      toLat: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      toLon: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      vehicule: {
        type: Sequelize.STRING,
        isIn: [ [ 'DRIVING', 'WALKING', 'BICYCLING', 'TRANSIT' ] ],
        allowNull: false
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: true
      }
    });

    travel.sync({ force: false }).then(() => {
      return travel.create({
        title: req.body.title,
        fromLat: req.body.fromLat,
        fromLon: req.body.fromLon,
        toLat: req.body.toLat,
        toLon: req.body.toLon,
        vehicule: req.body.vehicule,
        comment: req.body.comment
      });
    });
    res.json('ok');
  });

};

module.exports = {
  show,
  showTransport,
  save
};
