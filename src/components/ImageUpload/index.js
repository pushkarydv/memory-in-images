'use client';
import React, { useState, useCallback, useRef } from 'react';
import crypto from 'crypto-js';
import { toast } from 'sonner';

export default function ImageUpload() {
  const [files, setFiles] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('idle');
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const calculateChecksum = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const wordArray = crypto.lib.WordArray.create(e.target.result);
        const hash = crypto.SHA256(wordArray).toString();
        resolve(hash);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files?.length) {
      setFiles(Array.from(e.target.files));
    }
  };

  const processUploadedImages = async (uploadResults) => {
    try {
      const processResponse = await fetch('/api/process-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: uploadResults }),
      });

      if (!processResponse.ok) {
        throw new Error('Error processing images');
      }
    } catch (error) {
      toast.error('Error processing images');
      setUploadStatus('error');
      return;
    }
  };

  const uploadToCloudinary = async (file, checksum) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_unsigned');
    formData.append('public_id', checksum);
    formData.append('folder', 'uploads');

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    return response.json();
  };

  // Create thumbnail URL from original URL
  const getThumbnailUrl = (originalUrl) => {
    return originalUrl.replace('/upload/', '/upload/c_thumb,w_200,g_face/');
  };

  // Create low resolution URL for processing
  const getProcessingUrl = (originalUrl) => {
    return originalUrl.replace('/upload/', '/upload/q_auto:low,w_800/');
  };

  const handleUpload = useCallback(async () => {
    if(process.env.NEXT_PUBLIC_UPLOAD_DISABLED == 'true') {
      toast.error('Upload is disabled for demo, but you can fork the project and enable upload for you');
      return;
    }

    if (!files.length) return;

    setUploadStatus('uploading');
    setProgress(0);
    const uploadResults = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const checksum = await calculateChecksum(file);

        const cloudinaryResult = await uploadToCloudinary(file, checksum);

        const thumbnailUrl = getThumbnailUrl(cloudinaryResult.secure_url);
        const processingUrl = getProcessingUrl(cloudinaryResult.secure_url);

        uploadResults.push({
          id: checksum,
          originalUrl: cloudinaryResult.secure_url,
          thumbnailUrl: thumbnailUrl,
          url: processingUrl, // Added lower resolution URL for backend processing
          originalFilename: file.name,
        });

        setProgress(Math.round(((i + 1) / files.length) * 100));
      }

      setUploads(uploadResults);
      setUploadStatus('processing');

      await processUploadedImages(uploadResults);

      setUploadStatus('complete');

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setFiles([]);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('error');
    }
  }, [files]);

  const resetUpload = () => {
    setFiles([]);
    setUploads([]);
    setProgress(0);
    setUploadStatus('idle');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getStatusMessage = () => {
    switch (uploadStatus) {
      case 'uploading':
        return `Uploading images... ${progress}%`;
      case 'processing':
        return 'Processing your images...';
      case 'complete':
        return 'Upload complete!';
      case 'error':
        return 'Error uploading images. Please try again.';
      default:
        return '';
    }
  };

  return (
    <div className='card max-w-lg mx-auto bg-base-100 mt-[10vh]'>
      <div className='card-body'>
        <h2 className='card-title'>Upload Images</h2>

        <div className='form-control w-full'>
          <label className='label'>
            <span className='label-text'>Select images to upload</span>
          </label>
          <input
            ref={fileInputRef}
            type='file'
            multiple
            accept='image/*'
            className='file-input file-input-bordered w-full'
            onChange={handleFileChange}
            disabled={
              uploadStatus === 'uploading' || uploadStatus === 'processing'
            }
          />
          {files.length > 0 && (
            <label className='label'>
              <span className='label-text-alt'>
                {files.length} files selected
              </span>
            </label>
          )}
        </div>

        {(uploadStatus === 'uploading' || uploadStatus === 'processing') && (
          <div className='mt-2'>
            <progress
              className='progress progress-primary w-full'
              value={uploadStatus === 'processing' ? 100 : progress}
              max='100'
            ></progress>
            <p className='text-sm mt-1 text-center'>{getStatusMessage()}</p>
          </div>
        )}

        {uploadStatus === 'error' && (
          <div className='alert alert-error mt-2'>
            <span>{getStatusMessage()}</span>
          </div>
        )}

        <div className='card-actions justify-end mt-4'>
          {uploadStatus === 'complete' ? (
            <button className='btn btn-primary' onClick={resetUpload}>
              Upload More
            </button>
          ) : (
            <button
              className='btn btn-primary'
              onClick={handleUpload}
              disabled={
                uploadStatus === 'uploading' ||
                uploadStatus === 'processing' ||
                !files.length
              }
            >
              {uploadStatus === 'uploading'
                ? 'Uploading...'
                : uploadStatus === 'processing'
                ? 'Processing...'
                : 'Upload'}
            </button>
          )}
        </div>

        {uploads.length > 0 && (
          <div className='mt-4'>
            <h3 className='text-lg font-semibold mb-2'>
              Uploaded Images ({uploads.length})
            </h3>
            <div className='grid grid-cols-3 lg:grid-cols-5 gap-2'>
              {uploads.map((item, index) => (
                <div key={index} className='card bg-base-200'>
                  <figure className='h-24 w-full flex items-center justify-center overflow-hidden'>
                    <img
                      src={item.thumbnailUrl}
                      alt={item.originalFilename}
                      className='object-cover h-full w-full'
                      loading='lazy'
                    />
                  </figure>
                  <div className='card-body p-1'>
                    <p
                      className='text-xs truncate'
                      title={item.originalFilename}
                    >
                      {item.originalFilename.length > 15
                        ? `${item.originalFilename.substring(0, 12)}...`
                        : item.originalFilename}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
