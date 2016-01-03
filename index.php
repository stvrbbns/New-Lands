<?php
/***  -- File Details --
 * Original Creation Date: 2010-08-14
 * File Dependencies:               Location:
 *      newlands.css                includes/css/
 *      functions_gui.js            includes/js/
 *      newlands_init.js            includes/js/
 *      all object classes          includes/object_classes/
 * Function List:
 *      -none-
 */
/* File Description: This file is the primary page for the MooTools, JavaScript
 *      -based game "New Lands". In it, players try to explore a new land area
 *      as quickly as possible with restrictions on movement based on supply and
 *      on available equipment (players get a sailing ship and canoes).
 *
 * File Activity Explanation: This will generate the web page structure and call
 *      all of the necessary resources to build the page.
 */
/* -- Known Issues, Suggested Updates/Improvements, and Notices --
 * -none-
 */
/* -- TO DO --
 * * Add new-game choices for world/map style/algorithm.
 * * Enable dragging the map around within its display area so the map can be
 *      larger than its display area without having scroll bars.
 *
 * * Enable cylindrical maps.
 * * Enable toroidal maps and N-S map panning with ^^^ and vvv.
 * * Enable map seeds so the same map can be replayed.
 *
 * * Reimplement game using canvas.
 * * Make the game work on modern mobile device browsers.
 */


/* Display the page. */
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <title>New Lands Exploration</title>
  <meta http-equiv="content-type" content="text/html;charset=ISO-8859-1" />
  <link href="includes/css/newlands.css" rel="stylesheet" />
  <script type="text/javascript" src="includes/lib/mootools/mootools-core-1.3-full-compat.js"></script>
  <script type="text/javascript" src="includes/lib/mootools/mootools-1.3-more-nc.js"></script>
  <script type="text/javascript" src="includes/js/functions_utility.js"></script>
  <script type="text/javascript" src="includes/js/functions_gui.js"></script>
  <!-- Include all the JavaScript object classes. -->
  <?php include("includes/js/list_object_classes.php"); ?>
</head>
<body>
  <table class="gui_main" id="info_table">
    <tr><th colspan="6"><span style="font-size: large;">Explore New Lands! (Day# <span id="info_Days"></span>) [<span id="info_Difficulty"></span>]</span>
        <span id="show_options">Options >>
          <div id="game_options" class="options_div"><table id="game_options_table" class="options_table">
            <tr><td onClick="showHelp();" class="clickable" style="text-align: center;">Help Instructions</td></tr>
            <tr><td onClick="show_mapkey();" class="clickable" style="text-align: center;">View Map Key</td></tr>
            <tr><td onClick="showNewGameDialog();" class="clickable" style="text-align: center;">Start New Game</td></tr>
            <tr><td><input type="checkbox" name="showWarnings" id="showWarnings" checked /> Warnings?</td></tr>
            <tr><td class="clickable" style="text-align: center;"><a href="highscores.php">See High Scores</a></td></tr>
          </table></div>
          <input type="checkbox" name="limitSupply" id="limitSupply" style="display:none;" disabled />
        </span>
      </th>
    </tr>
    <tr><th colspan="3" style="width: 246px;">Points Earned: <span id="info_PointsEarned">0</span></th>
      <th colspan="3" style="width: 346px;">Explored: <span id="info_HexesExplored"></span>/<span id="info_TotalHexes"></span>
        (<span id="info_ExploredPercent"></span>%)</th>
    </tr>
    <tr><th colspan="2" style="width: 166px;">Location: <span id="info_PlayerLocation"></span></th>
      <th colspan="2"><span id="info_LocationTerrain"></span></th>
      <th colspan="2" style="width: 196px;"><span id="info_LocationSettlement"></span></th>
    </tr>
    <tr><th colspan="2">Supplies: <span id="info_Supplies"></span> days</th>
      <th colspan="4">Transport: 
        <input type="checkbox" name="ship" id="ship" onchange="setTransport('ship');" checked /> Ship
        &nbsp&nbsp&nbsp
        <input type="checkbox" name="canoes" id="canoes" onchange="setTransport('canoes');" checked /> Canoes
      </th>
    </tr>
  </table>
  <div id="help" class="dialog" onclick="document.getElementById('help').style.display='none';">
    <img src="images/close.png" alt="Close Help" class="clickable" style="float: right;" />
    The goal of the game is to explore all of the new lands as quickly
      as possible without your expedition starving from lack of supplies.
    <br/><br/>Use the keys 1-4,6-9 or 'qwe ad zxc' to move your party.
    <br/>'5' or 's' => open the action menu.
    <br/>'v' or click checkbox or menu item => leave or board canoes.
    <br/>'b' or click checkbox or menu item => leave or board ship.
    <br/>'r' or click menu item => rest & resupply in a settlement for 1 day.
    <br/>'k' or click menu item => view or close map key.
    <br/><br/>You can leave your ship and canoes at any time, but you lose
    them if you do. Be careful!
    <br/>You can get more canoes at any settlement.
    <br/>You can only get another ship at a city or metropolis.
    <br/><br/>You get more supplies by visiting settlements.
    <br/>Larger settlements give more supplies per day you spend there.
    <br/>You can carry at most 30 days of supplies at a time.
    <br/><br/>A map key is also available from the Options menu.
  </div>
  <div id="mapkey" class="dialog" onclick="document.getElementById('mapkey').style.display='none';">
    <img src="images/close.png" alt="Close Key" class="clickable" style="float: right;" />
    <span class="noimg">?</span> => Unexplored Area
    <br/><img src="images/features/48feature_Village.png" alt="Village" /> Village => canoes available, +1 supplies/day
    <br/><img src="images/features/48feature_Town.png" alt="Town" /> Town => canoes available, +2 supplies/day
    <br/><img src="images/features/48feature_City.png" alt="City" /> City => ship and canoes available, +3 supplies/day
    <br/><img src="images/features/48feature_Metropolis.png" alt="Metropolis" /> Metropolis => ship and canoes available, +4 supplies/day
    <br/><img src="images/hexes/48hex_water_Deep.png" alt="Ocean Deep" /> Ocean Deep => Ship only
    <br/><img src="images/hexes/48hex_water_Shallows.png" alt="Ocean Shallows" /> Ocean Shallows => Ship or canoes
    <br/><img src="images/hexes/48hex_water_Island.png" alt="Island" /> Island => Ship or canoes
    <br/><img src="images/hexes/48hex_water_Lakes.png" alt="Close" /> Lakes => No ship
    <br/><br/><br/><span class="noimg"></span> No Water => No ship or canoes
  </div>
  <div id="overlay"></div>
  <div id="newgame_dialog" class="dialog">
    <img src="images/close.png" alt="Cancel" class="clickable" style="float: right;" onclick="hideNewGameDialog();"/>
    Width:<input type="text" id="input_mapwidth" name="input_mapwidth" size="2" maxlength="2" value="10" onchange="checkMapSize();" />
    Height:<input type="text" id="input_mapheight" name="input_mapheight" size="2" maxlength="2" value="20" onchange="checkMapSize();" />
    Difficulty:<select id="input_gamedifficulty" name="input_gamedifficulty">
      <option value="easy">easy</option>
      <option value="normal" selected>normal</option>
      <option value="hard">hard</option>
    </select>
    <br/><button id="button_startnewgame" class="clickable" onclick="startNewGame();">Start New Game</button>
  </div>
  <div id="endgame_dialog" class="dialog">
    <span id="endmsg"></span>
    <br/>Player:<input type="text" id="input_playername" name="input_playername" size="6" maxlength="6"/>
    <br/><button id="button_submit_highscore" class="clickable" onclick="saveHighScore();">Submit Result for High Score</button>
    <button id="button_view_highscores" class="clickable" onclick="window.location = 'highscores.php';">See High Scores</button>
    <button id="button_newgame" class="clickable" onclick="hideEndGameDialog(); showNewGameDialog();">Play a New Game</button>
  </div>
  <table class="gui_main" id="map_table">
    <tr><td id="gui_mapAreaCell">
      <div id="game_menu" class="options_div"><table id="game_menu_table" class="options_table">
        <tr><td class="clickable" onClick="document.getElementById('game_menu').style.display = 'none';"
            style="text-align: center; text-decoration: underline; font-weight: bold;">Action Menu</td></tr>
        <tr><td onClick="movePlayer('none');" class="clickable"
            id="rest_option" style="text-align: center;">Resupply in Settlement</td></tr>
        <tr><td onClick="boardTransport('ship');" class="clickable"
            id="board_ship" style="text-align: center; display: none;">Board Ship</td></tr>
        <tr><td onClick="leaveTransport('ship');" class="clickable"
            id="leave_ship" style="text-align: center;">Leave Ship</td></tr>
        <tr><td onClick="boardTransport('canoes');" class="clickable"
            id="board_canoes" style="text-align: center; display: none;">Board Canoes</td></tr>
        <tr><td onClick="leaveTransport('canoes');" class="clickable"
            id="leave_canoes" style="text-align: center;">Leave Canoes</td></tr>
      </table></div>
      <div id="mainMap"></div>
    </td></tr>
  </table>
  <script type="text/javascript" src="includes/js/newlands_init.js"></script>
</body>
</html>