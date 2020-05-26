// MODEL
var BudgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percenatage = -1;
    };

    Expense.prototype.calcPercentage = function (totalIncome) {
        if (totalIncome > 0) {
            this.percenatage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percenatage = -1;
        }
    }

    Expense.prototype.getPercentage = function () {
        return this.percenatage;
    }

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    function calculateTotal(type) {
        var sum = 0;
        data.allItems[type].forEach(function (curr) {
            sum += curr.value;
        });
        data.totals[type] = sum;
    }

    var tools = new Tools();

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    return {
        addItem: function (type, des, val) {
            var newItem, id;

            if (data.allItems[type].length > 0) {
                id = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                id = 0;
            }

            if (type === 'inc') {
                newItem = new Income(id, des, val);
            } else if (type === 'exp') {
                newItem = new Expense(id, des, val);
            } else {
                // throw some error
            }

            data.allItems[type].push(newItem); // since type === "exp" || type === "inc"
            return newItem;
        },

        deleteItem: function (type, id) {
            var ids = data.allItems[type].map(function (currItem) {
                return currItem.id;
            });
            var index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1)
            }
        },

        calculateBudget: function () {
            calculateTotal('inc');
            calculateTotal('exp');

            data.budget = data.totals.inc - data.totals.exp;
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },

        calculatePercentages: function () {
            data.allItems.exp.forEach(function (currItem) {
                currItem.calcPercentage(data.totals.inc);
            });
        },

        getPercentages: function () {
            var allPercantages = data.allItems.exp.map(function (currItem) {
                return currItem.getPercentage();
            });
            return allPercantages;
        },

        getBudget: function () {
            return tools.clone(data);
        }
    }

})();


// VIEW
var UiController = (function () {
    var tools = new Tools();

    var domClasses = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercentageLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    }

    // Pre ES6, non-generic way to copy objects
    function cloneDomClasses() {
        return {
            inputType: domClasses.inputType,
            inputDescription: domClasses.inputDescription,
            inputValue: domClasses.inputValue,
            inputBtn: domClasses.inputBtn
        }
    }

    function formatNumber(num, type) {
        var numSplit, int, dec, type;
        /*
            + or - before number
            exactly 2 decimal points
            comma separating the thousands

            2310.4567 -> + 2,310.46
            2000 -> + 2,000.00
            */

        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');

        int = numSplit[0];
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3); //input 23510, output 23,510
        }

        dec = numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
    }

    function forEachNodeList(list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    }

    return {
        getInput: function () {
            return {
                type: document.querySelector(domClasses.inputType).value, // will be "exp" or "inc"
                description: document.querySelector(domClasses.inputDescription).value,
                value: parseFloat(document.querySelector(domClasses.inputValue).value)
            }
        },
        addListItem: function (obj, type) {
            var html, element;

            if (type === 'inc') {
                element = domClasses.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div>' +
                    '<div class="right clearfix">' +
                    '<div class="item__value">%value%</div><div class="item__delete">' +
                    '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
                    '</div></div></div>';
            } else if (type === 'exp') {
                element = domClasses.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div>' +
                    '<div class="right clearfix"><div class="item__value">%value%</div>' +
                    '<div class="item__percentage">21%</div> <div class="item__delete">' +
                    '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
                    '</div></div></div>';
            } else {
                // throw some error
            }

            var newHtml = html.replace('%id%', obj.id)
                .replace('%description%', obj.description)
                .replace('%value%', formatNumber(obj.value, type));

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },

        deleteListItem: function (selectorId) {
            var elementToDelete = document.getElementById(selectorId);
            elementToDelete.parentNode.removeChild(elementToDelete);
        },

        clearFields: function () {
            var fields = document.querySelectorAll(domClasses.inputDescription + ', ' + domClasses.inputValue);
            var fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function (current, index, array) {
                current.value = "";
            });
            fields[0].focus();
        },

        displayBudget: function (data) {
            var budget = 0, totalInc = 0, totalExp = 0, percentage = '---';

            if (!tools.isEmpty(data)) {
                budget = data.budget;
                totalInc = data.totals.inc;
                totalExp = data.totals.exp;
                percentage = data.percentage > 0 ? data.percentage + '%' : '---';
            }

            var type = data.budget > 0 ? "inc" : "exp";

            document.querySelector(domClasses.budgetLabel).textContent = formatNumber(budget, type);
            document.querySelector(domClasses.incomeLabel).textContent = formatNumber(totalInc, 'inc');
            document.querySelector(domClasses.expensesLabel).textContent = formatNumber(totalExp, 'exp');
            document.querySelector(domClasses.percentageLabel).textContent = percentage;
        },

        displayPercentages: function (percentages) {
            var fields = document.querySelectorAll(domClasses.expensesPercentageLabel);

            forEachNodeList(fields, function (current, index) {
                current.textContent = percentages[index] > 0 ? percentages[index] + '%' : '---';
            })
        },

        displayDate: function () {
            var now = new Date();
            var year = now.getFullYear();
            var month = now.getMonth();
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            document.querySelector(domClasses.dateLabel).textContent = months[month] + ' ' + year;
        },

        changedType: function () {
            var fields = document.querySelectorAll(domClasses.inputType + ', '
                + domClasses.inputDescription + ', '
                + domClasses.inputValue);

            forEachNodeList(fields, function (current) {
                current.classList.toggle('red-focus');
            });

            document.querySelector(domClasses.inputBtn).classList.toggle('red');
        },

        getDomClasses: function () {
            // return domClasses;
            return tools.clone(domClasses);
            // return cloneDomClasses();
        }
    }

})();

// CONTROLLER
var Controller = (function (budgetController, uiController) {

    function setupEventListeners() {
        var domClasses = uiController.getDomClasses();

        document.querySelector(domClasses.inputBtn).addEventListener('click', addItem);
        document.addEventListener('keypress', function (event) {
            if (event.code === 'Enter') {
                addItem();
            }
        });
        document.querySelector(domClasses.container).addEventListener('click', deleteItem);
        document.querySelector(domClasses.inputType).addEventListener('change', uiController.changedType)
    }

    function updateBudget() {
        budgetController.calculateBudget();
        var budget = budgetController.getBudget();
        uiController.displayBudget(budget);
    }

    function updatePercentages() {
        budgetController.calculatePercentages();
        var percentages = budgetController.getPercentages();
        uiController.displayPercentages(percentages);
    }

    function addItem() {
        // Get user input
        var input = uiController.getInput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // Add item to budgetcontroller
            var newItem = budgetController.addItem(input.type, input.description, input.value);

            // add new item to UI
            uiController.addListItem(newItem, input.type);
            uiController.clearFields();

            // update the budget and percentages
            updateBudget();
            updatePercentages();
        }

    }

    function deleteItem(event) {
        var itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemId) {
            var splitId = itemId.split('-');
            var type = splitId[0];
            var id = parseInt(splitId[1]);

            budgetController.deleteItem(type, id);
            uiController.deleteListItem(itemId);
            updateBudget();
            updatePercentages();
        }
    }

    return {
        init: function () {
            console.log('Application started...');
            uiController.displayBudget({})
            setupEventListeners();
            uiController.displayDate();
        }
    };
})(BudgetController, UiController);

// if this was declared like var Tools = function()... it wouldn't work because hoisting doesn't work for function expressions
// and UiController::tools wouldn't be able to instantiate
function Tools() {
    this.clone = function (obj) {
        return Object.assign({}, obj);
    };

    this.isEmpty = function (obj) {
        for (prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                return false;
            }
        }
        return true;
    };
}

Controller.init();