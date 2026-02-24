
function AppBar() {
  return (
    <>
    <div className='flex flex-row justify-between px-6 py-3  shadow-sm items-center h-14 '>
        {"PayTM App"}
        <div className='flex flex-row gap-3 items-center'>
            {"Hello" + " " + "User"}
            <div className='rounded-3xl bg-slate-700 p-4'>
            </div>
        </div>
    </div>
    </>
  )
}

export default AppBar