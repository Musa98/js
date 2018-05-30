'use strict';

/**
 * Возвращает true если слово попадается в заданной головоломке.
 * Каждое слово может быть построено при помощи прохода "змейкой" по таблице вверх, влево, вправо, вниз.
 * Каждый символ может быть использован только один раз ("змейка" не может пересекать себя).
 *
 * @param {array} puzzle
 * @param {array} searchStr
 * @return {bool}
 *
 * @example
 *   var puzzle = [ 
 *      'ANGULAR',
 *      'REDNCAE',
 *      'RFIDTCL',
 *      'AGNEGSA',
 *      'YTIRTSP',
 *   ]; 
 *   'ANGULAR'   => true   (первая строка)
 *   'REACT'     => true   (начиная с верхней правой R и дальше ↓ ← ← ↓)
 *   'UNDEFINED' => true
 *   'RED'       => true
 *   'STRING'    => true
 *   'CLASS'     => true
 *   'ARRAY'     => true   (первая колонка)
 *   'FUNCTION'  => false
 *   'NULL'      => false 
 */
function findStringInSnakingPuzzle(puzzle, searchStr) {

    function within_puzzle(next) {
        if ((next[0] >= 0)
            && (next[1] >= 0)
            && (next[0] < puzzle.length)          
            && (next[1] < puzzle[0].length)
        ) {
            return true;
        }
        return false;
    }

    function rec(excluded) {

        if (searchStr.length === excluded.length) {
            return true;
        }

        let curr_pos = excluded[excluded.length - 1];

        for (let direction of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {

            let next = [curr_pos[0] + direction[0], curr_pos[1] + direction[1]];

            if (within_puzzle(next)
                && !excluded.some(item => (item[0] === next[0]) && (item[1] === next[1]))
                && (puzzle[next[0]][next[1]] === searchStr[excluded.length])
                && rec(excluded.concat([next]))
            ) {
                return true;
            } 
        }
    }

    for (let i = 0; i < puzzle.length; i++) {
        for (let j = 0; j < puzzle[0].length; j++) {
            if ((puzzle[i][j] === searchStr[0]) && rec([[i, j]])) {
                return true;
            }
        }
    }

    return false;
}


/**
 * Возвращает все перестановки заданной строки.
 * Принимаем, что все символы в заданной строке уникальные.
 * Порядок перестановок не имеет значения.
 *
 * @param {string} chars
 * @return {Iterable.<string>} все возможные строки, построенные из символов заданной строки
 *
 * @example
 *    'ab'  => 'ab','ba'
 *    'abc' => 'abc','acb','bac','bca','cab','cba'
 */
function* getPermutations(chars) {

    function* generate_string(string) {
        if (string.length === chars.length) {
            yield string;
        } else {
            for (let i = 0; i < chars.length; i++) {
                if (string.indexOf(chars[i]) < 0) {               
                    yield* generate_string(string + chars[i]);
                }
            }
        }
    }

    yield* generate_string('');
}


/**
 * Возвращает наибольшую прибыль от игры на котировках акций.
 * Цены на акции храняться в массиве в порядке увеличения даты.
 * Прибыль -- это разница между покупкой и продажей.
 * Каждый день вы можете либо купить одну акцию, либо продать любое количество акций, купленных до этого, либо ничего не делать.
 * Таким образом, максимальная прибыль -- это максимальная разница всех пар в последовательности цен на акции.
 *
 * @param {array} quotes
 * @return {number} max profit
 *
 * @example
 *    [ 1, 2, 3, 4, 5, 6]   => 15  (купить по 1,2,3,4,5 и затем продать все по 6)
 *    [ 6, 5, 4, 3, 2, 1]   => 0   (ничего не покупать)
 *    [ 1, 6, 5, 10, 8, 7 ] => 18  (купить по 1,6,5 и затем продать все по 10)
 */
function getMostProfitFromStockQuotes(quotes) {
    let profit = 0;
    while (quotes.length > 0) {
        let current_max = Math.max.apply(null, quotes);
        let current_max_pos = quotes.lastIndexOf(current_max);
        if (current_max_pos === 0) {
            break;
        }
        let items_to_bye = quotes.splice(0, current_max_pos + 1);
        let sum_to_bye = items_to_bye.reduce((a, b) => a + b);
        profit += items_to_bye.length * current_max - sum_to_bye;
    }
    return profit;
}


/**
 * Класс, предосатвляющий метод по сокращению url.
 * Реализуйте любой алгоритм, но не храните ссылки в хранилище пар ключ\значение.
 * Укороченные ссылки должны быть как минимум в 1.5 раза короче исходных.
 *
 * @class
 *
 * @example
 *    
 *     var urlShortener = new UrlShortener();
 *     var shortLink = urlShortener.encode('https://en.wikipedia.org/wiki/URL_shortening');
 *     var original  = urlShortener.decode(shortLink); // => 'https://en.wikipedia.org/wiki/URL_shortening'
 * 
 */
function UrlShortener() {
    this.urlAllowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"+
                           "abcdefghijklmnopqrstuvwxyz"+
                           "0123456789-_.~!*'();:@&=+$,/?#[]";
}

UrlShortener.prototype = {

    encode: function (url) {
        let result = '';
        for (let i = 0; i < url.length; i += 2) {
            let a = url.charCodeAt(i);
            let b = url.charCodeAt(i + 1);
            let code = (a << 8) | b;
            result += String.fromCharCode(code);
        }
        return result;
    },

    decode: function (code) {
        let result = '';
        for (let i = 0; i < code.length; i++) {
            let char = parseInt(code.charCodeAt(i), 10);
            let b = char & 255;
            let a = (char >> 8) & 255;
            if (b === 0) {
                result += String.fromCharCode(a)
            } else {
                result += String.fromCharCode(a) + String.fromCharCode(b);
            }
        }
        return result;
    }
}


module.exports = {
    findStringInSnakingPuzzle: findStringInSnakingPuzzle,
    getPermutations: getPermutations,
    getMostProfitFromStockQuotes: getMostProfitFromStockQuotes,
    UrlShortener: UrlShortener
};