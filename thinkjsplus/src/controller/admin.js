const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }
  /**
   * 登录
   */
  async loginAction() {
    if (this.isPost) { // 判断是否发送信息给后台了，post数据过来.注意：isPost中的P是大写，js是对大小写敏感的。  
      // const username = this.post('username');// 获取用户名给username变量  
      // const password = this.post('password');
      // const test = this.option();
      const data = this.post();
      const username = data.username;
      const password = data.password;
      const loginIp = this.ctx.ip;
      const dateTime = new Date();
      const loginTime = think.datetime(dateTime);
      const data1 = await this.model('cd_projectcontrol_user').where({username: username, password: password}).find();// 到数据库中去查找看是否有数据（用户名密码同时相符）  
      if (think.isEmpty(data1)) { // 这里我直接用isEmpty居然不能用。查了下资料需要用think.isEmpty()  
        return this.fail(403, '账号密码错误！请重新填写');// 登录不成功，返回错误信息。  
      } else {
        this.session('userinfo', data1);
        const user = await this.model('cd_projectcontrol_user').where({
          username
        }).find();
        // const 
        await this.model('cd_projectcontrol_log').add({
          flag: 1, username, loginTime, password: password, loginIp
        });
        return this.success(user, '登陆成功');
        // return this.redirect('/index/index');// 登录成功将用户信息写入session，返回到user首页。  
      }
    }
    return this.display();
  }
  /**
 * 注销
 */
  async logoutAction() {
    if (this.isPost) {
      // const loginIp = this.ctx.ip;
      // const dateTime = new Date();
      // const loginTime = think.datetime(dateTime);
      // const username = this.session().data1.username;
      // const password = this.session().data1.password;
      // await this.model('log').add({
      //   flag: 2, username, loginTime, password: password, loginIp
      // });
      await this.session(null);
      return this.success('退出成功');// 登录成功将用户信息写入session，返回到user首页。  
    }
  }
};
