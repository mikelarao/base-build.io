$(document).ready(function(){

// -------------- Main Menu Jquery

$(".navbar-nav li").each( function() {

  $(this).has("ul").append("<i class='fa fa-caret-down toggle-sub visible-sm visible-xs menu-caret'></i>").addClass("has-sub");

  $(this).has("ul").find(">a").append(" <i class='fa fa-angle-down hidden-sm hidden-xs menu-caret'></i>");

});
//
// $(window).on("resize", function () {
//
//   if ( $(window).width() >= 768 ){
//
//     $(".navbar-nav li:has(ul) .dropdown-menu").each( function() {
//
//         var subWidth = $(this).outerWidth();
//
//         $(this).css({ "margin-left" : - subWidth / 2 + "px", "left" : "50%", "display" : "none", "width" : subWidth });
//
//     });
//
//     $(".navbar-nav li:has(ul)").removeClass("open collapsible");
//
//   }
//
//   else {
//
//     $(".dropdown-menu").removeAttr( 'style' );
//
//   }
//
// }).resize();

$( ".navbar-nav .fa-caret-down" ).on( "click", function() {

  $(this).parent().find(".dropdown-menu").stop().slideToggle( "fast", function() {

    $(this).parent().toggleClass("open collapsible");

  });

});

// -------------- Placeholder Jquery

$('input, textarea').placeholder();

// -------------- Reject IE Jquery

$.reject({

  reject : {
      all: false,
      msie: 8
  },
  display: ['firefox','chrome','safari'],
  imagePath: 'assets/images/'

});

// -------------- New Jquery

});



function preloader(switch_val){
	if(switch_val == '1'){

		if ( $('body.modal-open').length < 1) {
			$('body').addClass('modal-open');
		}
		$('#pre_loader_block').show();
	}else{

		if ( $('.fade in').length <= 1) {
			$('body').removeClass('modal-open');
		}
		$('#pre_loader_block').hide();
	}
}



/*****************************
BOOKING WIDGET INTEGRATION
*****************************/
$('#booking_widget').validate({
	rules: {
		check_in_date: {
		  required	:	true
		},
		check_out_date: {
		  required	:	true
		}
	},
	messages: {
		check_in_date: {
		  required: ""
		},
		check_out_date: {
		  required: ""
		}
	},
	invalidHandler: function(event, validator) {
		// 'this' refers to the form
		var errors = validator.numberOfInvalids();
		if(errors){
			$(".alert-message").text("Please input check-in and check-out date.");
			$('#alert_message_modal').modal('show');
		}
	},
	submitHandler: function(form) {
		form.submit();
	}
});

var dateToday = new Date();
var dateTodayPlusNumOfMonthAdvBook = new Date(new Date(dateToday).setMonth(dateToday.getMonth()+24));

var check_in_date_val = $('#check_in_date').val();
	var d = new Date(check_in_date_val),
	check_in_month = '' + (d.getMonth()),
	check_in_day = '' + d.getDate(),
	check_in_year = d.getFullYear();

$('#check_in_date').datepicker({
	autoclose: true,
	format: 'M dd, yyyy',
	startDate: '+0d',
	/*
	startDate: '+0d',
	setDate: '+0d',
	*/
	endDate: dateTodayPlusNumOfMonthAdvBook,
	defaultViewDate: { year: check_in_year, month: check_in_month, day: check_in_day }

}).on('changeDate',function(event){

	var minDate = new Date(event.date.valueOf());

	var current_check_out_val = $('#check_out_date').val() == "" ? minDate : $('#check_out_date').val();
	var current_check_out_val = new Date(current_check_out_val);

	var newCheckOutDate = new Date(minDate.getTime() + 24 * 60 * 60 * 1000);

	$('#check_out_date').datepicker('setStartDate', newCheckOutDate);
	console.log(current_check_out_val+"<="+minDate);
	if(current_check_out_val <= minDate){
		$('#check_out_date').datepicker("update",newCheckOutDate);
	}else{
		$('#check_out_date').datepicker("update",current_check_out_val);
	}

	var arr_date = $('#check_in_date').val();
	var ad = new Date(arr_date);

	var dep_date = $('#check_out_date').val();
	var dd = new Date(dep_date);

	var timeDiff = Math.abs(ad.getTime() - dd.getTime());
	var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
	$('#number_of_nights').val(diffDays);


});

var check_out_date_val = $('#check_out_date').val();
var d = new Date(check_out_date_val),
check_out_month = '' + (d.getMonth()),
check_out_day = '' + d.getDate(),
check_out_year = d.getFullYear();

$('#check_out_date').datepicker({
	autoclose: true,
	format: 'M dd, yyyy',
	startDate: d,
	/*
	startDate: '+'+(1 + 1)+'d',
	setDate: '+1d',
	*/
	endDate: dateTodayPlusNumOfMonthAdvBook,
	defaultViewDate: { year: check_out_year, month: check_out_month, day: check_out_day }
}).on('changeDate', function (event) {

	var arr_date = $('#check_in_date').val();
	var ad = new Date(arr_date);

	var dep_date = $('#check_out_date').val();
	var dd = new Date(dep_date);

	var timeDiff = Math.abs(ad.getTime() - dd.getTime());
	var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
	$('#number_of_nights').val(diffDays);

});


$('#number_of_nights').change(function (){
	var arr_date = $('#check_in_date').val();

	var number_of_nights = $(this).val();
	var ad = new Date(arr_date);
	var dd = new Date();

	var newCheckOutDate = new Date(ad.getTime() + (24 * 60 * 60 * 1000 * number_of_nights));
	$('#check_out_date').datepicker("update",newCheckOutDate);
});

/*****************************
BOOKING WIDGET INTEGRATION
*****************************/


/*****************************
CONTACT US VALIDATION
*****************************/
$('#contact_form').validate({
  rules: {
	  name: {
		  required	:	true,
		  maxlength: 30
	  },
	  email_address: {
		  required	:	true,
		  email		:	true,
		  maxlength: 100
	  },
	  contact_number: {
		  required	:	true
	  },
	  subject: {
		  required	:	true
	  },
	  message: {
		  required	:	true,
		  maxlength: 255
	  }

  },
  messages: {
	  name: {
		  required: "Please enter your Full Name."
	  },
	  email_address: {
		  required: "Please enter your Email Address."
	  },
	  contact_number: {
		  required: "Please enter the Contact Number."
	  },
	  subject: {
		  required: "Please enter the Subject."
	  },
	  message: {
		  required: "Please enter your Message."
	  }

  },
  submitHandler: function(form) {

		var g_recaptcha_response = String($("#g-recaptcha-response").val());
		var secret_code = $("#secret_code").val();
		$.post(BASE_URL+"lib/ajax/check-captcha.php",{
			secret: secret_code,
			response: g_recaptcha_response
		}, function(result){

				if(result == "true"){
					var formData = new FormData(form);

					$.ajax({
						url: BASE_URL+"lib/ajax/send-email.php",
						type:"POST",
						data: formData,
						cache: false,
						contentType: false,
						processData: false,
						success: function(result) {

							switch(result){
								case "1":
									bootbox.alert({
										size: "small",
										message: "Inquiry successfully sent. Thank you!",
										callback: function(){
											location.href = BASE_URL+"contact";
										}
									});
								break;
								default:
									bootbox.alert({
										size: "small",
										message: "Something went wrong. Please try again later.",
										callback: function(){
											location.href = BASE_URL+"contact";
										}
									});
								break;

							}

							return false;

						},
						error: function() {
							return false;

						}
					});
				}else{

					alert("Captcha error. Please try again.");

				}

		});
	}

});
/*****************************
CONTACT US VALIDATION
*****************************/

preloader(0);
