import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, LinearProgress, Typography, IconButton, Button, CircularProgress, Snackbar } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert } from '@mui/material';
import FileHistory from './FileHistory';

function FileUpload() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false); // State to manage loading
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' }); // State for alerts

  // Handle file upload and simulate upload progress
  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
      size: file.size,
      uploaded: false, // Track upload status
    }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);

    // Simulate file upload progress
    newFiles.forEach((fileObj, index) => {
      simulateUpload(fileObj, index + files.length); // Adjust index to append to existing files
    });
  }, [files.length]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '.csv', // Only accept CSV files
  });

  // Simulate upload progress based on file size
  const simulateUpload = (fileObj, index) => {
    const uploadSpeed = 100000; // Bytes per interval (Adjust this speed)
    const interval = setInterval(() => {
      setFiles((currentFiles) => {
        const updatedFiles = [...currentFiles];
        const fileSize = fileObj.size;

        // Calculate progress based on file size
        if (updatedFiles[index]?.progress < 100) {
          const increment = (uploadSpeed / fileSize) * 100; // Calculate progress increment
          updatedFiles[index].progress = Math.min(updatedFiles[index].progress + increment, 100);
        } else {
          updatedFiles[index].uploaded = true; // Mark file as uploaded
          clearInterval(interval); // Stop when upload is complete
        }
        return updatedFiles;
      });
    }, 300); // Interval duration (Adjust for desired simulation speed)
  };

  // Handle removing a file
  const handleRemoveFile = (index) => {
    setFiles((currentFiles) => currentFiles.filter((_, i) => i !== index));
  };

  // Handle file upload confirmation
  const handleConfirm = async () => {
    setUploading(true); // Show loader

    const formData = new FormData();
    files.forEach((fileObj) => {
      formData.append('file', fileObj.file); // Use 'file' as the field name to match the backend
    });

    try {
      const response = await fetch('http://localhost:3000/fileupload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setAlert({ open: true, message: 'Files uploaded successfully', severity: 'success' });
        setFiles([]); // Clear files on successful upload
      } else {
        setAlert({ open: true, message: 'Error uploading files', severity: 'error' });
      }
    } catch (error) {
      setAlert({ open: true, message: 'Error uploading files', severity: 'error' });
    } finally {
      setUploading(false); // Hide loader
    }
  };

  // Handle alert close
  const handleAlertClose = () => {
    setAlert({ ...alert, open: false });
  };

  // Check if all files are uploaded
  const allFilesUploaded = files.every((fileObj) => fileObj.uploaded);

  return (
    <>
    <Box
      sx={{
        width: '100%',
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        padding: 3,
        border: '1px solid #444',
        borderRadius: 2,
        backgroundColor: '#121212', // Black background
        color: '#fff', // White text color for contrast
      }}
    >
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed #1976d2',
          padding: 3,
          borderRadius: 1,
          cursor: 'pointer',
          backgroundColor: isDragActive ? '#1e1e1e' : '#2c2c2c',
          transition: 'background-color 0.3s',
          '&:hover': {
            backgroundColor: '#1e1e1e',
          },
        }}
      >
        <input {...getInputProps()} />
        <CloudUploadIcon sx={{ fontSize: 40, color: '#1976d2' }} />
        <Typography variant="h6" sx={{ marginTop: 1 }}>
          {isDragActive ? 'Drop the files here ...' : 'Drag & Drop files here or Click to select'}
        </Typography>
      </Box>

      {/* Note indicating only CSV files are accepted */}
      <Typography
        variant="body2"
        sx={{
          marginTop: 2,
          color: '#9e9e9e',
          backgroundColor: '#2c2c2c',
          padding: '8px 12px',
          borderRadius: 1,
          fontStyle: 'italic',
        }}
      >
        Note: Only CSV files are accepted.
      </Typography>

      {/* Display selected files and their upload progress */}
      {files.map((fileObj, index) => (
        <Box
          key={index}
          sx={{
            marginTop: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body1">{fileObj.file.name}</Typography>
            <LinearProgress
              variant="determinate"
              value={fileObj.progress}
              sx={{ height: 8, borderRadius: 5, marginTop: 1, backgroundColor: '#333' }}
            />
            <Typography variant="caption" display="block" sx={{ marginTop: 0.5 }}>
              {fileObj.progress.toFixed(2)}%
            </Typography>
          </Box>
          <IconButton onClick={() => handleRemoveFile(index)} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}

      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
        onClick={handleConfirm}
        disabled={uploading || !allFilesUploaded} // Disable button while uploading or if not all files are uploaded
      >
        {uploading ? <CircularProgress size={24} sx={{ color: '#ffffff' }} /> : 'Confirm Upload'}
      </Button>

      {/* Alert for upload status */}
      <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
    <Box sx={{width:'100%'}}>
      <FileHistory />
    </Box>
    </>
  );
}

export default FileUpload;





