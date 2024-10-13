constructor(@Inject(PLATFORM_ID) private platformId:Object){

}
async downloadPDF() {
  if (isPlatformBrowser(this.platformId)) {
    const element = document.getElementById('resume-preview');
  
    // Apply PDF layout styles before generating the PDF
    element?.classList.add('pdf-layout');
  
    const html2pdf = await import('html2pdf.js');
  
    const opt = {
      margin: 0, // Remove margin
      filename: `${ 'resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
  
    // Generate the PDF
    html2pdf.default().from(element).set(opt).toPdf().get('pdf').then((pdf: any) => {
      const totalPages = pdf.internal.getNumberOfPages();
  
      // Add page numbers
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(10);
        // pdf.text(`Page ${i} of ${totalPages}`, pdf.internal.pageSize.getWidth() / 2, pdf.internal.pageSize.getHeight() - 0.5, { align: 'center' });
      }
    }).save().then(() => {
      // Clean up and remove the added class after download
      element?.classList.remove('pdf-layout');
    });
  } else {
    console.log("This code is running on the server.");
  }
  
}