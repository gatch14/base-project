const fs = require('fs');
const util = require('util');
const obj = fs.readFileSync('data/transports.json', 'utf-8');
const out = JSON.parse(obj);
const { showTransportRules, saveRules, updateRules, findIdRules } = require('./rules');
const models = require('../models');

/** This is the index route. */
const show = (req, res) => {
  'use strict';
  res.render('transport', { title: 'Googlemap', result: out.transports[ 1 ], travel: 'DRIVING' });
};

/**
 * @params transport {int}
 * @returns data for google map
 */
const showTransport = async(req, res) => {
  'use strict';
  req.check(showTransportRules);

  req.getValidationResult().then(async(result) => {
    if (!result.isEmpty()) {
      res.json({
        result: 'error',
        message: util.inspect(result.array())
      });
    } else {
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
    }
  });
};

/**
 *
 * @req.body.title {string}
 * @req.body.fromLat {decimal}
 * @req.body.fromLon {decimal}
 * @req.body.toLat {decimal}
 * @req.body.toLon {decimal}
 * @req.body.vehicule {string} {isIn: [ 'DRIVING', 'WALKING', 'BICYCLING', 'TRANSIT' ]}
 * @req.body.comment {string} {optional}
 * @returns new Travel object
 */
const save = (req, res) => {
  'use strict';
  req.check(saveRules);

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.json({
        result: 'error',
        message: util.inspect(result.array())
      });
    } else {
      models.Travel
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
        .then((newTravel) => {
          res.json({ newTravel });
        })
        .catch((error) => {
          res.json({ result: error });
        });
    }
  });

};

/**
 *
 * @req.body.id {int} {required}
 * add one or more req.body to update
 * @req.body.title {string}
 * @req.body.fromLat {decimal}
 * @req.body.fromLon {decimal}
 * @req.body.toLat {decimal}
 * @req.body.toLon {decimal}
 * @req.body.vehicule {string} {isIn: [ 'DRIVING', 'WALKING', 'BICYCLING', 'TRANSIT' ]}
 * @req.body.comment {string}
 * @returns ok (if update success) or null
 */
const update = async(req, res) => {
  'use strict';
  const { id, title, fromLat, fromLon, toLat, toLon, vehicule, comment } = req.body;

  req.check(updateRules);

  req.getValidationResult().then(async(result) => {
    if (!result.isEmpty()) {
      res.json({
        result: 'error',
        message: util.inspect(result.array())
      });
    } else {
      models.Travel
        .findOne({
          id: id
        })
        .then((travel) => {
          travel.updateAttributes({
            title: title || travel.title,
            fromLat: fromLat || travel.fromLat,
            fromLon: fromLon || travel.fromLon,
            toLat: toLat || travel.toLat,
            toLon: toLon || travel.toLon,
            vehicule: vehicule || travel.vehicule,
            comment: comment || travel.comment
          });
        })
        .then(() => {
          res.json({ result: 'ok' });
        })
        .catch((error) => {
          res.json({ result: error });
        });
    }
  });
};

/**
 * @req.body.id {int} {required}
 * @returns 0 (if delete is impossible) or 1
 */
const destroy = async(req, res) => {
  'use strict';
  req.check(findIdRules);

  req.getValidationResult().then(async(result) => {
    if (!result.isEmpty()) {
      res.json({
        result: 'error',
        message: util.inspect(result.array())
      });
    } else {
      models.Travel
        .destroy({
          where: { id: req.body.id }
        })
        .then((travel) => {
          res.json({ result: travel });
        })
        .catch((error) => {
          res.json({ result: error });
        });
    }
  });

};

/**
 * @req.body.id {int} {required}
 * @returns travel object
 */
const findOne = async(req, res) => {
  'use strict';
  req.check(findIdRules);

  req.getValidationResult().then(async(result) => {
    if (!result.isEmpty()) {
      res.json({
        result: 'error',
        message: util.inspect(result.array())
      });
    } else {
      models.Travel
        .findOne({
          where: { id: req.body.id }
        })
        .then((travel) => {
          res.json({ result: travel });
        })
        .catch((error) => {
          res.json({ result: error });
        });
    }
  });

};

/**
 * @returns all travels in object
 */
const findAll = async(req, res) => {
  'use strict';

  req.getValidationResult().then(async(result) => {
    if (!result.isEmpty()) {
      res.json({
        result: 'error',
        message: util.inspect(result.array())
      });
    } else {
      models.Travel
        .findAll()
        .then((travel) => {
          res.json({ result: travel });
        })
        .catch((error) => {
          res.json({ result: error });
        });
    }
  });

};

module.exports = {
  show,
  showTransport,
  save,
  update,
  destroy,
  findOne,
  findAll
};
