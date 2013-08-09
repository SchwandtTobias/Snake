<?php
/*
 * db_score.php
 * Erstellung einer XML anhand der DB Daten
 * www.zebresel.de
 */

header("Content-Type:text/xml");

$db = mysqli_connect("127.0.0.1", "wa2313_7", "snakeit", "wa2313_db7", "3307");

if( isset($_GET['user']) && isset($_GET['mail']) )
{
	$username = $db->real_escape_string($_GET['user']);
	$usermail = $db->real_escape_string($_GET['mail']);
	$db->query("INSERT INTO score (username, usermail, time, points) VALUES ('". $username . "', '". $usermail . "', '". $_GET['time'] . "', '" . $_GET['points'] . "')");
}
else
{
	echo '<score>';
	$result = @$db->query("SELECT id, username, time, MAX(points) FROM score GROUP BY usermail ORDER BY 4 DESC, 3 ASC LIMIT 5");
	while($row = $result->fetch_row())
	{
		echo '<user>';
			echo '<id>' . $row[0] . '</id>';
			echo '<name>' . $row[1] . '</name>';
			echo '<time>' . $row[2] . '</time>';
			echo '<points>' . $row[3] . '</points>';
		echo '</user>';
	}
	$result->close();
	echo '</score>';
}

@$db->close();

?>