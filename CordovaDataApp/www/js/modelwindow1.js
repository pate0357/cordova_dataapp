//var Occasionlist;
//var people_page2;
var occasionname;
var model1={
 Occasioninit: function()
    {
    
    
    model1.occasionupdateList();        
  },
    
 occasionupdateList:function(){
  var list = document.querySelector(".occasion");
  list.innerHTML = "";
  //clear out the list before displaying everything
  db.transaction(function(tx){
    tx.executeSql("SELECT * FROM occasions", [], 
    	function(tx, rs){
      	//success
      	//rs.rows.item(0).name would be the contents of the first row, name column
      	//rs.rows.length is the number of rows in the recordset
      	var numStuff = rs.rows.length;
      	for(var i=0; i<numStuff; i++){
          var li = document.createElement("li");
            var occasion_id=rs.rows.item(i).occ_id;
        var data_occasion=li.setAttribute("id",+occasion_id );
          li.innerHTML = rs.rows.item(i).occ_name;
          list.appendChild(li);
            model1.addHammer(li);
        }
//      console.log("displayed the current contents of the stuff table");
    	}, 
      function(tx, err){
      	//error
      	console.log("transaction to list contents of stuff failed")
    });
  });
},
 
    
    addHammer: function (element) {
        // Add Hammer double tap event
        var mc = new Hammer.Manager(element);
//        document.querySelector("#gifts-for-occasion").style.display = "none";
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
                occasionname=ev.target;
                
//                alert("Hi");
           model1.occasionpage(ev.target.id);
                //                app.edit(contactList[ev.target.id]);

            } else if (ev.type == "doubletap") {
               model1.deleteoccasion(ev.target.id);
//                app.newmap(ev.target);
            }
        });
    },
//    
    occasionpage:function(occasion_list)
    {
        document.querySelector("#occasion-list").style.display = "none";
        document.querySelector("#gifts-for-occasion").style.display = "block";
        
        document.querySelector(".headinggiftoccasion").innerHTML ="Gift for " + occasionname.innerHTML;
        
//        alert(occasion_list);
        
//        var gift=document.getElementById("add-gift");
        model.modelwindow(occasion_list);
        
    },
    deleteoccasion:function(delete_occasion)
    {
//        console.log(delete_people);
      db.transaction(function(tx){
//          alert("hi");
        tx.executeSql('DELETE FROM occasions WHERE occ_id= ?', [delete_occasion]);
       });
       model1.occasionupdateList(); 
    
    },
//     backbuttonoccasiongift:function()
//    {
//        document.querySelector("#occasion-list").style.display = "block";
//        document.querySelector("#gifts-for-occasion").style.display = "none";
//    }
}
