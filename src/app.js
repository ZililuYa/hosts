var listData = [];
$.get('/hosts', function (data) {
    setListData(data);
});

function setListData(data) {
    var arr = data.split('\n');
    for (var x in arr) {
        if (arr[x].indexOf('#') == -1 && arr[x].indexOf('::') == -1) {
            var a = arr[x].split('\t');
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
        listData.push([this.dataArr.ip, this.dataArr.dn]);

        var mainData = listData.join('\n');
        mainData = mainData.replace(/\,/g, '\t');
        $.post('/hosts', {mainData: mainData}, function (data) {

        });
    },
    deleteClick: function (i) {
        alert(i);
    }
});

