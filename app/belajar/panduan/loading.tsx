export default function Loading() {
    return (
        <div className="w-[1920px] h-[1080px] px-8 pt-6 pb-24 bg-Greyscale-50 inline-flex flex-col justify-center items-center">
            <div className="size-[631px] relative overflow-hidden">
                <div className="w-36 h-56 left-[100.25px] top-[123.48px] absolute bg-blue-600" />
                <div className="w-36 h-56 left-[104.29px] top-[127.67px] absolute bg-blue-400" />
                <div className="w-80 h-72 left-[193.92px] top-[208.84px] absolute bg-blue-400" />
                <div className="size-28 left-[413.64px] top-[376.77px] absolute bg-blue-600" />
                <div className="size-28 left-[417.64px] top-[380.93px] absolute bg-blue-400" />
                <div className="w-28 h-40 left-[364.70px] top-[212.11px] absolute bg-blue-600" />
                <div className="w-24 h-10 left-[324.37px] top-[450.52px] absolute bg-blue-600" />
                <div className="w-2 h-px left-[320.73px] top-[488.02px] absolute bg-blue-500" />
                <div className="w-20 h-12 left-[288.29px] top-[359.01px] absolute bg-neutral-800" />
                <div className="w-9 h-6 left-[304.92px] top-[383.62px] absolute bg-red-500" />
                <div className="w-12 h-8 left-[262.23px] top-[305.21px] absolute bg-neutral-800" />
                <div className="w-12 h-8 left-[351.38px] top-[314.18px] absolute bg-neutral-800" />
                <div className="w-4 h-12 left-[232.48px] top-[129.64px] absolute bg-blue-400" />
                <div className="w-5 h-11 left-[84.03px] top-[115.23px] absolute bg-blue-400" />
            </div>
            <div className="self-stretch flex flex-col justify-start items-start">
                <div className="self-stretch flex flex-col justify-start items-center gap-4">
                    <div className="w-[560px] text-center justify-start text-Greyscale-800 text-2xl font-semibold font-['Geist'] leading-7">
                        Selamat datang di AksaRasa 👋
                    </div>
                    <div className="w-96 text-center justify-start text-gray-500 text-xl font-normal font-['Geist'] leading-6">
                        Kami akan menyesuaikan pengalaman belajarmu agar lebih
                        nyaman dan efektif.
                    </div>
                </div>
            </div>
        </div>
    );
}
