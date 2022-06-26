import {VisualizationLayer, VisualizationDrawer} from "../index.js"
import {seedrandom} from "../node_modules/seedrandom/index.js"

function generateValueBasedSeed (seed, x, y, z) {
    const prime = 31;
    result = 1;
    result = prime * result + Math.floor(seed ^ (seed >>> 32));
    result = prime * result + x;
    result = prime * result + y;
    result = prime * result + z;
    return result;
}

class GridBiomeSpreadVisualizationLayer extends VisualizationLayer {

    constructor() {
        super();
        this.seed = 0;
        this.biomes = [
            {
                name: 'Plains',
                color: '#2222FF',
            },
            {
                name: 'Forest',
                color: '#0000AA',
            },
            {
                name: 'Desert',
                color: '#FFFF00',
            },
            {
                name: 'Mesa',
                color: '#FF5500'
            },
            {
                name: 'Snow',
                color: '#000000'
            },
            {
                name: 'Mountain',
                color: '#666666'
            }
        ]
        this.gridSize = 128;
    }

    init(seed) {
        this.seed = seed;
    }

    getBiomePoint(gridX, gridZ) {
        random = new seedrandom(generateValueBasedSeed(gridX, 0, gridZ, this.seed));
        //Generate point values
        point = {
            x: Math.floor((gridX + random()) * this.gridSize),
            z: Math.floor((gridZ + random()) * this.gridSize),
            weight: random() + 0.5,
            biome: this.biomes[Math.floor(random() * this.biomes.length)]
        }
        return point;
    }

    draw(x, z) {
        //Find biomes
        const gridX = Math.floor(x/this.gridSize)
        const gridZ = Math.floor(z/this.gridSize)

        const tl = this.getBiomePoint(gridX, gridZ)
        const tr = this.getBiomePoint(gridX + 1, gridZ)
        const bl = this.getBiomePoint(gridX, gridZ + 1)
        const br = this.getBiomePoint(gridX + 1, gridZ + 1)
        return '#FF0000'
    }

}

window.onload = () => {
    const canvas = document.getElementById("canvas");
    const visualizer = new VisualizationDrawer();
    visualizer.layers.push(new GridBiomeSpreadVisualizationLayer());
    visualizer.draw(50, canvas);
}