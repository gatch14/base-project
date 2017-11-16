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
    const Travel = req.connect.define('transport', {
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

    Travel
      .build({
        title: req.body.title,
        fromLat: req.body.fromLat,
        fromLon: req.body.fromLon,
        toLat: req.body.toLat,
        toLon: req.body.toLon,
        vehicule: req.body.vehicule,
        comment: req.body.comment
      })
      .save()
      .then((travel) => {
        res.json({ travel });
      });
  });

};

// update tra
const update = (req, res) => {
  'use strict';
  const { id, title, fromLat, fromLon, toLat, toLon, vehicule, comment } = req.body;

  req.check({
    id: {
      notEmpty: {
        errorMessage: 'error_required'
      },
      isInt: {
        options: [ { min: 1 } ],
        errorMessage: 'mus_be_a_valid_id'
      }
    },
    title: {
      optional: true,
      isLength: {
        options: [ { min: 5, max: 250 } ],
        errorMessage: 'error_min_max'
      }
    },
    fromLat: {
      optional: true,
      isFloat: {
        options: [ { min: 0, max: 90 } ],
        errorMessage: 'error_data_lat'
      }
    },
    fromLon: {
      optional: true,
      isFloat: {
        options: [ { min: -180, max: 180 } ],
        errorMessage: 'error_data_lon'
      }
    },
    toLat: {
      optional: true,
      isFloat: {
        options: [ { min: 0, max: 90 } ],
        errorMessage: 'error_data_lat'
      }
    },
    toLon: {
      optional: true,
      isFloat: {
        options: [ { min: -180, max: 180 } ],
        errorMessage: 'error_data_lon'
      }
    },
    vehicule: {
      optional: true,
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
    const Travel = req.connect.define('transport', {
      title: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fromLat: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      fromLon: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      toLat: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      toLon: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      vehicule: {
        type: Sequelize.STRING,
        isIn: [ [ 'DRIVING', 'WALKING', 'BICYCLING', 'TRANSIT' ] ],
        allowNull: true
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: true
      }
    });

    Travel
      .update({
        title: title,
        fromLat: fromLat,
        fromLon: fromLon,
        toLat: toLat,
        toLon: toLon,
        vehicule: vehicule,
        comment: comment
      },
      { where: { id: id } }
      )
      .then((travel) => {
        res.json({ result: travel });
      });
  });
};

module.exports = {
  show,
  showTransport,
  save,
  update
};
