export default class Map {
    constructor(scene, key, tileSetName, bgLayerName, blockedLayerName, detailLayerName, tileSize) {

        // Create local variables associated with each passed-in variable
        this.scene = scene;
        this.key = key;
        this.tileSetName = tileSetName;
        this.bgLayerName = bgLayerName;
        this.blockedLayerName = blockedLayerName;
        this.detailLayerName = detailLayerName;
        this.tileSize = tileSize;

        // For use later when setting worldBounds and cameraBounds
        this.width =0;
        this.height = 0;

        this.createMap();       

    }

    createMap() {
        
        //create tilemap
        this.map = this.scene.make.tilemap({key: this.key});

        //add tileset image
        this.tiles = this.map.addTilesetImage(this.tileSetName, this.tileSetName,this.tileSize,this.tileSize,0,0,);
        
        //create ground Layer (what the character walks on)
        this.backgroundLayer = this.map.createLayer(this.bgLayerName, this.tiles, 0,0);

        //create collision Layer (what the character bumps into)
        this.collisionLayer = this.map.createLayer(this.blockedLayerName,this.tiles,0,0);
        // Allows you to select tiles to not collide on        
        this.collisionLayer.setCollisionByExclusion([-1]);

        //create detail Layer (what appears over/in-front-of the character)
        this.detailLayer = this.map.createLayer(this.detailLayerName, this.tiles,0,0);
        // depth=2 is "on top of" the character and everything else
        this.detailLayer.depth=2;

        // update local variables for use in game Scene
        this.width = this.map.widthInPixels;
        this.height = this.map.heightInPixels;

    }
}