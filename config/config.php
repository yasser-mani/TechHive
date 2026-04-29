<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "techhive";

try {
    $dbconnection = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    echo "connection good";
} catch (PDOException $e) {
    die("the error is : ". $e->getMessage());
}