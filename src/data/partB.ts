import { Program } from '../types';

export const partBPrograms: Program[] = [
  {
    id: 'b01',
    code: 'B01',
    part: 'B',
    number: 1,
    title: 'Swap Two Numbers Without Temporary Variable',
    shortTitle: 'Swap Without Temp Variable',
    objective: 'Write a C program to swap the values of two variables without utilizing any third/temporary variable.',
    concepts: ['Arithmetic Operators (+, -)', 'Bitwise XOR (^)', 'In-Place Value Exchange'],
    topics: ['Basics', 'Numbers'],
    difficulty: 'Beginner',
    logic: [
      'Read two numbers a and b.',
      'Method 1 (Arithmetic addition/subtraction):',
      '  a = a + b  (a now holds the sum of both numbers)',
      '  b = a - b  (original sum minus b yields original a, assigned to b)',
      '  a = a - b  (original sum minus updated b yields original b, assigned to a)',
      'Method 2 (Bitwise XOR):',
      '  a = a ^ b; b = a ^ b; a = a ^ b;',
      'Print swapped values.'
    ],
    journalNote: 'Journal reference — standard arithmetic swap technique using addition and subtraction.',
    journalCode: `#include <stdio.h>
#include <conio.h>

void main()
{
    int a, b;
    clrscr();
    printf("Enter two numbers a and b: ");
    scanf("%d %d", &a, &b);

    printf("\\nBefore Swapping: a = %d, b = %d", a, b);

    // Swap using arithmetic operators
    a = a + b;
    b = a - b;
    a = a - b;

    printf("\\nAfter Swapping:  a = %d, b = %d", a, b);
    getch();
}`,
    practiceCode: `#include <stdio.h>

int main(void)
{
    int a, b;

    printf("Enter two integers a and b: ");
    if (scanf("%d %d", &a, &b) != 2) {
        printf("Error: Invalid integer input.\\n");
        return 1;
    }

    printf("\\n[Before Swap] a = %d, b = %d\\n", a, b);

    // In-place arithmetic swap
    a = a + b;
    b = a - b;
    a = a - b;

    printf("[After Swap]  a = %d, b = %d\\n", a, b);

    // Note: Bitwise XOR also works for integers:
    // a ^= b; b ^= a; a ^= b;

    return 0;
}`,
    explanation: 'By adding a and b, variable a holds their combined sum. Subtracting b from this sum isolates the original value of a, which is placed into b. Finally, subtracting the new b from the sum leaves original b, which is placed into a. This completes the swap in-place without auxiliary memory.',
    sampleInput: '25 80',
    sampleOutput: `Enter two integers a and b: 25 80

[Before Swap] a = 25, b = 80
[After Swap]  a = 80, b = 25`,
    commonMistakes: [
      'Integer overflow if a + b exceeds INT_MAX (explain in viva that XOR method avoids this overflow risk).',
      'Confusing the sequence of plus and minus operators.'
    ],
    examTips: [
      'Viva favorite: "What happens if a and b are very large numbers?" Answer: a + b may overflow. Mention that bitwise XOR (a = a ^ b; b = a ^ b; a = a ^ b;) prevents overflow!',
      'Write down both arithmetic and bitwise methods on the answer sheet for extra credit.'
    ],
    vivaQuestions: [
      {
        question: 'How does swapping with bitwise XOR work?',
        answer: 'Since x ^ x = 0 and x ^ 0 = x: (1) a = a ^ b; (2) b = a ^ b (which is (a ^ b) ^ b = a); (3) a = a ^ b (which is (a ^ b) ^ a = b).'
      }
    ],
    quickRevision: {
      purpose: 'Exchange two values without third variable.',
      coreLogic: 'a = a + b; b = a - b; a = a - b;',
      importantSyntax: 'a = a + b;',
      importantFunction: 'In-place math or XOR: a^=b; b^=a; a^=b;',
      commonMistake: 'Integer overflow on very large numbers.',
      examReminder: 'Alternative: Bitwise XOR prevents arithmetic overflow.'
    },
    keywords: ['swap', 'arithmetic swap', 'xor', 'in-place', 'numbers', 'bitwise']
  },
  {
    id: 'b02',
    code: 'B02',
    part: 'B',
    number: 2,
    title: 'Count Character Categories Using ctype Functions',
    shortTitle: 'Count Characters Using ctype.h',
    objective: 'Write a C program to input a string or sentence and count the number of alphabets, vowels, consonants, digits, whitespace characters, and special symbols using functions from <ctype.h>.',
    concepts: ['<ctype.h> Character Classification Functions', 'String Traversal', 'Case Normalization (tolower)', 'Vowel vs Consonant Logic'],
    topics: ['Strings', 'ctype', 'Loops'],
    difficulty: 'Intermediate',
    logic: [
      'Include <ctype.h> for isalpha(), isdigit(), isspace(), tolower().',
      'Read string using fgets() or gets().',
      'Initialize counters: alphabets=0, vowels=0, consonants=0, digits=0, spaces=0, special=0.',
      'Iterate through string while str[i] != \'\\0\':',
      '  If isalpha(ch): increment alphabets.',
      '    Convert to lowercase using chLower = tolower(ch).',
      '    If chLower is \'a\', \'e\', \'i\', \'o\', or \'u\': increment vowels.',
      '    Else: increment consonants.',
      '  Else if isdigit(ch): increment digits.',
      '  Else if isspace(ch): increment spaces.',
      '  Else: increment special characters.',
      'Print all counted categories.'
    ],
    journalNote: 'Journal reference — uses <ctype.h> functions. Note difference between isalpha() and isdigit().',
    journalCode: `#include <stdio.h>
#include <conio.h>
#include <ctype.h>

void main()
{
    char str[100];
    int i = 0;
    int alphabets = 0, vowels = 0, consonants = 0;
    int digits = 0, spaces = 0, special = 0;
    char ch, lower;
    clrscr();

    printf("Enter a string: ");
    gets(str); // Journal note: gets is unsafe; practice version uses fgets

    while (str[i] != '\\0')
    {
        ch = str[i];
        if (isalpha(ch))
        {
            alphabets++;
            lower = tolower(ch);
            if (lower == 'a' || lower == 'e' || lower == 'i' || lower == 'o' || lower == 'u')
                vowels++;
            else
                consonants++;
        }
        else if (isdigit(ch))
        {
            digits++;
        }
        else if (isspace(ch))
        {
            spaces++;
        }
        else
        {
            special++;
        }
        i++;
    }

    printf("\\n--- Character Counts ---");
    printf("\\nAlphabets:  %d", alphabets);
    printf("\\nVowels:     %d", vowels);
    printf("\\nConsonants: %d", consonants);
    printf("\\nDigits:     %d", digits);
    printf("\\nSpaces:     %d", spaces);
    printf("\\nSpecial:    %d", special);
    getch();
}`,
    practiceCode: `#include <stdio.h>
#include <ctype.h>
#include <string.h>

int main(void)
{
    char text[256];
    int vowels = 0, consonants = 0, digits = 0, spaces = 0, special = 0;

    printf("Enter a line of text: ");
    if (!fgets(text, sizeof(text), stdin)) {
        return 1;
    }

    // Strip trailing newline character
    text[strcspn(text, "\\r\\n")] = '\\0';

    for (int i = 0; text[i] != '\\0'; i++) {
        unsigned char ch = (unsigned char)text[i];

        if (isalpha(ch)) {
            char lower = (char)tolower(ch);
            if (lower == 'a' || lower == 'e' || lower == 'i' || lower == 'o' || lower == 'u') {
                vowels++;
            } else {
                consonants++;
            }
        } else if (isdigit(ch)) {
            digits++;
        } else if (isspace(ch)) {
            spaces++;
        } else {
            special++;
        }
    }

    int totalAlphabets = vowels + consonants;

    printf("\\n=== Character Analysis ===\\n");
    printf("Total Alphabets: %d\\n", totalAlphabets);
    printf("  - Vowels:      %d\\n", vowels);
    printf("  - Consonants:  %d\\n", consonants);
    printf("Digits (0-9):    %d\\n", digits);
    printf("Whitespace:      %d\\n", spaces);
    printf("Special Symbols: %d\\n", special);

    return 0;
}`,
    explanation: 'The <ctype.h> header provides macros/functions for character classification. isalpha() checks for A-Z and a-z, isdigit() checks for 0-9, and isspace() checks for spaces, tabs, and newlines. Using tolower() simplifies checking vowels against just \'a\', \'e\', \'i\', \'o\', \'u\'.',
    sampleInput: 'Hello World 2026! #CPLab',
    sampleOutput: `Enter a line of text: Hello World 2026! #CPLab

=== Character Analysis ===
Total Alphabets: 15
  - Vowels:      4
  - Consonants:  11
Digits (0-9):    4
Whitespace:      2
Special Symbols: 2`,
    commonMistakes: [
      'Counting newline characters from fgets as special characters if not stripped.',
      'Checking vowels only in lowercase without using tolower(), missing uppercase vowels like \'A\', \'E\'.',
      'Forgetting <ctype.h> header.'
    ],
    examTips: [
      'Know what values ctype functions return: non-zero (true) if condition holds, 0 (false) otherwise.',
      'Remember that spaces includes tabs (\\t) and spaces (\' \').'
    ],
    vivaQuestions: [
      {
        question: 'What do isalpha() and isdigit() return when true?',
        answer: 'In C, character classification functions in <ctype.h> return a non-zero integer (not specifically 1) when true, and 0 when false.'
      }
    ],
    quickRevision: {
      purpose: 'Categorize string characters using <ctype.h>.',
      coreLogic: 'if(isalpha(c)) { if(isVowel(tolower(c))) v++; else cons++; } else if(isdigit(c)) d++; else if(isspace(c)) s++; else spec++;',
      importantSyntax: '#include <ctype.h>',
      importantFunction: 'isalpha(c), isdigit(c), isspace(c), tolower(c)',
      commonMistake: 'Forgetting uppercase vowels if not using tolower().',
      examReminder: 'Alphabets = Vowels + Consonants.'
    },
    keywords: ['ctype', 'isalpha', 'isdigit', 'isspace', 'vowels', 'consonants', 'strings']
  },
  {
    id: 'b03',
    code: 'B03',
    part: 'B',
    number: 3,
    title: 'Reverse String, Concatenate, and Display Lengths',
    shortTitle: 'Reverse & Concat (String Functions)',
    objective: 'Write a C program to reverse a string, concatenate the original string with its reverse, and display lengths of both strings using built-in string functions.',
    concepts: ['<string.h> Functions', 'strlen()', 'strcpy()', 'strcat()', 'String Reversal Techniques'],
    topics: ['Strings', 'String Functions'],
    difficulty: 'Intermediate',
    logic: [
      'Read original string orig.',
      'Calculate length of original string using strlen(orig).',
      'Make a copy of original into rev using strcpy(rev, orig).',
      'Reverse rev (in college journal, strrev() is used; in standard C, reverse in-place via two pointers).',
      'Create concatenated string: copy orig into combo, then strcat(combo, rev).',
      'Display original string, reversed string, concatenated result, and their respective lengths using strlen().'
    ],
    journalNote: 'Journal note: strrev() is a non-standard Microsoft / Turbo C function. In standard modern C compilers (GCC / Clang), strrev() is not part of <string.h>. The practice version provides a portable standard reversal.',
    journalCode: `#include <stdio.h>
#include <conio.h>
#include <string.h>

void main()
{
    char orig[100], rev[100], concat[200];
    clrscr();

    printf("Enter a string: ");
    gets(orig); // Journal note: gets is unsafe, strrev is Turbo C specific

    // Copy to rev
    strcpy(rev, orig);

    // Reverse rev using Turbo C built-in function
    strrev(rev);

    // Prepare concatenated string
    strcpy(concat, orig);
    strcat(concat, rev);

    printf("\\nOriginal String:     %s", orig);
    printf("\\nLength of Original:  %d", strlen(orig));

    printf("\\n\\nReversed String:     %s", rev);
    printf("\\nLength of Reversed:  %d", strlen(rev));

    printf("\\n\\nConcatenated String: %s", concat);
    printf("\\nLength of Concat:    %d", strlen(concat));

    getch();
}`,
    practiceCode: `#include <stdio.h>
#include <string.h>

// Portable string reverse function (Standard C replacement for non-standard strrev)
void reverseString(char *str)
{
    int len = (int)strlen(str);
    for (int i = 0, j = len - 1; i < j; i++, j--) {
        char temp = str[i];
        str[i] = str[j];
        str[j] = temp;
    }
}

int main(void)
{
    char original[100];
    char reversed[100];
    char concatenated[200];

    printf("Enter a string: ");
    if (!fgets(original, sizeof(original), stdin)) return 1;
    original[strcspn(original, "\\r\\n")] = '\\0';

    // Duplicate original into reversed buffer
    strcpy(reversed, original);

    // Reverse the copy using standard in-place reversal
    reverseString(reversed);

    // Concatenate original + reversed
    strcpy(concatenated, original);
    strcat(concatenated, reversed);

    printf("\\n=== String Information ===\\n");
    printf("Original:     \\"%s\\" (Length: %zu)\\n", original, strlen(original));
    printf("Reversed:     \\"%s\\" (Length: %zu)\\n", reversed, strlen(reversed));
    printf("Concatenated: \\"%s\\" (Length: %zu)\\n", concatenated, strlen(concatenated));

    return 0;
}`,
    explanation: 'The program demonstrates fundamental <string.h> functions: strlen() for string length, strcpy() to duplicate strings safely into a separate buffer, and strcat() to append strings. In Turbo C, strrev() was commonly provided; in modern standard C, a simple two-pointer swap function provides portable reversal.',
    sampleInput: 'college',
    sampleOutput: `Enter a string: college

=== String Information ===
Original:     "college" (Length: 7)
Reversed:     "egelloc" (Length: 7)
Concatenated: "collegeegelloc" (Length: 14)`,
    commonMistakes: [
      'Applying strrev() or in-place reverse directly on the original string, destroying the original needed for concatenation.',
      'Failing to allocate double the capacity for the concatenated string buffer.',
      'Expecting strrev() to compile on modern GCC or online judges without implementing it.'
    ],
    examTips: [
      'If writing on paper in college exam, writing strrev(s) matches the Turbo C journal syllabus.',
      'If compiling on GCC in practical lab exam, provide the 4-line reverseString helper.'
    ],
    vivaQuestions: [
      {
        question: 'Is strrev() part of the standard ANSI / ISO C library?',
        answer: 'No. strrev() is a vendor-specific extension provided in DOS/Windows compilers (like Turbo C and MSVC). It is not part of POSIX or standard C (ISO/IEC 9899).'
      }
    ],
    quickRevision: {
      purpose: 'Reverse, concatenate and measure string lengths.',
      coreLogic: 'strcpy(rev, orig); reverse(rev); strcpy(cat, orig); strcat(cat, rev); strlen(cat);',
      importantSyntax: '#include <string.h>',
      importantFunction: 'strlen(), strcpy(), strcat()',
      commonMistake: 'Reversing original directly without copying.',
      examReminder: 'strrev() is non-standard; know how to write custom reverse.'
    },
    keywords: ['strrev', 'strlen', 'strcat', 'strcpy', 'string.h', 'reverse', 'concatenation']
  },
  {
    id: 'b04',
    code: 'B04',
    part: 'B',
    number: 4,
    title: 'Find String Length Without Built-In Function',
    shortTitle: 'String Length (Without strlen)',
    objective: 'Write a C program to calculate the length of a string without using the built-in strlen() library function.',
    concepts: ['Null-Terminator Traversal', 'Pointer vs Index Walking', 'Character Counting', 'String Representation'],
    topics: ['Strings', 'Loops'],
    difficulty: 'Beginner',
    logic: [
      'Read string into a character array str.',
      'Initialize counter length = 0.',
      'Iterate through the string: while (str[length] != \'\\0\'):',
      '  length++',
      'When loop hits the null terminator \'\\0\', length contains the exact count of characters.',
      'Print the calculated length.'
    ],
    journalNote: 'Journal reference — classic while loop until null character \\0.',
    journalCode: `#include <stdio.h>
#include <conio.h>

void main()
{
    char str[100];
    int length = 0;
    clrscr();

    printf("Enter a string: ");
    gets(str); // Journal note: gets is deprecated; use fgets in practice

    // Count characters until null byte
    while (str[length] != '\\0')
    {
        length++;
    }

    printf("\\nLength of the string is = %d", length);
    getch();
}`,
    practiceCode: `#include <stdio.h>
#include <string.h>

int main(void)
{
    char str[100];
    int count = 0;

    printf("Enter a string: ");
    if (!fgets(str, sizeof(str), stdin)) {
        return 1;
    }

    // Strip newline character if present
    str[strcspn(str, "\\r\\n")] = '\\0';

    // Manual character counting loop
    while (str[count] != '\\0') {
        count++;
    }

    printf("\\nEntered string: \\"%s\\"\\n", str);
    printf("Length without strlen(): %d characters\\n", count);

    return 0;
}`,
    explanation: 'Every valid string in C ends with a sentinel null character \\0 with ASCII value 0. The loop checks each character sequentially starting from index 0. As soon as str[count] encounters \\0, the condition terminates, leaving count equal to the number of non-null characters.',
    sampleInput: 'DataStructures',
    sampleOutput: `Enter a string: DataStructures

Entered string: "DataStructures"
Length without strlen(): 14 characters`,
    commonMistakes: [
      'Starting count from 1 instead of 0, resulting in off-by-one errors.',
      'Looping condition str[count] == \'\\0\' which terminates immediately.',
      'Including the newline character (\\n) in the count when using fgets.'
    ],
    examTips: [
      'Examiners frequently ask to demonstrate this using pointers: char *ptr = str; while(*ptr != \'\\0\') ptr++; length = ptr - str;',
      'Remember that \'\\0\' is not counted towards length.'
    ],
    vivaQuestions: [
      {
        question: 'How does strlen() work internally?',
        answer: 'strlen() iterates sequentially through the character memory block starting from the provided pointer address until it encounters the first null byte \'\\0\', returning the offset difference.'
      }
    ],
    quickRevision: {
      purpose: 'Compute string length without strlen().',
      coreLogic: 'int len = 0; while(str[len] != \'\\0\') len++;',
      importantSyntax: 'str[len] != \'\\0\'',
      importantFunction: 'Null byte termination loop',
      commonMistake: 'Off-by-one by starting index from 1.',
      examReminder: 'Null byte \'\\0\' is NOT counted.'
    },
    keywords: ['string length', 'strlen', 'null terminator', 'traversal', 'strings', 'character array']
  },
  {
    id: 'b05',
    code: 'B05',
    part: 'B',
    number: 5,
    title: 'Fibonacci Series Using Recursion',
    shortTitle: 'Fibonacci Series (Recursion)',
    objective: 'Write a C program to generate the first n terms of the Fibonacci series using a recursive function.',
    concepts: ['Recursion Mechanics', 'Base Cases vs Recursive Step', 'Call Stack Behavior', 'Recurrence Relation: F(n) = F(n-1) + F(n-2)'],
    topics: ['Recursion', 'Functions', 'Numbers'],
    difficulty: 'Intermediate',
    logic: [
      'Define recursive function fib(n):',
      '  Base Case 1: if n == 0, return 0.',
      '  Base Case 2: if n == 1, return 1.',
      '  Recursive Case: return fib(n - 1) + fib(n - 2).',
      'In main(): read number of terms n.',
      'Loop i from 0 to n - 1 and print fib(i).'
    ],
    journalNote: 'Journal reference — standard recursive Fibonacci definition. Call stack grows linearly with depth.',
    journalCode: `#include <stdio.h>
#include <conio.h>

int fibonacci(int n)
{
    if (n == 0)
        return 0;
    else if (n == 1)
        return 1;
    else
        return fibonacci(n - 1) + fibonacci(n - 2);
}

void main()
{
    int n, i;
    clrscr();

    printf("Enter number of terms for Fibonacci series: ");
    scanf("%d", &n);

    printf("\\nFibonacci Series:\\n");
    for (i = 0; i < n; i++)
    {
        printf("%d ", fibonacci(i));
    }

    getch();
}`,
    practiceCode: `#include <stdio.h>

// Recursive function to compute n-th Fibonacci number
long long fibonacci(int n)
{
    if (n <= 0) return 0;
    if (n == 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main(void)
{
    int n;

    printf("Enter number of terms (1 - 30): ");
    if (scanf("%d", &n) != 1 || n <= 0) {
        printf("Error: Number of terms must be a positive integer.\\n");
        return 1;
    }

    if (n > 35) {
        printf("Warning: Recursive Fibonacci has exponential O(2^n) complexity. Limiting to 30 terms.\\n");
        n = 30;
    }

    printf("\\nFirst %d Fibonacci terms:\\n", n);
    for (int i = 0; i < n; i++) {
        printf("%lld", fibonacci(i));
        if (i < n - 1) printf(", ");
    }
    printf("\\n");

    return 0;
}`,
    explanation: 'A recursive function calls itself to solve smaller subproblems until a base condition stops further recursion. For Fibonacci, the base conditions are F(0) = 0 and F(1) = 1. Every higher term calls fibonacci(n-1) + fibonacci(n-2). The recursion creates a binary call tree of execution frames on the program call stack.',
    sampleInput: '8',
    sampleOutput: `Enter number of terms (1 - 30): 8

First 8 Fibonacci terms:
0, 1, 1, 2, 3, 5, 8, 13`,
    commonMistakes: [
      'Missing base cases (causes stack overflow runtime error due to infinite recursion).',
      'Entering large n values (e.g. n > 40) which freezes because simple recursion has O(2^n) exponential time complexity.'
    ],
    examTips: [
      'Draw the recursion call tree for fib(4) on the answer sheet (fib(3) + fib(2)...) to demonstrate deep understanding.',
      'Explain difference between iteration (O(n)) and simple recursion (O(2^n)).'
    ],
    vivaQuestions: [
      {
        question: 'What is the time complexity of the naive recursive Fibonacci function?',
        answer: 'O(2^n) exponential time complexity, because each call branches into two recursive sub-calls with overlapping subproblems.'
      },
      {
        question: 'What causes a Stack Overflow in recursion?',
        answer: 'When recursion lacks a proper base case or goes too deep, activation records consume all available stack memory allocated to the program thread.'
      }
    ],
    quickRevision: {
      purpose: 'Generate Fibonacci sequence via recursion.',
      coreLogic: 'int fib(n) { if(n==0) return 0; if(n==1) return 1; return fib(n-1)+fib(n-2); }',
      importantSyntax: 'Recursive return fib(n-1) + fib(n-2)',
      importantFunction: 'Base case checks (n==0, n==1)',
      commonMistake: 'Missing base case causing infinite stack overflow.',
      examReminder: 'Loop i from 0 to n-1 in main to print terms.'
    },
    keywords: ['fibonacci', 'recursion', 'base case', 'call stack', 'functions', 'exponential']
  },
  {
    id: 'b06',
    code: 'B06',
    part: 'B',
    number: 6,
    title: 'Factorial Using Recursion',
    shortTitle: 'Factorial (Recursion)',
    objective: 'Write a C program to calculate the factorial of a given positive integer using a recursive function.',
    concepts: ['Recursion Fundamentals', 'Base Case (n == 0 or 1)', 'Inductive Step (n * fact(n-1))', 'Data Type Limits (long long)'],
    topics: ['Recursion', 'Functions', 'Numbers'],
    difficulty: 'Beginner',
    logic: [
      'Define recursive function factorial(n):',
      '  Base Case: if n == 0 or n == 1, return 1.',
      '  Recursive Case: return n * factorial(n - 1).',
      'In main(): read number n.',
      'Validate that n >= 0 (factorial of negative numbers is undefined).',
      'Call factorial(n) and print the result.'
    ],
    journalNote: 'Journal reference — note that 0! = 1 by mathematical definition.',
    journalCode: `#include <stdio.h>
#include <conio.h>

long int factorial(int n)
{
    if (n == 0 || n == 1)
        return 1;
    else
        return (n * factorial(n - 1));
}

void main()
{
    int num;
    clrscr();

    printf("Enter a positive integer: ");
    scanf("%d", &num);

    if (num < 0)
        printf("Factorial of negative numbers does not exist.");
    else
        printf("\\nFactorial of %d is = %ld", num, factorial(num));

    getch();
}`,
    practiceCode: `#include <stdio.h>

// Recursive factorial using 64-bit unsigned integer to prevent early overflow
unsigned long long factorial(int n)
{
    if (n <= 1) {
        return 1ULL;
    }
    return (unsigned long long)n * factorial(n - 1);
}

int main(void)
{
    int n;

    printf("Enter a non-negative integer (0 - 20): ");
    if (scanf("%d", &n) != 1 || n < 0) {
        printf("Error: Factorial is only defined for non-negative integers.\\n");
        return 1;
    }

    if (n > 20) {
        printf("Note: Factorial values grow extremely fast! n > 20 exceeds 64-bit integer capacity.\\n");
        return 1;
    }

    printf("\\n%d! = %llu\\n", n, factorial(n));

    return 0;
}`,
    explanation: 'Factorial of n (denoted n!) is the product of all positive integers less than or equal to n. Recursively, n! = n * (n - 1)! with the base condition 0! = 1 and 1! = 1. Each recursive call pushes a stack frame with parameter n until reaching the base case, after which values multiply during stack unwind.',
    sampleInput: '6',
    sampleOutput: `Enter a non-negative integer (0 - 20): 6

6! = 720`,
    commonMistakes: [
      'Missing the 0! = 1 case (returning 0 for 0! breaks the mathematical definition).',
      'Using standard 16-bit or 32-bit int which overflows quickly (13! overflows 32-bit signed int).',
      'Forgetting negative input check.'
    ],
    examTips: [
      'Always mention that 0! is 1.',
      'State time complexity: O(n) calls, and space complexity: O(n) call stack frames.'
    ],
    vivaQuestions: [
      {
        question: 'Why does 13! overflow a standard 32-bit signed integer?',
        answer: 'A signed 32-bit int can hold up to 2,147,483,647 (~2.14 billion). Since 13! = 6,227,020,800, it exceeds 2^31 - 1 and wraps around negatively (arithmetic overflow).'
      }
    ],
    quickRevision: {
      purpose: 'Compute n! recursively.',
      coreLogic: 'long fact(int n) { if(n<=1) return 1; return n * fact(n-1); }',
      importantSyntax: '0! = 1 base case',
      importantFunction: 'return n * fact(n-1);',
      commonMistake: 'Returning 0 for fact(0) instead of 1.',
      examReminder: 'Factorial of negative numbers is undefined.'
    },
    keywords: ['factorial', 'recursion', 'math', 'call stack', 'overflow', 'base case']
  },
  {
    id: 'b07',
    code: 'B07',
    part: 'B',
    number: 7,
    title: 'Square Matrix and Trace',
    shortTitle: 'Square Matrix & Trace',
    objective: 'Write a C program to input a square matrix of order n × n, display the matrix, and calculate the trace (sum of the elements along the main diagonal).',
    concepts: ['2D Arrays (Matrices)', 'Square Matrix Properties', 'Main Diagonal Condition (i == j)', 'Matrix Trace Calculation'],
    topics: ['Matrices', 'Arrays', 'Loops'],
    difficulty: 'Intermediate',
    logic: [
      'Read matrix order n (number of rows and columns must be equal for a square matrix).',
      'Input matrix elements of size n × n using nested loops (i from 0 to n-1, j from 0 to n-1).',
      'Initialize trace = 0.',
      'Single loop optimization: for i from 0 to n-1, add a[i][i] to trace.',
      'Display the matrix in clean row-column tabular format.',
      'Display the computed trace value.'
    ],
    journalNote: 'Journal reference — trace is only defined for square matrices and equals sum of a[i][i].',
    journalCode: `#include <stdio.h>
#include <conio.h>

void main()
{
    int a[10][10], n, i, j, trace = 0;
    clrscr();

    printf("Enter order of square matrix (n): ");
    scanf("%d", &n);

    printf("Enter elements of %dx%d matrix:\\n", n, n);
    for (i = 0; i < n; i++)
    {
        for (j = 0; j < n; j++)
        {
            scanf("%d", &a[i][j]);
        }
    }

    // Calculate trace
    for (i = 0; i < n; i++)
    {
        trace = trace + a[i][i];
    }

    printf("\\nMatrix:\\n");
    for (i = 0; i < n; i++)
    {
        for (j = 0; j < n; j++)
        {
            printf("%4d", a[i][j]);
        }
        printf("\\n");
    }

    printf("\\nTrace of the matrix = %d", trace);
    getch();
}`,
    practiceCode: `#include <stdio.h>

#define MAX 10

int main(void)
{
    int matrix[MAX][MAX];
    int n;
    int trace = 0;

    printf("Enter order of square matrix n (max %d): ", MAX);
    if (scanf("%d", &n) != 1 || n <= 0 || n > MAX) {
        printf("Error: Matrix order must be between 1 and %d.\\n", MAX);
        return 1;
    }

    printf("\\nEnter matrix elements row by row (%d x %d):\\n", n, n);
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            scanf("%d", &matrix[i][j]);
        }
    }

    // Calculate trace along main diagonal
    for (int i = 0; i < n; i++) {
        trace += matrix[i][i];
    }

    printf("\\n=== Entered Square Matrix ===\\n");
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            printf("%6d", matrix[i][j]);
        }
        printf("\\n");
    }

    printf("\\nMain Diagonal Elements: ");
    for (int i = 0; i < n; i++) {
        printf("%d%s", matrix[i][i], (i < n - 1) ? " + " : " = ");
    }
    printf("%d\\n", trace);
    printf("Trace of Matrix: %d\\n", trace);

    return 0;
}`,
    explanation: 'The trace of an n × n square matrix is the sum of elements along its main (principle) diagonal, where row index equals column index (i == j). Instead of a nested O(n²) loop with an if (i == j) check, a single O(n) loop traversing matrix[i][i] directly calculates the trace with optimal efficiency.',
    sampleInput: '3\n1 2 3\n4 5 6\n7 8 9',
    sampleOutput: `Enter order of square matrix n (max 10): 3

Enter matrix elements row by row (3 x 3):
1 2 3
4 5 6
7 8 9

=== Entered Square Matrix ===
     1     2     3
     4     5     6
     7     8     9

Main Diagonal Elements: 1 + 5 + 9 = 15
Trace of Matrix: 15`,
    commonMistakes: [
      'Writing a nested loop without realizing that a single loop for (i = 0; i < n; i++) trace += a[i][i]; is sufficient.',
      'Allowing non-square dimensions (trace is only defined for square matrices where rows == columns).'
    ],
    examTips: [
      'Mention that trace has time complexity O(n) when using single loop over a[i][i].',
      'Examiners may ask in viva: "What is the secondary diagonal?" Answer: a[i][n - 1 - i].'
    ],
    vivaQuestions: [
      {
        question: 'What is the trace of a matrix in linear algebra?',
        answer: 'The trace of an n × n square matrix is the sum of the elements on the main diagonal (from the upper left to the lower right): tr(A) = Σ a_ii.'
      }
    ],
    quickRevision: {
      purpose: 'Print square matrix and compute trace (sum of diagonal).',
      coreLogic: 'for(i=0; i<n; i++) trace += a[i][i];',
      importantSyntax: 'a[i][i] represents main diagonal',
      importantFunction: 'Single loop for diagonal',
      commonMistake: 'Forgetting matrix must be square (n x n).',
      examReminder: 'Trace exists only for square matrices.'
    },
    keywords: ['matrix', 'trace', 'square matrix', '2D array', 'diagonal', 'linear algebra']
  },
  {
    id: 'b08',
    code: 'B08',
    part: 'B',
    number: 8,
    title: 'Matrix Addition and Subtraction',
    shortTitle: 'Matrix Addition & Subtraction',
    objective: 'Write a C program to input two matrices of order m × n, check compatibility, and perform matrix addition and subtraction.',
    concepts: ['2D Arrays', 'Matrix Dimension Matching', 'Element-Wise Operations', 'Tabular Matrix Output'],
    topics: ['Matrices', 'Arrays'],
    difficulty: 'Intermediate',
    logic: [
      'Read dimensions of two matrices (r1, c1 for Matrix A; r2, c2 for Matrix B).',
      'Check compatibility: addition/subtraction is valid ONLY if (r1 == r2 && c1 == c2).',
      'Read elements of Matrix A and Matrix B.',
      'Compute sum: sum[i][j] = A[i][j] + B[i][j].',
      'Compute difference: diff[i][j] = A[i][j] - B[i][j].',
      'Display original matrices along with the sum and difference matrices.'
    ],
    journalNote: 'Journal reference — matrices must have identical dimensions for addition and subtraction.',
    journalCode: `#include <stdio.h>
#include <conio.h>

void main()
{
    int a[10][10], b[10][10], sum[10][10], diff[10][10];
    int r, c, i, j;
    clrscr();

    printf("Enter number of rows and columns: ");
    scanf("%d %d", &r, &c);

    printf("Enter elements of Matrix A:\\n");
    for (i = 0; i < r; i++)
        for (j = 0; j < c; j++)
            scanf("%d", &a[i][j]);

    printf("Enter elements of Matrix B:\\n");
    for (i = 0; i < r; i++)
        for (j = 0; j < c; j++)
            scanf("%d", &b[i][j]);

    // Addition and Subtraction
    for (i = 0; i < r; i++)
    {
        for (j = 0; j < c; j++)
        {
            sum[i][j] = a[i][j] + b[i][j];
            diff[i][j] = a[i][j] - b[i][j];
        }
    }

    printf("\\n--- Matrix Addition (A + B) ---\\n");
    for (i = 0; i < r; i++)
    {
        for (j = 0; j < c; j++)
            printf("%4d", sum[i][j]);
        printf("\\n");
    }

    printf("\\n--- Matrix Subtraction (A - B) ---\\n");
    for (i = 0; i < r; i++)
    {
        for (j = 0; j < c; j++)
            printf("%4d", diff[i][j]);
        printf("\\n");
    }

    getch();
}`,
    practiceCode: `#include <stdio.h>

#define MAX 10

int main(void)
{
    int a[MAX][MAX], b[MAX][MAX], sum[MAX][MAX], diff[MAX][MAX];
    int r1, c1, r2, c2;

    printf("Enter rows and columns for Matrix A: ");
    scanf("%d %d", &r1, &c1);

    printf("Enter rows and columns for Matrix B: ");
    scanf("%d %d", &r2, &c2);

    if (r1 != r2 || c1 != c2) {
        printf("Error: Matrices must have identical dimensions for addition/subtraction (%dx%d != %dx%d).\\n",
               r1, c1, r2, c2);
        return 1;
    }

    printf("\\nEnter elements for Matrix A (%dx%d):\\n", r1, c1);
    for (int i = 0; i < r1; i++) {
        for (int j = 0; j < c1; j++) {
            scanf("%d", &a[i][j]);
        }
    }

    printf("\\nEnter elements for Matrix B (%dx%d):\\n", r2, c2);
    for (int i = 0; i < r2; i++) {
        for (int j = 0; j < c2; j++) {
            scanf("%d", &b[i][j]);
            sum[i][j] = a[i][j] + b[i][j];
            diff[i][j] = a[i][j] - b[i][j];
        }
    }

    printf("\\n[Matrix A + B]\\n");
    for (int i = 0; i < r1; i++) {
        for (int j = 0; j < c1; j++) printf("%6d", sum[i][j]);
        printf("\\n");
    }

    printf("\\n[Matrix A - B]\\n");
    for (int i = 0; i < r1; i++) {
        for (int j = 0; j < c1; j++) printf("%6d", diff[i][j]);
        printf("\\n");
    }

    return 0;
}`,
    explanation: 'Matrix addition and subtraction are element-wise operations. Two matrices can only be added or subtracted if both have the exact same number of rows and columns. In that case, each resultant cell C[i][j] is the arithmetic sum or difference of A[i][j] and B[i][j].',
    sampleInput: '2 2\n2 2\n1 2\n3 4\n5 6\n7 8',
    sampleOutput: `[Matrix A + B]
     6     8
    10    12

[Matrix A - B]
    -4    -4
    -4    -4`,
    commonMistakes: [
      'Not validating whether dimensions of Matrix A and Matrix B are identical.',
      'Confusing loop variable bounds when printing (rows vs columns).'
    ],
    examTips: [
      'State condition: Matrix addition is commutative (A + B = B + A), while subtraction is not (A - B != B - A).',
      'Both operations have time complexity O(r * c).'
    ],
    vivaQuestions: [
      {
        question: 'Under what condition is matrix addition defined?',
        answer: 'Matrix addition is only defined when both matrices have the same order (same number of rows and same number of columns).'
      }
    ],
    quickRevision: {
      purpose: 'Perform element-wise addition and subtraction of matrices.',
      coreLogic: 'sum[i][j] = a[i][j] + b[i][j]; diff[i][j] = a[i][j] - b[i][j];',
      importantSyntax: 'Condition: r1 == r2 && c1 == c2',
      importantFunction: 'Nested loops for rows and cols',
      commonMistake: 'Attempting addition on matrices of different dimensions.',
      examReminder: 'Always check dimension compatibility first.'
    },
    keywords: ['matrix', 'addition', 'subtraction', '2D array', 'dimensions', 'linear algebra']
  },
  {
    id: 'b09',
    code: 'B09',
    part: 'B',
    number: 9,
    title: 'Matrix Multiplication Using Functions',
    shortTitle: 'Matrix Multiplication (Functions)',
    objective: 'Write a C program to multiply two matrices using a dedicated function after validating that the number of columns in the first matrix equals the number of rows in the second matrix.',
    concepts: ['Matrix Compatibility (c1 == r2)', 'Triple Nested Loop (O(r1 * c1 * c2))', 'Modular Programming (Functions)', 'Passing 2D Arrays to Functions'],
    topics: ['Matrices', 'Functions', 'Arrays'],
    difficulty: 'Advanced',
    logic: [
      'Read dimensions r1, c1 for Matrix A and r2, c2 for Matrix B.',
      'Check compatibility condition: if c1 != r2, multiplication is impossible!',
      'Read matrices A and B.',
      'Define function multiplyMatrices(A, B, C, r1, c1, c2):',
      '  For i from 0 to r1 - 1:',
      '    For j from 0 to c2 - 1:',
      '      Initialize C[i][j] = 0',
      '      For k from 0 to c1 - 1:',
      '        C[i][j] += A[i][k] * B[k][j]',
      'Display product matrix C of dimension r1 × c2.'
    ],
    journalNote: 'Journal reference — passing 2D arrays to functions requires specifying the column dimension in parameter list, e.g. int a[][10].',
    journalCode: `#include <stdio.h>
#include <conio.h>

void multiply(int a[10][10], int b[10][10], int c[10][10], int r1, int c1, int c2)
{
    int i, j, k;
    for (i = 0; i < r1; i++)
    {
        for (j = 0; j < c2; j++)
        {
            c[i][j] = 0;
            for (k = 0; k < c1; k++)
            {
                c[i][j] = c[i][j] + (a[i][k] * b[k][j]);
            }
        }
    }
}

void main()
{
    int a[10][10], b[10][10], c[10][10];
    int r1, c1, r2, c2, i, j;
    clrscr();

    printf("Enter rows and cols for Matrix A: ");
    scanf("%d %d", &r1, &c1);

    printf("Enter rows and cols for Matrix B: ");
    scanf("%d %d", &r2, &c2);

    if (c1 != r2)
    {
        printf("\\nMatrix multiplication not possible! Columns of A must equal Rows of B.");
        getch();
        return;
    }

    printf("Enter Matrix A elements:\\n");
    for (i = 0; i < r1; i++)
        for (j = 0; j < c1; j++)
            scanf("%d", &a[i][j]);

    printf("Enter Matrix B elements:\\n");
    for (i = 0; i < r2; i++)
        for (j = 0; j < c2; j++)
            scanf("%d", &b[i][j]);

    multiply(a, b, c, r1, c1, c2);

    printf("\\nProduct Matrix (%dx%d):\\n", r1, c2);
    for (i = 0; i < r1; i++)
    {
        for (j = 0; j < c2; j++)
            printf("%4d", c[i][j]);
        printf("\\n");
    }

    getch();
}`,
    practiceCode: `#include <stdio.h>

#define MAX 10

// Function to multiply two matrices
void multiplyMatrices(const int a[MAX][MAX], const int b[MAX][MAX], int res[MAX][MAX],
                      int r1, int c1, int c2)
{
    for (int i = 0; i < r1; i++) {
        for (int j = 0; j < c2; j++) {
            res[i][j] = 0;
            for (int k = 0; k < c1; k++) {
                res[i][j] += a[i][k] * b[k][j];
            }
        }
    }
}

int main(void)
{
    int a[MAX][MAX], b[MAX][MAX], prod[MAX][MAX];
    int r1, c1, r2, c2;

    printf("Enter rows and cols for Matrix A: ");
    scanf("%d %d", &r1, &c1);
    printf("Enter rows and cols for Matrix B: ");
    scanf("%d %d", &r2, &c2);

    if (c1 != r2) {
        printf("Error: Incompatible dimensions for multiplication! (c1: %d != r2: %d)\\n", c1, r2);
        return 1;
    }

    printf("\\nEnter Matrix A (%dx%d):\\n", r1, c1);
    for (int i = 0; i < r1; i++)
        for (int j = 0; j < c1; j++)
            scanf("%d", &a[i][j]);

    printf("\\nEnter Matrix B (%dx%d):\\n", r2, c2);
    for (int i = 0; i < r2; i++)
        for (int j = 0; j < c2; j++)
            scanf("%d", &b[i][j]);

    multiplyMatrices(a, b, prod, r1, c1, c2);

    printf("\\n=== Product Matrix (%dx%d) ===\\n", r1, c2);
    for (int i = 0; i < r1; i++) {
        for (int j = 0; j < c2; j++) {
            printf("%6d", prod[i][j]);
        }
        printf("\\n");
    }

    return 0;
}`,
    explanation: 'Matrix multiplication calculates the dot product of the i-th row of A and the j-th column of B. This requires 3 nested loops: i loops over rows of A (0 to r1-1), j loops over columns of B (0 to c2-1), and k sums products over common dimension (0 to c1-1). Passing a 2D array to a function in C requires fixing the column bound in the formal parameter list.',
    sampleInput: '2 3\n3 2\n1 2 3\n4 5 6\n7 8\n9 1\n2 3',
    sampleOutput: `=== Product Matrix (2x2) ===
    31    19
    85    55`,
    commonMistakes: [
      'Forgetting to initialize c[i][j] = 0 before the k accumulation loop.',
      'Checking wrong compatibility condition (it must be c1 == r2, not r1 == r2).',
      'Using wrong loop limits (k goes up to c1, not c2).'
    ],
    examTips: [
      'In viva: "Why do 2D array parameters require column size?" Answer: The compiler needs the column size to calculate memory row offsets: offset = i * COLS + j.',
      'Result matrix always has dimensions r1 × c2.'
    ],
    vivaQuestions: [
      {
        question: 'Why must column size be specified when passing 2D arrays to a function?',
        answer: 'In C, 2D arrays are stored in row-major order. To compute the address of element arr[i][j] via *(arr + (i * COLS) + j), the compiler must know the number of columns (COLS).'
      }
    ],
    quickRevision: {
      purpose: 'Multiply two matrices using a function.',
      coreLogic: 'c[i][j] = 0; for(k=0; k<c1; k++) c[i][j] += a[i][k] * b[k][j];',
      importantSyntax: 'Condition: c1 == r2; Result size: r1 x c2',
      importantFunction: 'Triple nested loop (i, j, k)',
      commonMistake: 'Forgetting to set c[i][j] = 0 before the k loop.',
      examReminder: 'Row-column dot product.'
    },
    keywords: ['matrix multiplication', 'functions', '2D array', 'triple loop', 'dot product', 'linear algebra']
  },
  {
    id: 'b10',
    code: 'B10',
    part: 'B',
    number: 10,
    title: 'Prime Number Checking Using isPrime() Function',
    shortTitle: 'Prime Check Using isPrime()',
    objective: 'Write a C program to check whether a given integer is prime or not using a user-defined function isPrime().',
    concepts: ['User-Defined Functions', 'Function Prototypes', 'Return Values (1 for true, 0 for false)', 'Prime Divisibility Testing'],
    topics: ['Functions', 'Numbers'],
    difficulty: 'Beginner',
    logic: [
      'Declare prototype: int isPrime(int n);',
      'Implement isPrime(n):',
      '  If n <= 1: return 0 (not prime).',
      '  Loop d from 2 up to d * d <= n (or n/2):',
      '    If n % d == 0: return 0 (divisor found, not prime).',
      '  Return 1 (no divisor found, number is prime).',
      'In main(): read number, call isPrime(num), and display message.'
    ],
    journalNote: 'Journal reference — shows modular function design returning 1 or 0 to caller.',
    journalCode: `#include <stdio.h>
#include <conio.h>

int isPrime(int n)
{
    int i;
    if (n <= 1)
        return 0;

    for (i = 2; i <= n / 2; i++)
    {
        if (n % i == 0)
            return 0; // Divisor found
    }
    return 1; // Number is prime
}

void main()
{
    int num;
    clrscr();

    printf("Enter an integer: ");
    scanf("%d", &num);

    if (isPrime(num))
        printf("\\n%d is a PRIME number.", num);
    else
        printf("\\n%d is NOT a prime number.", num);

    getch();
}`,
    practiceCode: `#include <stdio.h>
#include <stdbool.h>

// User-defined function to test primality
bool isPrime(int n)
{
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;

    for (int d = 5; d * d <= n; d += 6) {
        if (n % d == 0 || n % (d + 2) == 0) {
            return false;
        }
    }
    return true;
}

int main(void)
{
    int num;

    printf("Enter an integer to test: ");
    if (scanf("%d", &num) != 1) {
        printf("Error: Invalid integer input.\\n");
        return 1;
    }

    printf("\\n--- Primality Test ---\\n");
    if (isPrime(num)) {
        printf("%d is a PRIME number.\\n", num);
    } else {
        printf("%d is COMPOSITE / NOT PRIME.\\n", num);
    }

    return 0;
}`,
    explanation: 'Modular design isolates business logic inside a reusable function. The function isPrime() accepts an integer parameter and returns a boolean status (1 for prime, 0 for not prime). By testing divisors up to √n, primality is checked in O(√n) time.',
    sampleInput: '37',
    sampleOutput: `Enter an integer to test: 37

--- Primality Test ---
37 is a PRIME number.`,
    commonMistakes: [
      'Returning 1 for n = 1 or negative numbers (1 and negative numbers are NOT prime).',
      'Forgetting to return 1 at the end of the function if no divisor is found.'
    ],
    examTips: [
      'Explain that functions promote reusability and modularity.',
      'Show how if (isPrime(num)) evaluates directly in C because non-zero means true.'
    ],
    vivaQuestions: [
      {
        question: 'What does a function prototype do in C?',
        answer: 'A function prototype declares the function\'s name, return type, and parameter types to the compiler before its definition, enabling type checking of function calls.'
      }
    ],
    quickRevision: {
      purpose: 'Check if number is prime via separate isPrime() function.',
      coreLogic: 'int isPrime(n) { if(n<=1) return 0; for(i=2; i*i<=n; i++) if(n%i==0) return 0; return 1; }',
      importantSyntax: 'int isPrime(int n);',
      importantFunction: 'return 0 on factor, return 1 on prime',
      commonMistake: 'Returning 1 for n <= 1.',
      examReminder: 'Function returns 1 or 0 directly to if statement.'
    },
    keywords: ['prime', 'functions', 'isPrime', 'modular programming', 'return value', 'numbers']
  },
  {
    id: 'b11',
    code: 'B11',
    part: 'B',
    number: 11,
    title: 'Celsius to Fahrenheit Table Using Functions',
    shortTitle: 'Celsius to Fahrenheit Table',
    objective: 'Write a C program to print a formatted conversion table from Celsius to Fahrenheit within a given range using a user-defined conversion function.',
    concepts: ['Functions with Float Return', 'Temperature Formula F = (C × 9/5) + 32', 'Tabular Formatted Output (printf width specifiers)', 'Loop Stepping'],
    topics: ['Functions', 'Basics', 'Loops'],
    difficulty: 'Beginner',
    logic: [
      'Define function float toFahrenheit(float celsius):',
      '  return (celsius * 9.0 / 5.0) + 32.0.',
      'In main(): read start Celsius, end Celsius, and step increment.',
      'Print table header with columns: Celsius and Fahrenheit.',
      'Loop from start to end with step increment.',
      'Call toFahrenheit(c) in each iteration and print aligned row.'
    ],
    journalNote: 'Journal reference — use 9.0 / 5.0 (or 1.8) to prevent integer truncation of 9 / 5 to 1!',
    journalCode: `#include <stdio.h>
#include <conio.h>

float toFahrenheit(float c)
{
    return ((c * 9.0 / 5.0) + 32.0);
}

void main()
{
    float start, end, step, c;
    clrscr();

    printf("Enter starting Celsius: ");
    scanf("%f", &start);
    printf("Enter ending Celsius: ");
    scanf("%f", &end);
    printf("Enter step increment: ");
    scanf("%f", &step);

    printf("\\n------------------------------");
    printf("\\n Celsius (C) | Fahrenheit (F)");
    printf("\\n------------------------------");

    for (c = start; c <= end; c += step)
    {
        printf("\\n   %6.2f    |    %6.2f", c, toFahrenheit(c));
    }
    printf("\\n------------------------------");

    getch();
}`,
    practiceCode: `#include <stdio.h>

// User-defined conversion function
double celsiusToFahrenheit(double celsius)
{
    return (celsius * 9.0 / 5.0) + 32.0;
}

int main(void)
{
    double startC, endC, stepC;

    printf("Enter Start Celsius (e.g. 0): ");
    scanf("%lf", &startC);
    printf("Enter End Celsius   (e.g. 100): ");
    scanf("%lf", &endC);
    printf("Enter Step Size     (e.g. 10): ");
    scanf("%lf", &stepC);

    if (stepC <= 0 || startC > endC) {
        printf("Error: Step must be positive and start <= end.\\n");
        return 1;
    }

    printf("\\n+--------------+----------------+\\n");
    printf("|  Celsius (C) | Fahrenheit (F) |\\n");
    printf("+--------------+----------------+\\n");

    for (double c = startC; c <= endC + 1e-6; c += stepC) {
        printf("|   %8.2f   |    %8.2f    |\\n", c, celsiusToFahrenheit(c));
    }

    printf("+--------------+----------------+\\n");
    return 0;
}`,
    explanation: 'Conversion between Celsius and Fahrenheit uses the physical relation F = (9/5)C + 32. In C, writing 9/5 using integers results in integer division yielding 1 instead of 1.8. Writing 9.0 / 5.0 ensures floating-point precision. The function encapsulates the formula cleanly, while printf formatted width specifiers align table columns.',
    sampleInput: '0 50 10',
    sampleOutput: `+--------------+----------------+
|  Celsius (C) | Fahrenheit (F) |
+--------------+----------------+
|       0.00   |       32.00    |
|      10.00   |       50.00    |
|      20.00   |       68.00    |
|      30.00   |       86.00    |
|      40.00   |      104.00    |
|      50.00   |      122.00    |
+--------------+----------------+`,
    commonMistakes: [
      'Writing 9 / 5 instead of 9.0 / 5.0 (evaluates to integer 1, producing totally wrong temperatures!).',
      'Entering a negative or zero step value causing an infinite loop.'
    ],
    examTips: [
      'Remember the classic temperature milestones: 0°C = 32°F, 100°C = 212°F, -40°C = -40°F.',
      'Highlight the 9.0 / 5.0 floating point division in your written exam.'
    ],
    vivaQuestions: [
      {
        question: 'Why does 9 / 5 evaluate to 1 in C?',
        answer: 'Both 9 and 5 are integer literals. In C, the division operator applied to two integers performs integer division, discarding any remainder or fractional part.'
      }
    ],
    quickRevision: {
      purpose: 'Generate C to F temperature table via function.',
      coreLogic: 'return (c * 9.0 / 5.0) + 32.0;',
      importantSyntax: '9.0 / 5.0 (NOT 9/5)',
      importantFunction: 'Formatted printf width (%8.2f)',
      commonMistake: 'Integer division 9/5 gives 1 instead of 1.8.',
      examReminder: '0 C = 32 F, 100 C = 212 F.'
    },
    keywords: ['celsius', 'fahrenheit', 'temperature', 'conversion', 'functions', 'table']
  },
  {
    id: 'b12',
    code: 'B12',
    part: 'B',
    number: 12,
    title: 'Array of Structures: Roll No, Name, and Average Marks',
    shortTitle: 'Array of Structures (Students)',
    objective: 'Write a C program to define a structure Student with members Roll No, Name, and Average Marks, read records for n students, and display them in tabular format.',
    concepts: ['struct Keyword', 'Array of Structures', 'Member Access Operator (.)', 'Heterogeneous Data Representation'],
    topics: ['Structures', 'Arrays'],
    difficulty: 'Intermediate',
    logic: [
      'Define structure struct Student { int rollNo; char name[50]; float avgMarks; };',
      'Declare array of structures: struct Student s[n];',
      'Read number of students n.',
      'Loop from 0 to n - 1: read rollNo, name, and avgMarks for each student s[i].',
      'Display all student records in clean tabular column format.',
      'Optionally compute class average or find highest scorer.'
    ],
    journalNote: 'Journal reference — standard structure definition and array indexing with dot (.) operator.',
    journalCode: `#include <stdio.h>
#include <conio.h>

struct Student
{
    int rollNo;
    char name[30];
    float avgMarks;
};

void main()
{
    struct Student s[50];
    int n, i;
    clrscr();

    printf("Enter number of students: ");
    scanf("%d", &n);

    for (i = 0; i < n; i++)
    {
        printf("\\nEnter details for Student %d:\\n", i + 1);
        printf("Roll Number: ");
        scanf("%d", &s[i].rollNo);
        printf("Name: ");
        scanf("%s", s[i].name);
        printf("Average Marks: ");
        scanf("%f", &s[i].avgMarks);
    }

    printf("\\n\\n==============================================");
    printf("\\n ROLL NO |           NAME           | AVG MARKS");
    printf("\\n==============================================");
    for (i = 0; i < n; i++)
    {
        printf("\\n %-7d | %-24s | %8.2f", s[i].rollNo, s[i].name, s[i].avgMarks);
    }
    printf("\\n==============================================");

    getch();
}`,
    practiceCode: `#include <stdio.h>

#define MAX_STUDENTS 50
#define NAME_LEN 40

struct Student {
    int rollNo;
    char name[NAME_LEN];
    double avgMarks;
};

int main(void)
{
    struct Student students[MAX_STUDENTS];
    int n;

    printf("Enter number of students (max %d): ", MAX_STUDENTS);
    if (scanf("%d", &n) != 1 || n <= 0 || n > MAX_STUDENTS) {
        printf("Error: Invalid number of students.\\n");
        return 1;
    }

    for (int i = 0; i < n; i++) {
        printf("\\n[Student %d of %d]\\n", i + 1, n);
        printf("Enter Roll Number: ");
        scanf("%d", &students[i].rollNo);

        printf("Enter Name: ");
        scanf("%39s", students[i].name);

        printf("Enter Average Marks: ");
        scanf("%lf", &students[i].avgMarks);
    }

    printf("\\n=======================================================\\n");
    printf("| %-8s | %-25s | %-12s |\\n", "ROLL NO", "STUDENT NAME", "AVG MARKS");
    printf("=======================================================\\n");

    double totalAvg = 0.0;
    int topperIdx = 0;

    for (int i = 0; i < n; i++) {
        printf("| %-8d | %-25s | %10.2f%% |\\n",
               students[i].rollNo, students[i].name, students[i].avgMarks);
        totalAvg += students[i].avgMarks;
        if (students[i].avgMarks > students[topperIdx].avgMarks) {
            topperIdx = i;
        }
    }

    printf("=======================================================\\n");
    printf("Class Overall Average: %.2f%%\\n", totalAvg / n);
    printf("Class Topper:          %s (%.2f%%)\\n", students[topperIdx].name, students[topperIdx].avgMarks);

    return 0;
}`,
    explanation: 'A structure is a user-defined composite data type that groups related variables of different data types under a single name. An array of structures allows managing collections of records (such as an entire class of students), accessing individual record attributes using the array subscript and dot operator: s[i].rollNo.',
    sampleInput: '3\n101 Alice 88.5\n102 Bob 76.0\n103 Charlie 92.5',
    sampleOutput: `=======================================================
| ROLL NO  | STUDENT NAME              | AVG MARKS    |
=======================================================
| 101      | Alice                     |      88.50% |
| 102      | Bob                       |      76.00% |
| 103      | Charlie                   |      92.50% |
=======================================================
Class Overall Average: 85.67%
Class Topper:          Charlie (92.50%)`,
    commonMistakes: [
      'Using an ampersand & when reading the string name into scanf("%s", &s[i].name) — an array name is already a pointer!',
      'Forgetting the dot operator when accessing structure fields.'
    ],
    examTips: [
      'In viva: "What is the difference between an array and a structure?" Array stores homogeneous (same type) elements; Structure stores heterogeneous (different types) elements.',
      'Explain how memory is allocated for each struct instance.'
    ],
    vivaQuestions: [
      {
        question: 'What is the difference between an array and a structure in C?',
        answer: 'An array is a homogeneous collection of elements of the same data type stored at contiguous locations. A structure is a heterogeneous collection that can bundle variables of different data types together.'
      }
    ],
    quickRevision: {
      purpose: 'Manage student records with array of structures.',
      coreLogic: 'struct Student s[n]; s[i].rollNo; s[i].name; s[i].avgMarks;',
      importantSyntax: 'struct Student { ... }; struct Student s[50];',
      importantFunction: 'Dot operator (.) for member access',
      commonMistake: 'Using & on string member in scanf.',
      examReminder: 'Structures hold heterogeneous data types.'
    },
    keywords: ['structure', 'struct', 'array of structures', 'student', 'roll no', 'heterogeneous']
  },
  {
    id: 'b13',
    code: 'B13',
    part: 'B',
    number: 13,
    title: 'Structure vs Union: Display Memory Sizes',
    shortTitle: 'Structure vs Union (Memory Sizes)',
    objective: 'Write a C program to define a structure and a union having identical members (emp_no, emp_name, salary), demonstrate member access, and display and compare their memory sizes using sizeof().',
    concepts: ['struct vs union Memory Allocation', 'sizeof() Operator', 'Shared Memory in Union', 'Structure Memory Padding / Alignment'],
    topics: ['Structures', 'Unions'],
    difficulty: 'Advanced',
    logic: [
      'Define struct Employee { int emp_no; char emp_name[20]; float salary; };',
      'Define union EmpUnion { int emp_no; char emp_name[20]; float salary; };',
      'Declare instances of both: struct Employee e_struct; union EmpUnion e_union;',
      'Print size of individual member types: sizeof(int), sizeof(char[20]), sizeof(float).',
      'Print sizeof(struct Employee): sum of member sizes plus compiler alignment padding.',
      'Print sizeof(union EmpUnion): equal to the size of the largest member (emp_name[20]).',
      'Demonstrate union overwriting: assigning salary overwrites emp_no because they share the same memory location!'
    ],
    journalNote: 'Journal reference — classic demonstration of shared union memory versus dedicated structure member memory.',
    journalCode: `#include <stdio.h>
#include <conio.h>
#include <string.h>

struct EmployeeStruct
{
    int emp_no;
    char emp_name[20];
    float salary;
};

union EmployeeUnion
{
    int emp_no;
    char emp_name[20];
    float salary;
};

void main()
{
    struct EmployeeStruct s;
    union EmployeeUnion u;
    clrscr();

    printf("=== Structure vs Union Demonstration ===\\n\\n");

    printf("Size of struct Employee: %d bytes\\n", sizeof(s));
    printf("Size of union Employee:  %d bytes\\n", sizeof(u));

    // Structure holds all members independently
    s.emp_no = 101;
    strcpy(s.emp_name, "Ramesh");
    s.salary = 45000.50;

    printf("\\nStructure Member Values (All valid simultaneously):\\n");
    printf("Emp No: %d, Name: %s, Salary: %.2f\\n", s.emp_no, s.emp_name, s.salary);

    // Union shares memory among members
    u.emp_no = 202;
    printf("\\nUnion after setting emp_no:\\n");
    printf("Emp No: %d\\n", u.emp_no);

    u.salary = 55000.75;
    printf("Union after setting salary (emp_no is now overwritten!):\\n");
    printf("Salary: %.2f, Corrupted Emp No: %d\\n", u.salary, u.emp_no);

    getch();
}`,
    practiceCode: `#include <stdio.h>
#include <string.h>

struct EmployeeStruct {
    int emp_no;
    char emp_name[20];
    float salary;
};

union EmployeeUnion {
    int emp_no;
    char emp_name[20];
    float salary;
};

int main(void)
{
    struct EmployeeStruct s;
    union EmployeeUnion u;

    printf("=== Structure vs Union: Memory Comparison ===\\n\\n");

    printf("Individual Member Sizes:\\n");
    printf("  sizeof(int emp_no)        = %zu bytes\\n", sizeof(int));
    printf("  sizeof(char emp_name[20]) = %zu bytes\\n", sizeof(char[20]));
    printf("  sizeof(float salary)      = %zu bytes\\n", sizeof(float));
    printf("  Theoretical Sum           = %zu bytes\\n\\n",
           sizeof(int) + sizeof(char[20]) + sizeof(float));

    printf("Total Container Sizes:\\n");
    printf("  sizeof(struct Employee)   = %zu bytes (stores ALL members simultaneously)\\n", sizeof(s));
    printf("  sizeof(union Employee)    = %zu bytes (stores only ONE member at a time)\\n\\n", sizeof(u));

    // 1. Structure demonstration
    s.emp_no = 1001;
    strncpy(s.emp_name, "Aditya Rao", sizeof(s.emp_name) - 1);
    s.salary = 65000.0f;

    printf("Structure (all values intact):\\n");
    printf("  ID: %d | Name: %s | Salary: Rs. %.2f\\n\\n", s.emp_no, s.emp_name, s.salary);

    // 2. Union demonstration
    printf("Union Demonstration (Memory Overlap):\\n");
    u.emp_no = 2002;
    printf("  1. Assigned u.emp_no = 2002 -> Read u.emp_no = %d\\n", u.emp_no);

    u.salary = 82500.50f;
    printf("  2. Assigned u.salary = 82500.50 -> Read u.salary = %.2f\\n", u.salary);
    printf("     Notice u.emp_no is now corrupt garbage: %d\\n", u.emp_no);

    return 0;
}`,
    explanation: 'In a structure, every member gets its own independent memory location, and the total size is at least the sum of sizes of all members (plus potential alignment padding bytes). In a union, all members share the same starting memory location; its size equals the size of its largest member. Consequently, in a union, only one member can hold a meaningful value at any given instant.',
    sampleInput: 'No input required (demonstration program)',
    sampleOutput: `=== Structure vs Union: Memory Comparison ===

Individual Member Sizes:
  sizeof(int emp_no)        = 4 bytes
  sizeof(char emp_name[20]) = 20 bytes
  sizeof(float salary)      = 4 bytes
  Theoretical Sum           = 28 bytes

Total Container Sizes:
  sizeof(struct Employee)   = 28 bytes (stores ALL members simultaneously)
  sizeof(union Employee)    = 20 bytes (stores only ONE member at a time)

Structure (all values intact):
  ID: 1001 | Name: Aditya Rao | Salary: Rs. 65000.00

Union Demonstration (Memory Overlap):
  1. Assigned u.emp_no = 2002 -> Read u.emp_no = 2002
  2. Assigned u.salary = 82500.50 -> Read u.salary = 82500.50
     Notice u.emp_no is now corrupt garbage: 1199341600`,
    commonMistakes: [
      'Expecting all union members to retain their values simultaneously.',
      'Assuming structure size is always an exact mathematical sum without accounting for memory padding/alignment.',
      'Writing sizeof on an uninstantiated type incorrectly (must use sizeof(struct Employee) or sizeof(var)).'
    ],
    examTips: [
      'Top viva question: "Why is union size 20 bytes while struct is 28 bytes?" Answer: Union allocates only enough for the largest member (emp_name[20]), while struct allocates for all members.',
      'Draw the memory layout diagram of struct vs union in the exam answer booklet.'
    ],
    vivaQuestions: [
      {
        question: 'What is the primary difference between a structure and a union?',
        answer: 'In a structure, each member has its own separate memory address and all members can be accessed at the same time. In a union, all members share the same base memory location, the size is determined by the largest member, and only one member can be used at a time.'
      },
      {
        question: 'What is structure padding?',
        answer: 'Compilers insert unused padding bytes between structure members to align them to natural processor word boundaries (e.g. 4 or 8 bytes) for faster memory bus access.'
      }
    ],
    quickRevision: {
      purpose: 'Compare memory storage of struct vs union.',
      coreLogic: 'sizeof(struct) >= sum of members; sizeof(union) == size of largest member;',
      importantSyntax: 'sizeof(s) vs sizeof(u)',
      importantFunction: 'sizeof() operator',
      commonMistake: 'Expecting union to hold all members concurrently.',
      examReminder: 'Union shares memory; writing to one member overwrites others.'
    },
    keywords: ['structure', 'union', 'sizeof', 'memory alignment', 'shared memory', 'padding']
  }
];
