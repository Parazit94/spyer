<?php
session_start();
$game_id = $_GET['game_id'];
$filename = '../private/games';
$data = file_get_contents($filename);
$data = unserialize($data);
$i = 0;
$arr = NULL;
while ($data[$i]) {
	if ($data[$i]['game_id'] == $game_id)
	{
		$arr = $data[$i];
		break ;
	}
	$i++;
}
if ($arr == NULL)
	echo "Ошибка!".PHP_EOL;
else {
	echo "<iframe src=\"lobbi.php?game_id=".$game_id."\" width=\"50%\" height=\"100px\"></iframe>";
	echo "<form method=\"POST\" action=\"exit.php\">
	<input type=\"hidden\" name=\"game_id\" value=\"".$game_id."\">
	<input type=\"submit\" name=\"submit\" value=\"Выход\"/></form>";
}
?>