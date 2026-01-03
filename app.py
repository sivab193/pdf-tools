import os
import io
import requests
import pikepdf
from flask import Flask, render_template, request, send_file, redirect, url_for, flash

app = Flask(__name__)
app.secret_key = os.urandom(24)

def split_pdf(pdf_stream, start_page, end_page):
    """Splits a PDF byte stream and returns the new PDF as a byte stream."""
    try:
        with pikepdf.open(pdf_stream) as pdf:
            total = len(pdf.pages)
            if start_page < 1 or end_page < start_page or end_page > total:
                return None, f"Invalid range. PDF has {total} pages, got {start_page}-{end_page}"

            out = pikepdf.Pdf.new()
            out.pages.extend(pdf.pages[start_page - 1 : end_page])

            output_buffer = io.BytesIO()
            out.save(
                output_buffer,
                compress_streams=True,
                object_stream_mode=pikepdf.ObjectStreamMode.generate,
            )
            output_buffer.seek(0)
            return output_buffer, None
    except Exception as e:
        return None, str(e)

@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")

@app.route("/process", methods=["POST"])
def process():
    try:
        start_page = int(request.form.get("start_page", 1))
        end_page = int(request.form.get("end_page", 1))
        
        pdf_source = request.form.get("source")
        pdf_stream = None
        filename = "split_output.pdf"

        if pdf_source == "upload":
            file = request.files.get("file")
            if not file or file.filename == "":
                flash("No file selected")
                return redirect(url_for("index"))
            pdf_stream = io.BytesIO(file.read())
            filename = f"split_{file.filename}"
        elif pdf_source == "url":
            url = request.form.get("url")
            if not url:
                flash("No URL provided")
                return redirect(url_for("index"))
            
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            pdf_stream = io.BytesIO(response.content)
            filename = "split_from_url.pdf"
        else:
            flash("Invalid source")
            return redirect(url_for("index"))

        output_stream, error = split_pdf(pdf_stream, start_page, end_page)
        
        if error:
            flash(error)
            return redirect(url_for("index"))

        return send_file(
            output_stream,
            mimetype="application/pdf",
            as_attachment=True,
            download_name=filename
        )

    except Exception as e:
        flash(f"Error: {str(e)}")
        return redirect(url_for("index"))

if __name__ == "__main__":
    app.run(debug=True)
