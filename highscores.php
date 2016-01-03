<?php
/***  -- File Details --
 * Original Creation Date: 2011-02-06
 * Date Last Edited or Altered: 2011-02-07
 * Author List [most recent active month]:
 *      Stephen T. Robbins [2011-02]
 * File Dependencies:               Location:
 *      newlands.css                includes/css/
 *      connectinfo.php             nope
 *      includes/lib/jquery/js/jquery-1.5.min.js
 *      includes/lib/jquery/js/jquery-ui-1.8.9.custom.min.js
 *      includes/lib/jquery/DataTables-1.7.5/media/js/jquery.dataTables.min.js
 * Function List:
 *      -none-
 */
/* File Description: This file is the page used to view high scores for the
 *      MooTools, JavaScript-based game "New Lands".
 *
 * File Activity Explanation: This will generate a simple web page table and
 *      fill it with high score records from the database. The table is powered
 *      by jQuery-UI DataTables.
 */
/* -- Known Issues, Suggested Updates/Improvements, and Notices --
 * -none-
 */


// Require necessary file dependencies.
require_once("../../../nope/connectinfo.php"); // _remote_x10

/* Get the high score data from the database. */
// Connect to the database.
$mysqli = new mysqli('localhost', $mydb_user, $mydb_password, $mydb_database_games);
if ($mysqli->connect_errno) {
  die("DB connection failed @ " . $mysqli->connect_errno . ": " . $mysqli->connect_error . "\n");
}

// Query the database for the high score records.
$query = "SELECT *
  FROM newlands_highscore
  ORDER BY (highscore_exploration_days / (highscore_map_shortaxis * highscore_map_longaxis)) ASC;";
$result = $mysqli->query($query);
if ($result === false) {
  echo("Highscore query failed @ " . $mysqli->connect_errno . ": " . $mysqli->connect_error . "\n");
}

// Disconnect from the database.
$mysqli->close();

/* Display the page. */
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <title>New Lands Exploration</title>
  <meta http-equiv="content-type" content="text/html;charset=ISO-8859-1" />
  <link href="includes/css/newlands.css" rel="stylesheet" />
  <script type="text/javascript" src="includes/lib/jquery/js/jquery-1.5.min.js"></script>
  <script type="text/javascript" src="includes/lib/jquery/js/jquery-ui-1.8.9.custom.min.js"></script>
  <script type="text/javascript" src="includes/lib/jquery/js/jquery-dataTables-1.7.5.min.js"></script>
</head>
<body>
  <table class="gui_main data_table" id="scores_table">
    <thead>
      <tr>
        <th colspan="7" style="text-align: left;">
          <a href="index.php">Play the game</a>
          <span style="float: right;"><a href="highscores.php">Refresh Scores</a></span>
        </th>
      </tr>
      <tr class="sortable_header_row">
        <th>Player</th>
        <th>Map<br/>Size</th>
        <th>Exp.<br/>Pct.</th>
        <th>Days<br/>Exp.</th>
        <th>Rem.<br/>Sup.</th>
        <th>Difficulty</th>
        <th>Timestamp</th>
      </tr>
    </thead>
    <tbody>
    <?php
    // Parse the returned $result resource and print high score records into the table.
    while($row = $result->fetch_array(MYSQLI_BOTH))
    {
      $playername = $row["highscore_playername"];
      $shortaxis = $row["highscore_map_shortaxis"];
      $longaxis = $row["highscore_map_longaxis"];
      $mapsize = $shortaxis * $longaxis;
      $explored = $row["highscore_explored_cells"];
      $explore_pct = $explored / $mapsize * 100;
      $days = $row["highscore_exploration_days"];
      $supplies = $row["highscore_supplies_remaining"];
      $difficultylevel = $row["highscore_difficultylevel"];
      $difficulty = "";
      switch($difficultylevel)
      {
        case 1: $difficulty = "easy"; break;
        case 2: $difficulty = "normal"; break;
        case 3: $difficulty = "hard"; break;
      }
      $time = $row["highscore_timestamp"];
echo <<<END
      <tr>
        <td style="text-align: left; white-space: nowrap; letter-spacing: 0.1em;">$playername</td>
        <td>$mapsize</td>
        <td>$explore_pct%</td>
        <td>$days</td>
        <td>$supplies</td>
        <td>($difficultylevel) $difficulty</td>
        <td>$time</td>
      </tr>
END;
    }
    ?>
    </tbody>
  </table>
  <script type="text/javascript">
    $(document).ready(function() {
      $('#scores_table').dataTable( {
      'bPaginate': true,
      'bFilter': false,
      'bSort': true,
      'bInfo': false } );
    } );
  </script>
</body>
</html>