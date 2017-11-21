const showTransportRules = {
  transport: {
    isInt: {
      options: [ { min: 1, max: 10 } ],
      errorMessage: 'No transport'
    }
  }
};

const saveRules = {
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
};

const updateRules = {
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
};

const findIdRules = {
  id: {
    notEmpty: {
      errorMessage: 'error_required'
    },
    isInt: {
      options: [ { min: 1 } ],
      errorMessage: 'mus_be_a_valid_id'
    }
  }
};

exports.showTransportRules = showTransportRules;
exports.saveRules = saveRules;
exports.updateRules = updateRules;
exports.findIdRules = findIdRules;

