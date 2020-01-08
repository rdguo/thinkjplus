module.exports = class extends think.Controller {
  async __before() {
    // eslint-disable-next-line no-mixed-operators
    // if (this.ctx.controller === 'admin' && this.ctx.action === 'index' || this.ctx.action === 'login') { // 如果是admin_index那么久不验证了，直接返回给予登录。 
    //   return;
    // }
    // 配置跨域
    // this.header('Access-Control-Allow-Origin', this.header('origin') || '*');
    this.header('Access-Control-Allow-Origin', '*');
    // 允许请求头参数进入
    this.header('Access-Control-Allow-Headers', 'application/json; charset=utf-8');
    this.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    const userinfo = await this.session('userinfo');
    if (this.method === 'OPTIONS') {
      this.ctx.body = 200;
      return false;
    }
    if (!think.isEmpty(userinfo)) {
      this.assign('userinfo', userinfo);
    } else {
      // return this.redirect('/admin/index');
      return userinfo;
    }
  }
};
