/***  -- File Details --
 * Original Creation Date: 2010-08-18
 * Date Last Edited or Altered: 2010-08-18
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


var MapFeature = new Class
({
    initialize: function(col, row, name, z_importance, extentPos)
    {
        // Prepare default values.
        if(col == null) { col = 0; }
        if(row == null) { row = 0; }
        if(z_importance == null) { z_importance = 5; }
        if(extentPos == null) { extentPos = new Array(); }
        // Assign initial parameters.
        this.centerPos["col"] = col;
        this.centerPos["row"] = row;
        this.name = name;
        this.z_importance = z_importance;
        this.extentPos = extentPos;
    },
    /* Property/Attribute/Field declarations. */
    centerPos: new Array(), // A position.
    extentPos: new Array(), // An array of MapCell positions.
    name: "",
    z_importance: 5,

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
    setCenter: function(newCenterPos) {
        this.centerPos = newCenterPos;
        var alreadyHasCenter = false;
        for(var currentExtentIndex in this.extentPos)
        {
            if(  (this.extentPos[currentExtentIndex]["col"] == newCenterPos["col"])
              && (this.extentPos[currentExtentIndex]["row"] == newCenterPos["row"]) )
            { alreadyHasCenter = true; break; }
        }
        if(alreadyHasCenter == false)
        { this.addToExtent(newCenterPos); }
    },
    getImageZ: function() {
        var imageZ = new Array();
        imageZ["image"] = "features/48feature_" + this.name + ".png";
        imageZ["zIndex"] = this.z_importance;
        return imageZ;
    },
    getName: function() {
        return this.name;
    },
    getExtent: function() {
        return this.extentPos;
    },
    addToExtent: function(newCellPos) {
        this.extentPos.push(newCellPos);
    },
    removeFromExtent: function(oldCellPos) {
        array_removeElementByValue(this.extentPos, oldCellPos);
    },
    isInExtent: function(checkPosition) {
        for(var currentExtentIndex in this.extentPos)
        {
            if(  (this.extentPos[currentExtentIndex]["col"] == checkPosition["col"])
              && (this.extentPos[currentExtentIndex]["row"] == checkPosition["row"]) )
            { return true; }
        }
        return false;
    }
}); // End of class MapFeature.