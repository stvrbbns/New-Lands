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


var Map = new Class
({
    initialize: function(mapHexOrientation, initCells, initFeatures, initPieces)
    {
        // Prepare default values.
        if(mapHexOrientation == undefined){mapHexOrientation = "ew";}
        if(initCells == undefined){initCells = [];}
        if(initFeatures == undefined){initFeatures = [];}
        if(initPieces == undefined){initPieces = [];}
        // Assign initial parameters.
        this.hexOrientation = mapHexOrientation;
        this.cells = initCells;
        this.features = initFeatures;
        this.pieces = initPieces;
    },
    /* Property/Attribute/Field declarations. */
    hexOrientation: "", // "ew" or "ns", case-sensitive.
    cells: [],
    features: [],
    pieces: [],

    /*** Access declarations. ***/
    addCell: function(newCell) {
        this.cells.push(newCell);
    },
    removeCell: function(cell) {
        array_removeElementByValue(this.cells, cell);
    },
    getCells: function() {
        return this.cells;
    },
    getCellByPos: function(column, row) {
        var cellPos;
        for(var cellIndex = 0; cellIndex < this.cells.length; cellIndex++)
        {
            cellPos = this.cells[cellIndex].getPos();
            if(  (cellPos["row"] == row)
              && (cellPos["col"] == column))
            {
                return this.cells[cellIndex];
            }
        }
        return null;
    },
    getFeatures: function() {
        return this.features;
    },
    addFeature: function(newFeature) {
        this.features.push(newFeature);
    },
    removeFeature: function(feature) {
        array_removeElementByValue(this.features, feature);
    },
    addPiece: function(newPiece) {
        this.pieces.push(newPiece);
    },
    removePiece: function(piece) {
        unset(this.pieces[piece]);
        this.pieces.length--;
    },
    removePieceByValue: function(piece) {
        array_removeElementByValue(this.pieces, piece);
    },
    getPieces: function() {
        return this.pieces;
    },
    getPieceByPos: function(position) {
        for(var currentPieceIndex in this.pieces)
        {
            if(this.pieces[currentPieceIndex].getPos() == position)
            {
                return this.pieces[currentPieceIndex];
            }
        }
        return null;
    },
    getPieceByName: function(name) {
        for(var currentPieceIndex in this.pieces)
        {
            if(this.pieces[currentPieceIndex].getName() == name)
            {
                return this.pieces[currentPieceIndex];
            }
        }
        return null;
    },
    movePiece: function(name, newPos) {
        this.pieces[name].setPos(newPos);
    },

    /** getHexNeighborsPos() calculates and returns a 2D array of the neighors of a
     *      hex located at the indicated column (x) and row (y) position. The
     *      hexOrientation indicates whether the hex's flat sides are E-W or N-S.
     *      The order of the neighbor positions is from north around clockwise.
     * @param $column -- integer - the column position of the home hex.
     * @param $row -- integer - the row position of the home hex.
     * @param $mapWrap -- string - the kind of wrapping the hex map uses, if any:
     *          "cylindrical", "toroidal"
     * @return array - of position arrays.
     */
    getHexNeighborsPos: function(column, row, mapWrap)
    {
        // Set default parameter values.
        if((mapWrap == null) || (mapWrap == undefined)) { mapWrap = ""; }

        // Fill the neighbor array with the neighbor positions if the home hex were
        //      in the middle of the map.
        var neighborPositions = new Array();
        var hex_N = new Array();
        var hex_NE = new Array();
        var hex_E = new Array();
        var hex_SE = new Array();
        var hex_S = new Array();
        var hex_SW = new Array();
        var hex_W = new Array();
        var hex_NW = new Array();
        if(this.hexOrientation == "ew")
        {
            hex_NE["col"] = column+1; hex_NE["row"] = row-1;// NE
            hex_E["col"] = column+1; hex_E["row"] = row;   // E
            hex_SE["col"] = column+1; hex_SE["row"] = row+1;// SE
            hex_SW["col"] = column; hex_SW["row"] = row+1;  // SW
            hex_W["col"] = column-1; hex_W["row"] = row;   // W
            hex_NW["col"] = column; hex_NW["row"] = row-1;  // NW
            if(row%2==0)
            {
                hex_NE["col"]--;
                hex_SE["col"]--;
                hex_SW["col"]--;
                hex_NW["col"]--;
            }
            neighborPositions = [hex_NE, hex_E, hex_SE, hex_SW, hex_W, hex_NW];
        } else if(this.hexOrientation == "ns")
        {
            hex_N["col"] = column; hex_N["row"] = row-1;   // N
            hex_NE["col"] = column+1; hex_NE["row"] = row;  // NE
            hex_SE["col"] = column+1; hex_SE["row"] = row+1;// SE
            hex_S["col"] = column; hex_S["row"] = row+1;   // S
            hex_SW["col"] = column-1; hex_SW["row"] = row+1;// SW
            hex_NW["col"] = column-1; hex_NW["row"] = row;  // NW
            if(col%2==0)
            {
                hex_NE["row"]--;
                hex_SE["row"]--;
                hex_SW["row"]--;
                hex_NW["row"]--;
            }
            neighborPositions = [hex_N, hex_NE, hex_SE, hex_S, hex_SW, hex_NW];
        }
        var numNeighbors = neighborPositions.length;

        // Check the neighbor positions and deal with edge-of-the-map cases. Either
        //      delete the neighbors if they do not exist or alter the positions to
        //      indicate the neighbor because the map wraps on itself.
        for(var positionIndex=0; positionIndex<numNeighbors; positionIndex++)
        {
            var position = neighborPositions[positionIndex];
            if((mapWrap == "") || (mapWrap == "none"))
            {
                // If the map does not have a hex at the indicated neighbor position,
                //      then delete the neighbor.
                var neighborCell = this.getCellByPos(position["col"], position["row"]);
                if((neighborCell == undefined) || (neighborCell == null))
                {
                    array_removeElementByValue(neighborPositions, position);
                    positionIndex--;
                    numNeighbors--;
                }
            } else if(mapWrap == "cylindrical")
            {
                //
            } else if(mapWrap == "toroidal")
            {
                //
            }
        }

        // Return the array of neighbors' positions.
        return neighborPositions;
    } // End getHexNeighborsPos() function.
}); // End of class Map.