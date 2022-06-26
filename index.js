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
        //Init layers
        for (const layer of this.layers) {
            layer.init(seed)
            //Draw
            for (let x = 0; x < canvas.width; x++) {
                for (let z = 0; z < canvas.height; z++) {
                    ctx.fillStyle = layer.draw(x, z);
                    ctx.fillRect(x, z, 1, 1);
                }
            }
        }
    }

}