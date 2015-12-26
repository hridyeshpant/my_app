
function searchInstance(){
  var href = '../api/v2/aws/subnets;';  
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

  
  var ul = "<table class='tablesorter'><thead><tr><th>Subnet</th><th>availabilityZone</th>";
  ul+="<th>availableIpAddressCount</th>";
  ul+="<th>CidrBlock</th>";
  ul+="<th>vpcId</th>";
 
  ul+="<th>State</th>";
  
 

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
          url: "../api/v2/aws/subnets/"+data1[i]+";",
          async:false,
          success:function(data){
            var availabilityZone="none";
            var availableIpAddressCount="none";
            var cidrBlock="none";
            
            var vpcId="none";
            var state="none";
            
            
            $.each(data,function(key,val){
            
              if(key == "availabilityZone"){
                 
                availabilityZone=val;
              }
              if(key == "availableIpAddressCount"){
                 
                availableIpAddressCount=val;
              }
              if(key == "cidrBlock"){
                 
                cidrBlock=val;
              }
              if(key == "vpcId"){
                 
                vpcId=val;
              }
              if(key == "state"){
                 
                state=val;
              }

              count ++; 
             });
            item+="<td>"+loadBalancers+"</td><td>"+availabilityZone+"</td><td>"+availableIpAddressCount;
            item+="</td><td>"+cidrBlock+"</td><td>"+vpcId+"</td><td>"+state;
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



