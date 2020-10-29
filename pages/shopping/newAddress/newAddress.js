// pages/shopping/newAddress/newAddress.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        navBarHeight: app.globalData.navBarHeight,
        menuRight: app.globalData.menuRight,
        menuBotton: app.globalData.menuBotton,
        menuHeight: app.globalData.menuHeight,
        region: [],
        text: "",
        address:"",
        value: [0,0,0], // 地址选择器省市区 暂存 currentIndex
        regionValue: [0, 0, 0], // 地址选择器省市区 最终 currentIndex
        provinces: [], // 一级地址
       sheng:"",
        citys: [], // 二级地址
        areas: [], // 三级地址
        visible: false,
        isCanConfirm: true, //是否禁止在第一列滚动期间点击确定提交数据
        tag: [],//标签
        curNav: 1,
        curIndex: 0,
        code:'',
        shi:"",
        xian:"",
        shengId:'',
        shiId:'',
        xianId:'',
        biaoqian:''
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options+"————————————————-")
        var that = this;
       wx.request({
         url: 'http://localhost:8080/user/selectAddLabelAll',
         method:"GET",
         header:{"content-type":"application/json"},
         success: function(res){
            that.setData({
               tag:res.data
            })
      }
       })
    },
    backlist: function () {
        wx.navigateBack({
            delta: 1
        })
    },
    switch1Change: function (e) {
        console.log(e.detail.value)
    },
    // 标签Id
    selectD: function (e) {
        let labelId = e.target.dataset.id, 
        index = e.target.dataset.index;
        this.setData({
            curNav: labelId,
            curIndex: index,
            biaoqian:labelId
        })
    },
    closePopUp() {
        this.setData({
            visible: false
        })
    },
    pickAddress() {
        var that  = this;
        wx.request({
          url: "http://localhost:8080/user/selectProv",
          method:"GET",
          header:{"content-type":"application/json"},
          success: function(res){
                that.setData({
                    visible:true,
                    provinces:res.data,
                    address:res.data
                })
          }
        })
      
    },
    // 处理省市县联动逻辑 并保存 value
    cityChange(e) {

        var that = this
        var value = e.detail.value
   
        let {provinces,
            citys 
         } = that.data
       
        var provinceNum = value[0]
        var citysNum = value[1]
      
        this.setData({
            sheng: this.data.provinces[value[0]].name,
            shengId:this.data.provinces[value[0]].code
        })
        wx.request({
            url: "http://localhost:8080/user/selectCity",
            data:{"asd":provinces[provinceNum].code},
            method:"GET",
            header:{"content-type":"application/json"},
            success: function(res){
               that.setData({citys:res.data})
            }
        })

        //根据市查询县
      
       
       this.setData({
        shi:this.data.citys[value[1]].name,
        shiId:this.data.citys[value[1]].code
    })


       wx.request({
        url: "http://localhost:8080/user/selectAreas",
        data:{"asd":citys[citysNum].code},
        method:"GET",
        header:{"content-type":"application/json"},
        success: function(res){
           that.setData({areas:res.data})
        }
    
    }),
    this.setData({
        xian:this.data.areas[value[2]].name,
        xianId:this.data.areas[value[2]].code
    })
     
     } ,
    // 点击地区选择取消按钮
    cityCancel(e) {
        var id = address.provinces[0].id
        this.setData({
            citys: this.data.lastCitys || address.citys[id], //默认北京市辖区,
            areas: this.data.lastAreas || address.areas[address.citys[id][0].id],
            value: [...this.data.regionValue],
            visible: false
        })
    },
    // 提交时由序号获取省市区id
    getRegionId(type) {
        let value = this.data.regionValue
        let provinceId = address.provinces[value[0]].id
        let townId = address.citys[provinceId][value[1]].id
        let areaId = ''
        if (address.areas[townId][value[2]].id) {
            areaId = address.areas[townId][value[2]].id
        } else {
            areaId = 0
        }

        if (type === 'provinceId') {
            return provinceId
        } else if (type === 'townId') {
            return townId
        } else {
            return areaId
        }
    },
    chooseStart(e) {
        this.setData({
            isCanConfirm: false
        })
    },
    chooseEnd(e) {
        this.setData({
            isCanConfirm: true
        })
    },
    // 点击地区选择确定按钮
    citySure(e) {
      
        if (this.data.isCanConfirm) {
            var value = this.data.value
            this.setData({
                visible: false
            })

            // 将选择的城市信息显示到输入框
            try {
                var region
                if (this.data.provinces.length > 0) {
                    region =  this.data.sheng || ''
                }
                if (this.data.citys.length > 0) {
                    region = region + this.data.shi || ''
                }else{
                    region=region+""
                }
                
                if (this.data.areas.length > 0 ) {
                    region = region + this.data.xian || ''
                } 
            } catch (error) {
                console.log('adress select something error')
            }

            this.setData({
                region: region,
                lastCitys: this.data.citys,
                lastAreas: this.data.areas,
                regionValue: [...this.data.value]
            }, () => {
            })
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
    ,

    // 添加信息
    formSubmit:function(e){

        console.log(e.detail.value.consigneeName)
        var consigneeName = e.detail.value.consigneeName
      
        console.log(e.detail.value.telephone)
        var telephone = e.detail.value.telephone
      
        console.log(this.data.shengId)
        var sss1 = this.data.shengId
      
        console.log(this.data.shiId)
        var sss2 = this.data.shiId
       
        console.log(this.data.xianId)
        var sss3 =this.data.xianId
        
        console.log(e.detail.value.addressDetails)
       var addressDetails = e.detail.value.addressDetails
       
       console.log(this.data.biaoqian)
        var biaoqianId = this.data.biaoqian
       
        var stauts
      if(e.detail.value.xx==true){
        console.log(1)
        stauts = 1
      }else{
      stauts = 0
        console.log(0)
    }
        wx.request({
          url: 'http://localhost:8080/user/addressInsert',
          method:"GET",
          header:{"content-type":"application/json"},
          data:{
              consigneeName:consigneeName,
              telephone:telephone,
              provinceId:sss1,
              cityId:sss2,
              countyId:sss3,
              addressLabelId:biaoqianId,
              defaultAddress:stauts,
              addressDetails:addressDetails

        },
          success: function(res){
            if(res.data==1){
                console.log("哈哈哈哈哈哈哈哈哈哈哈")
            }
         }
        })



    }
})