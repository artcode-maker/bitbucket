<?php
session_start();
if($_SERVER['REQUEST_METHOD'] === 'GET') { 
?>


<form action="<?=$_SERVER['SCRIPT_NAME']?>">
    <div class="row mb-3">
        <label for="inputLogin" class="col-sm-2 col-form-label">Login</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" name="inputLogin" required>
        </div>
        <div class=""></div>
    </div>
    <div class="row mb-3">
        <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
        <div class="col-sm-10">
            <input type="password" class="form-control" name="inputPassword" required>
        </div>
        <div class=""></div>
    </div>
    <button type="submit" class="btn btn-primary">Sign in</button>
</form>


<?php } else if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $json_decode = json_decode($json, true);
    require_once __DIR__."/../Models/User.php";
    require_once __DIR__."/../Repository/Repository.php";
    $repository = new Repository();
    $foundUser = $repository->getUser($json_decode['inputLogin'], $json_decode['inputPassword']);
    header('Content-type: text/html');
    if($foundUser === null) {
        echo json_encode(array("Status" => "<div class='status'>Account wasn't found</div>", "auth" => $_SESSION['is_authorized'] ));
    } else {
        if(!isset($_SESSION['is_authorized']) | !$_SESSION['is_authorized']) {
            $_SESSION['is_authorized'] = true;
            $_SESSION['authorized_id'] = $foundUser['Id'];
            $_SESSION['user_name'] = $foundUser['Name'];
        }
        echo json_encode(array("Status" => "<div class='status'>Account was found</div>", "auth" => $_SESSION['is_authorized'], "name" => $_SESSION['user_name'] ));
    }
}
?>