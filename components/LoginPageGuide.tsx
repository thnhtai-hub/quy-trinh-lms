import React, { useState, useRef } from 'react';
import BackButton from './BackButton';

interface LoginPageGuideProps {
  onNavigateBack: () => void;
}

// --- SVG Icons ---
const SchoolIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
);

const GoogleIcon: React.FC = () => (
    <svg className="h-6 w-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
);

const FacebookIcon: React.FC = () => (
    <svg className="h-6 w-6" fill="#1877F2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
    </svg>
);

// --- Mock UI Components ---
const LoginMockup: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title = "Đăng nhập" }) => (
    <div className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-6 border border-slate-200">
        <div className="text-center">
            <img src="https://i.postimg.cc/WzhKQ3QF/Logo_Hoccungai.png" alt="Logo Hoccungai" className="w-20 h-20 mx-auto" />
            <h2 className="text-3xl font-bold text-slate-800 mt-4">HỌC CÙNG AI</h2>
            <p className="text-2xl text-slate-600 mt-4">{title}</p>
        </div>
        {children}
    </div>
);

const MockButton: React.FC<{ children: React.ReactNode; icon?: React.ReactNode, active?: boolean }> = ({ children, icon, active }) => (
    <button className={`w-full flex items-center justify-center gap-3 py-4 px-4 border rounded-lg font-semibold transition-all duration-300 text-base ${
        active 
        ? 'border-orange-500 bg-orange-50 text-orange-700 ring-4 ring-orange-200' 
        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
    }`}>
        {icon}
        <span>{children}</span>
    </button>
);

const MockPrimaryButton: React.FC<{ children: React.ReactNode; active?: boolean; onClick?: () => void; disabled?: boolean }> = ({ children, active, onClick, disabled }) => (
     <button onClick={onClick} disabled={disabled} className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 text-base ${
         active 
         ? 'bg-orange-500 hover:bg-orange-600 ring-4 ring-orange-200 shadow-lg' 
         : 'bg-orange-500 hover:bg-orange-600'
     } ${disabled ? 'bg-orange-300 cursor-not-allowed' : ''}`}>
        {children}
    </button>
);

interface StepComponentProps {
    onNextStep?: () => void;
}

// --- SHARED STEP ---
// FIX: Add StepComponentProps to allow passing onNextStep prop.
const Step1Content: React.FC<StepComponentProps> = () => (
    <div className="space-y-4 text-slate-600">
        <p className="text-lg leading-relaxed">Để bắt đầu, mời quý Thầy Cô truy cập vào đường dẫn trang đăng nhập của hệ thống:</p>
        <a 
            href="https://hoccungai.vn/sign-in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-blue-100 text-blue-700 px-5 py-3 rounded-lg font-mono break-all hover:bg-blue-200 hover:text-blue-800 transition-colors text-base"
        >
            https://hoccungai.vn/sign-in
        </a>
        <img 
            src="https://i.postimg.cc/QxRvVw46/sign-in.png" 
            alt="Giao diện trang đăng nhập" 
            className="mt-6 w-full rounded-lg border border-slate-200 shadow-md"
        />
    </div>
);

// --- SSO STEPS ---
// FIX: Add StepComponentProps to allow passing onNextStep prop.
const Step2SSOContent: React.FC<StepComponentProps> = () => (
    <div className="space-y-4 text-slate-600">
        <p className="text-lg leading-relaxed">Trên trang đăng nhập, Thầy Cô vui lòng chọn phương thức <strong className="text-orange-700">"Tài khoản sở giáo dục"</strong>.</p>
        <div className="pt-4">
            <LoginMockup>
                <div className="space-y-3">
                    <MockButton icon={<SchoolIcon />} active>Tài khoản sở giáo dục</MockButton>
                    <MockButton icon={<GoogleIcon />}>VỚI GOOGLE</MockButton>
                    <MockButton icon={<FacebookIcon />}>VỚI FACEBOOK</MockButton>
                </div>
            </LoginMockup>
        </div>
    </div>
);

// FIX: Add StepComponentProps to allow passing onNextStep prop.
const Step3SSOContent: React.FC<StepComponentProps> = () => (
    <div className="space-y-4 text-slate-600">
        <p className="text-lg leading-relaxed">Tiếp theo, hệ thống sẽ yêu cầu chọn vai trò. Thầy Cô vui lòng chọn ô <strong className="text-orange-700">"Giáo viên"</strong>.</p>
        <div className="pt-4">
            <LoginMockup>
                 <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg">
                    <button className="w-1/2 py-2 rounded-md text-slate-600 font-medium text-base">Học sinh</button>
                    <button className="w-1/2 py-2 rounded-md text-white font-medium bg-orange-500 shadow text-base">Giáo viên</button>
                </div>
                <div className="text-left">
                    <label className="font-medium text-slate-700 text-base">Trường</label>
                    <div className="mt-1 w-full py-3 px-4 border border-slate-300 rounded-lg bg-slate-50 cursor-not-allowed text-base">Chọn</div>
                </div>
                <MockPrimaryButton disabled>Đăng nhập</MockPrimaryButton>
            </LoginMockup>
        </div>
    </div>
);

// FIX: Add StepComponentProps to allow passing onNextStep prop.
const Step4SSOContent: React.FC<StepComponentProps> = () => (
    <div className="space-y-4 text-slate-600">
        <p className="text-lg leading-relaxed">Nhập mã trường hoặc tên trường vào ô <strong className="text-slate-700">"Trường"</strong> để tìm kiếm. Sau đó, chọn đúng trường của Thầy Cô từ danh sách kết quả.</p>
        <div className="pt-4">
            <LoginMockup>
                 <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg">
                    <button className="w-1/2 py-2 rounded-md text-slate-600 font-medium text-base">Học sinh</button>
                    <button className="w-1/2 py-2 rounded-md text-white font-medium bg-orange-500 shadow text-base">Giáo viên</button>
                </div>
                <div className="text-left relative">
                    <label htmlFor="school-search" className="font-medium text-slate-700 text-base">Trường</label>
                    <input id="school-search" type="text" value="7979" readOnly className="mt-1 w-full py-3 px-4 border border-blue-500 rounded-lg ring-2 ring-blue-200 text-base" />
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-300 rounded-lg shadow-lg z-10 text-base">
                        <div className="p-4 bg-blue-50 text-blue-800 border-b border-blue-200">MN-TH-THCS-THPT Sao Mai (79790001)</div>
                        <div className="p-4 hover:bg-slate-50 cursor-pointer">Trường MN Chánh Mỹ (74718341)</div>
                    </div>
                </div>
                 <MockPrimaryButton disabled>Đăng nhập</MockPrimaryButton>
            </LoginMockup>
        </div>
    </div>
);

// FIX: Add StepComponentProps to allow passing onNextStep prop.
const Step5SSOContent: React.FC<StepComponentProps> = () => {
    const [showDashboard, setShowDashboard] = useState(false);

    if (showDashboard) {
        return (
            <div className="space-y-4 text-slate-600 text-center">
                <p className="text-xl font-semibold text-green-700">Đăng nhập thành công!</p>
                <p className="text-lg">Thầy Cô sẽ được chuyển hướng đến màn hình chính của hệ thống như sau:</p>
                <div className="mt-6 border-4 border-slate-200 rounded-xl shadow-lg overflow-hidden">
                    <img src="https://i.postimg.cc/RCH2Q3LZ/Trang-chu.png" alt="Màn hình chính hệ thống" className="w-full" />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4 text-slate-600">
            <p className="text-lg leading-relaxed">Sau khi đã chọn trường, nút <strong className="text-orange-700">"Đăng nhập"</strong> sẽ sáng lên. Thầy Cô nhấn vào đó để hoàn tất quá trình và truy cập vào hệ thống.</p>
            <div className="pt-4">
                 <LoginMockup>
                    <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg">
                        <button className="w-1/2 py-2 rounded-md text-slate-600 font-medium text-base">Học sinh</button>
                        <button className="w-1/2 py-2 rounded-md text-white font-medium bg-orange-500 shadow text-base">Giáo viên</button>
                    </div>
                    <div className="text-left">
                        <label className="font-medium text-slate-700 text-base">Trường</label>
                        <div className="mt-1 w-full py-3 px-4 border border-slate-300 rounded-lg bg-white text-base">MN-TH-THCS-THPT Sao Mai (79790001)</div>
                    </div>
                    <MockPrimaryButton active onClick={() => setShowDashboard(true)}>Đăng nhập</MockPrimaryButton>
                </LoginMockup>
            </div>
        </div>
    );
};

// --- SOCIAL STEPS ---
// FIX: Add StepComponentProps to allow passing onNextStep prop.
const Step1SocialContent: React.FC<StepComponentProps> = () => (
    <div className="space-y-4 text-slate-600">
        <p className="text-lg leading-relaxed">Để bắt đầu, mời quý Thầy Cô truy cập vào đường dẫn sau để đăng nhập:</p>
        <a
            href="https://hoccungai.vn/sign-in-truong/74724401/68e8b3a67c50bdc69254b370"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-100 text-blue-700 px-5 py-3 rounded-lg font-mono break-all hover:bg-blue-200 hover:text-blue-800 transition-colors text-base"
        >
            https://hoccungai.vn/sign-in-truong/74724401/68e8b3a67c50bdc69254b370
        </a>
        <img 
            src="https://i.postimg.cc/8kf2DTwZ/sign-in-truong.png" 
            alt="Giao diện trang đăng nhập của trường" 
            className="mt-6 w-full rounded-lg border border-slate-200 shadow-md"
        />
        <div className="!mt-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Tại sao cần đăng nhập bằng trang này</h4>
                <p className="text-blue-700 text-base leading-relaxed">
                    Để liên kết tài khoản Google/Facebook của thầy cô với tài khoản SSO. &rarr; Đăng nhập bằng Google/Facebook vẫn có dữ liệu SSO.
                </p>
            </div>
        </div>
    </div>
);

// FIX: Add StepComponentProps to allow passing onNextStep prop.
const Step2SocialContent: React.FC<StepComponentProps> = () => (
    <div className="space-y-4 text-slate-600">
        <p className="text-lg leading-relaxed">Trên trang đăng nhập, Thầy Cô vui lòng chọn phương thức đăng nhập tiện lợi như <strong className="text-blue-700">"VỚI GOOGLE"</strong>.</p>
        <div className="pt-4">
            <LoginMockup>
                <div className="space-y-3">
                    <MockButton icon={<SchoolIcon />}>Tài khoản sở giáo dục</MockButton>
                    <MockButton icon={<GoogleIcon />} active>VỚI GOOGLE</MockButton>
                    <MockButton icon={<FacebookIcon />}>VỚI FACEBOOK</MockButton>
                </div>
            </LoginMockup>
        </div>
    </div>
);

// FIX: Add StepComponentProps to allow passing onNextStep prop.
const Step3SocialContent: React.FC<StepComponentProps> = () => (
    <div className="space-y-4 text-slate-600">
        <p className="text-lg leading-relaxed">Một cửa sổ bật lên (popup) sẽ xuất hiện, yêu cầu Thầy Cô đăng nhập và xác thực tài khoản Google/Facebook. Hãy làm theo các bước hướng dẫn trong cửa sổ đó.</p>
        <div className="pt-4 flex justify-center">
            <div className="w-full max-w-md bg-white rounded-lg shadow-2xl border border-slate-300">
                <div className="p-4 border-b flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <GoogleIcon />
                        <span className="font-semibold text-slate-700">Sign in with Google</span>
                    </div>
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </div>
                <div className="p-8 text-center space-y-4">
                    <h3 className="text-xl font-bold text-slate-800">Choose an account</h3>
                    <p className="text-slate-500">to continue to HỌC CÙNG AI</p>
                    <div className="border border-slate-200 rounded-lg p-3 text-left flex items-center gap-4 hover:bg-blue-50 cursor-pointer">
                        <img alt="avatar" src="https://i.pravatar.cc/40?u=jane" className="w-10 h-10 rounded-full" />
                        <div>
                            <p className="font-semibold text-slate-800">Jane Doe</p>
                            <p className="text-sm text-slate-500">jane.doe@example.com</p>
                        </div>
                    </div>
                     <div className="border border-slate-200 rounded-lg p-3 text-left flex items-center gap-4 hover:bg-blue-50 cursor-pointer">
                        <svg className="w-10 h-10 text-slate-500 p-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        <div>
                            <p className="font-semibold text-slate-800">Use another account</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const Step4SocialContent: React.FC<StepComponentProps> = ({ onNextStep }) => (
    <div className="space-y-4 text-slate-600">
        <p className="text-lg leading-relaxed">Nếu đây là lần đăng nhập đầu tiên, hệ thống sẽ yêu cầu Thầy Cô <strong className="text-slate-700">liên kết với tài khoản nhà trường</strong> để đồng bộ dữ liệu.</p>
        <p className="text-lg leading-relaxed">Vui lòng điền đầy đủ thông tin bên dưới để hệ thống xác thực và hoàn tất liên kết.</p>
        <div className="pt-4">
            <div className="w-full mx-auto bg-slate-100 rounded-lg p-6 md:p-8 space-y-6 border border-slate-200">
                <div className="text-center">
                    <h2 className="text-lg font-bold text-yellow-500">MN-TH-THCS-THPT Sao Mai (79790001)</h2>
                    <p className="text-slate-500 mt-1">Chào mừng quý thầy cô đến với hệ thống:</p>
                </div>

                <div className="flex gap-4">
                    <button className="flex-1 py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow text-base">Giáo viên</button>
                    <button className="flex-1 py-3 px-4 bg-green-100 text-slate-900 font-semibold rounded-lg hover:bg-green-200 text-base">Học sinh</button>
                    <button className="flex-1 py-3 px-4 bg-purple-100 text-slate-900 font-semibold rounded-lg hover:bg-purple-200 text-base">Phụ huynh</button>
                </div>
                
                <div className="space-y-6 bg-white p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-slate-800 border-b pb-3 mb-6">Thông tin Giáo viên</h3>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="teacher-id" className="block text-base font-medium text-slate-700 mb-1">Mã</label>
                            <input id="teacher-id" type="text" placeholder="Nhập thông tin vào đây" className="w-full py-3 px-4 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-base" />
                        </div>
                        <div>
                            <label htmlFor="teacher-dob" className="block text-base font-medium text-slate-700 mb-1">Ngày sinh</label>
                            <div className="relative">
                                <input id="teacher-dob" type="text" className="w-full py-3 px-4 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-base" />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="text-base text-slate-500 -mt-2">
                        Thầy cô vui lòng nhập <strong className="font-semibold text-blue-600">mã giáo viên</strong> hoặc <strong className="font-semibold text-blue-600">căn cước công dân</strong>.
                    </p>

                    <div>
                        <label htmlFor="teacher-name" className="block text-base font-medium text-slate-700 mb-1">Họ tên</label>
                        <input id="teacher-name" type="text" placeholder="Nhập thông tin vào đây" className="w-full py-3 px-4 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-base" />
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button onClick={onNextStep} className="flex-1 py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow text-base">Xác nhận & tiếp tục</button>
                        <button className="flex-1 py-3 px-4 bg-white text-slate-700 font-semibold rounded-lg border border-slate-300 hover:bg-slate-50 text-base">Hủy</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// FIX: Add StepComponentProps to allow passing onNextStep prop.
const Step5SocialContent: React.FC<StepComponentProps> = () => (
    <div className="space-y-4 text-slate-600 text-center">
        <p className="text-xl font-semibold text-green-700">Liên kết tài khoản thành công!</p>
        <p className="text-lg">Thầy Cô sẽ được chuyển hướng đến màn hình chính của hệ thống như sau:</p>
        <div className="mt-6 border-4 border-slate-200 rounded-xl shadow-lg overflow-hidden">
            <img src="https://i.postimg.cc/RCH2Q3LZ/Trang-chu.png" alt="Màn hình chính hệ thống" className="w-full" />
        </div>
    </div>
);

// FIX: Add StepComponentProps to allow passing onNextStep prop.
const Step6SocialContent: React.FC<StepComponentProps> = () => (
    <div className="space-y-4 text-slate-600">
        <p className="text-lg leading-relaxed">Việc liên kết tài khoản chỉ cần thực hiện <strong className="text-slate-700">một lần duy nhất</strong>.</p>
        <p className="text-lg leading-relaxed">Từ những lần đăng nhập sau, Thầy Cô chỉ cần truy cập trang <a href="https://hoccungai.vn/sign-in" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline">hoccungai.vn/sign-in</a> và chọn phương thức đăng nhập đã liên kết (ví dụ: Google) là có thể truy cập thẳng vào hệ thống.</p>
        <div className="pt-4">
            <LoginMockup>
                <div className="space-y-3">
                    <MockButton icon={<SchoolIcon />}>Tài khoản sở giáo dục</MockButton>
                    <MockButton icon={<GoogleIcon />} active>VỚI GOOGLE</MockButton>
                    <MockButton icon={<FacebookIcon />}>VỚI FACEBOOK</MockButton>
                </div>
            </LoginMockup>
        </div>
    </div>
);

const SSO_GUIDE_STEPS = [
    { id: 1, title: 'Bước 1', subtitle: 'Truy cập trang', Component: Step1Content },
    { id: 2, title: 'Bước 2', subtitle: 'Chọn tài khoản SSO', Component: Step2SSOContent },
    { id: 3, title: 'Bước 3', subtitle: 'Chọn vai trò Giáo viên', Component: Step3SSOContent },
    { id: 4, title: 'Bước 4', subtitle: 'Nhập mã và chọn trường', Component: Step4SSOContent },
    { id: 5, title: 'Bước 5', subtitle: 'Hoàn tất đăng nhập', Component: Step5SSOContent },
];

const SOCIAL_GUIDE_STEPS = [
    { id: 1, title: 'Bước 1', subtitle: 'Truy cập trang', Component: Step1SocialContent },
    { id: 2, title: 'Bước 2', subtitle: 'Chọn Google/Facebook', Component: Step2SocialContent },
    { id: 3, title: 'Bước 3', subtitle: 'Xác thực tài khoản', Component: Step3SocialContent },
    { id: 4, title: 'Bước 4', subtitle: 'Xác thực & liên kết', Component: Step4SocialContent },
    { id: 5, title: 'Bước 5', subtitle: 'Hoàn tất & truy cập', Component: Step5SocialContent },
    { id: 6, title: 'Bước 6', subtitle: 'Đăng nhập lần sau', Component: Step6SocialContent },
];

const GuideSidebar: React.FC<{
  steps: { id: number; title: string; subtitle: string }[];
  activeStepId: number;
  onSelectStep: (id: number) => void;
}> = ({ steps, activeStepId, onSelectStep }) => {
    return (
        <aside className="w-full md:w-96 flex-shrink-0 md:sticky md:top-[200px]">
            <div className="relative pl-12 pr-2 py-2">
                <div className="absolute left-[35px] top-7 bottom-7 w-0.5 bg-slate-200" aria-hidden="true" />
                <div className="space-y-3">
                    {steps.map((step) => {
                        const isActive = step.id === activeStepId;
                        return (
                            <div key={step.id} className="flex items-center">
                                <div className={`z-10 flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full font-bold text-2xl transition-all duration-300 ${
                                    isActive ? 'bg-white border-4 border-blue-600 text-blue-600' : 'bg-white border-2 border-slate-300 text-slate-500'
                                }`}>
                                    {step.id}
                                </div>
                                <button
                                    onClick={() => onSelectStep(step.id)}
                                    className={`w-full text-left ml-4 rounded-lg p-3 transition-all duration-300 ${
                                        isActive ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-50 hover:bg-slate-100'
                                    }`}
                                    aria-current={isActive ? 'step' : undefined}
                                >
                                    <p className={`font-semibold ${isActive ? 'text-white' : 'text-slate-800'}`}>{step.title}</p>
                                    <p className={`text-base ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>{step.subtitle}</p>
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </aside>
    );
};

const TabButton: React.FC<{ children: React.ReactNode, onClick: () => void, isActive: boolean }> = ({ children, onClick, isActive }) => {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-3 font-semibold text-base md:text-lg transition-colors duration-200 ${
                isActive 
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
        >
            {children}
        </button>
    );
};

type GuideTab = 'sso' | 'social';

const LoginPageGuide: React.FC<LoginPageGuideProps> = ({ onNavigateBack }) => {
  const [activeTab, setActiveTab] = useState<GuideTab>('sso');
  const [activeStepId, setActiveStepId] = useState(1);
  const contentRef = useRef<HTMLElement>(null);

  const handleSelectTab = (tab: GuideTab) => {
    setActiveTab(tab);
    setActiveStepId(1);
    window.scrollTo(0,0);
  }

  const handleSelectStep = (id: number) => {
    setActiveStepId(id);
    if(contentRef.current) {
        const headerOffset = 96; 
        const elementPosition = contentRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
  };

  const steps = activeTab === 'sso' ? SSO_GUIDE_STEPS : SOCIAL_GUIDE_STEPS;
  const ActiveStep = steps.find(step => step.id === activeStepId);
  const ActiveStepComponent = ActiveStep?.Component;

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      <header className="py-8 bg-slate-50/80 backdrop-blur-sm sticky top-0 z-20 border-b border-slate-200">
        <div className="relative max-w-screen-xl mx-auto text-center px-4 md:px-8">
          <BackButton onClick={onNavigateBack} />
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800">Hướng Dẫn Đăng Nhập</h1>
          <p className="text-slate-500 mt-2 text-base md:text-lg">Quy trình đăng nhập vào hệ thống dành cho Giáo viên</p>
        </div>
      </header>
      <main className="max-w-screen-xl mx-auto p-4 md:p-8">
        <div className="mb-6 md:mb-8">
            <div className="inline-flex bg-white rounded-lg shadow-sm p-1 border border-slate-200">
                <TabButton onClick={() => handleSelectTab('sso')} isActive={activeTab === 'sso'}>
                    Đăng nhập bằng tài khoản SSO
                </TabButton>
                <TabButton onClick={() => handleSelectTab('social')} isActive={activeTab === 'social'}>
                    Đăng nhập bằng Google/Facebook/Email
                </TabButton>
            </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
            <GuideSidebar 
                steps={steps}
                activeStepId={activeStepId}
                onSelectStep={handleSelectStep}
            />
            <section ref={contentRef} className="flex-1 min-w-0">
                <div className="bg-white rounded-xl shadow-md p-6 md:p-10 scroll-mt-24">
                    <header className="mb-8">
                        <h1 className="text-4xl font-bold text-blue-700">
                            {ActiveStep?.title}: {ActiveStep?.subtitle}
                        </h1>
                    </header>
                    {ActiveStepComponent && (
                      <ActiveStepComponent
                        onNextStep={
                          activeTab === 'social' && activeStepId === 4
                            ? () => handleSelectStep(5)
                            : undefined
                        }
                      />
                    )}
                </div>
            </section>
        </div>
      </main>
    </div>
  );
};

export default LoginPageGuide;