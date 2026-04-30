<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "techhive";

try {
    $dbconnection = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
} catch (PDOException $e) {
    die("the error is : ". $e->getMessage());
}