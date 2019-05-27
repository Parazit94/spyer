<?php
session_start();
include 'functions/check_game_with_me.php';
include 'functions/check_sesion.php';
include 'functions/last_change.php';

$filename = '../private/games';
$my_name = $_SESSION['loggued_on_user'];
check_me($my_name);
if (($number = check_game_with_me($filename, $_SESSION['loggued_on_user'])) != 0)
{
	header("Refresh:2; url=lobbi.php?game_id=".$number);
	echo "<h1>Вы уже в игре с ID ".$number."!</h1>".PHP_EOL;
	return ;
}
if (!file_exists($filename))
	$newGame = rand(1000, 9999);
else {
	$data = file_get_contents($filename);
	$games = unserialize($data);
	$newGame = rand(1000, 9999);
}
$players = array('game_id'=>$newGame, $my_name);
$_SESSION['game_id'] = $newGame;
if (isset($games))
{
	$i = 0;
	while ($games[$i])
		$i++;
	$games[$i] = $players;
}
else
	$games = array($players);
print_r($games);
$games = serialize($games);
file_put_contents($filename, $games);
check();
?>