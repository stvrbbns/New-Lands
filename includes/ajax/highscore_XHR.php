<?php
/***  -- File Details --
 * Original Creation Date: 2011-02-05
 * Date Last Edited or Altered: 2011-02-05
 * Author List [most recent active month]:
 *      Stephen T. Robbins [2011-02]
 * File Dependencies:               Location:
 *      connectinfo.php             nope
 * Function List:
 *      -none-
 */
/* File Description: This file is the XHR AJAX target for the MooTools,
 *      JavaScript-based game "New Lands" when submitting high score results to
 *      the database.
 *
 * File Activity Explanation: This will connect to the database, clean the POST
 *      data, insert the new result into the database, and return a success or
 *      failure notice.
 */
/* -- Known Issues, Suggested Updates/Improvements, and Notices --
 * Secure: This should do something to prevent people from randomly submitting high scores.
 * Improv: Only save a player's best score(s) in the database.
 */

/* MySQL highscore database table:
CREATE TABLE `newlands_highscore` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID of the high score',
`highscore_playername` varchar(32) NOT NULL COMMENT 'the player''s username',
`highscore_map_shortaxis` tinyint(3) unsigned NOT NULL COMMENT 'the shortest map axis, measured in cells',
`highscore_map_longaxis` tinyint(3) unsigned NOT NULL COMMENT 'the longest map axis, measured in cells',
`highscore_explored_cells` smallint(5) unsigned NOT NULL COMMENT 'the number of cells the player player explored',
`highscore_exploration_days` smallint(5) unsigned NOT NULL COMMENT 'the number of days the player spent exploring',
`highscore_supplies_remaining` tinyint(4) NOT NULL COMMENT 'the number of supplies the player had remaining',
`highscore_difficultylevel` tinyint(3) unsigned NOT NULL,
`highscore_timestamp` datetime NOT NULL COMMENT 'the timestamp when the high score was submitted',
PRIMARY KEY (`id`),
UNIQUE KEY `highscore_playername` (`highscore_playername`,`highscore_map_shortaxis`,`highscore_map_longaxis`,`highscore_difficultylevel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8
*/

//   http://localhost/games/newlands/includes/ajax/highscore_XHR.php?shortAxis=4&longAxis=4&numExplored=16&days=16&supplies=-9&difficulty=easy&playerName=someguy
//   http://logsine.com/games/newlands/includes/ajax/highscore_XHR.php?shortAxis=4&longAxis=4&numExplored=16&days=16&supplies=-9&difficulty=easy&playerName=someguy


// Specify my global variable for the MySQL date format.
$MY_DATE_MYSQL = "Y-m-d H:i:s";

// Require the necessary file dependencies.
require_once("../../../../../nope/connectinfo.php"); // _remote_x10


/** Generate the XML describing the indicated section. **/
// Set the header content type as text/xml.
header("Content-type: text/xml");

// Create an XMLWriter object and use that to ensure valid XML generation.
$xml = new XMLWriter();
$xml->openURI("php://output");

// Create the XML header.
$xml->startDocument("1.0", "ISO-8859-1", "yes");
// Open the root node.
$xml->startElement("SCORESAVE");

// Only save scores submitted by users with a session on this server.
/*if(!isset($_SESSION))
{
  // Return an error decribing the problem encountered.
  $xml->startElement("ERROR");
  $xml->text("No session was found.\n" .
      "This server can only serve clients it identifies as its own.");
  $xml->endElement();
  // End this XML document
  $xml->endDocument();
  $xml->flush();
  die();
}*/

// Ensure that all necessary variables were received.
if( (!isset($_POST["shortAxis"]) || empty($_POST["shortAxis"])) ||
  (!isset($_POST["longAxis"]) || empty($_POST["longAxis"])) ||
  (!isset($_POST["numExplored"]) || empty($_POST["numExplored"])) ||
  (!isset($_POST["days"]) || empty($_POST["days"])) ||
  (!isset($_POST["supplies"])) ||
  (!isset($_POST["difficulty"]) || empty($_POST["difficulty"])) ||
  (!isset($_POST["playerName"]) || empty($_POST["playerName"])) ) {
  // Identify the missing information.
  $missing = "";
  $missing .= ((!isset($_POST["shortAxis"]) || empty($_POST["shortAxis"])) ? "shortAxis" : "");
  $missing .= ((!isset($_POST["longAxis"]) || empty($_POST["longAxis"])) ? "longAxis" : "");
  $missing .= ((!isset($_POST["numExplored"]) || empty($_POST["numExplored"])) ? "numExplored" : "");
  $missing .= ((!isset($_POST["days"]) || empty($_POST["days"])) ? "days" : "");
  $missing .= ((!isset($_POST["supplies"])) ? "supplies" : "");
  $missing .= ((!isset($_POST["difficulty"]) || empty($_POST["difficulty"])) ? "difficulty" : "");
  $missing .= ((!isset($_POST["playerName"]) || empty($_POST["playerName"])) ? "playerName" : "");
  // Return an error decribing the problem encountered.
  $xml->startElement("ERROR");
  $xml->text("One or more necessary pieces of information is missing from the score save request.\n{".$missing."}");
  $xml->endElement();
  // End this XML document
  $xml->endDocument();
  $xml->flush();
  die();
}

// Connect to the database where high scores are saved.
$mysqli = new mysqli('localhost', $mydb_user, $mydb_password, $mydb_database_games);
if ($mysqli->connect_errno) {
  // Return an error decribing the problem encountered.
  $xml->startElement("ERROR");
  $xml->text("DB connection failed @ " . $mysqli->connect_errno . ": " . $mysqli->connect_error);
  $xml->endElement();
  // End this XML document
  $xml->endDocument();
  $xml->flush();
  die();
}

// Escape the parameters, just in case.
$shortAxis = (integer) $mysqli->real_escape_string($_POST["shortAxis"]);
$longAxis = (integer) $mysqli->real_escape_string($_POST["longAxis"]);
$numExplored = (integer) $mysqli->real_escape_string($_POST["numExplored"]);
$days = (integer) $mysqli->real_escape_string($_POST["days"]);
$supplies = (integer) $mysqli->real_escape_string($_POST["supplies"]);
$difficulty = $mysqli->real_escape_string($_POST["difficulty"]);
$playerName = $mysqli->real_escape_string(substr($_POST["playerName"],0,6));
// Identify the difficulty level as a number.
switch($_POST["difficulty"]) {
  case "easy":
    $difficulty = 1;
    break;
  case "normal":
    $difficulty = 2;
    break;
  case "hard":
    $difficulty = 3;
    break;
  default:
    $difficulty = 0;
    break;
}

// Make sure that only the player's best personal score for these game settings is saved.
$query = "SELECT highscore_explored_cells, highscore_exploration_days, highscore_supplies_remaining
  FROM newlands_highscore
  WHERE highscore_playername = '$playerName'
    AND highscore_map_shortaxis = $shortAxis
    AND highscore_map_longaxis = $longAxis
    AND highscore_difficultylevel = $difficulty;";
$result = $mysqli->query($query);
if ($result === false)
{
  // Return an error decribing the problem encountered.
  $xml->startElement("ERROR");
  $xml->text("Highscore save/insert failed @ selection @ " . $mysqli->connect_errno . ": " . $mysqli->connect_error);
  $xml->endElement();
  // End this XML document
  $xml->endDocument();
  $xml->flush();
  die();
}
$result_row = $result->fetch_array(MYSQLI_BOTH);
$old_numExplored = $result_row["highscore_explored_cells"];
$old_days = $result_row["highscore_exploration_days"];
$old_supplies = $result_row["highscore_supplies_remaining"];

$improved = false;
if(($numExplored > $old_numExplored) ||
   (($numExplored == $old_numExplored) && ($days < $old_days)) ||
   (($numExplored == $old_numExplored) && ($days == $old_days) && ($supplies > $old_supplies)) )
{
  $improved = true;
  // Attempt to INSERT the new high score record into the database.
  $query = "INSERT INTO newlands_highscore (
    highscore_playername,
    highscore_map_shortaxis,
    highscore_map_longaxis,
    highscore_explored_cells,
    highscore_exploration_days,
    highscore_supplies_remaining,
    highscore_difficultylevel,
    highscore_timestamp )
    VALUES (
    '$playerName',
    $shortAxis,
    $longAxis,
    $numExplored,
    $days,
    $supplies,
    $difficulty,
    NOW() )

  ON DUPLICATE KEY UPDATE

    highscore_playername = '$playerName',
    highscore_explored_cells = $numExplored,
    highscore_exploration_days = $days,
    highscore_supplies_remaining = $supplies,
    highscore_timestamp = NOW()
  ;";
  $result = $mysqli->query($query);
  if ($result === false) {
    // Return an error decribing the problem encountered.
    $xml->startElement("ERROR");
    $xml->text("Highscore save/insert failed @ insertion @ " . $mysqli->connect_errno . ": " . $mysqli->connect_error);
    $xml->endElement();
    // End this XML document
    $xml->endDocument();
    $xml->flush();
    die();
  }
}

// Otherwise, the new high score has been submitted, received, and saved successfully.
$xml->startElement("MESSAGE");
$xml->text("Score Saved Successfully");
$xml->endElement();
// Quantify the improvement, if any.
if ($improved == true && $old_numExplored > 0) {
  $xml->startElement("PREVIOUS_HEXES");
  $xml->text($old_numExplored);
  $xml->endElement();
  $xml->startElement("PREVIOUS_DAYS");
  $xml->text($old_days);
  $xml->endElement();
  $xml->startElement("PREVIOUS_SUPPLIES");
  $xml->text($old_supplies);
  $xml->endElement();
}

// Close the root node.
$xml->endElement();
// End this XML document
$xml->endDocument();
$xml->flush();
?>