
function searchInstance(){
  var href = '../api/v2/aws.stacks;';  
  //var id = document.getElementById('id').value;
  

  var dateType = document.getElementsByName('date');
  var since='';
  var until='';
  var at='';

  if(dateType[0].checked){
    since = document.getElementById('since').value;
    until = document.getElementById('until').value;
    if(since != '')
      since = '_since='+Date.parse(since)+';';
    
    if(until != '')
      until = '_until='+Date.parse(until);
  }
  else{
    at = document.getElementById('at').value;
    if(at != '')
      at = '_at='+Date.parse(at);
  }

  
  
  var region = document.getElementById('region').value;
  if(region != '')
    href = href + 'parameters.parameterValue='+region+';';
  href = href +at+since+until+";";

  //console.log("***** URL: "+href);

  var ul = "<table class='tablesorter'><thead><tr><th>Creation Time</th><th>Stack Name </th>";
  
  ul+="<th>Version</th>";
  ul+="<th>LoadBalancer</th>";
 
  
  ul+="<th>Environment</th>";
  ul+="<th>CostCenter</th>";
  ul+="<th>Region</th>";
   ul+="<th>TeamName</th>";
  ul+="<th>Email</th>";
  ul+="<th>ami-id</th>";
  ul+="<th>LoadBalancer</th>";
 
 

  ul+="</tr></thead><tbody>";
  
  $.ajax({
    url: href,    
    async:false,          
    success:function(data1) {                                        
      for(var i=0;i<data1.length;i++){
        var item="";
        var count=0;
        var stackName=data1[i];
        //item +="<tr><td>HHHHHH"+data1[i]+"</td>";
        
        $.ajax({
          url: "../api/v2/aws.stacks/"+data1[i]+";",
          async:false,
          success:function(data){
            var ami="none";
            var lbs="none";
            var version="none";
            var creationtime="none";
            var stackname="none";
            var Email="none";
            var Environment="none";
            var Region="none";
            var TeamName="none"; 
            
            var status="none"
            var name="none"
            var weight="none"
            var CostCenter="none"
            $.each(data,function(key,val){
            //item +="HHHHHH"+count;  
               if (key=="stackStatus") 
               {
                  status=val;
               }       
               
               if(key == "creationTime"){
                var d = new Date(val);
                
                creationtime=d.toUTCString();
                 
              }
               if(key == "outputs"){
                
                
                for(var i=0;i<val.length;i++){
                  //console.log("HHHHH "+val[i].outputValue);
                  if ((val[i].outputKey == "AMI") )
                  {
                    ami=val[i].outputValue;
                  }
                  //if(val[i].key.indexOf(outputs)!=-1||val[i].value.indexOf(outputs)!=-1 )
                  if (val[i].outputKey == "LoadBalancer") {
                    lbs=val[i].outputValue;
                    
                  }

                  if (val[i].outputKey == "URL") {
                      url=val[i].outputValue;
                  } 

                  if (val[i].outputKey == "Version")
                  {
                    version=val[i].outputValue

                  } 
                   if (val[i].outputKey == "Version")
                  {
                    version=val[i].outputValue

                  } 
                 
                }
                
             
                     
             }
             else if(key == "parameters"){
              for(var i=0;i<val.length;i++){
                if (val[i].parameterKey == "Email") {
                  Email=val[i].parameterValue;
                }
                if (val[i].parameterKey == "Region") {
                    Region=val[i].parameterValue;

                  } 
              
              }

             }
            
              else if(key == "tags"){

                 for(var i=0;i<val.length;i++){
                  
                 
                  if (val[i].key == "Environment") {
                    Environment=val[i].value;
                  }

                  if (val[i].key == "Team") {
                      TeamName=val[i].value;
                  
                   }
                   if (val[i].key == "Cost Center") {
                      CostCenter=val[i].value;
                  
                   }
                 }
              }

                  
              count ++; 
             });
            item+="<td>"+creationtime+"</td><td>"+stackName+"</td><td>"+version+"</td><td>"+lbs+"</td>"
            item+="<td>"+Environment+"</td><td>"+CostCenter+"</td><td>"+Region+"</td><td>"+TeamName+"</td><td>"+Email+"</td><td><a href=\"instance.html?id="+ami+"\" target=\"_blank\">"+ami+"</a>"+"</td><td>"+lbs;
          }
              
        }); 

        if(count ==0) 
          item=""; 
        
           
        ul+=item;             
        ul+="</tr>";
      }
      ul+="</tbody></table>"             
      $('#instanceNum').html('<b>You have: '+data1.length+' instances</b>');
    }        
  });

  $('#result').html(ul);
  $("table").tablesorter({
    theme : 'blue',
    // initialize zebra striping and resizable widgets on the table
    widgets: [ "zebra", "resizable" ],
    widgetOptions: {
      resizable_addLastColumn : true
    }
  });
}

function filter(){
  var meta ='_expand:(';
  var items= document.getElementsByName('setCheckbox');
  
  for(var i=0;i<items.length;i++){
    if(items[i].checked){
      var tmp = items[i].value;   
      meta = meta+ tmp+',';
    }
  }
  meta = meta +')';
  return meta;
}

function selectAll(){
  var checkboxs = document.getElementsByName('setCheckbox');
 
  for(var i=1;i<checkboxs.length;i++){
    var e = checkboxs[i];
    e.checked = !e.checked;
  } 
}



