
function searchInstance(){
  var href = '../api/v2/aws.loadBalancers;';  
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
      until = '_until='+Date.parse(until)+';';
  }
  else{
    at = document.getElementById('at').value;
    if(at != '')
      at = '_at='+Date.parse(at)+';';
  }

  
  var ul = "<table class='tablesorter'><thead><tr><th>LoadBalancerName</th><th>Url</th>";
  ul+="<th>Scheme</th>";
  ul+="<th>Region</th>";
  ul+="<th>Instances</th>";
 
  ul+="<th>CreatedTime</th>";
  
 

  ul+="</tr></thead><tbody>";
  
  $.ajax({
    url: href,    
    async:false,          
    success:function(data1) {                                        
      for(var i=0;i<data1.length;i++){
        var item="";
        var count=0;
        var loadBalancers=data1[i];
        //item +="<tr><td>HHHHHH"+data1[i]+"</td>";
        
        $.ajax({
          url: "../api/v2/aws.loadBalancers/"+data1[i]+";",
          async:false,
          success:function(data){
            var url_add="none";
            var scheme="none";
            var availabilityZones="none";
            
            var createdTime="none";
            var instances="";
            var listener="none";
            var cname="none";
            
            $.each(data,function(key,val){
            
              if(key == "DNSName"){
                 
                url_add=val;
              }
              if(key == "scheme"){
                 
                scheme=val;
              }
              if(key == "availabilityZones"){
                 
                availabilityZones=val;
              }
              if(key == "createdTime"){
                var d = new Date(val);
                
                createdTime=d.toUTCString();
                 
              }
              if(key == "instances"){
                 for(var i=0;i<val.length;i++){
                
                  instances=val[i].instanceId+"<br>"+instances;

                }
              }

              count ++; 
             });
            item+="<td>"+loadBalancers+"</td><td>"+url_add+"</td><td>"+scheme+"</td><td>"+availabilityZones;
            item+="</td><td>"+instances+"</td><td>"+createdTime;
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



