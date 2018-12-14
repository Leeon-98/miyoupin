<?php
    $username = @$_POST["username"];
    $password = @$_POST["password"];
  
    if($username == "" || $password == ""){
        die("账号密码不能为空");
    }

    $con = mysql_connect("localhost","root","123456");
    if(!$con){
        die("数据库连接失败" . mysql_error());
    }
 
    mysql_select_db("user_list" , $con);
    if(mysql_error()){
        die("数据库选中失败".mysql_error());
    }
    // 如果用户名重复, 因为我们没有逻辑进行判断,所以同用户名的数据可以重复插入;
    // 辨别用户名是否存在; 如果存在 , 阻止写入数据库;

    $sql_select_all = "SELECT username FROM use_list WHERE username='$username'";

    // 查询结果;
    $select_res = mysql_query($sql_select_all);

    // die($select_res);
    // 遍历数据库资源方式;
    while($row = mysql_fetch_array($select_res)){
        // Array => json (字符串);
        // echo json_encode($row) . " <br>";
        // echo $row["username"];
        if($row["username"] == $username){
            die("用户名已经被注册过");
        }
    }

    $password = md5($password);
    $sql_insert_item = "INSERT INTO use_list (username , password) 
                        VALUES
                        ( '$username' , '$password');
                        ";
    $insert_res = mysql_query($sql_insert_item);
    if(!$insert_res){
        echo "数据库插入错误" . mysql_error();
    }
    //echo $insert_res;
    echo "注册成功";
    
    echo '<META HTTP-EQUIV="Refresh" CONTENT="0; URL=login.html">';
//	 echo "注册成功";
    
    
    mysql_close($con);
?>