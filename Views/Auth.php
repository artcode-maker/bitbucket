<?php if($_SERVER['REQUEST_METHOD'] === 'GET') {
    if($_SESSION['is_authorized']) {
        header('HTTP/1.1 301 Moved Permanently');
        header('Location: /');
        exit();
    }
?>
<div class="form-center">
    <form action="<?=$_SERVER['SCRIPT_NAME']?>">
        <div class="row mb-3">
            <label for="inputLogin" class="col-sm-2 col-form-label">Login</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" name="inputLogin" required>
            </div>
        </div>
        <div class="row mb-3">
            <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
            <div class="col-sm-10">
            <input type="password" class="form-control" name="inputPassword" required>
            </div>
        </div>
        <button type="submit" class="btn btn-primary">Sign in</button>
    </form>
</div>

<?php } else if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $json_decode = json_decode($json, true);
    require_once "../Models/User.php";
    require_once "../Repository/Repository.php";
    $repository = new Repository();
    $foundUser = $repository->getUser($json_decode['inputLogin'], $json_decode['inputPassword']);
    header('Content-type: text/html');
    if($foundUser === null) {
        echo "Account wasn't found";
    } else {       
        if(!isset($_SESSION['is_authorized'])) {
            $_SESSION['is_authorized'] = true;
        }
        echo "Account was found";
    }
}
?>