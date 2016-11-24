/*
重写了原来的login.js
包含弹出登陆框的逻辑和推送消息逻辑。
由于html模板默认引用原有的login.js，为了不和原有的绑定事件重复，所以登陆框上的验证逻辑还是在原有的login.js上。
*/
define(function(require){
  var userInfoContainer = $('#userInfoContainer');
  function renderLogin(userInfo) {
    var tpl = $.template($('#userInfoTpl').html());
    userInfoContainer.html(tpl.render({
      isAgent:userInfo.isAgent,
      logoutUrl:userInfo.logoutUrl,
      username:userInfo.username
    }));
  }
  function renderPushList() {
    var pushMessage = require('../../common/pushMessage');
    pushMessage({
      container:$('#pushNewsListContainer'),
      msgTpl:$.template($('#pushNewsListTpl').html()),
      tipContainer:$('#tipContainer'),
      tipTpl:$.template('<span class="pushNews"></span>')
    })
  }
  var login = require('../../common/login');
  $('#loginBtn').on('click',function(event){
    event.preventDefault();
    login.openLoginDialog();
  });
  $.listener.always("userInfo",function(data){
    if (data && data.code === 1) { // 已登录
      renderLogin(data);
      renderPushList();
    }
  });
})

