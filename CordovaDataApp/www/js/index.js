//var peoplelist;
//var people_page;
var displaypage;
var db = openDatabase('mydb', '1.0', 'pate0357', 2 * 1024 * 1024);
var app = {
//    db:null,
//  version:'1.0',
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
        
//        app.checkDB();
//        var db = window.openDatabase("myDb", "1.0", "pate0357", 1024000);
//        db.transaction( app.doTrans, app.successFunc, app.errFunc);
		//connect to database
		//build the lists for the main pages based on data
		//add button and navigation listeners
        app.peopleinit();
        app.swipehammer();
    },
    
  peopleinit: function()
    {
    document.querySelector("#occasion-list").style.display = "none";
        document.querySelector("#gifts-for-person").style.display = "none";
        document.querySelector("#add-gift").style.display = "none";
         document.querySelector("#gifts-for-occasion").style.display = "none";
        
        document.querySelector("[data-role=modal]").style.display = "none";
        document.querySelector("[data-role=overlay]").style.display = "none";
        
    document.querySelector(".btnAdd").addEventListener("click", app.Add);
    document.querySelector(".btnAdd2").addEventListener("click", app.Add);    
    document.getElementById("btnCancel2").addEventListener("click", app.cancel);
    document.getElementById("btnSave2").addEventListener("click", app.save);
    app.peopleupdateList();   
    
        
    
    },
  cancel: function(ev){
    document.querySelector("[data-role=modal]").style.display="none";
    document.querySelector("[data-role=overlay]").style.display="none";
  },
  save: function(ev){
    document.querySelector("[data-role=modal]").style.display="none";
    document.querySelector("[data-role=overlay]").style.display="none";
//    ev.currentTarget.setAttribute("displaypage","peoplesave");
//    var people_page=ev.currentTarget.getAttribute("displaypage");
//      console.log(people_page);
       
//      app.showlist();
      console.log(displaypage);
      if(displaypage=="people")
      {
          app.peopleshowlist();
      }
      else
      {
          app.occasionshowlist();
      }
  },
  Add: function(ev){
    ev.stopPropagation();
     
//    console.log(people_page);
     displaypage=ev.target.getAttribute("displaypage");
      
      
    document.querySelector("[data-role=modal]").style.display="block";
    document.querySelector("[data-role=overlay]").style.display="block";
    
  },
    
    
    peopleshowlist:function()
  {
      db.transaction(function(tx){
        
        tx.executeSql('CREATE TABLE people(person_id INTEGER PRIMARY KEY AUTOINCREMENT, person_name varchar)', [], 
                                    function(tx, rs){
                                        //do something if it works
//                                        alert("Table stuff created");
                                    },
                                    function(tx, err){
                                        //failed to run query
//                                        alert( err.message);
                                    });              
        
       });
      var  peoplelist=document.getElementById("txt").value;
      console.log(peoplelist);
       db.transaction(function(tx){
        tx.executeSql('INSERT INTO people(person_name) VALUES("'+peoplelist+'")');
       });
          app.peopleupdateList();
      
//      else 
//      {
//            
//      
//      }
      
//      document.getElementById("txt").value="";
  },
    occasionshowlist:function()
    {
        db.transaction(function(tx){
        
        tx.executeSql('CREATE TABLE occasions(occ_id  INTEGER PRIMARY KEY AUTOINCREMENT, occ_name  varchar)', [], 
                                    function(tx, rs){
                                        //do something if it works
//                                        alert("Table stuff created");
                                    },
                                    function(tx, err){
                                        //failed to run query
//                                        alert( err.message);
                                    });              
        
       });
        var peoplelist=document.getElementById("txt").value;
      
      console.log(peoplelist);
       db.transaction(function(tx){
        tx.executeSql('INSERT INTO occasions(occ_name) VALUES("'+peoplelist+'")');
       });
       
       model1.occasionupdateList();
    },
 
  peopleupdateList:function(){
  var list = document.querySelector(".people");
  list.innerHTML = "";
  //clear out the list before displaying everything
  db.transaction(function(tx){
    tx.executeSql("SELECT * FROM people", [], 
    	function(tx, rs){
      	//success
      	//rs.rows.item(0).name would be the contents of the first row, name column
      	//rs.rows.length is the number of rows in the recordset
      	var numStuff = rs.rows.length;
      	for(var i=0; i<numStuff; i++){
          var li = document.createElement("li");
            var persone_name=rs.rows.item(i).person_id;
//            console.log(persone_name);
        var data_person=li.setAttribute("id",+persone_name );
          li.innerHTML = rs.rows.item(i).person_name;
          list.appendChild(li);
            app.addHammer(li);
        }
      console.log("displayed the current contents of the stuff table");
    	}, 
      function(tx, err){
      	//error
      	console.log("transaction to list contents of stuff failed")
    });
  });
//      peoplelist="";
},
    
 swipehammer:function()
    {
        var people_list = document.getElementById('people_list');
  document.querySelector("#occasion-list").style.display = "none";
// create a simple instance
// by default, it only adds horizontal recognizers
var mc = new Hammer(people_list);

// let the pan gesture support all directions.
// this will block the vertical scrolling on a touch-device while on the element
mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });

// listen to events...
mc.on("panleft", function(ev) {
       document.querySelector("#people_list").style.display = "none";
        document.querySelector("#occasion-list").style.display = "block";
    model1.Occasioninit();
    var occasion = document.getElementById('occasion-list');
    
    var mc1 = new Hammer(occasion);
    mc1.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    mc1.on("panright", function(ev) {
       document.querySelector("#people_list").style.display = "block";
        document.querySelector("#occasion-list").style.display = "none";
        
});

});
},
    
    
    addHammer: function (element) {
//        console.log(element);
        // Add Hammer double tap event
        var mc = new Hammer.Manager(element);
        document.querySelector("#gifts-for-person").style.display = "none";
        // Tap recognizer with minimal 2 taps
        mc.add(new Hammer.Tap({
            event: 'doubletap',
            taps: 2
        }));
        // Single tap recognizer
        mc.add(new Hammer.Tap({
            event: 'singletap'
        }));
        // we want to recognize this simulatenous, so a quadrupletap will be detected even while a tap has been recognized.
        mc.get('doubletap').recognizeWith('singletap');
        // we only want to trigger a tap, when we don't have detected a doubletap
        mc.get('singletap').requireFailure('doubletap');

        mc.on("singletap doubletap", function (ev) {

            if (ev.type == "singletap") {
                
//                alert("Hi");
            app.giftpage(ev.target.id);
                
                //                app.edit(contactList[ev.target.id]);

            } else if (ev.type == "doubletap") {
//                alert("Hi2");
//                app.newmap(ev.target);
                app.deletepeople(ev.target.id);
//                console.log(ev.target.id);
            }
        });
    },
    
    giftpage:function(people)
    {
        document.querySelector("#people_list").style.display = "none";
        document.querySelector("#gifts-for-person").style.display = "block";
        
        document.querySelector(".details_gift").innerHTML="Here is gift for"  + people;
//        var gift=document.getElementById("add-gift");
        model.modelwindow(people);
        
    },
 
    deletepeople:function(delete_people)
    {
//        console.log(delete_people);
      db.transaction(function(tx){
//          alert("hi");
        tx.executeSql('DELETE FROM people WHERE person_id= ?', [delete_people]);
       });
       app.peopleupdateList(); 
    
    }
}


app.init();