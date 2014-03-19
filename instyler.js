/*jslint browser:true */
/*jslint node: true */
'use strict';
var instyler = {
    genSelect: function (element) {
        var parent, wrapper, span;
        
        function setText() {
            span.textContent = element.options[element.selectedIndex].text;
        }
        
        element.style.opacity = "0";
        element.style.position = "relative";
        element.style.zIndex = "2";
        element.onchange = setText;
        
        wrapper = document.createElement("div");
        wrapper.style.display = "inline";
        wrapper.style.position = "relative";
        
        span = document.createElement("span");
        span.style.position = "absolute";
        span.style.top = "0";
        span.style.left = "0";
        span.style.right = "0";
        span.style.bottom = "0";
        span.style.zIndex = "1";
        setText();
        
        parent = element.parentNode;
        parent.replaceChild(wrapper, element);
        wrapper.appendChild(element);
        wrapper.appendChild(span);
    },
    
    genCheckbox: function (element, imageOn, imageOff) {
        var parent, wrapper, label = "", image;
        if (element.nextElementSibling.nodeName === "LABEL") {
            label = element.nextElementSibling;
        }
        
        function setImage() {
            if (element.checked === true) {
                image.src = image.getAttribute("data-off");
            } else {
                image.src = image.getAttribute("data-on");
            }
        }
        
        element.style.opacity = "0";
        element.style.position = "relative";
        element.style.zIndex = "2";
        
        image = document.createElement("img");
        image.style.position = "absolute";
        image.style.top = "2px";
        image.style.left = "0";
        image.style.zIndex = "1";
        image.setAttribute("data-off", imageOff);
        image.setAttribute("data-on", imageOn);
        image.style.width = "16px";
        image.style.height = "16px";
        if (element.checked === false) {
            image.src = image.getAttribute("data-off");
        } else {
            image.src = image.getAttribute("data-on");
        }
        
        wrapper = document.createElement("div");
        wrapper.style.display = "inline";
        wrapper.style.position = "relative";
        
        parent = element.parentNode;
        parent.replaceChild(wrapper, element);
        wrapper.appendChild(image);
        wrapper.appendChild(element);
        label.onclick = setImage;
        if (label !== "") {
            parent.removeChild(label);
            wrapper.appendChild(document.createTextNode(" "));
            wrapper.appendChild(label);
        }
    },
    
    genRadio: function (element, imageOn, imageOff) {
        var parent, wrapper, label = "", image;
        if (element.nextElementSibling.nodeName === "LABEL") {
            label = element.nextElementSibling;
        }
        
        function setImage() {
            var i, elements = document.querySelectorAll("input[type=radio]"), len = elements.length;
            for (i = 0; i < len; i += 1) {
                if (elements[i].checked === false) {
                    elements[i].parentNode.getElementsByTagName("img")[0].src = elements[i].parentNode.getElementsByTagName("img")[0].getAttribute("data-off");
                } else {
                    elements[i].parentNode.getElementsByTagName("img")[0].src = elements[i].parentNode.getElementsByTagName("img")[0].getAttribute("data-on");
                }
            }
        }
        
        element.style.opacity = "0";
        element.style.position = "relative";
        element.style.zIndex = "2";
        
        image = document.createElement("img");
        image.style.position = "absolute";
        image.style.top = "2px";
        image.style.left = "0";
        image.style.zIndex = "1";
        image.setAttribute("data-off", imageOff);
        image.setAttribute("data-on", imageOn);
        image.style.width = "16px";
        image.style.height = "16px";
        if (element.checked === false) {
            image.src = image.getAttribute("data-off");
        } else {
            image.src = image.getAttribute("data-on");
        }
        
        wrapper = document.createElement("div");
        wrapper.style.display = "inline";
        wrapper.style.position = "relative";
        
        parent = element.parentNode;
        parent.replaceChild(wrapper, element);
        wrapper.appendChild(image);
        wrapper.appendChild(element);
        element.onchange = setImage;
        if (label !== "") {
            parent.removeChild(label);
            wrapper.appendChild(document.createTextNode(" "));
            wrapper.appendChild(label);
        }
    }
};