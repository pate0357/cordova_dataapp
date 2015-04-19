//var peoplelist;
//var people_page;
var displaypage;
var db = openDatabase('mydb', '1.0', 'pate0357', 2 * 1024 * 1024);
var persongift;
var app = {
//    db:null,
//  version:'1.0',
    loadRequirements:0,
	init: function(){
	document.addEventListener("deviceready", app.onDeviceReady);
		document.addEventListener("DOMContentLoaded", app.onDomReady);
        
	},
	onDeviceReady: function(){
		app.loadRequirements++;
		if(app.loadRequirements === 2){
			app.start();
		}
	},
	onDomReady: function(){
		app.loadRequirements++;
//		if(app.loadRequirements === 2){
			app.start();
//		}
	},
	start: function(){
        
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

       
//      app.showlist();
//      console.log(displaypage);
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
     

     displaypage=ev.target.getAttribute("displaypage");
      
      
    document.querySelector("[data-role=modal]").style.display="block";
    document.querySelector("[data-role=overlay]").style.display="block";
    
  },
    
    
    peopleshowlist:function()
  {
      db.transaction(function(tx){
        
        tx.executeSql('CREATE TABLE people(person_id INTEGER PRIMARY KEY AUTOINCREMENT, person_name varchar)', [], 
                                    function(tx, rs){
                                    },
                                    function(tx, err){
                                    });              
        
       });
      var  peoplelist=document.getElementById("txt").value;
//      console.log(peoplelist);
       db.transaction(function(tx){
        tx.executeSql('INSERT INTO people(person_name) VALUES("'+peoplelist+'")');
       });
          app.peopleupdateList();
      
  },
    occasionshowlist:function()
    {
        db.transaction(function(tx){
        
        tx.executeSql('CREATE TABLE occasions(occ_id  INTEGER PRIMARY KEY AUTOINCREMENT, occ_name  varchar)', [], 
                                    function(tx, rs){
                                    },
                                    function(tx, err){
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

    	}, 
      function(tx, err){
      	//error
//      	console.log("transaction to list contents of stuff failed")
    });
  });

},
    
 swipehammer:function()
    {
        var people_list = document.getElementById('people_list');
        var occasion = document.getElementById('occasion-list');
        document.querySelector("#occasion-list").style.display = "none";
        
        Hammer(people_list).on("swipeleft", function () {
			
            document.querySelector("#people_list").style.display = "none";
            document.querySelector("#occasion-list").style.display = "block";
            model1.Occasioninit();
            

			$(people_list).animate({
				left: "-100%"
			}, 200);
			$(occasion).animate({
				left: "0"
			}, 200);
		});

        Hammer(occasion).on("swiperight", function () {
        
        document.querySelector("#people_list").style.display = "block";
        document.querySelector("#occasion-list").style.display = "none";
			$(people_list).animate({
				left: "0"
			}, 200);
			$(occasion).animate({
				left: "100%"
			}, 200);
		});


},
    
    
    addHammer: function (element) {

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
                persongift=ev.target;

            app.giftpage(ev.target.id);
                


            } else if (ev.type == "doubletap") {
                app.deletepeople(ev.target.id);

            }
        });
    },
    
    giftpage:function(people)
    {
        document.querySelector("#people_list").style.display = "none";
        document.querySelector("#gifts-for-person").style.display = "block";
        
        document.querySelector(".headinggift").innerHTML="Here is gift for  "+ persongift.innerHTML;

        model.modelwindow(people);
        
        model.showgiftidealist();
    },
 
    deletepeople:function(delete_people)
    {

      db.transaction(function(tx){

        tx.executeSql('DELETE FROM people WHERE person_id= ?', [delete_people]);
       });
       app.peopleupdateList(); 
    
    },
backbuttonpeopel:function()
    {
              
        document.querySelector("#gifts-for-person").style.display="none";    
        document.querySelector("#people_list").style.display="block";
        
    
    },
    backbuttonoccasion:function()
    {
        document.querySelector("#occasion-list").style.display="none";    
        document.querySelector("#people_list").style.display="block";
        
    }
   
}
app.init();








		