//app.js

//var app= {
////	loadRequirements:0,
////	init: function(){
////		document.addEventListener("deviceready", app.onDeviceReady);
////		document.addEventListener("DOMContentLoaded", app.onDomReady);
////	},
////	onDeviceReady: function(){
////		app.loadRequirements++;
////		if(app.loadRequirements === 2){
////			app.start();
////		}
////	},
////	onDomReady: function(){
////		app.loadRequirements++;
////		if(app.loadRequirements === 2){
////			app.start();
////		}
////	},
////	start: function(){
////		//connect to database
////		//build the lists for the main pages based on data
////		//add button and navigation listeners
////        app.peopleinit();
////    },
//    peopleinit: function () {
//
//        document.querySelector(".btnAdd").addEventListener("click", app.peopleinit);
//        document.querySelector(".btnCancel").addEventListener("click", app.peopleCancle);
//        document.querySelector(".btnSave").addEventListener("click", app.peoplesave);
////        document.querySelector("[data-role=modal]").style.display = "none";
////        document.querySelector("[data-role=overlay]").style.display = "none";
//                
//    },
//    peopleCancle: function (ev) {
//        document.querySelector("[data-role=modal]").style.display = "none";
//        document.querySelector("[data-role=overlay]").style.display = "none";
//    },
//    peoplesave: function(ev){
//    document.querySelector("[data-role=modal]").style.display="none";
//    document.querySelector("[data-role=overlay]").style.display="none";
//  },
//    peopleedit: function () {
//
//        document.querySelector("[data-role=modal]").style.display = "block";
//        document.querySelector("[data-role=overlay]").style.display = "block";
//	}
//}
//document.addEventListener("DOMContentLoaded", app.peopleinit);
//



var app = {
    loadRequirements:0,
	init: function(){
//		document.addEventListener("deviceready", app.onDeviceReady);
		document.addEventListener("DOMContentLoaded", app.onDomReady);
	},
//	onDeviceReady: function(){
//		app.loadRequirements++;
//		if(app.loadRequirements === 2){
//			app.start();
//		}
//	},
	onDomReady: function(){
//		app.loadRequirements++;
//		if(app.loadRequirements === 2){
			app.start();
//		}
	},
	start: function(){
//        var db = window.openDatabase("myDb", "1.0", "pate0357", 1024000);
//        db.transaction( app.doTrans, app.successFunc, app.errFunc);
		//connect to database
		//build the lists for the main pages based on data
		//add button and navigation listeners
        app.peopleinit();
    },
    
  peopleinit: function()
    {
        
      document.querySelector("[data-role=modal]").style.display = "none";
        document.querySelector("[data-role=overlay]").style.display = "none";
    document.querySelector(".btnAdd").addEventListener("click", app.Add);
    document.getElementById("btnCancel").addEventListener("click", app.cancel);
    document.getElementById("btnSave").addEventListener("click", app.save);
  },
  cancel: function(ev){
    document.querySelector("[data-role=modal]").style.display="none";
    document.querySelector("[data-role=overlay]").style.display="none";
  },
  save: function(ev){
    document.querySelector("[data-role=modal]").style.display="none";
    document.querySelector("[data-role=overlay]").style.display="none";
    app.showlist();
  },
  Add: function(ev){
    ev.stopPropagation();
    
    document.querySelector("[data-role=modal]").style.display="block";
    document.querySelector("[data-role=overlay]").style.display="block";
    
  },
  showlist:function()
  {
      var peoplelist=document.getElementById("txt").value; 
      var li=document.createElement("li");
      li.setAttribute("id","li");
      li.innerHTML=peoplelist;
      document.querySelector("[data-role=listview]").appendChild(li);
      app.swipehammer();
//      trans.executeSql('INSERT INTO people(person_id, person_name) VALUES(1, "'+peoplelist+'")');
//      app.successFunc(peoplelist);
  },
    
 swipehammer:function()
    {
        var people_list = document.getElementById('people_list');

// create a simple instance
// by default, it only adds horizontal recognizers
var mc = new Hammer(people_list);

// let the pan gesture support all directions.
// this will block the vertical scrolling on a touch-device while on the element
mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

// listen to events...
mc.on("swiperight", function(ev) {
    alert("Hi");
//    people_list.textContent = ev.type +" gesture detected.";
});
        
    }
//  doTrans:function(trans)
//  {
//      trans.executeSql('CREATE TABLE IF NOT EXISTS people( person_id integer, person_name varchar)' );
////      trans.executeSql('CREATE TABLE IF NOT EXISTS people( person_id integer, person_name varchar)' );
////      trans.executeSql('CREATE TABLE IF NOT EXISTS people( person_id integer, person_name varchar)' );
//      
//// app.insertdata(trans);
//  },
//// inserrecord:function(tx)
////    {
////        var peoplelist=document.getElementById("txt").value; 
////        tx.executeSql('INSERT INTO people(person_id, person_name) VALUES(1, "'+ peoplelist +'")');
////        
////    },
//    successFunc:function()
//    {   
//        
//    },
//
//   errFunc:function()
//    {
//        
//    },
    
    
}


app.init();
