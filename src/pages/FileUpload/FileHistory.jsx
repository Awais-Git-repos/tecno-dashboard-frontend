// import React, { useState, useEffect } from 'react';
// import { Box, Typography, TextField, LinearProgress, IconButton } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete'; // Import Delete icon
// import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'; // Generic file icon

// // FileHistory Component: Display history of uploaded files with dynamic data fetching
// function FileHistory() {
//   const [files, setFiles] = useState([]); // State to hold file data
//   const [filteredFiles, setFilteredFiles] = useState([]); // State for search functionality
//   const [loading, setLoading] = useState(true); // State to show loading bar
//   const [searchTerm, setSearchTerm] = useState(''); // State to manage search input

//   // Fetch file data from API
//   useEffect(() => {
//     const fetchFiles = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/fileupload/fileData');
//         const data = await response.json();
//         setFiles(data); // Set fetched data
//         setFilteredFiles(data); // Initialize filtered files with all data
//       } catch (error) {
//         console.error('Error fetching files:', error);
//       } finally {
//         setLoading(false); // Hide loading bar after fetching
//       }
//     };

//     fetchFiles();
//   }, []);

//   // Handle search input
//   const handleSearch = (event) => {
//     const value = event.target.value.toLowerCase();
//     setSearchTerm(value);
//     const filtered = files.filter((file) =>
//       file.filename.toLowerCase().includes(value)
//     );
//     setFilteredFiles(filtered);
//   };

//   return (
//     <Box
//       sx={{
//         width: '100%',
//         padding: 3,
//         marginTop: 4,
//         backgroundColor: '#2c2c2c',
//         color: '#fff',
//         borderRadius: 2,
//         boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
//       }}
//     >
//       <Typography variant="h5" sx={{ marginBottom: 2 }}>
//         File History
//       </Typography>

//       {/* Search box */}
//       <TextField
//         variant="outlined"
//         placeholder="Search files..."
//         value={searchTerm}
//         onChange={handleSearch}
//         sx={{
//           marginBottom: 2,
//           backgroundColor: '#fff',
//           borderRadius: 1,
//           width: '100%',
//         }}
//         inputProps={{
//           style: { padding: '10px', borderRadius: '4px' },
//         }}
//       />

//       {/* Loading bar */}
//       {loading && <LinearProgress sx={{ marginBottom: 2 }} />}

//       {/* Display file list */}
//       {!loading &&
//         filteredFiles.map((file) => (
//           <Box
//             key={file._id}
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               padding: 1,
//               backgroundColor: '#3c3c3c',
//               borderRadius: 1,
//               marginBottom: 1,
//             }}
//           >
//             {/* File icon and name */}
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <InsertDriveFileIcon sx={{ color: '#2196f3', marginRight: 1 }} />
//               <Typography variant="body1">{file.filename}</Typography>
//             </Box>

//             {/* File creation date */}
//             <Typography variant="body2" sx={{ marginRight: 2 }}>
//               {new Date(file.createdAt).toLocaleDateString()}
//             </Typography>

//             {/* Delete icon */}
//             <IconButton sx={{ color: '#f44336' }}>
//               <DeleteIcon />
//             </IconButton>
//           </Box>
//         ))}
//     </Box>
//   );
// }

// export default FileHistory;

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  LinearProgress,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import axios from 'axios';

function FileHistory() {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const infectedRecords = async()=>{
      try {
        const response = await axios.delete('http://localhost:3000/fileupload/fileError');
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
    const fetchFiles = async () => {
      try {
        const response = await fetch('http://localhost:3000/fileupload/fileData');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setFiles(data);
        setFilteredFiles(data);
      } catch (error) {
        console.error('Error fetching files:', error);
      } finally {
        setLoading(false);
      }
    };

    infectedRecords();
    fetchFiles();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = files.filter((file) =>
      file.filename.toLowerCase().includes(value)
    );
    setFilteredFiles(filtered);
  };

  const handleDeleteClick = (file) => {
    setFileToDelete(file);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = async () => {
    setOpenDialog(false);
    setDeleting(true);

    try {
      const response = await fetch('http://localhost:3000/fileupload/fileDelete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileId: fileToDelete.fileId }),
      });

      if (response.ok) {
        setFiles(prevFiles => prevFiles.filter(file => file.fileId !== fileToDelete.fileId));
        setFilteredFiles(prevFiles => prevFiles.filter(file => file.fileId !== fileToDelete.fileId));
      } else {
        console.error('Error deleting file');
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setOpenDialog(false);
  };

  return (
    <Box
      sx={{
        width: '100%',
        padding: 3,
        marginTop: 4,
        backgroundColor: '#2c2c2c',
        color: '#fff',
        borderRadius: 2,
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        File History
      </Typography>

      <TextField
        variant="outlined"
        placeholder="Search files..."
        value={searchTerm}
        onChange={handleSearch}
        sx={{
          marginBottom: 2,
          backgroundColor: '#fff',
          borderRadius: 1,
          width: '100%',
        }}
        inputProps={{
          style: { padding: '10px', borderRadius: '4px' },
        }}
      />

      {loading && <LinearProgress sx={{ marginBottom: 2 }} />}

      {!loading && filteredFiles.map(file => (
        <Box
          key={file._id}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 1,
            backgroundColor: '#3c3c3c',
            borderRadius: 1,
            marginBottom: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <InsertDriveFileIcon sx={{ color: '#2196f3', marginRight: 1 }} />
            <Typography variant="body1">{file.filename}</Typography>
          </Box>

          <Typography variant="body2" sx={{ marginRight: 2 }}>
            {new Date(file.createdAt).toLocaleDateString()}
          </Typography>

          <IconButton
            sx={{ color: '#f44336' }}
            onClick={() => handleDeleteClick(file)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}

      <Dialog open={openDialog} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this file?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="secondary"
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {deleting && <LinearProgress sx={{ marginTop: 2 }} />}
    </Box>
  );
}

export default FileHistory;
