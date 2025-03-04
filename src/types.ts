
export type ParserType = 'constant' | 'auto' | ((key: string, value: any) => any)
export type ArrayType = 'array' | 'tuple'

export interface OptionsType {
  path?: string
  prefix?: string
  parser: ParserType
  arrayType?: ArrayType
}
