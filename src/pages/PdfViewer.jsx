import React, { useEffect, useState } from 'react';
import { Viewer, usePrevious } from '@react-pdf-viewer/core';
import { Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './pdf.css';
import Button from 'react-bootstrap/esm/Button';
function PdfViewer() {
  const [pdffile, setPdfFile] = useState(null);
  const params = useParams();
  //   console.log(params.id);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/auth/pdfViewer/${params.id}`)
      .then((res) => {
        setPdfFile(res.data.data[0]);
      })
      .catch((err) => console.log(err.message));
  }, [params.id]);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  console.log(pdffile);
  return (
    <div className={`pdfbox`}>
      {pdffile && (
        <h1 className='text-center my-2 text-info text-capitalize'>
          {pdffile.name}
        </h1>
      )}
      {pdffile && (
        <>
          {pdffile.pdf === null ? (
            <p>Not Found</p>
          ) : (
            <div className='pdf-container'>
              <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
                <Viewer
                  fileUrl={`http://localhost:4000/images/${pdffile.pdf}`}
                  plugins={[defaultLayoutPluginInstance]}
                ></Viewer>
              </Worker>
            </div>
          )}
        </>
      )}
      <div className='text-center'>
        <Link to={'/student/dashbord/'}>
          <Button variant='info'>Back</Button>
        </Link>
      </div>
    </div>
  );
}

export default PdfViewer;
