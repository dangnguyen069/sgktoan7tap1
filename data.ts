import { Chapter } from './types';

export const textbookData: Chapter[] = [
  {
    id: "chuong-1",
    title: "Chương 1: Số Hữu Tỉ",
    lessons: [
      {
        id: "bai-1",
        title: "Bài 1: Tập hợp các số hữu tỉ",
        content: {
          keyPoints: [
            "Số hữu tỉ là số viết được dưới dạng phân số $\\frac{a}{b}$ với $a, b \\in \\mathbb{Z}, b \\neq 0$.",
            "Tập hợp các số hữu tỉ được kí hiệu là $\\mathbb{Q}$.",
            "Mỗi số hữu tỉ được biểu diễn bởi một điểm trên trục số.",
            "Số đối của số hữu tỉ $x$ kí hiệu là $-x$."
          ],
          theory: [
            "Các số $-7; 0,5; 1\\frac{2}{3}$ đều có thể viết dưới dạng phân số. Người ta gọi đó là các số hữu tỉ.",
            "Ví dụ: $3 = \\frac{3}{1}$; $-1,4 = \\frac{-14}{10}$; $1\\frac{2}{5} = \\frac{7}{5}$.",
            "Nhận xét: Mỗi số nguyên là một số hữu tỉ ($ \\mathbb{Z} \\subset \\mathbb{Q} $).",
            "Trên trục số, nếu $x < y$ thì điểm $x$ ở bên trái điểm $y$."
          ],
          examples: [
            {
              id: "vd1",
              problem: "So sánh hai phân số $\\frac{2}{9}$ và $\\frac{-5}{9}$.",
              solution: "Vì $2 > -5$ và $9 > 0$ nên $\\frac{2}{9} > \\frac{-5}{9}$."
            },
            {
              id: "vd2",
              problem: "Tìm số đối của các số sau: $7$; $\\frac{-5}{9}$; $-0,75$.",
              solution: "Số đối của $7$ là $-7$. Số đối của $\\frac{-5}{9}$ là $\\frac{5}{9}$. Số đối của $-0,75$ là $0,75$."
            },
            {
              id: "vd3",
              problem: "Biểu diễn số hữu tỉ $\\frac{3}{4}$ trên trục số.",
              solution: "Chia đoạn thẳng đơn vị thành 4 phần bằng nhau. Lấy một đoạn làm đơn vị mới bằng $\\frac{1}{4}$ đơn vị cũ. Số hữu tỉ $\\frac{3}{4}$ được biểu diễn bởi điểm nằm bên phải điểm 0 và cách điểm 0 một đoạn bằng 3 đơn vị mới."
            }
          ],
          exercises: [
            {
              id: "bt1",
              question: "Thay ? bằng kí hiệu $\\in, \\notin$ thích hợp: $-7$ ? $\\mathbb{N}$; $-17$ ? $\\mathbb{Z}$; $-38$ ? $\\mathbb{Q}$.",
              hint: "$\\mathbb{N}$ là tập hợp số tự nhiên, $\\mathbb{Z}$ là số nguyên, $\\mathbb{Q}$ là số hữu tỉ."
            },
            {
              id: "bt2",
              question: "Trong các phân số sau, những phân số nào biểu diễn số hữu tỉ $\\frac{-5}{9}$: $\\frac{-10}{18}$; $\\frac{10}{18}$; $\\frac{15}{-27}$; $\\frac{20}{36}$.",
              hint: "Rút gọn các phân số về tối giản để so sánh."
            },
             {
              id: "bt3",
              question: "Sắp xếp các số hữu tỉ sau theo thứ tự tăng dần: $\\frac{-2}{3}; 0,4; -0,5; \\frac{3}{5}$.",
              hint: "Đổi tất cả ra phân số cùng mẫu hoặc số thập phân để so sánh."
            }
          ],
          quizzes: [
            {
              id: "q1",
              question: "Số nào sau đây **không phải** là số hữu tỉ?",
              options: ["$\\frac{-3}{4}$", "$1,25$", "$\\frac{3}{0}$", "$5$"],
              correctAnswer: 2,
              explanation: "Số hữu tỉ phải có dạng $\\frac{a}{b}$ với $b \\neq 0$. $\\frac{3}{0}$ có mẫu bằng 0 nên không xác định."
            },
            {
              id: "q2",
              question: "Số đối của số hữu tỉ $\\frac{-7}{3}$ là:",
              options: ["$\\frac{7}{-3}$", "$\\frac{7}{3}$", "$\\frac{3}{7}$", "$\\frac{-3}{7}$"],
              correctAnswer: 1,
              explanation: "Số đối của $-x$ là $x$. Vậy số đối của $\\frac{-7}{3}$ là $\\frac{7}{3}$."
            },
            {
              id: "q3",
              question: "Kí hiệu tập hợp các số hữu tỉ là:",
              options: ["$\\mathbb{N}$", "$\\mathbb{Z}$", "$\\mathbb{R}$", "$\\mathbb{Q}$"],
              correctAnswer: 3,
              explanation: "$\\mathbb{Q}$ là kí hiệu tập hợp số hữu tỉ."
            }
          ]
        }
      },
      {
        id: "bai-2",
        title: "Bài 2: Các phép tính với số hữu tỉ",
        content: {
          keyPoints: [
            "Phép cộng, trừ, nhân, chia số hữu tỉ được thực hiện tương tự như phân số.",
            "Tính chất giao hoán, kết hợp, phân phối của phép nhân đối với phép cộng vẫn đúng với số hữu tỉ.",
            "Chú ý dấu của kết quả khi thực hiện phép nhân/chia hai số hữu tỉ."
          ],
          theory: [
            "Cộng, trừ hai số hữu tỉ: Ta có thể viết chúng dưới dạng phân số rồi áp dụng quy tắc cộng, trừ phân số.",
            "Nhân, chia hai số hữu tỉ: Viết dưới dạng phân số rồi nhân/chia tử với tử, mẫu với mẫu (hoặc nhân nghịch đảo).",
            "Thứ tự thực hiện phép tính: Ngoặc -> Lũy thừa -> Nhân/Chia -> Cộng/Trừ."
          ],
          examples: [
            {
              id: "vd1",
              problem: "Tính: $-0,25 + \\frac{4}{5}$",
              solution: "Ta có: $-0,25 = \\frac{-1}{4}$. Vậy $\\frac{-1}{4} + \\frac{4}{5} = \\frac{-5}{20} + \\frac{16}{20} = \\frac{11}{20}$."
            },
            {
              id: "vd2",
              problem: "Tính nhanh: $\\frac{3}{7} \\cdot \\frac{-2}{5} \\cdot \\frac{7}{3}$",
              solution: "Áp dụng tính chất giao hoán: $(\\frac{3}{7} \\cdot \\frac{7}{3}) \\cdot \\frac{-2}{5} = 1 \\cdot \\frac{-2}{5} = \\frac{-2}{5}$."
            }
          ],
          exercises: [
            {
              id: "bt1",
              question: "Tính: a) $0,6 + \\frac{3}{-4}$",
              hint: "Đổi $0,6$ thành $\\frac{3}{5}$ và thực hiện phép cộng."
            },
            {
              id: "bt2",
              question: "Tìm x, biết: $x - \\frac{1}{2} = \\frac{-2}{3}$",
              hint: "Chuyển vế đổi dấu: $x = \\frac{-2}{3} + \\frac{1}{2}$."
            }
          ],
          quizzes: [
             {
              id: "q1",
              question: "Kết quả của phép tính $\\frac{-1}{2} + \\frac{1}{3}$ là:",
              options: ["$\\frac{1}{6}$", "$\\frac{-1}{6}$", "$\\frac{-5}{6}$", "$\\frac{5}{6}$"],
              correctAnswer: 1,
              explanation: "Quy đồng mẫu số 6: $\\frac{-3}{6} + \\frac{2}{6} = \\frac{-1}{6}$."
            },
            {
              id: "q2",
              question: "Phép nhân số hữu tỉ có tính chất nào sau đây?",
              options: ["Chỉ giao hoán", "Chỉ kết hợp", "Giao hoán và kết hợp", "Không có tính chất nào"],
              correctAnswer: 2,
              explanation: "Phép nhân số hữu tỉ có đầy đủ tính chất giao hoán, kết hợp và phân phối với phép cộng."
            }
          ]
        }
      },
      {
        id: "bai-3",
        title: "Bài 3: Lũy thừa của một số hữu tỉ",
        content: {
          keyPoints: [
            "Lũy thừa bậc $n$ của số hữu tỉ $x$, kí hiệu $x^n$, là tích của $n$ thừa số $x$.",
            "$x^m . x^n = x^{m+n}$",
            "$x^m : x^n = x^{m-n}$ (với $x \\neq 0, m \\geq n$)",
            "$(x^m)^n = x^{m.n}$"
          ],
          theory: [
            "Quy ước: $x^1 = x$; $x^0 = 1$ (với $x \\neq 0$).",
            "Khi viết số hữu tỉ $x$ dưới dạng $\\frac{a}{b}$, ta có $(\\frac{a}{b})^n = \\frac{a^n}{b^n}$."
          ],
          examples: [
            {
              id: "vd1",
              problem: "Tính $(-0,5)^2$",
              solution: "$(-0,5)^2 = (\\frac{-1}{2})^2 = \\frac{(-1)^2}{2^2} = \\frac{1}{4}$."
            },
            {
              id: "vd2",
              problem: "Tính $2^3 \\cdot 2^4$",
              solution: "Áp dụng công thức nhân hai lũy thừa cùng cơ số: $2^{3+4} = 2^7 = 128$."
            }
          ],
          exercises: [
            {
              id: "bt1",
              question: "Viết các số sau dưới dạng lũy thừa với số mũ lớn hơn 1: $0,49$; $\\frac{1}{32}$; $\\frac{-8}{125}$.",
              hint: "$0,49 = 0,7^2$; $\\frac{1}{32} = (\\frac{1}{2})^5$; $\\frac{-8}{125} = (\\frac{-2}{5})^3$"
            }
          ],
          quizzes: [
            {
              id: "q1",
              question: "Giá trị của $(\\frac{-1}{3})^3$ là:",
              options: ["$\\frac{1}{9}$", "$\\frac{-1}{9}$", "$\\frac{1}{27}$", "$\\frac{-1}{27}$"],
              correctAnswer: 3,
              explanation: "$(\\frac{-1}{3})^3 = \\frac{(-1)^3}{3^3} = \\frac{-1}{27}$."
            },
            {
              id: "q2",
              question: "Kết quả của phép tính $x^{10} : x^2$ (với $x \\neq 0$) là:",
              options: ["$x^5$", "$x^8$", "$x^{12}$", "$x^{20}$"],
              correctAnswer: 1,
              explanation: "Áp dụng công thức $x^m : x^n = x^{m-n}$, ta có $x^{10-2} = x^8$."
            }
          ]
        }
      }
    ]
  },
  {
    id: "chuong-2",
    title: "Chương 2: Số Thực",
    lessons: [
      {
        id: "bai-1-c2",
        title: "Bài 1: Số vô tỉ. Căn bậc hai số học",
        content: {
          keyPoints: [
            "Số thập phân vô hạn không tuần hoàn gọi là số vô tỉ.",
            "Tập hợp số vô tỉ kí hiệu là $\\mathbb{I}$.",
            "Căn bậc hai số học của $a$ ($a \\geq 0$) là số $x$ không âm sao cho $x^2 = a$.",
            "Kí hiệu: $\\sqrt{a}$"
          ],
          theory: [
            "Ví dụ số vô tỉ thường gặp: $\\pi \\approx 3,14159...$",
            "Số hữu tỉ và số vô tỉ gọi chung là số thực ($\\mathbb{R}$)."
          ],
          examples: [
            {
              id: "vd1",
              problem: "Tính $\\sqrt{16}$; $\\sqrt{81}$",
              solution: "$\\sqrt{16} = 4$ vì $4 > 0$ và $4^2 = 16$. $\\sqrt{81} = 9$."
            }
          ],
          exercises: [
            {
              id: "bt1",
              question: "Tính giá trị căn bậc hai số học của: $9; 16; 81; 121$.",
              hint: "Tìm số dương nào bình phương lên bằng các số đã cho."
            }
          ],
          quizzes: [
            {
              id: "q1",
              question: "Số nào sau đây là số vô tỉ?",
              options: ["$2$", "$\\frac{1}{3}$", "$\\sqrt{2}$", "$0$"],
              correctAnswer: 2,
              explanation: "$\\sqrt{2}$ là số thập phân vô hạn không tuần hoàn, nên là số vô tỉ."
            }
          ]
        }
      },
      {
        id: "bai-2-c2",
        title: "Bài 2: Số thực. Giá trị tuyệt đối",
        content: {
          keyPoints: [
            "Số hữu tỉ và số vô tỉ được gọi chung là số thực.",
            "Tập hợp số thực kí hiệu là $\\mathbb{R}$.",
            "Giá trị tuyệt đối của số thực $x$, kí hiệu $|x|$, là khoảng cách từ điểm $x$ đến điểm 0 trên trục số."
          ],
          theory: [
            "Nếu $x > 0$ thì $|x| = x$.",
            "Nếu $x < 0$ thì $|x| = -x$.",
            "Nếu $x = 0$ thì $|x| = 0$."
          ],
          examples: [
            {
              id: "vd1",
              problem: "Tính $|-3,5|$; $|\\sqrt{2}|$",
              solution: "$|-3,5| = 3,5$; $|\\sqrt{2}| = \\sqrt{2}$."
            }
          ],
          exercises: [
             {
              id: "bt1",
              question: "Tìm $|x|$ biết $x = -\\sqrt{7}$",
              hint: "Giá trị tuyệt đối luôn không âm."
            }
          ],
          quizzes: [
             {
              id: "q1",
              question: "Giá trị tuyệt đối của -5 là:",
              options: ["-5", "5", "0", "Không xác định"],
              correctAnswer: 1,
              explanation: "$|-5| = 5$."
             }
          ]
        }
      }
    ]
  },
  {
    id: "chuong-3",
    title: "Chương 3: Các hình khối trong thực tiễn",
    lessons: [
      {
        id: "bai-1-c3",
        title: "Bài 1: Hình hộp chữ nhật - Hình lập phương",
        content: {
            keyPoints: [
                "Hình hộp chữ nhật có 6 mặt là hình chữ nhật.",
                "Hình lập phương có 6 mặt là hình vuông bằng nhau.",
                "Các công thức diện tích xung quanh và thể tích."
            ],
            theory: [
                "$S_{xq} = 2(a + b)h$ (với $a, b$ là cạnh đáy, $h$ là chiều cao)",
                "$V = a.b.h$",
                "Hình lập phương cạnh $a$: $S_{xq} = 4a^2$; $V = a^3$"
            ],
            examples: [],
            exercises: [],
            quizzes: [
                {
                    id: "q1",
                    question: "Hình lập phương có bao nhiêu cạnh?",
                    options: ["8", "10", "12", "6"],
                    correctAnswer: 2,
                    explanation: "Hình lập phương có 12 cạnh bằng nhau."
                }
            ]
        }
      }
    ]
  },
  {
    id: "chuong-4",
    title: "Chương 4: Góc và đường thẳng song song",
    lessons: [
      {
          id: "bai-1-c4",
          title: "Bài 1: Các góc ở vị trí đặc biệt",
          content: {
              keyPoints: ["Hai góc kề bù có tổng số đo bằng $180^\\circ$.", "Hai góc đối đỉnh thì bằng nhau."],
              theory: ["Góc kề bù là hai góc có một cạnh chung và hai cạnh còn lại là hai tia đối nhau."],
              examples: [],
              exercises: [],
              quizzes: [
                  {
                      id: "q1",
                      question: "Tổng số đo của hai góc kề bù là:",
                      options: ["$90^\\circ$", "$180^\\circ$", "$360^\\circ$", "$45^\\circ$"],
                      correctAnswer: 1,
                      explanation: "Hai góc kề bù có tổng số đo bằng $180^\\circ$."
                  }
              ]
          }
      }
    ]
  },
  {
      id: "chuong-5",
      title: "Chương 5: Một số yếu tố thống kê",
      lessons: [
          {
              id: "bai-1-c5",
              title: "Bài 1: Thu thập và phân loại dữ liệu",
              content: {
                  keyPoints: ["Dữ liệu định lượng (số)", "Dữ liệu định tính (chữ, kí hiệu)"],
                  theory: ["Thu thập dữ liệu qua quan sát, lập phiếu hỏi, thu thập từ nguồn có sẵn."],
                  examples: [],
                  exercises: [],
                  quizzes: [
                      {
                          id: "q1",
                          question: "Dữ liệu nào sau đây là dữ liệu định lượng?",
                          options: ["Màu sắc ưa thích", "Nơi sinh", "Chiều cao (cm)", "Xếp loại học lực"],
                          correctAnswer: 2,
                          explanation: "Chiều cao là số đo, nên là dữ liệu định lượng."
                      }
                  ]
              }
          }
      ]
  }
];