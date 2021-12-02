<?php
session_start();
if($_SERVER['REQUEST_METHOD'] === 'GET') {
    if($_SESSION['is_authorized']) {
        require_once __DIR__."/../Models/User.php";
        require_once __DIR__."/../Repository/Repository.php";
        $repository = new Repository();
        define("CURRENT_USER", $repository->GetUserForEdit($_SESSION['authorized_id']));
?>

<form action="<?=$_SERVER['SCRIPT_NAME']?>">
    <div class="row mb-3">
        <label for="inputLogin" class="col-sm-2 col-form-label">Login</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" name="inputLogin" value="<?php echo(CURRENT_USER->Login ?? ''); ?>" required>
        </div>
        <div class=""></div>
    </div>
    <div class="row mb-3">
        <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
        <div class="col-sm-10">
        <input type="password" class="form-control" name="inputPassword" value="<?php echo(CURRENT_USER->Password ?? ''); ?>" required>
        </div>
        <div class=""></div>
    </div>
    <div class="row mb-3">
        <label for="inputConfirmPassword" class="col-sm-2 col-form-label">Confirm Password</label>
        <div class="col-sm-10">
            <input type="password" class="form-control" name="inputConfirmPassword" value="<?php echo(CURRENT_USER->Password ?? ''); ?>" required>
        </div>
        <div class=""></div>
    </div>
    <div class="row mb-3">
        <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">
            <input type="email" class="form-control" name="inputEmail" value="<?php echo(CURRENT_USER->Email ?? ''); ?>" required>
        </div>
        <div class=""></div>
    </div>
    <div class="row mb-3">
        <label for="inputName" class="col-sm-2 col-form-label">Name</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" name="inputName" value="<?php echo(CURRENT_USER->Name ?? ''); ?>" required>
        </div>
        <div class=""></div>
    </div>
    <button type="submit" class="btn btn-primary">Edit it</button>
</form>

<?php }} else if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $json_decode = json_decode($json, true);
    require_once __DIR__."/../Models/User.php";
    require_once __DIR__."/../Repository/Repository.php";
    $repository = new Repository();
    $editedUser = new User(0 ,$json_decode['inputName'], $json_decode['inputLogin'], $json_decode['inputPassword'], $json_decode['inputEmail']);
    $repository->updateUser($_SESSION['authorized_id'], $editedUser);
    header('Content-type: text/html');
    if($_SESSION['is_authorized']) {
        echo json_encode(array("Status" => "<div class='status'>Account updating completed</div>", "auth" => "true", "name" => $editedUser->Name ));
    } else {
        echo json_encode(array("Status" => "<div class='status'>Account updating completed</div>", "auth" => "false" ));
    }
}
?>