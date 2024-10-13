import { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';

const styles = {
  container: {
    width: 'auto'
  },
  imageContainer: {
    width: '256px',
    height: '256px',
    border: '2px dashed #dee2e6',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    transition: 'border-color 0.2s',
    '&:hover': {
      borderColor: '#adb5bd'
    }
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '0.375rem'
  },
  uploadIcon: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  uploadText: {
    marginTop: '0.5rem',
    fontSize: '0.875rem',
    color: '#6c757d'
  }
};

export default function ImageInput() {
  const [image, setImage] = useState(null);
  
  useEffect(() => {
    const savedImage = localStorage.getItem('savedImage');
    if (savedImage) {
      setImage(savedImage);
    }
  }, []);

  const handleImageClick = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = handleFileSelect;
    fileInput.click();
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = e.target.result;
        setImage(newImage);
        localStorage.setItem('savedImage', newImage);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={styles.container}>
      <div 
        onClick={handleImageClick}
        style={styles.imageContainer}
        className="image-input"
      >
        {image ? (
          <img 
            src={image} 
            alt="Uploaded image" 
            style={styles.image}
          />
        ) : (
          <div style={styles.uploadIcon}>
            <Upload size={48} color="#6c757d" />
            <p style={styles.uploadText}>Click to upload image</p>
          </div>
        )}
      </div>
      {image && (
        <button 
          onClick={() => {
            setImage(null);
            localStorage.removeItem('savedImage');
          }}
          className="btn btn-danger"
        >
          Remove Image
        </button>
      )}
    </div>
  );
}