
export function 随机数(Min, Max): number {

    let Range = Max - Min;
    let Rand = Math.random();
    return (Min + Math.round(Rand * Range));

}
// 3+4
// ((123 + 456)(*2+3*4) + 4

export function 随机运算符(): string {
    let str = ["+", "-", "*", "/", "^", "%"];
    let res = "";
    for (let i = 0; i < str.length; i++) {
        let id = Math.round(Math.random() * 5);
        res = str[id];
    }
    return res;
}
// ((()))

export function 生成算术(): string {
    let res = '';
    let flag = false;
    for (let i = 0; i < 随机数(1, 5);) {
        if (res !== '') {
            res += 随机运算符();
            i++;
        }
        if (Math.random() > 0.5) {
            res += "("
            flag = true
        }
        res += 随机数(0, 20);
        res += 随机运算符();
        // if (Math.random() > 0.5) {
        //     res += "("
        //     flag = true
        // }
        res += 随机数(0, 20);
        for (let i = 0; i < 随机数(0, 2); i++) {
            res += 随机运算符();
            res += 随机数(0, 20);
        }
        i++;
        if (flag) {
            res += ")"
            flag = false;
        }
    }



    return res;
}