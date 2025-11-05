/* eslint-disable react/prop-types */

const ConfirmationModal = ({
  title,
  content,
  skipBtnContent,
  confirmBtnContent,
  loading,
  onClose,
  onSubmit,
}) => {
  return (
    <div className="fixed inset-0 bg-[#04080680] bg-opacity-0 z-50 flex items-center justify-center">
      <div className="border border-gray-700 background-gradient  rounded-2xl p-6 w-[400px] text-center shadow-lg">
        <div className="flex flex-col items-center">
          <p className="text-[24px] text-white font-semibold">{title}</p>
          <p className="text-[16px] text-white  text-center">{content}</p>

          <div className="flex justify-between items-center gap-4 w-[280px] pt-2">
            <button
              onClick={() => onClose()}
              className="border-[1px] text-[12px] text-white font-[500] rounded-md border-[#E3DBDB] py-3 w-[160px]"
            >
              {skipBtnContent}
            </button>
            <button
              onClick={() => onSubmit()}
              className="bg-[#DC1D00] text-[12px] font-[500] text-[#ffffff] rounded-md py-3 w-[160px]"
            >
              {loading === "loading" ? "Loading..." : confirmBtnContent}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
