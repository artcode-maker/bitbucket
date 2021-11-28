<?php
session_start();
if($_SESSION['is_authorized']) {
    echo json_encode(array("auth" => "success"), JSON_FORCE_OBJECT);
    $_SESSION['is_authorized'] = false;
}
?>