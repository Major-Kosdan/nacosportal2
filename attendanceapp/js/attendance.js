/*I will need this template many times ahead
$.ajax({
        url:"ajaxhandler/attendanceAJAX.php",
        type:"POST",
        dataType:"json",
        data:{},
        beforeSend:function(e)
        {

        },
        success:function(rv)
        {

        },
        error:function(e)
        {

        }
    });
*/

function getSessionHTML(rv)
{
    let x=``;
    x=`<option value=-1>SELECT ONE</option>`;
    let i=0;
    for(i=0;i<rv.length;i++)
    {
        let cs=rv[i];
        x=x+`<option value=${cs['id']}>${cs['year']+" "+cs['semester']}</option>`;
    }
    return x;
}

function loadSessions()
{
    //make an ajax call and load the session from DB
    $.ajax({
        url:"ajaxhandler/attendanceAJAX.php",
        type:"POST",
        dataType:"json",
        data:{action:"getSession"},
        beforeSend:function(e)
        {

        },
        success:function(rv)
        {
            //alert(JSON.stringify(rv));
            //lets create the HTML from rv dynamically
            let x=getSessionHTML(rv);
            $("#ddlclass").html(x);
        },
        error:function(e)
        {
            alert("OOPS!");
        }
    });
}
function fetchFacultyCourses(facid,sessionid)
{
    //get all the courses taken by the logged in faculty
    //for the selected session
    //from DB
    //by an ajax call  
    $.ajax({
        url:"ajaxhandler/attendanceAJAX.php",
        type:"POST",
        dataType:"json",
        data:{facid:facid,sessionid:sessionid,action:"getFacultyCourses"},
        beforeSend:function(e)
        {

        },
        success:function(rv)
        {
        //alert(JSON.stringify(rv));
        },
        error:function(e)
        {

        }
    });
}
//as soon as the page is done loading do the following
$(function(e)
{
    $(document).on("click","#btnLogout",function(ee)
    {
        $.ajax(
            {
                url:"ajaxhandler/logoutAjax.php",
                type:"POST",
                dataType:"json",
                data:{id:1},
                beforeSend:function(e){

                },
                success:function(e){
                    document.location.replace("login.php");
                },
                error:function(e){
                    alert("something went wrong!");
                    
                }

            }
        );
    });
    loadSessions();
    $(document).on("change","#ddlclass",function(e)
    {
        let si=$("#ddlclass").val();
        if(si!=-1)
        {
            //alert(si);
            let sessionid=si;
            let facid=$("#hiddenFacId").val();
            fetchFacultyCourses(facid,sessionid);
        }
    });
});