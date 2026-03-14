export interface CopybookConfig {
  // 基础设置
  text: string;
  gridType: 'tian' | 'mi' | 'none';

  // 显示设置
  showPinyin: boolean;
  showStrokeOrder: boolean;
  highlightFirst: boolean;

  // 排版设置
  insertEmptyRows: number;
  insertEmptyCols: number;
  gridSize: number; // mm
  lineSpacing: number; // mm
  charSpacing: number; // px（仅段落）
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };

  // 字体设置
  fontFamily: string;
  fontWeight: number; // 100-900
  fontSize: number; // 百分比
  verticalOffset: number; // 百分比

  // 颜色设置
  traceCount: number;
  traceColor: string;
  lineColor: string;
}

export interface EnglishCopybookConfig {
  // 基础设置
  text: string;
  fontStyle: string;
  caseMode: 'original' | 'lower' | 'upper' | 'capitalize';

  // 显示设置
  enableTrace: boolean;
  highlightFirst: boolean;

  // 排版设置
  insertEmptyRows: number;
  lineHeight: number; // mm
  lineSpacing: number; // mm
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };

  // 字体设置
  fontSize: number; // 百分比
  verticalOffset: number; // 百分比

  // 颜色设置
  traceColor: string;
  lineColor: string;
}
