import {VisualizationLayer, VisualizationDrawer} from "../index.js"

function generateValueBasedSeed (seed, x, y, z) {
    const prime = 31;
    let result = 1;
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
        this.gridSize = 32;
        this.cache = {};
    }

    init(seed) {
        this.seed = seed;
    }

    getBiomePoint(gridX, gridZ) {
        if (this.cache[gridX + "/" + gridZ]) {
            return this.cache[gridX + "/" + gridZ]
        }
        const random = new Math.seedrandom(generateValueBasedSeed(gridX, 0, gridZ, this.seed));
        //Generate point values
        let point = {
            x: Math.floor((gridX + random()) * this.gridSize),
            z: Math.floor((gridZ + random()) * this.gridSize),
            weight: random() + 0.5,
            biome: this.biomes[Math.floor(random() * this.biomes.length)]
        }
        this.cache[gridX + "/" + gridZ] = point;
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

        let biome = null;
        let distance = Number.MAX_VALUE;
        for (const p of [tl, tr, br, bl]) {
            const d = (Math.pow(x - p.x, 2) + Math.pow(z - p.z, 2));
            const dw = d * p.weight;
            if (dw < distance) {
                biome = p;
                distance = dw;
            }
        }
        return biome.biome.color;
    }

}

window.onload = () => {
    const canvas = document.getElementById("canvas");
    const visualizer = new VisualizationDrawer();
    visualizer.layers.push(new GridBiomeSpreadVisualizationLayer());
    visualizer.draw(50, canvas);
}