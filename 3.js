function doPost(e) {
    try {
      const params = e.parameter;
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
      const name = params.name || "";
      const email = params.email || "";
      const phone = params.phone || "";
      const school = params.school || "";
      const tool = params.tool || "";
      const mikrobotik = params.mikrobotik || "";
      const reka_edukit = params.reka_edukit || "";
      const startDate = params.start_date || "";
      const endDate = params.end_date || "";
      const comments = params.comments || "";
      const fileData = params.filedata || "";
  
      let fileUrl = "";
      if (fileData) {
        const folder = DriveApp.getFolderById("1n-XlaMCUcdMstK3GhE1DYjb8NzWw8aKh");
        const blob = Utilities.newBlob(Utilities.base64Decode(fileData), MimeType.PDF, "Uploaded_Request.pdf");
        const file = folder.createFile(blob);
        fileUrl = file.getUrl();
      }
  
      sheet.appendRow([
        new Date(), name, email, phone, school,
        tool, mikrobotik, reka_edukit,
        startDate, endDate, comments,
        fileUrl
      ]);
  
      MailApp.sendEmail({
        to: email,
        subject: "Konfirmasi Peminjaman Alat",
        htmlBody: `Halo ${name},<br><br>Terima kasih telah mengajukan peminjaman alat. Permohonan Anda sedang diproses.<br><br>Detail:<br>
                   <b>Alat:</b> ${tool}<br>
                   <b>Tanggal:</b> ${startDate} s.d. ${endDate}<br><br>
                   Kami akan segera menghubungi Anda.`
      });
  
      return ContentService.createTextOutput("Form berhasil dikirim. Terima kasih!")
        .setMimeType(ContentService.MimeType.TEXT);
  
    } catch (error) {
      Logger.log("Error occurred: " + error.toString());
      Logger.log("Stack trace: " + (error.stack || "No stack trace available"));
      console.log("Error occurred:", error);
  
      return ContentService.createTextOutput("Terjadi kesalahan. Silakan coba lagi.")
        .setMimeType(ContentService.MimeType.TEXT);
    }
  }
  