import { randomUUID } from 'crypto';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function generateImage(ele: HTMLElement) {
    return html2canvas(ele).then((canvas) => {
        const imgUrl = canvas.toDataURL('image/png');
        return imgUrl;
    });
}

export function downloadFileByUrl(url: string) {
    const a = document.createElement('a');
    a.href = url;
    a.download = 'study_download';
    a.click();
}

export async function generatePdf(ele: HTMLElement) {
    // 使用 html2canvas 将 HTML 元素渲染为 Canvas
    const canvas = await html2canvas(ele, {
        scrollX: 0, // 确保不会因为滚动条而丢失内容
        scrollY: 0,
        useCORS: true, // 如果需要跨域加载图片等资源，开启 CORS
    });

    // 获取 Canvas 的尺寸
    const contentWidth = canvas.width;
    const contentHeight = canvas.height;

    // 创建 jsPDF 对象，设置单位为 'pt'，页面大小为 A4
    const pdf = new jsPDF('p', 'pt', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // 计算 Canvas 内容与 PDF 页面的比例
    const ratio = Math.min(pdfWidth / contentWidth, pdfHeight / contentHeight);
    const canvasWidth = contentWidth * ratio;
    // 将 Canvas 转换为图片数据
    const pageData = canvas.toDataURL('image/jpeg', 1.0);

    // 如果 Canvas 内容大于 PDF 页面，分页添加到 PDF
    let remainingHeight = contentHeight;
    let yPosition = 0;

    while (remainingHeight > 0) {
        // 计算当前页面可容纳的高度
        const pageHeight = Math.min(pdfHeight, remainingHeight * ratio);

        // 添加图片到 PDF 页面
        pdf.addImage(pageData, 'JPEG', 0, yPosition, canvasWidth, pageHeight);

        // 更新剩余高度和 Y 位置
        remainingHeight -= pageHeight / ratio;
        yPosition += pageHeight;

        // 如果还有剩余内容，添加新页面
        if (remainingHeight > 0) {
            pdf.addPage();
        }
    }

    // 保存 PDF
    pdf.save('test.pdf');
}
