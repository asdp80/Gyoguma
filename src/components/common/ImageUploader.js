// 이미지 업로드 컴포넌트
// 상품 이미지, 프로필 이미지 업로드에 사용
// 다중 업로드 가능
import { useState } from "react";

const ImageUploader = (props) => {
    const [uploadImgUrls, setUploadImgUrls] = useState([]);
    const {setSelectedFiles} = props // 상위 폼에서 사용할 제출 State

    const onChangeImageUpload = (e) => {
        const { files } = e.target;
        const fileArray = Array.from(files);

        // 미리보기용 이미지 URL 생성, base64로 인코딩됨 -> 이것을 서버로 전송할 수도 있음
        const newImgUrls = fileArray.map((file) => {
            const reader = new FileReader();
            return new Promise((resolve) => {
                reader.onloadend = () => resolve(reader.result); // load가 끝나면 그 결과(이미지 파일)를 반환
                reader.readAsDataURL(file); //load 시작
            });
        });

        // 미리보기에 이미지 URL 추가(base64)
        Promise.all(newImgUrls).then((results) => {
            setUploadImgUrls((prevUrls) => [...prevUrls, ...results]);
        });

        // 업로드 할 파일 추가(blob/files)
        setSelectedFiles((prevFiles) => [...prevFiles, ...fileArray]);
    };

    

    return (
        <>
        {/* 이미지 업로더 전체 크기 및 형태에 관여함 */}
        <div className="flex flex-col items-center gap-5 p-5 border-2 border-dashed border-gray-400 rounded-md max-w-4xl mx-auto bg-gray-100">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full">
                {uploadImgUrls.map((url, index) => (
                    <img
                        key={index}
                        src={url}
                        alt={`Uploaded ${index}`}
                        className="w-full h-full aspect-auto object-cover rounded-md border border-gray-300 hover:scale-110 transform transition duration-300"
                        onClick={/* 이미지를 클릭하여 삭제하는 기능 */() => {return}}
                    />
                ))}
            </div>
            {/* 이미지 업로드 버튼 스타일링을 위한 라벨 */}
            <label className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                <span>이미지 선택</span>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={onChangeImageUpload}
                    className="hidden"
                />
            </label>
        </div>
        </>
    );
};

export default ImageUploader;
