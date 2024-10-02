import React, { useState } from 'react';
import walimg1 from '../../public/wal1.jpg'
import walimg2 from '../../public/wal2.jpg'
import walimg3 from '../../public/wal3.jpeg'
import walimg4 from '../../public/wal4.jpeg'
import walimg5 from '../../public/wal5.jpeg'
import walimg6 from '../../public/wal6.jpeg'
import walimg7 from '../../public/wal7.jpeg'
import walimg8 from '../../public/wal8.jpeg'
import walimg9 from '../../public/wal9.jpeg'
export default function Explorepage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Array of images
  const images = [
    walimg1,walimg2,walimg3,walimg4,
    walimg5,walimg6,walimg7,walimg8,walimg9
  ];

  // Function to open the modal and set the clicked image
  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className='explorepage'>
      <h1 style={{ textAlign: 'center', paddingTop: '40px', fontFamily: 'arial' }}>Explore All</h1>
      
      {/* Display image gallery */}
      <div className="image-gallery">
        {images.map((image, index) => (
          <div className="box div" key={index} style={{ position: 'relative', margin: '20px' }}onClick={() => openModal(image)}>               

            <img className='w-full rounded' src={image} alt={`Design ${index + 1}`} style={{ width: '400px', height: '400px' }} />
            <div className="textbox1">
              <h4>Office Style</h4>
              <h5>Get more ideas about office room design</h5>
            </div>
          </div>
        ))}
      </div>

      {/* Modal to show full-size image */}
      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>&times;</span>
            <img src={selectedImage} alt="Full Size" className="full-image" />
          </div>
        </div>
      )}

      {/* Styles */}
      <style jsx>{`
        .image-gallery{
        display:flex;
        flex-wrap:wrap;
        gap:50px;
        margin:60px;
        }
        .modal {
          position: fixed;
          z-index: 1000;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal-content {
          position: relative;
          background-color: #fff;
          padding: 20px;
          border-radius: 5px;
          max-width: 80%;
          max-height: 80%;
          overflow: hidden;
        }

        .close {
          position: absolute;
          top: 10px;
          right: 20px;
          font-size: 30px;
          cursor: pointer;
        }

        .full-image {
          max-width: 100%;
          max-height: 50%;
        }

      `}</style>
    </div>
  );
}
