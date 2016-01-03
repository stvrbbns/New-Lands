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


var MapPiece = new Class
({
    initialize: function(col, row, name, z_importance, visibility)
    {
        // Prepare default values.
        if(col == null) { col = 0; }
        if(row == null) { row = 0; }
        if(name == null) { name = ""; }
        if(z_importance == null) { z_importance = 5; }
        if(visibility != true) { visibility = false; }
        // Assign initial parameters.
        this.pos["col"] = col;
        this.pos["row"] = row;
        this.name = name;
        this.image = "pieces/48piece_" + name + ".png";
        this.z_importance = z_importance;
        this.isVisible = visibility;
    },
    /* Property/Attribute/Field declarations. */
    pos: new Array(), // An array of MapCell positions.
    name: "",
    image: "",
    z_importance: 5,
    isVisible: true,

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
    setPos: function(newPos) {
        this.pos = newPos;
    },
    move: function(newPos) {
//        var pieceDOMElement = document.getElementById("");
        this.setPos(newPos);
    },
    getName: function() {
        return this.name;
    },
    getImageZ: function() {
        var imageZ = new Array();
        imageZ["image"] = this.image;
        imageZ["zIndex"] = this.z_importance;
        return imageZ;
    },
    setimage: function(newimage) {
        this.image = newimage;
    },
    setZImportance: function(newZImportance) {
        this.z_importance = newZImportance;
    },
    getVisibility: function() {
        return this.isVisible;
    },
    setVisibility: function(newVisibility) {
        this.isVisible = newVisibility;
    }
}); // End of class MapPiece.