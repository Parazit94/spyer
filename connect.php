<?php
session_start();
include 'functions/check_sesion.php';
include 'functions/last_change.php';
$filename = '../private/games';
function add_me($arr, $name, $l, $filename)
{
	$j = 0;
	while ($arr[$l][$j])
	{
		if ($arr[$l][$j] == $name)
			return ;
		$j++;
	}
	$arr[$l][$j] = $name;
	$arr = serialize($arr);
	file_put_contents($filename, $arr);
	check();
}
$game_id = $_GET['game_id'];
$name = $_SESSION['loggued_on_user'];
check_me($name);
if (!file_exists($filename))
{
	header("Refresh:2; url=main.html");
	echo "<h1>Нет игры с таким ID!</h1>".PHP_EOL;
	return ;
}
$data = file_get_contents($filename);
$data = unserialize($data);
$i = 0;
while ($data[$i])
{
	if ($data[$i]['game_id'] == $game_id)
	{
		add_me($data, $name, $i, $filename);
		header('Refresh: 0; url=lobbi.html?game_id='.$game_id);
		$_SESSION['game_id'] = $game_id;
		return ;
	}
	$i++;
}
header('Refresh: 2; url=main.html');
echo "<h1>Нет игры с таким ID".$game_id."!<h1>".PHP_EOL;
?>