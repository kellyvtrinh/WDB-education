// Refer to CS 61a HW2 for details on each of the problems! 
// https://cs61a.org/hw/hw02/

function make_repeater(func, n){
    /*
		Return the function that computes the nth application of func.

    >>> add_three = make_repeater(increment, 3)
    >>> add_three(5)
    8
    >>> make_repeater(triple, 5)(1) # 3 * 3 * 3 * 3 * 3 * 1
    243
    >>> make_repeater(square, 2)(5) # square(square(5))
    625
    >>> make_repeater(square, 4)(5) # square(square(square(square(5))))
    152587890625
    >>> make_repeater(square, 0)(5) # Yes, it makes sense to apply the function zero times!
    5
    */
    // Can be solved iteratively or recursively!


    if (n === 0) {
        let identity = (x) => {return x;}
        return identity;}
    else {
      let helper = (x) => {
            result = x;
            for (i = 0; i < n; i++) {result = func(result);}
            return result;
        }
      return helper;
    
    }

}

function num_eights(pos){
    /* Returns the number of times 8 appears as a digit of pos.

    >>> num_eights(3)
    0
    >>> num_eights(8)
    1
    >>> num_eights(88888888)
    8
    >>> num_eights(2638)
    1
    >>> num_eights(86380)
    2
    >>> num_eights(12345)
    0
    NO variable assignment allowed!
    */
    // *** YOUR CODE HERE ***


    if (Math.floor(pos / 10) === 0) {
        if (pos === 8) {
            return 1;
        }
        else {
            return 0;
        }
    } else {
        if (pos % 10 === 8) {
            return 1 + num_eights(Math.floor(pos / 10));
        }
        else {
            return num_eights(Math.floor(pos / 10));
        }
    }
}

function pingpong(n){
    /*
		Return the nth element of the ping-pong sequence.

    >>> pingpong(8)
    8
    >>> pingpong(10)
    6
    >>> pingpong(15)
    1
    >>> pingpong(21)
    -1
    >>> pingpong(22)
    -2
    >>> pingpong(30)
    -2
    >>> pingpong(68)
    0
    >>> pingpong(69)
    -1
    >>> pingpong(80)
    0
    >>> pingpong(81)
    1
    >>> pingpong(82)
    0
    >>> pingpong(100)
    -6

    Look at 61A problem set for info on the ping-pong sequence.
    */
    // *** YOUR CODE HERE ***

    let helper = (idx, n, curr_num, last_num) => {
        if (n === 1) {
            return curr_num;
        }
        else if ((idx % 8 === 0) | (num_eights(idx) > 0)) { // switch direction
            return helper(idx + 1, n - 1, last_num, curr_num);
        }
        else if (last_num > curr_num) { // continue descending direction
            return helper(idx + 1, n - 1, curr_num - 1, curr_num);
        }
        else { // continue ascending direction
            return helper(idx + 1, n - 1, curr_num + 1, curr_num);
        }
    }

    return helper(1, n, 1, 0);

}


function missing_digits(n){
    /* Given a number a that is in sorted, increasing order,
    return the number of missing digits in n. A missing digit is
    a number between the first and last digit of a that is not in n.
    >>> missing_digits(1248) # 3, 5, 6, 7
    4
    >>> missing_digits(19) # 2, 3, 4, 5, 6, 7, 8
    7
    >>> missing_digits(1122) # No missing numbers
    0
    >>> missing_digits(123456) # No missing numbers
    0
    >>> missing_digits(3558) # 4, 6, 7
    3
    >>> missing_digits(35578) # 4, 6
    2
    >>> missing_digits(12456) # 3
    1
    >>> missing_digits(16789) # 2, 3, 4, 5
    4

    >>> missing_digits(4) # No missing numbers between 4 and 4
    0

    No iteration allowed!
    */

    if (n < 10) {return 0;}
    else {
        const last_digit = n % 10;
        const rest_digit = Math.floor(n / 10);
        return Math.max(last_digit - (rest_digit % 10) - 1, 0) + missing_digits(rest_digit);
    }
   
}



function get_next_coin(coin){
    /* Return the next coin. 
    >>> get_next_coin(1)
    5
    >>> get_next_coin(5)
    10
    >>> get_next_coin(10)
    25
    >>> get_next_coin(2) # Other values return None
    */

    const coins = [1, 5, 10, 25];
    if (coins.includes(coin)) {
        let idx = coins.indexOf(coin);
        if (idx === coins.length - 1) {return null;}
        else {return coins[idx + 1];}
    }
    else {return null;}
    
}

function count_coins(change){
    /* Return the number of ways to make change using coins of value of 1, 5, 10, 25.
    >>> count_coins(15) 
    6
    >>> count_coins(10)
    4
    >>> count_coins(20)
    9
    >>> count_coins(100) # How many ways to make change for a dollar?
    242

    No iteration allowed!
    */

    let helper = (change, coin) => 
    {
        if (change === 0) {return 1;}
        else if (change < 0) {return 0;}
        else if (coin === null) {return 0;} 
        else {
            return helper(change - coin, coin) + helper(change, get_next_coin(coin));
        }
    }
    return helper(change, 1);
}