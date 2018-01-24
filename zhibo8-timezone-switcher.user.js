// ==UserScript==
// @name         直播吧时区转换
// @namespace    http://tampermonkey.net/
// @version      0.9
// @description  自动将直播吧显示的比赛时间转换到当地时间
// @author       PLH
// @match        http://www.zhibo8.cc/
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    var offset = new Date().getTimezoneOffset();
    var content = document.getElementsByClassName("content");
    //check whether to add a box
    var earliestTime = parseInt(content[0].firstElementChild.firstElementChild.textContent.substring(0,2));
    var newEarliest = earliestTime + (offset -480 )/60;
    //var startCount = 0;
    if (newEarliest<0){
     //startCount = 1;
    var box1 = content[0].parentElement;
    var newbox1 = box1.cloneNode(true);
    newbox1.firstElementChild.children[1].remove();
        //duplicated filter removed
    var box1Ul = box1.children[1].firstElementChild;
    while (box1Ul.firstChild) {
    box1Ul.removeChild(box1Ul.firstChild);}
    //box 1 content removed
    //changes the date
    var localTime = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var newDate = localTime.toLocaleDateString('zh-CN', options);
    box1.firstElementChild.firstElementChild.title= newDate.slice(0,-3);
    box1.firstElementChild.firstElementChild.textContent = newDate.slice(5,-3) + ' '+ newDate.slice(-3);
    box1.insertAdjacentElement('afterend',newbox1);
    }
    content = document.getElementsByClassName("content");
    for (var j = 0; j < content.length; j++)

        {for (var chil = 0; chil < content[j].firstElementChild.childElementCount; chil++)
        {//if (j==1){alert(content[j].firstElementChild.children[chil].textContent);};
            //div(content)--ul(single child)--li
         var theElement = content[j].firstElementChild.children[chil];
            console.log(theElement.innerHTML.substr(0,18));
         var hour = parseInt(theElement.textContent.substring(0,2));
         if (! isNaN(hour)){
         var newHour = hour + (offset -480 )/60;
         if (newHour <0){newHour += 24; //need to consider the non-sharp times
                         var dupEle = theElement.cloneNode(true);
                         theElement.style.display = 'none';
                         dupEle.innerHTML = '• ' + newHour.toString() + dupEle.innerHTML.substring(2);
                         content[j-1].firstElementChild.append(dupEle);}

         else{theElement.innerHTML = '• ' + newHour.toString() + theElement.innerHTML.substring(2);}
    //Beijing time(UTC +8): -480
         }}}
    
})();