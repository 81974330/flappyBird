import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";


export class Pipe extends Sprite{
    // img表示上下水管，top 表示出来时所在的高度
    constructor(img,top){
        const x =DataStore.getInstance().canvas.width;
        super(img,0,0,img.width,img.height,x,0,img.width,img.height);
        this.top = top;
    }

    draw(){
        this.x = this.x - 2;
        super.draw();
    }
}