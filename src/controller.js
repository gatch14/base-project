const fs = require('fs');
const util = require('util');
const obj = fs.readFileSync('data/transports.json', 'utf-8');
const out = JSON.parse(obj);
const Sequelize = require('sequelize');
const { showTransportRules, saveRules, updateRules, destroyRules } = require('./rules');

const show = (req, res) => {
  'use strict';
  res.render('transport', { title: 'Googlemap', result: out.transports[ 1 ], travel: 'DRIVING' });
};
// show travel with param id
const showTransport = (req, res) => {
  'use strict';
  req.check(showTransportRules);

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
  req.check(saveRules);

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

  req.check(updateRules);

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

const destroy = (req, res) => {
  'use strict';
  req.check(destroyRules);

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.json({
        result: 'error',
        message: util.inspect(result.array())
      });
      return;
    }
    const Travel = req.connect.define('transport');

    Travel
      .destroy({
        where: { id: req.body.id }
      })
      .then((travel) => {
        res.json({ result: travel });
      });
  });

};

module.exports = {
  show,
  showTransport,
  save,
  update,
  destroy
};
