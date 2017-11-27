/** Created by Kevin181 */
var vm = new Vue({
    el: "#app",
    data:{
        totalMoney: 0,
        productList: [],
        deleteClass: false,
        currentClass: '',
        selectedAll: false
    },
    filters:{
        formatMoney: function (value) {
            return "￥"+value.toFixed(2);
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            // 代码保证 this.$el 在 document 中
            this.cartView();
        });
    },
    methods:{
        cartView:function () {
            let _this = this;
            this.$http.get("data/cartData.json",{"id":123}).then(res=>{
                _this.productList = res.body.result.list;
                _this.totalMoney = res.body.result.totalMoney;
            });
        },
        changeQuantity:function(product, type) {
            if (type > 0) {
                product.productQuantity++;
                this.calcTotalMoney();
            } else {
                if (product.productQuantity < 2) {
                    product.productQuantity = 1;
                } else {
                    product.productQuantity--;
                    this.calcTotalMoney();
                }
            }
        },
        removeConfirm: function(item) {
            this.deleteClass = true;
            this.currentClass = item;
        },
        removeClass: function() {
            var index = this.productList.indexOf(this.currentClass);
            this.ptoductList.splice(index, 1);
            this.deleteClass = false;
            this.calcTotalmoney();
        },
        selectedItem: function(item) {
            if (typeof item.ischecked === 'underfind') {
                this.$set(item, 'ischecked', true);
            } else {
                item.ischecked = !item.ischecked;
            }
            this.calcTotalmoney();
        },
        checkAll: function(status) {
            if (status == true) {
                this.selectedAll = true;
            } else {
                this.selectedAll = false;
            }
            _this = this;
            this.productList.forEach(function (item, index) {
                item.ischecked = _this.selectedAll;
            });
            this.calcTotalmoney();
        },
        calcTotalmoney: function () {
            var _this = this;//用ES5方法解决this指向问题
            //每次计算前必须清理，防止出现累计计算
            this.totalMoney = 0;
            this.productList.forEach(function (val, index) {
                if (val.ischecked) {
                    _this.totalMoney += val.productPrice * val.productQuantity;
                }
            });
        },
    }
});