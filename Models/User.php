<?php
class User {
    public int $Id;
    public string $Name;
    public string $Login;
    public string $Password;
    public string $Email;

    function __construct($Id = 0, $Name, $Login, $Password, $Email)
    {
        $this->Id = $Id;
        $this->Name = $Name;
        $this->Login = $Login;
        $this->Password = $Password;
        $this->Email = $Email;
    }
}
?>