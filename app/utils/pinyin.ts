import { pinyin } from 'pinyin-pro';

// 拼音缓存
const pinyinCache = new Map<string, string>();

/**
 * 获取单个汉字的拼音
 * @param char 汉字字符
 * @returns 拼音字符串
 */
export function getPinyin(char: string): string {
  if (!char || !/[\u4e00-\u9fa5]/.test(char)) {
    return '';
  }

  // 检查缓存
  if (pinyinCache.has(char)) {
    return pinyinCache.get(char)!;
  }

  try {
    const result = pinyin(char, { toneType: 'symbol' });
    pinyinCache.set(char, result);
    return result;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(`Failed to get pinyin for "${char}":`, error);
    return '';
  }
}

/**
 * 获取词组的拼音（每个字用空格分隔）
 * @param phrase 词组字符串
 * @returns 拼音字符串，每个字的拼音用空格分隔
 */
export function getPhrasePinyin(phrase: string): string {
  if (!phrase) {
    return '';
  }

  const chars = phrase.split('');
  const pinyins = chars.map((char) => getPinyin(char)).filter(Boolean);
  return pinyins.join(' ');
}

/**
 * 获取文本中所有汉字的拼音映射
 * @param text 文本字符串
 * @returns 汉字到拼音的映射对象
 */
export function getPinyinMap(text: string): Record<string, string> {
  const map: Record<string, string> = {};
  const chars = text.split('').filter((char) => /[\u4e00-\u9fa5]/.test(char));

  chars.forEach((char) => {
    if (!map[char]) {
      map[char] = getPinyin(char);
    }
  });

  return map;
}

/**
 * 清除拼音缓存
 */
export function clearPinyinCache(): void {
  pinyinCache.clear();
}
