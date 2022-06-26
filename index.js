export class VisualizationLayer {

    constructor() {
        
    }

    init(seed) {

    }

    draw(x, z) {
        return '#000000'
    }

}

export class VisualizationDrawer {

    constructor() {
        this.layers = [];
    }

    draw(seed, canvas) {
        const ctx = canvas.getContext("2d")
        const dotSize = 1;
        //Init layers
        for (const layer of this.layers) {
            //Draw
            for (let x = 0; x < canvas.width / dotSize; x++) {
                for (let z = 0; z < canvas.height / dotSize; z++) {
                    setTimeout(() => {
                        layer.init(seed);
                        ctx.fillStyle = layer.draw(x, z);
                        ctx.fillRect(x * dotSize, z * dotSize, dotSize, dotSize);
                    }, 1);
                }
            }
        }
    }

}