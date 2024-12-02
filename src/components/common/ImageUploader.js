// 이미지 업로드 컴포넌트
// 상품 이미지, 프로필 이미지 업로드에 사용
// 다중 업로드 가능
import { useState } from "react";
import axios from "axios";

const ImageUploader = () => {
    const [uploadImgUrls, setUploadImgUrls] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);

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

    const onUploadImages = async () => {
        if (selectedFiles.length === 0) { //이미지가 없다면?
            alert("업로드할 이미지를 선택하세요!");
            return;
        }

        const formData = new FormData(); // FormData를 이용해 파일 그대로 보낼 수 있다.
        selectedFiles.forEach((file, index) => {
            formData.append(`images[${index}]`, file); // 키는 추후 수정 가능
        });

        try {
            const response = await axios.post("http://YOUR-API-URI-HERE/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("이미지 업로드 성공:", response.data);
            alert("이미지 업로드가 완료되었습니다!");
        } catch (error) {
            console.error("이미지 업로드 실패:", error);
            alert("이미지 업로드 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="flex flex-col items-center gap-5 p-5 border-2 border-dashed border-gray-400 rounded-md max-w-4xl mx-auto bg-gray-100">
        {/* ^ 이미지 업로더 전체 크기 및 형태에 관여함 */}
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
            <button
                className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                onClick={onUploadImages}
            >
                업로드하기
            </button>
        </div>
    );
};

export default ImageUploader;
