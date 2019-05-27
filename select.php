<?php
session_start();
$game_id = $_SESSION['game_id'];
$filename = '../private/games';
if (file_exists($filename))
{
	$array = array();
	$mas = file_get_contents($filename);
	$mas = unserialize($mas);
	if ($mas) {
		$i = 0;
		while ($mas[$i])
		{
			if ($mas[$i]['game_id'] == $game_id)
			{
				$arr = $mas[$i];
				unset($arr['game_id']);
				break;
			}
			$i++;
		}
	}
	echo json_encode($arr);
}
?>