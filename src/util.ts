import * as path from "path";
import * as fs from 'fs'

const TYPE_MAP = {
  "[object String]": "string",
  "[object Number]": "number",
  "[object Boolean]": "boolean",
  "[object Null]": "null",
  "[object Array]": "array",
  "[object Object]": "Record<string,any>",
};

export function getType(x) {
	return TYPE_MAP[Object.prototype.toString.call(x)] || "undefined";
}
/**
 * 确认给定文件路径存在，如果存在，创建目录
 * @param filePath 文件路径
 */
export function ensureDirectoryExists(filePath: string) {
  // 获取文件所在的目录
  const dir = path.dirname(filePath);
  // 如果目录不存在
  if (!fs.existsSync(dir)) {
    // 递归创建目录
    fs.mkdirSync(dir, { recursive: true });
  }
}
/**
 * 向给定文件路径写入内容
 * @param filePath 文件路径 
 * @param content 写入内容
 * @param options 写入选项
 */
export function writeFileWithPath(filePath: string, content: string, options?: fs.WriteFileOptions) {
  // 确保目录存在
  ensureDirectoryExists(filePath);
  // 写入文件
  fs.writeFileSync(filePath, content, options);
}
