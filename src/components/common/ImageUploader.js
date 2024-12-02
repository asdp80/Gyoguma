// 이미지 업로드 컴포넌트
// 상품 이미지, 프로필 이미지 업로드에 사용
// 다중 업로드 가능
import { useState } from "react";

const ImageUploader = () => {
    const [uploadImgUrls, setUploadImgUrls] = useState([]);

    const onChangeImageUpload = (e) => {
        const { files } = e.target;
        const fileArray = Array.from(files);

        const newImgUrls = fileArray.map((file) => {
            const reader = new FileReader();
            return new Promise((resolve) => {
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(file);
            });
        });

        Promise.all(newImgUrls).then((results) => {
            setUploadImgUrls((prevUrls) => [...prevUrls, ...results]);
        });
    };

    return (
        <div className="flex flex-col items-center gap-5 p-5 border-2 border-dashed border-gray-400 rounded-md max-w-xl mx-auto bg-gray-100">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
                {uploadImgUrls.map((url, index) => (
                    <img
                        key={index}
                        src={url}
                        alt={`Uploaded ${index}`}
                        className="w-full h-28 object-cover rounded-md border border-gray-300 hover:scale-110 transform transition duration-300"
                    />
                ))}
            </div>
            <input
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                type="file"
                accept="image/*"
                multiple
                onChange={onChangeImageUpload}
            />
        </div>
    );
};

export default ImageUploader;
