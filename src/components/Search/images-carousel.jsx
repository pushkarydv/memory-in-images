import { Download } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

const ImagesCarousel = ({ images }) => {
  function downloadImage(url, res) {
    if (!['original', '75%', '50%', '25%'].includes(res)) {
      toast.error('Invalid resolution');
      return;
    }
  
    let downloadUrl = url;
  
    if (url.includes('cloudinary.com')) {
      const widthMatch = url.match(/w_(\d+)/);
      
      if (widthMatch && widthMatch[1]) {
        const originalWidth = parseInt(widthMatch[1]);
        
        if (res === 'original') {
          downloadUrl = url
            .replace(/q_auto:low/, 'q_auto:best')
            .replace(/c_scale,/, '')
            .replace(/w_\d+/, 'fl_attachment');
        } else {
          const scale = res === '75%' ? 0.75 : (res === '50%' ? 0.5 : 0.25);
          const newWidth = Math.round(originalWidth * scale);
          downloadUrl = downloadUrl.replace(/w_\d+/, `w_${newWidth},fl_attachment`);
        }
      }
    }
  
    const urlParts = url.split('/');
    const lastPart = urlParts[urlParts.length - 1].split('?')[0];
    let filename = (lastPart && lastPart.length > 0 && lastPart.length < 100) ? lastPart : 'image';
    
    if (res !== 'original') {
      const hasExt = filename.includes('.');
      const extension = hasExt ? filename.substring(filename.lastIndexOf('.')) : '.jpg';
      const nameWithoutExt = hasExt ? filename.substring(0, filename.lastIndexOf('.')) : filename;
      filename = `${nameWithoutExt}_${res.replace('%', 'pct')}${extension}`;
    }
  
    if (url.includes('cloudinary.com')) {
      downloadUrl = downloadUrl.includes('?') ? 
        `${downloadUrl}&attachment=${encodeURIComponent(filename)}` : 
        `${downloadUrl}?attachment=${encodeURIComponent(filename)}`;
      window.location.href = downloadUrl;
    } else {
      fetch(downloadUrl)
        .then(response => response.blob())
        .then(blob => {
          const blobUrl = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(blobUrl);
        })
        .catch(error => {
          toast.error('Download failed');
          console.error('Download error:', error);
        });
    }
  }

  return (
    <div className='carousel carousel-vertical rounded-box max-h-dvh max-w-sm mx-auto'>
      {images.map((image, index) => (
        <div
          key={index}
          className='carousel-item w-full h-full bg-black flex items-center justify-center relative'
        >
          <img
            src={image.url}
            className='object-contain max-h-full max-w-full'
            alt={`Image ${index + 1}`}
          />
          <div className='absolute left-4 bottom-4 bg-white/80 p-2 text-sm rounded-full border-2 border-white'>
            {image.match}% Match
          </div>
          <div className='dropdown dropdown-top dropdown-end absolute right-4 bottom-4'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-square btn-success m-1'
            >
              <Download />
            </div>
            <ul
              tabIndex={0}
              className='dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm'
            >
              {['original', '75%', '50%', '25%'].map((res) => (
                <li
                  key={res}
                  onClick={() => {
                    downloadImage(image.url, res);
                  }}
                  className='p-1 cursor-pointer hover:bg-base-200 rounded-lg'
                >
                  {res.toUpperCase()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImagesCarousel;
