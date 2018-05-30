'use strict';

/********************************************************************************************
 *                                                                                          *
 * Перед началом работы с заданием, пожалуйста ознакомьтесь с туториалом:                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield        *
 *                                                                                          *
 ********************************************************************************************/


/**
 * Возвращает последовательность строк песни «99 бутылок пива»:
 *
 *  '99 bottles of beer on the wall, 99 bottles of beer.'
 *  'Take one down and pass it around, 98 bottles of beer on the wall.'
 *  '98 bottles of beer on the wall, 98 bottles of beer.'
 *  'Take one down and pass it around, 97 bottles of beer on the wall.'
 *  ...
 *  '1 bottle of beer on the wall, 1 bottle of beer.'
 *  'Take one down and pass it around, no more bottles of beer on the wall.'
 *  'No more bottles of beer on the wall, no more bottles of beer.'
 *  'Go to the store and buy some more, 99 bottles of beer on the wall.'
 *
 *  Перевод:
 *  '<количество> бутылок пива на стене'
 *  '<количество> бутылок пива!'
 *  'Возьми одну, пусти по кругу'
 *  '<количество минус 1> бутылок пива на стене!'
 *  ...
 *  'Нет бутылок пива на стене!'
 *  'Нет бутылок пива!'
 *  'Пойди в магазин и купи ещё'
 *  '99 бутылок пива на стене!'
 *
 * Полный текст песни
 * http://99-bottles-of-beer.net/lyrics.html
 *
 * Замечание: Попробуй закончить задание быстрее чем закончится песня:
 * https://www.youtube.com/watch?v=Z7bmyjxJuVY   :)
 *
 *
 * @return {Iterable.<string>}
 *
 */
function* get99BottlesOfBeer() {
    for (let left = 99; left > 2; left--) {
        yield new String(left).concat(' bottles of beer on the wall, ', left, ' bottles of beer.');
        yield 'Take one down and pass it around, '.concat(left - 1, ' bottles of beer on the wall.');
    }

    yield '2 bottles of beer on the wall, 2 bottles of beer.';
    yield 'Take one down and pass it around, 1 bottle of beer on the wall.';

    yield '1 bottle of beer on the wall, 1 bottle of beer.';
    yield 'Take one down and pass it around, no more bottles of beer on the wall.';

    yield 'No more bottles of beer on the wall, no more bottles of beer.';
    yield 'Go to the store and buy some more, 99 bottles of beer on the wall.';
}


/**
 * Возвращает последовательность Фибоначчи:
 *   0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, ...
 *
 * Подробности: https://en.wikipedia.org/wiki/Fibonacci_number
 *
 * @return {Iterable.<number>}
 *
 */
function* getFibonacciSequence() {
    let current = 0;
    let next = 1;
    while (true) {
        yield current;
        let tmp = current;
        current = next;
        next = current + tmp;
    }
}


/**
 * Обход дерева с использованием поиска в глубину
 * Подробности: https://en.wikipedia.org/wiki/Depth-first_search
 *
 * У каждого узла(node) есть потомки (child) записанные в массив node.children
 * Листья не содержат потомков, т.е. у них отсутствует свойство 'children'
 *
 * @params {object} корень дерева
 * @return {Iterable.<object>} последовательность всех вершин в порядке поиска в глубину
 * @example
 *
 *   var node1 = { n:1 }, node2 = { n:2 }, node3 = { n:3 }, node4 = { n:4 },
 *       node5 = { n:5 }, node6 = { n:6 }, node7 = { n:7 }, node8 = { n:8 };
 *   node1.children = [ node2, node6, node7 ];
 *   node2.children = [ node3, node4 ];
 *   node4.children = [ node5 ];
 *   node7.children = [ node8 ];
 *
 *     source tree (root = 1):
 *            1
 *          / | \
 *         2  6  7
 *        / \     \            =>    { 1, 2, 3, 4, 5, 6, 7, 8 }
 *       3   4     8
 *           |
 *           5
 *
 *  depthTraversalTree(node1) => node1, node2, node3, node4, node5, node6, node7, node8
 *
 */
function* depthTraversalTree(root) {
    
    let queue = [ root ];

    while (queue.length !== 0) {

        let current = queue[queue.length - 1];

        yield current;
        queue.pop();

        if (current.children !== undefined) {
            for (let i = current.children.length - 1; i >= 0; i--) {
                queue.push(current.children[i]);
            }
        }
    }
}


/**
 * Обход дерева с использованием поиска в ширину
 * Подробности: https://en.wikipedia.org/wiki/Breadth-first_search
 *
 * У каждого узла(node) есть потомки (child) записанные в массив node.children
 * Листья не содержат потомков, т.е. у них отсутствует свойство 'children'
 *
 * @params {object} корень дерева
 * @return {Iterable.<object>} последовательность всех вершин в порядке поиска в ширину
 * @example
 *     source tree (root = 1):
 *
 *            1
 *          / | \
 *         2  3  4
 *        / \     \            =>    { 1, 2, 3, 4, 5, 6, 7, 8 }
 *       5   6     7
 *           |
 *           8
 *
 */
function* breadthTraversalTree(root) {
    let queue = [root];
    let currentNode;
    let currentIndex = 0;
    while (queue.length > currentIndex) {
        currentNode = queue[currentIndex];
        yield currentNode;
        if (currentNode.children !== undefined) {
            for (let i = 0; i < currentNode.children.length; i++) {
                queue.push(currentNode.children[i]);
            }
        }
        ++currentIndex;
    }    
}


/**
 * Слияние двух отсортированных последовательностей в одну.
 * Результат содержит все элементы объединенных последовательносте в отсортированном виде
 *
 * @params {Iterable.<number>} source1
 * @params {Iterable.<number>} source2
 * @return {Iterable.<number>} объединенная отсотрированная последовательность
 *
 * @example
 *   [ 1, 3, 5, ... ], [2, 4, 6, ... ]  => [ 1, 2, 3, 4, 5, 6, ... ]
 *   [ 0 ], [ 2, 4, 6, ... ]  => [ 0, 2, 4, 6, ... ]
 *   [ 1, 3, 5, ... ], [ -1 ] => [ -1, 1, 3, 5, ...]
 */
function* mergeSortedSequences(source1, source2) {
    let src1 = source1();
    let src2 = source2();
    while (true) {
        let first = src1.next();
        let second = src2.next();
        if (first.done && !second.done) {
            yield second.value;
        } else if (second.done && !first.done) {
            yield first.value;
        } else if (!first.done && !second.done) {
            yield Math.min(first.value, second.value);
            yield Math.max(first.value, second.value);
        } else { 
            break;
        }
    }
}


module.exports = {
    get99BottlesOfBeer: get99BottlesOfBeer,
    getFibonacciSequence: getFibonacciSequence,
    depthTraversalTree: depthTraversalTree,
    breadthTraversalTree: breadthTraversalTree,
    mergeSortedSequences: mergeSortedSequences
};