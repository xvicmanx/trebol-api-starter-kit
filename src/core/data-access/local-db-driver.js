/**
 * This file contains the local db (disk) driver
 */
const db = require('diskdb');
const { createDir } = require('../helpers');

/**
  * Creates model wrapper
  * @param {Object} model - the model.
  */
const wrapper = model => ({
  /**
   * Find items that match certain condition
   * @param {Object} condition - the condition
   * @returns {Promise<Array>} - the found items
   */
  find: condition => Promise.resolve(model.find(condition)),
  /**
   * Find an item that matches the given id
   * @param {number} id - the item's id
   * @returns {Promise} - the found item
   */
  findById: id => Promise.resolve(model.findOne({ _id: id })),
  /**
   * Find an item that matches certain condition
   * @param {Object} condition - the condition
   * @returns {Promise} - the found item
   */
  findOne: condition => Promise.resolve(model.findOne(condition)),
  /**
   * Creates a new item with the provided data
   * @param {Object} data - the data of the item
   * @returns {Promise} -  the created item
   */
  create: data => Promise.resolve(model.save(data)),
  /**
   * Updates items that matches certain condition with the provided data
   * @param {Object} condition - the condition
   * @param {Object} data - the data of the item
   * @returns {Promise<Array>} -  the updated items
   */
  update: (condition, data) => Promise.resolve(model.update(condition, data, { multi: true })),
  /**
   * Deletes the items that match the given condition
   * @param {Object} condition - the condition
   * @returns {Promise<Array>} -  the removed items
   */
  delete: (condition) => {
    if (!condition || Object.keys(condition) <= 0) return Promise.resolve([]);
    return Promise.resolve(model.remove(condition, true));
  },
  /**
   * Deletes the item with the given id
   * @param {number} id - the id
   * @returns {Promise} -  the removed item
   */
  deleteOne: id => Promise.resolve(model.remove({ _id: id }, false)),
});

/**
 * Local db (Disk) driver
 */
class LocalDBDriver {
  /**
   * Create a database at a given location
   * @param {string} dir - directory of the database
   */
  constructor(dir) {
    this.dir = dir || `${__dirname}/../../../.db/`;
    this.db = db;
    this.modelNames = [];
  }
  /**
   * Add a models to the DB
   * @param {Object} model - the model definition
   */
  addModel(model) {
    this.modelNames.push(model.name);
  }

  /**
   * Get access to the model.
   * @param {string} name - name of the model to retrieve.
   * @returns {}
   */
  getModel(name) {
    return wrapper(this.db[name]);
  }

  /**
   * Synchronizes the data base.
   */
  sync() {
    createDir(this.dir);
    this.db.connect(this.dir, this.modelNames);
  }
}

module.exports = LocalDBDriver;
