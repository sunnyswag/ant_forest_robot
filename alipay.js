var screen_width = device.width;
var screen_height = device.height;
setScreenMetrics(screen_width, screen_height); // 适配其他分辨率的手机

// mainFunction();

// 1080 x 2400
// 坐标在左上角
// 设置 更多设置 开发者选项 显示指针位置：获取当前位置


function mainFunction(){
    unlock(); // 解锁
    openAlipay();
    enterAntForest();
    collectOthers(); // TODO
    getAlipyPoints(); // TODO
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

    // 收集自己的能量
    collectEnergy();
    
    toastLog("自己的能量已经收集完成");
    sleep(2000);
}

function collectOthers(){
    # TODO 
    click(1000, 1580);
    sleep(2000);
    collectEnergy();
    sleep(2000);
}

function collectEnergy(){
    // height：480 ~ 950
    // width ：130 ~ 960
    for(var row = screen_height * 0.2; row < screen_height * 0.396; row += 80)
        for(var column = screen_width * 0.12; column < screen_width * 0.889; column += 80)
            click(column, row);
}