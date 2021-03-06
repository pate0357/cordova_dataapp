var peoplegift;
var option_id;
var displaygiftpage="";
var dropdownlist;
var model={

    modelwindow:function(people_gift)
    {
        model.giftinit(people_gift);
        
        
    },

 giftinit: function(people_gift)
    {
      peoplegift=people_gift;
        
         
    document.querySelector(".btnAdd3").addEventListener("click", model.giftAdd);
    document.querySelector(".btnAdd4").addEventListener("click", model.giftAdd);    

    document.getElementById("btnCancel3").addEventListener("click", model.giftcancel);
    document.getElementById("btnSave3").addEventListener("click", model.giftsave);
        
        if(displaygiftpage=="gifts-for-person")
        {
           model.showgiftidealist();
        }
      else
      {
           model.showgift_occasionlist();
      }
   
  },
  giftcancel: function(ev){
    document.querySelector("#add-gift").style.display="none";
    document.querySelector("[data-role=overlay]").style.display="none";
      
  },
  giftsave: function(){
    document.querySelector("#add-gift").style.display="none";
    document.querySelector("[data-role=overlay]").style.display="none";
    
      if(displaygiftpage=="gifts-for-person"){

      model.giftinsertlist();
          

      }
      else{

      model.occasion_giftinsetlist();
      
      }
      
  },
  giftAdd: function(ev){
    ev.stopPropagation();
    displaygiftpage=ev.target.getAttribute("displaypage");
    
    document.querySelector("#add-gift").style.display="block";
    document.querySelector("[data-role=overlay]").style.display="block";
    
      
    if(displaygiftpage=="gifts-for-person"){
        document.querySelector("#add-gift h3").innerHTML=  "Gifts  for  "+persongift.innerHTML;
            model.showdropdownList();

        
      }
      else{
      document.querySelector("#add-gift h3").innerHTML=  "Gifts  for  "+ occasionname.innerHTML;      
      model.gift_occasion_droplist();
       }
      


  },
    
    
                                           ///////////////////////////////
                                          //This is for people gift list//
                                          ////////////////////////////////
    
    
showdropdownList:function(){
     
    db.transaction(function(tx){
    tx.executeSql("SELECT * FROM occasions", [], 
    	function(tx, rs){
      	 var selectmenu=document.querySelector("#list-per-occ");
        selectmenu.innerHTML="";
        //success
      	//rs.rows.item(0).name would be the contents of the first row, name column
      	//rs.rows.length is the number of rows in the recordset
      	var numStuff = rs.rows.length;
      	for(var i=0; i<numStuff; i++){

            
            var occasion_name=rs.rows.item(i).occ_name;
            var occasion_id=rs.rows.item(i).occ_id;
            var dropdownlist=document.createElement("option");
                dropdownlist.setAttribute("id",+ occasion_id);
                dropdownlist.setAttribute("value",occasion_name);
                dropdownlist.innerHTML=occasion_name;
                selectmenu.appendChild(dropdownlist);
             
        }
        
          
      
    	}, 
      function(tx, err){
      	//error
      	console.log("transaction to list contents of stuff failed")
    });
  });
 
  },

    
  giftinsertlist:function()
  {
          var index = document.getElementById("list-per-occ").selectedIndex;
          option_id = document.getElementById("list-per-occ").options[index].id;
      
        db.transaction(function(tx){
        
        tx.executeSql('CREATE TABLE gifts (gift_id  INTEGER PRIMARY KEY AUTOINCREMENT,person_id INTEGER,occ_id INTEGER,gift_idea varchar,purchased boolean)', [], 
                                    function(tx, rs){
                                        //do something if it works
//                                        alert("Table stuff created");
                                    },
                                    function(tx, err){
                                        //failed to run query
//                                        alert( err.message);
                                    });              
        
       });
  
          
    var  peoplelist=document.getElementById("txt1").value;

       db.transaction(function(tx){
        tx.executeSql('INSERT INTO gifts(person_id,occ_id,gift_idea,purchased) VALUES("'+peoplegift+'","'+option_id+'","'+peoplelist+'","false")');
       });
          model.showgiftidealist();
          
      },
  
    showgiftidealist:function()
    {
        var list = document.querySelector(".gifts_person");
  list.innerHTML = "";


  
  db.transaction(function(tx){
    tx.executeSql("select g.purchased, g.gift_id, g.gift_idea,o.occ_name,g.purchased from gifts as g inner join occasions as o on o.occ_id=g.occ_id where g.person_id="+peoplegift , [], 
    	function(tx, rs){
      	//success
      	//rs.rows.item(0).name would be the contents of the first row, name column
      	//rs.rows.length is the number of rows in the recordset
        
      	var numStuff = rs.rows.length;

        for(var i=0; i<numStuff; i++){
          var li = document.createElement("li");

            var gift_idea=rs.rows.item(i).gift_idea;
            var occ_name=rs.rows.item(i).occ_name;
            var gift_id=rs.rows.item(i).gift_id;
            var purchased=rs.rows.item(i).purchased;
       
        li.setAttribute("purchased", purchased);
        var data_person=li.setAttribute("id",+gift_id);
            li.innerHTML =gift_idea+" - "+occ_name;
           var span=document.createElement("span");
            span.setAttribute("class","spanclass");
            if(purchased=="true"){
                span.innerHTML="purchased";
            }
            else{
            span.innerHTML="";
            }
            li.appendChild(span);
          list.appendChild(li);
            model.addgiftdeleteHammer(li);
            
        }

    	}, 
      function(tx, err){
      	//error
      	console.log("transaction to list contents of stuff failed")
    });
  }); 
    },
    
    addgiftdeleteHammer:function(element)
    {
          var mc = new Hammer.Manager(element);

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
             model.giftpurchesd(ev.target);           
     
            } else if (ev.type == "doubletap") {
                
                    model.giftdelete(ev.target.id);
               
            }
        }); 
        
    },
    
    giftdelete:function(gift_delete)
    {

         db.transaction(function(tx){

        tx.executeSql('DELETE FROM gifts WHERE gift_id= ?', [gift_delete]);
       });
        model.showgiftidealist();
    },
    giftpurchesd:function(gift_purchased)
    {
        var purchesed= gift_purchased.getAttribute("purchased");
        var get_id=gift_purchased.getAttribute("id");
        purchesed="true";
        db.transaction(function(tx){

        tx.executeSql( "UPDATE gifts SET purchased=? WHERE gift_id=?",[purchesed,get_id]);
       });
      model.showgiftidealist();  
    },
    
    
    
    
                        //////////////////////////////////
                       //This is for Occasion gift list///
                       ///////////////////////////////////    
    
    gift_occasion_droplist:function()
    {
         db.transaction(function(tx){
    tx.executeSql("SELECT * FROM people", [], 
    	function(tx, rs){
      	var selectmenu=document.querySelector("#list-per-occ");
        selectmenu.innerHTML="";
        //success
      	//rs.rows.item(0).name would be the contents of the first row, name column
      	//rs.rows.length is the number of rows in the recordset
      	var numStuff = rs.rows.length;
      	for(var i=0; i<numStuff; i++){

            
            var person_name=rs.rows.item(i).person_name;
            var person_id=rs.rows.item(i).person_id;
            var dropdownlist=document.createElement("option");
          
                dropdownlist.setAttribute("id",+ person_id);
                dropdownlist.setAttribute("value",person_name);
                dropdownlist.innerHTML=person_name;
            
             selectmenu.appendChild(dropdownlist);
             
        }
          var index = document.getElementById("list-per-occ").selectedIndex;
          option_id = document.getElementById("list-per-occ").options[index].id;
        
    	}, 
      function(tx, err){
      	//error
      	console.log("transaction to list contents of stuff failed")
    });
  });
        
        
    },
    occasion_giftinsetlist:function()
    {
        var index = document.getElementById("list-per-occ").selectedIndex;
        option_id = document.getElementById("list-per-occ").options[index].id;
        var  peoplelist=document.getElementById("txt1").value;

      
       db.transaction(function(tx){
        tx.executeSql('INSERT INTO gifts(person_id,occ_id,gift_idea,purchased) VALUES("'+option_id+'","'+peoplegift+'","'+peoplelist+'","false")');
       });
          model.showgift_occasionlist();
          
    },
        
    
    
    showgift_occasionlist:function()
    {
        var list = document.querySelector(".gifts_occasion");
  list.innerHTML = "";

//        WHERE gifts.person_id= "+peoplegift
  //clear out the list before displaying everything
  db.transaction(function(tx){
    tx.executeSql("SELECT g.purchased, g.gift_id, g.gift_idea,p.person_name,g.purchased FROM gifts AS g INNER JOIN people AS p ON p.person_id=g.person_id WHERE g.occ_id="+peoplegift , [], 
    	function(tx, rs){
      	//success
      	//rs.rows.item(0).name would be the contents of the first row, name column
      	//rs.rows.length is the number of rows in the recordset
        
      	var numStuff = rs.rows.length;

        for(var i=0; i<numStuff; i++){
          var li = document.createElement("li");
            var gift_idea=rs.rows.item(i).gift_idea;
            var person_name=rs.rows.item(i).person_name;
            var gift_id=rs.rows.item(i).gift_id;
            var purchased=rs.rows.item(i).purchased;
        var data_person=li.setAttribute("id",+gift_id);
            li.innerHTML =gift_idea+" : "+person_name;
          li.setAttribute("purchased", purchased);
             var span=document.createElement("span");
             span.setAttribute("class","spanclass");
            if(purchased=="true"){
                span.innerHTML="purchased";
            }
            else{
            span.innerHTML="";
            }
            li.appendChild(span);
          list.appendChild(li);
           model.addoccasiondeleteHammer(li);
        }

    	}, 
      function(tx, err){
      	//error
      	console.log("transaction to list contents of stuff failed")
    });
  }); 
    },
    addoccasiondeleteHammer: function (element) {
           var mc = new Hammer.Manager(element);

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
               model.giftOccasionpurchesd(ev.target);
                
            } else if (ev.type == "doubletap") {
                
                    model.deleteoccasion_giftpeople(ev.target.id);
            }
        }); 
    
    }, 
    
    deleteoccasion_giftpeople:function(occasion_gift)
    {

        db.transaction(function(tx){

        tx.executeSql('DELETE FROM gifts WHERE gift_id= ?', [occasion_gift]);
       });
        
       model.showgift_occasionlist(); 
    
    },
    giftOccasionpurchesd:function(occasiongift_purchased)
    {
        var purchesed= occasiongift_purchased.getAttribute("purchased");
        var get_id=occasiongift_purchased.getAttribute("id");
        purchesed="true";
        db.transaction(function(tx){

        tx.executeSql( "UPDATE gifts SET purchased=? WHERE gift_id=?",[purchesed,get_id]);
       });
      model.showgift_occasionlist();  
    },
 
        
    }

