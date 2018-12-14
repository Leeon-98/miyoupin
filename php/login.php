<?php
    $username = @$_POST["username"];
    $password = @$_POST["password"];
  
    if($username == "" || $password == ""){
        die("账号密码不能不为空");
    }
    $con = mysql_connect("localhost","root","123456");
    if(!$con){
        die("数据库连接失败" . mysql_error());
    }
    mysql_select_db("user_list" , $con);
    if(mysql_error()){
        die("数据库选中失败".mysql_error());
    }
    $sql_select_all = "SELECT username,password FROM use_list WHERE username='$username'";
    $select_res = mysql_query($sql_select_all);
    $password = md5($password);
    while($row = mysql_fetch_array($select_res)){
        if($row["password"] == $password){
            echo '<META HTTP-EQUIV="Refresh" CONTENT="0; URL=index.html">';
//	 echo "注册成功";
    }else{
    	echo "账号或密码错误";
    } 
   
    }
   
    mysql_close($con);
?>