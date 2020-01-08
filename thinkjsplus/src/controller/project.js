const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }
  async addAction() {
    return this.display();
  }
  // async addProgarmAction() {
  //   if (this.isPost) {
  //     return this.success('1');
  //   } else {
  //     return this.display();
  //   }
  // }
};
