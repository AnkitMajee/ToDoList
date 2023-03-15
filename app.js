const express = require("express");
const bodyParser = require("body-parser");

const app = express();
var items =["Read","Eat","Code","Sleep","Repeat"];
var workItems={};
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req,res){
  var today = new Date();

var options={
  weekday:"long",
  day:"numeric",
  month:"long"
};

  var day= today.toLocaleDateString("en-IN",options);

res.render('List', {listTitle: day, newListItems: items});

// var day="";
// switch(currentDay){
//   case 0:
//    day="Sunday";
//    break;
//    case 1:
//     day="Monday";
//     break;
//     case 2:
//      day="Tuesday";
//      break;
//      case 3:
//       day="Wednesday";
//       break;
//       case 4:
//        day="Thursday";
//        break;
//        case 5:
//         day="Saturday";
//         break;
//         case 6:
//          day="Sunday";
//          break;
//          default:
//          console.log("Error: Current day is equal to:"+ currentDay);
// }
  // if(today.getDay()=== 6|| today.getDay()===0){
  //   day="Weekend";
  // }
  // else{
  //   day="weekday";
    // res.sendFile(__dirname+"/index.html")
    // res.write("<p>It is not the weekend!</p>") // to send many message at a time we use res.write
    // res.write("<h1>Boo I have to work</h1>");
    // res.send(); // to send the message

});

app.post("/",function(req,res){
  var item = req.body.newItem;
  if(req.body.newItem === "work"){
    workItems.push(item);
    res.redirect("/work");
  }
  else{
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list",{listTitle:"Work List", newListItems:workItems});
});

// app.post("/work",function(req,res){
//   let item=req.body.newItem;
// })


app.listen(process.env.PORT || 3000, function(){
  console.log("server started");
});
