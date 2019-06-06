<?php
session_start();
$id = $_GET['id'];
if ($_SESSION['num_vote'] == 0)
	return ;
$_SESSION['num_vote'] = 0;
$filename = 'vote/'.$_SESSION['game_id'].".csv";
if (file_exists($filename))
{
	$line = "";
	$mas = file($filename, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
	$num = $mas[$id];
	$arr = explode(';', $num);
	$arr[0]++;
	$mas[$id] = $arr[0].";".$arr[1];
	print_r($mas);
	foreach($mas as $value) {
		$line .= $value.PHP_EOL;
	}
	file_put_contents($filename, $line);
}
?>