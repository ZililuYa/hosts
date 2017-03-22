var listData = [];
var Judge = {
    ip: /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/,
    dn: /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/
};
$.get('/hosts', function (data) {
    setListData(data);
});

function setListData(data) {
    var arr = data.split('\n');
    for (var x in arr) {
        if (arr[x].toString().indexOf('#') == -1 && arr[x].toString().indexOf('::') == -1) {
            var a = arr[x].toString().split('\t');
            if (a.length == 2)
                listData.push(a);
        }
    }
    vm.listData = listData;
}

var vm = avalon.define({
    $id: "container",
    listData: [],
    fb: '',
    dataArr: {
        ip: '',
        dn: ''
    },
    addClick: function () {
        if (this.ipJudge() && this.dnJudge()) {
            this.listData.push([this.dataArr.ip, this.dataArr.dn]);
            this.postDataFun();
        }
    },
    postDataFun: function () {
        var mainData = this.listData.join('\n');
        mainData = mainData.replace(/\,/g, '\t');
        $.post('/setHosts', {mainData: mainData}, function (data) {
            if (data == "200") {
                vm.dataArr.ip = '';
                vm.dataArr.dn = '';
                vm.ipClass = '';
                vm.dnClasss = '';
            } else {

            }
        });
    },
    deleteClick: function (i) {
        $('#alerts').addClass('show');
        setTimeout(function () {
            $('#alerts').removeClass('show');
        }, 2000);
        vm.listData = deleteArr(vm.listData, parseInt(i));
        this.postDataFun();
    },
    ipJudge: function () {
        if (this.dataArr.ip.match(Judge.ip)) {
            this.ipClass = 'has-success';
            return true;
        } else {
            this.ipClass = 'has-error';
            return false;
        }
    },
    dnJudge: function () {
        if (this.dataArr.dn.match(Judge.dn) || 'localhost' == this.dataArr.dn) {
            this.dnClass = 'has-success';
            return true;
        } else {
            this.dnClass = 'has-error';
            return false;
        }
    },
    ipClass: '',
    dnClass: '',
    deleteInfo: 'DELETE&emsp;SUCCESS'
});


var deleteArr = function (d, delIndex) {
    var temArray = [];
    for (var i = 0; i < d.length; i++) {
        if (i != delIndex) {
            temArray.push(d[i]);
        }
    }
    return temArray;
};