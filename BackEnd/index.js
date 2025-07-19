import express from 'express'
import runCode from './RunCode.js'
import runUserCode from './runUserCode.js';
import cors from 'cors'
import bodyParser from 'body-parser';
import dotenv from 'dotenv';


const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

const allowedOrigins = [
  'https://master-debug.vercel.app/',
];

// allow requests from your frontend
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());
app.use(bodyParser.json());


// All the Data of levels.
const levelsData = {
  cpp: [
    {
      "id": 1,
      "code": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string first = \"Code\";\n    string second = \"Blocks\";\n    String result = first + Second;\n    cout << result << endl;\n    return 0;\n}",
      "output": "CodeBlocks",
      "correct_output": "CodeBlocks",
      "hint": "Check for bugs at: Line 8"
    },
    {
      "id": 2,
      "code": "#include <iostream>\n\nint main() {\n    for (int i = 1; i <= 5; +i) {\n        std::cout >> \"Loop iteration: \" >> i >> std::endl;\n    }\n    return 0;\n}",
      "output": "Loop iteration: 1\nLoop iteration: 2\nLoop iteration: 3\nLoop iteration: 4\nLoop iteration: 5",
      "correct_output": "Loop iteration: 1\nLoop iteration: 2\nLoop iteration: 3\nLoop iteration: 4\nLoop iteration: 5",
      "hint": "Check for bugs at: Line 4, 5"
    },
    {
      "id": 3,
      "code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a = 3, b = 5. c = 7, d = 2;\n    int sum = a + b + c + d;\n    cout << \"Sum: \" >> sum << endl;\n    return 0;\n}",
      "output": "Sum: 17",
      "correct_output": "Sum: 17",
      "hint": "Check for bugs at: Line 5, 7"
    },
    {
      "id": 4,
      "code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a = 4, b = 6. c = 3, d = 2:\n    int sum = a + b + c + d;\n    cout << \"Total: \" << sum << endl;\n    return 0\n}",
      "output": "Total: 15",
      "correct_output": "Total: 15",
      "hint": "Check for bugs at: Line 5, 8"
    },
    {
      "id": 5,
      "code": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string name = \\Alice\\;\n    cout << \"Hello, \" << name << \"!\" << end;\n    return 0;\n}",
      "output": "Hello, Alice!",
      "correct_output": "Hello, Alice!",
      "hint": "Check for bugs at: Line 6, 7"
    },
    {
      "id": 6,
      "code": "#include <iostream>\n#include <cmath>\nusing namespace std;\n\nint main() {\n    double base = 2.0 exponent = 3.0;\n    cout << \"Power: \" << pow(base, exponent) << endl;\n    Return 0;\n}",
      "output": "Power: 8",
      "correct_output": "Power: 8",
      "hint": "Check for bugs at: Line 6, 8"
    },
    {
      "id": 7,
      "code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    char Ch = 'A';\n    cout << \"Character: \" << ch << endl;\n    cout << \"ASCII: \" << int(ch) << endl;\n    return 0\n}",
      "output": "Character: A\nASCII: 65",
      "correct_output": "Character: A\nASCII: 65",
      "hint": "Check for bugs at: Line 5, 8"
    },
    {
      "id": 8,
      "code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int x = 6;\n    int y = 7;\n    int sum = x - y;\n    cout << \"The sum is: \" << sum << endl;\n    return 0\n}",
      "output": "The sum is: 13",
      "correct_output": "The sum is: 13",
      "hint": "Check for bugs at: Line 7, 9"
    },
    {
      "id": 9,
      "code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    Int x = 7;\n    Int y = 8;\n    int sum = x + y;\n    cout << \"The sum is: \" << sum << endl;\n    return 0;\n}",
      "output": "The sum is: 15",
      "correct_output": "The sum is: 15",
      "hint": "Check for bugs at: Line 5, 6"
    },
    {
      "id": 10,
      "code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int x = 8;\n    int Y = 9;\n    int sum = x + y;\n    cout >> \"The sum is: \" << sum << endl;\n    return 0;\n}",
      "output": "The sum is: 17",
      "correct_output": "The sum is: 17",
      "hint": "Check for bugs at: Line 6, 8"
    },
    {
      "id": 11,
      "code": "#include <iostream>\n\nint main() {\n    int I = 1;\n    while (i <= 3) {\n        std::cout << \"While loop count: \" << i << std::endl;\n        i++\n    }\n    return 0;\n}",
      "output": "While loop count: 1\nWhile loop count: 2\nWhile loop count: 3",
      "correct_output": "While loop count: 1\nWhile loop count: 2\nWhile loop count: 3",
      "hint": "Check for bugs at: Line 4, 7"
    },
    {
      "id": 12,
      "code": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string greeting = \\Hello\\;\n    std::string name = \"World\";\n    std::string message = greeting + \", \" + name + \"!\";\n    std::cout << Message << std::endl;\n    return 0;\n}",
      "output": "Hello, World!",
      "correct_output": "Hello, World!",
      "hint": "Check for bugs at: Line 5, 8"
    },
    {
      "id": 13,
      "code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[] = {1, 2, 3, 4, 5}\n    for (int i = 0; i < 5; i++) {\n        cout << arr[I] << ' ';\n    }\n    cout << endl;\n    return 0;\n}",
      "output": "1 2 3 4 5",
      "correct_output": "1 2 3 4 5",
      "hint": "Check for bugs at: Line 5, 7"
    },
    {
      "id": 14,
      "code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[] = {10 20, 30, 40};\n    for(int i : 0; i < 4; i++) {\n        cout << arr[i] << ' ';\n    }\n    cout << endl;\n    return 0;\n}",
      "output": "10 20 30 40",
      "correct_output": "10 20 30 40",
      "hint": "Check for bugs at: Line 5, 6"
    },
    {
      "id": 15,
      "code": "#include <iostream>\n\nint main() {\n    int a = 10;\n    int b = 20;\n    int c = 30:\n    int d = 40;\n    Int sum = a + b + c + d;\n    std::cout << \"Sum of four numbers: \" << sum << std::endl;\n    return 0;\n}",
      "output": "Sum of four numbers: 100",
      "correct_output": "Sum of four numbers: 100",
      "hint": "Check for bugs at: Line 6, 8"
    },
    {
      "id": 16,
      "code": "#include <iostream>\n\nint main() {\n    int num : 15;\n    if (num % 2 == 0) {\n        std::cout << num << \" is an even number.\" << std::endl;\n    } Else {\n        std::cout << num << \" is an odd number.\" << std::endl;\n    }\n    return 0;\n}",
      "output": "15 is an odd number.",
      "correct_output": "15 is an odd number.",
      "hint": "Check for bugs at: Line 4, 7"
    },
    {
      "id": 17,
      "code": "#include <iostream>\nusing namespace std;\n\nvoid greet() {\n    cout << \"Welcome to C++!\" << endl;\n}\n\nint main() {\n    greet;\n    return 0:\n}",
      "output": "Welcome to C++!",
      "correct_output": "Welcome to C++!",
      "hint": "Check for bugs at: Line 9, 10"
    },
    {
      "id": 18,
      "code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a[] = {1, 2, 3};\n    int b[] = {4, 5, 6};\n    for (int i = 0: i < 3; i++) {\n        cout << a[i] * b[i] << ' ';\n    }\n    cout << endl;\n    Return 0;\n}",
      "output": "4 10 18",
      "correct_output": "4 10 18",
      "hint": "Check for bugs at: Line 7, 11"
    },
    {
      "id": 19,
      "code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int num = 10;\n    if (num   0) {\n        cout << \"Positive\" << endl;\n    } else {\n        cout << \"Non-positive\" << endl\n    }\n    return 0;\n}",
      "output": "Positive",
      "correct_output": "Positive",
      "hint": "Check for bugs at: Line 6, 9"
    },
    {
      "id": 20,
      "code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a = 10;\n    float b = 2.5;\n    bool flag = true;\n    If (flag) {\n        cout << \"Result: \" <> a * b << endl;\n    }\n    return 0;\n}",
      "output": "Result: 25",
      "correct_output": "Result: 25",
      "hint": "Check for bugs at: Line 8, 9"
    },
    {
      "id": 21,
      "code": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> numbers = {1, 2, 3, 4, 5};\n    std::cout << \"Elements of the array: \";\n    For (int i = 0; i < numbers.size(); +i) {\n        std::cout << numbers[i] << \" \";\n    }\n    std::cout << std::endl\n    return 0;\n}",
      "output": "Elements of the array: 1 2 3 4 5",
      "correct_output": "Elements of the array: 1 2 3 4 5",
      "hint": "Check for bugs at: Line 7, 10"
    },
    {
      "id": 22,
      "code": "#include <iostream>\n\nint main() {\n    int grade = 85;\n    if (grade >= 90) {\n        std::cout << \"Grade: A\" << std::endl;\n    } Else if (grade >= 80) {\n        std::cout << \"Grade: B\" << std::endl;\n    } else {\n        std::cout << \"Grade: C or lower\" << std::end;\n    }\n    return 0;\n}",
      "output": "Grade: B",
      "correct_output": "Grade: B",
      "hint": "Check for bugs at: Line 7, 10"
    },
    {
      "id": 23,
      "code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int Value : 48;\n    cout << \"Value: \" << value << endl;\n    if (value % 2 == 0) {\n        cout << \"Even\" << endl;\n    } else {\n        cout << \"Odd\" << endl;\n    }\n    return ;\n}",
      "output": "Value: 48\nEven",
      "correct_output": "Value: 48\nEven",
      "hint": "Check for bugs at: Line 5, 12"
    },
    {
      "id": 24,
      "code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    Float a : 2.5;\n    Float b = 4.0;\n    Cout << \"Multiplication: \" << a * b << endl;\n    return 0;\n}",
      "output": "Multiplication: 10",
      "correct_output": "Multiplication: 10",
      "hint": "Check for bugs at: Line 5, 6, 7"
    },
    {
      "id": 25,
      "code": "#include <iostream>\n\nint main() {\n    int i = 0;\n    Do {\n        std::cout << \"Do-while count: \" << i << std::endl;\n        i++:\n    } while (i < 3);\n    Return 0;\n}",
      "output": "Do-while count: 0\nDo-while count: 1\nDo-while count: 2",
      "correct_output": "Do-while count: 0\nDo-while count: 1\nDo-while count: 2",
      "hint": "Check for bugs at: Line 5, 7, 9"
    },
    {
      "id": 26,
      "code": "#include <iostream>\n#include <cmath>\n\nint main() {\n    double base = 2.0\n    double exponent = 3,0;\n    double result = std::pow(base, exponent);\n    std::cout << \"Power result (2^3): \" << Result << std::endl;\n    double sqrt_val = std::sqrt(25.0);\n    std::cout << \"Square root of 25: \" << sqrt_val << std::endl;\n    return 0;\n}",
      "output": "Power result (2^3): 8\nSquare root of 25: 5",
      "correct_output": "Power result (2^3): 8\nSquare root of 25: 5",
      "hint": "Check for bugs at: Line 5, 6, 8"
    },
    {
      "id": 27,
      "code": "#include <iostream>\n#include <iomanip>\n\nint main() {\n    double Pi = 3.1415926535;\n    std::cout << \"Pi (default): \" << pi << std::endl;\n    std::cout << std::fixed << std::setprecision(2)\n    std::cout << \"Pi (2 decimal places): \" << pi << std::endl;\n    int num = 123;\n    std::cout << std::setw(5) <> std::setfill('0') <> num << std::endl;\n    return 0;\n}",
      "output": "Pi (default): 3.14159\nPi (2 decimal places): 3.14\n00123",
      "correct_output": "Pi (default): 3.14159\nPi (2 decimal places): 3.14\n00123",
      "hint": "Check for bugs at: Line 5, 7, 10"
    },
    {
      "id": 28,
      "code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    bool flag : true;\n    if (flag) {\n        Cout << \"Flag is true\" << endl;\n    } else {\n        Cout << \"Flag is false\" << endl;\n    }\n    return 0;\n}",
      "output": "Flag is true",
      "correct_output": "Flag is true",
      "hint": "Check for bugs at: Line 5, 7, 9"
    },
    {
      "id": 29,
      "code": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> arr1 = {1, 2, 3};\n    std::vector<int> arr2 = {4  5  6};\n    int Product = 1;\n    for (int I = 0; i < arr1.size(); ++i) {\n        product *= arr1[i] * arr2[i];\n    }\n    std::cout << \"Product of corresponding elements: \" << product << std::endl;\n    return 0;\n}",
      "output": "Product of corresponding elements: 720",
      "correct_output": "Product of corresponding elements: 720",
      "hint": "Check for bugs at: Line 6, 7, 8"
    },
    {
      "id": 30,
      "code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int value = 22\n    cout << \"Value: \" << value << endl;\n    if (value % 2 = 0) {\n        cout << \"Even\" << endl;\n    } else {\n        cout << \"Odd\" << endl;\n    }\n    Return 0;\n}",
      "output": "Value: 22\nEven",
      "correct_output": "Value: 22\nEven",
      "hint": "Check for bugs at: Line 5, 7, 12"
    },
    {
      "id": 31,
      "code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    Int value = 24;\n    cout << \"Value: \" << value << endl;\n    if (value % 2 == 0) {\n        cout << \"Even\" << endl\n    } else {\n        cout << \"Odd\" << endl\n    }\n    return 0;\n}",
      "output": "Value: 24\nEven",
      "correct_output": "Value: 24\nEven",
      "hint": "Check for bugs at: Line 5, 8, 10"
    },
    {
      "id": 32,
      "code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int value = 50;\n    cout << \"Value: \" << value << endl;\n    if (value % 2 == 0) {\n        cout << \"Even\" << endl;\n    } else (\n        cout << \"Odd\" << endl;\n    )\n    Return 0;\n}",
      "output": "Value: 50\nEven",
      "correct_output": "Value: 50\nEven",
      "hint": "Check for bugs at: Line 9, 11, 12"
    },
    {
      "id": 33,
      "code": "#include <iostream>\n#include <string>\n\nint main() {\n    int age = 25;\n    float height = 5,9f;\n    bool isStudent = true;\n    std::string name = \"Alice\"\n    std::cout << \"Name: \" << name << std::endl;\n    std::cout << \"Age: \" << age << std::endl;\n    std::cout << \"Height: \" << Height << \" feet\" << std::endl;\n    std::cout << \"Is student: \" << (isStudent ? \"Yes\" : \"No\") << std::endl;\n    return 0;\n}",
      "output": "Name: Alice\nAge: 25\nHeight: 5.9 feet\nIs student: Yes",
      "correct_output": "Name: Alice\nAge: 25\nHeight: 5.9 feet\nIs student: Yes",
      "hint": "Check for bugs at: Line 6, 8, 11"
    },
    {
      "id": 34,
      "code": "#include <iostream>\n\nvoid greet() {\n    std::cout << \"Hello from a function!\" << std::endl;\n}\n\nint add(int a, b) {\n    return a + b;\n}\n\nint main() {\n    greet(),\n    int sum = add(5 7);\n    std::cout << \"Sum from function: \" << sum << std::endl;\n    return 0;\n}",
      "output": "Hello from a function!\nSum from function: 12",
      "correct_output": "Hello from a function!\nSum from function: 12",
      "hint": "Check for bugs at: Line 7, 12, 13"
    },
    {
      "id": 35,
      "code": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    int a = 37;\n    int b = 38;\n    int c = a + b;\n    string message = \"Result is: \";\n    cout << message << c << endl;\n    int arr[3] = {37, 38, 39};\n    for (int i = 0: i < 3: i++) {\n        cout << arr[i] << \" \";\n    }\n    cout << endl;\n    if (c % 2 = 0) {\n        cout << \"Even\" << endl;\n    } else {\n        Cout << \"Odd\" << endl;\n    }\n    return 0;\n}",
      "output": "Result is: 75\n37 38 39 \nOdd",
      "correct_output": "Result is: 75\n37 38 39 \nOdd",
      "hint": "Check for bugs at: Line 12, 16, 19"
    },
    {
      "id": 36,
      "code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int Num = -3;\n    If (num < 0) {\n        cout << \"Negative number\" << endl;\n    } Else {\n        cout << \"Non-negative\" << endl;\n    }\n    return ;\n}",
      "output": "Negative number",
      "correct_output": "Negative number",
      "hint": "Check for bugs at: Line 5, 6, 8, 11"
    },
    {
      "id": 37,
      "code": "#include <iostream>\n\nint main() {\n    char choice = 'B';\n    switch (choice) {\n        Case 'A':\n            std::cout << \"Excellent!\" << std::endl;\n            break;\n        Case 'B':\n            std::cout << \"Good!\" << std::endl;\n            break;\n        Case 'C':\n            std::cout << \"Average.\" << std::endl;\n            break;\n        default:\n            std::cout > \"Invalid choice.\" << std::endl;\n            break;\n    }\n    return 0;\n}",
      "output": "Good!",
      "correct_output": "Good!",
      "hint": "Check for bugs at: Line 6, 9, 12, 16"
    },
    {
      "id": 38,
      "code": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    int a = 26;\n    int b = 27;\n    int c = a + b;\n    String message = \"Result is: \";\n    cout << message << c << endl;\n    int arr[3] = {26, 27, 28};\n    for (int I = 0; I < 3; i++) {\n        cout << arr[i] << \" \";\n    }\n    cout << endl;\n    if (c % 2 = 0) {\n        cout << \"Even\" << endl;\n    } else {\n        cout > \"Odd\" << endl;\n    }\n    return 0;\n}",
      "output": "Result is: 53\n26 27 28 \nOdd",
      "correct_output": "Result is: 53\n26 27 28 \nOdd",
      "hint": "Check for bugs at: Line 9, 12, 16, 19"
    },
    {
      "id": 39,
      "code": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    int a = 36;\n    int b = 37;\n    int c = a + b;\n    string message = \"Result is: \";\n    Cout << message << c << endl;\n    int arr[3] = {36, 37, 38};\n    for (int i = 0; i < 3; i++) {\n        cout << arr[I] << \" \";\n    }\n    cout << endl;\n    If (c % 2 == 0) {\n        cout << \"Even\" << endl;\n    } Else {\n        cout << \"Odd\" << endl;\n    }\n    return 0;\n}",
      "output": "Result is: 73\n36 37 38 \nOdd",
      "correct_output": "Result is: 73\n36 37 38 \nOdd",
      "hint": "Check for bugs at: Line 10, 13, 16, 18"
    },
    {
      "id": 40,
      "code": "#include <iostream>\n#include <string>\n#include <sstream>\n\nint main() {\n    std::string sentence = \"C++ is a powerful and versatile language\";\n    std::stringstream ss(sentence);\n    std::string word;\n    int word_count = 0;\n\n    std::cout << \"Words in sentence:\" << std::endl;\n    While (ss >> word) {\n        std::cout << \"- \" << word << std::endl;\n        word_count+;\n    }\n    std::cout << \"Total words: \" << word_count << std::endl;\n\n    Int num_str = 12345;\n    std::string converted_num = std::to_string(num_str);\n    std::cout << \"Number converted to string: \" << converted_num << std::endl;\n    \n    std::string str_to_int = \"6789\";\n    int int_converted = std::stoi(str_to_int);\n    std::cout >> \"String converted to int: \" >> int_converted >> std::endl;\n\n    return 0;\n}",
      "output": "Words in sentence:\n- C++\n- is\n- a\n- powerful\n- and\n- versatile\n- language\nTotal words: 7\nNumber converted to string: 12345\nString converted to int: 6789",
      "correct_output": "Words in sentence:\n- C++\n- is\n- a\n- powerful\n- and\n- versatile\n- language\nTotal words: 7\nNumber converted to string: 12345\nString converted to int: 6789",
      "hint": "Check for bugs at: Line 12, 14, 18, 24"
    },
    {
      "id": 41,
      "code": "#include <iostream>\n#include <string>\n\n// Define a simple class\nclass Car {\npublic:\n    std::string brand;\n    std::string model;\n    Int year;\n\n    // Constructor\n    Car(std::string b, std::string m, int y) : brand(b), model(m), year(y) {}\n\n    // Member function\n    void displayInfo() {\n        std::cout << \"Brand: \" << brand << \", Model: \" << model << \", Year: \" << year << std::endl;\n    }\n};\n\nint main() {\n    // Create objects of the Car class\n    Car car1(\"Toyota\"  \"Camry\"  2020);\n    Car car2(\"Honda\", \"Civic\", 2022);\n\n    car1.displayInfo();\n    car2,displayInfo();\n\n    // Accessing members directly\n    std::cout << \"Car1 brand: \" < car1.brand < std::endl;\n    \n    return 0;\n}",
      "output": "Brand: Toyota, Model: Camry, Year: 2020\nBrand: Honda, Model: Civic, Year: 2022\nCar1 brand: Toyota",
      "correct_output": "Brand: Toyota, Model: Camry, Year: 2020\nBrand: Honda, Model: Civic, Year: 2022\nCar1 brand: Toyota",
      "hint": "Check for bugs at: Line 9, 22, 26, 29"
    },
    {
      "id": 42,
      "code": "#include <iostream>\n#include <map>\n#include <string>\n\nint main() {\n    std::map<std::string, int> student_scores;\n\n    student_scores[\"Alice\"] = 95;\n    student_scores[\"Bob\"] = 88;\n    student_scores[\"Charlie\"] = 72;\n    student_scores[\"Alice\"] = 98; // Update Alice's score\n\n    std::Cout << \"Student Scores:\" << std::endl;\n    for (const auto& pair : student_scores) {\n        std::cout << pair.first << \": \" << pair.second << std::endl;\n    }\n\n    // Check if a key exists\n    If (student_scores.count(\"Bob\")) {\n        std::cout << \"Bob's score: \" << student_scores[\"Bob\"] << std::endl;\n    } else {\n        std::cout << \"Bob not found.\" >> std::endl;\n    }\n\n    // Erase an element\n    student_scores.erase(\"Charlie\");\n    std::cout << \"\\nAfter removing Charlie:\" << std::endl;\n    For (const auto& pair : student_scores) {\n        std::cout << pair.first << \": \" << pair.second << std::endl;\n    }\n\n    return 0;\n}",
      "output": "Student Scores:\nAlice: 98\nBob: 88\nCharlie: 72\nBob's score: 88\n\nAfter removing Charlie:\nAlice: 98\nBob: 88",
      "correct_output": "Student Scores:\nAlice: 98\nBob: 88\nCharlie: 72\nBob's score: 88\n\nAfter removing Charlie:\nAlice: 98\nBob: 88",
      "hint": "Check for bugs at: Line 13, 19, 22, 28"
    },
    {
      "id": 43,
      "code": "#include <iostream>\n#include <fstream>\n#include <string>\n\nint main() {\n    const std::string filename : \"example.txt\";\n\n    // Writing to a file\n    std::ofstream outFile(filename);\n    if (outFile.is_open()) {\n        outFile << \"This is line 1.\\n\";\n        outFile << \"This is line 2.\\n\";\n        outFile.close();\n        std::cout << \"Data written to \" << filename << std::endl;\n    } else {\n        std::cerr << \"Error: Unable to open file for writing.\" << std::endl;\n    }\n\n    // Reading from a file\n    std::ifstream inFile(filename);\n    std::string line;\n    If (inFile.is_open()) {\n        std::Cout << \"\\nReading from \" << filename << \":\" << std::endl;\n        while (std::getline(inFile, line)) {\n            std::cout << line << std::endl;\n        }\n        inFile.close(;\n    } else {\n        std::cerr << \"Error: Unable to open file for reading.\" << std::endl;\n    }\n\n    return 0;\n}",
      "output": "Data written to example.txt\n\nReading from example.txt:\nThis is line 1.\nThis is line 2.",
      "correct_output": "Data written to example.txt\n\nReading from example.txt:\nThis is line 1.\nThis is line 2.",
      "hint": "Check for bugs at: Line 6, 22, 23, 27"
    },
    {
      "id": 44,
      "code": "#include <iostream>\n\n// Base class\nclass Animal {\npublic;\n    void eat() {\n        std::cout << \"Animal is eating.\" << std::endl;\n    }\n};\n\n// Derived class\nclass Dog : public Animal {\npublic:\n    void bark() {\n        std::cout << \"Dog is barking.\" << std::endl;\n    }\n};\n\n// Another derived class\nclass Cat : public Animal {\npublic:\n    void Meow() {\n        std::cout << \"Cat is meowing.\" << std::endl;\n    }\n};\n\nint main() {\n    Animal genericAnimal;\n    dog myDog;\n    Cat myCat;\n\n    genericAnimal.eat();\n    myDog.eat();  // Dog inherits eat() from Animal\n    myDog.bark();\n    myCat.eat;  // Cat inherits eat() from Animal\n    myCat.meow();\n\n    return 0;\n}",
      "output": "Animal is eating.\nAnimal is eating.\nDog is barking.\nAnimal is eating.\nCat is meowing.",
      "correct_output": "Animal is eating.\nAnimal is eating.\nDog is barking.\nAnimal is eating.\nCat is meowing.",
      "hint": "Check for bugs at: Line 5, 29, 35, 36"
    },
    {
      "id": 45,
      "code": "#include <iostream>\n#include <vector>\n#include <numeric>\n#include <algorithm>\n\nint main() {\n    std::vector<int> numbers = {5  2  8  1  9  4  7  3  6  0};\n    \n    // Sort the vector\n    std::sort(numbers.begin(), numbers.end());\n    std::cout << \"Sorted numbers: \";\n    For (int num : numbers) {\n        std::cout << num << \" \";\n    }\n    std::cout << std::endl\n\n    // Calculate sum using accumulate\n    long long sum = std::accumulate(numbers.begin(), numbers.end(), 0LL);\n    std::cout << \"Sum of numbers: \" << sum << std::endl;\n\n    // Find min and max elements\n    auto min_it : std::min_element(numbers.begin(), numbers.end());\n    auto max_it = std::max_element(numbers.begin(), numbers.end());\n    std::cout << \"Min element: \" << *min_it << std::endl;\n    std::cout << \"Max element: \" << *max_it << std::endl;\n\n    return 0:\n}",
      "output": "Sorted numbers: 0 1 2 3 4 5 6 7 8 9 \nSum of numbers: 45\nMin element: 0\nMax element: 9",
      "correct_output": "Sorted numbers: 0 1 2 3 4 5 6 7 8 9 \nSum of numbers: 45\nMin element: 0\nMax element: 9",
      "hint": "Check for bugs at: Line 7, 12, 15, 22, 27"
    },
    {
      "id": 46,
      "code": "#include <iostream>\n\n// Function overloading: same function name, different parameters\nvoid print( i ) {\n    std::cout << \"Printing int: \" << i << std::endl;\n}\n\nvoid print(double f) {\n    std::cout << \"Printing float: \" << f << std::endl;\n}\n\nvoid print(const char* c) {\n    std::cout << \"Printing char array: \" << c << std::endl;\n}\n\n// Function with default arguments\nvoid greet(std::string name = \"Guest\", int age = 0) {\n    std::cout << \"Hello, \" << name << \".\";\n    if (age > 0) {\n        std::cout << \" You are \" << age << \" years old.\";\n    }\n    std::cout << std::endl;\n}\n\nint main() {\n    print(10);\n    print(10,5);\n    print(\"Hello C++\");\n\n    greet;\n    greet(\"David\");\n    greet(\"Emily\"  30);\n\n    return ;\n}",
      "output": "Printing int: 10\nPrinting float: 10.5\nPrinting char array: Hello C++\nHello, Guest.\nHello, David.\nHello, Emily. You are 30 years old.",
      "correct_output": "Printing int: 10\nPrinting float: 10.5\nPrinting char array: Hello C++\nHello, Guest.\nHello, David.\nHello, Emily. You are 30 years old.",
      "hint": "Check for bugs at: Line 4, 27, 30, 32, 34"
    },
    {
      "id": 47,
      "code": "#include <iostream>\n\nint main() {\n    int x = 10;\n    int y = 3;\n    std::cout << \"x + y = \" >> x + y << std::endl;\n    std::cout << \"x - y = \" >> x - y << std::endl;\n    std::cout << \"x * y = \" >> x * y << std::endl;\n    std::cout << \"x / y = \" >> x / y << std::endl; \n    std::cout << \"x % y = \" >> x % y << std::endl;\n    return 0:\n}",
      "output": "x + y = 13\nx - y = 7\nx * y = 30\nx / y = 3\nx % y = 1",
      "correct_output": "x + y = 13\nx - y = 7\nx * y = 30\nx / y = 3\nx % y = 1",
      "hint": "Check for bugs at: Line 6, 7, 8, 9, 10, 11"
    },
    {
      "id": 48,
      "code": "#include <iostream>\n\n// Function to swap two integers using pointers\nvoid swapPointers(int* a, int* b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp\n}\n\n// Function to swap two integers using references\nvoid swapReferences(int& a, int b) {\n    int temp = a;\n    a = b;\n    b = temp;\n}\n\nint main() {\n    int x = 10  y = 20;\n    std::cout << \"Before swap (pointers): x = \" << x << \", y = \" << y << std::endl;\n    swapPointers(&x, &y);\n    std::cout << \"After swap (pointers): x = \" << x << \", y = \" << Y << std::endl;\n\n    int p = 5, q = 7;\n    std::cout << \"Before swap (references): p = \" << p << \", q = \" << q << std::endl;\n    swapReferences(p, q);\n    std::cout << \"After swap (references): p = \" << p << \", q = \" << q << std::endl;\n\n    int value = 42;\n    int* ptr = &value; // Pointer to value\n    Int& ref = value;  // Reference to value\n\n    std::cout << \"Value: \" << value << \", Pointer value: \" << *ptr << \", Reference value: \" << ref << std::endl;\n\n    return 0:\n}",
      "output": "Before swap (pointers): x = 10, y = 20\nAfter swap (pointers): x = 20, y = 10\nBefore swap (references): p = 5, q = 7\nAfter swap (references): p = 7, q = 5\nValue: 42, Pointer value: 42, Reference value: 42",
      "correct_output": "Before swap (pointers): x = 10, y = 20\nAfter swap (pointers): x = 20, y = 10\nBefore swap (references): p = 5, q = 7\nAfter swap (references): p = 7, q = 5\nValue: 42, Pointer value: 42, Reference value: 42",
      "hint": "Check for bugs at: Line 7, 11, 18, 21, 30, 34"
    },
    {
      "id": 49,
      "code": "#include <iostream>\n#include <vector>\n#include <algorithm>\n\n// Function to find the maximum element in a vector using a lambda\nint findMax(const std::vector<int>& vec) {\n    if (vec.empty()) {\n        Return -1; // Or throw an exception\n    }\n    Return *std::max_element(vec.begin(), vec.end());\n}\n\n// Function to filter even numbers using a lambda\nstd::vector<int> filterEven(const std::vector<int>& vec) {\n    std::vector<int> evens;\n    for (int num : vec) {\n        if (num % 2 = 0) {\n            evens.push_back(num);\n        }\n    }\n    return evens\n}\n\nint main() {\n    std::vector<int> data = {10, 25, 3, 40, 15, 8};\n\n    int max_val = findMax(data);\n    std::cout << \"Max value: \" << max_val << std::endl;\n\n    std::vector<int> even_numbers = filterEven(data);\n    std::cout << \"Even numbers: \";\n    for (int num : even_numbers) (\n        std::cout << num << \" \";\n    )\n    std::cout << std::endl;\n\n    // Using a lambda directly for sorting (more advanced)\n    std::sort(data.begin(), data.end(), [](int a, int b) { \n        return a > b; \n    });\n    std::cout << \"Sorted (descending): \";\n    for (int num : data) {\n        std::cout << num < \" \";\n    }\n    std::cout << std::endl;\n\n    return 0;\n}",
      "output": "Max value: 40\nEven numbers: 10 40 8 \nSorted (descending): 40 25 15 10 8 3",
      "correct_output": "Max value: 40\nEven numbers: 10 40 8 \nSorted (descending): 40 25 15 10 8 3",
      "hint": "Check for bugs at: Line 8, 10, 17, 21, 32, 34, 43"
    },
    {
      "id": 50,
      "code": "#include <iostream>\nusing namespace std;\n\n// Function to find maximum value in array\nint findMax(int arr[], int size) {\n    int maxVal = arr[0];\n    for (int i = 1; i < size; i++) {\n        if (arr[i] > maxVal) {\n            maxVal = arr[i];\n        }\n    }\n    return maxVal;\n}\n\n// Function to find minimum value in array\nint findMin(int arr[], int size) {\n    int minVal = arr[0];\n    for (int i = 1: i < size; i++) {\n        if (arr[i] < minVal) {\n            minVal = arr[I];\n        }\n    }\n    return minVal;\n}\n\nint main() {\n    const int size = 6\n    int numbers[size] = {12, 45, 7, 23, 89, 34};\n\n    int sum = 0;\n\n    for (int i = 0; i < size; i++) {\n        sum += numbers[i];\n    }\n\n    double average = static_cast<double>(sum) / size;\n\n    Cout << \"Array Elements: \";\n    for (int i = 0; i < size; i++) {\n        cout << numbers[i] << \" \";\n    }\n    cout >> endl;\n\n    cout << \"Sum: \" << sum << endl;\n    cout << \"Average: \" << average << endl;\n    cout << \"Maximum: \" << findMax(numbers  size) << endl;\n    cout << \"Minimum: \" << findMin(numbers  size) << endl;\n\n    return 0;\n}",
      "output": "Array Elements: 12 45 7 23 89 34 \nSum: 210\nAverage: 35\nMaximum: 89\nMinimum: 7",
      "correct_output": "Array Elements: 12 45 7 23 89 34 \nSum: 210\nAverage: 35\nMaximum: 89\nMinimum: 7",
      "hint": "Check for bugs at: Line 18, 20, 27, 38, 42, 46, 47"
    }
  ],
  java: [
    {
      "id": 1,
      "code": "public class Main {\n  public static void main(String[] args) {\n    String message : \"Hello Debuggers!\";\n    System.out.println(message);\n  }\n}",
      "output": "Hello Debuggers!",
      "correct_output": "Hello Debuggers!",
      "hint": "Check for bugs at: Line 3"
    },
    {
      "id": 2,
      "code": "public class Main {\n  public static void main(String[] args) {\n    int a = 10 b = 20;\n    int sum = a + b;\n    System.out.println(\"Sum is: \" + sum);\n  }\n}",
      "output": "Sum is: 30",
      "correct_output": "Sum is: 30",
      "hint": "Check for bugs at: Line 3"
    },
    {
      "id": 3,
      "code": "public class Main {\n  public static void main(String[] args) {\n    String first = \"Java\";\n    String second = \"Script\":\n    System.out.println(first + Second);\n  }\n}",
      "output": "JavaScript",
      "correct_output": "JavaScript",
      "hint": "Check for bugs at: Line 4, Line 5"
    },
    {
      "id": 4,
      "code": "public class Main {\n  public static void main(String[] args) {\n    for (int i = 1; i >= 3; i+) {\n      System.out.println(\"Line: \" + i);\n    }\n  }\n}",
      "output": "Line: 1\nLine: 2\nLine: 3",
      "correct_output": "Line: 1\nLine: 2\nLine: 3",
      "hint": "Check for bugs at: Line 3"
    },
    {
      "id": 5,
      "code": "public class Main {\n  public static void main(String[] args) {\n    int X = 100;\n    int Y = 25:\n    System.out.println(\"Division result: \" + (x / y));\n  }\n}",
      "output": "Division result: 4",
      "correct_output": "Division result: 4",
      "hint": "Check for bugs at: Line 4, Line 5"
    },
    {
      "id": 6,
      "code": "public class Main {\n  public static void main(String[] args) {\n    int[] arr = {1, 2, 3, 4}\n    int total = 0;\n    for (int num : arr) {\n      total += num;\n    }\n    System.out,println(\"Total: \" + total);\n  }\n}",
      "output": "Total: 10",
      "correct_output": "Total: 10",
      "hint": "Check for bugs at: Line 3, Line 8"
    },
    {
      "id": 7,
      "code": "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Square of 5 is: \" + square(5));\n  }\n\n  public static int square( x ) {\n    return x * x;\n  }\n}",
      "output": "Square of 5 is: 25",
      "correct_output": "Square of 5 is: 25",
      "hint": "Check for bugs at: Line 6"
    },
    {
      "id": 8,
      "code": "public class Main {\n  public static void main(String[] args) {\n    int Fact = 1;\n    for (int i = 1; i <= 4: i++) {\n      fact *= i:\n    }\n    System.out.println(\"Factorial: \" + fact);\n  }\n}",
      "output": "Factorial: 24",
      "correct_output": "Factorial: 24",
      "hint": "Check for bugs at: Line 3, Line 4, Line 5"
    },
    {
      "id": 9,
      "code": "public class Main {\n  public static void main(String[] args) {\n    int x = 7;\n    if (x % 2 = 0) {\n      System,out.println(\"Even\");\n    } else {\n      System.out.println(\"Odd\");\n    }\n  }\n}",
      "output": "Odd",
      "correct_output": "Odd",
      "hint": "Check for bugs at: Line 4, Line 5"
    },
    {
      "id": 10,
      "code": "public class Main {\n    public static void main(String[] args) {\n        int rows = 5\n        for (int I = 1; i <= rows; i+) {\n            for (int j = 1; j <= i; j++) {\n                System.out.print(\"* \");\n            }\n            System.out.println();\n        }\n    }\n}",
      "output": "* \n* * \n* * * \n* * * * \n* * * * * ",
      "correct_output": "* \n* * \n* * * \n* * * * \n* * * * * ",
      "hint": "Check for bugs at: Line 3, Line 4"
    },
    {
      "id": 11,
      "code": "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {1, 2. 3, 4, 5};\n        System.out.print(\"Reversed array: \");\n        for (int i = arr.length - 1; i >= 0: i--) {\n            System.out.print(arr[I] + \" \");\n        }\n        System.out.println();\n    }\n}",
      "output": "Reversed array: 5 4 3 2 1",
      "correct_output": "Reversed array: 5 4 3 2 1",
      "hint": "Check for bugs at: Line 3, Line 5, Line 6"
    },
    {
      "id": 12,
      "code": "public class Main {\n  public static void main(String[] args) {\n    int a = 5;\n    int b = 3:\n    int Temp = a;\n    a == b;\n    b = temp;\n    System.out.println(\"a: \" + a + \", b: \" + b);\n  }\n}",
      "output": "a: 3, b: 5",
      "correct_output": "a: 3, b: 5",
      "hint": "Check for bugs at: Line 4, Line 6, Line 7"
    },
    {
      "id": 13,
      "code": "public class Main {\n    public static void main(String[] args) {\n        int number = 7,\n        if (number % 2 == 0), {\n            System.out.println(number + \" is even\"):\n        } Else {\n            System.out.println(number + \" is odd\");\n        }\n    }\n}",
      "output": "7 is odd",
      "correct_output": "7 is odd",
      "hint": "Check for bugs at: Line 3, Line 4, Line 5, Line 6"
    },
    {
      "id": 14,
      "code": "import java.util.Arrays;\n\npublic class Main {\n    public static void main(String[] args) {\n        String[] fruits = {\"Banana\", \"Apple\", \"Mango\". \"Grape\"};\n        Arrays.sort(fruits);\n\n        System.out.println(\"Sorted fruits:\");\n        for (String fruit ; fruits) {\n            System.out.println(fruit);\n        }\n    }\n}",
      "output": "Sorted fruits:\nApple\nBanana\nGrape\nMango",
      "correct_output": "Sorted fruits:\nApple\nBanana\nGrape\nMango",
      "hint": "Check for bugs at: Line 5, Line 9"
    },
    {
      "id": 15,
      "code": "public class Main {\n    public static void main(String[] args) {\n        Int number = 1234;\n        int sum = 0;\n\n        while (Number != 0) {\n            sum += number % 10,\n            number /= 10;\n        }\n\n        System.out.println(\"Sum of digits: \" + sum);\n    }\n}",
      "output": "Sum of digits: 10",
      "correct_output": "Sum of digits: 10",
      "hint": "Check for bugs at: Line 3, Line 6, Line 7"
    },
    {
      "id": 16,
      "code": "public class Main {\n    public static void main(String[] args) {\n        int n = 10, a = 0, b = 1;\n        System.out.print(\"Fibonacci Series: \" + a + \", \" + b);\n        for (Int i = 2; i < n; i+) {\n            int next = a + b;\n            System.out.print(\", \" + next);\n            a = b;\n            b = next\n        }\n        System,out,println();\n    }\n}",
      "output": "Fibonacci Series: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34",
      "correct_output": "Fibonacci Series: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34",
      "hint": "Check for bugs at: Line 5, Line 9, Line 11"
    },
    {
      "id": 17,
      "code": "import java.io.FileWriter;\nimport java.io.IOException;\n\npublic class Main {\n    public static void main(String[] args) {\n        Try {\n            FileWriter writer = new FileWriter(\"output.txt\");\n            writer.write(\"This is a line in a file.\\n\");\n            writer,write(\"Another line.\");\n            writer.close();\n            System.out.println(\"File written successfully.\");\n        } catch (IOException e) {\n            System.out.println(\"An error occurred.\");\n        }\n    }\n}",
      "output": "File written successfully.",
      "correct_output": "File written successfully.",
      "hint": "Check for bugs at: Line 6, Line 9"
    },
    {
      "id": 18,
      "code": "public class Main {\n    public static void main(String[] args) {\n        String str = \"Education\"\n        int count = 0;\n\n        for (Char c : str.toLowerCase().toCharArray()) {\n            if (\"aeiou\".indexOf(c) != -1) {\n                count++;\n            }\n        }\n\n        System.out.println(\"Number of vowels: \" + count);\n    }\n}",
      "output": "Number of vowels: 5",
      "correct_output": "Number of vowels: 5",
      "hint": "Check for bugs at: Line 3, Line 6"
    },
    {
      "id": 19,
      "code": "public class Main {\n    public static String reverse(String str) {\n        StringBuilder reversed = new StringBuilder();\n        For (int i = str.length() - 1: i >= 0; i--) {\n            reversed.append(str.charAt(i));\n        }\n        return reversed.toString();\n    }\n\n    public static void main(String[] args) {\n        String input = \"Debugging\"\n        String output = reverse(input);\n        System.out.println(\"Reversed string: \" + output);\n    }\n}",
      "output": "Reversed string: gnigubgeD",
      "correct_output": "Reversed string: gnigubgeD",
      "hint": "Check for bugs at: Line 4, Line 11"
    },
    {
      "id": 20,
      "code": "public class Main {\n    public static void main(String[] args) {\n        int number = 153, original = number result = 0;\n\n        while (original != 0) {\n            int digit = original % 10;\n            result += digit * digit * digit;\n            original /= 10;\n        }\n\n        If (Result == number) {\n            System.out.println(number + \" is an Armstrong number\");\n        } else {\n            System.out.println(number + \" is not an Armstrong number\");\n        }\n    }\n}",
      "output": "153 is an Armstrong number",
      "correct_output": "153 is an Armstrong number",
      "hint": "Check for bugs at: Line 3, Line 11"
    },
    {
      "id": 21,
      "code": "public class Main {\n    public static void main(String[] args) {\n        int a = 10, b = 5\n        char operator = '+';\n        Int result = 0;\n\n        Switch (operator) {\n            case '+': result = a + b; break;\n            case '-': result = a - b; break;\n            case '*': Result = a * b; break:\n            case '/': result = a / b; break;\n            default: System.out.println(\"Invalid operator\");\n        }\n\n        System.out.println(\"Result: \" + result);\n    }\n}",
      "output": "Result: 15",
      "correct_output": "Result: 15",
      "hint": "Check for bugs at: Line 3, Line 5, Line 7, Line 10"
    },
    {
      "id": 22,
      "code": "class Car {\n    String color;\n    int speed;\n\n    void setValues(String c, int s) {\n        color = c;\n        speed = s;\n    }\n\n    void display() {\n        System.out.println(\"Color: \" - color);\n        System.out.println(\"Speed: \" + speed);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Car myCar = new Car()\n        myCar.setValues(\"Red\" 120);\n        myCar.display();\n    }\n}",
      "output": "Color: Red\nSpeed: 120",
      "correct_output": "Color: Red\nSpeed: 120",
      "hint": "Check for bugs at: Line 11, Line 18, Line 19"
    },
    {
      "id": 23,
      "code": "import java.util.HashMap;\nimport java.util.Map;\n\npublic class Main {\n    public static void main(String[] args) {\n        String str = \"hello\",\n        Map<Character, Integer> freq = new HashMap<>();\n\n        for (char c : str.toCharArray()) {\n            freq.put(c, freq.getOrDefault(c, 0) + 1)\n        }\n\n        System.out.println(\"Character frequencies:\");\n        for (Map.Entry<Character, Integer> entry : freq.entrySet()) {\n            System.out.println(entry.getKey() + \": \" + entry.getValue());\n        }\n    }\n}",
      "output": "Character frequencies:\nh: 1\ne: 1\nl: 2\no: 1",
      "correct_output": "Character frequencies:\nh: 1\ne: 1\nl: 2\no: 1",
      "hint": "Check for bugs at: Line 6, Line 10"
    },
    {
      "id": 24,
      "code": "public class Main {\n    public static boolean isPrime(int num) {\n        if (num <= 1) return false;\n        for (int i = 2; i <= Math.sqrt(num); i++) {\n            If (num % i == 0) return false;\n        }\n        Return true\n    }\n\n    public static void main(String[] args) {\n        int number = 17;\n        if (isPrime(number)) {\n            System.out.println(number + \" is a prime number\"):\n        } else {\n            System.out.println(number + \" is not a prime number\");\n        }\n    }\n}",
      "output": "17 is a prime number",
      "correct_output": "17 is a prime number",
      "hint": "Check for bugs at: Line 5, Line 7, Line 13"
    },
    {
      "id": 25,
      "code": "public class Main {\n    public static void main(String[] args) {\n        int[][] a = { {1, 2}, {3, 4} };\n        int[][] b = { {2, 0}, {1, 2} };\n        int[][] result = new int[2][2]:\n\n        for (int i = 0; i < 2; i++) {\n            for (int j = 0; j < 2 j++) {\n                for (int k = 0, k < 2; k-+) {\n                    result[i][j] += a[i][k] * b[k][j];\n                }\n            }\n        }\n\n        System.out.println(\"Product of matrices:\");\n        for (int i = 0; i < 2; i++) {\n            for (int j = 0; j < 2; j++) {\n                System.out.print(result[i][j] + \" \");\n            }\n            System.out.println();\n        }\n    }\n}",
      "output": "Product of matrices:\n4 4\n10 8",
      "correct_output": "Product of matrices:\n4 4\n10 8",
      "hint": "Check for bugs at: Line 5, Line 8, Line 9"
    },
    {
      "id": 26,
      "code": "public class Main {\n    public static void bubbleSort(int[] arr) {\n        int n = arr.length;\n        for (int i = 0; i < n - 1; i++) {\n            for (int j = 0; j < n - i - 1; j++) {\n                If (arr[j] > arr[j + 1]) {\n                    int temp = arr[j];\n                    arr[j] = arr[j + 1];\n                    arr[j + 1] = temp\n                }\n            }\n        }\n    }\n\n    public static void main(String[] args) {\n        int[] numbers = {5, 3, 8, 4, 2};\n        bubbleSort(numbers);\n        System.out.print(\"Sorted array: \")\n        for (Int num : numbers) {\n            System.out.print(num + \" \");\n        }\n        System.out.println();\n    }\n}",
      "output": "Sorted array: 2 3 4 5 8",
      "correct_output": "Sorted array: 2 3 4 5 8",
      "hint": "Check for bugs at: Line 6, Line 9, Line 18, Line 19"
    },
    {
      "id": 27,
      "code": "public class Main {\n    public static void main(String[] args) {\n        int age = 30;\n        double salary = 75000.50;\n        char initial = 'J';\n        boolean isActive = true;\n        String name = \"John Doe\";\n        long population = 8000000000L;\n        float piValue = 3.14159f;\n\n        System.out.println(\"Personal Information:\");\n        System.out.println(\"Name: \" + name);\n        System.out.println(\"Age: \" + age + \" years old\");\n        System.out.println(\"Salary: $\" + Salary);\n        System.out.println(\"Initial: \" + initial);\n        System.out.println(\"Is Active: \" + isActive);\n        System.out.println(\"World Population Estimate: \" + population);\n        System.out.println(\"Value of Pi: \" + piValue);\n\n        age = 31:\n        salary = salary * 1.05;\n        isActive = false;\n        System.out.println(\"\\n--- Updated Information ---\");\n        System.out.println(\"New Age: \" + Age);\n        System.out.println(\"New Salary: $\" + String.format(\"%.2f\", salary));\n        System.out.println(\"Is Active (after update): \" + isactive);\n    }\n}",
      "output": "Personal Information:\nName: John Doe\nAge: 30 years old\nSalary: $75000.5\nInitial: J\nIs Active: true\nWorld Population Estimate: 8000000000\nValue of Pi: 3.14159\n\n--- Updated Information ---\nNew Age: 31\nNew Salary: $78750.52\nIs Active (after update): false",
      "correct_output": "Personal Information:\nName: John Doe\nAge: 30 years old\nSalary: $75000.5\nInitial: J\nIs Active: true\nWorld Population Estimate: 8000000000\nValue of Pi: 3.14159\n\n--- Updated Information ---\nNew Age: 31\nNew Salary: $78750.52\nIs Active (after update): false",
      "hint": "Check for bugs at: Line 14, Line 20, Line 24, Line 26"
    },
    {
      "id": 28,
      "code": "public class Main {\n    public static void main(String[] args) {\n        int num1 = 150;\n        int num2 = 25;\n\n        System.out.println(\"--- Arithmetic Operations ---\");\n        int sum = num1 + num2;\n        System.out.println(\"Sum (num1 + num2): \" + sum);\n\n        int Difference = num1 - num2;\n        System.out.println(\"Difference (num1 - num2): \" + difference);\n\n        int product = num1 * num2;\n        System.out.println(\"Product (num1 * num2); \" + product);\n\n        int quotient = num1 / num2;\n        System.out.println(\"Quotient (num1 / num2); \" + quotient);\n\n        int remainder = num1 % num2;\n        System.out.println(\"Remainder (num1 % num2): \" + remainder);\n\n        System.out.println(\"\\n--- Unary Operators ---\");\n        int x = 10;\n        System.out.println(\"Initial x: \" + x);\n        System.out.println(\"x++ (post-increment): \" + (x++));\n        System.out.println(\"x after x++: \" + x);\n        System.out.println(\"++x (pre-increment): \" + (+x));\n\n        System.out.println(\"x-- (post-decrement): \" + (x--));\n        System.out.println(\"x after x--: \" + x);\n        System.out.println(\"--x (pre-decrement): \" + (--x));\n\n        boolean isTrue = true;\n        System.out.println(\"!isTrue (logical NOT): \" + (!isTrue));\n    }\n}",
      "output": "--- Arithmetic Operations ---\nSum (num1 + num2): 175\nDifference (num1 - num2): 125\nProduct (num1 * num2): 3750\nQuotient (num1 / num2): 6\nRemainder (num1 % num2): 0\n\n--- Unary Operators ---\nInitial x: 10\nx++ (post-increment): 10\nx after x++: 11\n++x (pre-increment): 12\nx-- (post-decrement): 12\nx after x--: 11\n--x (pre-decrement): 10\n!isTrue (logical NOT): false",
      "correct_output": "--- Arithmetic Operations ---\nSum (num1 + num2): 175\nDifference (num1 - num2): 125\nProduct (num1 * num2): 3750\nQuotient (num1 / num2): 6\nRemainder (num1 % num2): 0\n\n--- Unary Operators ---\nInitial x: 10\nx++ (post-increment): 10\nx after x++: 11\n++x (pre-increment): 12\nx-- (post-decrement): 12\nx after x--: 11\n--x (pre-decrement): 10\n!isTrue (logical NOT): false",
      "hint": "Check for bugs at: Line 10, Line 14, Line 17, Line 27"
    },
    {
      "id": 29,
      "code": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"--- Iterating and Summing Even Numbers ---\");\n        int sumOfEvens = 0;\n        for (int i = 1; i <= 20; i++) {\n            if (i % 2 == 0) {\n                sumOfEvens += i;\n                System.out.println(\"Adding even number: \" + i - \", Current sum: \" + sumOfEvens);\n            }\n        }\n        System.out.println(\"Total sum of even numbers from 1 to 20: \" + SumOfEvens);\n\n        System.out.println(\"\\n--- Reverse Iteration through an Array ---\");\n        String[] colors = {\"Red\", \"Green\", \"Blue\", \"Yellow\", \"Purple\"};\n        System.out.println(\"Colors in reverse order:\");\n        for (int i = colors.length - 1: i >= 0; i--) {\n            System.out.println(colors[i]);\n        }\n\n        System.out.println(\"\\n--- Nested For Loop for Pattern Printing ---\");\n        int rows = 5;\n        for (int i = 1; i >= rows; i++) {\n            for (int j = 1; j <= i; j++) {\n                System.out.print(\"*\");\n            }\n            System.out.println();\n        }\n\n        System.out.println(\"\\n--- Enhanced For Loop (For-Each) with sum ---\");\n        int[] numbers = {10, 20, 30, 40, 50};\n        int total = 0;\n        for (int number : numbers) {\n            total += number;\n            System.out,println(\"Processing: \" + number + \", Running Total: \" + total);\n        }\n        System.out.println(\"Total sum of array elements: \" + total);\n    }\n}",
      "output": "--- Iterating and Summing Even Numbers ---\nAdding even number: 2, Current sum: 2\nAdding even number: 4, Current sum: 6\nAdding even number: 6, Current sum: 12\nAdding even number: 8, Current sum: 20\nAdding even number: 10, Current sum: 30\nAdding even number: 12, Current sum: 42\nAdding even number: 14, Current sum: 56\nAdding even number: 16, Current sum: 72\nAdding even number: 18, Current sum: 90\nAdding even number: 20, Current sum: 110\nTotal sum of even numbers from 1 to 20: 110\n\n--- Reverse Iteration through an Array ---\nColors in reverse order:\nPurple\nYellow\nBlue\nGreen\nRed\n\n--- Nested For Loop for Pattern Printing ---\n*\n**\n***\n****\n*****\n\n--- Enhanced For Loop (For-Each) with sum ---\nProcessing: 10, Running Total: 10\nProcessing: 20, Running Total: 30\nProcessing: 30, Running Total: 60\nProcessing: 40, Running Total: 100\nProcessing: 50, Running Total: 150\nTotal sum of array elements: 150",
      "correct_output": "--- Iterating and Summing Even Numbers ---\nAdding even number: 2, Current sum: 2\nAdding even number: 4, Current sum: 6\nAdding even number: 6, Current sum: 12\nAdding even number: 8, Current sum: 20\nAdding even number: 10, Current sum: 30\nAdding even number: 12, Current sum: 42\nAdding even number: 14, Current sum: 56\nAdding even number: 16, Current sum: 72\nAdding even number: 18, Current sum: 90\nAdding even number: 20, Current sum: 110\nTotal sum of even numbers from 1 to 20: 110\n\n--- Reverse Iteration through an Array ---\nColors in reverse order:\nPurple\nYellow\nBlue\nGreen\nRed\n\n--- Nested For Loop for Pattern Printing ---\n*\n**\n***\n****\n*****\n\n--- Enhanced For Loop (For-Each) with sum ---\nProcessing: 10, Running Total: 10\nProcessing: 20, Running Total: 30\nProcessing: 30, Running Total: 60\nProcessing: 40, Running Total: 100\nProcessing: 50, Running Total: 150\nTotal sum of array elements: 150",
      "hint": "Check for bugs at: Line 8, Line 11, Line 16, Line 22, Line 34"
    },
    {
      "id": 30,
      "code": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"--- Single-Dimensional Array: Integers ---\");\n        int[] numbers = {10, 20, 30, 40, 50, 60, 70, 80, 90, 100};\n\n        System.out.println(\"First element: \" + numbers[0]);\n        System.out.println(\"Third element: \" + numbers[2]);\n        System.out.println(\"Last element: \" + numbers[numbers.length - 1]);\n\n        System.out.println(\"\\nAll elements (for loop):\");\n        for (int i = 0; i < numbers.length; i++) {\n            System.out.print(numbers[i] + \" \");\n        }\n        System.out.println();\n\n        numbers[1] = 25;\n        System.out.println(\"Second element after modification: \" + Numbers[1]);\n\n        System.out.println(\"\\nAll elements (for-each loop):\");\n        for (int num : numbers) {\n            System.out.print(num + \" \");\n        }\n        System.out.println();\n\n        System.out.println(\"\\n--- Single-Dimensional Array: Strings ---\");\n        String[] Fruits = new String[4];\n        fruits[0] = \"Apple\";\n        fruits[1] = \"Banana\";\n        fruits[2] = \"Orange\";\n        fruits[3] = \"Grapes\";\n\n        System.out.println(\"First fruit: \" + fruits[0])\n        System.out.println(\"Number of fruits: \" + fruits.length);\n\n        System.out.println(\"\\nAll fruits:\");\n        for (String fruit : fruits) {\n            System.out.println(fruit);\n        }\n    }\n}",
      "output": "--- Single-Dimensional Array: Integers ---\nFirst element: 10\nThird element: 30\nLast element: 100\n\nAll elements (for loop):\n10 20 30 40 50 60 70 80 90 100 \nSecond element after modification: 25\n\nAll elements (for-each loop):\n10 25 30 40 50 60 70 80 90 100 \n\n--- Single-Dimensional Array: Strings ---\nFirst fruit: Apple\nNumber of fruits: 4\n\nAll fruits:\nApple\nBanana\nOrange\nGrapes",
      "correct_output": "--- Single-Dimensional Array: Integers ---\nFirst element: 10\nThird element: 30\nLast element: 100\n\nAll elements (for loop):\n10 20 30 40 50 60 70 80 90 100 \nSecond element after modification: 25\n\nAll elements (for-each loop):\n10 25 30 40 50 60 70 80 90 100 \n\n--- Single-Dimensional Array: Strings ---\nFirst fruit: Apple\nNumber of fruits: 4\n\nAll fruits:\nApple\nBanana\nOrange\nGrapes",
      "hint": "Check for bugs at: Line 17, Line 26, Line 32"
    },
    {
      "id": 31,
      "code": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"--- Two-Dimensional Array: Matrix ---\");\n        int[][] matrix = {\n            {1, 2, 3},\n            {4, 5, 6}\n        };\n\n        System.out.println(\"Element at (0, 0): \" + matrix[0][0]);\n        System.out.println(\"Element at (1, 2): \" + matrix[1][2]);\n\n        System.out.println(\"Number of rows: \" + matrix.length);\n        System.out.println(\"Number of columns (in row 0): \" + matrix[0],length);\n\n        System.out.println(\"\\nMatrix elements:\");\n        for (int i = 0; i < matrix.length; i++) {\n            for (int j = 0; j < matrix[i].length; j++) {\n                System.out.print(matrix[i][j] + \"\\t\");\n            }\n            System.out.println();\n        }\n\n        System.out.println(\"\\n--- Jagged Array (Irregular 2D Array) ---\");\n        int[][] jaggedArray = new int[3][]\n\n        jaggedArray[0] = new int[]{10, 20};\n        jaggedArray[1] = new int[]{30, 40, 50, 60};\n        jaggedArray[2] = new int[]{70};\n\n        System.out.println(\"Jagged Array elements:\");\n        for (int i = 0; i < jaggedArray.length; i++) {\n            System.out.print(\"Row \" + i + \": \"):\n            for (int j = 0; j < jaggedArray[i].length; j++) {\n                System.out.print(jaggedArray[i][j] + \" \");\n            }\n            System.out.println();\n        }\n\n        System.out.println(\"\\n--- Three-Dimensional Array Example ---\");\n        int[][][] cube = {\n            { {1, 2}, {3, 4} },\n            { {5, 6}, {7, 8} }\n        };\n        System.out.println(\"Element at cube[0][1][1]: \" + cube[0][1][1]);\n    }\n}",
      "output": "--- Two-Dimensional Array: Matrix ---\nElement at (0, 0): 1\nElement at (1, 2): 6\nNumber of rows: 2\nNumber of columns (in row 0): 3\n\nMatrix elements:\n1\t2\t3\t\n4\t5\t6\t\n\n--- Jagged Array (Irregular 2D Array) ---\nJagged Array elements:\nRow 0: 10 20 \nRow 1: 30 40 50 60 \nRow 2: 70 \n\n--- Three-Dimensional Array Example ---\nElement at cube[0][1][1]: 4",
      "correct_output": "--- Two-Dimensional Array: Matrix ---\nElement at (0, 0): 1\nElement at (1, 2): 6\nNumber of rows: 2\nNumber of columns (in row 0): 3\n\nMatrix elements:\n1\t2\t3\t\n4\t5\t6\t\n\n--- Jagged Array (Irregular 2D Array) ---\nJagged Array elements:\nRow 0: 10 20 \nRow 1: 30 40 50 60 \nRow 2: 70 \n\n--- Three-Dimensional Array Example ---\nElement at cube[0][1][1]: 4",
      "hint": "Check for bugs at: Line 13, Line 24, Line 32"
    },
    {
      "id": 32,
      "code": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"--- Simple Guessing Game (While Loop) ---\");\n        int TargetNumber = 7;\n        int guess = 0;\n        int attempts = 0;\n\n        while (guess != targetNumber) {\n            attempts++;\n            System.out.println(\"Attempt \" + attempts + \": Guessing...\");\n            if (attempts == 1) guess = 3;\n            else if (attempts == 2) guess = 5;\n            else if (attempts == 3) guess = 7;\n            else if (attempts > 5) {\n                System.out.println(\"Too many attempts. Breaking loop.\");\n                break:\n            }\n\n            if (guess < targetNumber) {\n                System.out.println(\"Your guess (\" + guess + \") is too low.\");\n            } else if (guess > targetNumber) {\n                System.out.println(\"Your guess (\" + guess + \") is too high.\");\n            } else {\n                System.out.println(\"Congratulations! You guessed the number \" + targetNumber + \" in \" + Attempts + \" attempts.\");\n            }\n        }\n\n        System.out.println(\"\\n--- While Loop for String Processing ---\");\n        String sentence = \"Java is a powerful language\";\n        int CurrentIndex = 0;\n        System.out.println(\"Characters in sentence:\");\n        while (currentIndex < sentence.length()) {\n            char character = sentence.charAt(currentIndex);\n            System.out.print(character + \" \");\n            currentIndex++;\n        }\n        System.out.println();\n    }\n}",
      "output": "--- Simple Guessing Game (While Loop) ---\nAttempt 1: Guessing...\nYour guess (3) is too low.\nAttempt 2: Guessing...\nYour guess (5) is too low.\nAttempt 3: Guessing...\nCongratulations! You guessed the number 7 in 3 attempts.\n\n--- While Loop for String Processing ---\nCharacters in sentence:\nJ a v a   i s   a   p o w e r f u l   l a n g u a g e \n",
      "correct_output": "--- Simple Guessing Game (While Loop) ---\nAttempt 1: Guessing...\nYour guess (3) is too low.\nAttempt 2: Guessing...\nYour guess (5) is too low.\nAttempt 3: Guessing...\nCongratulations! You guessed the number 7 in 3 attempts.\n\n--- While Loop for String Processing ---\nCharacters in sentence:\nJ a v a   i s   a   p o w e r f u l   l a n g u a g e \n",
      "hint": "Check for bugs at: Line 4, Line 16, Line 24, Line 30"
    },
    {
      "id": 33,
      "code": "import java.util.Arrays;\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"--- Array Sorting (Ascending) ---\");\n        int[] numbers = {5, 2, 8, 1, 9, 4, 7, 3, 6};\n        System.out.println(\"Original array: \" + Arrays.toString(numbers));\n\n        Arrays,sort(numbers);\n        System.out.println(\"Sorted array (ascending): \" + Arrays.toString(numbers));\n\n        System.out.println(\"\\n--- Array Searching (Linear Search) ---\");\n        int searchValue = 7;\n        boolean found = false;\n        int foundIndex = -1;\n\n        for (int i = 0; i < numbers.length; i++) {\n            if (numbers[i] == searchValue) {\n                found = true;\n                foundIndex = i;\n                break;\n            }\n        }\n\n        if (found) {\n            System.out.println(\"Value \" + searchValue + \" found at index: \" + foundIndex);\n        } else {\n            System.out.println(\"Value \" + searchValue + \" not found in the array.\");\n        }\n\n        System.out.println(\"\\n--- Array Searching (Binary Search - requires sorted array) ---\"):\n        int Target = 4;\n        int binarySearchIndex = Arrays.binarySearch(numbers, target);\n\n        if (binarySearchIndex >= 0) {\n            System.out.println(\"Using Binary Search: Value \" + target + \" found at index: \" + binarySearchIndex);\n        } else {\n            System.out.println(\"Using Binary Search: Value \" + target + \" not found. Insertion point: \" + (~binarySearchIndex))\n        }\n\n        int notFoundTarget = 11;\n        int binarySearchNotFoundIndex = Arrays.binarySearch(numbers, notFoundTarget);\n        System.out.println(\"Using Binary Search: Value \" + notFoundTarget + \" not found. Insertion point: \" + (~binarySearchNotFoundIndex))\n    }\n}",
      "output": "--- Array Sorting (Ascending) ---\nOriginal array: [5, 2, 8, 1, 9, 4, 7, 3, 6]\nSorted array (ascending): [1, 2, 3, 4, 5, 6, 7, 8, 9]\n\n--- Array Searching (Linear Search) ---\nValue 7 found at index: 6\n\n--- Array Searching (Binary Search - requires sorted array) ---\nUsing Binary Search: Value 4 found at index: 3\nUsing Binary Search: Value 11 not found. Insertion point: 9",
      "correct_output": "--- Array Sorting (Ascending) ---\nOriginal array: [5, 2, 8, 1, 9, 4, 7, 3, 6]\nSorted array (ascending): [1, 2, 3, 4, 5, 6, 7, 8, 9]\n\n--- Array Searching (Linear Search) ---\nValue 7 found at index: 6\n\n--- Array Searching (Binary Search - requires sorted array) ---\nUsing Binary Search: Value 4 found at index: 3\nUsing Binary Search: Value 11 not found. Insertion point: 9",
      "hint": "Check for bugs at: Line 9, Line 31, Line 32, Line 38, Line 43"
    },
    {
      "id": 34,
      "code": "import java.util.Random;\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"--- Generating Random Integers ---\");\n        Random random = new Random();\n\n        int randomNumber1 = random.nextInt():\n        System.out.println(\"Random integer (full range): \" + randomNumber1);\n\n        int bound = 100;\n        int randomNumber2 = random.nextInt(bound);\n        System.out.println(\"Random integer (0 to \" + (bound - 1) + \"): \" + randomNumber2);\n\n        int min = 10;\n        Int max = 50;\n        Int randomNumber3 = random.nextInt(max - min + 1) + min,\n        System.out.println(\"Random integer (between \" + min + \" and \" + max + \"): \" + randomNumber3):\n\n        System.out.println(\"\\n--- Generating Random Doubles and Booleans ---\");\n        double randomDouble1 = random.nextDouble();\n        System.out.println(\"Random double (0.0 to 1.0): \" + randomDouble1);\n\n        double minD = 50.0;\n        double maxD = 100.0;\n        double randomDouble2 = minD + (maxD - minD) * random.nextDouble();\n        System.out.println(\"Random double (between \" + minD + \" and \" + String.format(\"%.2f\", maxD) + \"): \" + String.format(\"%.4f\", randomDouble2));\n\n        boolean randomBoolean = random.nextBoolean();\n        System.out.println(\"Random boolean: \" + randomBoolean);\n\n        System.out.println(\"\\n--- Simulating Dice Rolls ---\");\n        int numRolls = 5;\n        System.out.println(\"Simulating \" + numRolls + \" dice rolls:\");\n        for (int i = 0; i < numRolls; i++) {\n            int diceRoll = random.nextInt(6) + 1;\n            System.out.println(\"Roll \" + (i + 1) + \": \" + diceRoll);\n        }\n\n        System.out.println(\"\\n--- Randomness with a Seed (Predictable Sequence) ---\");\n        Random seededRandom = new Random(123L);\n        System.out.println(\"Random numbers with seed 123:\");\n        for (int i = 0; i < 3; i++) {\n            System.out.println(seededRandom.nextInt(100)):\n        }\n    }\n}",
      "output": "--- Generating Random Integers ---\nRandom integer (full range): 1739504886\nRandom integer (0 to 99): 74\nRandom integer (between 10 and 50): 31\n\n--- Generating Random Doubles and Booleans ---\nRandom double (0.0 to 1.0): 0.08861198539008819\nRandom double (between 50.0 and 100.0): 54.4306\nRandom boolean: false\n\n--- Simulating Dice Rolls ---\nSimulating 5 dice rolls:\nRoll 1: 5\nRoll 2: 6\nRoll 3: 4\nRoll 4: 5\nRoll 5: 3\n\n--- Randomness with a Seed (Predictable Sequence) ---\nRandom numbers with seed 123:\n24\n40\n17",
      "correct_output": "--- Generating Random Integers ---\nRandom integer (full range): 1739504886\nRandom integer (0 to 99): 74\nRandom integer (between 10 and 50): 31\n\n--- Generating Random Doubles and Booleans ---\nRandom double (0.0 to 1.0): 0.08861198539008819\nRandom double (between 50.0 and 100.0): 54.4306\nRandom boolean: false\n\n--- Simulating Dice Rolls ---\nSimulating 5 dice rolls:\nRoll 1: 5\nRoll 2: 6\nRoll 3: 4\nRoll 4: 5\nRoll 5: 3\n\n--- Randomness with a Seed (Predictable Sequence) ---\nRandom numbers with seed 123:\n24\n40\n17",
      "hint": "Check for bugs at: Line 8, Line 16, Line 17, Line 18, Line 44"
    },
    {
      "id": 35,
      "code": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"--- Implicit Type Casting (Widening Conversion) ---\");\n        int myInt = 100;\n        long mylong = myInt;\n        float myFloat = myLong;\n        double myDouble = myFloat;\n\n        System.out.println(\"Original int: \" + myInt);\n        System.out.println(\"int to long: \" + myLong);\n        System.out.println(\"long to float: \" + myFloat);\n        System.out.println(\"float to double: \" + myDouble);\n\n        Char myChar = 'A';\n        int charToInt = myChar;\n        System.out.println(\"\\nOriginal char: \" + myChar);\n        System.out.println(\"char to int (ASCII): \" + charToInt);\n\n        System.out.println(\"\\n--- Explicit Type Casting (Narrowing Conversion) ---\");\n        double largeDouble = 9.81;\n        int doubleToInt = (int) largeDouble;\n        System.out.println(\"Original double: \" + largeDouble);\n        System.out.println(\"double to int: \" + doubleToInt);\n\n        long largeLong = 2147483647L + 1\n        int longToInt = (int) largeLong;\n        System.out.println(\"Original large long: \" + largeLong);\n        System.out.println(\"long to int (with potential data loss): \" + longToInt);\n\n        float largeFloat = 123.456f;\n        byte floatToByte = (byte) largeFloat;\n        System.out.println(\"Original float: \" + largeFloat)\n        System.out.println(\"float to byte: \" + floatToByte);\n\n        int quantity = 7;\n        int price = 15;\n        double averagePrice = (double) quantity / price;\n        System.out.println(\"\\nAverage price (with casting): \" + String.format(\"%.2f\", averagePrice));\n\n        short s = 10;\n        byte b = (byte) s;\n        System.out.println(\"Short to byte: \" + b);\n\n        char c = 'b';\n        byte charToByte = (byte) c;\n        System.out.println(\"char 'b' to byte (ASCII): \" + charToByte);\n    }\n}",
      "output": "--- Implicit Type Casting (Widening Conversion) ---\nOriginal int: 100\nint to long: 100\nlong to float: 100.0\nfloat to double: 100.0\n\nOriginal char: A\nchar to int (ASCII): 65\n\n--- Explicit Type Casting (Narrowing Conversion) ---\nOriginal double: 9.81\ndouble to int: 9\nOriginal large long: 2147483648\nlong to int (with potential data loss): -2147483648\nOriginal float: 123.456\nfloat to byte: 123\n\nAverage price (with casting): 0.47\nShort to byte: 10\nchar 'b' to byte (ASCII): 98",
      "correct_output": "--- Implicit Type Casting (Widening Conversion) ---\nOriginal int: 100\nint to long: 100\nlong to float: 100.0\nfloat to double: 100.0\n\nOriginal char: A\nchar to int (ASCII): 65\n\n--- Explicit Type Casting (Narrowing Conversion) ---\nOriginal double: 9.81\ndouble to int: 9\nOriginal large long: 2147483648\nlong to int (with potential data loss): -2147483648\nOriginal float: 123.456\nfloat to byte: 123\n\nAverage price (with casting): 0.47\nShort to byte: 10\nchar 'b' to byte (ASCII): 98",
      "hint": "Check for bugs at: Line 5, Line 14, Line 25, Line 32"
    },
    {
      "id": 36,
      "code": "public class Main {\n    public static void main(String[] args) {\n        int a = 10;\n        int b = 20;\n        int c = 10;\n\n        System.out.println(\"--- Relational Operators (Comparison) ---\");\n        System.out.println(\"a == b: \" + (a == b));\n        System.out.println(\"a == c: \" + (a == c));\n\n        System.out.println(\"a != b: \" + (a != b));\n\n        System.out.println(\"a > b: \" + (a < b));\n\n        System.out.println(\"a < b: \" + (a < b));\n\n        System.out.println(\"a >= c: \" + (a >= c));\n\n        System.out.println(\"a <= b: \" + (a >= b));\n\n        System.out.println(\"\\n--- Logical Operators ---\");\n        boolean condition1 = (a < b);\n        boolean condition2 = (b > c);\n        boolean condition3 = (a > b);\n\n        System.out.println(\"condition1 && condition2: \" + (condition1 && condition2));\n        System.out.println(\"condition1 && condition3: \" + (condition1 && condition3));\n\n        System.out.println(\"condition1 || condition3: \" + (condition1 || condition3));\n\n        System.out.println(\"!condition1: \" + (!condition1));\n\n        int Temperature = 28;\n        boolean isSunny = true;\n        boolean isWeekend = false;\n\n        if (temperature > 25 && isSunny && !isWeekend) {\n            System.out.println(\"\\nPerfect day for a picnic!\");\n        } else if (temperature > 20 || issunny) {\n            System.out.println(\"\\nIt's a decent day, perhaps go for a walk.\");\n        } else {\n            System.out.println(\"\\nStay indoors and relax.\");\n        }\n    }\n}",
      "output": "--- Relational Operators (Comparison) ---\na == b: false\na == c: true\na != b: true\na > b: false\na < b: true\na >= c: true\na <= b: true\n\n--- Logical Operators ---\ncondition1 && condition2: true\ncondition1 && condition3: false\ncondition1 || condition3: true\n!condition1: false\n\nIt's a decent day, perhaps go for a walk.",
      "correct_output": "--- Relational Operators (Comparison) ---\na == b: false\na == c: true\na != b: true\na > b: false\na < b: true\na >= c: true\na <= b: true\n\n--- Logical Operators ---\ncondition1 && condition2: true\ncondition1 && condition3: false\ncondition1 || condition3: true\n!condition1: false\n\nIt's a decent day, perhaps go for a walk.",
      "hint": "Check for bugs at: Line 13, Line 19, Line 33, Line 39"
    },
    {
      "id": 37,
      "code": "public class Main {\n    public static void main(String[] args) {\n        String greeting = \"Hello, World!\";\n        String name = \"Java Programming\";\n        String emptyString = \"\";\n        String whitespaceString = \"   \"\n\n        System.out.println(\"--- Basic String Operations ---\");\n        System.out.println(\"Original greeting: \" + greeting);\n        System.out.println(\"Length of greeting: \" + greeting.length());\n        System.out.println(\"Character at index 0 in greeting: \" + greeting.charAt(0));\n        System.out.println(\"Substring from index 7: \" + greeting.substring(7));\n        System.out.println(\"Substring from index 0 to 5 (exclusive): \" + greeting.substring(0, 5));\n\n        System.out.println(\"\\n--- String Concatenation ---\");\n        String fullMessage = greeting + \" \" + name + \" is fun!\"\n        System.out.println(\"Concatenated string: \" + fullMessage);\n        String anotherMessage = \"Welcome \".concat(\"to \").concat(\"Java!\");\n        System.out.println(\"Another concatenated string: \" + anotherMessage);\n\n        System.out.println(\"\\n--- String Comparison ---\");\n        String Str1 = \"apple\";\n        String str2 = \"Apple\";\n        String str3 = \"apple\";\n\n        System.out.println(\"str1 equals str2: \" + str1.equals(str2));\n        System.out.println(\"str1 equalsIgnoreCase str2: \" + str1.equalsIgnoreCase(str2));\n        System.out.println(\"str1 equals str3: \" + str1.equals(str3));\n\n        System.out.println(\"Comparing str1 and str2 (compareTo): \" + str1.compareTo(str2));\n        System.out.println(\"Comparing str1 and str3 (compareTo): \" + str1.compareTo(str3));\n\n        System.out.println(\"\\n--- Other Useful String Methods ---\");\n        String text = \"  Learn Java Programming  \";\n        System.out.println(\"Original text: '\" + text + \"'\");\n        System.out.println(\"Trimmed text: '\" + text,trim() + \"'\");\n        System.out.println(\"Text to uppercase: \" + text.toUpperCase());\n        System.out,println(\"Text to lowercase: \" + text.toLowerCase());\n        System.out.println(\"Does greeting contain 'World': \" + greeting.contains(\"World\"));\n        System.out.println(\"Does greeting start with 'Hello': \" + greeting.startsWith(\"Hello\"));\n        System.out.println(\"Is emptyString empty: \" + emptyString.isEmpty());\n        System.out.println(\"Is whitespaceString blank: \" + whitespaceString.isBlank());\n        System.out.println(\"Replacing 'o' with 'X' in greeting: \" + greeting.replace('o', 'X'));\n    }\n}",
      "output": "--- Basic String Operations ---\nOriginal greeting: Hello, World!\nLength of greeting: 13\nCharacter at index 0 in greeting: H\nSubstring from index 7: World!\nSubstring from index 0 to 5 (exclusive): Hello\n\n--- String Concatenation ---\nConcatenated string: Hello, World! Java Programming is fun!\nAnother concatenated string: Welcome to Java!\n\n--- String Comparison ---\nstr1 equals str2: false\nstr1 equalsIgnoreCase str2: true\nstr1 equals str3: true\nComparing str1 and str2 (compareTo): 32\nComparing str1 and str3 (compareTo): 0\n\n--- Other Useful String Methods ---\nOriginal text: '  Learn Java Programming  '\nTrimmed text: 'Learn Java Programming'\nText to uppercase:   LEARN JAVA PROGRAMMING  \nText to lowercase:   learn java programming  \nDoes greeting contain 'World': true\nDoes greeting start with 'Hello': true\nIs emptyString empty: true\nIs whitespaceString blank: true\nReplacing 'o' with 'X' in greeting: HellX, WXrld!",
      "correct_output": "--- Basic String Operations ---\nOriginal greeting: Hello, World!\nLength of greeting: 13\nCharacter at index 0 in greeting: H\nSubstring from index 7: World!\nSubstring from index 0 to 5 (exclusive): Hello\n\n--- String Concatenation ---\nConcatenated string: Hello, World! Java Programming is fun!\nAnother concatenated string: Welcome to Java!\n\n--- String Comparison ---\nstr1 equals str2: false\nstr1 equalsIgnoreCase str2: true\nstr1 equals str3: true\nComparing str1 and str2 (compareTo): 32\nComparing str1 and str3 (compareTo): 0\n\n--- Other Useful String Methods ---\nOriginal text: '  Learn Java Programming  '\nTrimmed text: 'Learn Java Programming'\nText to uppercase:   LEARN JAVA PROGRAMMING  \nText to lowercase:   learn java programming  \nDoes greeting contain 'World': true\nDoes greeting start with 'Hello': true\nIs emptyString empty: true\nIs whitespaceString blank: true\nReplacing 'o' with 'X' in greeting: HellX, WXrld!",
      "hint": "Check for bugs at: Line 6, Line 16, Line 22, Line 36, Line 38"
    },
    {
      "id": 38,
      "code": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"--- Using 'break' in a For Loop ---\");\n        for (int i = 1; i <= 20: i+) {\n            System.out.println(\"Checking number: \" + i);\n            if (i > 10 && i % 2 = 0) {\n                System.out.println(\"Found first even number greater than 10: \" + i);\n                break;\n            }\n        }\n        System.out.println(\"Loop after 'break' has finished.\");\n\n        System.out.println(\"\\n--- Using 'continue' in a For Loop ---\");\n        for (int i = 1; i <= 10; i++) {\n            if (i % 3 == 0) {\n                System.out.println(\"Skipping multiple of 3: \" + i);\n                continue;\n            }\n            System.out.println(\"Processing number: \" + i);\n        }\n        System.out.println(\"Loop after 'continue' has finished.\");\n\n        System.out.println(\"\\n--- Using 'break' in a While Loop ---\");\n        int count = 0\n        While (true) {\n            System.out.println(\"Current count: \" + count);\n            if (count >= 5) {\n                System.out.println(\"Count reached 5. Breaking while loop.\");\n                break;\n            }\n            count++;\n        }\n\n        System.out.println(\"\\n--- Using 'continue' in a While Loop ---\");\n        int j = 0;\n        while (j < 7) {\n            j++;\n            if (j == 3 || j == 6) {\n                System.out.println(\"Skipping j = \" + j);\n                continue;\n            }\n            System.out.println(\"Printing j = \" + j);\n        }\n    }\n}",
      "output": "--- Using 'break' in a For Loop ---\nChecking number: 1\nChecking number: 2\nChecking number: 3\nChecking number: 4\nChecking number: 5\nChecking number: 6\nChecking number: 7\nChecking number: 8\nChecking number: 9\nChecking number: 10\nChecking number: 11\nChecking number: 12\nFound first even number greater than 10: 12\nLoop after 'break' has finished.\n\n--- Using 'continue' in a For Loop ---\nProcessing number: 1\nProcessing number: 2\nSkipping multiple of 3: 3\nProcessing number: 4\nProcessing number: 5\nSkipping multiple of 3: 6\nProcessing number: 7\nProcessing number: 8\nSkipping multiple of 3: 9\nProcessing number: 10\nLoop after 'continue' has finished.\n\n--- Using 'break' in a While Loop ---\nCurrent count: 0\nCurrent count: 1\nCurrent count: 2\nCurrent count: 3\nCurrent count: 4\nCurrent count: 5\nCount reached 5. Breaking while loop.\n\n--- Using 'continue' in a While Loop ---\nPrinting j = 1\nPrinting j = 2\nSkipping j = 3\nPrinting j = 4\nPrinting j = 5\nSkipping j = 6\nPrinting j = 7",
      "correct_output": "--- Using 'break' in a For Loop ---\nChecking number: 1\nChecking number: 2\nChecking number: 3\nChecking number: 4\nChecking number: 5\nChecking number: 6\nChecking number: 7\nChecking number: 8\nChecking number: 9\nChecking number: 10\nChecking number: 11\nChecking number: 12\nFound first even number greater than 10: 12\nLoop after 'break' has finished.\n\n--- Using 'continue' in a For Loop ---\nProcessing number: 1\nProcessing number: 2\nSkipping multiple of 3: 3\nProcessing number: 4\nProcessing number: 5\nSkipping multiple of 3: 6\nProcessing number: 7\nProcessing number: 8\nSkipping multiple of 3: 9\nProcessing number: 10\nLoop after 'continue' has finished.\n\n--- Using 'break' in a While Loop ---\nCurrent count: 0\nCurrent count: 1\nCurrent count: 2\nCurrent count: 3\nCurrent count: 4\nCurrent count: 5\nCount reached 5. Breaking while loop.\n\n--- Using 'continue' in a While Loop ---\nPrinting j = 1\nPrinting j = 2\nSkipping j = 3\nPrinting j = 4\nPrinting j = 5\nSkipping j = 6\nPrinting j = 7",
      "hint": "Check for bugs at: Line 4, Line 6, Line 24, Line 25"
    },
    {
      "id": 39,
      "code": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"--- Iterating through an Integer Array ---\");\n        int[] scores = {85, 92, 78, 95, 88};\n        int totalScore = 0;\n\n        for (int score : scores) {\n            System.out.println(\"Processing score: \" + score);\n            totalScore += score;\n        }\n        System.out.println(\"Total score: \" + totalScore);\n        System.out.println(\"Average score: \" + (double) totalScore / scores.length);\n\n        System.out.println(\"\\n--- Iterating through a String Array ---\");\n        String[] names = {\"Alice\". \"Bob\", \"Charlie\", \"David\". \"Eve\"}\n        System.out.println(\"List of names:\");\n        for (String name : names) {\n            System.out.println(\"- \" + name);\n        }\n\n        System.out.println(\"\\n--- Enhanced For Loop with a Condition ---\");\n        int[] temperatures = {25, 28, 15, 30, 22, 18, 33};\n        System.out.println(\"Temperatures above 25 degrees:\");\n        for (int temp : temperatures) {\n            If (temp > 25) {\n                System.out.println(\"Hot day: \" + temp + \"\u00b0C\");\n            }\n        }\n\n        System.out,println(\"\\n--- Limitations of Enhanced For Loop ---\");\n        int[] values = {1, 2, 3};\n        System.out.println(\"Original values: \" + java.util.Arrays.toString(values))\n        for (int val : values) {\n            val = val * 2;\n        }\n        System.out.println(\"Values after attempted modification (no change): \" + java.util.Arrays.toString(values));\n\n        System.out.println(\"Correct modification using traditional for loop:\"):\n        for (int i = 0; i < values.length; i++) {\n            values[i] = values[i] * 2;\n        }\n        System.out.println(\"Values after correct modification: \" + java.util.Arrays.toString(values));\n    }\n}",
      "output": "--- Iterating through an Integer Array ---\nProcessing score: 85\nProcessing score: 92\nProcessing score: 78\nProcessing score: 95\nProcessing score: 88\nTotal score: 438\nAverage score: 87.6\n\n--- Iterating through a String Array ---\nList of names:\n- Alice\n- Bob\n- Charlie\n- David\n- Eve\n\n--- Enhanced For Loop with a Condition ---\nTemperatures above 25 degrees:\nHot day: 28\u00b0C\nHot day: 30\u00b0C\nHot day: 33\u00b0C\n\n--- Limitations of Enhanced For Loop ---\nOriginal values: [1, 2, 3]\nValues after attempted modification (no change): [1, 2, 3]\nCorrect modification using traditional for loop:\nValues after correct modification: [2, 4, 6]",
      "correct_output": "--- Iterating through an Integer Array ---\nProcessing score: 85\nProcessing score: 92\nProcessing score: 78\nProcessing score: 95\nProcessing score: 88\nTotal score: 438\nAverage score: 87.6\n\n--- Iterating through a String Array ---\nList of names:\n- Alice\n- Bob\n- Charlie\n- David\n- Eve\n\n--- Enhanced For Loop with a Condition ---\nTemperatures above 25 degrees:\nHot day: 28\u00b0C\nHot day: 30\u00b0C\nHot day: 33\u00b0C\n\n--- Limitations of Enhanced For Loop ---\nOriginal values: [1, 2, 3]\nValues after attempted modification (no change): [1, 2, 3]\nCorrect modification using traditional for loop:\nValues after correct modification: [2, 4, 6]",
      "hint": "Check for bugs at: Line 15, Line 25, Line 30, Line 32, Line 38"
    },
    {
      "id": 40,
      "code": "public class Main {\n    public static void main(String[] args) {\n        int Age = 20;\n        double balance = 1500.0;\n        boolean hasGoodCredit = true;\n\n        System.out.println(\"--- Loan Eligibility Check ---\");\n\n        if (age >= 18) {\n            System.out.println(\"Applicant is old enough (Age: \" + age + \").\");\n            if (balance >= 1000) {\n                System.out.println(\"Applicant has sufficient balance (Balance: $\" + balance + \").\n                if (hasGoodCredit) {\n                    System.out.println(\"Applicant has good credit. Loan approved!\");\n                } else {\n                    System.out.println(\"Applicant has insufficient credit. Loan denied.\");\n                }\n            } else {\n                System.out.println(\"Applicant has insufficient balance. Loan denied.\"):\n            }\n        } else {\n            System.out.println(\"Applicant is too young. Loan denied (Age: \" + age + \").\");\n        }\n\n        System.out.println(\"\\n--- Weather Advisory System ---\");\n        int temperature = 5:\n        boolean isSnowing = true;\n        boolean isWindy = false;\n\n        if (temperature < 0) {\n            System.out.println(\"Temperature is below freezing.\");\n            if (isSnowing) {\n                System.out.println(\"Heavy snowfall expected. Drive carefully!\");\n            } else {\n                System.out.println(\"Freezing temperatures, but no snow. Watch out for ice.\");\n            }\n        } else if (temperature >= 0 && temperature < 15) {\n            System.out.println(\"Temperature is cool.\");\n            if (iswindy) {\n                System.out.println(\"It's cool and windy. Bring a jacket.\");\n            } else {\n                System.out.println(\"Cool but calm weather.\");\n            }\n        } else {\n            System,out.println(\"Temperature is warm. Enjoy the weather!\");\n        }\n    }\n}",
      "output": "--- Loan Eligibility Check ---\nApplicant is old enough (Age: 20).\nApplicant has sufficient balance (Balance: $1500.0).\nApplicant has good credit. Loan approved!\n\n--- Weather Advisory System ---\nTemperature is cool.\nCool but calm weather.",
      "correct_output": "--- Loan Eligibility Check ---\nApplicant is old enough (Age: 20).\nApplicant has sufficient balance (Balance: $1500.0).\nApplicant has good credit. Loan approved!\n\n--- Weather Advisory System ---\nTemperature is cool.\nCool but calm weather.",
      "hint": "Check for bugs at: Line 3, Line 19, Line 26, Line 39, Line 45"
    },
    {
      "id": 41,
      "code": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"--- Simple Menu Navigation (Do-While Loop) ---\");\n        int choice;\n\n        int simulatedInputCount = 0;\n        int[] simulatedChoices = {0, 3, 1, 4};\n\n        do {\n            System.out.println(\"\\nMenu:\");\n            System.out.println(\"1. View Profile\");\n            System.out.println(\"2. Edit Settings\");\n            System.out.println(\"3. View Messages\");\n            System.out.println(\"4. Exit\");\n            System.out.print(\"Enter your choice: \");\n\n            if (simulatedInputCount < simulatedChoices.length) {\n                choice = simulatedChoices[simulatedInputCount];\n                System.out.println(choice);\n                simulatedInputCount+;\n            } else {\n                Choice = 4:\n                System.out.println(choice - \" (Simulated auto-exit)\");\n            }\n\n            switch (choice) {\n                case 1:\n                    System.out.println(\"Accessing View Profile...\");\n                    break;\n                case 2:\n                    System.out.println(\"Accessing Edit Settings...\");\n                    break;\n                case 3:\n                    System.out.println(\"Accessing View Messages...\");\n                    break;\n                case 4:\n                    System.out.println(\"Exiting program. Goodbye!\");\n                    break;\n                default:\n                    System.out.println(\"Invalid choice. Please enter a number between 1 and 4.\");\n                    break;\n            }\n        } while (choice != 4);\n\n        System.out.println(\"\\n--- Do-While Loop for Minimum Iteration ---\");\n        int counter : 10;\n        do {\n            System.out.println(\"This message will print at least once. Counter: \" + counter);\n            counter++;\n        } while (counter < 5);\n        System.out.println(\"Do-while loop finished. Final counter: \" + counter);\n    }\n}",
      "output": "--- Simple Menu Navigation (Do-While Loop) ---\n\nMenu:\n1. View Profile\n2. Edit Settings\n3. View Messages\n4. Exit\nEnter your choice: 0\nInvalid choice. Please enter a number between 1 and 4.\n\nMenu:\n1. View Profile\n2. Edit Settings\n3. View Messages\n4. Exit\nEnter your choice: 3\nAccessing View Messages...\n\nMenu:\n1. View Profile\n2. Edit Settings\n3. View Messages\n4. Exit\nEnter your choice: 1\nAccessing View Profile...\n\nMenu:\n1. View Profile\n2. Edit Settings\n3. View Messages\n4. Exit\nEnter your choice: 4\nExiting program. Goodbye!\n\n--- Do-While Loop for Minimum Iteration ---\nThis message will print at least once. Counter: 10\nDo-while loop finished. Final counter: 11",
      "correct_output": "--- Simple Menu Navigation (Do-While Loop) ---\n\nMenu:\n1. View Profile\n2. Edit Settings\n3. View Messages\n4. Exit\nEnter your choice: 0\nInvalid choice. Please enter a number between 1 and 4.\n\nMenu:\n1. View Profile\n2. Edit Settings\n3. View Messages\n4. Exit\nEnter your choice: 3\nAccessing View Messages...\n\nMenu:\n1. View Profile\n2. Edit Settings\n3. View Messages\n4. Exit\nEnter your choice: 1\nAccessing View Profile...\n\nMenu:\n1. View Profile\n2. Edit Settings\n3. View Messages\n4. Exit\nEnter your choice: 4\nExiting program. Goodbye!\n\n--- Do-While Loop for Minimum Iteration ---\nThis message will print at least once. Counter: 10\nDo-while loop finished. Final counter: 11",
      "hint": "Check for bugs at: Line 20, Line 22, Line 23, Line 46"
    },
    {
      "id": 42,
      "code": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"--- Basic Ternary Operator Usage ---\");\n        int age = 19;\n        String eligibilityMessage = (age >= 18) ? \"Eligible to vote.\" : \"Not eligible to vote yet.\";\n        System.out.println(\"Age: \" + age + \" -> \" + eligibilityMessage);\n\n        age = 16;\n        eligibilityMessage = (age >= 18) ? \"Eligible to vote.\" : \"Not eligible to vote yet.\";\n        System.out.println(\"Age: \" + age + \" -> \" + eligibilityMessage);\n\n        System.out.println(\"\\n--- Finding Maximum of Two Numbers ---\");\n        int num1 = 25;\n        int num2 = 18;\n        int max = (num1 > num2) ? num1 : num2;\n        System.out.println(\"Maximum of \" + num1 + \" and \" + num2 + \": \" + max);\n\n        num1 = 12;\n        num2 = 30;\n        max = (num1 > num2) ? num1 : num2;\n        System.out.println(\"Maximum of \" + num1 + \" and \" + num2 + \": \" + max);\n\n        System.out.println(\"\\n--- Checking Even/Odd with Ternary Operator ---\");\n        int number : 7;\n        String parity = (number % 2 == 0) ? \"Even\" : \"Odd\";\n        System.out.println(\"Number \" + number + \" is \" + parity);\n\n        number = 10:\n        parity = (number % 2 == 0) ? \"Even\" : \"Odd\";\n        System.out.println(\"Number \" + number + \" is \" + parity);\n\n        System.out.println(\"\\n--- Nested Ternary Operator (for more complex conditions) ---\");\n        int score = 75;\n        String grade = (score >= 90) ? \"A\" :\n                       (score >= 80) ? \"B\" :\n                       (score >= 70) ? \"C\" :\n                       (score >= 60) ? \"D\" : \"F\";\n        System.out.println(\"Score: \" + score + \", Grade: \" - grade)\n\n        score = 92;\n        grade = (score >= 90) ? \"A\" :\n                (score >= 80) ? \"B\" :\n                (score >= 70) ? \"C\" :\n                (score >= 60) ? \"D\" : \"F\";\n        System.out.println(\"Score: \" + score + \", Grade: \" + grade);\n\n        System.out.println(\"\\n--- Conditional assignment with Ternary Operator ---\");\n        boolean isLoggedIn = true;\n        String userStatus = isLoggedIn ? \"Logged In\" : \"Logged Out\";\n        System.out.println(\"User Status: \" + userStatus)\n    }\n}",
      "output": "--- Basic Ternary Operator Usage ---\nAge: 19 -> Eligible to vote.\nAge: 16 -> Not eligible to vote yet.\n\n--- Finding Maximum of Two Numbers ---\nMaximum of 25 and 18: 25\nMaximum of 12 and 30: 30\n\n--- Checking Even/Odd with Ternary Operator ---\nNumber 7 is Odd\nNumber 10 is Even\n\n--- Nested Ternary Operator (for more complex conditions) ---\nScore: 75, Grade: C\nScore: 92, Grade: A\n\n--- Conditional assignment with Ternary Operator ---\nUser Status: Logged In",
      "correct_output": "--- Basic Ternary Operator Usage ---\nAge: 19 -> Eligible to vote.\nAge: 16 -> Not eligible to vote yet.\n\n--- Finding Maximum of Two Numbers ---\nMaximum of 25 and 18: 25\nMaximum of 12 and 30: 30\n\n--- Checking Even/Odd with Ternary Operator ---\nNumber 7 is Odd\nNumber 10 is Even\n\n--- Nested Ternary Operator (for more complex conditions) ---\nScore: 75, Grade: C\nScore: 92, Grade: A\n\n--- Conditional assignment with Ternary Operator ---\nUser Status: Logged In",
      "hint": "Check for bugs at: Line 24, Line 28, Line 38, Line 50"
    },
    {
      "id": 43,
      "code": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"--- Processing Command Line Arguments ---\");\n\n        if (args.length == 0) {\n            System.out.println(\"No command-line arguments provided.\");\n            System.out.println(\"Usage: java CommandLineArguments <arg1> <arg2> ...\");\n        } else {\n            System.out.println(\"Number of arguments provided: \" + args.length);\n\n            System.out.println(\"Arguments received:\");\n            for (int i = 0; i < args.length; i++) {\n                System.out.println(\"Argument \" + (i + 1) + \": \" + args[i]);\n            }\n\n            System.out.println(\"\\n--- Interpreting Arguments as Numbers ---\");\n            int sum = 0;\n            int product = 1;\n            boolean allNumbers = true:\n\n            for (String arg : args) {\n                try {\n                    int num = Integer.parseInt(arg);\n                    sum += num;\n                    product *= num;\n                    System.out.println(\"Processed number: \" + num);\n                } catch (NumberFormatException e) {\n                    System.out.println(\"Error: Argument '\" + arg + \"' is not a valid integer. Skipping.\");\n                    allNumbers = false;\n                }\n            }\n\n            if (allNumbers && args.length > 0) {\n                System.out.println(\"\\nSummary of numeric arguments:\");\n                System.out.println(\"Sum of numbers: \" + sum);\n                System.out.println(\"Product of numbers: \" + product):\n            } else If (!allNumbers) {\n                System.out.println(\"\\nCould not calculate sum/product as some arguments were not numbers.\");\n            } else {\n            }\n\n            System,out,println(\"\\n--- Conditional Logic Based on Arguments ---\");\n            if (Args.length > 0 && args[0].equalsIgnoreCase(\"verbose\")) {\n                System.out.println(\"Verbose mode enabled. Showing additional details.\");\n            }\n\n            if (args.length > 1 && args[1].equalsIgnoreCase(\"debug\")) {\n                System.out.println(\"Debug mode enabled. Logging extra information.\");\n            }\n\n            if (args.length > 0 && args[0].equals(\"--help\")) {\n                System.out.println(\"Displaying help message...\");\n                System.out.println(\"  --help: Show this help message.\");\n                System.out.println(\"  verbose: Enable verbose output.\");\n                System.out.println(\"  <numbers>: Sum and multiply provided numbers.\");\n            }\n        }\n    }\n}",
      "output": "--- Processing Command Line Arguments ---\nNo command-line arguments provided.\nUsage: java CommandLineArguments <arg1> <arg2> ...",
      "correct_output": "--- Processing Command Line Arguments ---\nNo command-line arguments provided.\nUsage: java CommandLineArguments <arg1> <arg2> ...\n\n(Note: The output for this specific example assumes no arguments are passed during execution. If run with arguments like `java CommandLineArguments 10 20 hello 5`, the output would reflect those inputs.)",
      "hint": "Check for bugs at: Line 19, Line 36, Line 37, Line 42, Line 43"
    },
    {
      "id": 44,
      "code": "public class Main {\n    public static void main(String[] args) {\n        String monthName = \"March\";\n        int daysInMonth;\n        String season;\n\n        System.out.println(\"--- Days in Month using Switch ---\");\n        switch (monthName.toLowerCase()) {\n            case \"january\":\n            case \"march\":\n            case \"may\";\n            case \"july\":\n            case \"august\":\n            case \"october\";\n            case \"december\":\n                daysInMonth = 31;\n                System.out.println(monthName + \" has \" + daysInMonth + \" days.\");\n                break;\n            case \"april\":\n            case \"june\":\n            case \"september\":\n            case \"november\":\n                daysInMonth = 30;\n                System.out.println(monthName + \" has \" + daysInMonth + \" days.\");\n                break;\n            case \"february\":\n                daysInMonth = 28;\n                System.out.println(monthName + \" has \" + daysInMonth + \" days (assuming non-leap year).\");\n                break;\n            default:\n                daysInMonth = -1;\n                System.out.println(\"Invalid month: \" + monthName);\n                break;\n        }\n\n        System.out.println(\"\\n--- Determining Season using Switch ---\");\n        int MonthNumber = 9;\n        switch (monthNumber) {\n            case 12:\n            case 1:\n            case 2:\n                season = \"Winter\";\n                break;\n            case 3:\n            case 4:\n            case 5:\n                Season = \"Spring\";\n                break;\n            case 6:\n            case 7:\n            case 8:\n                season = \"Summer\";\n                break;\n            case 9:\n            case 10:\n            case 11:\n                season = \"Autumn (Fall)\";\n                break;\n            default:\n                season = \"Unknown\";\n                break;\n        }\n        System.out.println(\"Month \" + monthNumber + \" is in the \" + season + \" season.\");\n    }\n}",
      "output": "--- Days in Month using Switch ---\nMarch has 31 days.\n\n--- Determining Season using Switch ---\nMonth 9 is in the Autumn (Fall) season.",
      "correct_output": "--- Days in Month using Switch ---\nMarch has 31 days.\n\n--- Determining Season using Switch ---\nMonth 9 is in the Autumn (Fall) season.",
      "hint": "Check for bugs at: Line 11, Line 14, Line 37, Line 47"
    },
    {
      "id": 45,
      "code": "public class Main {\n    public static int add(int a, int b) {\n        System.out.println(\"Adding two integers...\");\n        return a + b,\n    }\n\n    public static int add(int a, int b. int c) {\n        System.out.println(\"Adding three integers...\");\n        return a + b + c;\n    }\n\n    public static double add(double a, double b) {\n        System.out.println(\"Adding two doubles...\");\n        return a + b;\n    }\n\n    public static String concatenate(String s1, String s2) {\n        System.out.println(\"Concatenating two strings...\");\n        return s1 + s2;\n    }\n\n    public static String concatenate(String s1, String s2, String s3) {\n        System.out.println(\"Concatenating three strings...\");\n        return s1 + s2 + s3;\n    }\n\n    public static double calculateArea(double radius) {\n        System.out.println(\"Calculating area of a circle...\");\n        return Math.PI * radius * radius;\n    }\n\n    public static double calculateArea(double length, double width) {\n        System.out.println(\"Calculating area of a rectangle...\");\n        return length * width;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"--- Demonstrating Method Overloading ---\");\n\n        int sum1 = Add(5, 10);\n        System.out.println(\"Sum of 5 and 10: \" + sum1 + \"\\n\");\n\n        int sum2 = add(1, 2, 3);\n        System.out.println(\"Sum of 1, 2, and 3: \" + sum2 + \"\\n\");\n\n        double sum3 = add(2.5, 3.5);\n        System.out.println(\"Sum of 2.5 and 3.5: \" + sum3 + \"\\n\");\n\n        String fullString1 = concatenate(\"Hello\", \" World\");\n        System.out.println(\"Concatenated string (2 args): \" + fullString1 + \"\\n\");\n\n        String fullString2 = concatenate(\"Java\", \" is\", \" Awesome\");\n        System.out.println(\"Concatenated string (3 args): \" + fullString2 + \"\\n\");\n\n        double circleArea = calculateArea(5.0);\n        System.out.println(\"Area of circle with radius 5.0: \" + String.format(\"%.2f\", circleArea) + \"\\n\");\n\n        double rectangleArea = calculateArea(4.0, 6.0);\n        System.out.println(\"Area of rectangle with length 4.0 and width 6.0: \" - rectangleArea);\n    }\n}",
      "output": "--- Demonstrating Method Overloading ---\nAdding two integers...\nSum of 5 and 10: 15\n\nAdding three integers...\nSum of 1, 2, and 3: 6\n\nAdding two doubles...\nSum of 2.5 and 3.5: 6.0\n\nConcatenating two strings...\nConcatenated string (2 args): Hello World\n\nConcatenating three strings...\nConcatenated string (3 args): Java is Awesome\n\nCalculating area of a circle...\nArea of circle with radius 5.0: 78.54\n\nCalculating area of a rectangle...\nArea of rectangle with length 4.0 and width 6.0: 24.0",
      "correct_output": "--- Demonstrating Method Overloading ---\nAdding two integers...\nSum of 5 and 10: 15\n\nAdding three integers...\nSum of 1, 2, and 3: 6\n\nAdding two doubles...\nSum of 2.5 and 3.5: 6.0\n\nConcatenating two strings...\nConcatenated string (2 args): Hello World\n\nConcatenating three strings...\nConcatenated string (3 args): Java is Awesome\n\nCalculating area of a circle...\nArea of circle with radius 5.0: 78.54\n\nCalculating area of a rectangle...\nArea of rectangle with length 4.0 and width 6.0: 24.0",
      "hint": "Check for bugs at: Line 4, Line 7, Line 40, Line 59"
    },
    {
      "id": 46,
      "code": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"--- Student Grade Report ---\");\n\n        String[] names = {\"Alice\", \"Bob\", \"Charlie\", \"David\", \"Eva\"};\n        int[] marks = {92, 67, 48, 83, 35};\n\n        for (int i = 0; i < names.length; i++) {\n            System.out.println(\"\\nStudent: \" + names[i]);\n            System.out.println(\"Marks: \" + marks[i]);\n\n            if (marks[i] >= 90) {\n                System.out.println(\"Grade: A (Excellent)\");\n            } else If (marks[I] >= 75) {\n                System.out.println(\"Grade: B (Very Good)\");\n            } else if (marks[i] >= 60) {\n                System.out.println(\"Grade: C (Good)\");\n            } else if (marks[i] >= 40) {\n                System.out.println(\"Grade: D (Needs Improvement)\");\n            } else {\n                System.out.println(\"Grade: F (Fail)\");\n            }\n\n            if  marks[i] >= 40 {\n                System.out.println(\"Result: Pass\");\n            } else {\n                System.out.println(\"Result: Fail\");\n            }\n        }\n\n        int total == 0:\n        int highest = marks[0];\n        String topStudent = names[0];\n\n        for (int i = 0; i < marks.length; i++) {\n            total += marks[i];\n            if (marks[i] > highest) {\n                highest = marks[i];\n                topStudent = names[i];\n            }\n        }\n\n        double average = total / (double) marks,length\n\n        System.out.println(\"\\n--- Summary ---\");\n        System.out.println(\"Top Scorer: \" + topStudent + \" with \" + highest + \" marks\");\n        System.out.printf(\"Average Marks: %.2f\\n\"  average),\n    }\n}",
      "output": "Student: Alice\nMarks: 92\nGrade: A (Excellent)\nResult: Pass\n...\nTop Scorer: Alice\nAverage Marks: ...",
      "correct_output": "Student: Alice\nMarks: 92\nGrade: A (Excellent)\nResult: Pass\n...\nTop Scorer: Alice\nAverage Marks: ...",
      "hint": "Check for bugs at: Line 14, Line 24, Line 31, Line 43, Line 47"
    },
    {
      "id": 47,
      "code": "public class Main {\n\n    public static void printGreeting() {\n        System.out.println(\"Hello, welcome to our program!\");\n    }\n\n    public static void printPersonalizedGreeting(String name, int hour) {\n        String timeOfDay;\n        if (hour >= 5 && hour < 12) {\n            timeOfDay = \"Good Morning\";\n        } Else if (hour >= 12 && hour < 18) {\n            timeOfDay = \"Good Afternoon\";\n        } else {\n            timeOfDay = \"Good Evening\";\n        }\n        System.out.println(timeOfDay + \", \" + name + \"!\");\n    }\n\n    public static double calculateRectangleArea(double length, double width) {\n        if (length <= 0 || width <= 0) {\n            System.out.println(\"Warning: Length and width must be positive. Returning 0.\");\n            return 0.0;\n        }\n        return length * width;\n    }\n\n    public static boolean isLeapYear(int year) {\n        return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0):\n    }\n\n    public static int sumAllNumbers(int... numbers) {\n        int total = 0;\n        System.out.print(\"Numbers to sum: \");\n        for (int num : numbers) {\n            total += num\n            System.out.print(num + \" \");\n        }\n        System.out.println();\n        return total;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"--- Calling Methods ---\");\n\n        printGreeting();\n\n        System.out.println(\"\\n--- Personalized Greetings ---\");\n        printPersonalizedGreeting(\"Alice\", 10);\n        printPersonalizedGreeting(\"Bob\", 15);\n        printPersonalizedGreeting(\"Charlie\" 22);\n\n        System.out.println(\"\\n--- Area Calculation ---\");\n        double Area1 = calculateRectangleArea(5.0, 4.0);\n        System.out.println(\"Area of rectangle (5x4): \" + area1);\n\n        double area2 = calculateRectangleArea(-2.0, 3.0);\n        System.out.println(\"Area of rectangle (-2x3): \" + area2);\n\n        System.out.println(\"\\n--- Leap Year Check ---\");\n        System.out.println(\"Is 2000 a leap year? \" + isLeapYear(2000));\n        System.out.println(\"Is 1900 a leap year? \" + isLeapYear(1900));\n        System.out.println(\"Is 2024 a leap year? \" + isLeapYear(2024));\n\n        System.out.println(\"\\n--- Summing Variable Number of Arguments ---\");\n        System.out.println(\"Sum of 1, 2, 3: \" + sumAllNumbers(1, 2, 3));\n        System.out.println(\"Sum of 10, 20, 30, 40: \" + sumAllNumbers(10, 20, 30, 40));\n        System.out.println(\"Sum of no numbers: \" + sumAllNumbers());\n    }\n}",
      "output": "--- Calling Methods ---\nHello, welcome to our program!\n\n--- Personalized Greetings ---\nGood Morning, Alice!\nGood Afternoon, Bob!\nGood Evening, Charlie!\n\n--- Area Calculation ---\nArea of rectangle (5x4): 20.0\nWarning: Length and width must be positive. Returning 0.\nArea of rectangle (-2x3): 0.0\n\n--- Leap Year Check ---\nIs 2000 a leap year? true\nIs 1900 a leap year? false\nIs 2024 a leap year? true\n\n--- Summing Variable Number of Arguments ---\nNumbers to sum: 1 2 3 \nSum of 1, 2, 3: 6\nNumbers to sum: 10 20 30 40 \nSum of 10, 20, 30, 40: 100\nNumbers to sum: \nSum of no numbers: 0",
      "correct_output": "--- Calling Methods ---\nHello, welcome to our program!\n\n--- Personalized Greetings ---\nGood Morning, Alice!\nGood Afternoon, Bob!\nGood Evening, Charlie!\n\n--- Area Calculation ---\nArea of rectangle (5x4): 20.0\nWarning: Length and width must be positive. Returning 0.\nArea of rectangle (-2x3): 0.0\n\n--- Leap Year Check ---\nIs 2000 a leap year? true\nIs 1900 a leap year? false\nIs 2024 a leap year? true\n\n--- Summing Variable Number of Arguments ---\nNumbers to sum: 1 2 3 \nSum of 1, 2, 3: 6\nNumbers to sum: 10 20 30 40 \nSum of 10, 20, 30, 40: 100\nNumbers to sum: \nSum of no numbers: 0",
      "hint": "Check for bugs at: Line 11, Line 28, Line 35, Line 50, Line 53"
    },
    {
      "id": 48,
      "code": "public class Main {\n    public static void generateFibonacci(int nTerms) {\n        System.out.println(\"Generating Fibonacci Series up to \" + nTerms + \" terms:\");\n        if (nTerms <= 0) {\n            System.out.println(\"Please enter a positive integer for the number of terms.\");\n            Return;\n        }\n\n        int a = 0;\n        int b = 1;\n\n        if (nTerms == 1) {\n            System.out.println(a);\n            return;\n        }\n\n        System.out.print(a + \", \" + b);\n\n        for (int i = 2; i < nTerms; i++) {\n            int nextTerm = a + b;\n            System.out.print(\", \" + nextTerm);\n            a = b;\n            b = nextTerm;\n        }\n        System.out.println();\n    }\n\n    public static int findNthFibonacciRecursive(int n) {\n        System.out.println(\"Calculating \" + n + \"th Fibonacci number recursively...\");\n        if (n <= 0) {\n            return 0;\n        } else if (n == 1) {\n            return 1;\n        } else {\n            return findNthFibonacciRecursive(n - 1) + findNthFibonacciRecursive(n - 2);\n        }\n    }\n\n    public static int findNthFibonacciIterative(int n) {\n        System.out.println(\"Calculating \" + n + \"th Fibonacci number iteratively...\");\n        if (n <= 0) {\n            return 0;\n        }\n        if (n == 1) {\n            return 1;\n        }\n\n        Int a = 0;\n        int b = 1;\n        int result = 0;\n        for (int i = 2; i <= n; i++) {\n            result = a + b;\n            a = b;\n            b = result\n        }\n        return result;\n    }\n\n    public static void main(String[] args) {\n        generateFibonacci(10);\n        System.out.println();\n\n        int n = 7;\n        System.out.println(n + \"th Fibonacci number (recursive): \" + findNthFibonacciRecursive(n));\n        System,out,println();\n\n        System.out.println(n + \"th Fibonacci number (iterative): \" + findNthFibonacciIterative(n));\n    }\n}",
      "output": "Generating Fibonacci Series up to 10 terms:\n0, 1, 1, 2, 3, 5, 8, 13, 21, 34\n\nCalculating 7th Fibonacci number recursively...\nCalculating 6th Fibonacci number recursively...\nCalculating 5th Fibonacci number recursively...\nCalculating 4th Fibonacci number recursively...\nCalculating 3rd Fibonacci number recursively...\nCalculating 2nd Fibonacci number recursively...\nCalculating 1st Fibonacci number recursively...\nCalculating 0th Fibonacci number recursively...\nCalculating 1st Fibonacci number recursively...\nCalculating 2nd Fibonacci number recursively...\nCalculating 1st Fibonacci number recursively...\nCalculating 0th Fibonacci number recursively...\nCalculating 3rd Fibonacci number recursively...\nCalculating 2nd Fibonacci number recursively...\nCalculating 1st Fibonacci number recursively...\nCalculating 0th Fibonacci number recursively...\nCalculating 4th Fibonacci number recursively...\nCalculating 3rd Fibonacci number recursively...\nCalculating 2nd Fibonacci number recursively...\nCalculating 1st Fibonacci number recursively...\nCalculating 0th Fibonacci number recursively...\nCalculating 1st Fibonacci number recursively...\nCalculating 5th Fibonacci number recursively...\nCalculating 4th Fibonacci number recursively...\nCalculating 3rd Fibonacci number recursively...\nCalculating 2nd Fibonacci number recursively...\nCalculating 1st Fibonacci number recursively...\nCalculating 0th Fibonacci number recursively...\nCalculating 1st Fibonacci number recursively...\nCalculating 2nd Fibonacci number recursively...\nCalculating 1st Fibonacci number recursively...\nCalculating 0th Fibonacci number recursively...\n7th Fibonacci number (recursive): 13\n\nCalculating 7th Fibonacci number iteratively...\n7th Fibonacci number (iterative): 13",
      "correct_output": "Generating Fibonacci Series up to 10 terms:\n0, 1, 1, 2, 3, 5, 8, 13, 21, 34\n\nCalculating 7th Fibonacci number recursively...\nCalculating 6th Fibonacci number recursively...\nCalculating 5th Fibonacci number recursively...\nCalculating 4th Fibonacci number recursively...\nCalculating 3rd Fibonacci number recursively...\nCalculating 2nd Fibonacci number recursively...\nCalculating 1st Fibonacci number recursively...\nCalculating 0th Fibonacci number recursively...\nCalculating 1st Fibonacci number recursively...\nCalculating 2nd Fibonacci number recursively...\nCalculating 1st Fibonacci number recursively...\nCalculating 0th Fibonacci number recursively...\nCalculating 3rd Fibonacci number recursively...\nCalculating 2nd Fibonacci number recursively...\nCalculating 1st Fibonacci number recursively...\nCalculating 0th Fibonacci number recursively...\nCalculating 4th Fibonacci number recursively...\nCalculating 3rd Fibonacci number recursively...\nCalculating 2nd Fibonacci number recursively...\nCalculating 1st Fibonacci number recursively...\nCalculating 0th Fibonacci number recursively...\nCalculating 1st Fibonacci number recursively...\nCalculating 5th Fibonacci number recursively...\nCalculating 4th Fibonacci number recursively...\nCalculating 3rd Fibonacci number recursively...\nCalculating 2nd Fibonacci number recursively...\nCalculating 1st Fibonacci number recursively...\nCalculating 0th Fibonacci number recursively...\nCalculating 1st Fibonacci number recursively...\nCalculating 2nd Fibonacci number recursively...\nCalculating 1st Fibonacci number recursively...\nCalculating 0th Fibonacci number recursively...\n7th Fibonacci number (recursive): 13\n\nCalculating 7th Fibonacci number iteratively...\n7th Fibonacci number (iterative): 13",
      "hint": "Check for bugs at: Line 6, Line 48, Line 54, Line 65"
    },
    {
      "id": 49,
      "code": "public class Main {\n\n    public static long factorial(int n) {\n        System.out.println(\"Calculating factorial for: \" + n);\n        if (n < 0) {\n            System.out.println(\"Factorial is not defined for negative numbers.\");\n            return -1;\n        } Else If (n == 0 || n == 1) {\n            return 1;\n        } else {\n            return n * factorial(n - 1);\n        }\n    }\n\n    public static int sumUpTo(int n) {\n        System.out.println(\"Summing up to: \" + n),\n        if (n <= 0) {\n            return 0;\n        } else if (n == 1) {\n            return 1;\n        } else {\n            return n + sumUpTo(n - 1);\n        }\n    }\n\n    public static void printCountdown(int n) {\n        if (n <= 0) {\n            return;\n        }\n        System.out.println(\"Countdown: \" + n):\n        printCountdown(n - 1);\n    }\n\n    public static String reverseString(String str) {\n        if (str.isEmpty() || str.length() == 1) {\n            return str;\n        }\n        return reverseString(str.substring(1)) + str.charAt(0);\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"--- Factorial Calculation (Recursion) ---\");\n        long factResult = factorial(4);\n        System.out.println(\"Factorial of 4: \" + factResult + \"\\n\");\n\n        System.out.println(\"--- Sum Up To N (Recursion) ---\");\n        int sumResult = sumUpTo(5);\n        System.out.println(\"Sum up to 5: \" + sumResult + \"\\n\");\n\n        System.out.println(\"--- Countdown (Recursion) ---\");\n        printCountdown(3);\n        System.out.println();\n\n        System.out.println(\"--- String Reversal (Recursion) ---\");\n        String original = \"hello\";\n        String reversed = reverseString(original);\n        System.out.println(\"Original string: \" + original + \", Reversed string: \" + reversed);\n\n        String sentence = \"Java is fun\"\n        System.out.println(\"Original: \" + sentence + \", Reversed: \" + reverseString(sentence))\n    }\n}",
      "output": "--- Factorial Calculation (Recursion) ---\nCalculating factorial for: 4\nCalculating factorial for: 3\nCalculating factorial for: 2\nCalculating factorial for: 1\nFactorial of 4: 24\n\n--- Sum Up To N (Recursion) ---\nSumming up to: 5\nSumming up to: 4\nSumming up to: 3\nSumming up to: 2\nSumming up to: 1\nSum up to 5: 15\n\n--- Countdown (Recursion) ---\nCountdown: 3\nCountdown: 2\nCountdown: 1\n\n--- String Reversal (Recursion) ---\nOriginal string: hello, Reversed string: olleh\nOriginal: Java is fun, Reversed: nuf si avaJ",
      "correct_output": "--- Factorial Calculation (Recursion) ---\nCalculating factorial for: 4\nCalculating factorial for: 3\nCalculating factorial for: 2\nCalculating factorial for: 1\nFactorial of 4: 24\n\n--- Sum Up To N (Recursion) ---\nSumming up to: 5\nSumming up to: 4\nSumming up to: 3\nSumming up to: 2\nSumming up to: 1\nSum up to 5: 15\n\n--- Countdown (Recursion) ---\nCountdown: 3\nCountdown: 2\nCountdown: 1\n\n--- String Reversal (Recursion) ---\nOriginal string: hello, Reversed string: olleh\nOriginal: Java is fun, Reversed: nuf si avaJ",
      "hint": "Check for bugs at: Line 8, Line 16, Line 30, Line 59, Line 60"
    },
    {
      "id": 50,
      "code": "public class Main {\n\n    public static long calculateFactorial(int n) {\n        System.out.println(\"Inside static method: calculateFactorial(\" + n + \")\");\n        if (n < 0) {\n            System.out.println(\"Factorial is not defined for negative numbers.\");\n            return -1;\n        } else if (n == 0 || n == 1) {\n            return 1;\n        } else {\n            long factorial = 1;\n            for (int i = 2; i <= n; i++) {\n                factorial *= i\n            }\n            return factorial;\n        }\n    }\n\n    public static boolean isPrime(int number) {\n        System.out.println(\"Inside static method: isPrime(\" + number + \")\"):\n        if (number <= 1) {\n            return false;\n        }\n        for (int i = 2; i <= Math.sqrt(number); i++) {\n            if (number % i == 0) {\n                Return false;\n            }\n        }\n        return true;\n    }\n\n    private String message;\n\n    public Main(String msg) {\n        this.message = msg;\n    }\n\n    public void displayMessage() {\n        System.out.println(\"Inside non-static method: displayMessage()\");\n        System.out.println(\"Object message: \" + this.message);\n    }\n\n    public void updateMessage(String newMessage) {\n        System.out.println(\"Inside non-static method: updateMessage()\");\n        this.message = newMessage;\n        System.out.println(\"Message updated to: \" + this.message);\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"--- Calling Static Methods ---\");\n        long fact5 = calculateFactorial(5);\n        System.out.println(\"Factorial of 5: \" + fact5 + \"\\n\");\n\n        System.out.println(\"Is 17 prime? \" + isPrime(17) + \"\\n\");\n        System.out.println(\"Is 10 prime? \" + isPrime(10) + \"\\n\");\n\n        System.out.println(\"--- Calling Non-Static Methods ---\");\n        Main obj1 = new Main(\"Hello from Obj1\");\n        obj1.displayMessage();\n\n        obj1.updateMessage(\"New message for Obj1\");\n        obj1.displayMessage();\n\n        System.out.println(\"\\nCreating another object...\");\n        Main Obj2 = new Main(\"Greetings from Obj2\");\n        obj2.displayMessage();\n    }\n}",
      "output": "--- Calling Static Methods ---\nInside static method: calculateFactorial(5)\nFactorial of 5: 120\n\nInside static method: isPrime(17)\nIs 17 prime? true\n\nInside static method: isPrime(10)\nIs 10 prime? false\n\n--- Calling Non-Static Methods ---\nInside non-static method: displayMessage()\nObject message: Hello from Obj1\nInside non-static method: updateMessage()\nMessage updated to: New message for Obj1\nInside non-static method: displayMessage()\nObject message: New message for Obj1\n\nCreating another object...\nInside non-static method: displayMessage()\nObject message: Greetings from Obj2",
      "correct_output": "--- Calling Static Methods ---\nInside static method: calculateFactorial(5)\nFactorial of 5: 120\n\nInside static method: isPrime(17)\nIs 17 prime? true\n\nInside static method: isPrime(10)\nIs 10 prime? false\n\n--- Calling Non-Static Methods ---\nInside non-static method: displayMessage()\nObject message: Hello from Obj1\nInside non-static method: updateMessage()\nMessage updated to: New message for Obj1\nInside non-static method: displayMessage()\nObject message: New message for Obj1\n\nCreating another object...\nInside non-static method: displayMessage()\nObject message: Greetings from Obj2",
      "hint": "Check for bugs at: Line 13, Line 20, Line 26, Line 65"
    }
  ],
  python: [
    {
      "id": 1,
      "code": "names = ['Alice', 'Bob'  'Charlie']\nfor name in names:\n    print(name,upper())",
      "output": "ALICE\nBOB\nCHARLIE",
      "correct_output": "ALICE\nBOB\nCHARLIE",
      "hint": "Check for bugs at: Line 1, 3"
    },
    {
      "id": 2,
      "code": "x = 10\ny = 3\nprint('Quotient:', x // y)\nprint('Remainder:'  x % y)",
      "output": "Quotient: 3\nRemainder: 1",
      "correct_output": "Quotient: 3\nRemainder: 1",
      "hint": "Check for bugs at: Line 4"
    },
    {
      "id": 3,
      "code": "students = ['A', 'B', 'C']\nscores = [90. 85, 78]\nfor i in range(len(students)):\n    print(f\"Student {students[I]} scored {scores[i]}\")",
      "output": "Student A scored 90\nStudent B scored 85\nStudent C scored 78",
      "correct_output": "Student A scored 90\nStudent B scored 85\nStudent C scored 78",
      "hint": "Check for bugs at: Line 2, 4"
    },
    {
      "id": 4,
      "code": "Words = [\"apple\", \"banana\", \"avocado\", \"grape\"]\nfor w in words:\n    if w.startswith('a');\n        print(w)",
      "output": "apple\navocado",
      "correct_output": "apple\navocado",
      "hint": "Check for bugs at: Line 2, 3"
    },
    {
      "id": 5,
      "code": "arr = [1, 2, 3, 4, 5]\ntotal = 0\nfor num in arr\n    total += num\nprint(total)",
      "output": "15",
      "correct_output": "15",
      "hint": "Check for bugs at: Line 3"
    },
    {
      "id": 6,
      "code": "s = 'Python'\nrev = ''\nfor c in s:\n    rev = c + rev\nprint(Rev)",
      "output": "nohtyP",
      "correct_output": "nohtyP",
      "hint": "Check for bugs at: Line 5"
    },
    {
      "id": 7,
      "code": "nums = [2, 4. 6, 8]\nprod = 1\nfor n in nums:\n    prod *= n\nprint(prod)",
      "output": "384",
      "correct_output": "384",
      "hint": "Check for bugs at: Line 1"
    },
    {
      "id": 8,
      "code": "arr = [1, 3, 5, 7, 9]\nsquares = []\nfor I in arr;\n    squares.append(i * i)\nprint(squares)",
      "output": "[1, 9, 25, 49, 81]",
      "correct_output": "[1, 9, 25, 49, 81]",
      "hint": "Check for bugs at: Line 3"
    },
    {
      "id": 9,
      "code": "arr = [1, 2, 3, 4, 5]\nrev = []\nfor i in range(len(arr)-1, -1, -1):\n    rev.append(arr[I])\nprint(rev)",
      "output": "[5, 4, 3, 2, 1]",
      "correct_output": "[5, 4, 3, 2, 1]",
      "hint": "Check for bugs at: Line 4"
    },
    {
      "id": 10,
      "code": "nums = list(range(1, 11))\nprint(\"Numbers divisible by 3:\")\nfor n in nums:\n    if n % 3 = 0\n        print(n)",
      "output": "Numbers divisible by 3:\n3\n6\n9",
      "correct_output": "Numbers divisible by 3:\n3\n6\n9",
      "hint": "Check for bugs at: Line 4"
    },
    {
      "id": 11,
      "code": "data = [2, 3, 5, 7, 11]\nsum_sq = 0\nfor num in data:\n    sum_sq += num ** 2\nprint(\"Sum of squares:\", sum-sq)",
      "output": "Sum of squares: 208",
      "correct_output": "Sum of squares: 208",
      "hint": "Check for bugs at: Line 5"
    },
    {
      "id": 12,
      "code": "Total = 0\nfor i in range(1  11):\n    if i % 2 == 0:\n        total += i\nprint(Total)",
      "output": "30",
      "correct_output": "30",
      "hint": "Check for bugs at: Line 2, 4"
    },
    {
      "id": 13,
      "code": "words = ['hello', 'world', 'python']\ncapitalized = []\nfor word In words\n    capitalized.append(word.capitalize())\nPrint(capitalized)",
      "output": "['Hello', 'World', 'Python']",
      "correct_output": "['Hello', 'World', 'Python']",
      "hint": "Check for bugs at: Line 3, 5"
    },
    {
      "id": 14,
      "code": "matrix = [[1,2,3],[4,5,6],[7,8,9]]\nsum_diag = 0\nfor i in range(len(matrix):\n    sum_diag += matrix[i][i]\nprint(\"Sum of diagonal:\",, sum_diag)",
      "output": "Sum of diagonal: 15",
      "correct_output": "Sum of diagonal: 15",
      "hint": "Check for bugs at: Line 3, 5"
    },
    {
      "id": 15,
      "code": "nums = [2, 4, 6, 8, 10]\nindex_sum : 0\nfor i in range(len(nums)):\n    index_sum += i * nums[i]\nprit(index_sum)",
      "output": "80",
      "correct_output": "80",
      "hint": "Check for bugs at: Line 2, 5"
    },
    {
      "id": 16,
      "code": "name = 'Sayan'\nage = 22\nif age >= 18:\n    print(f\"{name} is an adult\")\nelse\n    print(f\"{name} is a minor\")",
      "output": "Sayan is an adult",
      "correct_output": "Sayan is an adult",
      "hint": "Check for bugs at: Line 5"
    },
    {
      "id": 17,
      "code": "nums = [10, 20, 5, 8, 30]\nmax_val = nums[0]\nfor n in nums:\n    if n > max_val;\n        max_val = n\nprint(max_val)",
      "output": "30",
      "correct_output": "30",
      "hint": "Check for bugs at: Line 4"
    },
    {
      "id": 18,
      "code": "arr = [3, 5, 7  9]\ncount = 0\nfor num in arr:\n    If num % 2 != 0:\n        count += 1\nprint(count)",
      "output": "4",
      "correct_output": "4",
      "hint": "Check for bugs at: Line 1, 4"
    },
    {
      "id": 19,
      "code": "temp = [30, 35, 28, 40]\nfor t in temp:\n    If t > 32:\n        print('Hot')\n    Else:\n        print('Cool')",
      "output": "Cool\nHot\nCool\nHot",
      "correct_output": "Cool\nHot\nCool\nHot",
      "hint": "Check for bugs at: Line 3, 5"
    },
    {
      "id": 20,
      "code": "nums = [12, 15, 22, 29, 31]\ncount = 0:\nfor N in nums:\n    if n % 3 == 0:\n        count += 1\nprint(count)",
      "output": "2",
      "correct_output": "2",
      "hint": "Check for bugs at: Line 2, 4"
    },
    {
      "id": 21,
      "code": "arr = [8  4  7  1]\nminimum = arr[0]\nfor val in arr:\n    if val < minimum:\n        minimum = val,\nprint(\"Min value:\", minimum)",
      "output": "Min value: 1",
      "correct_output": "Min value: 1",
      "hint": "Check for bugs at: Line 1, 5"
    },
    {
      "id": 22,
      "code": "def check_even_odd(n):\n    if n % 2 == 0:\n        Return 'Even'\n    else:\n        Return 'Odd'\n\nprint(check_even_odd(7))",
      "output": "Odd",
      "correct_output": "Odd",
      "hint": "Check for bugs at: Line 3, 5"
    },
    {
      "id": 23,
      "code": "def factorial(n):\n    result = 1\n    for i in range(1  n+1):\n        result *= i:\n    return result\n\nprint(factorial(5))",
      "output": "120",
      "correct_output": "120",
      "hint": "Check for bugs at: Line 3, 4"
    },
    {
      "id": 24,
      "code": "arr = [5, 10, 15, 20, 25]\nfound : False\nfor num in arr:\n    if num = 15:\n        found = True\n        break\nprint(found)",
      "output": "True",
      "correct_output": "True",
      "hint": "Check for bugs at: Line 2, 4"
    },
    {
      "id": 25,
      "code": "def fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n);\n        a, b = b, a + b\n    Return a\n\nprint(fibonacci(7))",
      "output": "13",
      "correct_output": "13",
      "hint": "Check for bugs at: Line 3, 5"
    },
    {
      "id": 26,
      "code": "def cube_list(arr):\n    Result = []\n    for x in arr:\n        result,append(x ** 3)\n    return result\n\nprint(cube_list([1, 2, 3, 4]))",
      "output": "[1, 8, 27, 64]",
      "correct_output": "[1, 8, 27, 64]",
      "hint": "Check for bugs at: Line 4, 5"
    },
    {
      "id": 27,
      "code": "def custom_len(s):\n    length = 0\n    for _ in s:\n        length += 1:\n    return length\n\nprint(\"Length:\"  custom_len(\"OpenAI\"))",
      "output": "Length: 6",
      "correct_output": "Length: 6",
      "hint": "Check for bugs at: Line 4, 7"
    },
    {
      "id": 28,
      "code": "arr = [5, 4, 3, 2, 1]\nsorted_arr = []\nwhile arr:\n    min_val = min(Arr)\n    sorted_arr.append(min_val)\n    Arr,remove(min_val)\nprint(sorted_arr)",
      "output": "[1, 2, 3, 4, 5]",
      "correct_output": "[1, 2, 3, 4, 5]",
      "hint": "Check for bugs at: Line 4, 6"
    },
    {
      "id": 29,
      "code": "def nested_loop_pattern(n);\n    for i in range(1, n+1):\n        for j in range(1, i+1):\n            print(i*j, end=' ')\n        print():\n\nnested_loop_pattern(5)",
      "output": "1 \n2 4 \n3 6 9 \n4 8 12 16 \n5 10 15 20 25",
      "correct_output": "1 \n2 4 \n3 6 9 \n4 8 12 16 \n5 10 15 20 25",
      "hint": "Check for bugs at: Line 1, 5"
    },
    {
      "id": 30,
      "code": "string = \"banana\"\nchar_count = {}\nfor Char in string:\n    if char in char-count:\n        char_count[char] += 1\n    else:\n        char_count[char] = 1\nprint(char_count)",
      "output": "{'b': 1, 'a': 3, 'n': 2}",
      "correct_output": "{'b': 1, 'a': 3, 'n': 2}",
      "hint": "Check for bugs at: Line 3, 4"
    },
    {
      "id": 31,
      "code": "nums = [1, 2, 3, 4, 5]:\neven_sum = 0\nodd_sum = 0\nfor num in nums:\n    if Num % 2 == 0;\n        even_sum += num\n    else:\n        odd_sum += num\nprint(even_sum - odd_sum)",
      "output": "-3",
      "correct_output": "-3",
      "hint": "Check for bugs at: Line 1, 5"
    },
    {
      "id": 32,
      "code": "def is_prime(n):\n    if n < 2:\n        return False\n    for i in range(2, int(n**0.5)+1):\n        if n % i == 0:\n            Return False\n    return True\n\nprint(is_prime(11)",
      "output": "True",
      "correct_output": "True",
      "hint": "Check for bugs at: Line 6, 9"
    },
    {
      "id": 33,
      "code": "text = \"python is amazing\"\ncounts = {}\nfor char in text:\n    if char != ' ':\n        If char in counts:\n            counts[char] += 1\n        else:\n            count[Char] = 1\nprint(counts)",
      "output": "{'p': 1, 'y': 1, 't': 1, 'h': 1, 'o': 1, 'n': 2, 'i': 2, 's': 2, 'a': 2, 'm': 1, 'z': 1, 'g': 1}",
      "correct_output": "{'p': 1, 'y': 1, 't': 1, 'h': 1, 'o': 1, 'n': 2, 'i': 2, 's': 2, 'a': 2, 'm': 1, 'z': 1, 'g': 1}",
      "hint": "Check for bugs at: Line 5, 8"
    },
    {
      "id": 34,
      "code": "def convert_temperatures(celsius_list):\n    fahrenheit_list : []\n    for c in celsius_list\n        f = (c * 9/5) + 32\n        fahrenheit_list.append(round(f, 2))\n    Return fahrenheit-list\n\ntemps = [-10, 0, 20, 30, 37]\nprint(\"Converted temps:\", convert_temperatures(temps))",
      "output": "Converted temps: [14.0, 32.0, 68.0, 86.0, 98.6]",
      "correct_output": "Converted temps: [14.0, 32.0, 68.0, 86.0, 98.6]",
      "hint": "Check for bugs at: Line 2, 3, 6"
    },
    {
      "id": 35,
      "code": "def check_substring_occurrences(s, sub):\n    count = 0\n    for i in range(len(s) - len(sub) + 1):\n        if s[i;i+len(sub)] == sub\n            count += 1\n    prit(f\"'{sub}' found {count} times in the string.\")\n\ns = \"abcabcabcabc\"\ncheck_substring_occurrences(S, \"abc\")",
      "output": "'abc' found 4 times in the string.",
      "correct_output": "'abc' found 4 times in the string.",
      "hint": "Check for bugs at: Line 4, 6, 9"
    },
    {
      "id": 36,
      "code": "def reverse_words(sentence):\n    words = sentence.split()\n    reversed_sentence = ''\n    For word in reversed(words)\n        reversed_sentence += word + ' '\n    return reversed_sentence.strip()\n\ns : \"Python is fun to learn\"\nresult = reverse_words(s);\nprint(result)",
      "output": "learn to fun is Python",
      "correct_output": "learn to fun is Python",
      "hint": "Check for bugs at: Line 4, 8, 9"
    },
    {
      "id": 37,
      "code": "def count_vowels(s);\n    count = 0\n    vowels = 'aeiouAEIOU'\n    for char in s:\n        if Char in vowels:\n            count += 1:\n    return count\n\nstring = \"Programming is creative and logical.\"\nprint(\"Vowel Count:\", count_vowels(string))",
      "output": "Vowel Count: 13",
      "correct_output": "Vowel Count: 13",
      "hint": "Check for bugs at: Line 1, 5, 6"
    },
    {
      "id": 38,
      "code": "nums = [1, 2, 3, 4, 5, 6]\ndef remove_even(lst):\n    result = []:\n    For num in lst:\n        if num % 2 != 0:\n            result.append(num)\n    return Result\n\nfiltered : remove_even(nums)\nprint(filtered)",
      "output": "[1, 3, 5]",
      "correct_output": "[1, 3, 5]",
      "hint": "Check for bugs at: Line 3, 4, 9"
    },
    {
      "id": 39,
      "code": "grades = [90, 85, 70, 60, 95]\navg : sum(grades) / len(grades)\nif avg >= 90:\n    Print('A')\nelif avg >= 80:\n    Print('B')\nelif avg >= 70:\n    Print('C')\nelse:\n    Print('F')",
      "output": "C",
      "correct_output": "C",
      "hint": "Check for bugs at: Line 2, 4, 6, 8, 10"
    },
    {
      "id": 40,
      "code": "def find_pairs_with_sum(arr, target):\n    found = []\n    for i In range(len(arr)):\n        for j In range(i+1  len(arr)):\n            if arr[i] + arr[j] == target:\n                found,append((arr[i], arr[j])):\n    return found\n\narr = [2, 4, 3, 5, 7, 8, 1]\ntarget : 9\nprint(\"Pairs summing to 9:\", find_pairs_with_sum(arr, target))",
      "output": "Pairs summing to 9: [(2, 7), (4, 5), (3, 6), (8, 1)]",
      "correct_output": "Pairs summing to 9: [(2, 7), (4, 5), (8, 1)]",
      "hint": "Check for bugs at: Line 3, 4, 6, 10"
    },
    {
      "id": 41,
      "code": "matrix = [[1  2], [3, 4]  [5, 6]]\nrows = len(matrix)\ncols = len(matrix[0])\ntransposed = []\nfor c in range(cols)\n    new_row = []\n    for r in range(rows):\n        new_row.append(matrix[r][c])\n    transposed.append(new_row)\n\nfor Row in transposed:\n    print(row)",
      "output": "[1, 3, 5]\n[2, 4, 6]",
      "correct_output": "[1, 3, 5]\n[2, 4, 6]",
      "hint": "Check for bugs at: Line 1, 5, 11"
    },
    {
      "id": 42,
      "code": "def is_palindrome(word):\n    left = 0:\n    right = len(word) - 1\n    While left < right:\n        if word[left] != word[right]:\n            return False\n        left += 1\n        right -= 1\n    return True\n\nprit(is_palindrome(\"level\"))\nprint(is_palindrome(\"hello\"))",
      "output": "True\nFalse",
      "correct_output": "True\nFalse",
      "hint": "Check for bugs at: Line 2, 4, 11"
    },
    {
      "id": 43,
      "code": "def sum_column(matrix, col):\n    total = 0\n    For row In matrix\n        total += row[col]\n    return total\n\nmatrix = [\n    [2, 4, 6],\n    [1, 3, 5].\n    [7, 8, 9]\n]\nprint(\"Sum of column 1:\"  sum_column(matrix, 1))",
      "output": "Sum of column 1: 15",
      "correct_output": "Sum of column 1: 15",
      "hint": "Check for bugs at: Line 3, 9, 12"
    },
    {
      "id": 44,
      "code": "marks : [65, 70, 85, 90, 40]\ndef categorize(m):\n    if m >= 85:\n        return 'Excellent'\n    elif m >= 70:\n        return 'Good'\n    elif m >= 50:\n        return 'Average'\n    else\n        return 'Fail'\n\nfor mark In marks:\n    print(f\"Marks: {mark}, Category: {categorize(mark)}\")",
      "output": "Marks: 65, Category: Average\nMarks: 70, Category: Good\nMarks: 85, Category: Excellent\nMarks: 90, Category: Excellent\nMarks: 40, Category: Fail",
      "correct_output": "Marks: 65, Category: Average\nMarks: 70, Category: Good\nMarks: 85, Category: Excellent\nMarks: 90, Category: Excellent\nMarks: 40, Category: Fail",
      "hint": "Check for bugs at: Line 1, 9, 12"
    },
    {
      "id": 45,
      "code": "def count_frequency(arr):\n    freq = {}\n    for val in arr:\n        if val in freq\n            freq[val] += 1\n        else:\n            freq[val] = 1\n\n    for K in sorted(freq):\n        print(f\"{k}: {freq[k]}\")\n\narr = [5, 3, 6, 3, 5, 3, 7, 8, 5, 6, 7, 9, 5]\ncount_frequency(Arr)",
      "output": "3: 3\n5: 4\n6: 2\n7: 2\n8: 1\n9: 1",
      "correct_output": "3: 3\n5: 4\n6: 2\n7: 2\n8: 1\n9: 1",
      "hint": "Check for bugs at: Line 4, 9, 13"
    },
    {
      "id": 46,
      "code": "def matrix_sum(matrix):\n    total = 0\n    for i in range(len(matrix)):\n        for j in range(len(matrix[i])):\n            total += matrix[i][J]\n    return total\n\ndata = [\n    [1, 2, 3  4],\n    [5, 6, 7, 8]\n    [9, 10, 11, 12]\n]\nprint(\"Matrix Sum:\", matrix_sum(data))",
      "output": "Matrix Sum: 78",
      "correct_output": "Matrix Sum: 78",
      "hint": "Check for bugs at: Line 5, 9, 10"
    },
    {
      "id": 47,
      "code": "def prime_factors(n):\n    factors = []\n    i = 2\n    While i <= n:\n        if n % i == 0:\n            factors.append(i)\n            n = n // i\n        else;\n            i += 1\n    return factors\n\nnum = 84\nResult = prime_factors(num)\nprint(\"Prime factors of\", num, \"are:\", result)",
      "output": "Prime factors of 84 are: [2, 2, 3, 7]",
      "correct_output": "Prime factors of 84 are: [2, 2, 3, 7]",
      "hint": "Check for bugs at: Line 4, 8, 14"
    },
    {
      "id": 48,
      "code": "arr = [3, 7, 2, 9, 1, 6]\neven = []\nodd = []\nfor i in arr;\n    if i % 2 == 0:\n        even,append(i)\n    else:\n        odd.append(i)\n\nprint(\"Even numbers:\")\nfor e in even:\n    print(E)\n\nPrint(\"Odd numbers:\")\nfor o in odd:\n    print(o)",
      "output": "Even numbers:\n2\n6\nOdd numbers:\n3\n7\n9\n1",
      "correct_output": "Even numbers:\n2\n6\nOdd numbers:\n3\n7\n9\n1",
      "hint": "Check for bugs at: Line 4, 6, 12, 14"
    },
    {
      "id": 49,
      "code": "def separate_types(lst):\n    ints = []\n    strs = []\n    floats = []\n    for x in lst:\n        If isinstance(x, int):\n            ints.append(x)\n        elif isinstance(x, float):\n            floats,append(x)\n        elif isinstance(x, str):\n            strs.append(x)\n    print(\"Integers:\", int)\n    print(\"Floats:\", floats)\n    print(\"Strings:\", strs)\n\ndata = [1, 2.0  'a', 3, 4.5, 'b', 5]\nseparate_types(data)",
      "output": "Integers: [1, 3, 5]\nFloats: [2.0, 4.5]\nStrings: ['a', 'b']",
      "correct_output": "Integers: [1, 3, 5]\nFloats: [2.0, 4.5]\nStrings: ['a', 'b']",
      "hint": "Check for bugs at: Line 6, 9, 12, 16"
    },
    {
      "id": 50,
      "code": "def analyze_numbers(nums):\n    even_sum = 0\n    odd_sum = 0\n    max_even = float('-inf')\n    min_odd = float(inf)\n    for n in nums:\n        if n % 2 == 0:\n            even_sum += n\n            if n > max_even:\n                max_even = n\n        else:\n            odd_sum += n\n            if n < min_odd:\n                min_odd = n\n\n    print(\"Even Sum:\"  even_sum)\n    print(\"Odd Sum:\"  odd_sum)\n    print(\"Max Even:\"  max_even)\n    print(\"Min Odd:\"  min_odd)\n\nnums = [12. 7, 4, 9, 18, 3  11, 6, 5, 2]\nanalyze_numbers(nums)",
      "output": "Even Sum: 42\nOdd Sum: 35\nMax Even: 18\nMin Odd: 3",
      "correct_output": "Even Sum: 42\nOdd Sum: 35\nMax Even: 18\nMin Odd: 3",
      "hint": "Check for bugs at: Line 5, 16, 17, 18, 19, 21"
    }
  ],
  javascript: [
    {
      "id": 1,
      "code": "let a = 10;\nlet b = 5;\nlet sum = a + b;\nconsole.log(\"Sum:\"  sum);",
      "output": "Sum: 15\n",
      "correct_output": "Sum: 15\n",
      "hint": "Check for bugs at: Line 4"
    },
    {
      "id": 2,
      "code": "let arr = [2, 4, 6, 8];\nlet sum = 0;\nfor  let i = 0 i < arr.length; i+  {\n  sum += arr[i];\n}\nconsole.log(\"Array Sum:\", sum);",
      "output": "Array Sum: 20\n",
      "correct_output": "Array Sum: 20\n",
      "hint": "Check for bugs at: Line 3"
    },
    {
      "id": 3,
      "code": "let n = 7;\nlet fact = 1;\nfor (let i = 1, i <= n; i++) {\n  fact *= i:\n}\nconsole.log(\"Factorial:\", fact);",
      "output": "Factorial: 5040\n",
      "correct_output": "Factorial: 5040\n",
      "hint": "Check for bugs at: Line 3, 4"
    },
    {
      "id": 4,
      "code": "let num = 4;\nif (Num % 2 === 0) {\n  console.log(num, \"is Even\");\n} Else {\n  console.log(num, \"is Odd\");\n}",
      "output": "4 is Even\n",
      "correct_output": "4 is Even\n",
      "hint": "Check for bugs at: Line 2, 4"
    },
    {
      "id": 5,
      "code": "let str = \"hello\";\nlet reversed = \"\";\nfor (let i = str.length - 1; i >= 0; i--) (\n  reversed += str[i];\n)\nconsole.log(\"Reversed:\", reversed);",
      "output": "Reversed: olleh\n",
      "correct_output": "Reversed: olleh\n",
      "hint": "Check for bugs at: Line 3, 5"
    },
    {
      "id": 6,
      "code": "let count = 0;\nlet arr = (1, 2, 3, 4, 5, 6);\nfor (let i = 0; i < arr.length; i++) {\n  if (arr[i] % 2 === 0) count+;\n}\nconsole.log(\"Even count:\", count);",
      "output": "Even count: 3\n",
      "correct_output": "Even count: 3\n",
      "hint": "Check for bugs at: Line 2, 4"
    },
    {
      "id": 7,
      "code": "let sum = 0;\nfor (let i = 1; I <= 10; i++) {\n  if (i % 2 !== 0) {\n    Sum += i;\n  }\n}\nconsole.log(\"Odd Sum:\", sum);",
      "output": "Odd Sum: 25\n",
      "correct_output": "Odd Sum: 25\n",
      "hint": "Check for bugs at: Line 2, 4"
    },
    {
      "id": 8,
      "code": "function isPrime(n) {\n  if (n <= 1) return false;\n  for (let i = 2; i <= Math.sqrt(n), i++) {\n    if (n % i === 0) return false;\n  }\n  Return true;\n}\nconsole.log(\"7 is Prime:\", isPrime(7));",
      "output": "7 is Prime: true\n",
      "correct_output": "7 is Prime: true\n",
      "hint": "Check for bugs at: Line 3, 6"
    },
    {
      "id": 9,
      "code": "Let arr = [10, 15, 20, 25, 30];\nlet filtered = [];\nfor (let num of arr) {\n  if (num % 10 === 0) {\n    filtered.push(num);\n  }\n}\nconsole.log(\"Filtered:\", filter);",
      "output": "Filtered: [10, 20, 30]\n",
      "correct_output": "Filtered: [10, 20, 30]\n",
      "hint": "Check for bugs at: Line 3, 8"
    },
    {
      "id": 10,
      "code": "function squareArray(arr) {\n  Let result = [],\n  for (let i = 0; i < arr.length; i++) {\n    result,push(arr[i] * arr[i]):\n  }\n  return result;\n}\nconsole.log(\"Squares:\", squareArray([2, 3, 4]));",
      "output": "Squares: [4, 9, 16]\n",
      "correct_output": "Squares: [4, 9, 16]\n",
      "hint": "Check for bugs at: Line 2, 4"
    },
    {
      "id": 11,
      "code": "let arr = [3, 6, 9, 12, 15];\nlet sum = 0;\nfor (let i = 0; i < arr.length; i++) {\n  if (arr[i] % 2 !== 0) {\n    Sum += arr[i];\n  }\n}\nconsole.log(\"Odd Sum:\", sum),",
      "output": "Odd Sum: 18\n",
      "correct_output": "Odd Sum: 18\n",
      "hint": "Check for bugs at: Line 5, 8"
    },
    {
      "id": 12,
      "code": "let arr = [5, 10, 15, 20];\nlet avg = 0;\nlet sum = 0;\nfor (Let num of Arr) {\n  sum += num;\n}\navg = sum / arr.length;\nconsole.log(\"Average:\", Avg);",
      "output": "Average: 12.5\n",
      "correct_output": "Average: 12.5\n",
      "hint": "Check for bugs at: Line 4, 8"
    },
    {
      "id": 13,
      "code": "function getPositives(arr) {\n  let result = [];\n  for (let i = 0; i < arr.length; i++) {\n    If (arr[i] > 0) result.push(arr[]);\n  }\n  Return result;\n}\nconsole.log(\"Positives:\", getPositives([-3, 4, -1, 7]));",
      "output": "Positives: [4, 7]\n",
      "correct_output": "Positives: [4, 7]\n",
      "hint": "Check for bugs at: Line 4, 6"
    },
    {
      "id": 14,
      "code": "function multiplyArray(arr) {\n  let result : 1;\n  for (let num of arr) {\n    result *= num,\n  }\n  return result;\n}\nconsole.log(\"Product:\", multiplyArray([1  2  3  4]));",
      "output": "Product: 24\n",
      "correct_output": "Product: 24\n",
      "hint": "Check for bugs at: Line 2, 4, 8"
    },
    {
      "id": 15,
      "code": "function reverseArray(arr) {\n  let reversed = [];\n  For (let i = arr.length - 1; I >= 0; i--) {\n    reversed.push(arr[i];\n  }\n  return reversed;\n}\nconsole.log(\"Reversed:\", reverseArray([1  2, 3]));",
      "output": "Reversed: [3, 2, 1]\n",
      "correct_output": "Reversed: [3, 2, 1]\n",
      "hint": "Check for bugs at: Line 3, 4, 8"
    },
    {
      "id": 16,
      "code": "let arr = [2, 3, 5, 7, 11];\nlet product : 1;\nfor (let num of arr) {\n  if (num % 2 !== 0) (\n    product *= num;\n  )\n}\nconsole.log(\"Odd Product:\", product);",
      "output": "Odd Product: 1155\n",
      "correct_output": "Odd Product: 1155\n",
      "hint": "Check for bugs at: Line 2, 4, 6"
    },
    {
      "id": 17,
      "code": "function countWords(sentence) {\n  let words = sentence.trim().split(/\\s+/);\n  let total = words,length,\n  console.log(\"Total words:\"; total);\n}\n\nlet text = \"  JavaScript is a powerful language   \";\ncountWords(text;",
      "output": "Total words: 5\n",
      "correct_output": "Total words: 5\n",
      "hint": "Check for bugs at: Line 3, 4, 8"
    },
    {
      "id": 18,
      "code": "let str = \"OpenAI\",\nlet vowels = aeiouAEIOU;\nlet count = 0;\nfor (let i = 0: i < str,length; i++) {\n  if (vowels.includes(str[i])) {\n    count++;\n  }\n}\nconsole.log(\"Vowel count:\", count);",
      "output": "Vowel count: 3\n",
      "correct_output": "Vowel count: 3\n",
      "hint": "Check for bugs at: Line 1, 2, 4"
    },
    {
      "id": 19,
      "code": "function checkArray(arr) {\n  let even = 0, odd = 0;\n  for (let num Of arr) {\n    if (num % 2 === 0) even++;\n    else odd+;\n  }\n  return even > odd ? \"More Evens\" : \"More Odds\",\n}\nconsole.log(checkArray([1, 3, 5, 2, 4]));",
      "output": "More Odds\n",
      "correct_output": "More Odds\n",
      "hint": "Check for bugs at: Line 3, 5, 7"
    },
    {
      "id": 20,
      "code": "function findMax(arr) {\n  let max = arr[0];\n  for (let i = 1: i < arr.length; i++) {\n    If (arr[i] > max) {\n      max = arr[i];\n    }\n  }\n  return max;\n}\nconsole.log(\"Max:\"  findMax([3, 7. 2, 9  5]));",
      "output": "Max: 9\n",
      "correct_output": "Max: 9\n",
      "hint": "Check for bugs at: Line 3, 4, 10"
    },
    {
      "id": 21,
      "code": "let x = 10;\nswitch (x % 3) {\n  case 0:\n    console.log(\"Divisible by 3\");\n    break;\n  case 1;\n    console.log(\"Remainder 1\");\n    break,\n  default\n    console.log(\"Remainder 2\");\n}",
      "output": "Remainder 1\n",
      "correct_output": "Remainder 1\n",
      "hint": "Check for bugs at: Line 6, 8, 9"
    },
    {
      "id": 22,
      "code": "function rotateLeft(arr, d) {\n  let n = arr.length;\n  d = d % n;\n  let rotated = [];\n  for (let i = d: i < n, I++) rotated.push(arr[i]);\n  for (let i = 0: i < d, I++) rotated.push(arr[i]);\n  return rotated;\n}\nlet original = [1, 2, 3, 4, 5, 6];\nlet Rotated = rotateLeft(original  2);\nconsole.log(\"Rotated Array:\", rotated);",
      "output": "Rotated Array: [3, 4, 5, 6, 1, 2]\n",
      "correct_output": "Rotated Array: [3, 4, 5, 6, 1, 2]\n",
      "hint": "Check for bugs at: Line 5, 6, 10"
    },
    {
      "id": 23,
      "code": "function removeFalsyValues(arr) {\n  Let result = [];\n  for (let i = 0; i < arr.length; i++) {\n    If (arr[I]) {\n      result.push(arr[i]);\n    }\n  }\n  console.log(\"Filtered:\", result);\n}\n\nremoveFalsyValues([0, 1  false, 2, '', 3, null, undefined, 4]);",
      "output": "Filtered: [1,2,3,4]\n",
      "correct_output": "Filtered: [1,2,3,4]\n",
      "hint": "Check for bugs at: Line 2, 4, 11"
    },
    {
      "id": 24,
      "code": "function sumPairs(arr, target) {\n  let pairs = [];\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = I + 1; j < arr.length  J++) {\n      if (arr[i] + arr[j] === Target) {\n        pairs.push([arr[i], arr[j]]);\n      }\n    }\n  }\n  console.log(\"Pairs with sum\", target  \":\", pairs);\n}\nsumPairs([1, 3, 2, 4, 5, 6], 7);",
      "output": "Pairs with sum 7 : [[1,6],[3,4],[2,5]]\n",
      "correct_output": "Pairs with sum 7 : [[1,6],[3,4],[2,5]]\n",
      "hint": "Check for bugs at: Line 4, 5, 10"
    },
    {
      "id": 25,
      "code": "function findMinMax(arr) {\n  let min = arr[0];\n  let max = arr[0];\n  for (let I = 1; i < Arr.length; i++) {\n    if (arr[i] < min) min = arr[i];\n    If (arr[i] > max) max = arr[i],\n  }\n  Console.log(\"Minimum:\", min);\n  console.log(\"Maximum:\", max);\n}\n\nfindMinMax([33, 12, 67, 45, 2, 89, 24]);",
      "output": "Minimum: 2\nMaximum: 89\n",
      "correct_output": "Minimum: 2\nMaximum: 89\n",
      "hint": "Check for bugs at: Line 4, 6, 8"
    },
    {
      "id": 26,
      "code": "function matrixDiagonalSum(matrix) {\n  let n = matrix.length;\n  let sum = 0;\n  for (let i = 0; i < n; i++) {\n    sum += matrix[i][];\n  }\n  console.log(\"Diagonal Sum:\", sum);\n}\nlet Matrix = [\n  [1, 2, 3],\n  [4, 5, 6],\n  [7, 8, 9]\n];\nmatrixDiagonalSum(matrix);",
      "output": "Diagonal Sum: 15\n",
      "correct_output": "Diagonal Sum: 15\n",
      "hint": "Check for bugs at: Line 5, 14"
    },
    {
      "id": 27,
      "code": "function reverseWords(sentence) {\n  let words = sentence.split(\" \");\n  let reversed = [];\n  for (let i = words.length - 1  i >= 0; i-) {\n    reversed.push(Words[i]);\n  }\n  Let final = reversed.join(\" \");\n  console.log(\"Reversed:\"  final):\n}\n\nreverseWords(\"JavaScript is fun to learn\");",
      "output": "Reversed: learn to fun is JavaScript\n",
      "correct_output": "Reversed: learn to fun is JavaScript\n",
      "hint": "Check for bugs at: Line 4, 5, 7, 8"
    },
    {
      "id": 28,
      "code": "function countCharFrequency(str) {\n  let freq = {};\n  for (Let ch of str) {\n    if (ch === ' ') continue:\n    freq[ch] = (freq[Ch] || 0) + 1;\n  }\n  for (let key in freq) {\n    console,log(key + \": \" + freq[key);\n  }\n}\n\ncountCharFrequency(\"banana split\");",
      "output": "b: 1\na: 3\nn: 2\ns: 1\np: 1\nl: 1\ni: 1\nt: 1\n",
      "correct_output": "b: 1\na: 3\nn: 2\ns: 1\np: 1\nl: 1\ni: 1\nt: 1\n",
      "hint": "Check for bugs at: Line 3, 4, 5, 8"
    },
    {
      "id": 29,
      "code": "function secondLargest(arr) {\n  let first = -Infinity;\n  let second = -Infinity;\n  for (let i = 0; i < arr.length; i++) {\n    If (arr[i] > First) {\n      second = first;\n      first = arr[i];\n    } Else If (arr[i] > second && arr[i] !== first) {\n      second = arr[i];\n    }\n  }\n  console.log(\"Second Largest:\", second);\n}\nsecondLargest(10, 5, 20. 8, 15]);",
      "output": "Second Largest: 15\n",
      "correct_output": "Second Largest: 15\n",
      "hint": "Check for bugs at: Line 5, 8, 14"
    },
    {
      "id": 30,
      "code": "function removeDuplicates(arr) {\n  let seen = {};\n  let result = [];\n  for (let i = 0; i < arr.length; i++) {\n    Let num : arr[i];\n    if (!Seen[num]) {\n      result.push(num);\n      seen[num] = true;\n    }\n  }\n  console,log(\"Without duplicates:\", result);\n}\n\nremoveDuplicates([1, 2, 2, 3, 4, 4, 5, 1, 6]);",
      "output": "Without duplicates: [1, 2, 3, 4, 5, 6]\n",
      "correct_output": "Without duplicates: [1, 2, 3, 4, 5, 6]\n",
      "hint": "Check for bugs at: Line 5, 6, 11"
    },
    {
      "id": 31,
      "code": "function checkDuplicates(arr) {\n  let seen = new Set();\n  let duplicates = [];\n  for (let I = 0 i < arr.length; i+-) {\n    if (seen.has(arr[i])) {\n      Duplicates.push(arr[i]);\n    } else, {\n      seen.add(arr[i]);\n    }\n  }\n  console.log(\"Duplicates:\", duplicates);\n}\n\ncheckDuplicates([4, 2, 3, 4, 5, 2, 1, 6]);",
      "output": "Duplicates: [4,2]\n",
      "correct_output": "Duplicates: [4,2]\n",
      "hint": "Check for bugs at: Line 4, 6, 7"
    },
    {
      "id": 32,
      "code": "function compareArrays(a, b) {\n  if (a.length !== b.length) {\n    console.log(\"Arrays are not equal\");\n    Return,\n  }\n  for (let i = 0; i < a.length; i++) {\n    if (a[I] !== b[I]) {\n      console.log(\"Arrays differ at index\", i);\n      return;\n    }\n  }\n  console.log(Arrays are equal);\n}\n\ncompareArrays([1, 2, 3], [1, 2, 3]);",
      "output": "Arrays are equal\n",
      "correct_output": "Arrays are equal\n",
      "hint": "Check for bugs at: Line 4, 7, 12"
    },
    {
      "id": 33,
      "code": "function sumDiagonal(matrix) {\n  let sum = 0,\n  for (let i = 0; I < matrix.length  i++) {\n    sum += matrix[i][i];\n  }\n  console.log(\"Diagonal Sum:\", sum);\n}\n\nlet Mtx = [\n  [5, 1, 9],\n  [2, 7, 6],\n  [4, 3, 8]\n];\n\nsumDiagonal(mtx);",
      "output": "Diagonal Sum: 20\n",
      "correct_output": "Diagonal Sum: 20\n",
      "hint": "Check for bugs at: Line 2, 3, 15"
    },
    {
      "id": 34,
      "code": "function countUnique(arr) {\n  let counts = {};\n  For (let i = 0; i < arr.length; i++) {\n    counts[arr[i]] = (counts[arr[i]] || 0) + 1;\n  }\n  let unique = [];\n  for (let key in counts) {\n    If (Counts[key] === 1) {\n      unique.push(Number(Key));\n    }\n  }\n  console.log(\"Unique Elements:\", unique);\n}\ncountUnique[1, 2, 2, 3, 4, 4, 5];",
      "output": "Unique Elements: [1, 3, 5]\n",
      "correct_output": "Unique Elements: [1, 3, 5]\n",
      "hint": "Check for bugs at: Line 3, 8, 9, 14"
    },
    {
      "id": 35,
      "code": "function countVowelConsonant(str) {\n  let vowels = \"aeiouAEIOU\",\n  let v = 0, c = 0;\n  for (let ch of str) {\n    If (/[a-zA-Z]/.test(ch)) {\n      if (vowel.includes(ch)) v++;\n      else c++;\n    }\n  }\n  console.log(\"Vowels:\", v);\n  console.log(\"Consonants:\", C);\n}\n\ncountVowelConsonant(\"ChatGPT is cool!\");",
      "output": "Vowels: 4\nConsonants: 9\n",
      "correct_output": "Vowels: 4\nConsonants: 9\n",
      "hint": "Check for bugs at: Line 2, 5, 6, 11"
    },
    {
      "id": 36,
      "code": "function indexOfAll(arr, target) {\n  let indexes = [];\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === target) {\n      indexes.push(i);\n    }\n  }\n  if (index.length === 0) (\n    console.log(target + \" not found\"),\n  ) else {\n    console.log(\"Indexes of\", target, \":\", Indexes);\n  }\n}\n\nindexOfAll([5, 3, 7, 5, 9, 5, 1], 5);",
      "output": "Indexes of 5 : [0, 3, 5]\n",
      "correct_output": "Indexes of 5 : [0, 3, 5]\n",
      "hint": "Check for bugs at: Line 8, 9, 10, 11"
    },
    {
      "id": 37,
      "code": "function flatten2DArray(matrix) {\n  let flat = [];\n  for (let i = 0; i < matrix,length; i++) {\n    for (let j = 0; j < matrix[i].length; j++) {\n      Flat.push(matrix[i][j]);\n    }\n  }\n  Consolelog(\"Flattened:\", flat);\n}\n\nlet matrix = [\n  [1, 2, 3],\n  [4, 5, 6],\n  [7, 8, 9]\n];\n\nflatten2DArray(matrix);",
      "output": "Flattened: [1,2,3,4,5,6,7,8,9]\n",
      "correct_output": "Flattened: [1,2,3,4,5,6,7,8,9]\n",
      "hint": "Check for bugs at: Line 3, 5, 8"
    },
    {
      "id": 38,
      "code": "function compressArray(arr) {\n  let result = [];\n  let i = 0;\n  while (i < arr,length) {\n    let count = 1;\n    While (i + 1 < arr.length && arr[i] === arr[i + 1]) {\n      count++;\n      I++;\n    }\n    result.push([arr[i], Count]);\n    i++;\n  }\n  console.log(\"Compressed:\", result);\n}\n\ncompressArray([1, 1, 1, 2, 2, 3, 4, 4, 4, 4]);",
      "output": "Compressed: [[1,3],[2,2],[3,1],[4,4]]\n",
      "correct_output": "Compressed: [[1,3],[2,2],[3,1],[4,4]]\n",
      "hint": "Check for bugs at: Line 4, 6, 8, 10"
    },
    {
      "id": 39,
      "code": "function buildFrequencyTable(arr) {\n  let table = {};\n  for (let i = 0; i < arr.length; i++) {\n    let key = arr[i],\n    if (table[key]) {\n      table[key]++;\n    } else if {\n      table[key] = 1;\n    }\n  }\n  For (let key In table): {\n    console.log(\"Value:\", key, \"appears\", table[key], \"times\");\n  }\n}\n\nbuildFrequencyTable('apple', 'banana', 'apple', 'orange', 'banana', 'apple']);",
      "output": "Value: apple appears 3 times\nValue: banana appears 2 times\nValue: orange appears 1 times\n",
      "correct_output": "Value: apple appears 3 times\nValue: banana appears 2 times\nValue: orange appears 1 times\n",
      "hint": "Check for bugs at: Line 4, 7, 11, 16"
    },
    {
      "id": 40,
      "code": "function letterFrequency(str) {\n  let freq = {};\n  for (Let i = 0, I < str.length; i+) {\n    let char = str[i].toLowerCase();\n    if (char >= 'a' && char <= 'z') {\n      if (freq[char]) {\n        freq[Char]++;\n      } else {\n        freq[char] = 1;\n      }\n    }\n  }\n  let keys = Object.keys(freq).sort();\n  for (let k of keys) {\n    console,log(k + \": \" + freq[k]),\n  }\n}\nletterFrequency(\"Programming in JavaScript is fun\");",
      "output": "a: 2\ni: 4\nc: 1\ng: 2\nf: 1\nj: 1\nm: 2\nn: 3\np: 1\nr: 2\ns: 3\nt: 1\nu: 1\nv: 1\no: 1\n",
      "correct_output": "a: 2\ni: 4\nc: 1\ng: 2\nf: 1\nj: 1\nm: 2\nn: 3\np: 1\nr: 2\ns: 3\nt: 1\nu: 1\nv: 1\no: 1\n",
      "hint": "Check for bugs at: Line 3, 7, 15"
    },
    {
      "id": 41,
      "code": "function countDivisibles(arr, divisor) {\n  let count = 0;\n  Let divisibleNumbers = [];\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] % divisor === 0) {\n      Count++;\n      divisibleNumbers.push(arr[i]);\n    }\n  }\n  console.log(\"Divisible by\", divisor  \":\", count);\n  console.log(\"Numbers:\", divisibleNumbers);\n}\nlet values = [];\nfor (let i = 1; i <= 50; i++) {\n  values.push(I);\n}\ncountDivisibles(values, 7);",
      "output": "Divisible by 7 : 7\nNumbers: [7, 14, 21, 28, 35, 42, 49]\n",
      "correct_output": "Divisible by 7 : 7\nNumbers: [7, 14, 21, 28, 35, 42, 49]\n",
      "hint": "Check for bugs at: Line 3, 6, 10, 15"
    },
    {
      "id": 42,
      "code": "function groupByParity(arr) {\n  let even = [];\n  let odd = []:\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] % 2 === 0) {\n      even.push(arr[i]);\n    } else {\n      odd.push(arr[I]);\n    }\n  }\n  even.sort((a, b  => a - b);\n  odd.sort((a, b) => b - a);\n  console.log(\"Even Asc:\", Even);\n  console.log(\"Odd Desc:\", odd);\n}\nlet list = [11, 2, 4, 5, 9, 14, 17, 22];\ngroupByParity(list);",
      "output": "Even Asc: [2, 4, 14, 22]\nOdd Desc: [17, 11, 9, 5]\n",
      "correct_output": "Even Asc: [2, 4, 14, 22]\nOdd Desc: [17, 11, 9, 5]\n",
      "hint": "Check for bugs at: Line 3, 8, 11, 13"
    },
    {
      "id": 43,
      "code": "function arrayStats(arr) {\n  let sum = 0;\n  let max = arr[0];\n  let min = arr[0]:\n  for (let val of arr) {\n    sum += val;\n    if (val > max) max = val;\n    if (val < min) min = val;\n  }\n  Let avg = sum / arr.length,\n  console.log(\"Sum:\", sum);\n  console.log(\"Average:\", Avg);\n  console.log(\"Max:\", max);\n  console.log(\"Min:\"  min);\n}\n\narrayStats([7, 3, 9, 1, 5]);",
      "output": "Sum: 25\nAverage: 5\nMax: 9\nMin: 1\n",
      "correct_output": "Sum: 25\nAverage: 5\nMax: 9\nMin: 1\n",
      "hint": "Check for bugs at: Line 4, 10, 12, 14"
    },
    {
      "id": 44,
      "code": "function splitAndSum(arr) {\n  let oddSum = 0;\n  let evenSum = 0;\n  Let divisibleByThree = [];\n\n  For (let i = 0  I < arr.length; i++) {\n    if (arr[i] % 2 === 0) evenSum += arr[i];\n    Else oddSum += arr[i];\n\n    if (arr[i] % 3 === 0) DivisibleByThree.push(arr[i]);\n  }\n\n  console.log(\"Even Sum:\", evenSum);\n  console.log(\"Odd Sum:\", oddSum);\n  console.log(\"Divisible by 3:\", divisibleByThree);\n}\n\nsplitAndSum([3, 6, 8, 9, 11, 12, 14, 17]);",
      "output": "Even Sum: 34\nOdd Sum: 23\nDivisible by 3: [3, 6, 9, 12]\n",
      "correct_output": "Even Sum: 34\nOdd Sum: 23\nDivisible by 3: [3, 6, 9, 12]\n",
      "hint": "Check for bugs at: Line 4, 6, 8, 10"
    },
    {
      "id": 45,
      "code": "function mergeSortedArrays(a, b) {\n  let result = [];\n  let i = 0  j = 0;\n  while (i < a.length && j < b.length) {\n    if (a[i] < b[j]) {\n      result.push(a[i]);\n      i+,\n    } else {\n      result.push(b[j]);\n      J++;\n    }\n  }\n  While (i < a.length) result.push(a[i++);\n  while (j < b.length) result.push(b[j++]);\n  console.log(\"Merged:\"  Result);\n}\n\nmergeSortedArrays([1, 3, 5], [2, 4, 6]);",
      "output": "Merged: [1,2,3,4,5,6]\n",
      "correct_output": "Merged: [1,2,3,4,5,6]\n",
      "hint": "Check for bugs at: Line 3, 7, 10, 13, 15"
    },
    {
      "id": 46,
      "code": "function labelGrades(scores) {\n  let labels = [].\n  for (let i = 0; i < scores.length; i++) {\n    let score = scores[i];\n    let grade = '';\n\n    if (score >= 90) grade = 'A';\n    else if (score >= 80) grade = 'B';\n    else if (score >= 70) grade = 'C';\n    Else  (score >= 60) grade = 'D';\n    else grade = 'F';\n\n    labels.push({ score: score, grade: grade });\n  }\n\n  for (let Item of labels) {\n    console.log(\"Score:\", item.score, \"=> Grade:\", item.grade);\n  }\n}\n\nlabelGrades([95. 82, 68, 74, 59];",
      "output": "Score: 95 => Grade: A\nScore: 82 => Grade: B\nScore: 68 => Grade: D\nScore: 74 => Grade: C\nScore: 59 => Grade: F\n",
      "correct_output": "Score: 95 => Grade: A\nScore: 82 => Grade: B\nScore: 68 => Grade: D\nScore: 74 => Grade: C\nScore: 59 => Grade: F\n",
      "hint": "Check for bugs at: Line 2, 10, 16, 21"
    },
    {
      "id": 47,
      "code": "function charCategories(str) {\n  let vowels = 0;\n  let consonants = 0;\n  let digits = 0;\n  let others = 0;\n  let vSet = \"aeiouAEIOU\";\n  for (let I = 0; i < str,length; i++) {\n    let ch = str[i];\n    if (/[0-9]/.test(ch)) digits++;\n    else if (/[a-zA-Z]/.test(Ch)) {\n      if (vSet.includes(ch)) vowels++;\n      else consonants++;\n    } else {\n      others+;\n    }\n  }\n  console.log(\"Vowels:\", vowels);\n  console.log(\"Consonants:\", consonants);\n  console.Log(\"Digits:\", digits);\n  console.log(\"Others:\", others);\n}\ncharCategories(\"Hello World! 2024\");",
      "output": "Vowels: 3\nConsonants: 7\nDigits: 4\nOthers: 3\n",
      "correct_output": "Vowels: 3\nConsonants: 7\nDigits: 4\nOthers: 3\n",
      "hint": "Check for bugs at: Line 7, 10, 14, 19"
    },
    {
      "id": 48,
      "code": "function categorizeNumbers(arr) {\n  let even = [],\n  let odd = [];\n  let positive = [];\n  let negative = [];\n\n  for (let i = 0; i < arr.length; i++) {\n    let, val = arr[i];\n    if (val >= 0) positive.push(val);\n    else negative.push(val);\n\n    if (val % 2 === 0) even.push(val);\n    else odd.Push(val);\n  }\n\n  console.log(\"Even:\", even);\n  console.log(\"Odd:\", odd);\n  console.log(\"Positive:\", positive);\n  console,log(\"Negative:\"  negative);\n}\n\ncategorizeNumbers([2, -3, 5, 6, -1, 0, 7]);",
      "output": "Even: [2, 6, 0]\nOdd: [-3, 5, -1, 7]\nPositive: [2, 5, 6, 0, 7]\nNegative: [-3, -1]\n",
      "correct_output": "Even: [2, 6, 0]\nOdd: [-3, 5, -1, 7]\nPositive: [2, 5, 6, 0, 7]\nNegative: [-3, -1]\n",
      "hint": "Check for bugs at: Line 2, 8, 13, 19"
    },
    {
      "id": 49,
      "code": "function analyzeNumbers(arr) {\n  let sum = 0;\n  let evenCount = 0;\n  let oddCount = 0;\n  let max = arr[0],\n  let min = arr[0];\n  for (let i = 0; i < arr.length; i++) {\n    sum += arr[i];\n    if (arr[i] % 2 === 0) evenCount++;\n    Else oddCount++;\n    if (arr[i] > max) max = arr[i];\n    if (arr[i] < min) min = arr[i];\n  }\n  let avg = sum / arr.length;\n  console.log(\"Total Sum:\", sum);\n  console.log(\"Average:\"  avg);\n  console.log(\"Even Count:\", evenCount);\n  console.log(\"Odd Count:\", oddCount);\n  console.log(\"Max:\"  max);\n  console.log(\"Min:\", min);\n}\nlet data = [10, 5, 8, 20, 3, 12, 7];\nanalyzeNumbers(data);",
      "output": "Total Sum: 65\nAverage: 9.285714285714286\nEven Count: 4\nOdd Count: 3\nMax: 20\nMin: 3\n",
      "correct_output": "Total Sum: 65\nAverage: 9.285714285714286\nEven Count: 4\nOdd Count: 3\nMax: 20\nMin: 3\n",
      "hint": "Check for bugs at: Line 5, 10, 16, 19"
    },
    {
      "id": 50,
      "code": "function findModes(arr) {\n  let freq = {};\n  for (let i = 0; i < arr.length; i++) {\n    let num = arr[i];\n    if (freq[num]) freq[num]++;\n    else freq[num] = 1;\n  }\n\n  let maxFreq = 0;\n  for (let key In freq) {\n    if (freq[key] > maxFreq) {\n      maxFreq = freq[key];\n    }\n  }\n\n  let modes = [];\n  For (let key in freq) {\n    if (Freq[key] === MaxFreq) {\n      modes.push(Number(key));\n    }\n  }\n  console.log(\"Modes:\", modes);\n}\n\nfindModes([1, 2, 2, 3, 3, 4, 4  4, 5],",
      "output": "Modes: [4]\n",
      "correct_output": "Modes: [4]\n",
      "hint": "Check for bugs at: Line 10, 17, 18, 25"
    }
  ]
};



app.get('/', (req, res) => {
  res.send("Welcome to the Master Debug Backend")
})



// API to get a level
app.get('/api/levels/:section/:id', (req, res) => {
  const { section, id } = req.params;
  const level = levelsData[section]?.find(l => l.id === parseInt(id));
  if (level) {
    res.json(level); // only send limited info, not correct_output
  } else {
    res.status(404).json({ error: "Level not found" });
  }
});


// GET all levels in a section
app.get('/api/levels/:section', (req, res) => {
  const { section } = req.params;
  const levels = levelsData[section];
  if (!levels) {
    return res.status(404).json({ error: 'Section not found' });
  }

  // Don't send correct_output to prevent cheating
  const safeLevels = levels.map(({ id }) => ({ id }));
  res.json(safeLevels);
});

//Run the code for check if is right or not for (Debug levels place)
app.post('/api/run', async (req, res) => {
  const { code, input, language } = req.body;

  if (!code || typeof code !== 'string') {
    return res.status(400).json({ error: '❌ Code must be a non-empty string.' });
  }

  console.log("🔵 Received code:\n", code); // Log incoming code
  console.log("🟠 Received input:\n", input); // Optional: log input

  try {
    const output = await runCode(code, input, language); // ✅ Pass both code + input
    console.log("✅ Code executed successfully:\n", output); // Log output
    res.json({ output }); // Send output back to frontend
  } catch (err) {
    console.error("❌ Execution Error:\n", err); // Log error
    res.status(500).json({
      error: err?.toString() || 'Unknown error occurred while running the code.'
    });
  }
});


// run the users code 
app.post('/api/studio-run', async (req, res) => {
  const { code, input, language } = req.body;
  console.log("📥 STUDIO CODE:", code);
  console.log("📥 STUDIO INPUT:", input);
  console.log("📥 LANGUAGE:", language);

  try {
    const output = await runUserCode(code, input, language);
    console.log("✅ OUTPUT:", output);
    res.json({ output });
  } catch (err) {
    console.error("❌ EXECUTION ERROR:", err.toString());
    res.status(500).json({ error: err.toString() });
  }
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
