<?php
require_once "../config/config.php";
session_start();

$errors = [];
$signup_errors = [];
$active_panel = "login";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $action = $_POST["action"] ?? "";

    if ($action === "login") {
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
                $_SESSION["username"] = $user["username"];
                header("Location: ../index.php");
                exit;
            } else {
                $errors["global"] = "Invalid email or password";
            }
        }
    } elseif ($action === "signup") {
        $active_panel = "signup";

        $new_login = trim($_POST["new_login"] ?? "");
        $new_password = trim($_POST["new_password"] ?? "");
        $username = trim($_POST["username"] ?? "");
        $confirm_password = trim($_POST["confirm_password"] ?? "");
        $datebirth = $_POST["datebirth"] ?? "";

        // Validation
        if (empty($new_login)) {
            $signup_errors["login"] = "Email is required";
        } elseif (!filter_var($new_login, FILTER_VALIDATE_EMAIL)) {
            $signup_errors["login"] = "Enter a valid email";
        }

        if (empty($new_password)) {
            $signup_errors["password"] = "Password is required";
        } elseif (strlen($new_password) < 6) {
            $signup_errors["password"] = "Password must be at least 6 characters";
        }

        if (empty($username)) {
            $signup_errors["username"] = "Username is required";
        } elseif (strlen($username) < 3) {
            $signup_errors["username"] = "Username must be at least 3 characters";
        }

        if (empty($confirm_password)) {
            $signup_errors["confirm_password"] = "Please confirm your password";
        } elseif ($new_password !== $confirm_password) {
            $signup_errors["confirm_password"] = "Passwords do not match";
        }

        if (empty($datebirth)) {
            $signup_errors["datebirth"] = "Date of birth is required";
        }

        if (empty($signup_errors)) {
            $check_stmt = $dbconnection->prepare("SELECT * FROM users WHERE userlog = ?");
            $check_stmt->execute([$new_login]);

            if ($check_stmt->fetch()) {
                $signup_errors["login"] = "Email already registered";
            } else {
                // Insert new user
                $stmt = $dbconnection->prepare("INSERT INTO users (userlog, passlog, username, datebirth) VALUES (?, ?, ?, ?)");
                $stmt->execute([$new_login, $new_password, $username, $datebirth]);

                // Auto login after signup
                $_SESSION["login"] = $new_login;
                $_SESSION["username"] = $username;
                header("Location: ../index.php");
                exit;
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page </title>
    <link rel="stylesheet" href="../assets/css/main.css">
    <link rel="stylesheet" href="../assets/css/login.css">
</head>

<body>
    <!-- Return to index  -->
    <a href="../index.php" class="return">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 8L2 12L6 16" />
            <path d="M2 12H22" />
        </svg>
        <span>Return</span>
    </a>

    <div class="container <?= $active_panel === 'signup' ? 'right-panel-active' : '' ?>" id="main-container">

        <!-- SIGN UP FORM -->
        <div class="form-container sign-up-container">
            <form method="post">
                <input type="hidden" name="action" value="signup">
                <!-- it's role is the define wich form is submited to the server by it's value because 
                    we have two form with post method
                   -->
                <h2>Create Account</h2>
                <div class="divider-line"></div>

                <div class="input-group">
                    <input type="text" name="username" placeholder="Username">
                    <?php if (isset($signup_errors["username"])): ?>
                        <div class="error"><?= $signup_errors["username"] ?></div>
                    <?php endif; ?>
                </div>

                <div class="input-group">
                    <input type="email" name="new_login" placeholder="Email Address"
                        value="<?= htmlspecialchars($new_login ?? '') ?>">
                    <?php if (isset($signup_errors["login"])): ?>
                        <div class="error"><?= $signup_errors["login"] ?></div>
                    <?php endif; ?>
                </div>

                <div class="input-group">
                    <input type="date" name="datebirth" placeholder="Date of Birth"
                        value="<?= htmlspecialchars($datebirth ?? '') ?>">
                    <?php if (isset($signup_errors["datebirth"])): ?>
                        <div class="error"><?= $signup_errors["datebirth"] ?></div>
                    <?php endif; ?>
                </div>

                <div class="input-group">
                    <input type="password" name="new_password" placeholder="Password">
                    <?php if (isset($signup_errors["password"])): ?>
                        <div class="error"><?= $signup_errors["password"] ?></div>
                    <?php endif; ?>
                </div>

                <div class="input-group">
                    <input type="password" name="confirm_password" placeholder="Confirm Password">
                    <?php if (isset($signup_errors["confirm_password"])): ?>
                        <div class="error"><?= $signup_errors["confirm_password"] ?></div>
                    <?php endif; ?>
                </div>

                <button type="submit" class="btn">Register</button>
            </form>
        </div>

        <!-- SIGN IN FORM -->
        <div class="form-container sign-in-container">
            <form method="post">
                <input type="hidden" name="action" value="login">
                <h2>System Login</h2>
                <div class="divider-line"></div>

                <?php if (isset($errors["global"])): ?>
                    <div class="error global-error"><?= $errors["global"] ?></div>
                <?php endif; ?>

                <div class="input-group">
                    <input type="text" name="login" placeholder="Email Address"
                        value="<?= htmlspecialchars($login ?? '') ?>">
                    <?php if (isset($errors["login"])): ?>
                        <div class="error"><?= $errors["login"] ?></div>
                    <?php endif; ?>
                </div>

                <div class="input-group">
                    <input type="password" name="password" placeholder="Password">
                    <?php if (isset($errors["password"])): ?>
                        <div class="error"><?= $errors["password"] ?></div>
                    <?php endif; ?>
                </div>

                <a href="#" class="forget-password" id="openRecover">Forgot your password?</a>
                <button type="submit" class="btn">Log in</button>
            </form>
        </div>

        <!-- OVERLAY -->
        <div class="overlay-container">
            <div class="overlay">
                <div class="overlay-panel overlay-left">
                    <h2>Welcome Back!</h2>
                    <p>Access your existing dashboard.</p>
                    <button class="btn overlay-btn" id="signInBtn">Log In</button>
                </div>
                <div class="overlay-panel overlay-right">
                    <h2>New Here?</h2>
                    <p>Join the network and initialize your profile.</p>
                    <button class="btn overlay-btn" id="signUpBtn">Sign Up</button>
                </div>
            </div>
        </div>
    </div>

    <!-- PASSWORD RECOVERY POPUP -->
    <div class="popup" id="recoverPopup">
        <div class="popup-content">
            <h3>Password Recovery</h3>
            <p>Enter your email to recover your protocol</p>
            <input type="email" placeholder="Email Address" class="popup-input">
            <div class="popup-actions">
                <button class="btn">Send</button>
                <button class="btn close-btn" type="button" id="closeRecover">Cancel</button>
            </div>
        </div>
    </div>

    <script src="../assets/js/login.js"></script>
</body>

</html>