//buttons
var calendar
var clock
var weatherB
var weight
var textMessages
var social

//for weather
let temperature = 0;
let weather = "";

//to display
let showCalendar = false;
let showNews = false;
let showText = false;
let showSocial = false;
let showTime = false;
let showWeather = false;
let showWeight = false;


//JSON file holders
let json;
let weightData
let headline
let todo
let textJ
let socialJ

function preload() { 
  // The URL for the JSON data (replace "imperial" with "metric" for celsius)
  let url = "https://api.openweathermap.org/data/2.5/weather?q=Lubbock&units=imperial&APPID=e812164ca05ed9e0344b89ebe273c141";
  json = loadJSON(url);
  weightData = loadJSON('weightJSON.json')
  headline = loadJSON('newsJSON.json') 
  todo = loadJSON('calendarJSON.json')
  textJ = loadJSON('textMessagesJSON.json') 
  socialJ = loadJSON('SocialJSON.json')
}

function setup() {
  //new box(xpos, ypos, width, height, minimumWidth, minimumHeight, maintainAspectRatio = false) 
  //test_box = new Box(50, 50, 80, 40, 40, 30, true);
  
  calendar = new Box(25, 50, 75, 75, 75, 75, true,'rgb(246,184,27)','Calendar', 0);
  news = new Box(25, 150, 75, 75, 75, 75, true,'rgb(255,45,45)','News', 0);
  textMessages = new Box(25, 250, 75, 75, 75, 75, true,'rgb(67,255,47)','Texts', 0);
  social = new Box(25, 350, 75, 75, 75, 75, true,'#00acee','Social Media', 0);
  clock = new Box(25, 450, 75, 75, 75, 75, true,'rgb(156,48,255)','Time', 0);
  weatherB = new Box(25, 550, 75, 75, 75, 75, true,'rgb(222,222,222)','Weather', 0);
  weight = new Box(25, 650, 75, 75, 75, 75, true,'rgb(237,247,66)','Weight', 0);
  temperature = json.main.temp;
  weather = json.weather[0].description;

  createCanvas(800, 800);
}

function draw() {
  background('white');
  textSize(12);
  calendar.update();
  news.update();
  textMessages.update();
  social.update();
  clock.update();
  weatherB.update();
  weight.update();
  
  textAlign(CENTER, CENTER);
  //timeStamp
  var sec = second();
  var min = minute();
  var hrs = hour();
  var mer = hrs < 12 ? "AM":"PM";
  textSize(15);
  //when buton is clicked the info toggles visible/invisible
  if(showCalendar){
        m = month2month(int(month()))
        var currentMonth =""
        d = int(day())-1;
        text("Today is "+m+" the "+day(),calendar.x+215,calendar.y+25);
        switch(month()) {
        case 1:200
            text("TODO: "+todo.January.todo[d],calendar.x+200,calendar.y+50)
            break
        case 2:
            text("TODO: "+todo.February.todo[d],calendar.x+200,calendar.y+50)
            break
        case 3:
            text("TODO: "+todo.March.todo[d],calendar.x+200,calendar.y+50)
            break
        case 4:
            text("TODO: "+todo.April.todo[d],calendar.x+200,calendar.y+50)
            break
        case 5:
            text("TODO: "+todo.May.todo[d],calendar.x+200,calendar.y+50)
            break
        case 6:
            text("TODO: "+todo.June.todo[d],calendar.x+200,calendar.y+50)
            break
        case 7:
            text("TODO: "+todo.July.todo[d],calendar.x+200,calendar.y+50)
            break
        case 8:
            text("TODO: "+todo.August.todo[d],calendar.x+200,calendar.y+50)
            break
        case 9:
            text("TODO: "+todo.September.todo[d],calendar.x+200,calendar.y+50)
            break
        case 10:
            text("TODO: "+todo.October.todo[d],calendar.x+200,calendar.y+50)
            break
        case 11:
            text("TODO: "+todo.November.todo[d],calendar.x+200,calendar.y+50)
            break
        case 12:
            text("TODO: "+todo.December.todo[d],calendar.x+200,calendar.y+50)
            break
        default:
            break
        }
      }
  if(showNews){
      text(headline.Headlines.NEWS[0],news.x+255,news.y);
      text(headline.Headlines.NEWS[1],news.x+230,news.y+25);
      text(headline.Headlines.NEWS[2],news.x+245,news.y+50);
      text(headline.Headlines.NEWS[3],news.x+265,news.y+75);
    }
  if(showText){
      text(textJ.newTexts.amount[0],textMessages.x+225,textMessages.y+25);
    }  
  if(showSocial){
      text("Twitter: "+socialJ.social.twitter[0],social.x+200,social.y+25);
      text("Instagram: "+socialJ.social.insta[0],social.x+250,social.y+50);
      text(""+socialJ.social.insta[0],social.x+290,social.y+75)
      text("Facebook: "+socialJ.social.facebook[0],social.x+220,social.y+100);
    }   
  if(showTime){
      text(hrs + ":" + min + ":" + sec +" " + mer, clock.x+175,clock.y+50);
    } 
  if(showWeather){
      text("City: Lubbock",weatherB.x+185,weatherB.y+25)
      text("Current temperature: " + temperature,weatherB.x+230,weatherB.y+50)
      text("Forecast: " + weather,weatherB.x+225,weatherB.y+75)
    }
  if(showWeight){
      text("Your current weight is "+weightData.Current.weight[0]+"lbs",weight.x+235,weight.y+15)
      text(("For the past 4 weeks your weight has been"),weight.x+285,weight.y+40)
      text((weightData.Week1.weight[0]+", "+weightData.Week2.weight[0]+" "+weightData.Week3.weight[0]+", "+weightData.Week4.weight[0]+" (lbs)"),weight.x+218,weight.y+65)
      //text((weightData.Week3.weight[0]+", "+weightData.Week4.weight[0]),weight.x+200,weight.y+175)
    }

}

function formatting(num){
    
  // Convert to int and check 
  // if less than 10
  if(int(num) < 10) {
      
    // Return the padded number
    return "0" + num;
  }
    
  // Return the original number if
  // padding is not required
  return num;
}

function mousePressed() { 
  //if button over resize then resize
  //else if button over rest click/drag
  if (calendar.mouseIsOverResizeBox()){
      calendar.clickedResize();
    }
  else if(calendar.mouseIsOver())
    {
      showCalendar=!showCalendar
      calendar.clickedButton();
    }
  else if (news.mouseIsOverResizeBox()){
      news.clickedResize();
    }
  else if(news.mouseIsOver())
    {
      showNews=!showNews
      news.clickedButton();
    }
  else if (textMessages.mouseIsOverResizeBox()){
      textMessages.clickedResize();
    }
  else if(textMessages.mouseIsOver())
    {
      showText=!showText
      textMessages.clickedButton();
    }
  else if (social.mouseIsOverResizeBox()){
      social.clickedResize();
    }
  else if(social.mouseIsOver())
    {
      showSocial=!showSocial
      social.clickedButton();
    }
  else if (clock.mouseIsOverResizeBox()){
      clock.clickedResize();
    }
  else if(clock.mouseIsOver())
    {
      showTime=!showTime
      clock.clickedButton();
    }
  else if (weatherB.mouseIsOverResizeBox()){
      weatherB.clickedResize();
    }
  else if(weatherB.mouseIsOver())
    {
      showWeather=!showWeather
      weatherB.clickedButton();
    }
  else if (weight.mouseIsOverResizeBox()){
      weight.clickedResize();
    }
  else if(weight.mouseIsOver())
    {
      showWeight=!showWeight;
      weight.clickedButton();
    }
}

function mouseReleased() {
  calendar.released();
  news.released();
  textMessages.released();
  social.released();
  clock.released();
  weatherB.released();
  weight.released();
}

function month2month(num){
  switch(num) {
    case 1:
        return "January"
        break
    case 2:
        return "February"
        break
    case 3:
        return "March"
        break
    case 4:
        return "April"
        break
    case 5:
        return "May"
        break
    case 6:
        return "June"
        break
    case 7:
        return "July"
        break
    case 8:
        return "August"
        break
    case 9:
        return "September"
        break
    case 10:
        return "October"
        break
    case 11:
        return "November"
        break
    case 12:
        return "December"
        break
    default:
        //
  }
}

class Box {
  constructor(x, y, width, height, minimumWidth, minimumHeight, maintainAspectRatio,colors,text, text_fill){
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.colors = colors;
    this.text= text;
    this.text_fill= text_fill;
    
    //the size of the resize box in the lower lefthand corner of the box
    this.resizeSize = 15;
    
    // an aspect ratio is the ratio of width to height
    this.aspectRatio = this.width/this.height;
    this.maintainAspectRatio = maintainAspectRatio;
    
    this.minimumWidth = minimumWidth;
    this.minimumHeight = minimumHeight;
    
    //if the initial width less than the minimum width, set the width to the minimum width.
    if(minimumWidth > width) {
      this.width = this.minimumWidth;
    }
    
    //if the initial height is less than the minimum height, set the height to the minimum width.
    if(minimumHeight > height) {
      this.height = this.minimumHeight
    }

    if (this.maintainAspectRatio) {
      //if the aspect ratio is maintained, either the minimum height or minimum width won't match the aspect ratio. But only one will ever really be reached.
      //so we can set the limiter that won't be reached based on the aspect ratio.
      
      //if the height when width is at the minimum is less than the minimum height, set the minimum height based on the aspect ratio.
      if (this.minimumWidth / this.aspectRatio > this.minimumHeight) {
        //console.log("The requested minimum height of " + String(this.minimumHeight) + " cannot be reached. Setting the minimum height based on the aspect ratio to " + String(this.minimumWidth / this.aspectRatio) + ".");
        this.minimumHeight = this.minimumWidth / this.aspectRatio;
      }
    
      //if the width when the height is at the minimum is less than the minimum width
      if (this.minimumHeight * this.aspectRatio > this.minimumWidth) {
        //console.log("The requested minimum width of " + String(this.minimumWidth) + " cannot be reached. Setting the minimum width based on the aspect ratio to " + String(this.minimumHeight * this.aspectRatio) + ".");
        this.minimumWidth = this.minimumHeight * this.aspectRatio;
      }
    }
    
    this.isBeingResized = false;
    this.isBeingDragged = false;
    
    //These store the offset for moving and resizing the image
    this.offsetX;
    this.offsetY;
  }
  clickedResize(){
      this.isBeingResized= true;
      //the distances from position of the mouse inside the box to the bottom right corner
      this.offsetX = (this.x + this.width) - mouseX;
      this.offsetY = (this.y + this.height) - mouseY
  }
  clickedButton(){    
      this.isBeingDragged = true;
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
  }
  released() {
    this.isBeingResized = false;
    this.isBeingDragged = false;
    
  }
  update() {  
    fill(this.colors);
    rect(this.x, this.y, this.width, this.height);
    fill(this.text_fill)
    textAlign(CENTER, CENTER)
    text(this.text, this.x + (this.height/2), this.y + (this.width/2))
    stroke('black');

    if (this.isBeingResized) {
      if (this.maintainAspectRatio) {
        if (mouseX - this.x + this.offsetX > this.minimumWidth) {
          this.width = mouseX - this.x + this.offsetX;
          this.height = this.width / this.aspectRatio;
          
        } else {
          this.width = this.minimumWidth;
          this.height = this.minimumHeight;
        }
      } else {
        if (mouseX - this.x + this.offsetX > this.minimumWidth) {
          this.width = mouseX - this.x + this.offsetX;
        } else {
          this.width = this.minimumWidth;
        }
        if (mouseY - this.y + this.offsetY > this.minimumHeight) {
          this.height = mouseY - this.y + this.offsetY;
        } else {
          this.height = this.minimumHeight;
        }
      }
    }
    
    if(this.isBeingDragged) {
      this.x = mouseX+this.offsetX;
      this.y = mouseY+this.offsetY;
    }
    
  }
  mouseIsOver(){
    if (mouseX > this.x && mouseY > this.y && mouseX < this.x + this.width && mouseY < this.y + this.height)
      return true
    else
      return false
  }
  mouseIsOverResizeBox() {
    return (mouseX > this.x+this.width-this.resizeSize && mouseY >this.y+this.height-this.resizeSize && mouseX < this.x+this.width && mouseY < this.y + this.height);
  }
  check_mouseover(){
        if (mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height){
            this.is_over = true
        }
        else return false
        return true;   
  }
}