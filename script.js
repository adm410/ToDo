let todoItems = [];

function renderTodo(todo) {
  localStorage.setItem('todoItems', JSON.stringify(todoItems));

  const list = document.querySelector('.js-todo-list');
  const item = document.querySelector(`[data-key='${todo.id}']`);
  
  if (todo.deleted) {
    item.remove();
    if (todoItems.length === 0) list.innerHTML = '';
    return
  }

  const isChecked = todo.checked ? 'done': '';
  const node = document.createElement("li");
  node.setAttribute('class', `todo-item ${isChecked}`);
  node.setAttribute('data-key', todo.id);
  node.innerHTML = `
    <input id="${todo.id}" type="checkbox"/>
    <label for="${todo.id}" class="tick js-tick"></label>
    <span>${todo.text}</span>
    <button class="delete-todo js-delete-todo">
    <svg><use href="#delete-icon"></use></svg>
    </button>
  `;

  if (item) {
    list.replaceChild(node, item);
  } else {
    list.append(node);
  }
}

function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };

  todoItems.push(todo);
  renderTodo(todo);
}

function toggleDone(key) {
  const index = todoItems.findIndex(item => item.id === Number(key));
  todoItems[index].checked = !todoItems[index].checked;
  renderTodo(todoItems[index]);
}

function deleteTodo(key) {
  const index = todoItems.findIndex(item => item.id === Number(key));
  const todo = {
    deleted: true,
    ...todoItems[index]
  };
  todoItems = todoItems.filter(item => item.id !== Number(key));
  renderTodo(todo);
}

const form = document.querySelector('.js-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const input = document.querySelector('.js-todo-input');

  const text = input.value.trim();
  if (text !== '') {
    addTodo(text);
    input.value = '';
    input.focus();
  }
});

const list = document.querySelector('.js-todo-list');
list.addEventListener('click', event => {
  if (event.target.classList.contains('js-tick')) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }
  
  if (event.target.classList.contains('js-delete-todo')) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const ref = localStorage.getItem('todoItems');
  if (ref) {
    todoItems = JSON.parse(ref);
    todoItems.forEach(t => {
      renderTodo(t);
    });
  }
});

// When the user scrolls down 25px from the top of the document, resize the header's font size--Header//
  window.onscroll = function() {scrollFunction()};
  
  function scrollFunction() {
    if (document.body.scrollTop > 15 || document.documentElement.scrollTop > 15) {
      document.getElementById("headereffect").style.fontSize = "55px";
      document.getElementById("headereffect").style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
      document.getElementById("input").style.width = "70%";
      document.getElementById("input").style.height = "20px";
      document.getElementById("input").style.fontSize = "18px";
      document.getElementById("headereffect").style.height = "170px";
      document.getElementById("clock").style.fontSize = "15px";
      document.getElementById("clock").style.letterSpacing = "0px";
      document.getElementById("date").style.fontSize = "15px";
      document.getElementById("date").style.letterSpacing = "0px";
      document.getElementById("topBtn").style.right = "30px";
    } else {
      document.getElementById("headereffect").style.fontSize = "90px";
      document.getElementById("headereffect").style.boxShadow = "";
      document.getElementById("input").style.width = "90%";
      document.getElementById("input").style.height = "27px";
      document.getElementById("input").style.fontSize = "25px";
      document.getElementById("headereffect").style.height = "220px";
      document.getElementById("clock").style.fontSize = "18px";
      document.getElementById("clock").style.letterSpacing = "1px";
      document.getElementById("date").style.fontSize = "18px";
      document.getElementById("date").style.letterSpacing = "1px";
      document.getElementById("topBtn").style.right = "-60px";
  }
}

//Clock
var clock = (function(){
  'use-strict';
  return {
      // new date
      now: new Date(),
      // short selector
      _: function(e){
          return document.querySelector(e);
      },
      // check time
      checkTime: function(a){
          return (((a < 10) ? "0" : "") + a);
      },
      // show date
      showDate: function(){
          // if exists
          if (this._("#date")) {
              // days
              var days = [
                  'Sunday', 'Monday',
                  'Tuesday', 'Wednesday',
                  'Thursday', 'Friday', 
                  'Saturday'
              ];
              // months
              var months = [
                  'January', 'February', 'March', 
                  'April', 'May', 'June', 
                  'July', 'August', 'September', 
                  'October', 'November', 'December'
              ];
              // show html
              this._("#date").innerHTML = 
                  days[this.now.getDay()] + " " +
                  this.checkTime(this.now.getDate()) + " " +
                  months[this.now.getMonth()] + " " +
                  this.now.getFullYear();
          }
      },
      // new clock
      newClock: function(){
          var self = clock;// this not work :(
          var now = new Date();
          // show html clock
          self._("#clock").innerHTML = 
          self.checkTime(now.getHours()) + 
          ":" + 
          self.checkTime(now.getMinutes()) + 
          ":" + 
          self.checkTime(now.getSeconds());
      },
      // init clock and date
      init: function(){
          var self = this;
          setInterval(this.newClock,1000);
          this.showDate();
      }
  };
})();
clock.init();


//Menu
function openNav() {
  document.getElementById("mySidebar").style.width = "450px";
  document.getElementById("slide").style.marginLeft = "0px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("slide").style.marginLeft= "0px";
}

//Calender
(function (global) {

    "use strict";

    var
        //this will be used by the user.
        dycalendar = {},

        //window document
        document = global.document,

        //starting year
        START_YEAR = 1900,

        //end year
        END_YEAR = 9999,

        //name of the months
        monthName = {
            full: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            mmm: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },

        //name of the days
        dayName = {
            full: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            d: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            dd: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            ddd: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        };

    /**
     * this function will create month table.
     *
     * @param object data   this contains the calendar data
     * @param object option this is the settings object
     * @return html
     */
    function createMonthTable(data, option) {

        var
            table, tr, td,
            r, c, count;

        table = document.createElement("table");
        tr = document.createElement("tr");

        //create 1st row for the day letters
        for (c = 0; c <= 6; c = c + 1) {
            td = document.createElement("td");
            td.innerHTML = "SMTWTFS"[c];
            tr.appendChild(td);
        }
        table.appendChild(tr);

        //create 2nd row for dates
        tr = document.createElement("tr");

        //blank td
        for (c = 0; c <= 6; c = c + 1) {
            if (c === data.firstDayIndex) {
                break;
            }
            td = document.createElement("td");
            tr.appendChild(td);
        }

        //remaing td of dates for the 2nd row
        count = 1;
        while (c <= 6) {
            td = document.createElement("td");
            td.innerHTML = count;
            if (data.today.date === count && data.today.monthIndex === data.monthIndex && option.highlighttoday === true) {
                td.setAttribute("class", "dycalendar-today-date");
            }
            if (option.date === count && option.month === data.monthIndex && option.highlighttargetdate === true) {
                td.setAttribute("class", "dycalendar-target-date");
            }
            tr.appendChild(td);
            count = count + 1;
            c = c + 1;
        }
        table.appendChild(tr);

        //create remaining rows
        for (r = 3; r <= 7; r = r + 1) {
            tr = document.createElement("tr");
            for (c = 0; c <= 6; c = c + 1) {
                if (count > data.totaldays) {
                    table.appendChild(tr);
                    return table;
                }
                td = document.createElement('td');
                td.innerHTML = count;
                if (data.today.date === count && data.today.monthIndex === data.monthIndex && option.highlighttoday === true) {
                    td.setAttribute("class", "dycalendar-today-date");
                }
                if (option.date === count && option.month === data.monthIndex && option.highlighttargetdate === true) {
                    td.setAttribute("class", "dycalendar-target-date");
                }
                count = count + 1;
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }

        return table;
    }

    /**
     * this function will draw Calendar Month Table
     *
     * @param object data   this contains the calendar data
     * @param object option this is the settings object
     * @return html
     */
    function drawCalendarMonthTable(data, option) {

        var
            table,
            div, container, elem;

        //get table
        table = createMonthTable(data, option);

        //calendar container
        container = document.createElement("div");
        container.setAttribute("class", "dycalendar-month-container");

        //-------------------------- Header ------------------

        //header div
        div = document.createElement("div");
        div.setAttribute("class", "dycalendar-header");
        div.setAttribute("data-option", JSON.stringify(option));

        //prev button
        if (option.prevnextbutton === "show") {
            elem = document.createElement("span");
            elem.setAttribute("class", "dycalendar-prev-next-btn prev-btn");
            elem.setAttribute("data-date", option.date);
            elem.setAttribute("data-month", option.month);
            elem.setAttribute("data-year", option.year);
            elem.setAttribute("data-btn", "prev");
            elem.innerHTML = "&lt;";
            //add prev button span to header div
            div.appendChild(elem);
        }

        //month span
        elem = document.createElement("span");
        elem.setAttribute("class", "dycalendar-span-month-year");
        if (option.monthformat === "mmm") {
            elem.innerHTML = data.monthName + " " + data.year;
        } else if (option.monthformat === "full") {
            elem.innerHTML = data.monthNameFull + " " + data.year;
        }

        //add month span to header div
        div.appendChild(elem);

        //next button
        if (option.prevnextbutton === "show") {
            elem = document.createElement("span");
            elem.setAttribute("class", "dycalendar-prev-next-btn next-btn");
            elem.setAttribute("data-date", option.date);
            elem.setAttribute("data-month", option.month);
            elem.setAttribute("data-year", option.year);
            elem.setAttribute("data-btn", "next");
            elem.innerHTML = "&gt;";
            //add prev button span to header div
            div.appendChild(elem);
        }

        //add header div to container
        container.appendChild(div);

        //-------------------------- Body ------------------

        //body div
        div = document.createElement("div");
        div.setAttribute("class", "dycalendar-body");
        div.appendChild(table);

        //add body div to container div
        container.appendChild(div);

        //return container
        return container;
    }

    /**
     * this function will draw Calendar Day
     *
     * @param object data   this contains the calendar data
     * @param object option this is the settings object
     * @return html
     */
    function drawCalendarDay(data, option) {

        var
            div, container, elem;

        //calendar container
        container = document.createElement("div");
        container.setAttribute("class", "dycalendar-day-container");

        //-------------------------- Header ------------------

        //header div
        div = document.createElement("div");
        div.setAttribute("class", "dycalendar-header");

        //day span
        elem = document.createElement("span");
        elem.setAttribute("class", "dycalendar-span-day");
        if (option.dayformat === "ddd") {
            elem.innerHTML = dayName.ddd[data.targetedDayIndex];
        } else if (option.dayformat === "full") {
            elem.innerHTML = dayName.full[data.targetedDayIndex];
        }

        //add day span to footer div
        div.appendChild(elem);

        //add header div to container
        container.appendChild(div);

        //-------------------------- Body ------------------

        //body div
        div = document.createElement("div");
        div.setAttribute("class", "dycalendar-body");

        //date span
        elem = document.createElement("span");
        elem.setAttribute("class", "dycalendar-span-date");
        elem.innerHTML = data.date;

        //add date span to body div
        div.appendChild(elem);

        //add body div to container
        container.appendChild(div);

        //-------------------------- Footer ------------------

        //footer div
        div = document.createElement("div");
        div.setAttribute("class", "dycalendar-footer");

        //month span
        elem = document.createElement("span");
        elem.setAttribute("class", "dycalendar-span-month-year");
        if (option.monthformat === "mmm") {
            elem.innerHTML = data.monthName + " " + data.year;
        } else if (option.monthformat === "full") {
            elem.innerHTML = data.monthNameFull + " " + data.year;
        }

        //add month span to footer div
        div.appendChild(elem);

        //add footer div to container
        container.appendChild(div);

        //return container
        return container;
    }

    /**
     * this function will extend source object with defaults object.
     *
     * @param object source     this is the source object
     * @param object defaults   this is the default object
     * @return object
     */
    function extendSource(source, defaults) {
        var property;
        for (property in defaults) {
            if (source.hasOwnProperty(property) === false) {
                source[property] = defaults[property];
            }
        }
        return source;
    }

    /**
     * This function will return calendar detail.
     *
     * @param integer year        1900-9999 (optional) if not set will consider
     *                          the current year.
     * @param integer month        0-11 (optional) 0 = Jan, 1 = Feb, ... 11 = Dec,
     *                          if not set will consider the current month.
     * @param integer date      1-31 (optional)
     * @return boolean|object    if error return false, else calendar detail
     */
    function getCalendar(year, month, date) {

        var
            dateObj = new Date(),
            dateString,
            result = {},
            idx;

        if (year < START_YEAR || year > END_YEAR) {
            global.console.error("Invalid Year");
            return false;
        }
        if (month > 11 || month < 0) {
            global.console.error("Invalid Month");
            return false;
        }
        if (date > 31 || date < 1) {
            global.console.error("Invalid Date");
            return false;
        }

        result.year = year;
        result.month = month;
        result.date = date;

        //today
        result.today = {};
        dateString = dateObj.toString().split(" ");

        idx = dayName.ddd.indexOf(dateString[0]);
        result.today.dayIndex = idx;
        result.today.dayName = dateString[0];
        result.today.dayFullName = dayName.full[idx];

        idx = monthName.mmm.indexOf(dateString[1]);
        result.today.monthIndex = idx;
        result.today.monthName = dateString[1];
        result.today.monthNameFull = monthName.full[idx];

        result.today.date = dateObj.getDate();

        result.today.year = dateString[3];

        //get month-year first day
        dateObj.setDate(1);
        dateObj.setMonth(month);
        dateObj.setFullYear(year);
        dateString = dateObj.toString().split(" ");

        idx = dayName.ddd.indexOf(dateString[0]);
        result.firstDayIndex = idx;
        result.firstDayName = dateString[0];
        result.firstDayFullName = dayName.full[idx];

        idx = monthName.mmm.indexOf(dateString[1]);
        result.monthIndex = idx;
        result.monthName = dateString[1];
        result.monthNameFull = monthName.full[idx];

        //get total days for the month-year
        dateObj.setFullYear(year);
        dateObj.setMonth(month + 1);
        dateObj.setDate(0);
        result.totaldays = dateObj.getDate();

        //get month-year targeted date
        dateObj.setFullYear(year);
        dateObj.setMonth(month);
        dateObj.setDate(date);
        dateString = dateObj.toString().split(" ");

        idx = dayName.ddd.indexOf(dateString[0]);
        result.targetedDayIndex = idx;
        result.targetedDayName = dateString[0];
        result.targetedDayFullName = dayName.full[idx];

        return result;

    }

    /**
     * this function will handle the on click event.
     */
    function onClick() {

        document.body.onclick = function (e) {

            //get event object (window.event for IE compatibility)
            e = global.event || e;

            var
                //get target dom object reference
                targetDomObject = e.target || e.srcElement,

                //other variables
                date, month, year, btn, option, dateObj;

            //prev-next button click
            //extra checks to make sure object exists and contains the class of interest
            if ((targetDomObject) && (targetDomObject.classList) && (targetDomObject.classList.contains("dycalendar-prev-next-btn"))) {
                date = parseInt(targetDomObject.getAttribute("data-date"));
                month = parseInt(targetDomObject.getAttribute("data-month"));
                year = parseInt(targetDomObject.getAttribute("data-year"));
                btn = targetDomObject.getAttribute("data-btn");
                option = JSON.parse(targetDomObject.parentElement.getAttribute("data-option"));

                if (btn === "prev") {
                    month = month - 1;
                    if (month < 0) {
                        year = year - 1;
                        month = 11;
                    }
                }
                else if (btn === "next") {
                    month = month + 1;
                    if (month > 11) {
                        year = year + 1;
                        month = 0;
                    }
                }

                option.date = date;
                option.month = month;
                option.year = year;

                drawCalendar(option);
            }

            //month click
            //extra checks to make sure object exists and contains the class of interest
            if ((targetDomObject) && (targetDomObject.classList) && (targetDomObject.classList.contains("dycalendar-span-month-year"))) {
                option = JSON.parse(targetDomObject.parentElement.getAttribute("data-option"));
                dateObj = new Date();

                option.date = dateObj.getDate();
                option.month = dateObj.getMonth();
                option.year = dateObj.getFullYear();

                drawCalendar(option);
            }
        };
    }

    //------------------------------ dycalendar.draw() ----------------------

    /**
     * this function will draw the calendar based on user preferences.
     *
     * option = {
     *  target : "#id|.class"   //(mandatory) for id use #id | for class use .class
     *  type : "calendar-type"  //(optional) values: "day|month" (default "day")
     *  month : "integer"       //(optional) value 0-11, where 0 = January, ... 11 = December (default current month)
     *  year : "integer"        //(optional) example 1990. (default current year)
     *  date : "integer"        //(optional) example 1-31. (default current date)
     *  monthformat : "full"    //(optional) values: "mmm|full" (default "full")
     *  dayformat : "full"      //(optional) values: "ddd|full" (default "full")
     *  highlighttoday : boolean    //(optional) (default false) if true will highlight today's date
     *  highlighttargetdate : boolean   //(optional) (default false) if true will highlight targeted date of the month year
     *  prevnextbutton : "hide"         //(optional) (default "hide") (values: "show|hide") if set to "show" it will show the nav button (prev|next)
     * }
     *
     * @param object option     user preferences
     * @return boolean          true if success, false otherwise
     */
    dycalendar.draw = function (option) {

        //check if option is passed or not
        if (typeof option === "undefined") {
            global.console.error("Option missing");
            return false;
        }

        var
            self = this,    //pointing at dycalendar object

            dateObj = new Date(),

            //default settings
            defaults = {
                type: "day",
                month: dateObj.getMonth(),
                year: dateObj.getFullYear(),
                date: dateObj.getDate(),
                monthformat: "full",
                dayformat: "full",
                highlighttoday: false,
                highlighttargetdate: false,
                prevnextbutton: "hide"
            };

        //extend user options with predefined options
        option = extendSource(option, defaults);

        drawCalendar(option);

    };

    //------------------------------ dycalendar.draw() ends here ------------

    /**
     * this function will draw the calendar inside the target container.
     */
    function drawCalendar(option) {

        var
            //variables for creating calendar
            calendar,
            calendarHTML,
            targetedElementBy = "id",
            targetElem,

            //other variables
            i, len, elemArr;

        //find target element by
        if (option.target[0] === "#") {
            targetedElementBy = "id";
        } else if (option.target[0] === ".") {
            targetedElementBy = "class";
        }
        targetElem = option.target.substring(1);

        //get calendar HTML
        switch (option.type) {
            case "day":
                //get calendar detail
                calendar = getCalendar(option.year, option.month, option.date);
                //get calendar html
                calendarHTML = drawCalendarDay(calendar, option);
                break;

            case "month":
                //get calendar detail
                calendar = getCalendar(option.year, option.month, option.date);
                //get calendar html
                calendarHTML = drawCalendarMonthTable(calendar, option);
                break;

            default:
                global.console.error("Invalid type");
                return false;
        }

        //draw calendar
        if (targetedElementBy === "id") {

            document.getElementById(targetElem).innerHTML = calendarHTML.outerHTML;

        } else if (targetedElementBy === "class") {

            elemArr = document.getElementsByClassName(targetElem);
            for (i = 0, len = elemArr.length; i < len; i = i + 1) {
                elemArr[i].innerHTML = calendarHTML.outerHTML;
            }

        }
    }

    //events
    onClick();

    //attach to global window object
    global.dycalendar = dycalendar;

}(typeof window !== "undefined" ? window : this));

dycalendar.draw({
    target:'#calendar',
    type:'month',
    dayformat:'full',
    monthformat:'full',
    highlighttargetdate:true,
    prevnextbutton:'show'

})

//Keyboard Shortcuts
document.onkeydown = function(e) {
    switch (e.keyCode) {
         case 39:         /*'m' for opening calender*/
            openNav();
            break;
        case 37:         /*'esc' for closing calender*/
            closeNav(); 
            break;
    }
};
