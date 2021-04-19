var pokem;

function openNav(isPC, poke) {
    clearDefault();
    changeWindowSize();
    if (isPC) {
        current_states = 1;
    }
    else {
        current_states = 2;
    }
    var append_top = document.getElementById("top_pane");
        append_top.innerHTML = poke.name;
    
        var append_top2 = document.getElementById("top_pane2");
        append_top2.innerHTML = poke.type1;
        if (poke.type2 != "") {
            append_top2.innerHTML = poke.type1 + " | " + poke.type2;
        }
    
    pokem = poke;

    appendData();
}

function closeNav() {
    current_states = 0;
    document.getElementById("panel").style.width = "0";
    document.getElementById("clse").style.display = "none";
    document.getElementById("top_pane2").innerText = "";
}

function clearDefault() {
    document.getElementById("top_pane2").innerText = "";
    document.getElementById("skin1").checked = false;
    document.getElementById("character1").value = "0";
    document.getElementById("text_field_choice41").style.display = "none";
    document.getElementById("skin_divider").style.display = "none";
    document.getElementById("spe").checked = false;
    document.getElementById("text_special_1").style.display = "none";
    document.getElementById("text_special_2").style.display = "none";
    document.getElementById("text_special_3").style.display = "none";
    document.getElementById("text_special_4").style.display = "none";
    document.getElementById("spe2").checked = false;
    document.getElementById("level1").checked = false;
    levelRange = [1,1,1,1,1,1];
    var range_vis = document.getElementsByClassName("rangeshow");
    var value_ = document.getElementsByClassName("range_value_level");
    for(var i = 0; i < range_vis.length; i++) {
        range_vis[i].style = "display: none;";
    }
    for (var i = 0; i < 5; i++) {
        value_[i].innerHTML = "+0";
    }
    
    for (var ii = 0; ii < 6; ii++) {
        document.getElementById(checkedString[ii]).checked =false;
    }
}

function goback_func() {
    if (current_states == 0 || current_states == 1) {
        window.location = "../";
    }
    if (current_states == 2) {
        closeNav();
    }
}

window.addEventListener("popstate", function() {
    goback_func();
});


// select and append svg
var svg = d3.select("#panel2").append("svg");
        
function setSVG() {
    svg = d3.select("#panel2").append("svg")
        .attr("width", "100%")
        .attr("height", "270px")
}

function divideString(ori_string) {
    separatedArray = []; 

    // index of end of the last string  
    let previousIndex = 0; 
    var i;
    for (i = 0; i < ori_string.length; i++) { 
        // check the character for a comma 
        if (ori_string[i] == ',' || ori_string[i] == ', ') { 
            // split the string from the last index to the comma 
            separated = ori_string.slice(previousIndex, i); 
            separatedArray.push(separated); 
            // update the index of the last string 
            previousIndex = i + 1; 
        } 
    } 

    // push the last string into the array 
    separatedArray.push(ori_string.slice(previousIndex, i));
    return separatedArray;
}

function appendData() {
    svg.remove();
    setSVG();
    updateData();
}

var two_check = [false, false, false, false, false, false];
var checkedString = ["radio-0", "radio-1", "radio-2", "radio-3", "radio-4", "radio-5"];

function updateData() {
    if (pokem.has_skin == true) {
        document.getElementById("text_field_choice41").style.display = "block";
        document.getElementById("skin_divider").style.display = "block";
    }

    if (pokem.special == true) {
        document.getElementById("text_special_1").style.display = "block";
        document.getElementById("text_special_2").style.display = "block";
        document.getElementById("text_spe").innerHTML = pokem.special_name;
        if (pokem.special2 == true) {
            document.getElementById("text_special_3").style.display = "block";
            document.getElementById("text_special_4").style.display = "block";
            document.getElementById("text_spe2").innerHTML = pokem.special_name2;
            if (document.getElementById("spe").checked == true
                && document.getElementById("spe2").checked == true) {
                document.getElementById("spe").checked = false;
                document.getElementById("spe2").checked = false;
            }
        }
    }

    var sw = window.innerWidth * 0.6;

    if (isPC == false) {
        sw = window.innerWidth;
    }

    if (isPC == true) {
        var append_top = document.getElementById("top_name");
        append_top.innerHTML = pokem.name;

        var append_top = document.getElementById("top_pro");
        append_top.innerHTML = pokem.type1;
        if (pokem.type2 != "") {
            append_top.innerHTML = pokem.type1 + " | " + pokem.type2;
        }
    }

    var img_source = "/img/" + pokem.img;
    var img_select = document.getElementById("the_pic");
    img_select.src = img_source;
    var imgw = Math.min(sw*0.9, 350);
    img_select.style = "max-width: " + imgw + "px;";

    // all variables used
    var nameTag = ["血量", "物攻", "物防", "特攻", "特防", "速度"];
    var tagVal = [+pokem.hp, +pokem.pa, +pokem.pd, +pokem.sa, +pokem.sd, +pokem.speed];
    
    var correction1 = [0,0,0,0,0,0];
    var correction2 = [0,0,0,0,0,0];
    var correction_c = [ [1,1,1,1,1,1], [1,1,1,0.9,1,1.1], [1,1.1,1,0.9,1,1], [1,0.9,1,1,1,1.1], [1,0.9,1,1.1,1,1], 
[1,1.1,1,1,1,0.9], [1,1,1,1.1,1,0.9], [1,1,1.1,0.9,1,1], [1,1,1,0.9,1.1,1], [1,0.9,1.1,1,1,1], 
[1,0.9,1,1,1.1,1], [1,1,1.1,1,1,0.9], [1,1,1,1,1.1,0.9], [1,1,0.9,1,1,1.1], [1,1,1,1,0.9,1.1], 
[1,1.1,0.9,1,1,1], [1,1.1,1,1,0.9,1], [1,1,0.9,1.1,1,1], [1,1,1,1.1,0.9,1], [1,1,0.9,1,1.1,1], [1,1,1.1,1,0.9,1] ]
    var correct_add = [1,1,1,1,1,1];
    var held_item = [ [1,1,1,1,1,1], [1,1.5,1,1,1,1], [1,1,1,1.5,1,1], [1,1,1,1,1,1.5], [1,1,1.08,1,1,1], [1,1,1.15,1,1,1], [1,1,1,1,1.15,1], 
[1,1,1.5,1,1,1], [1,1,1,1,1.5,1], [1.15,1,1,1,1,1], [1,1,1,1,1.1,1], [1,1.55,1,1,1,1], [1,1,1,1.55,1,1], [1,1,1,1,1,1.55] ];
    var held_item2 = [1014,1014,1014,1014,0];

    var bt_v = document.getElementById("radio-two").checked;
    var st_1 = document.getElementById("radio-four").checked;
    var st_2 = document.getElementById("radio-five").checked;
    var in_v = document.getElementById("intimacy1").checked;
    var co_v = document.getElementById("contract1").checked;
    var sk_v = document.getElementById("skin1").checked;
    var ad_v = document.getElementById("add1").checked;
    var character_selected = +document.getElementById("character1").value;
    var item_selected = + document.getElementById("item1").value;
    if (bt_v == true) { // enable 红1
        var newarray1 = divideString(pokem.bt1);
        for (var ii = 0; ii < 6; ii++) {
            correction1[ii] += (+newarray1[ii]);
        }
    }
    if (st_1 == true) { // enable 特1
        var newarray2 = divideString(pokem.st1);
        for (var ii = 0; ii < 6; ii++) {
            correction1[ii] += (+newarray2[ii]);
        }
    }
    if (st_2 == true) { // enable 特2
        var newarray3 = divideString(pokem.st2);
        for (var ii = 0; ii < 6; ii++) {
            correction1[ii] += (+newarray3[ii]);
        }
    }
    if (in_v == true) { // enable 亲密度
        var newarray4 = [255, 255, 255, 255, 255, 100];
        for (var ii = 0; ii < 6; ii++) {
            correction2[ii] += newarray4[ii];
        }
    }
    if (co_v == true) { // enable 契约
        for (var ii = 0; ii < 6; ii++) {
            correction2[ii] += 800;
        }
    }
    if (pokem.has_skin == true && sk_v == true) { // if skin available
        var newarray_skin = divideString(pokem.skin_value);
        for (var ii = 0; ii < 5; ii++) {
            correction2[ii] += (+newarray_skin[ii]);
        }
    }
    if (ad_v == true) { // enable 公会加成
        var temp_attack = 1 + sli_as_temp * 55 / 10000;
        var temp_defend = 1 + sli_ds_temp * 55 / 10000;
        correct_add[1] *= temp_attack;
        correct_add[3] *= temp_attack;
        correct_add[2] *= temp_defend;
        correct_add[4] *= temp_defend;
    }
    for (var ii = 0; ii < 6; ii++) { // enable 努力值
        two_check[ii] = document.getElementById(checkedString[ii]).checked;
        if (two_check[ii] == true) {
            correction2[ii] += 2028;
            if (item_selected - 21 == ii) {
                correction2[ii] += 1014;
            }
        }
    }
    if (pokem.special == true) {
        if (document.getElementById("spe").checked == true &&
            pokem.special_name == "一猩一意") {
                correct_add[1] *= 1.5;
        }
        if (document.getElementById("spe2").checked == true &&
            pokem.special_name2 == "一猩一意") {
                correct_add[1] *= 1.5;
        }
    }

    if (item_selected >= 0 && item_selected < 30) {
        var select_item_temp = item_selected;
        if (select_item_temp >= 21 && select_item_temp <= 25) {
            select_item_temp = 0;
        }
        for (var ii = 0; ii < 6; ii++) {
            var temp_tag_v = tagVal[ii];
            tagVal[ii] = Math.round((temp_tag_v + correction1[ii]) * correction_c[character_selected][ii]
                * held_item[select_item_temp][ii] * correct_add[ii] + correction2[ii]);
        }
    }
    var after_correction = [1,1,1,1,1,1];
    if (pokem.special == true) {
        var spec = document.getElementById("spe").checked;
        if (spec == true) {
            var temp_array_spe = divideString(pokem.special_value);
            for (var i = 0; i < 6; i++) {
                after_correction[i] *= temp_array_spe[i];
            }
        }
        if (pokem.special2 == true && document.getElementById("spe2").checked == true) {
            var temp_array_spe2 = divideString(pokem.special_value2);
            for (var i = 0; i < 6; i++) {
                after_correction[i] *= temp_array_spe2[i];
            }
        }
    }

    if (pokem.has_item == false) {
        var it0 = document.getElementById("the_item_0");
        var it1 = document.getElementById("the_item_1");
        it0.style = "display: none;";
        it1.style = "display: none;";
    }

    for (var i = 0; i < 6; i++) {
        var temp_tag_v = tagVal[i];
        tagVal[i] = Math.round(temp_tag_v * after_correction[i]);
    }

    if ((pokem.special_name == "性情大变&异常" && document.getElementById("spe").checked == true) ||
        (pokem.special_name2 == "性情大变&异常" && document.getElementById("spe2").checked == true)) {
        var tempswap = tagVal[3];
        tagVal[3] = tagVal[4];
        tagVal[4] = tempswap;
    }

    if ((pokem.special_name == "双攻互换" && document.getElementById("spe").checked == true) ||
        (pokem.special_name2 == "双攻互换" && document.getElementById("spe2").checked == true)) {
        var tempswap = tagVal[1];
        tagVal[1] = tagVal[3];
        tagVal[3] = tempswap;
    }

    for (var i = 1; i < 6; i++) {
        var temp_tag_v = tagVal[i];
        tagVal[i] = Math.round(temp_tag_v * levelRange[i]);
    }

    var lenMax = Math.ceil(Math.max(...tagVal) / 5000) * 5000;
    
    var yAxis = [80, 120, 160, 200, 240, 280];
    var yAxisUp = -40;
    //var fillColor = ["#A33645", "#DBE2A9", "#9C7934", "#6EB0CF", "#A173D0", "#E9BDD8"];
    var fillColor = ["#52b788", "#f9c74f", "#f3722c", "#00b4d8", "#0077b6", "#5e548e"];
    var roundedR = 8;
    svg.append('rect')
        .classed("back_container", true)
        .attr('x', 0)
        .attr('y', 10)
        .attr("rx", 10)
        .attr("ry", 10)
        .attr('width', '100%')
        .attr('height', 250)
        .attr('stroke', 'none')
        .attr('fill', '#ececec')
        .attr("style", "box-shadow: 5px 10px;");

    for (var i = 0; i < 6; i++) {
        svg.append('text')
            .attr('x', 5)
            .attr('y', yAxis[i]+yAxisUp)
            .style("font-size", 16)
            .text(nameTag[i]);

        svg.append('text')
            .attr('x', 50)
            .attr('y', yAxis[i]+yAxisUp)
            .style("font-size", 16)
            .text(tagVal[i]);

        svg.append('rect')
            .attr('x', 100)
            .attr('y', yAxis[i]-15+yAxisUp)
            .attr("rx", roundedR)
            .attr("ry", roundedR)
            .attr('width', sw*0.5)
            .attr('height', 15)
            .attr('stroke', 'black')
            .attr('fill', 'white');

        svg.append('rect')
            .attr('x', 100)
            .attr('y', yAxis[i]-15+yAxisUp)
            .attr("rx", roundedR)
            .attr("ry", roundedR)
            .attr('width', sw*0.5*tagVal[i]/lenMax)
            .attr('height', 15)
            .attr('stroke', 'none')
            .attr('fill', fillColor[i]);
    }
}

function onlyTwoChecked() {
    var checkedNum = 0;
    for (var iii = 0; iii < 6; iii++) {
        two_check[iii] = document.getElementById(checkedString[iii]).checked;
        if (two_check[iii] == true) {
            checkedNum++;
            if (checkedNum === 3) {
                checkedNum--;
                two_check[iii] == false;
                document.getElementById(checkedString[iii]).checked = false;
                appendData();
            }
        }
    }
}

var sli_as = document.getElementById("attackss");
var sli_as_temp = parseInt(sli_as.innerHTML, 10);
var sli_ds = document.getElementById("defendss");
var sli_ds_temp = parseInt(sli_ds.innerHTML, 10);

function sliderA1() {
    if (sli_as_temp > 0){
        sli_as_temp--;
    }
    sli_as.innerHTML = sli_as_temp + "%";
    // change in ()
    appendData();
}
function sliderA2() {
    if (sli_as_temp < 25){
        sli_as_temp++;
    }
    sli_as.innerHTML = sli_as_temp + "%";
    // change in ()
    appendData();
}
function sliderD1() {
    if (sli_ds_temp > 0){
        sli_ds_temp--;
    }
    sli_ds.innerHTML = sli_ds_temp + "%";
    // change in ()
    appendData();
}
function sliderD2() {
    if (sli_ds_temp < 25){
        sli_ds_temp++;
    }
    sli_ds.innerHTML = sli_ds_temp + "%";
    // change in ()
    appendData();
}

var levelRange;

function fa_down() {
    var fa_level_value = +document.getElementById("fa_span").innerHTML;
    fa_level_value--;
    if (fa_level_value < -6) {
        fa_level_value = -6;
    }
    document.getElementById("fa_span").innerHTML = "+" + fa_level_value;
    if (fa_level_value < 0) {
        document.getElementById("fa_span").innerHTML = fa_level_value;
    }
    rangeSlider();
}
function fa_up() {
    var fa_level_value = +document.getElementById("fa_span").innerHTML;
    fa_level_value++;
    if (fa_level_value > 6) {
        fa_level_value = 6;
    }
    document.getElementById("fa_span").innerHTML = "+" + fa_level_value;
    if (fa_level_value < 0) {
        document.getElementById("fa_span").innerHTML = fa_level_value;
    }
    rangeSlider();
}
function fd_down() {
    var fd_level_value = +document.getElementById("fd_span").innerHTML;
    fd_level_value--;
    if (fd_level_value < -6) {
        fd_level_value = -6;
    }
    document.getElementById("fd_span").innerHTML = "+" + fd_level_value;
    if (fd_level_value < 0) {
        document.getElementById("fd_span").innerHTML = fd_level_value;
    }
    rangeSlider();
}
function fd_up() {
    var fd_level_value = +document.getElementById("fd_span").innerHTML;
    fd_level_value++;
    if (fd_level_value > 6) {
        fd_level_value = 6;
    }
    document.getElementById("fd_span").innerHTML = "+" + fd_level_value;
    if (fd_level_value < 0) {
        document.getElementById("fd_span").innerHTML = fd_level_value;
    }
    rangeSlider();
}
function sa_down() {
    var sa_level_value = +document.getElementById("sa_span").innerHTML;
    sa_level_value--;
    if (sa_level_value < -6) {
        sa_level_value = -6;
    }
    document.getElementById("sa_span").innerHTML = "+" + sa_level_value;
    if (sa_level_value < 0) {
        document.getElementById("sa_span").innerHTML = sa_level_value;
    }
    rangeSlider();
}
function sa_up() {
    var sa_level_value = +document.getElementById("sa_span").innerHTML;
    sa_level_value++;
    if (sa_level_value > 6) {
        sa_level_value = 6;
    }
    document.getElementById("sa_span").innerHTML = "+" + sa_level_value;
    if (sa_level_value < 0) {
        document.getElementById("sa_span").innerHTML = sa_level_value;
    }
    rangeSlider();
}
function sd_down() {
    var sd_level_value = +document.getElementById("sd_span").innerHTML;
    sd_level_value--;
    if (sd_level_value < -6) {
        sd_level_value = -6;
    }
    document.getElementById("sd_span").innerHTML = "+" + sd_level_value;
    if (sd_level_value < 0) {
        document.getElementById("sd_span").innerHTML = sd_level_value;
    }
    rangeSlider();
}
function sd_up() {
    var sd_level_value = +document.getElementById("sd_span").innerHTML;
    sd_level_value++;
    if (sd_level_value > 6) {
        sd_level_value = 6;
    }
    document.getElementById("sd_span").innerHTML = "+" + sd_level_value;
    if (sd_level_value < 0) {
        document.getElementById("sd_span").innerHTML = sd_level_value;
    }
    rangeSlider();
}
function speed_down() {
    var speed_level_value = +document.getElementById("speed_span").innerHTML;
    speed_level_value--;
    if (speed_level_value < -6) {
        speed_level_value = -6;
    }
    document.getElementById("speed_span").innerHTML = "+" + speed_level_value;
    if (speed_level_value < 0) {
        document.getElementById("speed_span").innerHTML = speed_level_value;
    }
    rangeSlider();
}
function speed_up() {
    var speed_level_value = +document.getElementById("speed_span").innerHTML;
    speed_level_value++;
    if (speed_level_value > 6) {
        speed_level_value = 6;
    }
    document.getElementById("speed_span").innerHTML = "+" + speed_level_value;
    if (speed_level_value < 0) {
        document.getElementById("speed_span").innerHTML = speed_level_value;
    }
    rangeSlider();
}


function rangeSlider() {
    var range_vis = document.getElementsByClassName("rangeshow");
    var isRangeChecked = document.getElementById("level1").checked;
    levelRange = [1,1,1,1,1,1];
    //var range_ = document.getElementsByClassName("range-slider__range_level");
    var value_ = document.getElementsByClassName("range_value_level");

    if (isRangeChecked == false) {
        for(var i = 0; i < range_vis.length; i++) {
            range_vis[i].style = "display: none;";
        }
        for (var i = 0; i < 5; i++) {
            value_[i].innerHTML = "+0";
        }
    }
    else {
        for(var i = 0; i < range_vis.length; i++) {
            range_vis[i].style = "display: ;";
        }
        for (var i = 0; i < 5; i++) {
            var thevalue = +value_[i].innerHTML;
            if (thevalue >= 0) {
                levelRange[i+1] = (thevalue+3)/3;
            }
            else {
                levelRange[i+1] = 3/(3-thevalue);
            }
            
        }
    }

    appendData();
}

rangeSlider();
