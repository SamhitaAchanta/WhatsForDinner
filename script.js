/*
    Name: Samhita Achanta
    File Name: script.js
    Assignment: Project 1
    This is the main javascript file of the project with all the dynamic functionalities.  
*/

// Animation for the main section
const sr = ScrollReveal ({
    distance: '80px',
    duration: 2600,
    delay: 450,
    reset: true
});

ScrollReveal().reveal('.food-text',{delay:200,origin:'top'});
ScrollReveal().reveal('.fridge-img',{delay:450,origin:'top'});



// Insert ingredients dynamic input form
var options = document.getElementById('options');
// var add_options = document.getElementById('add_options');
// var remove_options = document.getElementById('remove_options');

function add_options(){
    var new_option = document.createElement('input');
    new_option.setAttribute('type','text');
    new_option.setAttribute('name','text');
    new_option.setAttribute('class','text');
    new_option.setAttribute('siz',50);
    new_option.setAttribute('placeholder','Another Field');
    options.appendChild(new_option);
}

function remove_options(){
    var input_tags = options.getElementsByTagName('input');
    if(input_tags.length > 2){
        options.removeChild(input_tags[(input_tags.length) - 1]);
    }
}



