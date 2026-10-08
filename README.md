# CPLABG9
### C Programming Lab Practice Hub

A mobile-first, student-centered learning, practice, revision, and lab-exam preparation platform tailored for BCA students preparing for their C Programming practical examinations.

---

## 🎯 Purpose & Philosophy

**CPLABG9** bridges the gap between academic college lab journal requirements and modern software development practices. The platform enables students to:

**LEARN → UNDERSTAND → SEE → PRACTICE → TEST → REVISE → TRACK PROGRESS**

- **Mobile First**: Crafted for phone screens (320px – 430px) as first-class citizens with thumb-friendly navigation, non-overflowing code blocks, and touch targets.
- **28 Syllabus Programs**: 100% complete coverage of the college lab journal syllabus (Part A: 15 programs, Part B: 13 programs).
- **Dual Code Versions**:
  - **Journal Version**: Faithfully preserves the college lab notebook reference (including historical constructs such as `void main()`, `clrscr()`, `getch()`, and journal-specific quirks).
  - **Practice Version**: Modern, portable standard C (C99/C11) with `int main(void)`, safe I/O, format specifiers, and zero compilation warnings.
- **Honest Practice Editor**: An interactive self-check code workspace with expected outputs, progressive hints, and manual dry-run guidance—no fake online compilers.
- **Full Exam Simulation**: Randomized question picks, live countdown timer, code writing, and comprehensive post-exam evaluation with solution breakdowns.
- **Zero Friction**: 100% client-side with `localStorage` persistence. No backend, no login, no API keys, and no tracking of personal identifiable information.

---

## 📚 Complete Syllabus (28 Programs)

### Part A — Core C Programming (15 Programs)
1. **A01** — Radius: Calculate Area and Circumference of a Circle
2. **A02** — Simple Interest & Total Amount
3. **A03** — Largest of Three Numbers using Conditional Logic
4. **A04** — Basic Calculator using `switch` (with Division-by-Zero handling)
5. **A05** — Quadratic Equation Roots (Real & distinct, Real & equal, Complex roots)
6. **A06** — Average Marks in $n$ Subjects (*includes Journal note on uninitialized accumulator*)
7. **A07** — Mathematical Functions using `<math.h>` (`sqrt`, `pow`, `ceil`, `floor`, `fabs`, trigonometry)
8. **A08** — HCF / GCD of Two Numbers using Euclidean Algorithm
9. **A09** — Prime Numbers from 1 to $n$ using Nested Loops
10. **A10** — Sum of Digits, Number Reversal, and Palindrome Checking
11. **A11** — Read Numbers until Sentinel `999` and Sum Positive Numbers
12. **A12** — Percentage and Academic Class/Grade using `switch`
13. **A13** — Concatenate Two Strings Without Library Function
14. **A14** — Sum of Even and Odd Values in a 1D Integer Array
15. **A15** — Remove Duplicate Elements from a 1D Array (In-place Shifting)

### Part B — Advanced C Programming (13 Programs)
1. **B01** — Swap Two Numbers Without a Temporary Variable (Arithmetic & XOR)
2. **B02** — Count Alphabets, Digits, Vowels, Consonants, Spaces & Special Symbols using `<ctype.h>`
3. **B03** — Reverse String, Concatenate, and Display Lengths using `<string.h>`
4. **B04** — Find String Length Without Library Function (`\0` loop)
5. **B05** — Fibonacci Series using Recursion
6. **B06** — Factorial using Recursion (with 64-bit considerations)
7. **B07** — Square Matrix Display and Trace Calculation
8. **B08** — Matrix Addition and Subtraction with Dimension Validation
9. **B09** — Matrix Multiplication using Modular Functions
10. **B10** — Prime Number Checking using Modular `isPrime()` Function
11. **B11** — Celsius to Fahrenheit Conversion Table using Functions
12. **B12** — Array of Structures: Student Roll No, Name, and Average Marks
13. **B13** — Structure vs. Union: Memory Allocation & `sizeof()` Comparison

---

## 🛠️ Technology Stack

- **Framework**: React 18 + TypeScript + Vite
- **Routing**: React Router DOM (v6) with single-page application rewrites
- **Styling**: Tailwind CSS + Custom Dark Lab Theme
- **Icons**: Lucide React
- **Syntax Highlighting**: PrismJS for C syntax tokenization
- **Analytics**: Official `@vercel/analytics` (privacy-conscious, no PII collected)
- **Celebration Effects**: `canvas-confetti`

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation
```bash
# Clone or navigate into the workspace
cd CPLABG9

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

---

## 🏗️ Production Build

To compile TypeScript and create the optimized static production bundle:

```bash
npm run build
```

Output is emitted to the `dist/` directory.

To preview the production build locally:
```bash
npm run preview
```

---

## ☁️ Deployment (Vercel)

The repository is pre-configured for Vercel static hosting:
1. `vercel.json` includes client-side routing rewrites:
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```
2. Build command: `npm run build` (or `vite build`)
3. Output directory: `dist`
4. No environment variables or backend secrets are required.
5. Vercel Web Analytics automatically activates when deployed onto Vercel.

---

## 💾 LocalStorage & Progress Architecture

Progress is stored under the localStorage key `cplabg9_user_progress_v1`:
- Program statuses: `Not Started` | `In Progress` | `Practiced` | `Mastered`
- 6-point mental readiness checklists per program
- Practice code snippets saved locally
- Exam simulation history and score logs
- Flagged weak programs for rapid revision
- **Reset Progress**: Protected with a double-confirmation modal to prevent accidental data erasure.

---

## 📖 Important Journal-Content Note

The college lab journal contains legacy and compiler-specific C constructs historically used in Turbo C / Borland C environments (e.g., `void main()`, `clrscr()`, `getch()`, `strrev()`, and uninitialized accumulators). 

CPLABG9 explicitly labels these under **Journal Version** with transparent educational notes, while providing standard, portable ISO C equivalents under **Practice Version**.
