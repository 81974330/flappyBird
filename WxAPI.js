export class WxAPI {
  constructor() {
    this.userInfo = null;
  }

  // 播放背景音乐
  playMusic() {
    const music = wx.createInnerAudioContext();
    music.src = './audio/bgm.mp3';
    music.loop = true; // 循环播放
    // music.autoplay = true; // 自动播放
    music.play();
  }

  // 小鸟撞击的音效
  boom() {
    const music = wx.createInnerAudioContext();
    music.src = './audio/boom.mp3';
    // music.autoplay = true; // 自动播放
    music.play();
  }

  // 获取手机基本信息
  getSysInfo() {
    wx.getSystemInfo({
      success(res) {
        console.log(res);
      }
    })
  }

  // 获取登录用户的信息
  getUserInfo(callback) {
    if (this.userInfo) {
      callback();
      return;
    }
    // 创建用户信息按钮
    let button = wx.createUserInfoButton({
      type: "text",
      text: "点击授权",
      style: {
        left: 150,
        top: 400,
        width: 150,
        height: 50,
        backgroundColor: "#aabbcd",
        borderColor: "#403623",
        borderWidth: 5,
        borderRadius: 10,
        color: "#00ff00",
        textAlign: "center",
        lineHeight: 40,
        fontSize: 16
      }
    });
    // 监听用户点击按钮
    button.onTap(res => {
      // console.log(res);
      if (res.userInfo) {
        // 有userInfo属性,说明已经授权过了
        this.userInfo = res.userInfo;
        button.destroy();
        callback();
      }
    });
  }

  //发送HTTP请求
  sendHttp(){
    wx.request({
      url: 'http://localhost:4000',
      success(res){
        console.log(res);
      }
    })
  }
  socket(){
    wx.connectSocket({
      url: 'ws://localhost:4000',
      success(res){
        console.log('连接成功')
      },fail(err){
        console.log("连接失败")
      }
    })
    // 连接成功后
    wx.onSocketOpen(function(){
      // 向服务器发送数据
      wx.sendSocketMessage({
        data:'微信小游戏发送给服务器的数据'
      });
      // 接收服务器发送的数据
      wx.onSocketMessage(function(res){
        console.log(res);
      })
    });
  }
  // 下载文件
  downLoad() {
    wx.downloadFile({
      url: "http://img4.imgtn.bdimg.com/it/u=1188387633,958216909&fm=26&gp=0.jpg",
      success(res) {
        console.log(res);
        let path = res.tempFilePath;  //获取临时地址
        wx.saveImageToPhotosAlbum({
          filePath:path
        })
      }
    })
  }
}