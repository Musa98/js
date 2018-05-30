'use strict';

/**************************************************************************************************
 *                                                                                                *
 * Пожалуйста, прочтите информацию по ссылкам перед выполнением заданий:                                 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling  *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration              *
 *                                                                                                *
 **************************************************************************************************/


/**
 * Возврщает 'Fizz','Buzz' или начальное число согласно следеющим правилам:
 * 1) если не подпадает под следйющте правила вернуть начальное число
 * 2) число делится нацело на 3 вернуть 'Fizz'
 * 3) число кратно 5 вернуть 'Buzz'
 * 4) если число кратно 3 и 5 одновременно вернуть 'FizzBuzz'
 *
 * @param {number} num
 * @return {any}
 *
 * @example
 *   2 =>  2
 *   3 => 'Fizz'
 *   5 => 'Buzz'
 *   4 => 4
 *  15 => 'FizzBuzz'
 *  20 => 'Buzz'
 *  21 => 'Fizz'
 *
 */
function getFizzBuzz(num) {
	if ((num % 3 === 0) && (num % 5 === 0)) { 
		return 'FizzBuzz'; 
	} else if (num % 3 === 0) { 
		return 'Fizz'; 
	} else if (num % 5 === 0) { 
		return 'Buzz'; 
	} else { 
		return num; 
	}
}


/**
 * Возвращает факториал переданного целого числа n.
 *
 * @param {number} n
 * @return {number}
 *
 * @example:
 *   1  => 1
 *   5  => 120
 *   10 => 3628800
 */
function getFactorial(n) {
	let result = 1;
    for (let i = 1; i <= n; i++) {
    	result *= i;
    }
    return result;
}


/**
 * Возвращается сумму целых чисел в промежутке между переданными числами, включая их
 *
 * @param {number} n1
 * @param {number} n2
 * @return {number}
 *
 * @example:
 *   1,2   =>  3  ( = 1+2 )
 *   5,10  =>  45 ( = 5+6+7+8+9+10 )
 *   -1,1  =>  0  ( = -1 + 0 + 1 )
 */
function getSumBetweenNumbers(n1, n2) {
	let sum = 0;
    for(let i = n1; i <= n2; i++){
    	sum += i;
    }
    return sum;
}


/**
 * Возвращает true, если с помощью трех переданных длин сторон a,b,c можно
 * посроить треугольник, если нет - false
 *
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {bool}
 *
 * @example:
 *   1,2,3    =>  false
 *   3,4,5    =>  true
 *   10,1,1   =>  false
 *   10,10,10 =>  true
 */
function isTriangle(a,b,c) {
    return (a + b > c) && (a + c > b) && (c + b > a) ? true : false;
}


/**
 * Возвращает true, если 2 определенных прямоуголника перекрываются, если нет false.
 * Каждый прямоуголник представлен обьектом
 *  {
 *     top: 5,
 *     left: 5,
 *     width: 20,
 *     height: 10
 *  }
 *
 *  (5;5)
 *     -------------
 *     |           |
 *     |           |  height = 10
 *     -------------
 *        width=20
 *
 * NOTE: Пожлауйтса используйте принцип задания координат для canvas (https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#The_grid),
 * этот способ отличается от декартовой системы координат.
 *
 * @param {object} rect1
 * @param {object} rect2
 * @return {bool}
 *
 * @example:
 *   { top: 0, left: 0, width: 10, height: 10 },
 *   { top: 5, left: 5, width: 20, height: 20 }    =>  true
 *
 *   { top: 0, left: 0, width: 10, height: 10 },
 *   { top:20, left:20, width: 20, height: 20 }    =>  false
 *
 */
function doRectanglesOverlap(rect1, rect2) {
	return (rect1.top < rect2.top + rect2.height) &&
        (rect2.top < rect1.top + rect1.height) &&
        (rect1.left < rect2.left + rect2.width) &&
        (rect2.left < rect1.left + rect1.width);
}


/**
 * Возвращает true если точка лежим в пределах круга, если нет то false
 * Круг представляет собой объект:
 *  {
 *     center: {
 *       x: 5,
 *       y: 5
 *     },
 *     radius: 20
 *  }
 *
 * Точка представляет собой объект:
 *  {
 *     x: 5,
 *     y: 5
 *  }
 *
 * @param {object} circle
 * @param {object} point
 * @return {bool}
 *
 * @example:
 *   { center: { x:0, y:0 }, radius:10 },  { x:0, y:0 }     => true
 *   { center: { x:0, y:0 }, radius:10 },  { x:10, y:10 }   => false
 *
 */
function isInsideCircle(circle, point) {
	let dx = circle.center.x - point.x;
	let dy = circle.center.y - point.y;
	return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) < circle.radius ? true : false;
}


/**
 * Возврщает первый неповторяющийся символ в строке, если его нет то возвращает null.
 *
 * @param {string} str
 * @return {string}
 *
 * @example:
 *   'The quick brown fox jumps over the lazy dog' => 'T'
 *   'abracadabra'  => 'c'
 *   'entente' => null
 */
function findFirstSingleChar(str) {
    let isSingle;
	for (let i = 0; i < str.length; i++) {
		isSingle = true;
		for (let j = 0 ; j < str.length; j++) {
			if ((str[i] === str[j]) && (i !== j)) {
				isSingle = false;
				break;
			}
		}
		if (isSingle) {
			return str[i];
		}
	}
	return null;
}


/**
 * Возвращает интервальную строку по 2 определенным числам и (включить / исключить) критериям.
 * Подробное описание задачи: https://en.wikipedia.org/wiki/Interval_(mathematics)
 *
 * Обратите внимание на то, что меньшее число должно идти первым в описании
 *
 * @param {number} a
 * @param {number} b
 * @param {bool} isStartIncluded
 * @param {bool} isEndIncluded
 * @return {string}
 *
 * @example
 *   0, 1, true, true   => '[0, 1]'
 *   0, 1, true, false  => '[0, 1)'
 *   0, 1, false, true  => '(0, 1]'
 *   0, 1, false, false => '(0, 1)'
 * меньшее число должно быть впереди :
 *   5, 3, true, true   => '[3, 5]'
 *
 */
function getIntervalString(a, b, isStartIncluded, isEndIncluded) {
	let first, second;
	if (a < b) {
		first = a;
		second = b;
	} else {
		first = b; 
		second = a;
	}
	let start = isStartIncluded ? '[' : '(';
	let end = isEndIncluded ? ']' : ')';
	return start + first + ', ' + second + end;
}


/**
 * Переворачивает переданную строку (ставит все символы строки в обратном порядке)
 *
 * @param {string} str
 * @return {string}
 *
 * @example:
 * 'The quick brown fox jumps over the lazy dog' => 'god yzal eht revo spmuj xof nworb kciuq ehT'
 * 'abracadabra' => 'arbadacarba'
 * 'rotator' => 'rotator'
 * 'noon' => 'noon'
 */
function reverseString(str) {
    let result = '';
    for(let i = str.length - 1; i >= 0; i--) {
    	result = result.concat(str[i]);
    }
    return result;
}


/**
 * Переворачивает переданное целое число (ставит все цифры числа в обратном порядке)
 *
 * @param {number} num
 * @return {number}
 *
 * @example:
 *   12345 => 54321
 *   1111  => 1111
 *   87354 => 45378
 *   34143 => 34143
 */
function reverseInteger(num) {
    let str = num.toString();
    let result = '';
    for(let i = str.length - 1; i >= 0; i--) {
    	result = result.concat(str[i]);
    }
    return result;
    //return reverseString(num.toString());    
}


/**
 * Проверяет на валидность CCN (credit card number) и возвращает true если CCN валиден
 * и возвращает false в противном случае.
 *
 * Описание алгоритма по ссылке : https://en.wikipedia.org/wiki/Luhn_algorithm
 *
 * @param {number} cnn
 * @return {boolean}
 *
 * @example:
 *   79927398713      => true
 *   4012888888881881 => true
 *   5123456789012346 => true
 *   378282246310005  => true
 *   371449635398431  => true
 *
 *   4571234567890111 => false
 *   5436468789016589 => false
 *   4916123456789012 => false
 */
function isCreditCardNumber(ccn) {
	let ccnString = ccn.toString();
    let sum = Number(ccnString[ccnString.length-1]);
    let nDigits = ccnString.length;
    let parity = nDigits % 2;
    for (let i = 0; i < nDigits - 1; i++) {
        let digit = Number(ccnString[i]);
        if (i % 2 === parity) {
            digit *= 2;
        }
        if (digit > 9) {
            digit -= 9;
        }
        sum += digit;
    }
    return (sum % 10) === 0;
}


/**
 * Возвращает сумму всех цифр переданного чила след. образом:
 *   step1 : найти сумму всех цифр исходного числа
 *   step2 : если сумма на step1 больше 9 нужно проделать step1 с полученной суммой
 *
 * @param {number} n
 * @return {number}
 *
 * @example:
 *   12345 ( 1+2+3+4+5 = 15, 1+5 = 6) => 6
 *   23456 ( 2+3+4+5+6 = 20, 2+0 = 2) => 2
 *   10000 ( 1+0+0+0+0 = 1 ) => 1
 *   165536 (1+6+5+5+3+6 = 26,  2+6 = 8) => 8
 */
function getDigitalRoot(num) {
	let sum = 0;
    for (let i = 0; i < num.toString().length; i++) {
    	sum += Number(num.toString()[i]);
    	if (sum > 9) {
    		let newSum = 0;
    		for (let j = 0; j < sum.toString().length; j++) {
    			newSum += Number(sum.toString()[j]);
    		}
    		sum = newSum;
    	}
    };
    return sum;
}


/**
 * Возвращает true если переданная строка представляет собой правильную скобочную
 * структура, если нет - false
 * Правильная скобочная структура состоит из соответствующих закрывающихся,
 * открывающихся фигурных скобок, стоящих на соответствующих местях.
 * Скобочная последовательность может содержать:  [],(),{},<>
 *
 * @param {string} str
 * @return {boolean}
 *
 * @example:
 *   '' => true
 *   '[]'  => true
 *   '{}'  => true
 *   '()   => true
 *   '[[]' => false
 *   ']['  => false
 *   '[[][][[]]]' => true
 *   '[[][]][' => false
 *   '{)' = false
 *   '{[(<{[]}>)]}' = true
 */
function isBracketsBalanced(str) {
	let dest = Array();
	let dictionary = {
		'>': '<' ,
		'}': '{' ,
		')': '(' ,
		']': '[' ,
	};
	for (let i = 0 ; i < str.length ; i++) {
		switch (str[i]) {
			case '<':
			case '[':
			case '{':
			case '(':
				dest.push(str[i]);
				break;
			case '>':
			case ']':
			case '}':
			case ')':
				if ((dest.length > 0) && (dest[dest.length - 1] === dictionary[str[i]])) {
					dest.pop();
				} else {
					return false;
				}
				break;
		}
	}
	return dest.length === 0 ;
}


/**
 * Возвращает строку, составленной на основе периода от переданного начала и конца периода
 * Конечная строка должна удовлетворять следующим правилам:
 *
 * ---------------------------------------------------------------------
 *   Difference                 |  Result
 * ---------------------------------------------------------------------
 *    0 to 45 seconds           |  a few seconds ago
 *   45 to 90 seconds           |  a minute ago
 *   90 seconds to 45 minutes   |  2 minutes ago ... 45 minutes ago
 *   45 to 90 minutes           |  an hour ago
 *  90 minutes to 22 hours      |  2 hours ago ... 22 hours ago
 *  22 to 36 hours              |  a day ago
 *  36 hours to 25 days         |  2 days ago ... 25 days ago
 *  25 to 45 days               |  a month ago
 *  45 to 345 days              |  2 months ago ... 11 months ago
 *  345 to 545 days (1.5 years) |  a year ago
 *  546 days+                   |  2 years ago ... 20 years ago
 * ---------------------------------------------------------------------
 *
 * @param {Date} startDate
 * @param {Date} endDate
 * @return {string}
 *
 * @example
 *   Date('2000-01-01 01:00:00.100'), Date('2000-01-01 01:00:00.200')  => 'a few seconds ago'
 *   Date('2000-01-01 01:00:00.100'), Date('2000-01-01 01:00:05.000')  => '5 minutes ago'
 *   Date('2000-01-01 01:00:00.100'), Date('2000-01-02 03:00:05.000')  => 'a day ago'
 *   Date('2000-01-01 01:00:00.100'), Date('2015-01-02 03:00:05.000')  => '15 years ago'
 *
 */
function timespanToHumanString(startDate, endDate) {
    let interval = endDate - startDate,
		seconds = interval / 1000, 
		minutes = interval / 60000, 
		hours = interval / 3600000, 
		days = interval / 86400000;

	if (seconds <= 45) {
		return 'a few seconds ago';
	} else if (seconds <= 90) {
		return 'a minute ago';
	} else if (minutes <= 45) {
		return new String((seconds % 60 <= 30) ? Math.floor(minutes) : Math.ceil(minutes)).concat(' minutes ago');
	} else if (minutes <= 90) {
		return 'an hour ago';
	} else if (hours <= 22) {
		return new String((minutes % 60 <= 30) ? Math.floor(hours) : Math.ceil(hours)).concat(' hours ago');
	} else if (hours <= 36) {
		return 'a day ago';
	} else if (days <= 25) {
		return new String((hours % 24 <= 12) ? Math.floor(days) :  Math.ceil(days)).concat(' days ago');
	} else if (days <= 45) {
		return 'a month ago';
	} else if (days <= 345) {
		return new String(Math.round(days / 30)).concat(' months ago');
	} else if (days <= 545) {
		return 'a year ago';
	} else {
		return new String(Math.round(days / 365.25)).concat(' years ago');
	}
}

/**
 * Вернуть строку с представление числа в n-ой (бинарной, десятичной, и т.д., где n<=10) системе исчисления.
 * Более подробное описание
 * https://en.wikipedia.org/wiki/Binary_number
 * https://en.wikipedia.org/wiki/Ternary_numeral_system
 * https://en.wikipedia.org/wiki/Radix
 *
 * @param {number} num
 * @param {number} n, radix of the result
 * @return {string}
 *
 * @example:
 *   1024, 2  => '10000000000'
 *   6561, 3  => '100000000'
 *    365, 2  => '101101101'
 *    365, 3  => '111112'
 *    365, 4  => '11231'
 *    365, 10 => '365'
 */
function toNaryString(num, n) {
	let remain = num;
	let digit;
	let result = Array();
	while (remain > 0) {
		digit = remain % n;
		result.unshift(digit);
		remain = Math.floor(remain / n);
	}	
	return result.join('');
}


/**
 * Возбращает общий путь к директории из всех путей переданных в массиве
 *
 * @param {array} pathes
 * @return {string}
 *
 * @example:
 *   ['/web/images/image1.png', '/web/images/image2.png']  => '/web/images/'
 *   ['/web/assets/style.css', '/web/scripts/app.js',  'home/setting.conf'] => ''
 *   ['/web/assets/style.css', '/.bin/mocha',  '/read.me'] => '/'
 *   ['/web/favicon.ico', '/web-scripts/dump', '/webalizer/logs'] => '/'
 */
function getCommonDirectoryPath(pathes) {
	let dirs = Array(pathes.length);
    for (let i = 0; i < pathes.length; i++) {
    	dirs[i] = pathes[i].split('/');
    }
    let commonPath = '';
    for (let i = 0; i < dirs[0].length; i++) {
    	for (let j = 1; j < dirs.length; j++) {
    		if (dirs[0][i] != dirs[j][i]) {
    			return commonPath;
    		}
    	}
    	commonPath = commonPath.concat(dirs[0][i], '/');
    }
    return commonPath;
}


/**
 * Возвращает произведение двух переданных матриц.
 * Более подробное описание: https://en.wikipedia.org/wiki/Matrix_multiplication
 *
 * @param {array} m1
 * @param {array} m2
 * @return {array}
 *
 * @example:
 *   [[ 1, 0, 0 ],       [[ 1, 2, 3 ],           [[ 1, 2, 3 ],
 *    [ 0, 1, 0 ],   X    [ 4, 5, 6 ],     =>     [ 4, 5, 6 ],
 *    [ 0, 0, 1 ]]        [ 7, 8, 9 ]]            [ 7, 8, 9 ]]
 *
 *                        [[ 4 ],
 *   [[ 1, 2, 3]]    X     [ 5 ],          =>     [[ 32 ]]
 *                         [ 6 ]]
 *
 */
function getMatrixProduct(m1, m2) {
    let result = Array(m1.length);
    for (let i = 0; i < result.length; i++) {
    	result[i] = Array(m2[0].length);
    }
    for (let i = 0; i < result.length; i++) {
    	for (let j = 0; j < result[0].length; j++) {
    		result[i][j] = 0;
    		for (let k = 0; k < m2.length; k++) {
    			result[i][j] += (m1[i][k] * m2[k][j]);
    		}
    	}
    }
    return result;
}


/**
 * Возвращает результат игры крестики-нолики для текущих позиций 'X', 'O'
 * Более подробное описание: https://en.wikipedia.org/wiki/Tic-tac-toe
 *
 * Позиции X и O представлены в виде матрицы 3x3 cо значениями: 'X','0', undefined
 * Функция должна возвращать победиля игры по текущей позиции.
 * Результат должен быть в виде: 'X' или '0' или undefined
 *
 * @param {array} position
 * @return {string}
 *
 * @example
 *
 *   [[ 'X',   ,'0' ],
 *    [    ,'X','0' ],       =>  'X'
 *    [    ,   ,'X' ]]
 *
 *   [[ '0','0','0' ],
 *    [    ,'X',    ],       =>  '0'
 *    [ 'X',   ,'X' ]]
 *
 *   [[ '0','X','0' ],
 *    [    ,'X',    ],       =>  undefined
 *    [ 'X','0','X' ]]
 *
 *   [[    ,   ,    ],
 *    [    ,   ,    ],       =>  undefined
 *    [    ,   ,    ]]
 *
 */
function evaluateTicTacToePosition(position) {

    const values = [
	    '0', 'X'  
	];

	const matrixSize = 3;

	let result = undefined;
	//result = values[v];

	for(let v = 0; v < values.length; v++) {
		for (let i = 0; i < matrixSize; i++) {
			for (let j = 0; j < matrixSize; j++) {
				if (position[i][j] !== values[v]) { break; }
				if (j === (matrixSize - 1)) { result = values[v]; }
			}
		}
		for (let j = 0; j < matrixSize; j++) {
			for (let i = 0; i < matrixSize; i++) {
				if (position[i][j] !== values[v]) { break; }
				if (i === (matrixSize - 1)) { result = values[v]; }
			}
		}
		for (let j = 0; j < matrixSize; j++) {
			if (position[j][j] !== values[v]) { break; }
			if (j === (matrixSize - 1)) { result = values[v]; }
		}
		for (let j = 0; j < matrixSize; j++) {
			if (position[j][matrixSize - j - 1] !== values[v]) { break; }
			if (j === (matrixSize - 1)) { result = values[v]; }
		}
		if (result !== undefined) { break; }
	}
	return result;
}


module.exports = {
    getFizzBuzz: getFizzBuzz,
    getFactorial: getFactorial,
    getSumBetweenNumbers: getSumBetweenNumbers,
    isTriangle: isTriangle,
    doRectanglesOverlap: doRectanglesOverlap,
    isInsideCircle: isInsideCircle,
    findFirstSingleChar: findFirstSingleChar,
    getIntervalString : getIntervalString,
    reverseString: reverseString,
    reverseInteger: reverseInteger,
    isCreditCardNumber: isCreditCardNumber,
    getDigitalRoot: getDigitalRoot,
    isBracketsBalanced: isBracketsBalanced,
    timespanToHumanString : timespanToHumanString,
    toNaryString: toNaryString,
    getCommonDirectoryPath: getCommonDirectoryPath,
    getMatrixProduct: getMatrixProduct,
    evaluateTicTacToePosition : evaluateTicTacToePosition
};