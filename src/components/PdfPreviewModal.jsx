const PdfPreviewModal = ({ pdfUrl, onClose }) => {
  if (!pdfUrl) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg overflow-hidden w-[90%] h-[90%] relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute bottom-2 left-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 z-10"
        >
          Close
        </button>
        <iframe
          src={pdfUrl}
          title="PDF Preview"
          className="w-full h-full border-none"
        />
      </div>
    </div>
  );
};

export default PdfPreviewModal;
