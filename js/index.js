// 选色区
var block = document.getElementById('block');
var ctx1 = block.getContext('2d');
var width1 = block.width;
var height1 = block.height;

// 滑块
var strip = document.getElementById('strip')
var ctx2 = strip.getContext('2d')
var width2 = strip.width
var height2 = strip.height

// 小指针
var cur = document.getElementById('cur')
var colorRgb = document.getElementById('colorRgb')
var colorHex = document.getElementById('colorHex')
var selectedColor = document.getElementById('selectedColor')

var x = 0, y = 0
var rgb = 'rgb(255,0,0)'
var isDrag = false

//初始化 
ctx1.rect(0, 0, width1, height1)
ctx2.rect(0, 0, width2, height2)
init()

function init(){
    // 初始化选色板
    fill()

    // 初始化滑块
    var grd = ctx2.createLinearGradient(0, 0, 0, height1);
    grd.addColorStop(0, 'rgba(255, 0, 0, 1)');
    grd.addColorStop(1/6, 'rgba(255, 255, 0, 1)');
    grd.addColorStop(2/6, 'rgba(0, 255, 0, 1)');
    grd.addColorStop(3/6, 'rgba(0, 255, 255, 1)');
    grd.addColorStop(4/6, 'rgba(0, 0, 255, 1)');
    grd.addColorStop(5/6, 'rgba(255, 0, 255, 1)');
    grd.addColorStop(1, 'rgba(255, 0, 0, 1)');
    ctx2.fillStyle = grd
    ctx2.fill()
}
// 填充选色板
function fill(){
    ctx1.fillStyle = rgb;
    ctx1.fillRect(0, 0, width1, height1);
    var grdWhite = ctx2.createLinearGradient(0, 0, width1, 0);
    grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
    grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
    ctx1.fillStyle = grdWhite;
    ctx1.fillRect(0, 0, width1, height1);
    var grdBlack = ctx2.createLinearGradient(0, 0, 0, height1);
    grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
    grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
    ctx1.fillStyle = grdBlack;
    ctx1.fillRect(0, 0, width1, height1);
}
// rgb to hex
function rgb2hex(rgb) {
    var temp;
    return '#'+[
        (temp = Number(rgb[0]).toString(16)).length == 1 ? ('0' + temp) : temp,
        (temp = Number(rgb[1]).toString(16)).length == 1 ? ('0' + temp) : temp,
        (temp = Number(rgb[2]).toString(16)).length == 1 ? ('0' + temp) : temp,
    ].join('');
}
// 选择颜色
function selectColor(e){
    if(e){
        x = e.offsetX;
        y = e.offsetY;
    }
    var data = ctx1.getImageData(x, y, 1, 1).data
    var temp = data.slice(0,3)
    rgb = `rgb(${temp.join(',')})`
    selectedColor.style.backgroundColor = rgb
    colorRgb.innerHTML = `(${temp.join(',')})`
    colorHex.innerHTML = rgb2hex(temp)
    cur.style.left = x+'px'
    cur.style.top = y+'px'
}
// 单击或拖动滑块,改变选色板
function changeBlock(e){
    let pos = {
        x: e.offsetX,
        y: e.offsetY
    }
    var data = ctx2.getImageData(pos.x, pos.y, 1, 1).data
    rgb = `rgb(${data.slice(0,3).join(',')})`
    fill()
    selectColor()
}

// 添加事件监听
strip.addEventListener('click',changeBlock)
strip.addEventListener('mousedown',function(){
    isDrag = true
})
strip.addEventListener('mouseup',function(){
    isDrag = false
})
strip.addEventListener('mousemove', function(e){
    if(isDrag){
        changeBlock(e)
    }
        
})
block.addEventListener('click', selectColor)