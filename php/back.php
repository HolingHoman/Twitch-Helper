<?php
$test = $_POST['url'];
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $test);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_HTTPHEADER, array("Client-ID: wv88gz31i9w3ihnkwyvnz2c51mqwla"));
$output = curl_exec($ch);
$output2 = curl_getinfo($ch);
$json = json_decode($output, true);
curl_close($ch);
echo $output;
//CURLOPT_POST, 1