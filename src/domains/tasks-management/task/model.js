const { DATA_TYPES } = require('../../../core/internal/constants');

/**
 * @typedef Task
 *
 * @property {string} description.required
 * @property {string} title.required
 */

/**
 * creates a Task
 * @returns {object}
 */
module.exports = () => ({
  name: 'task',
  fields: {
    title: {
      type: DATA_TYPES.STRING,
      required: true,
    },
    description: {
      type: DATA_TYPES.STRING,
      required: true,
    },
  },
});
