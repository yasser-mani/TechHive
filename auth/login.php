<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $login = $_POST["login"];
    $password = $_POST["pasword"];

    $_SESSION["login"] = $login;
    $_SESSION["pasword"] = $password;
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Log in</title>
    <link rel="stylesheet" href="../assets/css/main.css">
    <link rel="stylesheet" href="../assets/css/login.css">
</head>

<body>
    <form method="post" class="card">
        <div class="card_e card_login">
            <label for="login"> Login :</label>
            <input type="text" name="login">
        </div>
        <div class="card_e card_password">
            <label for="login"> Password :</label>
            <input type="password" name="pasword">
            <a href="#" class="forget-password">Forget password?</a>
        </div>

        <a href="../index.php"> <button type="submit" class="btn"> Log in </button> </a>
        <div class="sign_up">
            <p> Don't have an account ?</p> <span> <a href="signup.php"> <button type="button" class="btn"> Sign Up
                    </button> </a> </span>
        </div>
    </form>
</body>

</html>

<?php
// echo "<pre>";
// print_r($_SESSION);
// echo "</pre>";