function ReportFooter() {
  return (
    <div style={{ fontSize: "14px" }} className="flex font-bold justify-between mt-10">
      <div className='text-center  mx-1  border-gray-950 px-1'>
        <span className='pb-1 border-t px-2 border-gray-900 text-nowrap'>Received By</span>
      </div>
      <div className='text-center  mx-1  border-gray-950 px-1'>
        <span className='pb-1 border-t px-2 border-gray-900 text-nowrap'>Store In-Charge</span>
      </div>
      <div className='text-center  mx-1  border-gray-950 px-1'>
        <span className='pb-1 border-t px-2 border-gray-900 text-nowrap'>Manager(Yarn)</span>
      </div>
      <div className='text-center  mx-1  border-gray-950 px-1'>
        <span className='pb-1 border-t px-2 border-gray-900 text-nowrap'>DGM(Knitting)</span>
      </div>
      <div className='text-center  mx-1  border-gray-950 px-1'>
        <span className='pb-1 border-t px-2 border-gray-900 text-nowrap'>Authorized Sign</span>
      </div>
    </div>
  );
}

export default ReportFooter;
