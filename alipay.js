var screen_width = device.width;
var screen_height = device.height;
var energy_mature = colors.rgb(211, 253, 0);
var finish_collection = colors.rgb(251, 253, 252);
setScreenMetrics(screen_width, screen_height); // 适配其他分辨率的手机

mainFunction();

// 1080 x 2400
// 坐标在左上角
// 设置 更多设置 开发者选项 显示指针位置：获取当前位置


function mainFunction(){
    unlock(); // 解锁
    init();
    openAlipay();
    enterAntForest();
    collectOthers(); // TODO
    getAlipyPoints(); // TODO
}

function init(){
    // 需要手动点击弹窗的确认按钮
    if(!requestScreenCapture()){
        toast("请求截图失败！");
        exit();
    }
    sleep(500);
}

function unlock(){
    if(!device.isScreenOn()){
        device.wakeUp();
        sleep(1000);
        swipe(500, 2100, 540, 200, 540);
        sleep(2000);
        gesture(2000, 
                [300, 1570], 
                [540, 1800], 
                [780, 1800], 
                [780, 1570]);
    }
    sleep(2000);
}

function openAlipay(){
    launchApp("支付宝");
    sleep(2000);
    toast("正在打开支付宝");

    // var times = 1;
}

function enterAntForest(){
    click("蚂蚁森林");
    sleep(4000);
    click("140", "645"); // 关闭弹窗
    sleep(500);
    // 收集自己的能量
    collectEnergy();
    click(900, 2000);
    toastLog("自己的能量已经收集完成");
    sleep(2000);
}

function collectOthers(){
    do{
        var tmp_color = colors.pixel(captureScreen(), 395, 460);
        click(1000, 1580);
        sleep(2000);
        collectEnergy();
        sleep(500);
    }while(!colors.isSimilar(
        tmp_color,
        finish_collection, {
            threshold: 10
        })
    )
    // TODO: bug
    // TODO：能量块的颜色识别
    click("返回我的森林");
    toast("能量收集完毕");
    exit();

}

function collectEnergy(){
    // height：570 ~ 950
    // width ：130 ~ 960
    do{
        var img = captureScreen();
        var point = findColor(img, energy_mature, {
        // region[0], region[1])表示找色区域的左上角；region[2]*region[3]表示找色区域的宽高
        region: [screen_width * 0.12, screen_height * 0.238, screen_width * 0.769, screen_height * 0.158],
        threshold: 4
        });

        click(point.x, point.y);
        sleep(500);
    }while(point != null);
}