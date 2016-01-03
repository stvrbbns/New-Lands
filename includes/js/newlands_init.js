/***  -- File Details --
 * Original Creation Date: 2010-12-14
 * Date Last Edited or Altered: 2011-02-05
 * Author List [most recent active month]:
 *      Stephen T. Robbins [2011-02]
 * File Dependencies:
 *      functions_utility.js        includes/js/
 * Function List:
 *      -none-
 */
/* File Description: This is called in order to initialize the objects used in
 *      the game.
 *
 * File Activity Explanation: This file creates the JavaScript objects needed
 *      for the game.
 */
/* -- Known Issues, Suggested Updates/Improvements, and Notices --
 * Suggtn: Consider wrapping the initilization in an anonymous function in order
 *      to reduce the number of global variables and reduce the potential for
 *      collision in the future.
 */

/* Remember that the file dependencies must have been linked before this file. */


/* Identify the game construction parameters. */
// Set the map generation properties.
var hex_size = 48;
var map_numColumns = 6;
var map_numRows = 6;
var numEmpires = 3;
var forest_pct = 20;
var plains_pct = 53;
var desert_pct = 65;
var mountian_pct = 83;
var tundra_pct = 100;
var land_pct = 25;
var lake_pct = 40;
var island_pct = 50;
var water_pct = 100;
var metropolis_pct = 1;
var city_pct = 4;
var town_pct = 10;
var village_pct = 22;

/* Generate the map and its contents. */
var gameMap = new Map('ew', [],[],[]);

// Prepare to start a new game.
showNewGameDialog();

// Show the Help instructions/dialog at start.
document.getElementById('help').style.display = 'block'