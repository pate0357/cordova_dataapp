var peoplegift;
var option_id;
var displaygiftpage;
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
//        alert("Hi for window");
    document.getElementById("btnCancel3").addEventListener("click", model.giftcancel);
    document.getElementById("btnSave3").addEventListener("click", model.giftsave);
        
        if(displaygiftpage=="gifts-for-person"){
            console.log(displaygiftpage);
      model.showgiftidealist();   
//      model.giftinsertlist();
        alert("person");  
      }
      else{
      model.showgift_occasionlist();
      alert("occasion"); 
      }
   
  },
  giftcancel: function(ev){
    document.querySelector("#add-gift").style.display="none";
//      document.querySelector("[data-role=modal]").style.display="none";
    document.querySelector("[data-role=overlay]").style.display="none";
      
  },
  giftsave: function(){
    document.querySelector("#add-gift").style.display="none";
//      document.querySelector("[data-role=modal]").style.display="none";
    document.querySelector("[data-role=overlay]").style.display="none";
    
      if(displaygiftpage=="gifts-for-person"){
      model.showdropdownList();      
      model.giftinsertlist();
        alert("person");  
      }
      else{
      model.gift_occasion_droplist();
      model.occasion_giftinsetlist();
          alert("occasion"); 
      }
      
  },
  giftAdd: function(ev){
    ev.stopPropagation();
     displaygiftpage=ev.target.getAttribute("displaypage");
      console.log(displaygiftpage);
    document.querySelector("#add-gift").style.display="block";
//    document.querySelector("[data-role=modal]").style.display="block";
    document.querySelector("[data-role=overlay]").style.display="block";
      document.querySelector("#add-gift h3").innerHTML=  "Gifts  for"  +peoplegift.innerHTML;
    if(displaygiftpage=="gifts-for-person"){
      model.showdropdownList();      
//      model.giftinsertlist();
        alert("person");  
      }
      else{
      model.gift_occasion_droplist();
      alert("occasion"); 
      }
      

//      model.showdropdownList();
  },
    
  showdropdownList:function(){
//  var list = document.querySelector(".occasion");
//  list.innerHTML = "";
  //clear out the list before displaying everything
  db.transaction(function(tx){
    tx.executeSql("SELECT * FROM occasions", [], 
    	function(tx, rs){
      	//success
      	//rs.rows.item(0).name would be the contents of the first row, name column
      	//rs.rows.length is the number of rows in the recordset
      	var numStuff = rs.rows.length;
      	for(var i=0; i<numStuff; i++){
//          var li = document.createElement("li");
            
            var occasion_name=rs.rows.item(i).occ_name;
            var occasion_id=rs.rows.item(i).occ_id;
            var dropdownlist=document.createElement("option");
//            alert(occasion_id);
//            alert(displaypage);
                dropdownlist.setAttribute("id",+ occasion_id);
                dropdownlist.setAttribute("value",occasion_name);
                dropdownlist.innerHTML=occasion_name;
            var selectmenu=document.querySelector("#list-per-occ");
             selectmenu.appendChild(dropdownlist);
             
        }
          var index = document.getElementById("list-per-occ").selectedIndex;

       
        option_id = document.getElementById("list-per-occ").options[index].id;
//          console.log(option_id);
         alert(option_id);
        
    	}, 
      function(tx, err){
      	//error
      	console.log("transaction to list contents of stuff failed")
    });
  });
 
  },

    
  giftinsertlist:function()
  {
//     console.log(option_id);
      
      
//       model.showdropdownList(); 
//          console.log(option_id);
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
      console.log(peoplelist);
       db.transaction(function(tx){
        tx.executeSql('INSERT INTO gifts(person_id,occ_id,gift_idea,purchased) VALUES("'+peoplegift+'","'+option_id+'","'+peoplelist+'","false")');
       });
          model.showgiftidealist();
      },
  
     showgiftidealist:function()
    {
        var list = document.querySelector(".gifts_person");
  list.innerHTML = "";
//        alert("1");
//        WHERE gifts.person_id= "+peoplegift
  //clear out the list before displaying everything
  db.transaction(function(tx){
    tx.executeSql("select g.purchased, g.gift_id, g.gift_idea,o.occ_name from gifts as g inner join occasions as o on o.occ_id=g.occ_id where g.person_id="+peoplegift , [], 
    	function(tx, rs){
      	//success
      	//rs.rows.item(0).name would be the contents of the first row, name column
      	//rs.rows.length is the number of rows in the recordset
        
      	var numStuff = rs.rows.length;
      	alert("hi");
        for(var i=0; i<numStuff; i++){
          var li = document.createElement("li");
            var gift_idea=rs.rows.item(i).gift_idea;
            var occ_name=rs.rows.item(i).occ_name;
          console.log(occ_name);
        var data_person=li.setAttribute("id",+i);
            li.innerHTML =gift_idea+" - "+occ_name;
//          li.innerHTML = rs.rows.item(i).person_name;
          list.appendChild(li);
//            app.addHammer(li);
        }
      console.log("displayed the current contents of the stuff table");
    	}, 
      function(tx, err){
      	//error
      	console.log("transaction to list contents of stuff failed")
    });
  }); 
    },
    
    
    gift_occasion_droplist:function()
    {
         db.transaction(function(tx){
    tx.executeSql("SELECT * FROM people", [], 
    	function(tx, rs){
      	//success
      	//rs.rows.item(0).name would be the contents of the first row, name column
      	//rs.rows.length is the number of rows in the recordset
      	var numStuff = rs.rows.length;
      	for(var i=0; i<numStuff; i++){
//          var li = document.createElement("li");
            
            var person_name=rs.rows.item(i).person_name;
            var person_id=rs.rows.item(i).person_id;
            var dropdownlist=document.createElement("option");
            console.log(person_name);
//            alert(occasion_id);
//            alert(displaypage);
                dropdownlist.setAttribute("id",+ person_id);
                dropdownlist.setAttribute("value",person_name);
                dropdownlist.innerHTML=person_name;
            var selectmenu=document.querySelector("#list-per-occ");
             selectmenu.appendChild(dropdownlist);
             
        }
          var index = document.getElementById("list-per-occ").selectedIndex;

       
        option_id = document.getElementById("list-per-occ").options[index].id;
//          console.log(option_id);
         alert(option_id);
        
    	}, 
      function(tx, err){
      	//error
      	console.log("transaction to list contents of stuff failed")
    });
  });
        
        
    },
    occasion_giftinsetlist:function()
    {
        var  peoplelist=document.getElementById("txt1").value;
        alert("This is alert for occasion list");
      console.log(peoplelist);
       db.transaction(function(tx){
        tx.executeSql('INSERT INTO gifts(person_id,occ_id,gift_idea,purchased) VALUES("'+option_id+'","'+peoplegift+'","'+peoplelist+'","false")');
       });
          model.showgift_occasionlist();
    },
        
    
    
    showgift_occasionlist:function()
    {
        var list = document.querySelector(".gifts_occasion");
  list.innerHTML = "";
//        alert("1");
//        WHERE gifts.person_id= "+peoplegift
  //clear out the list before displaying everything
  db.transaction(function(tx){
    tx.executeSql("SELECT g.purchased, g.gift_id, g.gift_idea,p.person_name FROM gifts AS g INNER JOIN people AS p ON p.person_id=g.person_id WHERE g.occ_id="+peoplegift , [], 
    	function(tx, rs){
      	//success
      	//rs.rows.item(0).name would be the contents of the first row, name column
      	//rs.rows.length is the number of rows in the recordset
        
      	var numStuff = rs.rows.length;
//      	alert("hi");
        for(var i=0; i<numStuff; i++){
          var li = document.createElement("li");
            var gift_idea=rs.rows.item(i).gift_idea;
            var person_name=rs.rows.item(i).person_name;
//          console.log(person_name);
        var data_person=li.setAttribute("id",+i);
            li.innerHTML =gift_idea+" : "+person_name;
//          li.innerHTML = rs.rows.item(i).person_name;
          list.appendChild(li);
//            app.addHammer(li);
        }
      console.log("displayed the current contents of the stuff table");
    	}, 
      function(tx, err){
      	//error
      	console.log("transaction to list contents of stuff failed")
    });
  }); 
    },

    
   
    
     















}