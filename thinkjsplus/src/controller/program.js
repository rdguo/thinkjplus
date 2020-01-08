const Base = require('./base.js');

module.exports = class extends Base {
  async addProgramAction() {
    if (this.isPost) {
      return this.success('1');
    } else {
      return this.display();
    }
  }
};
