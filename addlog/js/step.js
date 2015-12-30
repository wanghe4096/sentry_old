    var curr_step = "step1";
    var curr_cate;
    $(document).ready(function(){
    $(".select-type-icon a").click(function(e){
        curr_cate = $(this).attr("cate");
        console.log(curr_cate);
        $('#addlog-steps > li').each(function(){
            var c = $(this).attr("cate");
            if(c === curr_cate) {
                $(".card-body .add-log").hide();
                $(this).parent().parent().show();
                $(this).show();
                console.log(this);
            }
            else {
                $(this).hide();
                console.log(this);
            }
        });
    })



  $("#backBtn").click(function () {
    var nextStep = (currentStep.substr(4) * 1 - 1);
    if (nextStep >= 1) {
      routie("step" + nextStep);
    }
      console.log(nextStep)
  });

  $("#nextBtn").click(function () {
    var nextStep = (currentStep.substr(4) * 1 + 1);
    if (nextStep <= $(".step").length) {
      routie("step" + nextStep);
    }
     console.log(nextStep)
  });
});


    function showStep(step) {
    curr_step = step;
    if (step == "step1") {
        // modify button
        $('li[cate="' + curr_cate + '"]').find('a[act="next"]').removeClass("disabled");
        $('li[cate="' + curr_cate + '"]').find('a[act="next"]').addClass("active");

        $('li[cate="' + curr_cate + '"]').find('a[act="back"]').removeClass("active");
        $('li[cate="' + curr_cate + '"]').find('a[act="back"]').addClass("disabled");

        // modify detail
        $('li[cate="' + curr_cate + '"]').find('div[part="step1"]').show();
        $('li[cate="' + curr_cate + '"]').find('div[part="step2"]').hide();

        // modify tag
        $('li[cate="' + curr_cate + '"]').find('li[part="step1"]').addClass("active");
        $('li[cate="' + curr_cate + '"]').find('li[part="step2"]').removeClass("active");
    } else {
        $('li[cate="' + curr_cate + '"]').find('a[act="next"]').removeClass("active");
        $('li[cate="' + curr_cate + '"]').find('a[act="next"]').addClass("disabled");

        $('li[cate="' + curr_cate + '"]').find('a[act="back"]').removeClass("disabled");
        $('li[cate="' + curr_cate + '"]').find('a[act="back"]').addClass("active");

        $('li[cate="' + curr_cate + '"]').find('div[part="step1"]').hide();
        $('li[cate="' + curr_cate + '"]').find('div[part="step2"]').show();

        // modify tag
        $('li[cate="' + curr_cate + '"]').find('li[part="step2"]').addClass("active");
        $('li[cate="' + curr_cate + '"]').find('li[part="step1"]').removeClass("active");
    }

}


