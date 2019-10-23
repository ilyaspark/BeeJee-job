$('#task-add-form').submit(function(e){


    if(!$('#input1').val() || !$('#input2').val() || !$('#input2').val()) {
        $('.alert-danger').fadeIn();
        $('.alert-danger').html('Поля не заполнены корректно.');
        hideAlert();
    } else {
    

    $.ajax({
        type: "POST",
        url: "/controllers/Actions.php",
        data: $(this).serialize(),
        success: function(msg){

            $('.alert-success').fadeIn();
            $('.alert-success').html('Задача успешно добавлена.');
            $('.add-group').fadeOut();

            hideAlert();

            loadTasks();
          
        },
        error:  function(msg){
            $('.alert-danger').fadeIn();
            $('.alert-danger').html('Ошибка.');

            hideAlert();
        }
     });

    }

     

    e.preventDefault();

});


$('#admin-login-form').submit(function(e){

    if(!$('#login').val() || !$('#password').val()) {

        $('.alert-danger').fadeIn();
        $('.alert-danger').html('Поля не заполнены корректно.');
        hideAlert();

    } else {

        $.ajax({
            type: "POST",
            url: "/controllers/AdminLogin.php",
            data: $(this).serialize(),
            success: function(msg){

                localStorage.setItem("admin", msg);
    
                $('.alert-success').fadeIn();
                $('.alert-success').html('Вход выполнен.');
                $('.add-group').fadeOut();
    
                hideAlert();
    
                loadTasks();
                
                $('#admin-login-form').hide();
                $('.admin-login-message').fadeIn();
              
            },
            error:  function(msg){
                $('.alert-danger').fadeIn();
                $('.alert-danger').html('Ошибка.');
    
                hideAlert();
            }
         });

    }

    e.preventDefault();

});





function hideAlert(){
    setTimeout(function(){
        $('.alert').fadeOut();
    }, 3000);
}

function loadTasks(){

    $('#tasks-table').html('<table class="table" id="tasks-table"> <thead> <tr> <th scope="col">#</th> <th scope="col">Пользователь</th> <th scope="col">Email</th> <th scope="col">Текст задачи</th> <th scope="col">Статус</th> </tr> </thead> <tbody> </tbody> </table>');

    $('#tasks-table').DataTable({searching: false, "destroy": true, info: false, "pageLength": 3, "bLengthChange": false});

    $('#tasks-table tbody').html('');
    $('.loading-gif').show();


    $.ajax({
        type: "POST",
        url: "/controllers/GetData.php",
        data: $(this).serialize(),
        success: function(msg){

            data = JSON.parse(msg);

            if(!data) {
                $('.loading-gif').hide();
                $('.no-items').fadeIn();
            }

            lefafw = data.length;

            

            $(data).each(function() {  
                
                console.log(this);
                var ID = this.id;
                var USERNAME = this.username;
                var EMAIL = this.email;


                var TEXT = '<span><textarea class="txtt" disabled>'+this.text+'</textarea></span> <button type="button" class="btn btn-info edit-text" data='+ID+'>✎</button>';

                var EDITED = this.edited;
                if(EDITED == 1) {
                    var TEXT = TEXT+' <br/> <small>отредактировано администратором</small>';
                }


                if(this.status == 1) {
                    var STATUS = 'В работе <button type="button" class="btn btn-success mark-succeed" data='+ID+'>✓</button>';
                } else {
                    var STATUS = 'Выполнено <br/> <small>отредактировано администратором</small>';
                }


                $('#tasks-table').DataTable().row.add([
                    ID, USERNAME, EMAIL, TEXT, STATUS
                  ]).draw();
            });

            $('.loading-gif').hide();
       
            
        },
        error:  function(msg){
            $('.alert-danger').fadeIn();
            $('.alert-danger').html('Ошибка.');

            hideAlert();
        }
     });

}


$(document).on("click", '.mark-succeed', function(event) { 
    element = $(this);
    data = $(this).attr('data');
    gettoken = localStorage.getItem('admin');

    if(!gettoken) {
        return;
    }


    $.ajax({
        type: "POST",
        url: "/controllers/EditTask.php",
        data: {'token': gettoken, 'id': data},
        success: function(msg){
            $(element).parent().html('Выполнено');
        }
    });


});



$(document).on("click", '.edit-text', function(event) { 
    element = $(this);
    data = $(this).attr('data');
    gettoken = localStorage.getItem('admin');

    if(!gettoken) {
        return;
    }

    textt = $(this).parent().find('span').text();

    $(this).parent().html('<div class="form-group-edit"><textarea class="form-control" id="exampleFormControlTextarea1" rows="3">'+textt+'</textarea> <button type="button" class="btn btn-outline-primary update-text" oldtext='+textt+' data='+data+'>Сохранить</button> </div>');


});


$(document).on("click", '.update-text', function(event) { 

    text = $(this).parent().find('textarea').val();

    oldtext = $(this).attr('oldtext');
    id = $(this).attr('data');

    element = $(this);


    if(text == oldtext) {
        $(this).parent().replaceWith(oldtext);
        return;
    }

    gettoken = localStorage.getItem('admin');

    if(!gettoken) {
        return;
    }

    $.ajax({
        type: "POST",
        url: "/controllers/EditTaskText.php",
        data: {'token': gettoken, 'id': data, 'text': text},
        success: function(msg){
            $(element).parent().replaceWith(text+'<br/> <small>отредактировано администратором</small>');
        }
    });

});




$(document).ready(function(){
    loadTasks();
});


$('.add-task-link').click(function(){
    $('.add-group').fadeIn();
    $('.all-group').fadeIn();
    $('.admin-login').fadeOut();
});


$('.admin-login-link').click(function(){
    $('.admin-login').fadeIn();

    $('.add-group').fadeOut();
    $('.all-tasks').fadeOut();
});


$('.home-link').click(function(){
    $('.admin-login').fadeOut();

    $('.add-group').fadeOut();
    $('.all-tasks').fadeIn();
});



// ADMIN


function checkAdmin() {

    var gettoken = localStorage.getItem('admin');

    if(!gettoken) {
        return;
    }

    $.ajax({
        type: "POST",
        url: "/controllers/CheckAdmin.php",
        data: {token: gettoken},
        success: function(msg){

            $('.admin-login-link a').html('Вы авторизированы как администратор');

            $('#admin-login-form').hide();
            $('.admin-login-message').fadeIn();

            $('.mark-succeed').show();
            $('.edit-text').show();
          
        },
        error:  function(msg){

            localStorage.removeItem('admin');

            $('.admin-login-link a').html('Вход для администратора');
            $('.alert-danger').fadeIn();
            $('.alert-danger').html('Ошибка. Произведите авторизацию заново.');

            $('#admin-login-form').show();
            $('.admin-login-message').hide();

            $('.mark-succeed').hide();
            $('.edit-text').hide();

            hideAlert();

            
        }
     });

}


$('.admin-logout').click(function(){
    localStorage.removeItem('admin');
    $('.alert-danger').fadeIn();
    $('.alert-danger').html('Вы успешно вышли.');

    $('#admin-login-form').show();
    $('.admin-login-message').hide();

    hideAlert();


});


$(document).ready(function(){
    checkAdmin();
    setInterval(function(){
        checkAdmin();

    },2000);
});