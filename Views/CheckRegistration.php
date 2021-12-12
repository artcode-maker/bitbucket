<?php if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $json_decode = json_decode($json, true);
    require_once __DIR__."/../Models/User.php";
    require_once __DIR__."/../Repository/Repository.php";
    $repository = new Repository();
    $isLoginExist = $repository->checkForLogin($json_decode['inputLogin']);
    $isEmailExist = $repository->checkForEmail($json_decode['inputEmail']);
    if($isLoginExist) {
        header('Content-type: text/html');
        echo json_encode(array("loginExists" => "true" ));
        return;
    }
    if($isEmailExist) {
        header('Content-type: text/html');
        echo json_encode(array("emailExists" => "true" ));
        return;
    }
}
?>