<?php
require_once "../config/config.php";
session_start();

// if (isset($_SESSION["login"])) {
//     header("Location: ../index.php");
//     exit;
// }

$errors = [];

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $login = trim($_POST["login"] ?? "");
    $password = trim($_POST["password"] ?? "");

    if (empty($login)) {
        $errors["login"] = "Enter the login";
    } elseif (!filter_var($login, FILTER_VALIDATE_EMAIL)) {
        $errors["login"] = "Enter a correct email";
    }

    if (empty($password)) {
        $errors["password"] = "Enter the password";
    }

    if (empty($errors)) {
        $stmt = $dbconnection->prepare("SELECT * FROM users WHERE userlog = ?");
        $stmt->execute([$login]);

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && $password == $user["passlog"]) {
            $_SESSION["login"] = $login;

            header("Location: ../index.php");
            exit;
        } else {
            $errors["global"] = "Invalid email or password";
        }
    }
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

        <?php if (isset($errors["global"])): ?>
            <div class="error"><?= $errors["global"] ?></div>
        <?php endif; ?>

        <div class="card_e card_login">
            <label for="login">Login :</label>
            <input type="text" name="login" id="login" value="<?= htmlspecialchars($login ?? '') ?>">
            <?php if (isset($errors["login"])): ?>
                <div class="error"><?= $errors["login"] ?></div>
            <?php endif; ?>
        </div>

        <div class="card_e card_password">
            <label for="password">Password :</label>
            <input type="password" name="password" id="password" value="<?= htmlspecialchars($password ?? '') ?>">
            <?php if (isset($errors["password"])): ?>
                <div class="error"><?= $errors["password"] ?></div>
            <?php endif; ?>
            <a href="#" class="forget-password">Forget password?</a>
        </div>
        <button type="submit" class="btn">Log in</button>

        <div class="sign_up">
            <p>Don't have an account?</p>
            <span><a href="signup.php" class="btn">Sign Up</a></span>
        </div>
    </form>

    <!-- Forget password block  -->
    <div class="popup" id="recoverPopup">
        <div class="popup-content">
            <h3>Password Recovery</h3>
            <p>Enter your email to recover your password</p>

            <input type="email" placeholder="Enter your email" class="popup-input">

            <div class="popup-actions">
                <button class="btn">Send</button>
                <button class="btn close-btn" type="button">Cancel</button>
            </div>
        </div>
    </div>
    <script src="../assets/js/login.js"></script>
</body>

</html>