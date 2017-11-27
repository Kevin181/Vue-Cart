/** Created by Kevin181 */
new Vue({
    el: ".container",
    data: {
        addressList: [],
        limitAddressNum: 3,
        currentIndex: 0,
        shipMethod: 1
    },
    computed: {
        //修饰addressList数组，只显示前三项并返回
        fliterAddress: function () {
            return this.addressList.slice(0, this.limitAddressNum);
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            // 代码保证 this.$el 在 document 中
            this.getAddressList();
        });
    },
    methods: {
        getAddressList: function() {
            let _this = this;
            this.$http.get("data/address.json").then(response=>{
                _this.addressList = response.body.result;
            });
        },
        loadMoreAddress: function () {
            if (this.limitAddressNum === 3) {
                this.limitAddressNum = this.addressList.length;
            } else {
                this.limitAddressNum = 3;
            }
        },
        getIndex: function (index) {
            this.currentIndex = index;
        },
        setDefault: function (addressId) {
            this.addressList.forEach(function (address, addressListIndex) {
                if (addressId == address.addressId) {
                    address.isDefault = true;
                } else {
                    address.isDefault = false;
                }
            })
        }
    }
});