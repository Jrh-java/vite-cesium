export function A(a: string, b: string, c: string): void;
export function A(a: string, c: string, d: string,e:string): void
export function A(a: string, bOrC: string, cOrD: string,e?:string): void {
  if (arguments.length === 3) {
    console.log("调用了第一个重载版本");
    console.log(a, bOrC, cOrD,e);
  } else if (arguments.length === 4) {
    console.log("调用了第二个重载版本");
    console.log(a, bOrC, cOrD,e);
  } else {
    throw new Error("参数个数不匹配");
  }
}