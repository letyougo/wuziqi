/**
 * Created by xiaoxiaosu on 2016/4/2.
 */




var winsArr = (function () {
    var res = []

    // 竖着
    for(var i=0;i<15;i++){
        for(var j=0;j<11;j++){
            res.push([
                [i,j],
                [i,j+1],
                [i,j+2],
                [i,j+3],
                [i,j+4]
            ])
        }
    }

    for(var i=0;i<11;i++){
        for(var j=0;j<15;j++){
            res.push([
                [i,j],
                [i+1,j],
                [i+2,j],
                [i+3,j],
                [i+4,j]
            ])
        }
    }

    for(var i=0;i<11;i++){
        for(var j=0;j<11;j++){
            res.push([
                [i,j],
                [i+1,j+1],
                [i+2,j+2],
                [i+3,j+3],
                [i+4,j+4]
            ])
        }
    }

    for(var i=4;i<15;i++){
        for(var j=4;j<15;j++){
            res.push([
                [i,j],
                [i-1,j-1],
                [i-2,j-2],
                [i-3,j-3],
                [i-4,j-4]
            ])
        }
    }

    return res
})()

