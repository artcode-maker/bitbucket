<?php if($_SERVER['REQUEST_METHOD'] === 'GET') { ?>
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
        <div class="row mb-3">
            <label for="inputConfirmPassword" class="col-sm-2 col-form-label">Confirm Password</label>
            <div class="col-sm-10">
                <input type="password" class="form-control" name="inputConfirmPassword" required>
            </div>
        </div>
        <div class="row mb-3">
            <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
                <input type="email" class="form-control" name="inputEmail" required>
            </div>
        </div>
        <div class="row mb-3">
            <label for="inputName" class="col-sm-2 col-form-label">Name</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" name="inputName" required>
            </div>
        </div>
        <button type="submit" class="btn btn-primary">Sign up</button>
    </form>
</div>

<?php } else if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $json_decode = json_decode($json, true);
    require_once "../Models/User.php";
    require_once "../Repository/Repository.php";
    $repository = new Repository();
    $newUser = new User(0,$json_decode['inputName'], $json_decode['inputLogin'], $json_decode['inputPassword'], $json_decode['inputEmail']);
    $repository->createUser($newUser);
    header('Content-type: text/html');
    echo "Account creating completed";
}
?>