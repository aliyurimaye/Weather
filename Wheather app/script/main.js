let search_box= document.getElementById('search-box');
let city='england';
let icon_container=document.getElementById('icon-container'), 
    icon=document.getElementById('icon'), feels_like=document.getElementById('feels_like'),
    humidity=document.getElementById('humidity'), pressure=document.getElementById('pressure'), temp=document.getElementById('temp'),
    main=document.getElementById('weather-main'), description=document.getElementById('description') ;
    




async function getWeather(){
    
    let url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=efd504d103e5fd413f1d0d2e84a46ff9`;
    try{
        let response=await fetch(url);
        let data =await response.json();
        return data;
    }catch(error){
        console.log(error);
    }
   
}

//getWeather().then(response=>{loadWeather(response)}).catch(error=>console.log(error));

function loadWeather(data){ 
document.getElementById('location-name').innerText=data.name;
    icon.setAttribute('src',"http://api.openweathermap.org/img/w/"+data.weather[0].icon+".png");
    feels_like.textContent=data.main.feels_like;
    humidity.textContent=data.main.humidity;
    pressure.textContent=data.main.pressure;
    temp.textContent=data.main.temp;
    main.textContent=data.weather[0].main;
    description.textContent=data.weather[0].description;

    register();

}

document.getElementById('submit').addEventListener('click',function () {
    let search=search_box.value.trim();
    if(search!=null){
        city=search;
        getWeather().then(response=>{loadWeather(response)}).catch(error=>console.log(error));
    }
},false);


function register(){
    if('serviceWorker' in navigator){
        window.addEventListener('load', function(){
            navigator.serviceWorker.register('../service_worker.js').then((registration)=>{
                console.log(`serviceWorker registration successfully with scope: ${registration.scope}`);
            }, (error)=>{
                console.log(`serviceWorker registration failed :  ${error}`);  
            });
        });
    }
}

