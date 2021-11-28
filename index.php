<?php 
    session_start();
    // if($_SESSION['is_authorized']) {
    //     header('HTTP/1.1 301 Moved Permanently');
    //     header('Location: /');
    //     exit();
    // }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="./css/styles.css">
    <title>Interview</title>
</head>
<body>
    <div>
        <nav class="navbar navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">
                    <img src="./images/logo.jpg" alt="" width="30" height="24" class="d-inline-block align-text-top">
                    Logo
                </a>
                <form class="d-flex">
                    <?php if($_SESSION['is_authorized']) { ?>
                    <button class="btn btn-outline-success" name="logout" value="logout">Log out</button>
                    <?php } ?>
                    <?php if(!$_SESSION['is_authorized']) { ?>
                    <button class="btn btn-outline-success" name="signin" value="signin">Sign in</button>
                    <button class="btn btn-outline-primary" name="signup" value="signup">Sign up</button>
                    <?php } ?>
                </form>
            </div>
        </nav>
    </div>
    <div class="logo-center">
        <img class="logo-img" src="./images/logo.jpg" alt="logo">
    </div>
    <template id="tmplSpinner">
        <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </template>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <script src="./js/script.js"></script>
</body>
</html>