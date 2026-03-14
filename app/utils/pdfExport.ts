import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * PDF 导出选项
 */
export interface PDFExportOptions {
  filename?: string;
  format?: 'a4' | 'letter';
  orientation?: 'portrait' | 'landscape';
  quality?: number;
  scale?: number;
}

/**
 * 导出元素为 PDF
 * @param element 要导出的 DOM 元素
 * @param options 导出选项
 */
export async function exportToPDF(
  element: HTMLElement,
  options: PDFExportOptions = {},
): Promise<void> {
  const {
    filename = 'copybook.pdf',
    format = 'a4',
    orientation = 'portrait',
    quality = 0.98,
    scale = 2,
  } = options;

  try {
    // 使用 html2canvas 将元素转换为 canvas
    const canvas = await html2canvas(element, {
      scale,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight,
    });

    // 计算 PDF 尺寸
    const pdfWidth = format === 'a4' ? 210 : 216; // mm
    const pdfHeight = format === 'a4' ? 297 : 279; // mm

    const imgWidth = orientation === 'portrait' ? pdfWidth : pdfHeight;
    const imgHeight = orientation === 'portrait' ? pdfHeight : pdfWidth;

    // 计算图片在 PDF 中的尺寸
    const imgData = canvas.toDataURL('image/png', quality);
    const imgAspectRatio = canvas.width / canvas.height;
    const pdfAspectRatio = imgWidth / imgHeight;

    let finalWidth = imgWidth;
    let finalHeight = imgHeight;

    if (imgAspectRatio > pdfAspectRatio) {
      // 图片更宽，以宽度为准
      finalHeight = imgWidth / imgAspectRatio;
    } else {
      // 图片更高，以高度为准
      finalWidth = imgHeight * imgAspectRatio;
    }

    // 创建 PDF
    // eslint-disable-next-line new-cap
    const pdf = new jsPDF({
      orientation,
      unit: 'mm',
      format: [imgWidth, imgHeight],
    });

    // 如果内容超过一页，需要分页处理
    const pageHeight = imgHeight;
    let heightLeft = finalHeight;
    let position = 0;

    // 添加第一页
    pdf.addImage(imgData, 'PNG', 0, position, finalWidth, finalHeight);

    heightLeft -= pageHeight;

    // 如果内容超过一页，添加新页
    while (heightLeft > 0) {
      position = heightLeft - finalHeight;
      pdf.addPage([imgWidth, imgHeight]);
      pdf.addImage(imgData, 'PNG', 0, position, finalWidth, finalHeight);
      heightLeft -= pageHeight;
    }

    // 保存 PDF
    pdf.save(filename);
  } catch (error) {
    console.error('PDF export failed:', error);
    throw new Error('PDF 导出失败，请稍后重试');
  }
}

/**
 * 导出多个元素为多页 PDF
 * @param elements 要导出的 DOM 元素数组
 * @param options 导出选项
 */
export async function exportMultipleToPDF(
  elements: HTMLElement[],
  options: PDFExportOptions = {},
): Promise<void> {
  const {
    filename = 'copybook.pdf',
    format = 'a4',
    orientation = 'portrait',
    quality = 0.98,
    scale = 2,
  } = options;

  try {
    const pdfWidth = format === 'a4' ? 210 : 216; // mm
    const pdfHeight = format === 'a4' ? 297 : 279; // mm

    const imgWidth = orientation === 'portrait' ? pdfWidth : pdfHeight;
    const imgHeight = orientation === 'portrait' ? pdfHeight : pdfWidth;

    // eslint-disable-next-line new-cap
    const pdf = new jsPDF({
      orientation,
      unit: 'mm',
      format: [imgWidth, imgHeight],
    });

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];

      // 转换每个元素为 canvas
      const canvas = await html2canvas(element, {
        scale,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: element.scrollWidth,
        height: element.scrollHeight,
      });

      const imgData = canvas.toDataURL('image/png', quality);
      const imgAspectRatio = canvas.width / canvas.height;
      const pdfAspectRatio = imgWidth / imgHeight;

      let finalWidth = imgWidth;
      let finalHeight = imgHeight;

      if (imgAspectRatio > pdfAspectRatio) {
        finalHeight = imgWidth / imgAspectRatio;
      } else {
        finalWidth = imgHeight * imgAspectRatio;
      }

      // 如果不是第一页，添加新页
      if (i > 0) {
        pdf.addPage([imgWidth, imgHeight]);
      }

      // 添加图片到 PDF
      pdf.addImage(imgData, 'PNG', 0, 0, finalWidth, finalHeight);
    }

    // 保存 PDF
    pdf.save(filename);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('PDF export failed:', error);
    throw new Error('PDF 导出失败，请稍后重试');
  }
}
