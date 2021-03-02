unlock();

toast("hello " + device.brand + "!");
toast("device.width: " + device.width + ", device.height: " + device.height);
device.vibrate(100);

// 1080 x 2400
// 坐标在左上角
// 设置 更多设置 开发者选项 显示指针位置：获取当前位置
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
}