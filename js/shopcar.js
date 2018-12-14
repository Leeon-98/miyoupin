function getMsg(){
    $.ajax("http://list.mogujie.com/search",{
        dataType:"jsonp"
    })
    .then(function(res){
        // console.log(res);
        renderPage(res.result.wall.list);
    })
}
var goodsJson = [];
function renderPage(json){
    goodsJson =json;
    var html = "";
    json.forEach(function(ele){
        html+=`
        <div class="container_item_box">
            <div class="container_item_img">
                <img src="${ele.show.img}" alt="">
            </div>
            <div class="good_title">
                <p>${ele.title}</p>
            </div>
            <div class="good_price">
                <span class="detail_price">
                    ${ele.price}
                </span>
                <span class="down_price">
                    直降
                </span>
            </div>
            <button class="btn_car" data_iid="${ele.iid}">加入购物车</button>
        </div>
        `
    });
    $(".container_goodsList").html(html);
    
}
getMsg();

$(".container_goodsList").on("click",".btn_car",handleCarClick);

function handleCarClick (event){
    var e = event || window.event;
    var target = e.target || e.srcElement;
    var iid = $(target).attr("data_iid");
    var nowMsg = findJson(iid)[0];
    // console.log(iid);
    addCar(nowMsg,iid);
}


function addCar(nowMsg,iid){
  $.extend(nowMsg , {count : 1});
  var snowMsg = JSON.stringify(nowMsg); 
//   console.log(snowMsg);
   
  if(!localStorage.cart){
      localStorage.setItem("cart",`[${snowMsg}]`);
      return false;
  }

  var amsg = JSON.parse(localStorage.cart);
//   console.log(amsg);
  
  if(!hasIid(amsg,iid)){
    amsg.push(nowMsg);
  }
  localStorage.setItem("cart",JSON.stringify(amsg));
  console.log(JSON.parse(localStorage.cart));
}




function hasIid(amsg,iid){
    for(var i = 0; i< amsg.length ; i++){
        if(amsg[i].iid === iid){
            amsg[i].count ++;
            return true;
        }
    }
    return false;
}

function findJson(iid){
    return goodsJson.filter(function(item){
        return item.iid === iid;
        
    })
    // console.log(goodsJson);
    
}
$(".m_car").on("mouseenter",function(){

    // console.log(1);
    $(".car_list").show();
    $(".car_list ul").html(renderCart());
})
$(".car_list").on("mouseleave",function(){
    $(".car_list").hide();
    // console.log(2)
})
function getCart(){
    if(!localStorage.cart) return 0;
    var amsg = JSON.parse(localStorage.cart);
    return amsg;
    // console.log(amsg);
}
function  renderCart(){
    var html = "";
    var cart_json = getCart();
    if(!cart_json) return 0 ;
    for (var i= 0; i<cart_json.length;i++){
        html+=`
        <li>
            <img src="${cart_json[i].show.img}" alt="">
            <span class="car_title">
            ${cart_json[i].title}
            </span>
            <span class="good_num" >${cart_json[i].count}</span>

        </li>
        `
    }
    return html;
    // console.log(html);
    

}
$("#clear").on("click",function(){
    localStorage.clear("cart");
})