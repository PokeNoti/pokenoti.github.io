    // get JSON func
    var getJSON = function(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = function() {
            var status = xhr.status;
            if (status === 200) {
                callback(null, xhr.response);
             } else {
                callback(status, xhr.response);
            }
        };
        xhr.send();
    };

    // URL of data_list
    //var json_data_url = "https://raw.githubusercontent.com/Co10/d3_files/master/po/pokemondata.json";
    var json_data_url = "/pokedata/pokemondata.json";
    var localdata;

    // apply data
    getJSON(json_data_url, function(err, data) {
        if (err !== null) {
            alert('Sorry, something went wrong: ' + err);
        } else {
            console.log("the data", data);
            localdata =  data;
            localdata.sort(function(a, b) { return new Date(b.updated).getTime() - new Date(a.updated).getTime();});
            printBtn();
        }
    })

    var dmain = document.getElementById("big_dom");

    changeWindowSize();
    window.addEventListener("resize", changeWindowSize);

    var isPC = true;
    var current_states = 0;

    function changeWindowSize() {
        var current_window_width = window.innerWidth,
        current_window_height = window.innerHeight;
        //var current_window_width = dmain.offsetWidth,
        //current_window_height = dmain.offsetHeight;

        var ua = window.navigator.userAgent,
        agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPod', 'iPad'];
        isPC = true;
        if (current_window_width <= current_window_height || current_window_width <= 300) {
            isPC = false;
        }
        else {
            for (var i = 0; i < agents.length; i++) {
                if (ua.indexOf(agents[i]) > 0) {
                    isPC = false;
                    break;
                }
            }
        }

        if (isPC) {
            dmain.style.width = "40%";
            current_states = 1;
            // get panel
            document.getElementById("panel").style.width = "60%";
            document.getElementById("clse").style.display = "none";
            document.getElementById("top_pane").style.display = "none";
            document.getElementById("top_pane2").style.visibility = "hidden";
            document.getElementById("top_name").style.visibility = "visible";
            document.getElementById("top_pro").style.visibility = "visible";
        }
        else {
            dmain.style.width = "100%";
            current_states = 2;
            document.getElementById("panel").style.width = "100%";
            document.getElementById("clse").style.display = "block";
            document.getElementById("top_pane").style.display = "block";
            document.getElementById("top_pane2").style.visibility = "visible";
            document.getElementById("top_name").style.visibility = "hidden";
            document.getElementById("top_pro").style.visibility = "hidden";
        }
    }

    function sortby() {
        var sort_seed0 = document.getElementById("radiot_0").checked;
        var sort_seed1 = document.getElementById("radiot_1").checked;
        var sort_seed2 = document.getElementById("radiot_2").checked;
        var sort_seed3 = document.getElementById("radiot_3").checked;
        
        var sortParent = document.getElementById("pm_list");
        var toSort = sortParent.children;
        toSort = Array.prototype.slice.call(toSort, 0);

        if (sort_seed0 == true) {
            localdata.sort(function(a, b) { return new Date(b.updated).getTime() - new Date(a.updated).getTime(); } );
        }
        else if (sort_seed1 == true) {
            localdata.sort(function(b, a) { return new Date(b.updated).getTime() - new Date(a.updated).getTime(); } );
        }
        else if (sort_seed2 == true) {
            localdata.sort(function(a, b) { return (+b.no) - (+a.no); } );
        }
        else {
            localdata.sort(function(b, a) { return (+b.no) - (+a.no); } );
        }

        sortParent.innerHTML = "";

        printBtn();
        searchList();
    }

    // print all the list
    function printBtn() {
        for (var i = 0; i < localdata.length; i++) {
            var myDiv = document.getElementById("pm_list");

            var typestring = localdata[i].type1;
            if (localdata[i].type2 != "") {
                typestring = localdata[i].type1 + "|" + localdata[i].type2;
            }

            var btn = document.createElement("button");
            var t = document.createTextNode(localdata[i].name + " (" + typestring + ")");
            var btn2 = document.createElement("div");
            var t2 = document.createTextNode(localdata[i].discount + "折");
            var btn_img = document.createElement("img");
            btn_img.src = "/img_small/" + localdata[i].img;
            btn_img.setAttribute("style", "width: 18px; height: 18px;");
            btn_img.setAttribute("class", "btnImg");
            btn2.setAttribute("class", "b_discount");
            btn.appendChild(btn_img);
            btn.appendChild(t);
            btn2.appendChild(t2);
            btn.name = "listsof";
            btn.dataset.type1 = localdata[i].type1;
            btn.dataset.type2 = localdata[i].type2;
            btn.dataset.ename = localdata[i].ename;
            btn.dataset.oname = localdata[i].oname;
            btn.dataset.discount = localdata[i].discount;
            btn.dataset.no = localdata[i].no;

            // open by right
            btn.addEventListener("click", openNav.bind(null, isPC, localdata[i]), false);

            btn.className = "btnsss";
            btn.appendChild(btn2);
            myDiv.appendChild(btn);
            //myDiv.appendChild(btn2);
        }
    }

    // filter list
    function searchList() {
        document.getElementById("typese").value = "0";
        // Declare variables
        var input, filter, the_List;
        input = document.getElementById("searchInput");
        filter = input.value;
        the_list = document.getElementsByName("listsof");

        //console.log(the_list, the_lists, input, filter);
        // Loop through all list items, and hide those who don't match the search query
        for (var i = 0; i < the_list.length; i++) {
            if (the_list[i].textContent.indexOf(filter) != -1 || filter == "" || 
                the_list[i].dataset.ename.indexOf(filter) != -1 ||
                the_list[i].dataset.oname.indexOf(filter) != -1 ||
                the_list[i].dataset.discount.indexOf(filter) != -1) {
                the_list[i].style.display = "";
            } else {
                the_list[i].style.display = "none";
            }
        }
    }

    function typeFilter() {
        document.getElementById("searchInput").value = "";
        var type_selected = +document.getElementById("typese").value;
        the_list = document.getElementsByName("listsof");
        var all_types = ["", "水", "火", "草", "岩石", "地上", "钢", "一般", "幽灵", "妖精", "恶", "超能", "格斗", "飞行", "毒", "虫", "龙", "电", "冰"];
        for (var i = 0; i < the_list.length; i++) {
            if (the_list[i].dataset.type1.indexOf(all_types[type_selected]) != -1 || 
                the_list[i].dataset.type2.indexOf(all_types[type_selected]) != -1 ||
                type_selected == 0) {
                the_list[i].style.display = "";
            } else {
                the_list[i].style.display = "none";
            }
        }
    
    }

    document.getElementById("panel").style.width = "0";