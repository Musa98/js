'use strict';

/**
 * Возвращает массив из 32 делений катушки компаса с названиями.
 * Смотрите детали здесь:
 * https://en.wikipedia.org/wiki/Points_of_the_compass#32_cardinal_points
 *
 * @return {array}
 *
 * Пример возвращаемого значения :
 *  [
 *     { abbreviation : 'N',     azimuth : 0.00 ,
 *     { abbreviation : 'NbE',   azimuth : 11.25 },
 *     { abbreviation : 'NNE',   azimuth : 22.50 },
 *       ...
 *     { abbreviation : 'NbW',   azimuth : 348.75 }
 *  ]
 */
function createCompassPoints() {

    var sides = ['N', 'E', 'S', 'W'];  // use array of cardinal directions only!

    let result = [];

    for (let i = 1; i <= sides.length; i++) {
        let ch1 = sides[i - 1],
            ch2,
            chars; // combination of ch1 and ch2

        ch2 = (i === sides.length ? sides[0]
            : sides[i]);

        // if E or W
        chars = (i % 2 === 0 ? ch2 + ch1
            : ch1 + ch2);

        let quarter = [
            { abbreviation: ch1 },
            { abbreviation: ch1 + 'b' + ch2 },

            { abbreviation: ch1 + chars },
            { abbreviation: chars + 'b' + ch1 },

            { abbreviation: chars },
            { abbreviation: chars + 'b' + ch2 },

            { abbreviation: ch2 + chars },
            { abbreviation: ch2 + 'b' + ch1 }
        ];

        result = result.concat(quarter);
    }

    let azimuth = 0.00;
    const azimuth_delta = 11.25;
    for (let n = 0; n < result.length; n++) {
        result[n].azimuth = azimuth;
        azimuth += azimuth_delta;
    }

    return result;
}


/**
 * Раскройте фигурные скобки указанной строки.
 * Смотрите https://en.wikipedia.org/wiki/Bash_(Unix_shell)#Brace_expansion
 *
 * Во входной строке пары фигурных скобок, содержащие разделенные запятыми подстроки,
 * представляют наборы подстрок, которые могут появиться в этой позиции на выходе.
 *
 * @param {string} str
 * @return {Iterable.<string>}
 *
 * К СВЕДЕНИЮ: Порядок выходных строк не имеет значения.
 *
 * Пример:
 *   '~/{Downloads,Pictures}/*.{jpg,gif,png}'  => '~/Downloads/*.jpg',
 *                                                '~/Downloads/*.gif'
 *                                                '~/Downloads/*.png',
 *                                                '~/Pictures/*.jpg',
 *                                                '~/Pictures/*.gif',
 *                                                '~/Pictures/*.png'
 *
 *   'It{{em,alic}iz,erat}e{d,}, please.'  => 'Itemized, please.',
 *                                            'Itemize, please.',
 *                                            'Italicized, please.',
 *                                            'Italicize, please.',
 *                                            'Iterated, please.',
 *                                            'Iterate, please.'
 *
 *   'thumbnail.{png,jp{e,}g}'  => 'thumbnail.png'
 *                                 'thumbnail.jpeg'
 *                                 'thumbnail.jpg'
 *
 *   'nothing to do' => 'nothing to do'
 */
function* expandBraces(str) {
    let source = [str],
        result = [];

    while (source.length > 0) {
        let new_string = source.pop(),
            match_array = new_string.match(/{([^{}]+)}/);

        if (match_array !== null) {
            for (let value of match_array[1].split(',')) {
                source.push(new_string.replace(match_array[0], value));
            }
        } else if (result.indexOf(new_string) < 0) {
            result.push(new_string);
            yield new_string;
        }
    }
}


/**
 * Возвращает ZigZag матрицу
 *
 * Основная идея в алгоритме сжатия JPEG -- отсортировать коэффициенты заданного изображения зигзагом и закодировать их.
 * В этом задании вам нужно реализовать простой метод для создания квадратной ZigZag матрицы.
 * Детали смотрите здесь: https://en.wikipedia.org/wiki/JPEG#Entropy_coding
 * https://ru.wikipedia.org/wiki/JPEG
 * Отсортированные зигзагом элементы расположаться так: https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/JPEG_ZigZag.svg/220px-JPEG_ZigZag.svg.png
 *
 * @param {number} n - размер матрицы
 * @return {array}  массив размером n x n с зигзагообразным путем
 *
 * @example
 *   1  => [[0]]
 *
 *   2  => [[ 0, 1 ],
 *          [ 2, 3 ]]
 *
 *         [[ 0, 1, 5 ],
 *   3  =>  [ 2, 4, 6 ],
 *          [ 3, 7, 8 ]]
 *
 *         [[ 0, 1, 5, 6 ],
 *   4 =>   [ 2, 4, 7,12 ],
 *          [ 3, 8,11,13 ],
 *          [ 9,10,14,15 ]]
 *
 */
function getZigZagMatrix(n) {
    let result = [];
    for (let x = 0; x < n; x++) {
        result[x] = [];
    }

    let current = 0;
    for (let i = 1; i < 2 * n; i++) {
        let direction_up = (i % 2 === 0) ? false : true; // whether zigzag rises

        let y, x;
        if (i <= n) {
            x = 0;
            y = i - 1;
        } else {
            x = i - n;
            y = n - 1;
        }

        if (direction_up === true) {
            let tmp = y;
            y = x;
            x = tmp;
        }

        let diag_length = (i > n) ? 2 * n - i : i; // current diagonal
        for (let j = 0; j < diag_length; j++) {
            result[x][y] = current;
            if (direction_up) {
                x--; y++;
            } else {
                x++; y--;
            }
            current++;
        }
    }
    return result;
}


/**
 * Возвращает true если заданный набор костяшек домино может быть расположен в ряд по правилам игры.
 * Детали игры домино смотрите тут: https://en.wikipedia.org/wiki/Dominoes
 * https://ru.wikipedia.org/wiki/%D0%94%D0%BE%D0%BC%D0%B8%D0%BD%D0%BE
 * Каждая костяшка представлена как массив [x,y] из значений на ней.
 * Например, набор [1, 1], [2, 2], [1, 2] может быть расположен в ряд ([1, 1] -> [1, 2] -> [2, 2]),
 * тогда как набор [1, 1], [0, 3], [1, 4] не может.
 * К СВЕДЕНИЮ: в домино любая пара [i, j] может быть перевернута и представлена как [j, i].
 *
 * @params {array} dominoes
 * @return {bool}
 *
 * @example
 *
 * [[0,1],  [1,1]] => true
 * [[1,1], [2,2], [1,5], [5,6], [6,3]] => false
 * [[1,3], [2,3], [1,4], [2,4], [1,5], [2,5]]  => true
 * [[0,0], [0,1], [1,1], [0,2], [1,2], [2,2], [0,3], [1,3], [2,3], [3,3]] => false
 *
 */
function canDominoesMakeRow(dominoes) {
    let returned_value = false;
    let is_visited = (new Array(dominoes.length)).fill(false);

    function rec(index, value, left) {
        if (left === 0) {
            returned_value = true;
            return;
        }
        is_visited[index] = true;
        for (let i = 0; i < dominoes.length; i++) {
            if (!is_visited[i]) {
                if (dominoes[i].indexOf(value) !== -1) {
                    rec(i, dominoes[i][0] === value ? dominoes[i][1] : dominoes[i][0], left - 1);
                }
            }
        }
        is_visited[index] = false;
    }

    for (let i = 0; i < dominoes.length; i++) {
        for (let j = 0; j < dominoes[i].length; j++) {
            rec(i, dominoes[i][j], dominoes.length - 1);
            if (returned_value === true) {
                return true;
            }
        }      
    }
    return false;
}


/**
 * Возвращает строковое представление заданного упорядоченного списка целых чисел.
 *
 * Строковое представление списка целых чисел будет состоять из элементов, разделенных запятыми. Элементами могут быть:
 *   - отдельное целое число
 *   - или диапазон целых чисел, заданный начальным числом, отделенным от конечного числа черточкой('-').
 *     (Диапазон включает все целые числа в интервале, включая начальное и конечное число)
 *     Синтаксис диапазона должен быть использован для любого диапазона, где больше двух чисел.
 *
 * @params {array} nums
 * @return {bool}
 *
 * @example
 *
 * [ 0, 1, 2, 3, 4, 5 ]   => '0-5'
 * [ 1, 4, 5 ]            => '1,4,5'
 * [ 0, 1, 2, 5, 7, 8, 9] => '0-2,5,7-9'
 * [ 1, 2, 4, 5]          => '1,2,4,5'
 */
function extractRanges(nums) {
    let result = '';
    for (let i = 0; i < nums.length; i++) {
        let start = i;

        while (nums[++i] === nums[i - 1] + 1) { }
        i--; 

        if (i - start > 1) {
            result += nums[start] + '-' + nums[i];
        } else {
            result += (i - start) === 0 ? nums[i] : nums[start] + ',' + nums[i];
        }
        result += ',';
    }
    return result.slice(0, -1);
}

module.exports = {
    createCompassPoints : createCompassPoints,
    expandBraces : expandBraces,
    getZigZagMatrix : getZigZagMatrix,
    canDominoesMakeRow : canDominoesMakeRow,
    extractRanges : extractRanges
};