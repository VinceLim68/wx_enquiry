// pages/search/search.js
const app = getApp()
Page({

  data: {
    comm_name: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    machine: ''
  },

  goto:function(e){
    // console.log(this.data.machine)
    // if(!this.data.machine){
  
      try {
        var res = wx.getSystemInfoSync()
      } catch (e) {
        console.log('没能取到设备数据')
      }
      
      //console.log(this.data.comm_name);
      this.setData({
        machine: res.brand + '-' + res.model,
        comm_name:'',

    })
    // }
    // console.log(e.detail.value.comm)
    // console.log(this.data.machine);
    //this.Trim(this.data.machine)
    var localname = encodeURI(encodeURI(this.Trim(this.data.userInfo.nickName)))   
    // var localname = encodeURI(encodeURI(this.Trim('rdgztest_96928')))   
    var localcomm = encodeURI(encodeURI(this.Trim(e.detail.value.comm)))
    var localmachine = encodeURI(encodeURI(this.Trim(this.data.machine)))
    if(localcomm == ''){
      wx.showToast({
        title: '未输入小区名',
        icon: 'none',
        duration: 2000
      })
    } else if (localname == '' | localmachine==''){
      wx.showToast({
        title: '用户未授权',
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.navigateTo({
        url: '../out/out?nickname=' + localname
          + '&machine=' + localmachine
          + '&comm=' + localcomm,

        fail: function () { 
          console.log('跳转不成功')
        } //失败后的回调；
        
      })

    }
  },
  Trim :function(str)
 {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '进入小程序，点击右上角，可选择“添加到桌面”',
      path: '/pages/search/search',
    }
  },

  commName: function(e) {
    // console.log(e.detail.value)
    this.setData({
      comm_name: e.detail.value
    })
    // console.log(this.data.comm_name);
  },

  onLoad: function(options) {
    try {
      var res = wx.getSystemInfoSync()
    } catch (e) {
      console.log('没能取到设备数据')
    }

    //console.log(this.data.comm_name);
    this.setData({
      machine: res.brand + '-' + res.model,
    })
   //console.log('onload:'+this.data.machine)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        
      })


    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
         
        })
      }

    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
           
          })
        }
      })

    }
  },

  getUserInfo1: function (e) {
    
    app.globalData.userInfo = e.detail.userInfo
    try {
      var res = wx.getSystemInfoSync()
    } catch (e) {
      console.log('没能取到设备数据')
    }
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      machine: res.brand + '-' + res.model
    })

  },
})