/***  -- File Details --
 * Original Creation Date: 2011-01-30
 * Date Last Edited or Altered: 2011-05-05
 * Author List [most recent active month]:
 *      Stephen T. Robbins [2011-01]
 * File Dependencies:
 *      -none-
 * Function List:
 *      handle_keyInput(element)
 *      toggle_mapkey_vis()
 *      show_mapkey()
 *      movePlayer(direction)
 *      setPlayerImage()
 *      setPlayerPosition(newColumn, newRow)
 *      showHelp()
 *      showNewGameDialog()
 *      hideNewGameDialog()
 *      startNewGame()
 *      setDifficulty()
 *      setTransport(transport)
 *      boardTransport(transport)
 *      leaveTransport(transport)
 *      checkMapSize()
 *      showEndGameDialog()
 *      hideEndGameDialog()
 *      saveHighScore()
 *      myalert(msg)
 */
/* File Description: This file is used to power the game GUI.
 *
 * File Activity Explanation: This file contains a collection of AJAX/interface
 *      functions and global variables for use in the GUI.
 */
/* -- Known Issues, Suggested Updates/Improvements, and Notices --
 * -none-
 */


// Global variable declarations.
var cellHeight = 1;
var cellWidth = 1;


// GUI initialization.
window.onkeypress = handle_keyInput;



/* Desc: handle_keyInput() is triggered by the browser window's onkeypress event
 *      and is tasked with handling keyboard input, such as hotkeys.
 * @param: element -- DOM element - the element with focus where the key was
 *          pressed.
 */
function handle_keyInput(element)
{
// Only handle input as game commands if the overlay is not visible.
if(document.getElementById('overlay').style.display == 'none')
{
  // Cross-browser support segment to figure out what key was pressed.
  var code, eventVar;
  if (!element) eventVar = window.event;
  else eventVar = element;
  if (eventVar.keyCode) code = eventVar.keyCode;
  else if (eventVar.which) code = eventVar.which;
  else code = event.keyCode;

  // Allow text-control keys to be pressed.
  switch(code) // Using ASCII
  {
    case 122:   // z
    case 49:    // 1
      // Move player SW.
      movePlayer('sw');
      break;
    case 120:   // x
    case 50:    // 2
      // Move player S.
      movePlayer('s');
      // Navigate menu, down one menu item.
      break;
    case 99:    // c
    case 51:    // 3
      // Move player SE.
      movePlayer('se');
      break;
    case 97:    // a
    case 52:    // 4
      // Move player W.
      movePlayer('w');
      break;
    case 115:   // s
    case 53:    // 5
      // Toggle the menu opened/closed.
      if(document.getElementById('game_menu').style.display == 'block')
      {
        document.getElementById('game_menu').style.display = 'none';
      } else {
        document.getElementById('game_menu').style.display = 'block';
      }
      break;
    case 100:   // d
    case 54:    // 6
      // Move player E.
      movePlayer('e');
      break;
    case 113:   // q
    case 55:    // 7
      // Move player NW.
      movePlayer('nw');
      break;
    case 119:   // w
    case 56:    // 8
      // Move player N.
      movePlayer('n');
      // Navigate menu, up one menu item.
      break;
    case 101:   // e
    case 57:    // 9
      // Move player NE.
      movePlayer('ne');
      break;
    case 118:    // v
      // Board/Leave canoes.
      if(document.getElementById('canoes').checked)
      {
        leaveTransport('canoes');
      } else if(!(document.getElementById('canoes').disabled)) {
        boardTransport('canoes');
      }
      break;
    case 98:    // b
      // Board/Leave ship.
      if(document.getElementById('ship').checked)
      {
        leaveTransport('ship');
      } else if(!(document.getElementById('ship').disabled)) {
        boardTransport('ship');
      }
      break;
    case 114:    // r
      // Resupply in settlement.
      if(document.getElementById('rest_option').style.display != 'none')
      {
        movePlayer('none');
      }
      break;
    case 107:    // k
      // Toggle the map key opened/closed.
      toggle_mapkey_vis();
      break;
    default:
  }
}
} // End of handle_keyInput() function.



/* Desc: toggle_mapkey_vis() toggles the visibility of the map key DIV.
 */
function toggle_mapkey_vis()
{
  // Toggle the map key opened/closed.
  if(document.getElementById('mapkey').style.display == 'block')
  {
    document.getElementById('mapkey').style.display = 'none';
  } else {
    document.getElementById('mapkey').style.display = 'block';
  }
}



/* Desc: show_mapkey() displays the map key DIV.
 */
function show_mapkey()
{
  document.getElementById('mapkey').style.display = 'block';
}



/* Desc: movePlayer() takes a string describing the direction to move the player
 *      and moves the DOM element with id="player".
 * @param: direction -- string - the direction to move the player.
 */
function movePlayer(direction)
{
try {
  // Get the current location and calculate the current pixel position of the player.
  var gamePiece = gameMap.getPieceByName('Player');
  var gamePiecePos = gamePiece.getPos();
  // Determine what the new position would be if the move is permissible.
  var colChange = 0;
  var rowChange = 0;
  var noMoveMessage = 'That is not a legitimate direction.';
  var playerRowIsEven = false;if(gamePiecePos['row']%2 == 0){playerRowIsEven = true;}
  switch (direction)
  {
    case 'n':
      rowChange = -1;
      noMoveMessage = 'Thar be sea dragons that way!\nThe map edge is to the north.';
      break;
    case 'ne':
      colChange = 1;
      rowChange = -1;
      noMoveMessage = 'Thar be sea dragons that way!\nThe map edge is to the northeast.';
      break;
    case 'e':
      colChange = 1;
      noMoveMessage = 'Thar be sea dragons that way!\nThe map edge is to the east.';
      break;
    case 'se':
      colChange = 1;
      rowChange = 1;
      noMoveMessage = 'Thar be sea dragons that way!\nThe map edge is to the southeast.';
      break;
    case 's':
      rowChange = 1;
      noMoveMessage = 'Thar be sea dragons that way!\nThe map edge is to the south.';
      break;
    case 'sw':
      rowChange = 1;
      noMoveMessage = 'Thar be sea dragons that way!\nThe map edge is to the southwest.';
      break;
    case 'w':
      colChange = -1;
      noMoveMessage = 'Thar be sea dragons that way!\nThe map edge is to the west.';
      break;
    case 'nw':
      rowChange = -1;
      noMoveMessage = 'Thar be sea dragons that way!\nThe map edge is to the northwest.';
      break;
    case 'none':
      break;
  }
  // Account for the back-and-forth pattern of hex columns.
  if(((direction == 'nw') || (direction == 'sw') || (direction == 'ne') || (direction == 'se'))
    && playerRowIsEven)
  {colChange--;}

  // Try to move the player to the new location.
  var moved = setPlayerPosition(gamePiecePos['col'] + colChange, gamePiecePos['row'] + rowChange);
  if(moved !== true)
  {
    // Warn if the player's piece could not be moved to the requested location.
    if(!isEmpty(moved)) noMoveMessage = moved;
    if(document.getElementById('showWarnings').checked)
    {alert(noMoveMessage);}
  } else {
    // Increment the number of days spent in the game.
    var numDays = parseInt(document.getElementById('info_Days').innerHTML);
    numDays++;
    document.getElementById('info_Days').innerHTML = numDays;
    // Decrement the supplies available.
    if(document.getElementById('limitSupply').checked == true)
    {
      var numSupplies = parseInt(document.getElementById('info_Supplies').innerHTML);
      numSupplies--;
      document.getElementById('info_Supplies').innerHTML = numSupplies;
      // End the game if the player has run out of supplies.
      if(numSupplies <= 0)
      {
        showEndGameDialog();
      }
    }
    // If the entire map is explored, let the player start a new game.
    if(parseInt(document.getElementById('info_HexesExplored').innerHTML)
      == parseInt(document.getElementById('info_TotalHexes').innerHTML))
    {
      showEndGameDialog();
    }
  }
} catch(e) {alert('{' + e.description + '}: ' + e.message);}
} // End of movePlayer() function.



/* Desc: setPlayerImage() sets the image of the player based on their transport.
 */
function setPlayerImage()
{
try {
  var playerPiece = gameMap.getPieceByName('Player');
  var playerImage = document.getElementById('Player_image');
  var hasShip = document.getElementById('ship').checked;
  var hasCanoes = document.getElementById('canoes').checked;
  if(hasShip)
  {
    playerPiece.setimage('pieces/48piece_Ship.png');
    playerImage.setAttribute('src', 'images/pieces/48piece_Ship.png');
    
  } else if(hasCanoes)
  {
    playerPiece.setimage('pieces/48piece_Canoes.png');
    playerImage.setAttribute('src', 'images/pieces/48piece_Canoes.png');
  } else {
    playerPiece.setimage('pieces/48piece_Player.png');
    playerImage.setAttribute('src', 'images/pieces/48piece_Player.png');
  }
} catch(e) {alert('{' + e.description + '}: ' + e.message);}
} // End of setPlayerImage() function.



/* Desc: setPlayerPosition() takes a column and row describing the new location
 *      for the player and moves the DOM element with id="player" there.
 * @param: newColumn -- integer - the column to move the player to.
 * @param: newRow -- integer - the row to move the player to.
 * @return: boolean - whether or not the move was successful.
 */
function setPlayerPosition(newColumn, newRow)
{
try {
  // Mark the new location of this piece.
  var newPiecePos = new Array();
  newPiecePos['col'] = newColumn;
  newPiecePos['row'] = newRow;
  // Check if the destination cell exists.
  var destinationCell = gameMap.getCellByPos(newColumn, newRow);
  if(destinationCell == null)
  {
    // Return false; the move failed because no such destination exists.
    alert('setPlayerPosition() failed @ ' + newColumn + ', ' + newRow);
    return false;
  }

  // Check if the destination cell is compatible with the player's transportation.
  var destination_water = destinationCell.getWater();
  var player_has_ship = document.getElementById('ship').checked;
  var player_has_canoes = document.getElementById('canoes').checked;
  if(  (destination_water == '')
    && (player_has_ship || player_has_canoes) )
  {
    // Return false; the move failed because player cannot take a ship or
    //      canoes into a cell without water.
    return 'You cannot take ships or canoes somewhere without water.';
  }
  if(  (destination_water == 'Lakes')
    && (player_has_ship) )
  {
    // Return false; the move failed because player cannot take a ship into
    //      a cell with only lakes.
    return 'The rivers are too shallow for ocean-going ships.';
  }
  if(  ((destination_water == 'Island') || (destination_water == 'Shallows'))
    && !(player_has_ship || player_has_canoes) )
  {
    // Return false; the move failed because player traverse shallow water
    //      without a ship or canoes.
    return 'You need a ship or canoes to traverse shallow water.';
  }
  if(  (destination_water == 'Deep')
    && !(player_has_ship) )
  {
    // Return false; the move failed because player cannot traverse deep
    //      water without a ship.
    return 'You need a ship to traverse deep ocean.';
  }

  // Move the piece by saving the piece's new location.
  var gamePiece = gameMap.getPieceByName('Player');
  gamePiece.setPos(newPiecePos);
  // Determine what the new pixel position will be.
  var newLeft = (newColumn * hex_size);
  var newTop = (newRow * hex_size * 0.75);
  if(newRow%2 == 1)
  {
    newLeft += (0.5 * hex_size);
  }
  // Set the new pixel position.
  var playerDOMElement = document.getElementById('Player');
  playerDOMElement.style.left = newLeft + 'px';
  playerDOMElement.style.top = newTop + 'px';

  // Update the infobar.
  document.getElementById('info_PlayerLocation').innerHTML = destinationCell.getLocation();
  document.getElementById('info_LocationTerrain').innerHTML = destinationCell.getTerrain();
  document.getElementById('info_LocationSettlement').innerHTML = destinationCell.getOwner();
  var locationFeatures = destinationCell.getFeatures();
  for(var featureIndex=0; featureIndex<locationFeatures.length; featureIndex++)
  {
    var locationFeature = locationFeatures[featureIndex];
    document.getElementById('info_LocationSettlement').innerHTML += ' ' + locationFeature.getName();
  }

  // Reveal the new and neighbor hexes.
  var hexPositions = gameMap.getHexNeighborsPos(newColumn, newRow, 'none');
  var targetHex = new Array();
  targetHex['col'] = newColumn;
  targetHex['row'] = newRow;
  hexPositions.push(targetHex);
  for(var positionIndex=0; positionIndex<hexPositions.length; positionIndex++)
  {
    // Mark the target hex and its neighbors as visible.
    var position = hexPositions[positionIndex];
    var nowVisibleCell = gameMap.getCellByPos(position['col'], position['row']);
    // Actually display the hex.
    var nowVisibleCellDiv = document.getElementById('cell_'+position['col']+'_'+position['row']);
    nowVisibleCellDiv.style.display = 'inline';
    // If the cell is newly explored, add to the exploration count and score.
    if(nowVisibleCell.setVisibility(true))
    {
      var exploredHexcount = parseInt(document.getElementById('info_HexesExplored').innerHTML);
      exploredHexcount++;
      document.getElementById('info_HexesExplored').innerHTML = exploredHexcount;
      document.getElementById('info_ExploredPercent').innerHTML = Math.round(exploredHexcount / (map_numColumns * map_numRows) * 100);
    }
  }

  // If the player's new position has a settlement, increase the amount of
  //      supplies they have. Also set transportation selection options.
  if(document.getElementById('canoes').checked == false) document.getElementById('canoes').disabled = true;
  if(document.getElementById('ship').checked == false) document.getElementById('ship').disabled = true;
  document.getElementById('rest_option').style.display = 'none';
  document.getElementById('board_ship').style.display = 'none';
  document.getElementById('board_canoes').style.display = 'none';
  var destinationFeatures = destinationCell.getFeatures();
  for(featureIndex=0; featureIndex<destinationFeatures.length; featureIndex++)
  {
    var featureName = destinationFeatures[featureIndex].getName();
    var numSupplies = parseInt(document.getElementById('info_Supplies').innerHTML);
    switch(featureName)
    {
      case 'Village':
        document.getElementById('canoes').disabled = false;
        document.getElementById('board_canoes').style.display = '';
        numSupplies += 2;
        document.getElementById('rest_option').style.display = '';
        break;
      case 'Town':
        document.getElementById('canoes').disabled = false;
        document.getElementById('board_canoes').style.display = '';
        numSupplies += 3;
        document.getElementById('rest_option').style.display = '';
        break;
      case 'City':
        document.getElementById('ship').disabled = false;
        document.getElementById('board_ship').style.display = '';
        document.getElementById('canoes').disabled = false;
        document.getElementById('board_canoes').style.display = '';
        numSupplies += 4;
        document.getElementById('rest_option').style.display = '';
        break;
      case 'Metropolis':
        document.getElementById('ship').disabled = false;
        document.getElementById('board_ship').style.display = '';
        document.getElementById('canoes').disabled = false;
        document.getElementById('board_canoes').style.display = '';
        numSupplies += 5;
        document.getElementById('rest_option').style.display = '';
        break;
    }
    numSupplies = Math.min(numSupplies, 31);
    document.getElementById('info_Supplies').innerHTML = numSupplies;
  }

  // Return true because the move was successful.
  return true;
} catch(e) {alert('{' + e.description + '}: ' + e.message);}
} // End of setPlayerPosition() function.



/* Desc: showHelp() shows the help and instructions window.
 */
function showHelp()
{
  document.getElementById('help').style.display = 'block';
} // End of showHelp() function.



/* Desc: showNewGameDialog() shows the help and instructions window.
 */
function showNewGameDialog()
{
  hideEndGameDialog();
  document.getElementById('overlay').style.display = 'block';
  document.getElementById('newgame_dialog').style.display = 'block';
} // End of showNewGameDialog() function.



/* Desc: hideNewGameDialog() hides the end game dialog.
 */
function hideNewGameDialog()
{
  document.getElementById('overlay').style.display = 'none';
  document.getElementById('newgame_dialog').style.display = 'none';
} // End of hideNewGameDialog() function.



/* Desc: startNewGame() starts a new game. It requires that the map entities
 *      exist so that they can be deleted and remade.
 */
function startNewGame()
{
try {
  // Hide the new game dialog.
  hideNewGameDialog();

  // Delete the current game.
  var mapDiv = document.getElementById('mainMap');
  document.getElementById('gui_mapAreaCell').removeChild(mapDiv)
  delete gameMap;

  // Set the global map/game variables based on the new game dialog inputs.
  setDifficulty();
  map_numColumns = document.getElementById('input_mapwidth').value;
  map_numRows = document.getElementById('input_mapheight').value;

  // Reset some settings.
  document.getElementById('info_Days').innerHTML = 1;
  document.getElementById('ship').checked = true;
  document.getElementById('canoes').checked = true;
  // Reset the supply, total hexes, and explored hexes figures.
  var num_TotalHexes = map_numColumns * map_numRows;
  document.getElementById('info_TotalHexes').innerHTML = num_TotalHexes;
  document.getElementById('info_HexesExplored').innerHTML = 0;
  document.getElementById('info_ExploredPercent').innerHTML = 0;
  // Create a new map.
  gameMap = new Map('ew', [],[],[]);

  // Build each necessary map cell and add it to the game map.
  for(var colIndex=0; colIndex<map_numColumns; colIndex++)
  {
    var cellWater = null;
    var cellLand = null;
    var cellOwner = null;
    var cityType = null;
    var cellCity = null;
    for(var rowIndex=0; rowIndex<map_numRows; rowIndex++)
    {
      // Determine the water surface of the cell.
      var roll_water = rand_int(0, 99);
      if(roll_water < land_pct) {cellWater = '';}
      else if(roll_water < lake_pct) {cellWater = 'Lakes';}
      else if(roll_water < island_pct) {cellWater = 'Island';}
      else {cellWater = 'Deep';}
      // All border cells are ocean cells.
      if(  (colIndex == 0)
        || (rowIndex == 0)
        || (colIndex == map_numColumns-1)
        || (rowIndex == map_numRows-1))
      {
        roll_water = 100;
        cellWater = 'Deep';
      }
      // Determine the landscape of the cell.
      if(roll_water < island_pct)
      {
        var roll_land = rand_int(0, 99);
        if(roll_land < forest_pct) {cellLand = 'Forest';}
        else if(roll_land < plains_pct) {cellLand = 'Plains';}
        else if(roll_land < desert_pct) {cellLand = 'Desert';}
        else if(roll_land < mountian_pct) {cellLand = 'Mountain';}
        else {cellLand = 'Tundra';}
      }

      // Create the new MapCell object.
      cell = new MapCell(colIndex, rowIndex, cellWater, cellLand);

      // Determine the features of the cell if it has land.
      if(roll_water < island_pct)
      {
        // Check if the cell has a city.
        var roll_city = rand_int(0, 99);
        if(  (roll_water < land_pct)
          && (roll_city < metropolis_pct) )
          {cityType = 'Metropolis';}
        else if( (roll_water < lake_pct)
           && (roll_city < city_pct) )
          {cityType = 'City';}
        else if(roll_city < town_pct) {cityType = 'Town';}
        else if(roll_city < village_pct) {cityType = 'Village';}

        // If there is a city, then roll an owner for it.
        if(roll_city < village_pct)
        {
          var roll_owner = rand_int(1, numEmpires);
          switch (roll_owner) {
            case 1:
              cellOwner = 'Red';
              break;
            case 2:
              cellOwner = 'Green';
              break;
            case 3:
              cellOwner = 'Blue';
              break;
          }
          cell.setOwner(cellOwner);
          cellCity = new MapFeature(colIndex, rowIndex, cityType, 5);
          cell.addFeature(cellCity);
        }
      }

      // Add the newly created MapCell object to the game map.
      gameMap.addCell(cell);
    }
  }

  // Review the cells to set all-water cells with 3+ land neighbors to be shallow.
  // Also delete the land from all-water cells.
  for(colIndex=0; colIndex<map_numColumns; colIndex++)
  {
    for(rowIndex=0; rowIndex<map_numRows; rowIndex++)
    {
      var currentCell = gameMap.getCellByPos(colIndex, rowIndex);
      if(currentCell.getWater() == 'Deep')
      {
        // Delete the 'land' because there isn't any.
        currentCell.setLand(null);
        // Count the number of land neighbor cells.
        var landNeighborCount = 0;
        var neighborPositions = gameMap.getHexNeighborsPos(colIndex, rowIndex, 'none');
        for(var positionIndex=0; positionIndex<neighborPositions.length; positionIndex++)
        {
          var position = neighborPositions[positionIndex];
          var neighborCell = gameMap.getCellByPos(position['col'], position['row']);
          if(  (neighborCell.getWater() != 'Deep')
            && (neighborCell.getWater() != 'Island') )
          {landNeighborCount++;}
        }
        // If there are 3+ land neighbors, change this image to shallow.
        if(landNeighborCount >= 3)
        {
          currentCell.setWater('Shallows');
        }
      }
    }
  }

  // Create and add the player's game piece to the game map.
  playerPiece = new MapPiece(0, 0, 'Player', 10, true);
  gameMap.addPiece(playerPiece);


  /* Display the map. */
  // Define some variables describing the map.
  var cellHeight = hex_size;
  var cellWidth = hex_size;
  var mapHeight = (map_numRows * cellHeight * 0.75) + (cellHeight * 0.25);
  var mapWidth = (map_numColumns * cellWidth) + (0.5 * cellWidth);
  // Create the mapArea div and add it to the GUI mapArea cell.
  var mapArea = document.createElement('div');
  mapArea.setAttribute('id', 'mainMap');
  mapArea.className = 'map';
  mapArea.style.height = mapHeight + 'px';
  mapArea.style.width = mapWidth + 'px';
  document.getElementById('gui_mapAreaCell').appendChild(mapArea);

  // Display the map cells by creating them dynamically and adding them to the map area.
  var mapCellsArray = gameMap.getCells();
  for(var cellIndex=0; cellIndex<mapCellsArray.length; cellIndex++)
  {
    var mapCell = mapCellsArray[cellIndex];
    // Define some variables describing the cell's position.
    var col = mapCell.getCol();
    var row = mapCell.getRow();
    var xPos_cell = (col * hex_size);
    var yPos_cell = (row * hex_size * 0.75);
    var yPos_qMark = yPos_cell + (hex_size / 2);
    if(mapCell.getRow()%2 == 1)
    {
      xPos_cell += (0.5 * hex_size);
    }
    xPos_cell += 'px';
    yPos_cell += 'px';
    yPos_qMark += 'px';

    // Create the cell and add it to the map area.
    var qMarkDiv = document.createElement('div');
    qMarkDiv.className = 'q_mark';
    qMarkDiv.style.top = yPos_qMark;
    qMarkDiv.style.left = xPos_cell;
    qMarkDiv.style.height = cellHeight + 'px';
    qMarkDiv.style.width = cellWidth + 'px';
    qMarkDiv.innerHTML = '?';
    mapArea.appendChild(qMarkDiv);

    var cellDiv = document.createElement('div');
    cellDiv.setAttribute('id', 'cell_'+col+'_'+row);
    cellDiv.className = 'cell';
    cellDiv.style.top = yPos_cell;
    cellDiv.style.left = xPos_cell;
    cellDiv.style.height = cellHeight + 'px';
    cellDiv.style.width = cellWidth + 'px';
    cellDiv.style.display = 'none';
    mapArea.appendChild(cellDiv);


    // Get the image layers which make up the cell and add them to the cell div.
    var imageArray = mapCell.getImg();
    if(imageArray['owner'] != undefined)
    {
      var imageName_owner = imageArray['owner'];
      var ownerImage = document.createElement('img');
      ownerImage.setAttribute('src', 'images/'+imageName_owner);
      ownerImage.setAttribute('id', 'cell_'+col+'_'+row+'_owner');
      ownerImage.style.zIndex = 1;
      cellDiv.appendChild(ownerImage);
    }
    if(imageArray['land'] != undefined)
    {
      var imageName_land = imageArray['land'];
      var landImage = document.createElement('img');
      landImage.setAttribute('src', 'images/'+imageName_land);
      landImage.setAttribute('id', 'cell_'+col+'_'+row+'_land');
      landImage.style.zIndex = 2;
      cellDiv.appendChild(landImage);
    }
    if(imageArray['water'] != undefined)
    {
      var imageName_water = imageArray['water'];
      var waterImage = document.createElement('img');
      waterImage.setAttribute('src', 'images/'+imageName_water);
      waterImage.setAttribute('id', 'cell_'+col+'_'+row+'_water');
      waterImage.style.zIndex = 4;
      cellDiv.appendChild(waterImage);
    }
    cellFeatures = mapCell.getFeatures();
    if(!isEmpty(cellFeatures))
    {
      for(var featureIndex=0; featureIndex<cellFeatures.length; featureIndex++)
      {
        var feature = cellFeatures[featureIndex];
        var feature_name = feature.getName();
        var feature_imageZ = feature.getImageZ();
        var feature_image = feature_imageZ['image'];
        var feature_zIndex = feature_imageZ['zIndex'];
        var featureImage = document.createElement('img');
        featureImage.setAttribute('src', 'images/'+feature_image);
        featureImage.setAttribute('id', 'cell_'+col+'_'+row+'_'+feature_name);
        featureImage.style.zIndex = feature_zIndex;
        cellDiv.appendChild(featureImage);
      }
    }
  }

  // Display the game pieces by creating them dynamically and adding them to the map area.
  var gamePieces = gameMap.getPieces();
  for(var pieceIndex=0; pieceIndex<gamePieces.length; pieceIndex++)
  {
    var gamePiece = gamePieces[pieceIndex];
    // Get the piece's info.
    var piece_name = gamePiece.getName();
    var piece_imageZ = gamePiece.getImageZ();
    var pieceImageName = piece_imageZ['image'];
    var pieceZIndex = piece_imageZ['zIndex'];
    // Calculate the pixel position of the piece.
    var xPos_piece = (gamePiece.getCol() * hex_size);
    var yPos_piece = (gamePiece.getRow() * hex_size * 0.75);
    if(gamePiece.getRow()%2 == 1)
    {
      xPos += (0.5 * hex_size);
    }
    xPos_piece += 'px';
    yPos_piece += 'px';

    // Create the piece div and add it to the map area.
    var pieceDiv = document.createElement('div');
    pieceDiv.setAttribute('id', piece_name);
    pieceDiv.className = 'piece';
    pieceDiv.style.top = yPos_piece;
    pieceDiv.style.left = xPos_piece;
    pieceDiv.style.height = cellHeight + 'px';
    pieceDiv.style.width = cellWidth + 'px';
    pieceDiv.style.zIndex = pieceZIndex;
    pieceDiv.style.display = 'inline';
    mapArea.appendChild(pieceDiv);
    // Create the piece image and add it to the piece div.
    var pieceImage = document.createElement('img');
    pieceImage.setAttribute('src', 'images/'+pieceImageName);
    pieceImage.setAttribute('id', piece_name+'_image');
    pieceImage.style.zIndex = pieceZIndex;
    pieceDiv.appendChild(pieceImage);
  }

  // Set the player's piece at its initial starting position.
  var roll_startPos = rand_int(0, (map_numColumns*2) + (map_numRows*2) - 1);
  switch(true)
  {
    case (roll_startPos < map_numRows):
      setPlayerPosition(0, roll_startPos);
      break;
    case (roll_startPos < (map_numRows*2)):
      setPlayerPosition(map_numColumns-1, roll_startPos-map_numRows);
      break;
    case (roll_startPos < (map_numRows*2 + (map_numColumns*1))):
      setPlayerPosition(roll_startPos-(map_numRows*2), 0);
      break;
    default:
      setPlayerPosition(roll_startPos-(map_numRows*2 + map_numColumns*1), map_numRows-1);
      break;
  }
  setPlayerImage();
} catch(e) {alert('{' + e.description + '}: ' + e.message);}
} // End of startNewGame() function.



/* Desc: setDifficulty() lets the player set the map's difficulty level.
 */
function setDifficulty()
{
try {
  switch(document.getElementById('input_gamedifficulty').value)
  {
    case 'easy':
      metropolis_pct = 2;
      city_pct = 6;
      town_pct = 14;
      village_pct = 30;
      document.getElementById('info_Supplies').innerHTML = 'Unlimited';
      document.getElementById('limitSupply').checked = false;
      break;
    case 'normal':
      metropolis_pct = 2;
      city_pct = 6;
      town_pct = 14;
      village_pct = 30;
      document.getElementById('info_Supplies').innerHTML = 30;
      document.getElementById('limitSupply').checked = true;
      break;
    case 'hard':
      metropolis_pct = 1;
      city_pct = 4;
      town_pct = 10;
      village_pct = 22;
      document.getElementById('info_Supplies').innerHTML = 30;
      document.getElementById('limitSupply').checked = true;
      break;
    default:
      break;
  }
  document.getElementById('info_Difficulty').innerHTML = document.getElementById('input_gamedifficulty').value;
} catch(e) {alert('{' + e.description + '}: ' + e.message);}
} // End of setDifficulty() function.



/* Desc: setTransport() sets the status of the indicated transport option.
 */
function setTransport(transport)
{
  if(document.getElementById(transport).checked)
  {
    document.getElementById('board_' + transport).style.display = 'none';
    document.getElementById('leave_' + transport).style.display = '';
  } else {
    document.getElementById('board_' + transport).style.display = '';
    document.getElementById('leave_' + transport).style.display = 'none';
  }
  setPlayerImage();
} // End of setTransport() function.



/* Desc: boardTransport() The player gains the indicated transport.
 * @param: transport -- string - id of the transport option.
 */
function boardTransport(transport)
{
  document.getElementById(transport).checked = true;
  setTransport(transport);
} // End of boardTransport() function.



/* Desc: leaveTransport() The player loses the indicated transport.
 */
function leaveTransport(transport)
{
  document.getElementById(transport).checked = false;
  setTransport(transport);
} // End of leaveTransport() function.



/* Desc: checkMapSize() Ensures the map size is 5x5 <=> 255x255.
 */
function checkMapSize() {
  var x = document.getElementById('input_mapwidth').value;
  if(x < 5) {
    document.getElementById('input_mapwidth').value = 5;
    alert('Sorry: Maps cannot be made smaller than 5x5.');
  }
  if(x > 99) {
    document.getElementById('input_mapwidth').value = 255;
    alert('Sorry: Maps cannot be made larger than 99x99.');
  }

  var y = document.getElementById('input_mapheight').value;
  if(y < 5) {
    document.getElementById('input_mapheight').value = 5;
    alert('Sorry: Maps cannot be made smaller than 5x5.');
  }
  if(y > 99) {
    document.getElementById('input_mapheight').value = 255;
    alert('Sorry: Maps cannot be made larger than 99x99.');
  }

  if((x*y) > 1000) {
    alert('Warning: Large maps can take a long time to generate and start.');
  }
} // End of checkMapSize() function.



/* Desc: showEndGameDialog() assumes the game has ended and lets the player
 *      submit their game result to the highscore database.
 */
function showEndGameDialog() {
  document.getElementById('overlay').style.display = 'block';
  document.getElementById('endgame_dialog').style.display = 'block';

  var numSupplies = parseInt(document.getElementById('info_Supplies').innerHTML);
  // The player has lost/starved if they are out of supplies.
  if(numSupplies <= 0) {
    document.getElementById('endmsg').innerHTML =
      'Your exploration party has starved after exploring for ' +
      document.getElementById('info_Days').innerHTML + ' days on ' +
      document.getElementById('info_Difficulty').innerHTML + ' difficulty...';
  }

  // The player has won if the entire map is explored.
  if(parseInt(document.getElementById('info_HexesExplored').innerHTML)
    == parseInt(document.getElementById('info_TotalHexes').innerHTML)) {
    document.getElementById('endmsg').innerHTML =
      'You explored the new lands on ' + document.getElementById('info_Difficulty').innerHTML +
      ' difficulty in ' + document.getElementById('info_Days').innerHTML +
      ' days with ' + document.getElementById('info_Supplies').innerHTML + ' days of supplies left!';
  }
} // End of showEndGameDialog() function.



/* Desc: hideEndGameDialog() hides the end game dialog.
 */
function hideEndGameDialog() {
  document.getElementById('overlay').style.display = 'none';
  document.getElementById('endgame_dialog').style.display = 'none';
} // End of hideEndGameDialog() function.



/* Desc: saveHighScore() attempts to save the player's score by sending the game result to highscore_XHR.php
 *      and returns a message about the success or failure of the attempted XHR operation.
 */
function saveHighScore() {
try {
  // Identify the final game values.
  var shortAxis = Math.min(map_numColumns, map_numRows);
  var longAxis = Math.max(map_numColumns, map_numRows);
  var numExplored = document.getElementById('info_HexesExplored').innerHTML;
  var days = document.getElementById('info_Days').innerHTML;
  var supplies = document.getElementById('info_Supplies').innerHTML;
  if(parseInt(supplies) == 'NaN') {supplies = -9;}
  var difficulty = document.getElementById('info_Difficulty').innerHTML;

  // Identify the user and ensure there is a playername to submit..
  var playerName = document.getElementById('input_playername').value;
  if((playerName == null) || (playerName == ''))
  {
    document.getElementById('input_playername').focus();
    alert('You forgot to enter a name.');
    return;
  }

  // Create the XML HTTP Request object.
  var xmlHttpReq = false;
  if (window.XMLHttpRequest)
  {   // XHR for IE7+, Firefox, Chrome, Safari, Opera.
    xmlHttpReq = new XMLHttpRequest();
    if(xmlHttpReq.overrideMimeType)
    {   // Set the MIME type for IE8+, Firefox, Chrome, Safari, Opera.
      xmlHttpReq.overrideMimeType('text/html');
    }
  } else if (window.ActiveXObject) { // XHR for IE6-
    try {
      xmlHttpReq = new ActiveXObject('Msxml2.XMLHTTP');
    } catch(e) {
      try {
        xmlHttpReq = new ActiveXObject('Microsoft.XMLHTTP');
      } catch(e) {}
    }
  }

  // Ensure that an XML Http Request object could be created.
  if (!xmlHttpReq) {
    alert('Score Save Failed: The browser failed to create an XML HTTP request.\n' +
      'This function requires Internet Explorer 5.5+, Firefox 2+, Chrome, Safari (Mac or PC) 2+, or Opera.');
    return;
  }

  // Assemble, send, and receive the XML request.
  var params = 'shortAxis='+shortAxis+
    '&longAxis='+longAxis+
    '&numExplored='+numExplored+
    '&days='+days+
    '&supplies='+supplies+
    '&difficulty='+difficulty+
    '&playerName='+playerName;
  var url = 'includes/ajax/highscore_XHR.php';
  //xmlHttpReq.open('GET', url+'?'+params, false);
  xmlHttpReq.open('POST', url, false);
  //Send the proper header information along with the request
  xmlHttpReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  //xmlHttpReq.setRequestHeader('Content-length', params.length);
  //xmlHttpReq.setRequestHeader('Connection', 'close');

  xmlHttpReq.onload = function () {
    var responseXML = this.responseXML;

    if (responseXML == null) {
      // Parse the HTTP request response text into an XML DOM object.
      var responseText = this.responseText;
      if(window.DOMParser) {   // Firefox, Chrome, Opera, Safari
        var parser = new DOMParser();
        responseXML = parser.parseFromString(responseText,'text/xml');
      } else { // Internet Explorer
        responseXML = new ActiveXObject('Microsoft.XMLDOM');
        responseXML.async='false';
        responseXML.loadXML(responseText);
      }
    }

    // Check if the response is empty.
    if(responseXML == null) {
      alert('Score Save Failed: The XML HHTP request returned empty.\n' +
        'You can try to submit your score again, but the server may be unresponsive.');
      return;
    }
    // Check if the response is failed.
    var errorNode = responseXML.getElementsByTagName('ERROR')[0];
    var parserErrorNode = responseXML.getElementsByTagName('parsererror')[0];
    if(errorNode != null || parserErrorNode != null) {
      alert('Score Save Failed: The server encountered an error while processing the request.\n' +
        'You can try to submit your score again, but the request may be malformed.');
      console.log(responseXML);
      return;
    }

    // Return the message from the XHR response.
    //alert (responseXML.getElementsByTagName('MESSAGE')[0].childNodes[0].nodeValue);
    alert('Score Saved Successfully');
  };


  xmlHttpReq.send(params);
} catch(e) {alert('{' + e.description + '}: ' + e.message);}
} // End of saveHighScore() function.