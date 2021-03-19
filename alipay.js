
var screen_width = device.width;
var screen_height = device.height;
var energy_mature = colors.rgb(211, 253, 0); // 能量可收集时的颜色
var finish_collection = colors.rgb(251, 253, 252); // 能量收集完成时的颜色判断
var runTime = '7:25'; // 运行时间

setScreenMetrics(screen_width, screen_height); // 适配其他分辨率的手机

mainFunction();

// 1080 x 2400
// 坐标在左上角
// 设置 更多设置 开发者选项 显示指针位置：获取当前位置

function mainFunction(){
    if(checkTime()){
        unlock(); // 解锁
        init(); // 获取截屏请求
        openAlipay();
        enterAntForest();
        collectOthers();
        getAlipyPoints();
        comeBack();
    }
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

// TODO 设置为定时任务

function collectOthers(){
    click(1000, 1580);
    while(true){
        var image = captureScreen();
        var tmp_color = images.pixel(image, 395, 460);
        var similar = colors.isSimilar(tmp_color, finish_collection)
        if(!similar){
            click(1000, 1580);
            sleep(2000);
            collectEnergy();
            sleep(500);
        }else{
            break;
        }
    }

    click("返回我的森林");

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

        if(point == null) // 重点 2
            break;

        click(point.x, point.y);
        sleep(500);
    }while(point != null);
}

function comeBack(){
    toastLog("能量收集完毕！");
    back();
    sleep(1000);
    back();
    exit();
}

function getAlipyPoints(){
    sleep();
    // TODO
}

function checkTime(){
    var now = new Date();
    var hour = now.getHours();
    var minuite = now.getMinutes();
    var runTimeList = runTime.split(":");
    var runT = 60 * Number(runTimeList[0]) + Number(runTimeList[1]);
    var time  = 60 * hour + minuite;
    if(time > runT){
        return true;
    }else{
        return false;
    }
}