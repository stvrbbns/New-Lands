/***  -- File Details --
 * Original Creation Date: 2010-08-19
 * Date Last Edited or Altered: 2010-08-19
 * Author List [most recent active month]:
 *      Stephen T. Robbins [2010-08]
 * File Dependencies:
 *      functions_utility.js        includes/js/
 * List:
 *      -none-
 *
 */
/* File Description: This file contains the Map class.
 *
 * File Activity Explanation: This file .
 */
/* -- Known Issues, Suggested Updates/Improvements, and Notices --
 * -none-
 */

/* Remember that the file dependencies must have been linked before this file. */


var MapCell = new Class
({
    initialize: function(col, row, water, land, features, owner)
    {
        // Prepare default values.
        if(features == null) { features = new Array(); }
        // Assign initial parameters.
        this.pos["col"] = col;
        this.pos["row"] = row;
        this.setOwner(owner);
        this.setWater(water);
        this.setLand(land);
        this.features = features;
        this.isVisible = false;
    },
    /* Property/Attribute/Field declarations. */
    pos: new Array(),
    img: new Array(),
    owner: "",
    land: "",
    water: "",
    terrain: "",
    features: new Array(), // An array of MapFeature objects.
    isVisible: false,

    /*** Access declarations. ***/
    getPos: function() {
        return this.pos;
    },
    getCol: function() {
        return this.pos["col"];
    },
    getRow: function() {
        return this.pos["row"];
    },
    getLocation: function() {
        return this.pos["col"] + ":" + this.pos["row"];
    },
    getImg: function() {
        return this.img;
    },
    setImg: function(type, img) {
        this.img[type] = img;
    },
    deleteImg: function(type) {
        delete this.img[type];
    },
    getOwner: function() {
        return this.owner;
    },
    setOwner: function(newOwner) {
        if((newOwner != null) && (newOwner != ""))
        {
            this.owner = newOwner;
            this.img["owner"] = "hexes/48hex_owner_" + newOwner + ".png";
        }
    },
    getLand: function() {
        return this.land;
    },
    setLand: function(newLand) {
        if((newLand != null) && (newLand != "") && (newLand != "Ocean"))
        {
            this.land = newLand;
            this.img["land"] = "hexes/48hex_land_" + newLand + ".png";
        } else {
            this.land = "Ocean";
            delete this.img["land"];
        }
        this.setTerrain();
    },
    getWater: function() {
        return this.water;
    },
    setWater: function(newWater) {
        if((newWater != null) && (newWater != ""))
        {
            this.water = newWater;
            this.img["water"] = "hexes/48hex_water_" + newWater + ".png";
        } else {
            this.water = "";
            delete this.img["water"];
        }
        this.setTerrain();
    },
    getTerrain: function() {
        return this.terrain;
    },
    setTerrain: function() {
        this.terrain = this.land + " " + this.water;
    },
    getVisibility: function() {
        return this.isVisible;
    },
    setVisibility: function(newVisibility) {
        if(this.isVisible == newVisibility)
        {
            return false;
        }
        this.isVisible = newVisibility;
        return true;
    },
    getFeatures: function() {
        return this.features;
    },
    setFeature: function(featureName, feature) {
        for(var featureIndex=0; featureIndex<this.features.length; featureIndex++)
        {
            if(this.features[featureIndex].getName() == featureName)
            {
                this.features[featureIndex] = feature;
                return true;
            }
        }
        return false;
    },
    addFeature: function(newFeature) {
        this.features.push(newFeature);
    },
    removeFeature: function(featureName) {
        delete this.features[featureName];
    }
}); // End of class MapCell.