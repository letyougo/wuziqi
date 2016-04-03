/**
 * Created by xiaoxiaosu on 2016/4/2.
 */

var chess = document.getElementById('chess'),
    context = chess.getContext('2d'),
    chessData = [],
    n = 15,
    x = 15,
    r = (function () {
        console.log(($(window).width() - 2*x)/(n-1))
        return ($(window).width() - 2*x)/(n-1)
    })(),

    width = (n-1)*r+2*x,
    height = (n-1)*r+2*x
    chessData = (function () {
        var arr = []
        for(var i=0;i<n;i++){
            arr[i] = []
            for(var j=0;j<n;j++){
                arr[i][j] = 0
            }
        }
        return arr
    })(),
    count = 0,
    initWinsData = (function () {
        var arr = []
        for(var i=0;i<n;i++){
            arr[i] = []
            for(var j=0;j<n;j++){
                arr[i][j] = []
            }
        }
        return arr
    })(),
    winsData = (function () {
        for(var i=0;i<n;i++){
            for(var j=0;j<n-4;j++){
                for (var k=0;k<5;k++){
                    initWinsData[i][j+k][count] = 1
                }
                count ++
            }
        }

        for(var i=0;i<n;i++){
            for(var j=0;j<n-4;j++){
                for (var k=0;k<5;k++){
                    initWinsData[j+k][i][count] = 1
                }
                count ++
            }
        }

        for(var i=0;i<n-4;i++){
            for(var j=0;j<n-4;j++){
                for (var k=0;k<5;k++){
                    initWinsData[i+k][j+k][count] = 1
                }
                count ++
            }
        }

        for(var i=0;i<n-4;i++){
            for(var j=n-1;j>3;j--){
                for (var k=0;k<5;k++){
                    initWinsData[i+k][j-k][count] = 1
                }
                count ++
            }
        }

        return initWinsData
    })(),
    playerWin = (function () {
        var res = []
        for(var i=0;i<count;i++){
            res[i] = 0
        }
        return res
    })(),
    AIWin = (function () {
        var res = []
        for(var i=0;i<count;i++){
            res[i] = 0
        }
        return res
    })(),
    over = false,
    myTurn = true


chess.setAttribute('width' ,width)
chess.setAttribute('height' ,height)
var drawPanel = (function (context) {
    context.strokeStyle='#bfbfbf'
    for (var i = 0 ;i<n;i++){
        context.moveTo(x+i*r,x)
        context.lineTo(x+i*r,width-x)
        context.stroke();

        context.moveTo(x,x+i*r)
        context.lineTo(height-x,x+i*r)
        context.stroke();
    }
})(context)

var drawChess = function (context,i,j,blackOrWhite) {
    context.beginPath()
    context.arc(x+i*r,x+j*r,9,0,2*Math.PI)
    context.closePath()

    var gradient = context.createRadialGradient(15+i*r+2,15+j*r-2,13,15+i*r+2,15+j*r-2,0)
    if(blackOrWhite == 'black' ){
        gradient.addColorStop(0,'#0A0A0A')
        gradient.addColorStop(1,'#636766')
    }else {
        gradient.addColorStop(0,'#D1D1D1')
        gradient.addColorStop(1,'#F9F9F9')
    }

    context.fillStyle = gradient
    context.fill()
}


var drawBlackChess = function (context,i,j) {
    drawChess(context,i,j,'black')
}
var drawWhiteChess = function (context,i, j) {
    drawChess(context,i,j,'white')
}



function computer() {
    var playerScore = [],
        computerScore = [],
        max=0,
        u=0,
        v=0;

    for(var i=0;i<n;i++){
        playerScore[i] = [];
        computerScore[i] = []
        for(var j=0;j<n;j++){
            playerScore[i][j] = 0
            computerScore[i][j] = 0
        }
    }

    for (var i=0;i<n;i++){
        for(var j=0;j<n;j++){
            if(!chessData[i][j]){
                for(var k=0;k<count;k++){
                    if(winsData[i][j][k]){

                        if(playerWin[k] == 1){
                            playerScore[i][j] += 200
                        }else if(playerWin[k] == 2){
                            playerScore[i][j] += 400
                        }else if(playerWin[k] == 3){
                            playerScore[i][j] += 2000
                        }else if(playerWin[k] == 4){
                            playerScore[i][j] += 1000
                        }


                        if(AIWin[k] == 1){
                            computerScore[i][j] += 220
                        }else if(playerWin[k] == 2){
                            computerScore[i][j] += 420
                        }else if(playerWin[k] == 3){
                            computerScore[i][j] += 2100
                        }else if(playerWin[k] == 4){
                            computerScore[i][j] += 2000
                        }
                    }



                    if(playerScore[i][j]>max){
                        max = playerScore[i][j]
                        u = i
                        v = j
                    }else if(playerScore[i][j] == max){
                        if(computerScore[i][j]>computerScore[u][v]){
                            u = i
                            v = j
                        }
                    }

                    if(computerScore[i][j]>max){
                        max = computerScore[i][j]
                        u = i
                        v = j
                    }else if(computerScore[i][j] == max){
                        if(playerScore[i][j]>playerScore[u][v]){
                            u = i
                            v = j
                        }
                    }
                }
            }
        }
    }
    return [u,v]
}


chess.onclick = function (e) {
    if(over){
        return
    }
    if(!myTurn){
        return
    }

    var x = e.offsetX,
        y = e.offsetY,
        i = Math.floor(x/r),
        j = Math.floor(y/r);

    if(!chessData[i][j]){
        chessData[i][j] = 1
        drawBlackChess(context,i,j)

        var winPlay = false,
            winAI = false;
        for(var k =0;k<count;k++){

            if(winsData[i][j][k]){
                playerWin[k]++
                AIWin[i][j] = 6

                if(playerWin[k] == 5){
                    over = true
                    alert('你牛逼，我去叫我老板小小苏给我升级去！')
                    return
                }
            }
        }

        var pos = computer()

        drawWhiteChess(context,pos[0],pos[1])
        chessData[pos[0]][pos[1]] =1
        for(var k =0;k<count;k++){

            if(winsData[i][j][k]){
                AIWin[k]++
                playerWin[i][j] = 6

                if(AIWin[k] == 5){
                    over = true
                    alert('愚蠢的人类，你还不是阿尔法苏的对手')
                    return
                }
            }
        }

    }else {
        alert('你瞎啊，这里已经有旗子了')
    }

}