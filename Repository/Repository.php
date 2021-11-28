<?php
define("JSONPATH", "../Repository/database.json");
class Repository {
    private static function GetLastId(): int {
        $jsonData = file(JSONPATH);
        $data = json_encode($jsonData, JSON_UNESCAPED_UNICODE);
        $id = (int)array_values(json_decode($data, true));
        return $id;
    }

    private static function searchForUser($login, $password, $array) {
        foreach ($array as $val) {
            if ($val['Login'] === $login) {
                if($val['Password'] === $password) {
                    return $val;
                } else {
                    return null;
                }
            }
        }
        return null;
    }

    function createUser(User $newUser): void {
        $contents = file_get_contents(JSONPATH);
        $contentsDecoded = json_decode($contents, true);
        $lastUser = end($contentsDecoded);
        $newUser->Id = $lastUser['Id'] + 1;
        array_push($contentsDecoded, $newUser);
        $jsonData = json_encode($contentsDecoded);
        file_put_contents(JSONPATH, $jsonData);
    }

    function getUser(string $login, string $password) {
        $contents = file_get_contents(JSONPATH);
        $contentsDecoded = json_decode($contents, true);
        $foundUser = Repository::searchForUser($login, $password, $contentsDecoded);
        return $foundUser;
    }

    function updateUser(int $userId, User $updatedUser): void {
        $contents = file_get_contents(JSONPATH);
        $contentsDecoded = json_decode($contents, true);
        foreach ($contentsDecoded as $key=>$val) {
            if ($val['Id'] === $userId) {
                $contentsDecoded[$key]['Login'] = $updatedUser->Login;
                $contentsDecoded[$key]['Password'] = $updatedUser->Password;
                $contentsDecoded[$key]['Name'] = $updatedUser->Name;
                $contentsDecoded[$key]['Email'] = $updatedUser->Email;
            }
        }
        $jsonData = json_encode($contentsDecoded);
        file_put_contents(JSONPATH, $jsonData);
    }

    function deleteUser(int $id): void {}
}
?>