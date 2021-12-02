<?php
session_start();
if($_SESSION['is_authorized']) {
    require_once __DIR__."/../Repository/Repository.php";
    $repository = new Repository();
    $repository->deleteUser($_SESSION['authorized_id']);
    echo json_encode(array("delete" => "success"), JSON_FORCE_OBJECT);
    $_SESSION['is_authorized'] = false;
}
?>