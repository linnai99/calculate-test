import { 解析数字,分词,通用解析 } from '../src/表达式'
import { 生成算术,随机运算符,随机数 } from '../src/算术'
test('临时测试', () => {
    const t = `(1+2)*3`
    
    // console.log(分词(t));
    // console.log(解析加法(分词(`3+2`)));
    
    // console.log(解析乘法(分词(t)));
    
    // console.log(分词(t));
    // console.log(通用解析(分词(`1-3`)));
    expect(通用解析(分词(`1+1`))).toBe(2)
    expect(通用解析(分词(`1*2`))).toBe(2)
    expect(通用解析(分词(`1/1`))).toBe(1)
    expect(通用解析(分词(`(1+1)*2`))).toBe(4)
    expect(通用解析(分词(`1-3`))).toBe(-2)
    expect(通用解析(分词(`(1+2)*2/3`))).toBe(2)
    expect(通用解析(分词(`2%1`))).toBe(0)
    expect(通用解析(分词(`2^3`))).toBe(8)
    expect(通用解析(分词(`1+2+(1+1)*2+2^3`))).toBe(15)
    // expect(通用解析(分词(`(4*4)*5/11-(1^7)`))).toBe(2)
    // expect(通用解析(分词(生成算术()))).toBe(2)
  })
  