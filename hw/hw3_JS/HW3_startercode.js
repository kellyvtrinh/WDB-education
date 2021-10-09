let x = 5;
let y = 4;
function a_plus_abs_b(a,b) {
	/*
    Return a+abs(b), but without calling abs().

    >>> a_plus_abs_b(2, 3)
    5
    >>> a_plus_abs_b(2, -3)
    
  */
	var f = () => {return a + b};
	if (b < 0) {
		f = () => {return a - b};
	}
	return f(a, b);
}


function two_of_three(x, y, z){
    /*Return a*a + b*b, where a and b are the two smallest members of the
    positive numbers x, y, and z. 

    >>> two_of_three(1, 2, 3)
    5
    >>> two_of_three(5, 3, 1)
    10
    >>> two_of_three(10, 2, 8)
    68
    >>> two_of_three(5, 5, 5)
    50

    // Hint: Consider using the Math.max or Math.min function!
    */

    return (x**2 + y**2 + z**2) - Math.max((x, y, z))**2;
}

function largest_factor(n){
    /*Return the largest factor of n that is smaller than n.

    >>> console.log(largest_factor(15)); # factors are 1, 3, 5
    5
    >>> console.log(largest_factor(80)); # factors are 1, 2, 4, 5, 8, 10, 16, 20, 40
    40
    >>> console.log(largest_factor(13)); # factor is 1 since 13 is prime
    1
    */
    // *** YOUR CODE HERE ***

    // return largest factor 
    // starting from 0 to n / 2
    var largest_factor = 0;
    for (i = Math.floor(n / 2); i > 0; i--) {
        if ((n % i === 0) & (i > largest_factor)) {
            largest_factor = i;
        }
    }

    return largest_factor
}

function hailstone(n){
	/* Print the hailstone sequence starting at n and return its
		    length. 
		For reference: https://mathworld.wolfram.com/HailstoneNumber.html

		>>> let a = hailstone(10)
		10
		5
		16
		8
		4
		2
		1
		>>> console.log(a);
		7

		Can be solved recursively or iteratively!
	*/
	// *** YOUR CODE HERE ***
    
    let helper = (value, len) => {
        console.log(value);
        len += 1;
        if (value === 1) {
            return len;
        }
        else if (value % 2 == 0) {
            return helper(value / 2, len);
        }
        else {
            return helper(3*value + 1, len);
        }
    }

    return helper(n, 0);

}



function product(n, term){
	/* Return the product of the first n terms in a sequence.
    n -- a positive integer
    term -- a function that takes one argument to produce the term

    >>> product(3, identity)  # 1 * 2 * 3
    6
    >>> product(5, identity)  # 1 * 2 * 3 * 4 * 5
    120
    >>> product(3, square)    # 1^2 * 2^2 * 3^2
    36
    >>> product(5, square)    # 1^2 * 2^2 * 3^2 * 4^2 * 5^2
    14400
    >>> product(3, increment) # (1+1) * (2+1) * (3+1)
    24
    >>> product(3, triple)    # 1*3 * 2*3 * 3*3
    162
	*/
  // *** YOUR CODE HERE ***
    let helper = (running_product, n) => {
        if (n === 1) {
            return term(n);
        }
        else {
            return term(n) * helper(term(n + 1), n - 1);
        }
    }

    return helper(1, n);

}



function accumulate(merger, base, n, term){
    /*Return the result of merging the first n terms in a sequence and base.
    The terms to be merged are term(1), term(2), ..., term(n). merger is a
    two-argument commutative function.

    >>> accumulate(add, 0, 5, identity)  # 0 + 1 + 2 + 3 + 4 + 5
    15
    >>> accumulate(add, 11, 5, identity) # 11 + 1 + 2 + 3 + 4 + 5
    26
    >>> accumulate(add, 11, 0, identity) # 11
    11
    >>> accumulate(add, 11, 3, square)   # 11 + 1^2 + 2^2 + 3^2
    25
    >>> accumulate(mul, 2, 3, square)    # 2 * 1^2 * 2^2 * 3^2
    72
    >>> accumulate(lambda x, y: x + y + 1, 2, 3, square)
    19
    >>> accumulate(lambda x, y: 2 * (x + y), 2, 3, square)
    58
    >>> accumulate(lambda x, y: (x + y) % 17, 19, 20, square)
    16
    */
    // *** YOUR CODE HERE ***
    let helper = (num) => {
        if (num === 0) {
            return base;
        } 
        else if (num === 1) {
            return merger(base, term(num));
        }
        else {
            return merger(term(num), helper(num - 1));
        }
    }

    return helper(n);

}



// function mul(n1, n2) {
//     return n1*n2;
// }

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

function identity(n) {
    return n;
}

function triple(n) {
    return n * 3;
}

function square(n) {
    return n**2;
}

function increment(n) {
    return n + 1;
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
    // *** YOUR CODE HERE ***
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
    // *** YOUR CODE HERE ***
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
    // *** YOUR CODE HERE ***
}


// Recursion sequence: Look at https://inst.eecs.berkeley.edu/~cs61a/fa19/hw/hw03/ for reference on each of the questions!

function num_sevens(n){
    // *** YOUR CODE HERE ***
}

function pingpong(n){
    // *** YOUR CODE HERE ***
}

function count_change(amount){
    // *** YOUR CODE HERE ***
}



/**
NOTE from the Notion page:
Make sure that when you run each of these functions that the output is the same in Javascript. 
You will be graded on pure correctness. Feel free to copy and paste your python code! 
This is more to learn the language rather than to test your CS 61A knowledge. 
If you need the python solutions, ask one of us and we'll drop them!
**/
