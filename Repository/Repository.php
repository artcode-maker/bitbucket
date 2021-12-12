<?php
define("JSONPATH", __DIR__."/database.json");
class Repository {
    public function GetUserForEdit(int $userId) {
        $contents = file_get_contents(JSONPATH);
        $contentsDecoded = json_decode($contents, true);
        foreach ($contentsDecoded as $key => $val) {
            if ($val['Id'] === $userId) {
                $user = new User($contentsDecoded[$key]['Id'],
                                $contentsDecoded[$key]['Name'], 
                                $contentsDecoded[$key]['Login'],
                                "",
                                $contentsDecoded[$key]['Email']);
                return $user;
            }
        }
        return null;
    }

    private function searchForUser($login, $password, $array) {
        foreach ($array as $val) {
            if ($val['Login'] === $login) {
                if(self::DecryptPassword($val['Password'], $password) && !$val['isDeleted']) {
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
        $newUser->Password = $this->EncryptPassword($newUser->Password);
        array_push($contentsDecoded, $newUser);
        $jsonData = json_encode($contentsDecoded);
        file_put_contents(JSONPATH, $jsonData);
    }

    function getUser(string $login, string $password) {
        $contents = file_get_contents(JSONPATH);
        $contentsDecoded = json_decode($contents, true);
        $foundUser = $this->searchForUser($login, $password, $contentsDecoded);
        return $foundUser;
    }

    function checkForLogin(string $login) {
        $contents = file_get_contents(JSONPATH);
        $contentsDecoded = json_decode($contents, true);
        foreach ($contentsDecoded as $val) {
            if ($val['Login'] === $login) {
                return true;
            }
        }
        return false;
    }

    function checkForEmail(string $email) {
        $contents = file_get_contents(JSONPATH);
        $contentsDecoded = json_decode($contents, true);
        foreach ($contentsDecoded as $val) {
            if ($val['Email'] === $email) {
                return true;
            }
        }
        return false;
    }
    

    function updateUser(int $userId, User $updatedUser): void {
        $contents = file_get_contents(JSONPATH);
        $contentsDecoded = json_decode($contents, true);
        foreach ($contentsDecoded as $key=>$val) {
            if ($val['Id'] === $userId) {
                $contentsDecoded[$key]['Login'] = $updatedUser->Login;
                $contentsDecoded[$key]['Password'] = self::EncryptPassword($updatedUser->Password);
                $contentsDecoded[$key]['Name'] = $updatedUser->Name;
                $contentsDecoded[$key]['Email'] = $updatedUser->Email;
            }
        }
        $jsonData = json_encode($contentsDecoded);
        file_put_contents(JSONPATH, $jsonData);
    }

    function deleteUser(int $userId): void {
        $contents = file_get_contents(JSONPATH);
        $contentsDecoded = json_decode($contents, true);
        foreach ($contentsDecoded as $key=>$val) {
            if ($val['Id'] === $userId) {
                $contentsDecoded[$key]['isDeleted'] = true;
            }
        }
        $jsonData = json_encode($contentsDecoded);
        file_put_contents(JSONPATH, $jsonData);
    }

    static private function EncryptPassword(string $Password): string {
        $options = [
            'salt' => "gg3434%@3",
            'cost' => 12,
        ];
        return password_hash($Password, PASSWORD_BCRYPT, $options);
    }

    static private function DecryptPassword(string $hash, string $password): bool {
        return password_verify($password, $hash);
    }
}
?>