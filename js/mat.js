/**
 * Created by xiaoxiaosu on 2016/4/3.
 */

function matrix(num) {
    this.init(num)
}

matrix.prototype.init = function (num) {
    var arr = []
    for(var i =0;i<num;i++){
        arr[i] = []
        for (var j =0;j<num;j++){
            arr[i][j] = 0
        }
    }
    this.arr = arr
}

matrix.prototype.set = function (i,j) {
    this.arr[i][j] = 1
}
