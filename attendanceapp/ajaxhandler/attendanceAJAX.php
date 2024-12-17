<?php
$path=$_SERVER['DOCUMENT_ROOT'];
require_once $path."/attendanceapp/database/database.php";
require_once $path."/attendanceapp/database/sessionDetails.php";
require_once $path."/attendanceapp/database/facultyDetails.php";
if(isset($_REQUEST['action']))
{
    $action=$_REQUEST['action'];
    if($action=="getSession")
    {
        //fetch the session from DB
        //and retun to client
        $dbo=new Database();
        $sobj=new SessionDetails();
        $rv=$sobj->getSessions($dbo); 
        //getSessions
        //$rv=["2024/2025 FIRST SEMESTER","2024/2025 SECOND SEMESTER"];
        echo json_encode($rv);
    }
    //data:{facid:facid,sessionid:sessionid,action:"getFacultyCourses"},
    if($action=="getFacultyCourses")
    {
        //fetch the courses taken by fac in sess
        $facid=$_POST['facid'];
        $sessionid=$_POST['sessionid'];
        $dbo=new Database();
        $fo=new staff_details();
        $rv=$fo->getCoursesInASession($dbo,$sessionid,$facid);
        //$rv=[];
        echo json_encode($rv);
    }
    
}

?>