import {VisualizationLayer, VisualizationDrawer} from "../index.js"

class GridBiomeSpreadVisualizationLayer extends VisualizationLayer {

    constructor() {
        super();
        this.seed = 0;
    }

    init(seed) {
        this.seed = seed;
    }

    draw(x, z) {
        return '#FF0000'
    }

}

window.onload = () => {
    const canvas = document.getElementById("canvas");
    const visualizer = new VisualizationDrawer();
    visualizer.layers.push(new GridBiomeSpreadVisualizationLayer());
    visualizer.draw(50, canvas);
}