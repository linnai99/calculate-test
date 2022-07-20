export enum 令牌类型 {
    加号 = "+",
    减号 = "-",
    左括号 = "(",
    右括号 = ")",
    乘号 = "*",
    除号 = "/",
    幂 = "^",
    取余 = "%",
    数字 = "number",
}

export interface 令牌 {
    content: string;
    type: 令牌类型;
    index: number
}
export interface 解析令牌响应 {
    index_increment: number,
    result: string,
    type: 令牌类型,
    error?: string,
}
export interface 解析数字响应 {
    index_increment: number,
    result: number,
    error?: string,
}
export function 是否是数字(a: string) {
    if (!"0123456789".includes(a)) {
        return false;
    }
    return true;
}
export function 解析数字(s: string): 解析令牌响应 {
    const res: 解析令牌响应 = {
        index_increment: 0,
        result: "",
        type: 令牌类型.数字
    }
    for (const c of s) {
        if ("0123456789".includes(c)) {
            res.result += c;
            res.index_increment += 1
        } else {
            break
        }
    }
    return res
}
export function 分词(a: string): Array<令牌> {
    const res: 令牌[] = [];
    // console.log("a",a);
    for (let i = 0; i < a.length;) {

        const char = a[i];
        let r: 解析令牌响应;

        if (" \t\n\r".includes(char)) {
            i += 1
        } else if (是否是数字(char)) {
            // console.log("char",char)
            r = 解析数字(a.slice(i))
            // console.log("r",r)
            res.push({
                content: r.result,
                type: r.type,
                index: i
            })
            i += r.index_increment
        } else if (char === `+`) {
            res.push({
                content: char,
                type: 令牌类型.加号,
                index: i
            });
            i += 1
        } else if (char === `-`) {
            res.push({
                content: char,
                type: 令牌类型.减号,
                index: i
            });
            i += 1
        } else if (char === `(`) {
            res.push({
                content: char,
                type: 令牌类型.左括号,
                index: i
            });
            i += 1
        } else if (char === `)`) {
            res.push({
                content: char,
                type: 令牌类型.右括号,
                index: i
            });
            i += 1
        } else if (char === `*`) {
            res.push({
                content: char,
                type: 令牌类型.乘号,
                index: i
            });
            i += 1
        } else if (char === `/`) {
            res.push({
                content: char,
                type: 令牌类型.除号,
                index: i
            });
            i += 1
        } else if (char === `^`) {
            res.push({
                content: char,
                type: 令牌类型.幂,
                index: i
            })
            i += 1
        } else if (char === `%`) {
            res.push({
                content: char,
                type: 令牌类型.取余,
                index: i
            })
            i += 1
        } else {
            throw `语法错误: 未知的符号 ${char}`
        }

        if (r?.error) {
            throw `error: ${r.error} 于位置 ${i}`
        }
    }
    // console.log("vi", res)
    return res;
}

export function 通用解析(tokens: 令牌[]): number {
    const arr = tokens;
    let operatorStack = [];
    let numStack = [];
    let precedence = {
        '(': -1,
        ')': 0,
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
        '%': 2,
        '^': 3,
    };
    let operator = {
        '+': (a: number, b: number) => a + b,
        '-': (a: number, b: number) => a - b,
        '*': (a: number, b: number) => a * b,
        '/': (a: number, b: number) => a / b,
        '%': (a: number, b: number) => a % b,
        '^': (a: number, b: number) => Math.pow(a,b),
    };
    function 计算两值() {
        // console.log("asd",numStack,operatorStack);

        let x = numStack.pop();
        let y = numStack.pop();
        let op = operatorStack.pop();
        let fn = operator[op];
        if (fn) {
            numStack.push(fn(y, x))
        }
    }
    for (let i = 0; i < arr.length; i++) {
        
        if (arr[i].type === `(`) {
            operatorStack.push(arr[i].content)
        } else if (arr[i].type === `number`) {
            numStack.push(Number(arr[i].content))
        } else if ("+-*/%()^".includes(arr[i].content)) {
            // let index= operatorStack.slice(-1)[0]
            //拿到符号栈的最后一位的值,来比较优先级
            // console.log("index", arr[i].type, operatorStack.slice(-1)[0]);
            // console.log("优先级", precedence[arr[i].type] <= precedence[operatorStack.slice(-1)[0]]);
            
            while (numStack.length >= 2 && operatorStack.length >= 1 && precedence[arr[i].type] <= precedence[operatorStack.slice(-1)[0]]) {
                // console.log("arr[i].type", arr[i].type);

                计算两值();
            }
            if (arr[i].type === `)`) {
                // console.log("1");

                operatorStack.pop()
            } else {
                operatorStack.push(arr[i].content)
            }
        }
    }
    while (numStack.length >= 2 && operatorStack.length >= 1) {
        // console.log("qwe");

        计算两值();
    }
    // console.log(numStack, operatorStack);
    // console.log("结果",numStack.pop());

    return numStack.pop();
}