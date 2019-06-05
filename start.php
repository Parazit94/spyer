<?php
session_start();

function put_roles($data, $i, $game_id, $filename) {
	$j = $data[$i]['current'];
	$filename2 = $data[$i]['maps'][$j];
	// print($filename2);
	$j = $i;
	if (file_exists($filename2)) {
		$array = array();
		$mas = file($filename2, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
		if ($mas) {
			foreach($mas as $value) {
				$arr = explode(';', $value);
				$array[$arr[0]] = $arr[1];
			}
		}
	}
	$c_players = $data[$i]['players'];
	$i = 0;
	$arr = array();
	while ($i < $c_players) {
		array_push($arr, $i);
		$i++;
	}
	print_r($arr);
	$spyer = rand(0, ($c_players - 1));
	unset($arr[$spyer]);
	$role = array($spyer=>'Шпион');
	shuffle($arr);
	print_r($arr);
	$i = 0;
	while ($array[$i] && $i < ($c_players - 1)) {
		$role[$arr[$i]] = $array[$i];
		$i++;
	}
	while ($arr[$i]) {
		$role[$arr[$i]] = $array['others'];
		$i++;
	}
	$data[$j]['roles'] = $role;
	print_r($data);
	$data = serialize($data);
	file_put_contents($filename, $data);
}

$filename = '../private/games';
$game_id = $_SESSION['game_id'];
$data = file_get_contents($filename);
$data = unserialize($data);
$i = 0;
while ($data[$i])
{
	if ($data[$i]['game_id'] == $game_id) {
		$data[$i]['ok'] = "ok";
		put_roles($data, $i, $game_id, $filename);
		break;
	}
	$i++;
}
?>