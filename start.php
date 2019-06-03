<?php
session_start();
$filename = '../private/games';
$game_id = $_SESSION['game_id'];
$data = file_get_contents($filename);
$data = unserialize($data);
$i = 0;
while ($data[$i])
{
	if ($data[$i]['game_id'] == $game_id) {
		$data[$i]['ok'] = "ok";
		$data = serialize($data);
		file_put_contents($filename, $data);
		break;
	}
	$i++;
}
?>