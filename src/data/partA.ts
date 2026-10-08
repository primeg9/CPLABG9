import { Program } from '../types';

export const partAPrograms: Program[] = [
  {
    id: 'a01',
    code: 'A01',
    part: 'A',
    number: 1,
    title: 'Radius: Calculate Area and Circumference',
    shortTitle: 'Circle Area & Circumference',
    objective: 'Write a C program to read the radius of a circle and calculate its area and circumference.',
    concepts: ['Variables & Constants', 'Floating Point Arithmetic', 'Standard I/O (printf, scanf)', 'Symbolic Constants (#define)'],
    topics: ['Basics', 'Input / Output'],
    difficulty: 'Beginner',
    logic: [
      'Define PI as a symbolic constant using #define PI 3.14159 or const float.',
      'Declare float variables for radius, area, and circumference.',
      'Prompt the user and read the radius using scanf("%f", &radius).',
      'Compute area using formula: Area = PI * radius * radius.',
      'Compute circumference using formula: Circumference = 2 * PI * radius.',
      'Display the calculated values formatted to 2 decimal places using %.2f.'
    ],
    journalNote: 'Journal reference — directly from Rani Channamma University BCA Lab Journal (KLE Society SSMS BCA College, Athani).',
    journalCode: `#include<stdio.h> 

int main()
{
    float radius, area, circum; 
    printf("Enter the radius of circle \\n"); 
    scanf("%f", &radius); 
    area = 3.14 * radius * radius; 
    circum = 2 * 3.14 * radius;
    printf("area of circle: %f \\n", area); 
    printf("circumference of circle: %f \\n", circum);
}`,
    practiceCode: `#include <stdio.h>
#define PI 3.14159265358979323846

int main(void)
{
    double radius, area, circumference;

    printf("Enter the radius of the circle: ");
    if (scanf("%lf", &radius) != 1 || radius < 0) {
        printf("Error: Please enter a valid non-negative radius.\\n");
        return 1;
    }

    area = PI * radius * radius;
    circumference = 2.0 * PI * radius;

    printf("\\nResults:\\n");
    printf("Radius:         %.2f\\n", radius);
    printf("Area:           %.2f sq units\\n", area);
    printf("Circumference:  %.2f units\\n", circumference);

    return 0;
}`,
    explanation: 'The program defines the constant value of PI using preprocessor macro #define. The radius is captured via standard input. Using fundamental geometry equations, area is calculated as πr² and circumference as 2πr. In the practice version, double precision is utilized along with input validation and standard int main() return 0.',
    sampleInput: '7.5',
    sampleOutput: `Enter the radius of the circle: 7.5

Results:
Radius:         7.50
Area:           176.71 sq units
Circumference:  47.12 units`,
    commonMistakes: [
      'Forgetting the ampersand (&) in scanf("%f", &r).',
      'Using integer division or declaring radius as integer which truncates fractional precision.',
      'Using ^ for exponentiation (in C, ^ is bitwise XOR, not power; write r * r or pow(r, 2)).'
    ],
    examTips: [
      'Always state units in the final output (e.g., sq units) if writing in the journal answer sheet.',
      'Mention that #define PI is processed at preprocessor stage before actual compilation.'
    ],
    vivaQuestions: [
      {
        question: 'What is the difference between #define PI 3.14 and const float PI = 3.14?',
        answer: '#define is a preprocessor macro directive that replaces tokens textually before compilation without occupying memory. const float is a typed variable that allocates memory and is type-checked by the compiler.'
      },
      {
        question: 'Why do we use %lf for double and %f for float in scanf?',
        answer: 'scanf needs to know the exact storage size to write bytes into memory. %f expects a 4-byte float pointer while %lf expects an 8-byte double pointer. In printf, float is automatically promoted to double so %f works for both.'
      }
    ],
    quickRevision: {
      purpose: 'Calculate area and circumference of a circle from radius.',
      coreLogic: 'Area = PI * r * r; Circumference = 2 * PI * r;',
      importantSyntax: '#define PI 3.14159',
      importantFunction: 'scanf("%f", &r); printf("%.2f", area);',
      commonMistake: 'Using r^2 instead of r * r (^ is bitwise XOR in C).',
      examReminder: 'Remember & in scanf and include units in output format.'
    },
    keywords: ['circle', 'radius', 'area', 'circumference', 'pi', 'float', 'conio']
  },
  {
    id: 'a02',
    code: 'A02',
    part: 'A',
    number: 2,
    title: 'Simple Interest',
    shortTitle: 'Simple Interest Calculator',
    objective: 'Write a C program to input Principal, Time, and Rate of Interest and calculate the Simple Interest and Total Amount.',
    concepts: ['Arithmetic Operators', 'Formula Evaluation', 'Data Types (float/double)'],
    topics: ['Basics', 'Input / Output'],
    difficulty: 'Beginner',
    logic: [
      'Declare variables for Principal (p), Time (t), Rate (r), Simple Interest (si), and Total Amount (total).',
      'Input p, t, and r from the user.',
      'Apply formula: si = (p * t * r) / 100.0.',
      'Calculate total amount payable: total = p + si.',
      'Print the simple interest and total amount.'
    ],
    journalNote: 'Journal reference — may use void main() and clrscr() in standard college lab notebook.',
    journalCode: `#include <stdio.h>
#include <conio.h>

void main()
{
    float p, t, r, si, total;
    clrscr();
    printf("Enter Principal amount: ");
    scanf("%f", &p);
    printf("Enter Time period (in years): ");
    scanf("%f", &t);
    printf("Enter Rate of interest (%%): ");
    scanf("%f", &r);

    si = (p * t * r) / 100;
    total = p + si;

    printf("\\nSimple Interest = %.2f", si);
    printf("\\nTotal Amount = %.2f", total);
    getch();
}`,
    practiceCode: `#include <stdio.h>

int main(void)
{
    double principal, timeYears, ratePercent, simpleInterest, totalAmount;

    printf("Enter Principal amount: ");
    scanf("%lf", &principal);

    printf("Enter Time period (years): ");
    scanf("%lf", &timeYears);

    printf("Enter Annual Rate of interest (%%): ");
    scanf("%lf", &ratePercent);

    if (principal < 0 || timeYears < 0 || ratePercent < 0) {
        printf("Error: Values cannot be negative.\\n");
        return 1;
    }

    simpleInterest = (principal * timeYears * ratePercent) / 100.0;
    totalAmount = principal + simpleInterest;

    printf("\\n--- Interest Calculation ---\\n");
    printf("Principal:       Rs. %.2f\\n", principal);
    printf("Simple Interest: Rs. %.2f\\n", simpleInterest);
    printf("Total Amount:    Rs. %.2f\\n", totalAmount);

    return 0;
}`,
    explanation: 'Simple Interest is calculated using the formula (P * T * R) / 100. Dividing by 100.0 ensures floating point division. The total amount is the sum of principal and the accumulated simple interest.',
    sampleInput: '10000 2 8.5',
    sampleOutput: `Enter Principal amount: 10000
Enter Time period (years): 2
Enter Annual Rate of interest (%): 8.5

--- Interest Calculation ---
Principal:       Rs. 10000.00
Simple Interest: Rs. 1700.00
Total Amount:    Rs. 11700.00`,
    commonMistakes: [
      'Using integer variables resulting in truncated integer division when computing interest.',
      'Entering time in months without dividing by 12 when rate is per annum.'
    ],
    examTips: [
      'Write 100.0 instead of 100 to guarantee floating point arithmetic regardless of variable type.',
      'Always mention that time is in years and rate is in percent.'
    ],
    vivaQuestions: [
      {
        question: 'What happens if you divide integers (p * t * r) / 100 where all are int?',
        answer: 'In C, integer divided by integer yields an integer quotient, discarding the fractional part. For example, 150 / 100 becomes 1 instead of 1.5.'
      }
    ],
    quickRevision: {
      purpose: 'Calculate Simple Interest and Total Amount.',
      coreLogic: 'si = (p * t * r) / 100.0; total = p + si;',
      importantSyntax: 'float p, t, r, si;',
      importantFunction: 'scanf("%f %f %f", &p, &t, &r);',
      commonMistake: 'Integer division truncation if variables are int.',
      examReminder: 'Always divide by 100.0.'
    },
    keywords: ['simple interest', 'principal', 'rate', 'time', 'finance', 'basics']
  },
  {
    id: 'a03',
    code: 'A03',
    part: 'A',
    number: 3,
    title: 'Largest of Three Numbers',
    shortTitle: 'Find Largest of 3 Numbers',
    objective: 'Write a C program to find the largest among three numbers using conditional statements (if-else / nested if).',
    concepts: ['Relational Operators (>, <, >=)', 'Logical Operators (&&)', 'Conditional Branching (if - else if - else)'],
    topics: ['Conditions', 'Basics'],
    difficulty: 'Beginner',
    logic: [
      'Read three numbers a, b, and c.',
      'Check if (a >= b && a >= c); if true, a is the largest.',
      'Else check if (b >= a && b >= c); if true, b is the largest.',
      'Otherwise, c is the largest.',
      'Print the largest value.'
    ],
    journalNote: 'Journal reference — may use nested if statements or compound relational expressions.',
    journalCode: `#include <stdio.h>
#include <conio.h>

void main()
{
    int a, b, c, big;
    clrscr();
    printf("Enter three integer numbers: ");
    scanf("%d %d %d", &a, &b, &c);

    if (a >= b && a >= c)
        big = a;
    else if (b >= c)
        big = b;
    else
        big = c;

    printf("\\nThe largest number is = %d", big);
    getch();
}`,
    practiceCode: `#include <stdio.h>

int main(void)
{
    int a, b, c;

    printf("Enter three integers (separated by spaces): ");
    if (scanf("%d %d %d", &a, &b, &c) != 3) {
        printf("Error: Invalid integer input.\\n");
        return 1;
    }

    int largest;
    if (a >= b && a >= c) {
        largest = a;
    } else if (b >= c) {
        largest = b;
    } else {
        largest = c;
    }

    printf("Numbers entered: %d, %d, %d\\n", a, b, c);
    printf("Largest number:  %d\\n", largest);

    return 0;
}`,
    explanation: 'The program compares the three inputs. Using logical AND (&&), if a is greater than or equal to both b and c, it is the largest. If that condition fails, a cannot be the largest, so we only need to compare b against c in the else-if clause. If b >= c, then b is largest; otherwise c is largest.',
    sampleInput: '45 92 18',
    sampleOutput: `Enter three integers (separated by spaces): 45 92 18
Numbers entered: 45, 92, 18
Largest number:  92`,
    commonMistakes: [
      'Writing if (a > b > c) — in C this evaluates (a > b) as 1 or 0, then compares that with c!',
      'Using single & instead of logical &&.',
      'Missing equality (using strict > instead of >=), which fails when two or three numbers are equal.'
    ],
    examTips: [
      'Explain both approaches in viva: nested if-else vs logical && operators.',
      'Mention how the ternary operator can also express this: big = (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);'
    ],
    vivaQuestions: [
      {
        question: 'Why does if (a > b > c) not work in C?',
        answer: 'Because relational operators have left-to-right associativity. In C, (a > b) evaluates first to a boolean 1 or 0. That 1 or 0 is then compared with c (1 > c or 0 > c), giving completely erroneous logic.'
      }
    ],
    quickRevision: {
      purpose: 'Determine the largest of 3 inputs.',
      coreLogic: 'if (a >= b && a >= c) big=a; else if (b >= c) big=b; else big=c;',
      importantSyntax: 'Logical AND (&&)',
      importantFunction: 'scanf("%d %d %d", &a, &b, &c);',
      commonMistake: 'Writing (a > b > c) instead of (a > b && a > c).',
      examReminder: 'Use >= to properly handle equal values.'
    },
    keywords: ['largest', 'maximum', 'three numbers', 'if-else', 'conditions', 'relational']
  },
  {
    id: 'a04',
    code: 'A04',
    part: 'A',
    number: 4,
    title: 'Basic Calculator Using Switch',
    shortTitle: 'Calculator Using Switch',
    objective: 'Write a C program to simulate a simple calculator capable of performing addition, subtraction, multiplication, division, and modulus using a switch statement. Include division-by-zero handling.',
    concepts: ['switch-case Statement', 'break Statement', 'default Case', 'Division-by-Zero Handling', 'Character Input'],
    topics: ['Switch', 'Conditions', 'Basics'],
    difficulty: 'Beginner',
    logic: [
      'Read two numbers and an operator character (+, -, *, /, %).',
      'Evaluate the operator inside a switch(op) statement.',
      'In division (/) and modulus (%), check if the second operand is zero.',
      'If zero, print an error message instead of dividing.',
      'Use break after each case to prevent fallthrough.',
      'Include a default case for unsupported operators.'
    ],
    journalNote: 'Journal reference — notice the handling of newline in scanf before reading the operator character.',
    journalCode: `#include <stdio.h>
#include <conio.h>

void main()
{
    float num1, num2, res;
    char op;
    clrscr();

    printf("Enter operator (+, -, *, /): ");
    scanf(" %c", &op);
    printf("Enter two operands: ");
    scanf("%f %f", &num1, &num2);

    switch(op)
    {
        case '+':
            res = num1 + num2;
            printf("Result = %.2f", res);
            break;
        case '-':
            res = num1 - num2;
            printf("Result = %.2f", res);
            break;
        case '*':
            res = num1 * num2;
            printf("Result = %.2f", res);
            break;
        case '/':
            if (num2 == 0)
                printf("Error: Division by zero!");
            else
            {
                res = num1 / num2;
                printf("Result = %.2f", res);
            }
            break;
        default:
            printf("Invalid operator!");
    }
    getch();
}`,
    practiceCode: `#include <stdio.h>

int main(void)
{
    char op;
    double a, b, result;

    printf("=== Simple Calculator ===\\n");
    printf("Enter expression (e.g. 15.5 + 4.2): ");
    
    // Format " %lf %c %lf" skips any leading whitespace
    if (scanf("%lf %c %lf", &a, &op, &b) != 3) {
        printf("Error: Invalid expression format.\\n");
        return 1;
    }

    switch (op) {
        case '+':
            result = a + b;
            printf("%.2f + %.2f = %.2f\\n", a, b, result);
            break;
        case '-':
            result = a - b;
            printf("%.2f - %.2f = %.2f\\n", a, b, result);
            break;
        case '*':
            result = a * b;
            printf("%.2f * %.2f = %.2f\\n", a, b, result);
            break;
        case '/':
            if (b == 0.0) {
                printf("Error: Division by zero is undefined!\\n");
            } else {
                result = a / b;
                printf("%.2f / %.2f = %.2f\\n", a, b, result);
            }
            break;
        case '%':
            // Modulus is only defined on integers
            if ((int)b == 0) {
                printf("Error: Modulo by zero is undefined!\\n");
            } else {
                printf("%d %% %d = %d\\n", (int)a, (int)b, (int)a % (int)b);
            }
            break;
        default:
            printf("Error: Unsupported operator '%c'. Supported: +, -, *, /, %%\\n", op);
            break;
    }

    return 0;
}`,
    explanation: 'The switch construct compares the operator variable against constant character labels. A critical requirement in lab exams is validating division by zero (num2 == 0) before performing division, which otherwise crashes with SIGFPE (floating point exception) or produces infinity. Note the leading space in scanf(" %c", &op) to consume leftover newline characters.',
    sampleInput: '24.0 / 6.0',
    sampleOutput: `=== Simple Calculator ===
Enter expression (e.g. 15.5 + 4.2): 24.0 / 6.0
24.00 / 6.00 = 4.00`,
    commonMistakes: [
      'Omitting the space before %c in scanf(" %c", &op), causing it to read the preceding newline character.',
      'Omitting break statements causing unintended case fallthrough.',
      'Forgetting division-by-zero check (num2 == 0).'
    ],
    examTips: [
      'Examiners always test with num2 = 0 to verify the division-by-zero guard.',
      'Explain why switch requires integral/character expressions and cannot switch directly on a float.'
    ],
    vivaQuestions: [
      {
        question: 'Can we use a float variable in a switch expression in C?',
        answer: 'No. The C language standard specifies that the controlling expression of a switch statement must be of an integer or enumerated type (including char, int, short, long, enum).'
      },
      {
        question: 'What happens if you omit the break statement in a case?',
        answer: 'Execution falls through into the subsequent case statements unconditionally until a break is encountered or the switch block ends.'
      }
    ],
    quickRevision: {
      purpose: 'Simulate basic arithmetic calculator using switch.',
      coreLogic: 'switch(op) { case \'+\': ... break; case \'/\': if(b==0) error; else a/b; break; }',
      importantSyntax: 'switch(op) with case \'+\': and break;',
      importantFunction: 'scanf(" %c", &op); // Notice leading space',
      commonMistake: 'Forgetting break or division by zero check.',
      examReminder: 'Always check if denominator == 0 before division.'
    },
    keywords: ['calculator', 'switch', 'case', 'break', 'division by zero', 'arithmetic']
  },
  {
    id: 'a05',
    code: 'A05',
    part: 'A',
    number: 5,
    title: 'Quadratic Equation Roots',
    shortTitle: 'Roots of Quadratic Equation',
    objective: 'Write a C program to find the roots of a quadratic equation ax² + bx + c = 0 for all three cases (real & distinct, real & equal, and complex roots).',
    concepts: ['Discriminant (b² - 4ac)', 'math.h library (sqrt)', 'Conditional Logic (else-if)', 'Complex Number Representation'],
    topics: ['Conditions', 'Math Functions'],
    difficulty: 'Intermediate',
    logic: [
      'Input coefficients a, b, and c.',
      'Check if a == 0: If so, equation is linear, not quadratic.',
      'Compute discriminant: d = (b * b) - (4.0 * a * c).',
      'Case 1: d > 0 -> Real and distinct roots: r1 = (-b + sqrt(d))/(2*a), r2 = (-b - sqrt(d))/(2*a).',
      'Case 2: d == 0 -> Real and equal roots: r1 = r2 = -b / (2*a).',
      'Case 3: d < 0 -> Complex roots: realPart = -b / (2*a), imagPart = sqrt(-d) / (2*a).'
    ],
    journalNote: 'Journal reference — uses sqrt() from <math.h>. In GCC/Linux, remember to link with -lm.',
    journalCode: `#include <stdio.h>
#include <conio.h>
#include <math.h>

void main()
{
    float a, b, c, d, r1, r2, real, imag;
    clrscr();
    printf("Enter coefficients a, b, c: ");
    scanf("%f %f %f", &a, &b, &c);

    if (a == 0)
    {
        printf("Not a quadratic equation!");
        getch();
        return;
    }

    d = (b * b) - (4 * a * c);

    if (d > 0)
    {
        r1 = (-b + sqrt(d)) / (2 * a);
        r2 = (-b - sqrt(d)) / (2 * a);
        printf("\\nRoots are real and distinct:");
        printf("\\nRoot 1 = %.2f", r1);
        printf("\\nRoot 2 = %.2f", r2);
    }
    else if (d == 0)
    {
        r1 = -b / (2 * a);
        printf("\\nRoots are real and equal:");
        printf("\\nRoot 1 = Root 2 = %.2f", r1);
    }
    else
    {
        real = -b / (2 * a);
        imag = sqrt(-d) / (2 * a);
        printf("\\nRoots are complex and imaginary:");
        printf("\\nRoot 1 = %.2f + %.2fi", real, imag);
        printf("\\nRoot 2 = %.2f - %.2fi", real, imag);
    }
    getch();
}`,
    practiceCode: `#include <stdio.h>
#include <math.h>

int main(void)
{
    double a, b, c;

    printf("Enter coefficients a, b, and c (ax^2 + bx + c = 0): ");
    if (scanf("%lf %lf %lf", &a, &b, &c) != 3) {
        printf("Error: Invalid numeric input.\\n");
        return 1;
    }

    if (a == 0.0) {
        if (b != 0.0) {
            printf("Linear equation (a = 0). Single root x = %.4f\\n", -c / b);
        } else {
            printf("Degenerate equation: no variable x.\\n");
        }
        return 0;
    }

    double discriminant = (b * b) - (4.0 * a * c);
    double denominator = 2.0 * a;

    printf("\\nDiscriminant = %.4f\\n", discriminant);

    if (discriminant > 0.0) {
        double root1 = (-b + sqrt(discriminant)) / denominator;
        double root2 = (-b - sqrt(discriminant)) / denominator;
        printf("Type: Real and distinct roots\\n");
        printf("Root 1 = %.4f\\n", root1);
        printf("Root 2 = %.4f\\n", root2);
    } else if (discriminant == 0.0) {
        double root = -b / denominator;
        printf("Type: Real and equal roots\\n");
        printf("Root 1 = Root 2 = %.4f\\n", root);
    } else {
        double realPart = -b / denominator;
        double imagPart = sqrt(-discriminant) / denominator;
        printf("Type: Complex (imaginary) conjugate roots\\n");
        printf("Root 1 = %.4f + %.4fi\\n", realPart, imagPart);
        printf("Root 2 = %.4f - %.4fi\\n", realPart, imagPart);
    }

    return 0;
}`,
    explanation: 'The roots of ax² + bx + c = 0 are determined by the discriminant Δ = b² - 4ac. When Δ > 0, roots are real and unequal. When Δ = 0, both roots are -b/(2a). When Δ < 0, sqrt(Δ) is imaginary; we calculate sqrt(-Δ) for the imaginary magnitude and print the conjugate pair as real ± imag*i.',
    sampleInput: '1 -5 6',
    sampleOutput: `Enter coefficients a, b, and c (ax^2 + bx + c = 0): 1 -5 6

Discriminant = 1.0000
Type: Real and distinct roots
Root 1 = 3.0000
Root 2 = 2.0000`,
    commonMistakes: [
      'Passing negative discriminant directly to sqrt(d), which results in NaN (domain error). You must pass sqrt(-d)!',
      'Forgetting parentheses in (-b + sqrt(d)) / (2 * a). Writing -b + sqrt(d) / 2 * a divides sqrt(d) by 2 then multiplies by a!',
      'Not checking if a == 0.'
    ],
    examTips: [
      'Always test three distinct cases: (1, -5, 6) for real, (1, -4, 4) for equal, (1, 2, 5) for complex.',
      'Remember to include <math.h> in your code.'
    ],
    vivaQuestions: [
      {
        question: 'Why do we compute sqrt(-d) instead of sqrt(d) when d < 0?',
        answer: 'sqrt() in C expects a non-negative argument. Passing a negative value causes a domain error and returns NaN (Not a Number). Since d is negative, -d is positive, giving the magnitude of the imaginary component.'
      }
    ],
    quickRevision: {
      purpose: 'Compute all roots of ax² + bx + c = 0.',
      coreLogic: 'd = b*b - 4*a*c; if(d>0) real distinct; else if(d==0) equal; else complex: sqrt(-d);',
      importantSyntax: '#include <math.h> and sqrt()',
      importantFunction: 'real = -b/(2*a); imag = sqrt(-d)/(2*a);',
      commonMistake: 'Forgetting parentheses in (-b + sqrt(d)) / (2 * a) or passing negative d to sqrt().',
      examReminder: 'Check a != 0 and handle d < 0 with sqrt(-d).'
    },
    keywords: ['quadratic', 'roots', 'discriminant', 'math.h', 'sqrt', 'complex numbers']
  },
  {
    id: 'a06',
    code: 'A06',
    part: 'A',
    number: 6,
    title: 'Average Marks in N Subjects',
    shortTitle: 'Average Marks in N Subjects',
    objective: 'Write a C program to input marks in n subjects, calculate total marks and average marks, and display the result.',
    concepts: ['Loops (for / while)', 'Accumulator Variable Pattern', 'Initialization Safety', 'Average Calculation'],
    topics: ['Loops', 'Basics', 'Input / Output'],
    difficulty: 'Beginner',
    logic: [
      'CRITICAL: Initialize sum = 0 before entering the loop (common journal defect: uninitialized accumulator).',
      'Read the number of subjects n.',
      'Loop from i = 1 to n.',
      'In each iteration, read mark of subject i and add to sum (sum = sum + marks).',
      'Calculate average = (float)sum / n.',
      'Print total marks and average percentage.'
    ],
    journalNote: 'Journal note: review initialization of sum before accumulation. The college lab journal declares "float avg, mark, sum;" without setting sum = 0. In C, local variables hold unpredictable garbage values on the stack unless explicitly initialized. See the Practice Version for the correct fix.',
    journalCode: `#include<stdio.h> 

int main()
{
    int i, n;
    float avg, mark, sum; // Note: 'sum' is uninitialized in the college journal!
    
    printf("Enter number ofsubjects: "); 
    scanf("%d", &n);
    
    printf("Enter Marks obtained in %d Subjects: \\n", n); 
    for(i = 0; i < n; i++)
    {
        scanf("%f", &mark); 
        sum = sum + mark; // Warning: accumulation onto garbage value
    }
    
    avg = sum / n;
    printf("Average Marks = %f", avg);
}`,
    practiceCode: `#include <stdio.h>

int main(void)
{
    int n;
    double marks, total = 0.0, average;

    printf("Enter number of subjects: ");
    if (scanf("%d", &n) != 1 || n <= 0) {
        printf("Error: Number of subjects must be greater than 0.\\n");
        return 1;
    }

    printf("\\nEnter marks obtained in %d subjects:\\n", n);
    for (int i = 1; i <= n; i++) {
        printf("Subject %d: ", i);
        if (scanf("%lf", &marks) != 1 || marks < 0 || marks > 100) {
            printf("Warning: Invalid mark entered (expected 0-100).\\n");
        }
        total += marks;
    }

    average = total / n;

    printf("\\n--- Marks Summary ---\\n");
    printf("Total Subjects: %d\\n", n);
    printf("Total Marks:    %.2f out of %.0f\\n", total, n * 100.0);
    printf("Average Marks:  %.2f%%\\n", average);

    return 0;
}`,
    explanation: 'An accumulator variable like total or sum stores the running sum of elements. In C, local variables are allocated on the stack and contain unpredictable garbage memory until explicitly initialized. Setting sum = 0.0 before the loop is mandatory. The average is computed by dividing total by the count n.',
    sampleInput: '5\n85 90 78 88 94',
    sampleOutput: `Enter number of subjects: 5

Enter marks obtained in 5 subjects:
Subject 1: 85
Subject 2: 90
Subject 3: 78
Subject 4: 88
Subject 5: 94

--- Marks Summary ---
Total Subjects: 5
Total Marks:    435.00 out of 500
Average Marks:  87.00%`,
    commonMistakes: [
      'Forgetting to initialize sum = 0, causing the total to start from an arbitrary garbage value.',
      'Performing integer division if sum and n are both integers without casting (use (float)sum / n).'
    ],
    examTips: [
      'If asked in viva about uninitialized variables, explain what garbage value means in C.',
      'Show how the loop counter i can run from 0 to n-1 or 1 to n.'
    ],
    vivaQuestions: [
      {
        question: 'What is a garbage value in C?',
        answer: 'When an automatic (local) variable is declared without initialization, it retains whatever leftover binary data was previously stored at that memory location in the call stack.'
      }
    ],
    quickRevision: {
      purpose: 'Calculate total and average of n subject marks.',
      coreLogic: 'sum = 0; for(i=1; i<=n; i++) { scanf("%f", &marks); sum += marks; } avg = sum / n;',
      importantSyntax: 'float sum = 0.0;',
      importantFunction: 'for loop accumulator',
      commonMistake: 'Forgetting sum = 0 (garbage value bug).',
      examReminder: 'Always initialize sum = 0 before entering the loop.'
    },
    keywords: ['average', 'marks', 'accumulator', 'garbage value', 'loop', 'sum']
  },
  {
    id: 'a07',
    code: 'A07',
    part: 'A',
    number: 7,
    title: 'Mathematical Functions Using math.h',
    shortTitle: 'Math Functions (math.h)',
    objective: 'Write a C program to demonstrate common mathematical functions available in <math.h> such as sqrt(), pow(), ceil(), floor(), abs(), sin(), and cos().',
    concepts: ['Header Files (<math.h>, <stdlib.h>)', 'Built-in Math Functions', 'Trigonometric Radian Conversion', 'Rounding Functions'],
    topics: ['Math Functions', 'Basics'],
    difficulty: 'Beginner',
    logic: [
      'Include <stdio.h>, <math.h>, and <stdlib.h>.',
      'Demonstrate sqrt(x): computes square root.',
      'Demonstrate pow(base, exp): computes base raised to power exp.',
      'Demonstrate ceil(x): rounds up to nearest integer.',
      'Demonstrate floor(x): rounds down to nearest integer.',
      'Demonstrate fabs(x): absolute value of a floating point number.',
      'Demonstrate sin(rad) and cos(rad): trigonometric ratios with angle converted from degrees to radians.'
    ],
    journalNote: 'Journal reference — functions return double. Angles for sin() and cos() must be in radians, not degrees.',
    journalCode: `#include <stdio.h>
#include <conio.h>
#include <math.h>

void main()
{
    float num, base, exp, angle, rad;
    clrscr();

    printf("Enter a number for sqrt, ceil, floor, fabs: ");
    scanf("%f", &num);
    printf("sqrt(%.2f) = %.2f\\n", num, sqrt(num));
    printf("ceil(%.2f) = %.2f\\n", num, ceil(num));
    printf("floor(%.2f) = %.2f\\n", num, floor(num));
    printf("fabs(%.2f) = %.2f\\n", num, fabs(num));

    printf("\\nEnter base and exponent for pow: ");
    scanf("%f %f", &base, &exp);
    printf("pow(%.2f, %.2f) = %.2f\\n", base, exp, pow(base, exp));

    printf("\\nEnter angle in degrees for sin and cos: ");
    scanf("%f", &angle);
    rad = angle * (3.14159 / 180.0);
    printf("sin(%.2f deg) = %.4f\\n", angle, sin(rad));
    printf("cos(%.2f deg) = %.4f\\n", angle, cos(rad));

    getch();
}`,
    practiceCode: `#include <stdio.h>
#include <math.h>

#define PI 3.14159265358979323846

int main(void)
{
    double val = 16.75;
    double base = 2.0, exponent = 5.0;
    double angleDeg = 30.0;
    double angleRad = angleDeg * (PI / 180.0);

    printf("=== Demonstration of math.h Functions ===\\n\\n");
    printf("1. sqrt(%.2f)      = %.4f\\n", val, sqrt(val));
    printf("2. pow(%.1f, %.1f)       = %.4f\\n", base, exponent, pow(base, exponent));
    printf("3. ceil(%.2f)      = %.2f (smallest integer >= x)\\n", val, ceil(val));
    printf("4. floor(%.2f)     = %.2f (largest integer <= x)\\n", val, floor(val));
    printf("5. fabs(-%.2f)     = %.2f (absolute value)\\n", val, fabs(-val));
    printf("6. sin(%.1f deg)    = %.4f (radians: %.4f)\\n", angleDeg, sin(angleRad), angleRad);
    printf("7. cos(%.1f deg)    = %.4f (radians: %.4f)\\n", angleDeg, cos(angleRad), angleRad);
    printf("8. log(%.2f)       = %.4f (natural logarithm base e)\\n", val, log(val));
    printf("9. log10(%.2f)     = %.4f (common logarithm base 10)\\n", val, log10(val));

    return 0;
}`,
    explanation: 'The <math.h> header exposes floating-point mathematical routines. Note that ceil(-2.3) produces -2.0 (larger integer), while floor(-2.3) produces -3.0 (smaller integer). Trigonometric functions require angle in radians: radians = degrees * (π / 180). For integers use abs() from <stdlib.h>, for floats use fabs() from <math.h>.',
    sampleInput: 'val = 16.75, base = 2, exp = 5, angle = 30',
    sampleOutput: `=== Demonstration of math.h Functions ===

1. sqrt(16.75)      = 4.0927
2. pow(2.0, 5.0)       = 32.0000
3. ceil(16.75)      = 17.00 (smallest integer >= x)
4. floor(16.75)     = 16.00 (largest integer <= x)
5. fabs(-16.75)     = 16.75 (absolute value)
6. sin(30.0 deg)    = 0.5000 (radians: 0.5236)
7. cos(30.0 deg)    = 0.8660 (radians: 0.5236)
8. log(16.75)       = 2.8184 (natural logarithm base e)
9. log10(16.75)     = 1.2240 (common logarithm base 10)`,
    commonMistakes: [
      'Passing degrees directly to sin() and cos() instead of converting to radians.',
      'Using abs() instead of fabs() on floating point variables, which truncates to int.',
      'Forgetting to link math library (-lm) when compiling using gcc on Linux terminal.'
    ],
    examTips: [
      'State in viva that math.h functions take and return double values.',
      'Know the difference between ceil and floor for negative numbers (ceil(-3.7) is -3, floor(-3.7) is -4).'
    ],
    vivaQuestions: [
      {
        question: 'What is the difference between abs() and fabs() in C?',
        answer: 'abs() is defined in <stdlib.h> and accepts and returns int. fabs() is defined in <math.h> and accepts and returns double.'
      }
    ],
    quickRevision: {
      purpose: 'Demonstrate math library routines.',
      coreLogic: 'sqrt(x), pow(b,e), ceil(x), floor(x), fabs(x), sin(rad), cos(rad)',
      importantSyntax: '#include <math.h>',
      importantFunction: 'rad = deg * (PI / 180.0);',
      commonMistake: 'Passing degrees directly to sin() instead of radians.',
      examReminder: 'ceil rounds up, floor rounds down, fabs for float abs.'
    },
    keywords: ['math.h', 'sqrt', 'pow', 'ceil', 'floor', 'fabs', 'trigonometry']
  },
  {
    id: 'a08',
    code: 'A08',
    part: 'A',
    number: 8,
    title: 'HCF / GCD of Two Numbers',
    shortTitle: 'GCD / HCF of Two Numbers',
    objective: 'Write a C program to find the Highest Common Factor (HCF) or Greatest Common Divisor (GCD) of two integer numbers.',
    concepts: ['Euclidean Algorithm', 'While Loop', 'Modulus Operator (%)', 'Number Theory'],
    topics: ['Loops', 'Numbers'],
    difficulty: 'Intermediate',
    logic: [
      'Read two positive integers a and b.',
      'Apply Euclidean algorithm: while (b != 0):',
      '  remainder = a % b',
      '  a = b',
      '  b = remainder',
      'When b becomes 0, the current value of a is the GCD (HCF).',
      'LCM can also be calculated as (original_a * original_b) / GCD.'
    ],
    journalNote: 'Journal reference — may use Euclidean subtraction method or modulo division method.',
    journalCode: `#include <stdio.h>
#include <conio.h>

void main()
{
    int n1, n2, a, b, rem, hcf;
    clrscr();
    printf("Enter two positive integers: ");
    scanf("%d %d", &n1, &n2);

    a = n1;
    b = n2;

    while (b != 0)
    {
        rem = a % b;
        a = b;
        b = rem;
    }
    hcf = a;

    printf("\\nHCF (GCD) of %d and %d is = %d", n1, n2, hcf);
    getch();
}`,
    practiceCode: `#include <stdio.h>

int main(void)
{
    int num1, num2;

    printf("Enter two positive integers: ");
    if (scanf("%d %d", &num1, &num2) != 2 || num1 <= 0 || num2 <= 0) {
        printf("Error: Please enter two positive non-zero integers.\\n");
        return 1;
    }

    int a = num1;
    int b = num2;

    // Euclidean algorithm using modulo
    while (b != 0) {
        int remainder = a % b;
        a = b;
        b = remainder;
    }

    int gcd = a;
    long long lcm = ((long long)num1 * num2) / gcd;

    printf("\\n--- Result ---\\n");
    printf("Numbers:   %d and %d\\n", num1, num2);
    printf("HCF (GCD): %d\\n", gcd);
    printf("LCM:       %lld\\n", lcm);

    return 0;
}`,
    explanation: 'The Euclidean algorithm states that the GCD of two numbers also divides their remainder. Repeatedly replacing (a, b) with (b, a % b) terminates when the remainder becomes 0, at which point the non-zero divisor a is the greatest common factor. This operates in O(log(min(a,b))) steps.',
    sampleInput: '48 18',
    sampleOutput: `Enter two positive integers: 48 18

--- Result ---
Numbers:   48 and 18
HCF (GCD): 6
LCM:       144`,
    commonMistakes: [
      'Modifying original numbers when computing both GCD and LCM (save original num1 and num2 into variables a and b).',
      'Division by zero if 0 is entered without guarding.'
    ],
    examTips: [
      'State that HCF * LCM = Product of the two numbers.',
      'Be prepared to explain both Euclidean division method (a % b) and subtraction method (a > b ? a-b : b-a).'
    ],
    vivaQuestions: [
      {
        question: 'What is the mathematical relation between HCF and LCM of two numbers?',
        answer: 'For any two positive integers a and b: HCF(a, b) * LCM(a, b) = a * b.'
      }
    ],
    quickRevision: {
      purpose: 'Find HCF/GCD of two numbers using Euclidean algorithm.',
      coreLogic: 'while(b != 0) { rem = a % b; a = b; b = rem; } hcf = a;',
      importantSyntax: 'while (b != 0)',
      importantFunction: 'rem = a % b;',
      commonMistake: 'Overwriting original numbers needed for LCM.',
      examReminder: 'Euclidean modulo is much faster than repeated subtraction.'
    },
    keywords: ['gcd', 'hcf', 'lcm', 'euclidean algorithm', 'loops', 'remainder']
  },
  {
    id: 'a09',
    code: 'A09',
    part: 'A',
    number: 9,
    title: 'Prime Numbers From 1 to N',
    shortTitle: 'Prime Numbers from 1 to N',
    objective: 'Write a C program to generate and print all prime numbers between 1 and n using nested loops.',
    concepts: ['Prime Number Definition', 'Nested Loops (outer & inner)', 'Flag Variable Pattern', 'Optimization (sqrt or i/2)'],
    topics: ['Loops', 'Numbers'],
    difficulty: 'Intermediate',
    logic: [
      'Read upper limit n.',
      'Outer loop runs through each candidate number num from 2 to n (1 is neither prime nor composite).',
      'For each num, set flag isPrime = 1.',
      'Inner loop checks divisors d from 2 up to num / 2 (or d * d <= num).',
      'If num % d == 0, num is not prime: set isPrime = 0 and break.',
      'If isPrime is still 1 after inner loop, print num.',
      'Count total prime numbers found.'
    ],
    journalNote: 'Journal reference — outer loop typically checks from 2 to n. Remember that 1 is not a prime number.',
    journalCode: `#include <stdio.h>
#include <conio.h>

void main()
{
    int n, i, j, isPrime;
    clrscr();
    printf("Enter the limit n: ");
    scanf("%d", &n);

    printf("\\nPrime numbers between 1 and %d are:\\n", n);
    for (i = 2; i <= n; i++)
    {
        isPrime = 1;
        for (j = 2; j <= i / 2; j++)
        {
            if (i % j == 0)
            {
                isPrime = 0;
                break;
            }
        }
        if (isPrime == 1)
            printf("%d ", i);
    }
    getch();
}`,
    practiceCode: `#include <stdio.h>
#include <stdbool.h>

int main(void)
{
    int n;

    printf("Enter the upper limit n: ");
    if (scanf("%d", &n) != 1 || n < 2) {
        printf("No prime numbers exist up to %d (smallest prime is 2).\\n", n);
        return 0;
    }

    printf("\\nPrime numbers from 1 to %d:\\n", n);
    int count = 0;

    for (int num = 2; num <= n; num++) {
        bool isPrime = true;

        // Check divisors up to square root of num
        for (int d = 2; d * d <= num; d++) {
            if (num % d == 0) {
                isPrime = false;
                break;
            }
        }

        if (isPrime) {
            printf("%4d", num);
            count++;
            if (count % 10 == 0) printf("\\n"); // wrap every 10 primes
        }
    }

    printf("\\n\\nTotal prime numbers found: %d\\n", count);
    return 0;
}`,
    explanation: 'A prime number is a natural number strictly greater than 1 that has no positive divisors other than 1 and itself. The outer loop tests each integer from 2 to n. For each number, an inner loop tests divisors. Using d * d <= num (equivalent to d <= sqrt(num)) provides optimal performance since any non-prime factor must be ≤ √num.',
    sampleInput: '30',
    sampleOutput: `Enter the upper limit n: 30

Prime numbers from 1 to 30:
   2   3   5   7  11  13  17  19  23  29

Total prime numbers found: 10`,
    commonMistakes: [
      'Starting candidate check from 1 (1 is NOT a prime number by mathematical definition).',
      'Forgetting to reset the isPrime flag inside the outer loop for each candidate number.',
      'Not using break after finding the first factor, wasting unnecessary CPU cycles.'
    ],
    examTips: [
      'In exam answer sheets, clearly define why the inner loop only needs to test up to num/2 or √num.',
      'Never include 1 in the list of primes.'
    ],
    vivaQuestions: [
      {
        question: 'Why is 1 not considered a prime number?',
        answer: 'By definition, a prime number has exactly two distinct positive divisors: 1 and the number itself. 1 has only one positive divisor (itself), which would break the Fundamental Theorem of Arithmetic (unique prime factorization).'
      }
    ],
    quickRevision: {
      purpose: 'Generate all primes from 1 to n.',
      coreLogic: 'for(i=2; i<=n; i++) { flag=1; for(j=2; j*j<=i; j++) if(i%j==0){flag=0; break;} if(flag) print i; }',
      importantSyntax: 'Reset flag = 1 inside outer loop!',
      importantFunction: 'break statement on divisor found',
      commonMistake: 'Including 1 or not resetting flag inside loop.',
      examReminder: 'Test divisors up to j * j <= i for best efficiency.'
    },
    keywords: ['prime numbers', 'nested loops', 'factor', 'flag', 'sieve', 'numbers']
  },
  {
    id: 'a10',
    code: 'A10',
    part: 'A',
    number: 10,
    title: 'Sum of Digits, Reverse, and Palindrome Checking',
    shortTitle: 'Sum of Digits, Reverse & Palindrome',
    objective: 'Write a C program to input an integer number, compute the sum of its digits, find its reverse, and check whether it is a palindrome.',
    concepts: ['Modulo Operator (% 10)', 'Integer Division (/ 10)', 'Digit Extraction Algorithm', 'Palindrome Logic'],
    topics: ['Loops', 'Numbers'],
    difficulty: 'Intermediate',
    logic: [
      'Input integer n. Store a copy of original number (temp = n).',
      'Initialize sum = 0 and rev = 0.',
      'While n > 0:',
      '  remainder = n % 10 (extract rightmost digit)',
      '  sum = sum + remainder (accumulate digit sum)',
      '  rev = (rev * 10) + remainder (build reversed number)',
      '  n = n / 10 (discard rightmost digit)',
      'Compare original temp with rev:',
      '  If temp == rev -> Palindrome number.',
      '  Else -> Not a palindrome number.'
    ],
    journalNote: 'Journal reference — preserve the original number in a temporary variable because n becomes 0 after digit extraction.',
    journalCode: `#include <stdio.h>
#include <conio.h>

void main()
{
    int n, temp, rem, sum = 0, rev = 0;
    clrscr();
    printf("Enter an integer number: ");
    scanf("%d", &n);

    temp = n;
    while (n > 0)
    {
        rem = n % 10;
        sum = sum + rem;
        rev = (rev * 10) + rem;
        n = n / 10;
    }

    printf("\\nSum of digits = %d", sum);
    printf("\\nReverse of number = %d", rev);

    if (temp == rev)
        printf("\\nThe number is a PALINDROME.");
    else
        printf("\\nThe number is NOT a palindrome.");

    getch();
}`,
    practiceCode: `#include <stdio.h>

int main(void)
{
    int num;

    printf("Enter a positive integer: ");
    if (scanf("%d", &num) != 1 || num < 0) {
        printf("Error: Please enter a valid non-negative integer.\\n");
        return 1;
    }

    int original = num;
    int sumOfDigits = 0;
    int reversed = 0;

    int n = num;
    while (n > 0) {
        int digit = n % 10;
        sumOfDigits += digit;
        reversed = (reversed * 10) + digit;
        n /= 10;
    }

    printf("\\n--- Analysis of %d ---\\n", original);
    printf("Sum of digits:   %d\\n", sumOfDigits);
    printf("Reversed number: %d\\n", reversed);
    printf("Palindrome:      %s\\n", (original == reversed) ? "YES (It is a Palindrome)" : "NO (Not a Palindrome)");

    return 0;
}`,
    explanation: 'The modulo operator % 10 peels off the least significant digit. Multiplying the reversed accumulator by 10 shifts existing digits one place to the left, allowing the new digit to be appended at the units place. Dividing by 10 strips off the processed digit. Comparing temp == rev verifies symmetry (palindrome).',
    sampleInput: '12321',
    sampleOutput: `Enter a positive integer: 12321

--- Analysis of 12321 ---
Sum of digits:   9
Reversed number: 12321
Palindrome:      YES (It is a Palindrome)`,
    commonMistakes: [
      'Not storing the original number before the loop: comparing n == rev afterwards fails because n has become 0!',
      'Initializing rev to 1 instead of 0.',
      'Using / instead of % to extract the digit.'
    ],
    examTips: [
      'Remember the three steps inside while(n > 0): rem = n % 10; sum += rem; rev = rev * 10 + rem; n /= 10;',
      'Examiners love testing with numbers like 1221, 12321 (palindromes) and 1234 (non-palindrome).'
    ],
    vivaQuestions: [
      {
        question: 'What is a palindrome number?',
        answer: 'A palindrome number is a number that remains the same when its digits are reversed (e.g. 121, 1331, 4554).'
      }
    ],
    quickRevision: {
      purpose: 'Extract digits to compute sum, reverse, and palindrome status.',
      coreLogic: 'while(n>0) { rem = n%10; sum += rem; rev = rev*10 + rem; n /= 10; } check temp == rev',
      importantSyntax: 'temp = n; // save original copy',
      importantFunction: 'rem = n % 10; rev = rev * 10 + rem;',
      commonMistake: 'Forgetting temp = n before loop drains n to 0.',
      examReminder: 'Always test equality between temp and rev.'
    },
    keywords: ['palindrome', 'sum of digits', 'reverse', 'digits', 'modulo', 'while loop']
  },
  {
    id: 'a11',
    code: 'A11',
    part: 'A',
    number: 11,
    title: 'Read Numbers Until 999 and Sum Positive Numbers',
    shortTitle: 'Sum Positives Until 999',
    objective: 'Write a C program to continuously read numbers until the sentinel value 999 is encountered, and calculate the sum and count of all positive numbers entered.',
    concepts: ['Sentinel-Controlled Loop', 'break Statement', 'continue Statement', 'Input Accumulation'],
    topics: ['Loops', 'Conditions'],
    difficulty: 'Beginner',
    logic: [
      'Initialize sum = 0 and count = 0.',
      'Use an infinite or conditional while loop: while(1).',
      'Read a number in each iteration.',
      'Check if number == 999: If true, break out of loop immediately (sentinel termination).',
      'Check if number > 0: If positive, add to sum (sum += num) and increment count.',
      'If number is negative or zero, ignore or skip it.',
      'After exiting loop, print the accumulated sum of positive numbers.'
    ],
    journalNote: 'Journal reference — 999 acts as a sentinel (stop signal) and must not be added to the sum.',
    journalCode: `#include <stdio.h>
#include <conio.h>

void main()
{
    int num, sum = 0, count = 0;
    clrscr();
    printf("Enter numbers (enter 999 to stop):\\n");

    while (1)
    {
        scanf("%d", &num);
        if (num == 999)
            break;
        if (num > 0)
        {
            sum = sum + num;
            count++;
        }
    }

    printf("\\nCount of positive numbers = %d", count);
    printf("\\nSum of positive numbers = %d", sum);
    getch();
}`,
    practiceCode: `#include <stdio.h>

#define SENTINEL 999

int main(void)
{
    int num;
    long long sum = 0;
    int count = 0;
    int negativeCount = 0;

    printf("=== Positive Numbers Accumulator ===\\n");
    printf("Enter integers one by one (enter %d to terminate):\\n", SENTINEL);

    while (1) {
        if (scanf("%d", &num) != 1) {
            printf("Error reading input. Terminating.\\n");
            break;
        }

        if (num == SENTINEL) {
            printf("[Sentinel %d received. Stopping input.]\\n", SENTINEL);
            break;
        }

        if (num > 0) {
            sum += num;
            count++;
        } else {
            negativeCount++;
        }
    }

    printf("\\n--- Final Summary ---\\n");
    printf("Positive numbers read: %d\\n", count);
    printf("Sum of positives:      %lld\\n", sum);
    printf("Non-positive skipped:  %d\\n", negativeCount);

    return 0;
}`,
    explanation: 'A sentinel value is a designated special input that signals the end of input data sequence without being processed as actual data. The loop executes while(1) until num == 999 triggers the break statement. Only strictly positive numbers (num > 0) are added to sum.',
    sampleInput: '12 -5 34 0 45 -10 999',
    sampleOutput: `=== Positive Numbers Accumulator ===
Enter integers one by one (enter 999 to terminate):
[Sentinel 999 received. Stopping input.]

--- Final Summary ---
Positive numbers read: 3
Sum of positives:      91
Non-positive skipped:  3`,
    commonMistakes: [
      'Adding 999 into the sum before checking if it is the sentinel value.',
      'Accidentally adding negative numbers into the positive sum.',
      'Placing the sentinel check after the addition logic.'
    ],
    examTips: [
      'Explain in viva what a sentinel value is and why it is useful in data processing.',
      'Show that break exits the nearest enclosing loop immediately.'
    ],
    vivaQuestions: [
      {
        question: 'What is a sentinel value in programming?',
        answer: 'A sentinel value (also called a flag or rogue value) is a predetermined special value used to signify the termination of an input stream or loop, distinct from all valid data values.'
      }
    ],
    quickRevision: {
      purpose: 'Read stream until 999 sentinel and sum positive numbers.',
      coreLogic: 'while(1) { scanf("%d",&n); if(n==999) break; if(n>0) sum+=n; }',
      importantSyntax: 'while(1) and break;',
      importantFunction: 'scanf inside infinite loop',
      commonMistake: 'Checking for 999 after adding to sum.',
      examReminder: 'Sentinel 999 must NOT be added to sum.'
    },
    keywords: ['sentinel', '999', 'break', 'while loop', 'positive sum', 'accumulator']
  },
  {
    id: 'a12',
    code: 'A12',
    part: 'A',
    number: 12,
    title: 'Percentage and Class/Grade Using Switch',
    shortTitle: 'Class & Grade Using Switch',
    objective: 'Write a C program to calculate percentage marks obtained and assign academic class/grade using a switch statement.',
    concepts: ['Integer Division Mapping for Switch', 'Switch-Case Ranges', 'Fallthrough Grouping', 'Grading Logic'],
    topics: ['Switch', 'Conditions'],
    difficulty: 'Intermediate',
    logic: [
      'Read total marks or marks in subjects and calculate percentage (0 to 100).',
      'Divide percentage by 10 as an integer: index = (int)percentage / 10.',
      'index values map neatly:',
      '  case 10: case 9: case 8: case 7: Distinction (>= 70%)',
      '  case 6: First Class (60% to 69%)',
      '  case 5: Second Class (50% to 59%)',
      '  case 4: Pass Class (40% to 49%)',
      '  default: Fail (< 40%)',
      'Print the calculated percentage and assigned grade/class.'
    ],
    journalNote: 'Journal reference — switch in C cannot test floating point ranges directly, so dividing percentage by 10 maps ranges to integer cases 10, 9, 8, 7, 6, 5, 4.',
    journalCode: `#include <stdio.h>
#include <conio.h>

void main()
{
    float percentage;
    int gradeIndex;
    clrscr();

    printf("Enter percentage marks: ");
    scanf("%f", &percentage);

    if (percentage > 100 || percentage < 0)
    {
        printf("Invalid percentage!");
        getch();
        return;
    }

    gradeIndex = (int)percentage / 10;

    switch (gradeIndex)
    {
        case 10:
        case 9:
        case 8:
        case 7:
            printf("\\nResult: DISTINCTION");
            break;
        case 6:
            printf("\\nResult: FIRST CLASS");
            break;
        case 5:
            printf("\\nResult: SECOND CLASS");
            break;
        case 4:
            printf("\\nResult: PASS CLASS");
            break;
        default:
            printf("\\nResult: FAIL");
            break;
    }
    getch();
}`,
    practiceCode: `#include <stdio.h>

int main(void)
{
    double percent;

    printf("Enter student percentage (0 - 100): ");
    if (scanf("%lf", &percent) != 1 || percent < 0.0 || percent > 100.0) {
        printf("Error: Percentage must be between 0.0 and 100.0.\\n");
        return 1;
    }

    // Mapping: integer division by 10 groups percentages into bins
    int scoreBucket = (int)percent / 10;

    printf("\\nPercentage: %.2f%%\\n", percent);
    printf("Awarded:    ");

    switch (scoreBucket) {
        case 10: // 100%
        case 9:  // 90 - 99%
        case 8:  // 80 - 89%
        case 7:  // 70 - 79%
            printf("DISTINCTION\\n");
            break;
        case 6:  // 60 - 69%
            printf("FIRST CLASS\\n");
            break;
        case 5:  // 50 - 59%
            printf("SECOND CLASS\\n");
            break;
        case 4:  // 40 - 49%
            printf("PASS CLASS\\n");
            break;
        default: // Below 40%
            printf("FAIL\\n");
            break;
    }

    return 0;
}`,
    explanation: 'Since switch statements in C cannot accept relational conditions or floating point values, dividing the integer cast of percentage by 10 cleanly maps numbers into buckets: 70-100 becomes 7, 8, 9, 10; 60-69 becomes 6; 50-59 becomes 5; 40-49 becomes 4; and anything below 40 falls to default. Stacking case 10, 9, 8, 7 leverages intentional switch fallthrough.',
    sampleInput: '78.5',
    sampleOutput: `Enter student percentage (0 - 100): 78.5

Percentage: 78.50%
Awarded:    DISTINCTION`,
    commonMistakes: [
      'Trying to write switch(percentage >= 70) which is invalid syntax in C.',
      'Missing case 10, which causes students with 100% to fail into default!',
      'Forgetting break statements between classes.'
    ],
    examTips: [
      'Crucial exam detail: explain why case 10 is needed (100 / 10 = 10).',
      'Explain that grouping cases 10, 9, 8, 7 together demonstrates intentional fallthrough.'
    ],
    vivaQuestions: [
      {
        question: 'How do you represent ranges in a C switch statement?',
        answer: 'Since C standard switch statements do not support range syntax like 70..100, we divide integer values by a scaling factor (like /10) and use consecutive case labels with intentional fallthrough.'
      }
    ],
    quickRevision: {
      purpose: 'Determine grade/class using switch.',
      coreLogic: 'bucket = (int)pct / 10; switch(bucket) { case 10: case 9: case 8: case 7: Distinction; case 6: First; ... }',
      importantSyntax: 'case 10: case 9: case 8: case 7: (fallthrough)',
      importantFunction: 'gradeIndex = (int)percentage / 10;',
      commonMistake: 'Omitting case 10 for 100% students.',
      examReminder: 'Remember case 10, 9, 8, 7 all group into Distinction.'
    },
    keywords: ['percentage', 'grade', 'class', 'switch', 'distinction', 'fallthrough']
  },
  {
    id: 'a13',
    code: 'A13',
    part: 'A',
    number: 13,
    title: 'Concatenate Two Strings Without Library Function',
    shortTitle: 'String Concatenation (Without strcat)',
    objective: 'Write a C program to concatenate two strings into a third string (or append to the first) without using the built-in strcat() library function.',
    concepts: ['Strings as Null-Terminated Arrays', 'Pointer / Index Traversal', 'Manual Character Copy', 'Null Terminator (\\0)'],
    topics: ['Strings', 'Loops'],
    difficulty: 'Intermediate',
    logic: [
      'Read two strings str1 and str2.',
      'Declare concatenated result array concat of sufficient size.',
      'Loop 1: Copy characters from str1 to concat until str1[i] == \'\\0\'.',
      'Loop 2: Copy characters from str2 to concat starting at the end of the first string until str2[j] == \'\\0\'.',
      'CRITICAL: Append the null terminator character concat[k] = \'\\0\' at the end.',
      'Print the concatenated string.'
    ],
    journalNote: 'Journal reference — older lab journal may use gets() which is unsafe and deprecated in C99 / removed in C11. In practice, use fgets() or scanf("%s", ...).',
    journalCode: `#include <stdio.h>
#include <conio.h>

void main()
{
    char str1[100], str2[100], str3[200];
    int i = 0, j = 0;
    clrscr();

    printf("Enter first string: ");
    gets(str1); // Journal note: gets is unsafe/deprecated; use fgets in practice
    printf("Enter second string: ");
    gets(str2);

    // Copy str1 into str3
    while (str1[i] != '\\0')
    {
        str3[i] = str1[i];
        i++;
    }

    // Append str2 into str3
    while (str2[j] != '\\0')
    {
        str3[i] = str2[j];
        i++;
        j++;
    }

    str3[i] = '\\0'; // Crucial null terminator

    printf("\\nConcatenated string: %s", str3);
    getch();
}`,
    practiceCode: `#include <stdio.h>
#include <string.h>

int main(void)
{
    char str1[100], str2[100], result[200];
    int i = 0, j = 0;

    printf("Enter first string: ");
    if (!fgets(str1, sizeof(str1), stdin)) return 1;
    // Strip trailing newline from fgets
    str1[strcspn(str1, "\\r\\n")] = '\\0';

    printf("Enter second string: ");
    if (!fgets(str2, sizeof(str2), stdin)) return 1;
    str2[strcspn(str2, "\\r\\n")] = '\\0';

    // Copy first string to result
    while (str1[i] != '\\0') {
        result[i] = str1[i];
        i++;
    }

    // Append second string to result
    while (str2[j] != '\\0') {
        result[i + j] = str2[j];
        j++;
    }

    // Terminate result with null character
    result[i + j] = '\\0';

    printf("\\n--- Results ---\\n");
    printf("String 1:     \\"%s\\"\\n", str1);
    printf("String 2:     \\"%s\\"\\n", str2);
    printf("Concatenated: \\"%s\\"\\n", result);

    return 0;
}`,
    explanation: 'A string in C is a sequence of characters terminated by the ASCII null character \\0 (value 0). Without strcat(), we manually copy characters from the first string using index i, then continue appending characters from the second string using j. Finally, assigning result[i+j] = \\0 ensures printf and other string functions recognize where the string ends.',
    sampleInput: 'Hello\nWorld',
    sampleOutput: `Enter first string: Hello
Enter second string: World

--- Results ---
String 1:     "Hello"
String 2:     "World"
Concatenated: "HelloWorld"`,
    commonMistakes: [
      'Forgetting to append the null terminator result[i+j] = \'\\0\', causing printf to print trailing garbage memory.',
      'Allocating destination array too small (must be size(str1) + size(str2) + 1 for null terminator).',
      'Using gets() in modern compilers which throws warnings or linker errors.'
    ],
    examTips: [
      'In exam papers, emphasize the line: result[i] = \'\\0\'. Examiners specifically check for this.',
      'Explain that \\0 is what distinguishes a string from a plain character array in C.'
    ],
    vivaQuestions: [
      {
        question: 'Why was gets() removed from modern C standards (C11)?',
        answer: 'gets() cannot specify buffer size, making it prone to buffer overflow security vulnerabilities. It was superseded by fgets().'
      },
      {
        question: 'What is the purpose of the null character (\\0) in C strings?',
        answer: 'It marks the end of a string in memory so functions know where the string terminates without having to pass explicit length.'
      }
    ],
    quickRevision: {
      purpose: 'Join two strings without using strcat().',
      coreLogic: 'while(s1[i]) res[i]=s1[i++]; while(s2[j]) res[i++]=s2[j++]; res[i]=\'\\0\';',
      importantSyntax: 'result[i] = \'\\0\'; (mandatory null byte)',
      importantFunction: 'Character loop until \\0',
      commonMistake: 'Forgetting to append \'\\0\' at the end.',
      examReminder: 'Ensure destination array is large enough for both strings + 1.'
    },
    keywords: ['string', 'concatenation', 'strcat', 'null character', 'fgets', 'character array']
  },
  {
    id: 'a14',
    code: 'A14',
    part: 'A',
    number: 14,
    title: 'Sum of Even and Odd Values in an Integer Array',
    shortTitle: 'Sum of Even & Odd in Array',
    objective: 'Write a C program to input an array of n integers and calculate the sum and count of all even and odd numbers separately.',
    concepts: ['1D Arrays', 'Array Traversal', 'Modulus Operator (% 2)', 'Dual Accumulators'],
    topics: ['Arrays', 'Loops'],
    difficulty: 'Beginner',
    logic: [
      'Read array size n.',
      'Declare integer array arr[n] (or arr[100]).',
      'Initialize evenSum = 0, oddSum = 0, evenCount = 0, oddCount = 0.',
      'Loop through array from i = 0 to n - 1:',
      '  If arr[i] % 2 == 0:',
      '    evenSum += arr[i], evenCount++',
      '  Else:',
      '    oddSum += arr[i], oddCount++',
      'Print sum and count of even numbers and odd numbers.'
    ],
    journalNote: 'Journal reference — standard 1D array traversal with modulo 2 condition.',
    journalCode: `#include <stdio.h>
#include <conio.h>

void main()
{
    int arr[100], n, i;
    int evenSum = 0, oddSum = 0;
    clrscr();

    printf("Enter number of elements in array: ");
    scanf("%d", &n);

    printf("Enter %d integers:\\n", n);
    for (i = 0; i < n; i++)
    {
        scanf("%d", &arr[i]);
        if (arr[i] % 2 == 0)
            evenSum += arr[i];
        else
            oddSum += arr[i];
    }

    printf("\\nSum of Even numbers = %d", evenSum);
    printf("\\nSum of Odd numbers  = %d", oddSum);
    getch();
}`,
    practiceCode: `#include <stdio.h>

#define MAX_SIZE 100

int main(void)
{
    int arr[MAX_SIZE];
    int n;
    int evenSum = 0, oddSum = 0;
    int evenCount = 0, oddCount = 0;

    printf("Enter number of elements (max %d): ", MAX_SIZE);
    if (scanf("%d", &n) != 1 || n <= 0 || n > MAX_SIZE) {
        printf("Error: Invalid array size.\\n");
        return 1;
    }

    printf("Enter %d integers (separated by space):\\n", n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
        if (arr[i] % 2 == 0) {
            evenSum += arr[i];
            evenCount++;
        } else {
            oddSum += arr[i];
            oddCount++;
        }
    }

    printf("\\n--- Array Analysis ---\\n");
    printf("Even count: %d, Even sum: %d\\n", evenCount, evenSum);
    printf("Odd count:  %d, Odd sum:  %d\\n", oddCount, oddSum);
    printf("Total sum:  %d\\n", evenSum + oddSum);

    return 0;
}`,
    explanation: 'The program visits each array element indexed 0 to n-1. By taking element % 2, if the remainder is 0 the number is even; otherwise it is odd. Dedicated accumulator variables tally up the respective totals.',
    sampleInput: '6\n12 7 9 14 22 5',
    sampleOutput: `Enter number of elements (max 100): 6
Enter 6 integers (separated by space):
12 7 9 14 22 5

--- Array Analysis ---
Even count: 3, Even sum: 48
Odd count:  3, Odd sum:  21
Total sum:  69`,
    commonMistakes: [
      'Array index out of bounds: looping up to i <= n instead of i < n.',
      'Forgetting to initialize evenSum = 0 and oddSum = 0.'
    ],
    examTips: [
      'Array indices in C are zero-based (0 to n - 1).',
      'Explain in viva how memory for arrays is allocated contiguously.'
    ],
    vivaQuestions: [
      {
        question: 'How are 1D arrays represented in memory in C?',
        answer: 'Arrays in C are stored in contiguous (adjacent) blocks of memory, with each element occupying sizeof(type) bytes.'
      }
    ],
    quickRevision: {
      purpose: 'Compute sum of even and odd values in an array.',
      coreLogic: 'for(i=0; i<n; i++) { if(arr[i]%2==0) evenSum+=arr[i]; else oddSum+=arr[i]; }',
      importantSyntax: 'arr[i] % 2 == 0',
      importantFunction: 'Array loop: 0 to n-1',
      commonMistake: 'Using i <= n instead of i < n causing off-by-one out-of-bounds error.',
      examReminder: 'Zero is considered even (0 % 2 == 0).'
    },
    keywords: ['array', 'even', 'odd', 'sum', '1D array', 'modulo']
  },
  {
    id: 'a15',
    code: 'A15',
    part: 'A',
    number: 15,
    title: 'Remove Duplicate Elements From a 1D Array',
    shortTitle: 'Remove Duplicates from Array',
    objective: 'Write a C program to remove duplicate elements from a one-dimensional array and display the unique elements.',
    concepts: ['Array Element Shifting', 'Nested Loops', 'Dynamic Size Decrement', 'Duplicate Elimination'],
    topics: ['Arrays', 'Loops'],
    difficulty: 'Advanced',
    logic: [
      'Read array of n elements.',
      'Outer loop runs i from 0 to n - 1.',
      'Inner loop runs j from i + 1 to n - 1.',
      'If arr[i] == arr[j], a duplicate is found.',
      'Shift all elements from j + 1 to n - 1 one position to the left (arr[k] = arr[k+1]).',
      'Decrement array size n by 1 (n--).',
      'Decrement j (j--) so the newly shifted element at index j is also verified.',
      'Print the resulting array containing unique elements.'
    ],
    journalNote: 'Journal reference — classic in-place shifting algorithm. Notice j-- after shifting so elements are not skipped.',
    journalCode: `#include <stdio.h>
#include <conio.h>

void main()
{
    int arr[100], n, i, j, k;
    clrscr();

    printf("Enter number of elements: ");
    scanf("%d", &n);

    printf("Enter %d elements:\\n", n);
    for (i = 0; i < n; i++)
        scanf("%d", &arr[i]);

    // Remove duplicates by shifting
    for (i = 0; i < n; i++)
    {
        for (j = i + 1; j < n; j++)
        {
            if (arr[i] == arr[j])
            {
                for (k = j; k < n - 1; k++)
                {
                    arr[k] = arr[k + 1];
                }
                n--; // Reduce size
                j--; // Check the shifted element at index j
            }
        }
    }

    printf("\\nArray after removing duplicates:\\n");
    for (i = 0; i < n; i++)
        printf("%d ", arr[i]);

    getch();
}`,
    practiceCode: `#include <stdio.h>

#define MAX 100

int main(void)
{
    int arr[MAX];
    int n;

    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n <= 0 || n > MAX) {
        printf("Error: Invalid array size.\\n");
        return 1;
    }

    printf("Enter %d integers:\\n", n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }

    int originalSize = n;

    // In-place duplicate removal
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (arr[i] == arr[j]) {
                // Shift subsequent elements left
                for (int k = j; k < n - 1; k++) {
                    arr[k] = arr[k + 1];
                }
                n--; // Array size shrunk
                j--; // Re-examine position j after shift
            }
        }
    }

    printf("\\n--- Results ---\\n");
    printf("Original size:   %d\\n", originalSize);
    printf("Unique count:    %d\\n", n);
    printf("Unique elements: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");

    return 0;
}`,
    explanation: 'To eliminate duplicates in-place without auxiliary arrays, we compare each element at index i against all following elements at index j. When a match is detected, all items to the right are shifted left by one slot, decrementing the array size n. Crucially, j must be decremented (j--) so the newly shifted item occupying slot j is not skipped.',
    sampleInput: '7\n10 20 10 30 20 40 10',
    sampleOutput: `Enter number of elements: 7
Enter 7 integers:
10 20 10 30 20 40 10

--- Results ---
Original size:   7
Unique count:    4
Unique elements: 10 20 30 40`,
    commonMistakes: [
      'Forgetting j-- after shifting: if consecutive duplicates exist (e.g. 10 10 10), the second duplicate will be skipped!',
      'Forgetting to decrement n when an element is removed.'
    ],
    examTips: [
      'In viva, explain why j-- is vital: when elements shift left, the next element moves into index j and would be missed if j increments.',
      'Mention that time complexity is O(n²) in the worst case.'
    ],
    vivaQuestions: [
      {
        question: 'Why do we write j-- after shifting elements to the left in duplicate removal?',
        answer: 'When we shift elements left from k = j onwards, the element originally at index j+1 slides into index j. If we do not decrement j, the loop increment (j++) will skip checking this newly moved element, failing on consecutive duplicates.'
      }
    ],
    quickRevision: {
      purpose: 'Eliminate duplicate values from array in-place.',
      coreLogic: 'if(a[i]==a[j]) { for(k=j; k<n-1; k++) a[k]=a[k+1]; n--; j--; }',
      importantSyntax: 'n--; j--; inside match condition',
      importantFunction: 'Array shifting loop',
      commonMistake: 'Forgetting j-- which skips consecutive duplicates.',
      examReminder: 'Decreasing n and j is the hallmark of correct shifting.'
    },
    keywords: ['duplicates', 'array', 'shifting', 'unique elements', 'in-place', 'nested loops']
  }
];
