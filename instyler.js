/*jslint browser:true */
/*jslint node: true */
/*global j */
'use strict';
var instyler = {
    genSelect: function (element) {
        var i,
            parent,
            width,
            wrapper,
            span,
            list,
            options,
            templi,
            setSelected,
            toogle;
        
        function setText() {
            span.textContent = element.options[element.selectedIndex].text;
        }
        
        toogle = function () {
            if (j.hasClass("is-hidden", list)) {
                j.removeClass("is-hidden", list);
            } else {
                j.addClass("is-hidden", list);
            }
        };
        
        setSelected = function () {
            var i, options, len, value;
            value = this.getAttribute("data-val");
            options = element.options;
            len = options.length;
            for (i = 0; i < len; i += 1) {
                if (options[i].value !== value) {
                    options[i].removeAttribute("selected");
                } else {
                    options[i].setAttribute("selected", "");
                }
            }
            setText();
        };
        
        width = window.getComputedStyle(element).width;
        element.style.display = "none";
                
        wrapper = document.createElement("div");
        wrapper.className = "masterBorderColor instyler dropdown";
        wrapper.style.width = width;
        
        list = document.createElement("ul");
        list.className = "masterBorderColor dropdown__list is-hidden";
        options = element.getElementsByTagName("option");
        for (i = 0; i < options.length; i += 1) {
            templi = document.createElement("li");
            templi.textContent = options[i].text;
            templi.setAttribute("data-val", options[i].value);
            j.addEvent(templi, "click", setSelected);
            list.appendChild(templi);
        }
        
        
        span = document.createElement("span");
        setText();
        
        parent = element.parentNode;
        parent.replaceChild(wrapper, element);
        
        j.addEvent(wrapper, "click", toogle);
        wrapper.appendChild(element);
        wrapper.appendChild(span);
        wrapper.appendChild(list);
        
        list.style.top = window.getComputedStyle(wrapper).height - 1;
    },
    
    genCheckbox: function (element, imageOn, imageOff) {
        var parent,
            wrapper,
            label = "",
            square,
            checked,
            changeSelection,
            setImage;
        
        setImage = function () {
            if (element.checked === true) {
                j.removeClass("is-hidden", checked);
            } else {
                j.addClass("is-hidden", checked);
            }
        };
        
        changeSelection = function () {
            if (element.checked === true) {
                this.parentNode.getElementsByTagName("span")[0].style.display = "inline";
            } else {
                this.parentNode.getElementsByTagName("span")[0].style.display = "none";
            }
        };
        
        square = document.createElement("div");
        checked = document.createElement("span");
        wrapper = document.createElement("div");
        
        j.addClass("checkbox", element);
        j.addClass("layer", square);
        j.addClass("checked-layer icon-checkmark masterTextColor", checked);
        j.addClass("instyler checklist", wrapper);
        if (element.checked === false) {
            j.addClass("is-hidden", checked);
        } else {
            j.removeClass("is-hidden", checked);
        }
        
        parent = element.parentNode;
        if (element.nextElementSibling.nodeName === "LABEL") {
            label = element.nextElementSibling;
            j.addClass("label", label);
            parent.removeChild(label);
        }
        square.appendChild(checked);
        wrapper.appendChild(square);
        parent.replaceChild(wrapper, element);
        j.addEvent(element, "click", changeSelection);
        wrapper.appendChild(element);
        j.addEvent(label, "click", setImage);
        if (label !== "") {
            wrapper.appendChild(document.createTextNode(" "));
            wrapper.appendChild(label);
        }
    },
    
    genRadio: function (element, imageOn, imageOff) {
        var parent,
            wrapper,
            label = "",
            circle,
            smallcircle,
            setImage;
        
        setImage = function () {
            var i, elements = j.selectByClass("radio-button"), len = elements.length;
            for (i = 0; i < len; i += 1) {
                if (elements[i].checked === false) {
                    j.addClass("is-hidden", j.selectByTag("div", elements[i].parentNode)[0].firstElementChild);
                } else {
                    j.removeClass("is-hidden", j.selectByTag("div", elements[i].parentNode)[0].firstElementChild);
                }
            }
        };
        
        circle = document.createElement("div");
        smallcircle = document.createElement("div");
        wrapper = document.createElement("div");
        
        j.addClass("radio-button", element);
        j.addClass("layer", circle);
        j.addClass("checked-layer masterBackgroundColor is-hidden", smallcircle);
        j.addClass("instyler radiolist", wrapper);

        if (element.checked === false) {
            j.addClass("is-hidden", smallcircle);
        } else {
            j.removeClass("is-hidden", smallcircle);
        }
        
        parent = element.parentNode;
        if (element.nextElementSibling.nodeName === "LABEL") {
            label = element.nextElementSibling;
            j.addClass("label", label);
            parent.removeChild(label);
        }

        j.addEvent(element, "click", setImage);
        
        circle.appendChild(smallcircle);
        wrapper.appendChild(circle);
        parent.replaceChild(wrapper, element);
        wrapper.appendChild(element);
        
        j.addEvent(label, "click", setImage);
        if (label !== "") {
            wrapper.appendChild(document.createTextNode(" "));
            wrapper.appendChild(label);
        }
    }
};