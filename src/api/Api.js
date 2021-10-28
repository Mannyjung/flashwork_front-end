const Api = (props) => {

    //let path = "http://localhost/flashwork_api/public/";
    let path = "https://flashworkbackend.xyz/flashwork_api/public/";
    
    switch (props) {
        // import api from '../../api/linkapi';
        // -------------------- Category -----------------------
        case 'addMainCate': return path + "maincate";
        case 'MainCate': return path + "maincate";
        case 'MainCateforedit': return path + "maincate/";
        case 'ShowMainCatebyID': return path + "maincate/";
        case 'editMainCate': return path + "maincate/";
        // case 'subcatebyid': return path + "subcatebyid";
        case 'subcatebyid': return path + "subcatebyid/";
        case 'showWorkbyMaincate': return path + "showWorkbyMaincate/";
        case 'subcate': return path + "subcate/";
        case 'Addsubcate': return path + "subcate";
        case 'showWorkbySubcate': return path + "showWorkbySubcate/";
        // -------------------- Work -----------------------
        case 'show_workCount': return path + "show_workCount";
        case 'managework': return path + "managework";
        case 'postwork': return path + "postwork";
        case 'show_work': return path + "show_work";
        case 'show_comment': return path + "show_comment/";
        case 'insertcomment': return path + "insertcomment";
        case 'getPackage': return path + "getPackage/";
        case 'freepost': return path + "freepost/";
        case 'deletePackage': return path + "deletePackage/";
        case 'addreview': return path + "addreview/";
        case 'search': return path + "search/";

        // -------------------- checkwork -----------------------
        case 'showpostwait': return path + "showpostwait";
        case 'showpostpass': return path + "showpostpass";
        case 'showpostnotpass': return path + "showpostnotpass";

        // -------------------- Manageuser -----------------------
        case 'Manageemployer': return path + "Manageemployer";
        case 'Managestudent': return path + "Managestudent";

        // -------------------- Profile -----------------------
        case 'getStudent': return path + "getStudent/";
        case 'getEmp': return path + "getEmp/";
        case 'editimgfree': return path + "editimgfree/";
        case 'editimgemp': return path + "editimgemp/";
        case 'changePassEmp': return path + "changePassEmp/";
        case 'changePass': return path + "changePass/";
        case 'forgetpassword': return path + "forgetpassword";

        // -------------------- REGISTER -----------------------
        case 'Verifyregiste': return path + "Verifyregiste";
        case 'VerifyregisteS': return path + "Verifyregiste/";
        case 'employerregistre': return path + "employerregistre";
        case 'studentregistre': return path + "studentregistre";
        case 'selectmajor': return path + "selectmajor";
        case 'resetpassword': return path + "resetpassword";
        // -------------------- REPOST -----------------------
        case 'report': return path + "report";
        case 'readreport': return path + "readreport";
        
        case 'upreport': return path + "report/";
        // -------------------- SelectPost -----------------------
        case 'PIC': return path + "PIC/";
        case 'detailpost': return path + "detailpost/";
        case 'reviewpost': return path + "reviewpost/";
        case 'editpost': return path + "editpost/";
        case 'editcateg': return path + "editcateg/";
        case 'newpackage': return path + "newpackage";
        case 'getPackagebyId': return path + "getPackagebyId/";
        case 'editpackage': return path + "editpackage/";
        case 'mypost': return path + "mypost/";
        case 'mypostForProflie': return path + "mypostForProflie/";
        case 'deletePhotos': return path + "deletePhotos/";
        case 'addphotos': return path + "addphotos";
         // -------------------- Status -----------------------
        case 'Checkpostbyid': return path + "Checkpostbyid/";
        case 'managestatus': return path + "managestatus/";
        
        //-----------------------สlogin
        case 'login_user': return path + "login_user";

        // -------------------- massage -----------------------
        case 'notificationsmessage': return path + "notificationsmessage/";
        case 'showlistmessage': return path + "showlistmessage/";
        case 'readmessage': return path + "readmessage/";

        // -------------------- employmentEmp -----------------------
      
        case 'employmentEpyReq': return path + "employmentEpyReq/";
        case 'employmentEpyProgress': return path + "employmentEpyProgress/";
        case 'employmentEpySuc': return path + "employmentEpySuc/";
        case 'employmentEpySucAndReview': return path + "employmentEpySucAndReview/";
        case 'deleteEmployment' : return path + "deleteemploymentReq/"
        // -------------------- employmentFree -----------------------
        case 'employmentFlReq': return path + "employmentFlReq/";
        case 'employmentAccept': return path + "employmentAccept/";
        case 'employmentFlProgress': return path + "employmentFlProgress/";
        case 'employmentFlSuc': return path + "employmentFlSuc/";
        case 'employmentFlSucAndR': return path + "employmentFlSucAndR/";
        // -------------------- history -----------------------
        case 'getHistoryEmp': return path + "getHistoryEmp/";
        case 'getHistory': return path + "getHistory/";
        
        // -------------------- selectpost -----------------------
        case 'employment': return path + "employment";
        case 'message': return path + "message";
        

        //---------------------chat---------------------
        case 'showallusermessage': return path + "showallusermessage/";
        case 'showalluserandstatusmessage': return path + "showalluserandstatusmessage/";



        default: return "";
    }
}


export default Api;